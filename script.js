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

// ===== CONTACT FORM =====
function handleSubmit(e) {
  e.preventDefault();
  const success = document.getElementById('form-success');
  success.style.display = 'block';
  e.target.reset();
  setTimeout(() => { success.style.display = 'none'; }, 4000);
}
