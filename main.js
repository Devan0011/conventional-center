import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

let lenis;
let testimonialSwiper;

document.addEventListener('DOMContentLoaded', () => {
  runPreloader();
  try { initApp(); } catch (e) { console.error('initApp failed:', e); }
});

function runPreloader() {
  const preloader = document.getElementById('preloader');
  const loaderPercent = document.querySelector('.loader-percent');
  const loaderBar = document.querySelector('.loader-bar');

  if (!preloader || !loaderPercent || !loaderBar) {
    return;
  }

  // Disable scroll during preloader
  document.body.style.overflow = 'hidden';
  if (lenis) lenis.stop();

  const minDuration = 2500;
  const startedAt = Date.now();

  let progress = 0;
  let hidden = false;
  let interval;

  const hidePreloader = () => {
    if (hidden) return;
    hidden = true;

    if (interval) window.clearInterval(interval);
    
    preloader.setAttribute('aria-hidden', 'true');
    
    try {
      const tl = gsap.timeline({
        onComplete: () => {
          preloader.style.display = 'none';
          document.body.style.overflow = '';
          if (lenis) lenis.start();
          AOS.refresh();
        }
      });
      tl.to(preloader, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
      });
    } catch {
      preloader.style.transition = 'transform 0.8s ease-in-out';
      preloader.style.transform = 'translateY(-100%)';
      window.setTimeout(() => {
        preloader.style.display = 'none';
        document.body.style.overflow = '';
        if (lenis) lenis.start();
        AOS.refresh();
      }, 800);
    }
  };

  interval = window.setInterval(() => {
    // Slower progress as it gets closer to 100 to feel more "real"
    const increment = progress < 70 
      ? Math.floor(Math.random() * 12) + 2 
      : Math.floor(Math.random() * 4) + 1;
    
    progress = Math.min(progress + increment, 99);
    loaderPercent.textContent = `${progress}%`;
    loaderBar.style.width = `${progress}%`;
  }, 100);

  // Force finish on window load or after a timeout
  const finishLoader = () => {
    if (hidden) return;

    const elapsed = Date.now() - startedAt;
    if (elapsed < minDuration) {
      window.setTimeout(finishLoader, minDuration - elapsed);
      return;
    }

    progress = 100;
    loaderPercent.textContent = '100%';
    loaderBar.style.width = '100%';
    window.clearInterval(interval);
    window.setTimeout(hidePreloader, 400);
  };

  const onLoad = () => {
    window.removeEventListener('load', onLoad);
    finishLoader();
  };
  window.addEventListener('load', onLoad);
  
  // Fail-safe timeout
  window.setTimeout(finishLoader, 4000);
}

function initApp() {
  initSmoothScroll();
  initAos();
  initSwipers();
  initNavbar();
  initCounters();
  initCountdowns();
  initModal();
  initButtons();
  initForms();
  initChat();
  initReviews();
}

function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

function scrollToTarget(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -80 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function initAos() {
  AOS.init({
    once: true,
    offset: 100,
    duration: 800,
    easing: 'ease-in-out-cubic',
  });
}

function initSwipers() {
  new Swiper('.venue-slider', {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    rewind: true,
    pagination: {
      el: '.venue-slider .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.venue-slider .swiper-button-next',
      prevEl: '.venue-slider .swiper-button-prev',
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },
    },
  });

  testimonialSwiper = new Swiper('.testimonial-slider', {
    modules: [Pagination, Autoplay],
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    rewind: true,
    pagination: {
      el: '.testimonial-slider .swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 6500,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = id('nav-links');

  function id(name) { return document.getElementById(name); }

  const updateScrolled = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
  };

  updateScrolled();
  window.addEventListener('scroll', updateScrolled, { passive: true });

  menuToggle?.addEventListener('click', () => {
    const isExpanded = menuToggle.classList.toggle('active');
    navLinks?.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', isExpanded);
  });

  navLinks?.querySelectorAll('a, button').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle?.classList.remove('active');
      navLinks?.classList.remove('active');
      document.body.classList.remove('menu-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });
}

function initCounters() {
  document.querySelectorAll('.counter').forEach((counter) => {
    const target = Number.parseFloat(counter.getAttribute('data-target') || '0');
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          innerHTML: target,
          duration: 2,
          snap: { innerHTML: Number.isInteger(target) ? 1 : 0.1 },
          ease: 'power2.out',
          onUpdate() {
            if (!Number.isInteger(target)) {
              counter.innerHTML = Number(this.targets()[0].innerHTML).toFixed(1);
            }
          },
        });
      },
    });
  });
}

