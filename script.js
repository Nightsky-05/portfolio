// Preloader Animation
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const main = document.getElementById("main-content");
  const progress = document.querySelector(".progress");
  
  // Animate progress bar
  let width = 0;
  const progressInterval = setInterval(() => {
    if (width >= 100) {
      clearInterval(progressInterval);
    } else {
      width += 1;
      progress.style.width = width + "%";
    }
  }, 30);
  
  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";
    main.classList.remove("hidden");
    
    // Initialize animations after preloader
    initAnimations();
    initParticles();
    initChart();
    initScrollEffects();
  }, 3000);
});

// Initialize AOS animations
function initAnimations() {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    mirror: true
  });
  
  // Animate skill bars
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    const level = item.getAttribute('data-level');
    const progressBar = item.querySelector('.skill-progress');
    const percentText = item.querySelector('.skill-percent');
    
    // Only animate when in view
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        progressBar.style.width = level + '%';
        percentText.textContent = level + '%';
        observer.unobserve(item);
      }
    }, { threshold: 0.5 });
    
    observer.observe(item);
  });
  
  // Animate stats counters
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(number => {
    const target = parseInt(number.getAttribute('data-count'));
    const duration = 2000;
    const startTime = Date.now();
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const animateCounter = () => {
          const currentTime = Date.now();
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const value = Math.floor(progress * target);
          
          number.textContent = value;
          
          if (progress < 1) {
            requestAnimationFrame(animateCounter);
          }
        };
        
        animateCounter();
        observer.unobserve(number);
      }
    }, { threshold: 0.5 });
    
    observer.observe(number);
  });
}

// Initialize particles.js
function initParticles() {
  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#0ff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.5,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#0ff",
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": true,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 0.5
          }
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
  });
}

// Initialize skills radar chart
function initChart() {
  const ctx = document.getElementById('skills-chart').getContext('2d');
  
  const skillsChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'UI/UX', 'Figma'],
      datasets: [{
        label: 'Skill Level',
        data: [95, 90, 85, 80, 90, 85],
        backgroundColor: 'rgba(0, 255, 255, 0.2)',
        borderColor: 'rgba(0, 255, 255, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(0, 255, 255, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(0, 255, 255, 1)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          angleLines: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          suggestedMin: 0,
          suggestedMax: 100,
          pointLabels: {
            color: '#fff',
            font: {
              family: 'Orbitron'
            }
          },
          ticks: {
            backdropColor: 'transparent',
            color: 'rgba(255, 255, 255, 0.5)',
            showLabelBackdrop: false
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      },
      elements: {
        line: {
          tension: 0.1
        }
      }
    }
  });
}

// Initialize scroll effects
function initScrollEffects() {
  // Back to top button
  const backToTop = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Navbar scroll effect
  const navbar = document.querySelector('.cosmic-nav');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(0, 8, 20, 0.95)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.1)';
    } else {
      navbar.style.backgroundColor = 'rgba(0, 8, 20, 0.8)';
      navbar.style.boxShadow = 'none';
    }
  });
  
  // Mobile menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// Typing animation for name
const typedName = document.getElementById("typed-name");
const nameToType = "Jacintha Preethi";
let nameIndex = 0;

function typeName() {
  if (nameIndex < nameToType.length) {
    typedName.textContent += nameToType.charAt(nameIndex);
    nameIndex++;
    setTimeout(typeName, 150);
  } else {
    // Start cursor blink animation after typing completes
    document.querySelector('.cursor').style.animation = 'blink 0.7s infinite';
  }
}

// Smooth scroll to section
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

// Start typing animation after preloader
window.addEventListener("load", () => {
  setTimeout(() => {
    typeName();
  }, 3100); // match preloader timeout
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    console.log({ name, email, subject, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
  });
}

// Add this to your existing JavaScript
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateZ(0)';
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateZ(0)';
  });
});

function setupModal(linkId, boxId, closeId, carouselId, prevId, nextId) {
  const link = document.getElementById(linkId);
  const box = document.getElementById(boxId);
  const closeBtn = document.getElementById(closeId);
  const carousel = document.getElementById(carouselId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);

  const images = carousel.querySelectorAll("img");
  const totalImages = images.length;
  let currentIndex = 0;
  let autoScroll;

  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function startAutoScroll() {
    autoScroll = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalImages;
      updateCarousel();
    }, 3000);
  }

  function stopAutoScroll() {
    clearInterval(autoScroll);
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalImages;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateCarousel();
  });

  carousel.addEventListener("mouseenter", stopAutoScroll);
  carousel.addEventListener("mouseleave", startAutoScroll);

  link.addEventListener("click", (e) => {
    e.preventDefault();
    currentIndex = 0;
    updateCarousel();
    box.style.display = "flex";
    stopAutoScroll();
    startAutoScroll();
  });

  closeBtn.addEventListener("click", () => {
    box.style.display = "none";
    stopAutoScroll();
  });

  window.addEventListener("click", (e) => {
    if (e.target === box) {
      box.style.display = "none";
      stopAutoScroll();
    }
  });
}

// 🖼 Call for each modal
setupModal("sketchLink", "sketchBox", "closeBtn", "carousel", "prevBtn", "nextBtn");
setupModal("postersLink", "posterBox", "closePosterBtn", "posterCarousel", "prevPosterBtn", "nextPosterBtn");
setupModal("otherLink", "otherBox", "closeOtherBtn", "otherCarousel", "prevOtherBtn", "nextOtherBtn");
