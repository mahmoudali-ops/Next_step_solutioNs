/**
* Template Name: NewBiz
* Template URL: https://bootstrapmade.com/newbiz-bootstrap-business-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/* -----------------------------
   فلترة الخدمات (Services Filter)
------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("services-select");
  const services = document.querySelectorAll("#services .col-lg-4");

  function filterServices(value) {
    services.forEach(item => {
      if (value === "*" || item.classList.contains(value)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  }

  filterServices("*");

  if (select) {
    select.addEventListener("change", function () {
      filterServices(this.value);
      document.querySelector("#services").scrollIntoView({
        behavior: "smooth"
      });
    });
  }
});

/* -----------------------------
   الموبايل منيو (الكود الجديد فقط)
------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.navmenu');

  console.log('Mobile menu elements:', { navToggle, navMenu });

  if (navToggle && navMenu) {
    // فتح/قفل المنيو
    navToggle.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Toggle clicked, current state:', navMenu.classList.contains('active'));
      
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      
      // تغيير الأيقونة
      if (navMenu.classList.contains('active')) {
        navToggle.classList.remove('bi-list');
        navToggle.classList.add('bi-x');
        console.log('Menu opened');
      } else {
        navToggle.classList.remove('bi-x');
        navToggle.classList.add('bi-list');
        console.log('Menu closed');
      }
    });
  } else {
    console.error('Mobile menu elements not found!');
  }

  if (navToggle && navMenu) {
    // عند الضغط على أي لينك → يقفل المنيو (لو مش dropdown)
    document.querySelectorAll('.navmenu a').forEach(link => {
      link.addEventListener('click', () => {
        document.querySelectorAll('.navmenu a').forEach(l => l.classList.remove('active-link'));
        link.classList.add('active-link');

        if (!link.closest('.dropdown')) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
          navToggle.classList.remove('bi-x');
          navToggle.classList.add('bi-list');
        }
      });
    });

    // فتح/قفل الـ dropdown
    document.querySelectorAll('.navmenu .dropdown > a').forEach(drop => {
      drop.addEventListener('click', (e) => {
        e.preventDefault();
        drop.parentElement.classList.toggle('open');
      });
    });

    // إغلاق القائمة عند الضغط خارجها
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.classList.remove('bi-x');
        navToggle.classList.add('bi-list');
      }
    });

    // إغلاق القائمة عند تغيير حجم الشاشة
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1200) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.classList.remove('bi-x');
        navToggle.classList.add('bi-list');
      }
    });
  }
});

/* -----------------------------
   جاليري الصور (GLightbox)
------------------------------*/
function showImage(src) {
  document.getElementById("modalImage").src = src;
}

const gallery = document.getElementById("design-gallery");
if (gallery) {
  for (let i = 3; i <= 39; i++) {
    gallery.innerHTML += `
      <div class="col-6 col-md-4 col-lg-3 mb-4">
        <div class="card design-card shadow-sm border-0 rounded-3 overflow-hidden position-relative">
          <a href="assets/img/design/d${i}.jpg" class="glightbox" data-gallery="design-gallery">
            <img src="assets/img/design/d${i}.jpg" class="card-img design-img" alt="Design Example ${i}">
          </a>
        </div>
      </div>
    `;
  }

  GLightbox({ selector: '.glightbox' });
}


