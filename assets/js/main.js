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
     * Mobile nav toggle
     */
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

    function mobileNavToogle() {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
    }
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
        navmenu.addEventListener('click', () => {
            if (document.querySelector('.mobile-nav-active')) {
                mobileNavToogle();
            }
        });

    });

    /**
     * Toggle mobile nav dropdowns
     */
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
        navmenu.addEventListener('click', function (e) {
            e.preventDefault();
            this.parentNode.classList.toggle('active');
            this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
            e.stopImmediatePropagation();
        });
    });

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
    scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

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

        // نجدد الـ AOS بعد ما نغير العرض
        if (typeof AOS !== "undefined") {
            AOS.refresh();
        }
    }

    // أول ما الصفحة تفتح نخلي الكل ظاهر
    filterServices("*");

    // عند التغيير
    select.addEventListener("change", function () {
        filterServices(this.value);

        // Scroll للـ services
        document.querySelector("#services").scrollIntoView({
            behavior: "smooth"
        });
    });
});




// فتح وقفل المنيو في الموبايل
document.addEventListener("DOMContentLoaded", function () {
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    const navMenu = document.querySelector("#navmenu");
  
    if (mobileNavToggle && navMenu) {
      mobileNavToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
        this.classList.toggle("bi-x");
        this.classList.toggle("bi-list");
      });
    }
  });
  document.addEventListener("DOMContentLoaded", function () {
    const scrollTopBtn = document.getElementById("scroll-top");
  
    // إظهار/إخفاء Scroll to top
    window.addEventListener("scroll", function () {
      if (window.scrollY > 200) {
        scrollTopBtn.style.display = "flex";
      } else {
        scrollTopBtn.style.display = "none";
      }
    });
  
    // حركة الرجوع لفوق
    scrollTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
  // زر فتح/غلق المنيو
const navToggle = document.querySelector('.mobile-nav-toggle');
const navMenu = document.querySelector('.navmenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// عند الضغط على أي لينك
document.querySelectorAll('.navmenu a').forEach(link => {
  link.addEventListener('click', () => {
    // شيل الـ active من باقي اللينكات
    document.querySelectorAll('.navmenu a').forEach(l => l.classList.remove('active-link'));
    // ضيفه على اللينك اللي اتضغط
    link.classList.add('active-link');

    // لو اللينك مش dropdown → قفل المنيو
    if (!link.closest('.dropdown')) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
});

// dropdown toggle
document.querySelectorAll('.navmenu .dropdown > a').forEach(drop => {
  drop.addEventListener('click', (e) => {
    e.preventDefault(); // منع الانتقال
    drop.parentElement.classList.toggle('open');
  });
});


document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".navmenu .dropdown > a");
  
    dropdowns.forEach(drop => {
      drop.addEventListener("click", e => {
        e.preventDefault(); // prevent navigation
        const parent = drop.parentElement;
  
        // Close other dropdowns
        document.querySelectorAll(".navmenu .dropdown").forEach(d => {
          if (d !== parent) d.classList.remove("open");
        });
  
        // Toggle current one
        parent.classList.toggle("open");
      });
    });
  
    // Mobile nav toggle
    const mobileToggle = document.querySelector(".mobile-nav-toggle");
    const navmenu = document.querySelector("#navmenu");
  
    mobileToggle.addEventListener("click", () => {
      navmenu.classList.toggle("active");
    });
  });

  function showImage(src) {
    document.getElementById("modalImage").src = src;
  }

  const gallery = document.getElementById("design-gallery");

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

  // تفعيل Glightbox
  const lightbox = GLightbox({
    selector: '.glightbox'
  });