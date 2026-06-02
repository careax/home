/**
 * db-handler.js — Supabase Client 직접 연동 & 폼 데이터 직접 적재 (Contact & Register)
 */
document.addEventListener('DOMContentLoaded', async () => {
  let supabase = null;

  // ─── Supabase Client 초기화 ───
  async function initSupabase() {
    // 이 URL과 Key는 RLS 보안 정책을 통해 SELECT(조회)가 엄격히 제한되고
    // 오직 INSERT(문의/수강신청 등록)만 허용되도록 설정되어 안전한 Public Anon 정보입니다.
    const url = "https://jbwogaokapcxlespfokt.supabase.co";
    const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impid29nYW9rYXBjeGxlc3Bmb2t0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTE3NTI1NSwiZXhwIjoyMDk0NzUxMjU1fQ.O5EIw_E3TgofGgR-zJqzoRfJvqBNyl0-lq9l29z83jA";

    try {
      supabase = window.supabase.createClient(url, key);
      console.log('[Supabase] Initialized with Public Credentials');
    } catch (e) {
      console.error('[Supabase] Initialization failed:', e);
    }
  }

  await initSupabase();

  // ─── Contact Form (문의하기) ───
  const contactForm   = document.getElementById('contactForm');
  const contactStatus = document.getElementById('formStatus');
  const contactSubmit = contactForm?.querySelector('.form-submit');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = {
        name:    contactForm.name.value.trim(),
        email:   contactForm.email.value.trim(),
        org:     contactForm.org.value.trim(),
        message: contactForm.message.value.trim(),
      };

      const lang = localStorage.getItem('careax_lang') || 'ko';

      // Validation
      if (!data.name || !data.email || !data.message) {
        showStatus(contactStatus, lang === 'en' ? 'Please fill in all required fields.' : '필수 항목을 모두 입력해 주세요.', 'error');
        return;
      }
      if (!isValidEmail(data.email)) {
        showStatus(contactStatus, lang === 'en' ? 'Please enter a valid email address.' : '올바른 이메일 주소를 입력해 주세요.', 'error');
        return;
      }

      setLoading(contactSubmit, true, lang);
      showStatus(contactStatus, '', '');

      try {
        if (!supabase) throw new Error('Supabase client not initialized');

        // 1. Supabase inquiries 테이블 직접 적재
        const { error } = await supabase
          .from('inquiries')
          .insert([
            {
              name: data.name,
              email: data.email,
              organization: data.org || null,
              message: data.message,
              status: 'Pending'
            }
          ]);

        if (error) throw error;

        // 2. Google Sheets 적재 (GAS Web App 호출)
        const gasUrl = "https://script.google.com/macros/s/AKfycbxAq_HHNG075YdZ2eSAIteKxzYYmEgc2TUAXF5MWULVROAyq6mbFPBSHRWDh7kjCUiCHQ/exec";
        try {
          await fetch(gasUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'inquiry',
              name: data.name,
              email: data.email,
              org: data.org || '',
              message: data.message
            })
          });
          console.log('[Google Sheets] Inquiry data appended');
        } catch (sheetErr) {
          console.warn('[Google Sheets] Google Sheets logging failed:', sheetErr);
        }

        // 3. Vercel Serverless Function 호출 (이메일 알림 전송)
        try {
          await fetch('https://home-careguide-s-projects.vercel.app/api/inquire', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, lang: lang })
          });
          console.log('[Email] Inquiry notification sent');
        } catch (mailErr) {
          console.warn('[Email] Inquiry notification service unavailable:', mailErr);
        }

        // DB 및 시트 적재 성공 완료 처리
        showStatus(contactStatus, lang === 'en' ? 'Inquiry submitted successfully! We will contact you soon 🙏' : '문의가 접수되었습니다. 곧 연락드리겠습니다 🙏', 'success');
        contactForm.reset();
      } catch (err) {
        console.error('[Contact Submit Error]:', err);
        showStatus(contactStatus, lang === 'en' ? 'An error occurred. Please try again.' : '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.', 'error');
      } finally {
        setLoading(contactSubmit, false, lang);
      }
    });
  }

  // ─── Register Form (수강신청 & 팝업 폼 통합) ───
  const registerForm = document.getElementById('registerForm');
  const popupRegisterForm = document.getElementById('popupRegisterForm');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitEl = registerForm.querySelector('.form-submit');
      const data = {
        course_name:  registerForm.course_name.value,
        student_name: registerForm.student_name.value.trim(),
        email:        registerForm.email.value.trim(),
        phone:        registerForm.phone.value.trim(),
        notes:        registerForm.notes.value.trim(),
      };
      handleRegistration(data, submitEl, registerForm, false);
    });
  }

  if (popupRegisterForm) {
    popupRegisterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitEl = popupRegisterForm.querySelector('.form-submit');
      const data = {
        course_name:  popupRegisterForm.course_name.value,
        student_name: popupRegisterForm.student_name.value.trim(),
        email:        popupRegisterForm.email.value.trim(),
        phone:        popupRegisterForm.phone.value.trim(),
        notes:        popupRegisterForm.notes.value.trim(),
      };
      handleRegistration(data, submitEl, popupRegisterForm, true);
    });
  }

  // ─── 공통 수강신청 처리 함수 (결제 -> DB 적재 -> 시트 적재 -> 메일 알림) ───
  function handleRegistration(data, submitEl, formEl, isPopup) {
    const lang = localStorage.getItem('careax_lang') || 'ko';

    // 1. 필수값 체크
    if (!data.course_name || !data.student_name || !data.email || !data.phone) {
      alert(lang === 'en' ? 'Please fill in all required fields.' : '필수 항목을 모두 입력해 주세요.');
      return;
    }
    if (!isValidEmail(data.email)) {
      alert(lang === 'en' ? 'Please enter a valid email address.' : '올바른 이메일 주소를 입력해 주세요.');
      return;
    }
    if (!isValidPhone(data.phone)) {
      alert(lang === 'en' ? 'Please match the format 010-XXXX-XXXX.' : '연락처 형식(010-XXXX-XXXX)을 맞춰 주세요.');
      return;
    }

    // 2. 포트원 결제창 호출
    if (!window.IMP) {
      console.error('PortOne SDK not loaded');
      alert(lang === 'en' ? 'Payment module is loading. Please try again in a moment.' : '결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해 주세요.');
      return;
    }

    const IMP = window.IMP;
    IMP.init("imp19085719"); // 포트원 공식 데모 가맹점 식별코드

    const coursePrice = getCoursePrice(data.course_name);

    setLoading(submitEl, true, lang, true);

    IMP.request_pay({
      pg: "html5_inicis", // 이니시스 테스트 결제
      pay_method: "card",
      merchant_uid: "merchant_" + new Date().getTime(),
      name: data.course_name,
      amount: coursePrice,
      buyer_email: data.email,
      buyer_name: data.student_name,
      buyer_tel: data.phone,
    }, async function (rsp) {
      if (rsp.success) {
        // 결제 성공 시 실제 백엔드/DB 파이프라인 작동
        try {
          if (!supabase) throw new Error('Supabase client not initialized');

          // A. Supabase DB 적재 (registrations 테이블에 적재)
          const { error } = await supabase
            .from('registrations')
            .insert([
              {
                course_name: data.course_name,
                student_name: data.student_name,
                email: data.email,
                phone: data.phone,
                notes: data.notes || null,
                status: 'Pending'
              }
            ]);

          if (error) throw error;

          // B. Google Sheets 적재 (GAS Web App 호출)
          const gasUrl = "https://script.google.com/macros/s/AKfycbxAq_HHNG075YdZ2eSAIteKxzYYmEgc2TUAXF5MWULVROAyq6mbFPBSHRWDh7kjCUiCHQ/exec";
          try {
            await fetch(gasUrl, {
              method: 'POST',
              mode: 'no-cors',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'registration',
                course_name: data.course_name,
                student_name: data.student_name,
                email: data.email,
                phone: data.phone,
                notes: data.notes || ''
              })
            });
            console.log('[Google Sheets] Registration data appended');
          } catch (sheetErr) {
            console.warn('[Google Sheets] Google Sheets logging failed:', sheetErr);
          }

          // C. Vercel Serverless Function 호출 (이메일 알림 전송)
          try {
            await fetch('https://home-careguide-s-projects.vercel.app/api/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...data, price: coursePrice, lang: lang })
            });
            console.log('[Email] Registration notification sent');
          } catch (mailErr) {
            console.warn('[Email] Email notification failed:', mailErr);
          }

          // D. UI 완료 성공 모달 표출
          if (isPopup) {
            if (window.closeRegFormModal) window.closeRegFormModal();
          }
          const registerModal = document.getElementById('registerModal');
          if (registerModal) {
            registerModal.classList.add('open');
            registerModal.setAttribute('aria-hidden', 'false');
          }
          formEl.reset();

        } catch (err) {
          console.error('[Registration Pipeline Error]:', err);
          alert(lang === 'en' ? 'An error occurred during registration. Please contact the administrator.' : '등록 중 오류가 발생했습니다. 관리자에게 문의해 주세요.');
        } finally {
          setLoading(submitEl, false, lang, true);
        }
      } else {
        // 결제 실패 혹은 취소 처리
        setLoading(submitEl, false, lang, true);
        alert((lang === 'en' ? 'Payment failed: ' : '결제에 실패하였습니다: ') + rsp.error_msg);
      }
    });
  }

  // 코스 코드별 수강 금액 매핑 도우미
  function getCoursePrice(courseId) {
    const prices = {
      'AX · 101': 150000,
      'AX · 201': 200000,
      'AX · 301': 250000,
      'AX · 401': 300000
    };
    return prices[courseId] || 150000;
  }

  // ─── 공통 헬퍼 함수 ───
  function showStatus(targetEl, msg, type) {
    if (!targetEl) return;
    targetEl.textContent = msg;
    targetEl.className   = 'form-msg' + (type ? ' ' + type : '');
  }

  function setLoading(targetEl, loading, lang, isReg = false) {
    if (!targetEl) return;
    targetEl.disabled   = loading;
    if (isReg) {
      targetEl.textContent = loading ? (lang === 'en' ? 'Processing...' : '결제 및 전송 중…') : (lang === 'en' ? 'Register Course' : '수강 신청하기');
    } else {
      targetEl.textContent = loading ? (lang === 'en' ? 'Sending...' : '전송 중…') : (lang === 'en' ? 'Send Inquiry' : '문의 보내기');
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^010-\d{4}-\d{4}$/.test(phone);
  }
});
