const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');

const setMenu = (open) => {
  menu.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
};

menuToggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });
const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 8);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  reveals.forEach((element) => observer.observe(element));
} else { reveals.forEach((element) => element.classList.add('is-visible')); }

const removedMedia = new Map([
  ['6c9cde63-fa19-4268-9506-93e80de753b3.jpeg', 'assets/images/WhatsApp%20Image%202026-11-14%20at%204.12.04%20PM.jpeg'],
  ['WhatsApp%20Image%202026-11-14%20at%206.32.07%20PM.jpeg', 'assets/images/WhatsApp%20Image%202026-11-14%20at%204.12.03%20PM.jpeg'],
]);

document.querySelectorAll('[src], [data-src]').forEach((element) => {
  ['src', 'data-src'].forEach((attribute) => {
    const value = element.getAttribute(attribute);
    if (!value) return;
    removedMedia.forEach((replacement, removedName) => {
      if (value.includes(removedName)) element.setAttribute(attribute, replacement);
    });
  });
});
