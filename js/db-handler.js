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

        // Supabase inquiries 테이블 직접 적재
        const { error } = await supabase
          .from('inquiries')
          .insert([
            {
              name: data.name,
              email: data.email,
              organization: data.org || null,
              message: data.message
            }
          ]);

        if (error) throw error;

        // Vercel Serverless Function 호출 (Nodemailer 이메일 알림 전송) - 오류 방어 감싸기
        try {
          const emailRes = await fetch('https://home-careguide-s-projects.vercel.app/api/inquire', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          if (emailRes.ok) {
            console.log('[Email] Inquiry notification sent');
          } else {
            console.warn('[Email] Inquiry notification failed status:', emailRes.status);
          }
        } catch (mailErr) {
          console.warn('[Email] Inquiry notification service unavailable:', mailErr);
        }

        // DB 적재 성공 완료 처리
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

  // ─── Register Form (수강신청) ───
  const registerForm   = document.getElementById('registerForm');
  const registerStatus = document.getElementById('registerStatus');
  const registerSubmit = registerForm?.querySelector('.form-submit');
  const registerModal  = document.getElementById('registerModal');

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = {
        course_name:  registerForm.course_name.value,
        student_name: registerForm.student_name.value.trim(),
        email:        registerForm.email.value.trim(),
        phone:        registerForm.phone.value.trim(),
        notes:        registerForm.notes.value.trim(),
      };

      const lang = localStorage.getItem('careax_lang') || 'ko';

      // Validation
      if (!data.course_name || !data.student_name || !data.email || !data.phone) {
        showStatus(registerStatus, lang === 'en' ? 'Please fill in all required fields.' : '필수 항목을 모두 입력해 주세요.', 'error');
        return;
      }
      if (!isValidEmail(data.email)) {
        showStatus(registerStatus, lang === 'en' ? 'Please enter a valid email address.' : '올바른 이메일 주소를 입력해 주세요.', 'error');
        return;
      }
      if (!isValidPhone(data.phone)) {
        showStatus(registerStatus, lang === 'en' ? 'Please match the format 010-XXXX-XXXX.' : '연락처 형식(010-XXXX-XXXX)을 맞춰 주세요.', 'error');
        return;
      }

      setLoading(registerSubmit, true, lang, true);
      showStatus(registerStatus, '', '');

      try {
        if (!supabase) throw new Error('Supabase client not initialized');

        // Supabase registrations 테이블 직접 적재
        const { error } = await supabase
          .from('registrations')
          .insert([
            {
              course_name: data.course_name,
              student_name: data.student_name,
              email: data.email,
              phone: data.phone,
              notes: data.notes || null
            }
          ]);

        if (error) throw error;

        // Vercel Serverless Function 호출 (수강신청 확인 메일 알림) - 오류 방어 감싸기
        try {
          const emailRes = await fetch('https://home-careguide-s-projects.vercel.app/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          if (emailRes.ok) {
            console.log('[Email] Registration notification sent');
          } else {
            console.warn('[Email] Registration notification failed status:', emailRes.status);
          }
        } catch (mailErr) {
          console.warn('[Email] Registration notification service unavailable:', mailErr);
        }

        // DB 적재 성공 완료 처리 (성공 모달 팝업)
        if (registerModal) {
          registerModal.classList.add('open');
          registerModal.setAttribute('aria-hidden', 'false');
        }
        registerForm.reset();
        showStatus(registerStatus, '', '');
      } catch (err) {
        console.error('[Register Submit Error]:', err);
        showStatus(registerStatus, lang === 'en' ? 'An error occurred. Please try again.' : '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.', 'error');
      } finally {
        setLoading(registerSubmit, false, lang, true);
      }
    });
  }

  // ─── Popup Register Form (팝업 수강신청) ───
  const popupRegisterForm   = document.getElementById('popupRegisterForm');
  const popupRegisterStatus = document.getElementById('popupRegisterStatus');
  const popupRegisterSubmit = popupRegisterForm?.querySelector('.form-submit');

  if (popupRegisterForm) {
    popupRegisterForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = {
        course_name:  popupRegisterForm.course_name.value,
        student_name: popupRegisterForm.student_name.value.trim(),
        email:        popupRegisterForm.email.value.trim(),
        phone:        popupRegisterForm.phone.value.trim(),
        notes:        popupRegisterForm.notes.value.trim(),
      };

      const lang = localStorage.getItem('careax_lang') || 'ko';

      // Validation
      if (!data.course_name || !data.student_name || !data.email || !data.phone) {
        showStatus(popupRegisterStatus, lang === 'en' ? 'Please fill in all required fields.' : '필수 항목을 모두 입력해 주세요.', 'error');
        return;
      }
      if (!isValidEmail(data.email)) {
        showStatus(popupRegisterStatus, lang === 'en' ? 'Please enter a valid email address.' : '올바른 이메일 주소를 입력해 주세요.', 'error');
        return;
      }
      if (!isValidPhone(data.phone)) {
        showStatus(popupRegisterStatus, lang === 'en' ? 'Please match the format 010-XXXX-XXXX.' : '연락처 형식(010-XXXX-XXXX)을 맞춰 주세요.', 'error');
        return;
      }

      setLoading(popupRegisterSubmit, true, lang, true);
      showStatus(popupRegisterStatus, '', '');

      try {
        if (!supabase) throw new Error('Supabase client not initialized');

        // Supabase registrations 테이블 직접 적재
        const { error } = await supabase
          .from('registrations')
          .insert([
            {
              course_name: data.course_name,
              student_name: data.student_name,
              email: data.email,
              phone: data.phone,
              notes: data.notes || null
            }
          ]);

        if (error) throw error;

        // Vercel Serverless Function 호출 (수강신청 확인 메일 알림) - 오류 방어 감싸기
        try {
          const emailRes = await fetch('https://home-careguide-s-projects.vercel.app/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          if (emailRes.ok) {
            console.log('[Email] Popup registration notification sent');
          } else {
            console.warn('[Email] Popup registration notification failed status:', emailRes.status);
          }
        } catch (mailErr) {
          console.warn('[Email] Popup registration notification service unavailable:', mailErr);
        }

        // DB 적재 성공 완료 처리 (성공 모달 팝업 및 입력 팝업 닫기)
        if (window.closeRegFormModal) {
          window.closeRegFormModal();
        }
        if (registerModal) {
          registerModal.classList.add('open');
          registerModal.setAttribute('aria-hidden', 'false');
        }
        popupRegisterForm.reset();
        showStatus(popupRegisterStatus, '', '');
      } catch (err) {
        console.error('[Popup Register Submit Error]:', err);
        showStatus(popupRegisterStatus, lang === 'en' ? 'An error occurred. Please try again.' : '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.', 'error');
      } finally {
        setLoading(popupRegisterSubmit, false, lang, true);
      }
    });
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
      targetEl.textContent = loading ? (lang === 'en' ? 'Submitting...' : '전송 중…') : (lang === 'en' ? 'Register Course' : '수강 신청하기');
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
