'use strict';
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
const nav = document.getElementById('nav');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.focus();
    }
  });
}
function closeMobile() {
  if (mobileMenu) { mobileMenu.classList.remove('open'); if (burger) burger.setAttribute('aria-expanded','false'); }
}
if (nav) {
  window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 20); }, { passive: true });
}
(function() {
  const path = location.pathname.replace(/\/$/,'') || '/';
  document.querySelectorAll('.nav-links a, #mobile-menu a').forEach(a => {
    const href = (a.getAttribute('href')||'').replace(/\/$/,'');
    if (href && path.endsWith(href)) a.classList.add('active');
  });
})();
function toggleFaq(el) {
  const wasOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-a')?.setAttribute('hidden','');
    i.querySelector('button')?.setAttribute('aria-expanded','false');
  });
  if (!wasOpen) {
    el.classList.add('open');
    el.querySelector('.faq-a')?.removeAttribute('hidden');
    el.querySelector('button')?.setAttribute('aria-expanded','true');
  }
}
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity='0'; el.style.transform='translateY(18px)'; el.style.transition='opacity 0.5s ease, transform 0.5s ease';
    obs.observe(el);
  });
}
// Domain search on assets page
const searchInput = document.getElementById('domain-search');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    document.querySelectorAll('.asset-row:not(.header)').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

/* ===== CSP-konforme Event-Delegation (ersetzt Inline-onclick) ===== */
document.addEventListener('click', function (e) {
  // Mobile-Menü schließen, wenn ein Link darin geklickt wird
  var mLink = e.target.closest('#mobile-menu a');
  if (mLink) { closeMobile(); }

  // FAQ-Item auf-/zuklappen
  var faq = e.target.closest('.faq-item');
  if (faq) { toggleFaq(faq); }
});
