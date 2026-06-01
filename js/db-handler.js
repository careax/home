/**
 * db-handler.js — Supabase Client 직접 연동 & 폼 데이터 직접 적재 (Contact & Register)
 */
document.addEventListener('DOMContentLoaded', async () => {
  let supabase = null;

  // ─── Supabase Client 초기화 ───
  async function initSupabase() {
    try {
      // 1. 서버리스 API로부터 Config 가져오기 시도 (Vercel/Production 보안성 최우선)
      const res = await fetch('/api/config');
      if (res.ok) {
        const config = await res.json();
        if (config.supabaseUrl && config.supabaseKey) {
          supabase = window.supabase.createClient(config.supabaseUrl, config.supabaseKey);
          console.log('[Supabase] Initialized via API Config');
          return;
        }
      }
    } catch (e) {
      console.warn('[Supabase] API Config failed, trying local fallback...', e);
    }

    try {
      // 2. 로컬 개발 환경용 /.env 동적 fetch 시도 (보안 무결성 유지)
      const res = await fetch('/.env');
      if (res.ok) {
        const text = await res.text();
        const env = {};
        text.split('\n').forEach(line => {
          const parts = line.split('=');
          if (parts.length >= 2) {
            env[parts[0].trim()] = parts.slice(1).join('=').trim();
          }
        });
        const url = env['NEXT_PUBLIC_SUPABASE_URL'];
        const key = env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];
        if (url && key) {
          supabase = window.supabase.createClient(url, key);
          console.log('[Supabase] Initialized via Local Env');
          return;
        }
      }
    } catch (e) {
      console.error('[Supabase] Local Env failed:', e);
    }

    // 3. Fallback: 환경변수 하드코딩 유출을 방지하기 위한 안내 출력
    console.error('[Supabase] Failed to load credentials. Verify SMTP/Supabase setup in .env');
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

        // Vercel Serverless Function 호출 (Nodemailer 이메일 알림 전송)
        const emailRes = await fetch('/api/inquire', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (emailRes.ok) {
          showStatus(contactStatus, lang === 'en' ? 'Inquiry submitted successfully! We will contact you soon 🙏' : '문의가 접수되었습니다. 곧 연락드리겠습니다 🙏', 'success');
          contactForm.reset();
        } else {
          showStatus(contactStatus, lang === 'en' ? 'Inquiry saved, but email notification failed.' : '문의는 저장되었으나 메일 발송에 실패했습니다.', 'success');
        }
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

        // Vercel Serverless Function 호출 (수강신청 확인 메일 알림)
        const emailRes = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (emailRes.ok) {
          // 성공 완료 모달 출력
          if (registerModal) {
            registerModal.classList.add('open');
            registerModal.setAttribute('aria-hidden', 'false');
          }
          registerForm.reset();
          showStatus(registerStatus, '', '');
        } else {
          showStatus(registerStatus, lang === 'en' ? 'Registration saved, but confirmation email failed.' : '수강신청은 완료되었으나 확인 메일 발송에 실패했습니다.', 'success');
        }
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

        // Vercel Serverless Function 호출 (수강신청 확인 메일 알림)
        const emailRes = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (emailRes.ok) {
          // 팝업 폼 모달 닫기
          if (window.closeRegFormModal) {
            window.closeRegFormModal();
          }
          // 성공 완료 모달 출력
          if (registerModal) {
            registerModal.classList.add('open');
            registerModal.setAttribute('aria-hidden', 'false');
          }
          popupRegisterForm.reset();
          showStatus(popupRegisterStatus, '', '');
        } else {
          showStatus(popupRegisterStatus, lang === 'en' ? 'Registration saved, but confirmation email failed.' : '수강신청은 완료되었으나 확인 메일 발송에 실패했습니다.', 'success');
        }
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
