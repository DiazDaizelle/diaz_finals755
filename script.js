// Universal Script for All Pages

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  if (darkModeToggle) {
    if (localStorage.getItem('theme') === 'dark') {
      body.classList.add('dark');
      darkModeToggle.textContent = '☀️';
    } else {
      darkModeToggle.textContent = '🌙';
    }

    darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      const isDark = body.classList.contains('dark');
      darkModeToggle.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  const navToggle = document.getElementById('nav-toggle');
  const navList = document.querySelector('.nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
  function revealOnScroll() {
    animatedElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight - 100) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  const scrollIndicator = document.createElement('div');
  scrollIndicator.id = 'scroll-indicator';
  scrollIndicator.style.position = 'fixed';
  scrollIndicator.style.top = '0';
  scrollIndicator.style.left = '0';
  scrollIndicator.style.height = '4px';
  scrollIndicator.style.backgroundColor = '#4a6fa5';
  scrollIndicator.style.width = '0%';
  scrollIndicator.style.zIndex = '1000';
  scrollIndicator.style.transition = 'width 0.25s ease';
  document.body.appendChild(scrollIndicator);

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    scrollIndicator.style.width = scrollPercent + '%';
  });

  const projectContainer = document.querySelector('.dynamic-projects');
  if (projectContainer) {
    const mockProjects = [
      { title: 'Inventory System', description: 'A full-featured inventory tracking system using PHP and MySQL.' },
      { title: 'Portfolio Builder', description: 'A drag-and-drop portfolio website builder for students.' },
      { title: 'Scout App', description: 'A mobile-first event tracker for Iloilo Girl Scout Council.' }
    ];

    mockProjects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card fade-in';
      card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      `;
      projectContainer.appendChild(card);
    });
  }

  // FEATURED PROJECTS CAROUSEL INTERACTION
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector('.carousel-button--right');
    const prevButton = carousel.querySelector('.carousel-button--left');

    let currentIndex = 0;

    function updateCarousel() {
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

      prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
      nextButton.style.display = currentIndex === slides.length - 1 ? 'none' : 'block';

      slides.forEach((slide, index) => {
        slide.classList.toggle('current-slide', index === currentIndex);
      });
    }

    updateCarousel();

    nextButton.addEventListener('click', () => {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateCarousel();
      }
    });

    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    window.addEventListener('resize', updateCarousel);

    // Swipe support
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    track.addEventListener('touchmove', e => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;

      if (Math.abs(diffX) > 50) {
        if (diffX > 0 && currentIndex < slides.length - 1) {
          currentIndex++;
        } else if (diffX < 0 && currentIndex > 0) {
          currentIndex--;
        }
        updateCarousel();
        isDragging = false;
      }
    });

    track.addEventListener('touchend', () => {
      isDragging = false;
    });
  }
});
