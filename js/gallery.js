const filterButtons = document.querySelectorAll('[data-filter]');
const galleryItems = [...document.querySelectorAll('[data-gallery-item]')];
const lightbox = document.querySelector('#lightbox');
const lightboxContent = lightbox.querySelector('.lightbox-content');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
let visibleItems = galleryItems;
let activeIndex = 0;
const showItem = (index) => {
  activeIndex = (index + visibleItems.length) % visibleItems.length;
  const item = visibleItems[activeIndex];
  const media = document.createElement(item.dataset.type === 'video' ? 'video' : 'img');
  media.src = item.dataset.src;
  media.alt = item.dataset.alt;
  if (item.dataset.type === 'video') { media.controls = true; media.autoplay = true; }
  lightboxContent.replaceChildren(media);
  lightboxCaption.textContent = item.dataset.alt;
};
galleryItems.forEach((item) => item.addEventListener('click', () => {
  visibleItems = galleryItems.filter((galleryItem) => !galleryItem.classList.contains('hidden'));
  showItem(visibleItems.indexOf(item));
  lightbox.showModal();
}));
filterButtons.forEach((button) => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach((item) => item.classList.toggle('active', item === button));
  galleryItems.forEach((item) => item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter));
}));
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showItem(activeIndex - 1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => showItem(activeIndex + 1));
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
lightbox.addEventListener('close', () => lightboxContent.replaceChildren());
document.addEventListener('keydown', (event) => {
  if (!lightbox.open) return;
  if (event.key === 'ArrowLeft') showItem(activeIndex - 1);
  if (event.key === 'ArrowRight') showItem(activeIndex + 1);
});