function initCountdowns() {
  document.querySelectorAll('.countdown').forEach((countdown) => {
    const targetDateStr = countdown.getAttribute('data-date');
    const spans = countdown.querySelectorAll('span');
    if (!targetDateStr || spans.length < 4) return;

    const targetDate = new Date(`${targetDateStr}T00:00:00`).getTime();
    const update = () => {
      const distance = targetDate - Date.now();
      const clamped = Math.max(distance, 0);
      const days = Math.floor(clamped / 86400000);
      const hours = Math.floor((clamped % 86400000) / 3600000);
      const minutes = Math.floor((clamped % 3600000) / 60000);
      const seconds = Math.floor((clamped % 60000) / 1000);
      [days, hours, minutes, seconds].forEach((value, index) => {
        spans[index].textContent = String(value).padStart(2, '0');
      });
    };

    update();
    window.setInterval(update, 1000);
  });
}

function initModal() {
  const modal = document.getElementById('site-modal');
  if (!modal) return;

  modal.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });
}

function openModal(title, html) {
  const modal = document.getElementById('site-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  if (!modal || !modalTitle || !modalBody) return;

  modalTitle.textContent = title;
  modalBody.innerHTML = html;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeModal() {
  const modal = document.getElementById('site-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function initButtons() {
  document.querySelectorAll('[data-scroll-target]').forEach((button) => {
    button.addEventListener('click', () => scrollToTarget(button.dataset.scrollTarget));
  });

  document.querySelectorAll('.venue-info .btn').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.venue-card');
      const name = card?.querySelector('h3')?.textContent || 'Venue Details';
      const capacity = card?.querySelector('.capacity')?.textContent || '';
      const desc = card?.querySelector('.desc')?.textContent || '';
      openModal(
        name,
        `<p class="modal-kicker">${capacity}</p><p>${desc}</p><button class="btn btn-primary" data-scroll-target="#book">Request this venue</button>`,
      );
      document.querySelector('#site-modal [data-scroll-target]')?.addEventListener('click', () => {
        closeModal();
        scrollToTarget('#book');
      });
    });
  });

  document.querySelectorAll('[data-open-tour]').forEach((button) => {
    button.addEventListener('click', () => {
      openModal(
        'Virtual Tour',
        '<p>Interactive floor plans and 360-degree room previews are ready for the event team to walk you through. Submit a request and we will schedule a guided venue preview.</p><button class="btn btn-primary" data-scroll-target="#book">Schedule a tour</button>',
      );
      document.querySelector('#site-modal [data-scroll-target]')?.addEventListener('click', () => {
        closeModal();
        scrollToTarget('#book');
      });
    });
  });

  document.querySelectorAll('[data-share-event]').forEach((button) => {
    button.addEventListener('click', async () => {
      const card = button.closest('.event-card');
      const title = card?.querySelector('h3')?.textContent || document.title;
      const date = card?.querySelector('.event-date')?.textContent || '';
      const shareData = {
        title,
        text: `${title} at Aether Grand Convention Center. ${date}`,
        url: window.location.href.split('#')[0] + '#events',
      };

      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
          showToast('Event link copied.');
        }
      } catch (error) {
        if (error.name !== 'AbortError') showToast('Unable to share right now.');
      }
    });
  });
}

