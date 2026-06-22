/* ============================================
   VoltEdge — Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Sticky Navigation ----
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ---- Mobile Navigation Toggle ----
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile nav on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ---- Active Navigation Link on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinkElements = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinkElements.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ---- Hero Particles ----
  const particlesContainer = document.getElementById('particles');
  function createParticles() {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(0, 242, 254, ${Math.random() * 0.4 + 0.1});
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: float-particle ${Math.random() * 8 + 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 4}s;
      `;
      particlesContainer.appendChild(particle);
    }
  }
  createParticles();

  // Add particle animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float-particle {
      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
      25% { transform: translate(${Math.random() * 40 - 20}px, -${Math.random() * 40 + 20}px) scale(1.2); opacity: 1; }
      50% { transform: translate(${Math.random() * 60 - 30}px, -${Math.random() * 60 + 30}px) scale(0.8); opacity: 0.3; }
      75% { transform: translate(${Math.random() * 30 - 15}px, -${Math.random() * 20 + 10}px) scale(1.1); opacity: 0.7; }
    }
  `;
  document.head.appendChild(style);

  // ---- Counter Animation ----
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;
    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      countersAnimated = true;
      statNumbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          num.textContent = Math.floor(current);
        }, 16);
      });
    }
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // ---- Scroll Reveal Animation ----
  const fadeElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-wrapper');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  fadeElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    observer.observe(el);
  });

  // ---- Portfolio Filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
          item.style.display = '';
        } else {
          item.classList.add('hidden');
          item.style.display = 'none';
        }
      });
    });
  });

  // ---- Testimonials Slider ----
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('testimonialDots');
  const cards = track.querySelectorAll('.testimonial-card');
  let currentSlide = 0;
  const totalSlides = cards.length;

  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.testimonial-dots .dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
  });

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  });

  // Auto-advance testimonials
  let autoSlide = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }, 5000);

  // Pause on hover
  track.addEventListener('mouseenter', () => clearInterval(autoSlide));
  track.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      goToSlide(currentSlide);
    }, 5000);
  });

  // ---- Contact Form Validation ----
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    form.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('error');
    });

    // Validate name
    const name = form.querySelector('#name');
    if (!name.value.trim()) {
      showError(name, 'Please enter your name');
      isValid = false;
    }

    // Validate email
    const email = form.querySelector('#email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
      showError(email, 'Please enter a valid email');
      isValid = false;
    }

    // Validate service
    const service = form.querySelector('#service');
    if (!service.value) {
      showError(service, 'Please select a service');
      isValid = false;
    }

    // Validate message
    const message = form.querySelector('#message');
    if (!message.value.trim()) {
      showError(message, 'Please describe your project');
      isValid = false;
    }

    if (isValid) {
      // Show success state
      form.innerHTML = `
        <div class="form-success">
          <div class="success-icon">✓</div>
          <h3>Message Sent!</h3>
          <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
        </div>
      `;
    }
  });

  function showError(input, message) {
    const group = input.closest('.form-group');
    group.classList.add('error');
    let errorEl = group.querySelector('.error-message');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.classList.add('error-message');
      group.appendChild(errorEl);
    }
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }

  // ---- Smooth Scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});
