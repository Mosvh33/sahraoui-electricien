/* ==========================================================================
   Sahraoui Mohammed Électricien — Scripts principaux
   - Menu mobile
   - Curseur Avant/Après (souris + tactile)
   - Formulaire de contact -> WhatsApp
   - Filtres portfolio
   ========================================================================== */

const WHATSAPP_NUMBER = '33762627148';

/* ---------- Menu mobile ---------- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

/* ---------- Curseur Avant/Après ---------- */
function initBeforeAfterSliders() {
  document.querySelectorAll('.ba-slider').forEach((slider) => {
    const afterEl = slider.querySelector('.ba-after');
    const handle = slider.querySelector('.ba-handle');
    let dragging = false;

    function setPosition(percent) {
      const clamped = Math.min(100, Math.max(0, percent));
      afterEl.style.clipPath = `inset(0 0 0 ${clamped}%)`;
      handle.style.left = `${clamped}%`;
    }

    function positionFromEvent(clientX) {
      const rect = slider.getBoundingClientRect();
      const percent = ((clientX - rect.left) / rect.width) * 100;
      setPosition(percent);
    }

    slider.addEventListener('mousedown', (e) => {
      dragging = true;
      positionFromEvent(e.clientX);
    });
    window.addEventListener('mousemove', (e) => {
      if (dragging) positionFromEvent(e.clientX);
    });
    window.addEventListener('mouseup', () => { dragging = false; });

    slider.addEventListener('touchstart', (e) => {
      dragging = true;
      positionFromEvent(e.touches[0].clientX);
    }, { passive: true });
    slider.addEventListener('touchmove', (e) => {
      if (dragging) positionFromEvent(e.touches[0].clientX);
    }, { passive: true });
    slider.addEventListener('touchend', () => { dragging = false; });

    slider.addEventListener('click', (e) => positionFromEvent(e.clientX));

    setPosition(50);
  });
}

/* ---------- Filtres portfolio ---------- */
function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('[data-category]');
  if (!filterButtons.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.filter;

      items.forEach((item) => {
        const match = category === 'all' || item.dataset.category === category;
        item.style.display = match ? '' : 'none';
      });
    });
  });
}

/* ---------- Formulaire de contact -> WhatsApp ---------- */
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const service = form.querySelector('input[name="service"]:checked');
    const urgence = form.querySelector('input[name="urgence"]:checked');
    const nom = form.querySelector('#nom').value.trim();
    const telephone = form.querySelector('#telephone').value.trim();
    const adresse = form.querySelector('#adresse').value.trim();
    const message = form.querySelector('#message').value.trim();

    const lines = [
      'Bonjour, j\'aimerais un RDV pour ' + (service ? service.value : 'un service') + '.',
      'Urgence : ' + (urgence ? urgence.value : 'Non précisé'),
      'Nom : ' + (nom || 'Non précisé'),
      'Téléphone : ' + (telephone || 'Non précisé'),
    ];
    if (adresse) lines.push('Adresse : ' + adresse);
    if (message) lines.push('Détails : ' + message);
    lines.push('Merci !');

    const text = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    const successBox = form.querySelector('.form-success');
    if (successBox) successBox.classList.add('visible');

    window.open(url, '_blank');
  });
}

/* ---------- Année footer ---------- */
function initFooterYear() {
  document.querySelectorAll('.current-year').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initBeforeAfterSliders();
  initPortfolioFilters();
  initContactForm();
  initFooterYear();
});
