/**
 * Gabriel H. Quiroga — Portfolio Scripts
 */

(function () {
  'use strict';

  // Safe localStorage wrapper (handles file:// and private mode)
  function store() {
    try {
      return window.localStorage || null;
    } catch (e) {
      return null;
    }
  }

  // --- Fade-in Sections on Scroll ---
  function initFadeSections() {
    const sections = document.querySelectorAll('.fade-section');
    if (!sections.length) return;

    if (!('IntersectionObserver' in window)) {
      sections.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    sections.forEach(function (el) { observer.observe(el); });
  }

  // --- Smooth Scroll for Anchor Links ---
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });
  }

  // --- Typewriter Effect ---
  function initTypewriter() {
    const typewriter = document.querySelector('.typewriter');
    if (!typewriter) return;
    
    const text = typewriter.dataset.text;
    let index = 0;
    
    function type() {
      if (index < text.length) {
        typewriter.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100);
      }
    }
    
    type();
  }

  // --- Years Counter (experience section) ---
  function initYearsCounter() {
    var counter = document.querySelector('.exp-years-number');
    if (!counter) return;

    // Dynamic: started 2020
    var total = new Date().getFullYear() - 2020;

    if (!('IntersectionObserver' in window)) {
      counter.textContent = total;
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var current = 0;
          var increment = total / 30;
          var timer = setInterval(function () {
            current += increment;
            if (current >= total) {
              counter.textContent = total;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, 40);
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(counter);
  }
  function initStackAnimation() {
    const categories = document.querySelectorAll('.stack-category');
    if (!categories.length) return;
    
    const observerOptions = {
      threshold: 0.3
    };
    
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.stack-item');
          items.forEach(function (item, index) {
            setTimeout(function () {
              item.classList.add('visible');
            }, index * 50);
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    categories.forEach(function (cat) {
      observer.observe(cat);
    });
  }

  // --- Theme Toggle (browser preference aware) ---
  function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const html = document.documentElement;
    const ls = store();
    const saved = ls ? ls.getItem('theme') : null;

    function applyTheme(theme) {
      html.setAttribute('data-theme', theme);
    }

    // Priority: saved preference > OS preference > light
    if (saved) {
      applyTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }

    // Listen for OS theme changes (only when no manual override)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      var ls2 = store();
      if (!ls2 || !ls2.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });

    toggle.addEventListener('click', function () {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      var ls3 = store();
      if (ls3) ls3.setItem('theme', next);
    });
  }

  // --- Problem Cards: expand on click ---
  function initProblemCards() {
    if (typeof translations === 'undefined') return;
    const items = document.querySelectorAll('.problems li');
    if (!items.length) return;

    var lang = document.documentElement.getAttribute('lang') || 'es';

    items.forEach(function (item) {
      var hint = document.createElement('span');
      hint.className = 'problem-hint';
      var key = 'hint-' + item.getAttribute('data-i18n');
      hint.setAttribute('data-i18n', key);
      hint.innerHTML = (translations[lang] && translations[lang][key]) || '';
      item.appendChild(hint);

      item.addEventListener('click', function () {
        var wasOpen = item.classList.contains('open');
        items.forEach(function (el) { el.classList.remove('open'); });
        if (!wasOpen) item.classList.add('open');
      });
    });
  }

  // --- Language Toggle & Detection ---
  function initLanguage() {
    var toggle = document.getElementById('lang-toggle');
    if (!toggle) return;

    var html = document.documentElement;
    var ls = store();
    var saved = ls ? ls.getItem('lang') : null;

    // Determine initial language: saved > browser > es
    var lang;
    if (saved) {
      lang = saved;
    } else {
      var browserLang = (navigator.language || navigator.userLanguage || '').slice(0, 2);
      lang = browserLang === 'en' ? 'en' : 'es';
      if (ls) ls.setItem('lang', lang);
    }

    function applyLang(lang) {
      if (typeof translations === 'undefined') return;
      html.setAttribute('lang', lang);
      // Update all data-i18n elements (only leaf elements with text content)
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key] !== undefined) {
          // Only replace innerHTML on elements with no child elements
          // (skip sections/containers — they use data-i18n for aria-label)
          if (!el.querySelector('*')) {
            el.innerHTML = translations[lang][key];
          }
          // Always update aria-label
          el.setAttribute('aria-label', translations[lang][key]);
        }
      });
      // Update tech tooltips
      document.querySelectorAll('.stack-item').forEach(function (el) {
        var desc = el.getAttribute('data-desc-' + lang);
        if (desc) {
          el.setAttribute('data-desc', desc);
        }
      });
      // Update lang toggle label
      toggle.textContent = translations[lang]['lang-toggle'] || (lang === 'es' ? 'EN' : 'ES');
      // Recreate Lucide icons
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
      // Handle hero-title specially (has child <em> element — skipped by the general loop above)
      var heroTitle = document.querySelector('[data-i18n="hero-title"]');
      if (heroTitle && translations[lang] && translations[lang]['hero-title']) {
        heroTitle.innerHTML = translations[lang]['hero-title'];
      }

      // Re-init typewriter with current language text
      var tw = document.querySelector('.typewriter');
      if (tw) {
        tw.textContent = '';
        var typeText = lang === 'en' ? 'writes code' : 'escribe código';
        tw.dataset.text = typeText;
        (function type(index) {
          if (index < typeText.length) {
            tw.textContent += typeText.charAt(index);
            setTimeout(type, 100, index + 1);
          }
        })(0);
      }
    }

    applyLang(lang);

    toggle.addEventListener('click', function () {
      var current = html.getAttribute('lang');
      var next = current === 'es' ? 'en' : 'es';
      var ls4 = store();
      if (ls4) ls4.setItem('lang', next);
      applyLang(next);
    });
  }

  // --- Initialize Lucide Icons ---
  function initLucide() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // --- Initialize ---
  document.addEventListener('DOMContentLoaded', function () {
    initLucide();
    initFadeSections();
    initSmoothScroll();
    initThemeToggle();
    initLanguage();
    initYearsCounter();
    initStackAnimation();
    initProblemCards();
  });
})();
