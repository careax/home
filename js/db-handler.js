/**
 * db-handler.js — Contact 폼 fetch('/api/inquire') 전송
 */
document.addEventListener('DOMContentLoaded', () => {
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const submit = form?.querySelector('.form-submit');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      name:    form.name.value.trim(),
      email:   form.email.value.trim(),
      org:     form.org.value.trim(),
      message: form.message.value.trim(),
    };

    // Basic client-side validation
    if (!data.name || !data.email || !data.message) {
      showStatus('필수 항목을 모두 입력해 주세요.', 'error');
      return;
    }
    if (!isValidEmail(data.email)) {
      showStatus('올바른 이메일 주소를 입력해 주세요.', 'error');
      return;
    }

    // Send
    setLoading(true);
    showStatus('', '');

    try {
      const res = await fetch('/api/inquire', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        showStatus(json.message || '문의가 접수되었습니다. 곧 연락드리겠습니다 🙏', 'success');
        form.reset();
      } else {
        showStatus(json.error || '오류가 발생했습니다. 다시 시도해 주세요.', 'error');
      }
    } catch (err) {
      console.error('[db-handler] fetch error:', err);
      showStatus('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.', 'error');
    } finally {
      setLoading(false);
    }
  });

  function showStatus(msg, type) {
    if (!status) return;
    status.textContent  = msg;
    status.className    = 'form-status' + (type ? ' ' + type : '');
  }

  function setLoading(loading) {
    if (!submit) return;
    submit.disabled     = loading;
    submit.textContent  = loading ? '전송 중…' : (getCurrentLangSubmit());
  }

  function getCurrentLangSubmit() {
    const lang = localStorage.getItem('careax_lang') || 'ko';
    return lang === 'en' ? 'Send Inquiry' : '문의 보내기';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
