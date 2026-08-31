document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navItems = document.querySelectorAll('.nav-item');
  const themeToggle = document.getElementById('theme-toggle');
  const contactForm = document.getElementById('contact-form');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (hamburgerBtn && navMenu) {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      
      if (currentTheme === 'dark') {
        document.body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
      } else {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Pesan Anda telah berhasil dikirim!');
      contactForm.reset();
    });
  }

  const canvas = document.getElementById('webgl-bg');
  if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 80;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.25,
      color: 0xf97316, 
      transparent: true,
      opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const clock = new THREE.Clock();
    function animate() {
      const elapsedTime = clock.getElapsedTime();
      particlesMesh.rotation.y = elapsedTime * 0.05 + mouseX * 0.15;
      particlesMesh.rotation.x = -mouseY * 0.15;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    
    animate();
  }

  const projectCards = document.querySelectorAll('.github-card, .project-item-card');

  if (projectCards.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    projectCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
      observer.observe(card);
    });
  }

function copyToClipboard(elementId, btnElement) {
  const textToCopy = document.getElementById(elementId).innerText;
  
  navigator.clipboard.writeText(textToCopy).then(() => {
    const originalText = btnElement.innerText;
    btnElement.innerText = 'Tersalin!';
    btnElement.style.background = '#f97316';
    btnElement.style.color = '#ffffff';

    setTimeout(() => {
      btnElement.innerText = originalText;
      btnElement.style.background = 'transparent';
      btnElement.style.color = '#f97316';
    }, 2000);
  }).catch(err => {
    console.error('Gagal menyalin: ', err);
  });
}

// ==========================================
  // 4. AUTOMATIC PROFILE IMAGE SLIDER
  // ==========================================
  const slider = document.getElementById('profile-slider');
  const slides = document.querySelectorAll('.slider-img');
  
  if (slider && slides.length > 0) {
    let currentIndex = 0;
    const totalSlides = slides.length;
    const intervalTime = 3000; 
    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    let slideInterval = setInterval(nextSlide, intervalTime);

    slider.parentElement.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });

    slider.parentElement.addEventListener('mouseleave', () => {
      slideInterval = setInterval(nextSlide, intervalTime);
    });
  }
});