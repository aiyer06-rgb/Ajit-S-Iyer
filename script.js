// Sticky nav shadow
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

reveals.forEach(el => observer.observe(el));
// SAP Carousel
const track = document.getElementById('sapTrack');
const dotsContainer = document.getElementById('sapDots');

if (track && dotsContainer) {
  const cards = track.querySelectorAll('.sap-card');
  let currentIndex = 0;
  const totalSlides = cards.length;

  // Build dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  function updateCarousel() {
    const wrapWidth = track.querySelector('.sap-card').offsetWidth;
    track.style.transform = `translateX(-${currentIndex * wrapWidth}px)`;
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  }

  window.moveCarousel = function(dir) {
    currentIndex = (currentIndex + dir + totalSlides) % totalSlides;
    updateCarousel();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }
  window.addEventListener('resize', updateCarousel);
}