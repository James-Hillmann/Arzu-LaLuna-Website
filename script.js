// ===== MOBILE NAV TOGGLE =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== HEADER SHADOW ON SCROLL =====
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  header.style.boxShadow = window.scrollY > 10
    ? '0 2px 20px rgba(0,0,0,0.08)'
    : 'none';
});

// ===== HERO PHOTO SLIDESHOW =====
function startSlideshow(slotId, intervalMs) {
  const slot = document.getElementById(slotId);
  if (!slot) return;
  const slides = slot.querySelectorAll('.slide');
  let current = 0;

  function goTo(index) {
    slides[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
  }

  const prevBtn = slot.querySelector('.slide-arrow--prev');
  const nextBtn = slot.querySelector('.slide-arrow--next');

  if (slides.length <= 1) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    return;
  }

  let timer = setInterval(() => goTo(current + 1), intervalMs);

  function resetTimer(dir) {
    clearInterval(timer);
    goTo(current + dir);
    timer = setInterval(() => goTo(current + 1), intervalMs);
  }

  prevBtn.addEventListener('click', () => resetTimer(-1));
  nextBtn.addEventListener('click', () => resetTimer(1));
}

startSlideshow('photo-slot-left', 4000);
startSlideshow('photo-slot-right', 5500);

// ===== LIGHTBOX =====
(function() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const lightboxImg = document.getElementById('lightbox-img');
  let photos = [];
  let current = 0;

  function buildPhotoList() {
    const excluded = ['.hero-logo-main', '.hero-logo-usagym', '#lightbox-img'];
    const all = Array.from(document.querySelectorAll('img'));
    return all.filter(img => !excluded.some(sel => img.matches(sel)));
  }

  function openLightbox(img) {
    photos = buildPhotoList();
    current = photos.indexOf(img);
    lightboxImg.src = photos[current].src;
    lightboxImg.classList.remove('zoomed');
    lightboxImg.style.transform = '';
    lightbox.classList.add('open');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.classList.remove('zoomed');
    lightboxImg.style.transform = '';
  }

  lightboxImg.addEventListener('click', function(e) {
    e.stopPropagation();
    if (lightboxImg.classList.contains('zoomed')) {
      lightboxImg.classList.remove('zoomed');
      lightboxImg.style.transform = 'scale(1)';
    } else {
      const rect = lightboxImg.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      lightboxImg.style.transformOrigin = `${x}% ${y}%`;
      lightboxImg.style.transform = 'scale(2.5)';
      lightboxImg.classList.add('zoomed');
    }
  });

  buildPhotoList().forEach(img => {
    img.classList.add('lightbox-clickable');
    img.addEventListener('click', () => openLightbox(img));
  });

  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
  });
})();

// ===== CONTACT FORM =====
function handleSubmit(e) {
  e.preventDefault();
  const success = document.getElementById('form-success');
  success.style.display = 'block';
  e.target.reset();
  setTimeout(() => { success.style.display = 'none'; }, 4000);
}
