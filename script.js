// Mobile Navigation
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');

// Toggle menu on button click
mobileMenuBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});

// Optional: Close menu when clicking outside of it (for better UX)
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 991) { // Only on mobile/tablet
    if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target) && nav.classList.contains('active')) {
      nav.classList.remove('active');
    }
  }
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    faqItems.forEach((faq) => {
      faq.classList.remove('open');
      faq.querySelector('.faq-answer').style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const revealTop = element.getBoundingClientRect().top;
    const revealPoint = 120;

    if (revealTop < windowHeight - revealPoint) {
      element.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Header Scroll Effect
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// PORTFOLIO DATA
const portfolioProjects = [
  {
    title: "Interior Painting For SABBLE",
    location: "Lekki Phase 1",
    duration: "8 Days",
    media: [
      {
        type: "image",
        src: "https://res.cloudinary.com/dglf6qtub/image/upload/f_auto,q_auto/1000328186_f9ao2l"
      },
      {
        type: "video",
        src: "https://res.cloudinary.com/dglf6qtub/video/upload/q_auto/f_auto/v1778839815/VID-20260514-WA0016_xfffel.mp4"
      }
    ]
  },
  {
    title: "Exterior Wall With Floor Painting & Design",
    location: "Silicon Vale Estate, Ologolo Lekki.",
    duration: "4 Days",
    media: [
      {
        type: "video",
        src: "https://res.cloudinary.com/dglf6qtub/video/upload/q_auto/f_auto/v1778840305/VID-20260514-WA0018_gqznkt.mp4"
      },
      {
        type: "video",
        src: "https://res.cloudinary.com/dglf6qtub/video/upload/q_auto/f_auto/v1778840304/VID-20260514-WA0017_ag511s.mp4"
      }
    ]
  },
  {
    title: "Office Painting For Iroko Interior & Consulting",
    location: "Ibukunoluwa house, opposite Eko Hotel, VI",
    duration: "2 Days",
    media: [
      {
        type: "video",
        src: "https://res.cloudinary.com/dglf6qtub/video/upload/q_auto/f_auto/v1778840724/VID-20260514-WA0013_qpdgws.mp4"
      }
    ]
  },
  {
    title: "Interior Painting For P&H Nova",
    location: "Adeola Odekun, VI",
    duration: "4 Days",
    media: [
      {
        type: "video",
        src: "https://res.cloudinary.com/dglf6qtub/video/upload/q_auto/f_auto/v1778841270/VID-20260515-WA0002_kvd9au.mp4"
      }
    ]
  },
  {
    title: "Interior Painting",
    location: "Ikotun, Lagos",
    duration: "2 Days",
    media: [
      {
        type: "video",
        src: "https://res.cloudinary.com/dglf6qtub/video/upload/q_auto/f_auto/v1778841605/VID-20260515-WA0003_u4n9pk.mp4"
      }
    ]
  },
  {
    title: "Floor Marking For GB FOODS",
    location: "Ijoko Road, Sango Ota, Ogun State",
    duration: "1 Day",
    media: [
      {
        type: "video",
        src: "https://res.cloudinary.com/dglf6qtub/video/upload/q_auto/f_auto/v1778841887/VID-20260515-WA0006_ih0oe0.mp4"
      },
      {
        type: "video",
        src: "https://res.cloudinary.com/dglf6qtub/video/upload/q_auto/f_auto/v1778841888/VID-20260515-WA0005_wr7z7u.mp4"
      },
      {
        type: "video",
        src: "https://res.cloudinary.com/dglf6qtub/video/upload/q_auto/f_auto/v1778841875/VID-20260515-WA0004_jxhh95.mp4"
      }
    ]
  }
];


// RENDER PORTFOLIO
const portfolioGrid = document.getElementById('portfolioGrid');

portfolioProjects.forEach((project, index) => {

  const firstMedia = project.media[0];

  let mediaHTML = '';

  if (firstMedia.type === 'image') {
    mediaHTML = `
      <img src="${firstMedia.src}" alt="${project.title}" />
    `;
  }

  if (firstMedia.type === 'video') {
    mediaHTML = `
      <video autoplay muted loop playsinline>
        <source src="${firstMedia.src}" type="video/mp4">
      </video>
    `;
  }

  const card = `
    <div class="portfolio-card">

      <div class="portfolio-media"
        onclick="openPortfolio(${index})">

        ${mediaHTML}

        ${
          project.media.length > 1
          ? `<div class="portfolio-count">
               +${project.media.length - 1}
             </div>`
          : ''
        }

      </div>

      <div class="portfolio-content">
        <h3>${project.title}</h3>
        <p>${project.location} • ${project.duration}</p>
      </div>

    </div>
  `;

  portfolioGrid.innerHTML += card;
});

const portfolioModal = document.getElementById('portfolioModal');
const portfolioModalContent = document.getElementById('portfolioModalContent');

function openPortfolio(index) {

  const project = portfolioProjects[index];

  let content = `
    <h2>${project.title}</h2>
    <p>${project.location} • ${project.duration}</p>

    <div class="portfolio-gallery">
  `;

  project.media.forEach((item) => {

    if (item.type === 'image') {
      content += `
        <img src="${item.src}" alt="${project.title}" />
      `;
    }

    if (item.type === 'video') {
      content += `
        <video controls>
          <source src="${item.src}" type="video/mp4">
        </video>
      `;
    }

  });

  content += `</div>`;

  portfolioModalContent.innerHTML = content;

  portfolioModal.classList.add('active');
}

function closePortfolio() {
  portfolioModal.classList.remove('active');
}