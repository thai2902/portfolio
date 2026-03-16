/* ============================================
   PORTFOLIO — Product Hunt Inspired
   JavaScript — Interactivity & Animations
   ============================================ */

// ——————————————————————————————
// Project Data
// ——————————————————————————————
const projectData = {
  rideflow: {
    title: 'RideFlow',
    tagline: 'Next-gen ride-sharing for modern commuters',
    description: 'RideFlow is a feature-rich ride-sharing app built with Flutter. It offers real-time GPS tracking, smart ETA predictions using ML, in-app payments via Stripe, and a beautiful Material 3 interface. The driver-side app includes route optimization and earnings analytics.',
    image: 'assets/images/rideflow.png',
    tags: ['Flutter', 'Dart', 'Firebase'],
    tagClasses: ['flutter', 'dart', 'firebase'],
    demoUrl: '#',
    sourceUrl: '#',
  },
  payvault: {
    title: 'PayVault',
    tagline: 'Enterprise payment SDK with real-time analytics',
    description: 'PayVault is a white-label payment SDK that supports 15+ payment gateways. Built as a native SDK for both iOS (Swift) and Android (Kotlin), with a TypeScript admin dashboard for transaction monitoring, fraud detection, and revenue analytics. Powers $2M+ in monthly transactions.',
    image: 'assets/images/payvault.png',
    tags: ['Kotlin', 'Swift', 'TypeScript'],
    tagClasses: ['kotlin', 'swift', 'typescript'],
    demoUrl: '#',
    sourceUrl: '#',
  },
  devpulse: {
    title: 'DevPulse',
    tagline: 'Developer analytics you\'ll actually use',
    description: 'DevPulse aggregates code metrics from GitHub, GitLab, and Bitbucket into a single beautiful dashboard. Track build pipeline efficiency, deployment frequency, team velocity, and code maintainability scores. Built with React and a Node.js backend processing 100K+ events daily.',
    image: 'assets/images/devpulse.png',
    tags: ['React', 'Node.js', 'TypeScript'],
    tagClasses: ['react', 'node', 'typescript'],
    demoUrl: '#',
    sourceUrl: '#',
  },
  foodiemap: {
    title: 'FoodieMap',
    tagline: 'Discover your next favorite restaurant',
    description: 'FoodieMap helps users find nearby restaurants with real-time ratings, curated food photography, delivery time estimates, and interactive menu previews. Features include location-based search, personalized recommendations, and social sharing. Built with Flutter and Firebase backend.',
    image: 'assets/images/foodiemap.png',
    tags: ['Flutter', 'Firebase', 'Dart'],
    tagClasses: ['flutter', 'firebase', 'dart'],
    demoUrl: '#',
    sourceUrl: '#',
  },
  codesnap: {
    title: 'CodeSnap',
    tagline: 'Your personal code snippet library',
    description: 'CodeSnap is a desktop app for developers to organize, search, and share code snippets. Features include syntax highlighting for 50+ languages, smart tagging, cloud sync, team sharing, and VS Code extension integration. Built with Electron and React for a fast, native-like experience.',
    image: 'assets/images/codesnap.png',
    tags: ['Electron', 'TypeScript', 'React'],
    tagClasses: ['electron', 'typescript', 'react'],
    demoUrl: '#',
    sourceUrl: '#',
  },
  healthsync: {
    title: 'HealthSync',
    tagline: 'Your wearable\'s best companion',
    description: 'HealthSync is an iOS companion app for health wearables. It beautifully visualizes heart rate trends, sleep quality metrics, step goals, and workout summaries. Deep HealthKit integration provides accurate data. Designed with accessibility-first Apple Human Interface Guidelines.',
    image: 'assets/images/healthsync.png',
    tags: ['Swift', 'HealthKit'],
    tagClasses: ['swift', 'healthkit'],
    demoUrl: '#',
    sourceUrl: '#',
  },
};

// ——————————————————————————————
// DOM Elements
// ——————————————————————————————
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalTagline = document.getElementById('modalTagline');
const modalDescription = document.getElementById('modalDescription');
const modalTags = document.getElementById('modalTags');

// ——————————————————————————————
// Mobile Nav Toggle
// ——————————————————————————————
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger
  const spans = navToggle.querySelectorAll('span');
  navToggle.classList.toggle('active');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ——————————————————————————————
// Active Nav on Scroll
// ——————————————————————————————
const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = navLinks.querySelector(`a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}

window.addEventListener('scroll', setActiveNav, { passive: true });

// ——————————————————————————————
// Category Filter
// ——————————————————————————————
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) {
        card.style.display = '';
        // Re-trigger animation
        card.classList.remove('visible');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            card.classList.add('visible');
          });
        });
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ——————————————————————————————
// Project Detail Modal
// ——————————————————————————————
function openModal(projectKey) {
  const data = projectData[projectKey];
  if (!data) return;

  modalImage.src = data.image;
  modalImage.alt = data.title;
  modalTitle.textContent = data.title;
  modalTagline.textContent = data.tagline;
  modalDescription.textContent = data.description;

  // Tags
  modalTags.innerHTML = '';
  data.tags.forEach((tag, i) => {
    const span = document.createElement('span');
    span.className = `tech-badge ${data.tagClasses[i]}`;
    span.textContent = tag;
    modalTags.appendChild(span);
  });

  // Show modal
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Card click → open modal
projectCards.forEach(card => {
  card.addEventListener('click', (e) => {
    // Don't open modal when clicking upvote
    if (e.target.closest('.card-upvote')) return;
    const projectKey = card.dataset.project;
    openModal(projectKey);
  });
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ——————————————————————————————
// Upvote Interaction
// ——————————————————————————————
document.querySelectorAll('.card-upvote').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const countEl = btn.querySelector('span:last-child');
    let count = parseInt(countEl.textContent);

    if (btn.classList.contains('upvoted')) {
      count--;
      btn.classList.remove('upvoted');
      btn.style.borderColor = '';
      btn.style.color = '';
      btn.querySelector('.arrow').style.color = '';
    } else {
      count++;
      btn.classList.add('upvoted');
      btn.style.borderColor = 'var(--accent)';
      btn.style.color = 'var(--accent)';
      btn.querySelector('.arrow').style.color = 'var(--accent)';
    }

    countEl.textContent = count;
  });
});

// ——————————————————————————————
// Scroll Reveal Animations
// ——————————————————————————————
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }
);

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ——————————————————————————————
// Navbar Scroll Effect
// ——————————————————————————————
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 50) {
    navbar.style.borderBottomColor = 'var(--border)';
  } else {
    navbar.style.borderBottomColor = 'transparent';
  }
  lastScrollY = scrollY;
}, { passive: true });

// ——————————————————————————————
// Smooth scroll polyfill for anchor links
// ——————————————————————————————
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ——————————————————————————————
// Initialize Icons
// ——————————————————————————————
lucide.createIcons();
