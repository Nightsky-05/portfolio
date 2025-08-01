// Smooth scroll for anchor links (if needed)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Animation on scroll
const animateOnScroll = () => {
  const sections = document.querySelectorAll('.project-section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
  });
};

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  
  // Add animation class to hero
  const hero = document.querySelector('.project-hero');
  if (hero) {
    setTimeout(() => {
      hero.style.opacity = '1';
      hero.style.transform = 'translateY(0)';
    }, 100);
  }
});