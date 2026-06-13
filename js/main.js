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
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      // Hide navbar on scroll down, show on scroll up (mobile optimization)
      if (window.innerWidth <= 768) {
        if (currentScroll > lastScroll && currentScroll > 100) {
          navbar.style.transform = 'translateY(-100%)';
        } else {
          navbar.style.transform = 'translateY(0)';
        }
      }
      lastScroll = currentScroll;
    }, { passive: true });
    if (window.pageYOffset > 50) {
      navbar.classList.add('scrolled');
    }
  }

  // ===== Mobile menu toggle =====
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  let menuOpen = false;

  function openMenu() {
    if (!navLinks || !mobileToggle) return;
    menuOpen = true;
    navLinks.classList.add('active');
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  function closeMenu() {
    if (!navLinks || !mobileToggle) return;
    menuOpen = false;
    navLinks.classList.remove('active');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // Restore scroll
  }

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      if (menuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (menuOpen && !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuOpen) {
        closeMenu();
      }
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && menuOpen) {
        closeMenu();
      }
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
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Scroll Animations =====
  let scrollObserver = null;

  function setupScrollAnimations() {
    // Disconnect existing observer if any
    if (scrollObserver) {
      scrollObserver.disconnect();
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.05
    };

    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally unobserve after animation
          // scrollObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      '.product-card, .pricing-card, .layer, .about-card, .help-card, .memory-layer-card'
    );

    animatedElements.forEach(el => {
      el.classList.remove('visible');
      scrollObserver.observe(el);
    });
  }

  setupScrollAnimations();

  // ===== Consciousness bars animation =====
  const animateBars = () => {
    document.querySelectorAll('.mini-bar div').forEach((bar, index) => {
      const targetWidth = bar.style.width;
      bar.style.width = '0';
      // Force reflow
      void bar.offsetWidth;
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
    }, { threshold: 0.2 });
    pricingObserver.observe(pricingSection);
  }

  // ===== Parallax effect for orbs =====
  const orbs = document.querySelectorAll('.orb');
  let ticking = false;
  let isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  // Disable parallax on touch devices for better performance
  if (!isTouchDevice && orbs.length > 0) {
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
    }, { passive: true });
  }

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
    }, { threshold: 0.2, rootMargin: '-80px 0px -50% 0px' });

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  // ===== Touch swipe support for feature tabs =====
  const featuresShowcase = document.querySelector('.features-showcase');
  if (featuresShowcase) {
    let touchStartX = 0;
    let touchEndX = 0;

    featuresShowcase.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    featuresShowcase.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      const activeTab = document.querySelector('.feature-tab.active');
      if (!activeTab) return;

      const tabs = Array.from(featureTabs);
      const currentIndex = tabs.indexOf(activeTab);

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentIndex < tabs.length - 1) {
          // Swipe left -> next tab
          tabs[currentIndex + 1].click();
        } else if (diff < 0 && currentIndex > 0) {
          // Swipe right -> previous tab
          tabs[currentIndex - 1].click();
        }
      }
    }
  }

  // ===== Apply initial language =====
  applyLanguage(currentLang);

  // ===== Preload critical images =====
  const criticalImages = [
    'assets/soulsync-logo.png',
    'assets/mytwin-logo.png'
  ];
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  console.log('✨ Soul Sync website loaded — Language:', currentLang);
});
