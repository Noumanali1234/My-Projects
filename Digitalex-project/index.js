const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
function showSlide(n) {
  slides[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}
setInterval(() => {
  showSlide(currentSlide + 1);
}, 5000);
