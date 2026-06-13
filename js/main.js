// Soul Sync Website - Main JavaScript
// Supports: Arabic (ar) & English (en)

document.addEventListener('DOMContentLoaded', () => {
  // ===== Language Switcher =====
  const langSwitch = document.getElementById('langSwitch');
  const langButtons = document.querySelectorAll('.lang-btn');
  let currentLang = 'en'; // Default: English

  // Load saved language preference
  const savedLang = localStorage.getItem('soulsync-lang');
  if (savedLang) {
    currentLang = savedLang;
  }

  function applyLanguage(lang) {
    currentLang = lang;
    const html = document.documentElement;

    // Update direction
    if (lang === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar');
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', 'en');
    }

    // Update all elements with data-ar and data-en
    document.querySelectorAll('[data-ar][data-en]').forEach(el => {
      // For input elements
      if (el.hasAttribute('placeholder')) {
        el.setAttribute('placeholder', el.getAttribute('data-' + lang));
      }
      // For elements with text content
      else {
        el.textContent = el.getAttribute('data-' + lang);
      }
    });

    // Update title
    const titleEl = document.querySelector('title[data-ar][data-en]');
    if (titleEl) {
      document.title = titleEl.getAttribute('data-' + lang);
    }

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"][data-ar][data-en]');
    if (metaDesc) {
      metaDesc.setAttribute('content', metaDesc.getAttribute('data-' + lang));
    }

    // Update active button
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Save preference
    localStorage.setItem('soulsync-lang', lang);

    // Refresh observer for animations (direction change may affect layout)
    setupScrollAnimations();
  }

  // Language button clicks
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.dataset.lang);
    });
  });

  // ===== Navbar scroll effect =====
  const navbar = document.getElementById('navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    if (window.pageYOffset > 50) {
      navbar.classList.add('scrolled');
    }
  }

  // ===== Mobile menu toggle =====
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // ===== Feature tabs =====
  const featureTabs = document.querySelectorAll('.feature-tab');
  const featureContents = document.querySelectorAll('.feature-content');

  featureTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;
      featureTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      featureContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === targetId) {
          content.classList.add('active');
        }
      });
    });
  });

  // ===== Smooth scroll for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== Scroll Animations =====
  function setupScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.product-card, .pricing-card, .layer, .about-card, .help-card, .memory-layer-card').forEach(el => {
      // Reset for re-observation
      el.classList.remove('visible');
      observer.observe(el);
    });
  }

  setupScrollAnimations();

  // ===== Consciousness bars animation =====
  const animateBars = () => {
    document.querySelectorAll('.mini-bar div').forEach((bar, index) => {
      const targetWidth = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 100 + (index * 150));
    });
  };

  const pricingSection = document.getElementById('pricing');
  if (pricingSection) {
    const pricingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateBars();
          pricingObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    pricingObserver.observe(pricingSection);
  }

  // ===== Parallax effect for orbs =====
  const orbs = document.querySelectorAll('.orb');
  let ticking = false;

  window.addEventListener('mousemove', (e) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        orbs.forEach((orb, index) => {
          const speed = (index + 1) * 15;
          const xOffset = (x - 0.5) * speed;
          const yOffset = (y - 0.5) * speed;
          orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });

  // ===== Loading state for buttons =====
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        const originalHTML = this.innerHTML;
        this.innerHTML = '<span>' + (currentLang === 'ar' ? 'قريباً...' : 'Coming soon...') + '</span>';
        this.style.opacity = '0.7';
        this.style.pointerEvents = 'none';
        setTimeout(() => {
          this.innerHTML = originalHTML;
          this.style.opacity = '1';
          this.style.pointerEvents = 'auto';
        }, 1500);
      }
    });
  });

  // ===== Active nav link based on scroll =====
  const sections = document.querySelectorAll('section[id]');
  const navLinkElements = document.querySelectorAll('.nav-link[href^="#"]');

  if (sections.length > 0 && navLinkElements.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinkElements.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  // ===== Apply initial language =====
  applyLanguage(currentLang);

  console.log('✨ Soul Sync website loaded — Language:', currentLang);
});