// Genaro Landscape — Main JS

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  navMenu.setAttribute('aria-hidden', String(!isOpen));

  // Toggle tabindex on nav links
  const links = navMenu.querySelectorAll('a');
  links.forEach(link => {
    link.setAttribute('tabindex', isOpen ? '0' : '-1');
  });
});

// Close nav on link click
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('aria-hidden', 'true');
    navMenu.querySelectorAll('a').forEach(l => l.setAttribute('tabindex', '-1'));
  });
});

// Nav shadow on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Formspree AJAX submit
const form = document.querySelector('form[action*="formspree"]');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        btn.textContent = 'Message Sent!';
        btn.style.background = '#039146';
        let success = form.querySelector('.form-success');
        if (!success) {
          success = document.createElement('div');
          success.className = 'form-success';
          success.textContent = 'Thank you! We\'ll be in touch soon.';
          form.appendChild(success);
        }
        success.classList.add('show');
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      btn.textContent = 'Error — Try Again';
      btn.disabled = false;
      btn.style.background = '#c0392b';
    }
  });
}
