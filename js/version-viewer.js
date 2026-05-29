/**
 * version-viewer.js — 버전 배지 클릭 시 모달 팝업
 * 현재 버전, commit hash, changelog 표시
 */

const VERSION_INFO = {
  version:    'v1.0.0',
  commitHash: 'a1b2c3d',
  date:       '2026-05-29',
  changelog: [
    'Initial release — CareAX Instructor Profile Site',
    'KO/EN bilingual toggle with localStorage persistence',
    'Curriculum filter tabs (All / Foundation / Practice / Leadership / Custom)',
    'Contact form with /api/inquire endpoint & email notification',
    'Scroll-triggered fade-in animations on course cards and method steps',
    'Version badge modal (this panel)',
    'GitHub Pages auto-deploy via Actions workflow',
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  const badge   = document.getElementById('versionBadge');
  const modal   = document.getElementById('versionModal');
  const backdrop = document.getElementById('versionModalBackdrop');
  const closeBtn = document.getElementById('versionModalClose');
  const content  = document.getElementById('versionModalContent');

  if (!badge || !modal) return;

  // Populate content
  content.innerHTML = `
    <div class="vm-version">${VERSION_INFO.version}</div>
    <div class="vm-hash">commit: ${VERSION_INFO.commitHash}</div>
    <div class="vm-date">${VERSION_INFO.date}</div>
    <hr class="vm-divider" />
    <div class="vm-changes-title">What's in this release</div>
    <ul class="vm-changes">
      ${VERSION_INFO.changelog.map(c => `<li class="vm-change">${c}</li>`).join('')}
    </ul>
  `;

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    closeBtn?.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    badge?.focus();
  }

  badge.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);

  // Keyboard: Escape to close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  // Trap focus inside modal
  modal.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const focusable = modal.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
    }
  });
});
