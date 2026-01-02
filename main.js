document.addEventListener("DOMContentLoaded", () => {

  /* ================= NAV ACTIVE ================= */
  const navLinks = document.querySelectorAll('.ul-list li a');
  const sections = document.querySelectorAll('section');

  function removeActive() {
    navLinks.forEach(link => link.parentElement.classList.remove('active'));
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const targetId = link.getAttribute('href')?.substring(1);
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: 'smooth'
      });

      removeActive();
      link.parentElement.classList.add('active');
    });
  });

  /* ================= BACK TO TOP ================= */
  const backToTop = document.createElement('div');
  backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
  backToTop.id = "back-to-top";
  document.body.appendChild(backToTop);

  backToTop.style.cssText = `
    position: fixed;
    bottom: 40px;
    right: 40px;
    background: #474af0;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1000;
    transition: transform 0.3s ease;
  `;

  backToTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  backToTop.addEventListener('mouseover', () =>
    backToTop.style.transform = 'scale(1.2)'
  );
  backToTop.addEventListener('mouseout', () =>
    backToTop.style.transform = 'scale(1)'
  );

  /* ================= REVEAL ================= */
  const revealElements = document.querySelectorAll(
    '.home-container, .about-container, .projects-container, .services-container, .contact-content'
  );
  revealElements.forEach(el => el.classList.add('reveal'));

  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        removeActive();
        const activeLink = document.querySelector(
          `.ul-list li a[href="#${section.id}"]`
        );
        if (activeLink) activeLink.parentElement.classList.add('active');
      }
    });

    backToTop.style.display = window.scrollY > 500 ? "flex" : "none";

    revealElements.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 150) {
        el.classList.add('active-reveal');
      }
    });
  });

  /* ================= CARD HOVER ================= */
  document.querySelectorAll('.project-card, .c1, .service-card')
    .forEach(card => {
      card.addEventListener('mouseenter', () =>
        card.style.transform = 'translateY(-8px) scale(1.05)'
      );
      card.addEventListener('mouseleave', () =>
        card.style.transform = 'translateY(0) scale(1)'
      );
    });

  /* ================= TYPING EFFECT ================= */
  const typingElement = document.querySelector('.info-home h3');
  if (typingElement) {
    const words = [
      "Frontend Developer",
      "UI/UX Designer",
      "Web Enthusiast",
      "React Developer",
      "Full Stack Java Developer"
    ];

    let wordIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
      const word = words[wordIndex];
      typingElement.innerHTML =
        word.substring(0, charIndex) + '<span class="cursor">|</span>';

      if (!isDeleting && charIndex < word.length) charIndex++;
      else if (isDeleting && charIndex > 0) charIndex--;
      else {
        isDeleting = !isDeleting;
        if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(type, isDeleting ? 50 : 100);
    }
    type();
  }

  /* ================= LOADING SCREEN ================= */
  const loadingScreen = document.getElementById("loading-screen");
  const mainPage = document.getElementById("main-page");

  if (loadingScreen && mainPage) {
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => loadingScreen.style.display = "none", 500);
      mainPage.classList.add("visible");
    }, 4000);
  }

});