function initForms() {
  const form = document.getElementById('rfp-form');
  if (!form) return;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const status = form.querySelector('.form-status');
    const submit = form.querySelector('button[type="submit"]');
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.attendeeCount = Number(payload.attendeeCount);

    status.textContent = 'Submitting your request...';
    submit.disabled = true;

    try {
      await postApi('/api/rfps', payload);
      form.reset();
      status.textContent = 'Request submitted. Our events team will contact you shortly.';
    } catch {
      const saved = JSON.parse(localStorage.getItem('aetherRfpRequests') || '[]');
      saved.push({ ...payload, createdAt: new Date().toISOString() });
      localStorage.setItem('aetherRfpRequests', JSON.stringify(saved));
      form.reset();
      status.textContent = 'Request saved locally. Connect the backend API to submit it to the dashboard.';
    } finally {
      submit.disabled = false;
    }
  };

  window.submitRfpRequest = handleSubmit;
  form.addEventListener('submit', handleSubmit);
}

async function postApi(path, payload) {
  const bases = getApiBases();

  let lastError;
  for (const base of bases) {
    try {
      const response = await fetch(`${base}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) return response.json();
      lastError = new Error(`Request failed with ${response.status}`);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('Request failed');
}

function getApiBases() {
  const configuredBase = import.meta.env.VITE_API_URL?.replace(/\/$/, '');
  if (configuredBase) return [configuredBase];

  return import.meta.env.DEV ? [''] : [];
}

function initChat() {
  const chatToggle = document.querySelector('.chat-toggle');
  const chatWindow = document.querySelector('.chat-window');
  const closeChat = document.querySelector('.close-chat');
  const input = document.querySelector('.chat-input input');
  const sendButton = document.querySelector('.chat-input button');
  const body = document.querySelector('.chat-body');

  chatToggle?.addEventListener('click', () => {
    chatWindow?.classList.toggle('hidden');
    if (!chatWindow?.classList.contains('hidden')) input?.focus();
  });

  closeChat?.addEventListener('click', () => {
    chatWindow?.classList.add('hidden');
  });

  const sendMessage = () => {
    const text = input?.value.trim();
    if (!text || !body || !input) return;

    appendChatMessage(body, text, 'user-msg');
    input.value = '';
    window.setTimeout(() => {
      appendChatMessage(
        body,
        'Thanks. I can help with availability, venue capacity, catering, technical support, or proposal requests. For planning, the booking form is the fastest next step.',
        'ai-msg',
      );
    }, 300);
  };

  sendButton?.addEventListener('click', sendMessage);
  input?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') sendMessage();
  });
}

function appendChatMessage(container, text, className) {
  const message = document.createElement('div');
  message.className = `chat-msg ${className}`;
  message.textContent = text;
  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
}

function initReviews() {
  const form = document.getElementById('review-form');
  if (!form) return;

  loadSavedReviews();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const review = {
      name: data.get('reviewName'),
      role: data.get('reviewRole'),
      text: data.get('reviewText'),
      rating: data.get('rating'),
      id: Date.now(),
    };

    const saved = JSON.parse(localStorage.getItem('aetherReviews') || '[]');
    saved.unshift(review);
    localStorage.setItem('aetherReviews', JSON.stringify(saved));

    appendTestimonial(review);
    form.reset();
    showToast('Thank you for your review!');
  });
}

function loadSavedReviews() {
  const saved = JSON.parse(localStorage.getItem('aetherReviews') || '[]');
  saved.forEach((review) => appendTestimonial(review));
}

function appendTestimonial(review) {
  if (!testimonialSwiper) return;

  const stars = review.rating
    ? '<div class="review-rating">' + '★'.repeat(Number(review.rating)) + '</div>'
    : '';

  const slide = document.createElement('div');
  slide.className = 'swiper-slide';
  slide.innerHTML =
    '<div class="testimonial-card glass">' +
    '<div class="quote-icon">"</div>' +
    stars +
    '<p>"' + escapeHtml(review.text) + '"</p>' +
    '<div class="client-info">' +
    '<h4>' + escapeHtml(review.name) + '</h4>' +
    '<span>' + escapeHtml(review.role) + '</span>' +
    '</div>' +
    '</div>';

  testimonialSwiper.prependSlide(slide);
  testimonialSwiper.slideTo(0, 400);
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2200);
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
