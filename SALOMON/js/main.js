"use strict";

// Slider

const swiper = new Swiper('.team-slider__container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    autoplay: {
        delay: 4000,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.team-slider__btn--next',
        prevEl: '.team-slider__btn--prev',
    },
});

const galleryTop = new Swiper('.best-barbershop__swiper2', {
    loop: true,
    loopedSlides: 4,
    spaceBetween: 10,
    navigation: {
        nextEl: ".best-barbershop-slider__btn--next",
        prevEl: ".best-barbershop-slider__btn--prev",
    },
});
const galleryThumbs = new Swiper('.best-barbershop__swiper', {
    spaceBetween: 20,
    centeredSlides: true,
    slidesPerView: 7,
    touchRatio: 0.2,
    slideToClickedSlide: true,
    loop: true,
    loopedSlides: 4
});
galleryTop.controller.control = galleryThumbs;
galleryThumbs.controller.control = galleryTop;

// WOW Animation

const wow = new WOW(
    {
        boxClass: 'wow',      // default
        animateClass: 'animated', // default
        offset: 0,          // default
        mobile: true,       // default
        live: true        // default
    }
);
wow.init();

// Vanila JavaScript

// Burger button ================================

const burger = document.querySelector('.btn__burger');
const getMainMenu = document.querySelector('.menu');

burger.addEventListener('click', () => {
    getMainMenu.classList.toggle('menu--active');
    burger.classList.toggle('btn__burger--active');
});

// delete menu
const getUrlDocument = document.location.pathname;

if (getUrlDocument === '/about-us.html') {
    burger.style.display = 'none';
    getMainMenu.style.display = 'none';
}

const getMainMenuLinks = document.querySelectorAll('.menu__link[href^="#"]');
const getPromoBtn = document.querySelectorAll('.promo__btn');

function smoothScrolling(a) {
    a.forEach(link => {

        link.addEventListener('click', function (e) {
            e.preventDefault();

            let href = this.getAttribute('href').substring(1);

            const scrollTarget = document.getElementById(href);

            const topOffset = document.querySelector('.header').offsetHeight;
            // const topOffset = 0; // если не нужен отступ сверху 
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

smoothScrolling(getMainMenuLinks);
smoothScrolling(getPromoBtn);
