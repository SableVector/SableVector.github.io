// Jquert scripts

$(document).ready(function () {

   // Slider
   $('.carousel__inner').slick({
      dots: false,
      speed: 1200,
      autoplay: true,
      autoplaySpeed: 2000,
      adaptiveHeight: false,
      prevArrow: '<button type="button" class="slick-prev"><img src="img/carousel-arrow-left.png" alt=""></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="img/carousel-arrow-right.png" alt=""></button>',
      responsive: [
         {
            breakpoint: 900,
            settings: {
               arrows: false,
               dots: true,
               dotsClass: 'carousel-dots',
            }
         },
      ]
   });


   // Скрипт для работы с Табами
   $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab--active)', function () {
      $(this)
         .addClass('catalog__tab--active').siblings().removeClass('catalog__tab--active')
         .closest('div.container').find('ul.catalog__content').removeClass('catalog__content--active').eq($(this).index()).addClass('catalog__content--active');
   });

   // Скрипт для отображения описания товара в карточках

   function detailsLink(link) {
      $(link).each(function (i) {
         $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list--active');
         })
      });
   };


   // Модальные окна

   $('[data-modal=consultation]').on('click', function () {
      $('.overlay, #consultation').fadeIn('slow');
   });

   $('.button--catalog').on('click', function () {
      $('.overlay, #order').fadeIn('slow');
   })

   $('.button--catalog').each(function (i) {
      $(this).on('click', function () {
         $('#order .modal__subtitle').text($('.catalog-item__subtitle').eq(i).text());
         $('.overlay, #order').fadein('slow');
      });
   });

   $('.modal__close').on('click', function () {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
   });

   // Validy scripts
   function validateForms(form) {
      $(form).validate({
         rules: {
            name: "required",
            phone: "required",
            email: {
               required: true,
               email: true
            },
         },
         messages: {
            name: "Введите Ваше имя",
            phone: "Введите Ваш телефон",
            email: {
               required: "Введите вашу почту",
               email: "Неправильно введен адрес почты"
            }
         },
      });
   }

   // Маска для телефона type="number" нужно удалить

   // $("#date").mask("99/99/9999");
   $('input[name="phone"]').mask('+3 (999) 999 99 99');
   // $("#tin").mask("99-9999999");
   // $("#ssn").mask("999-99-9999");


   // Скрипт работающий с отправкой Форм на серер.

   $('form').submit(function (e) {
      e.preventDefault();
      $.ajax({
         type: "POST",
         url: "apps/mailer/smart.php",
         data: $(this).serialize()
      }).done(function () {
         $(this).find("input").val("");
         $('#consultation, #order').fadeOut();
         $('.overlay, #thanks').fadeIn('slow');

         $('form').trigger('reset');
      });
      return false;
   });

   /* Скрипт по отображению кнопки сбоку */

   $(window).scroll(function () {
      if ($(this).scrollTop() > 700) {
         $('.page-up').fadeIn();
      } else {
         $('.page-up').fadeOut();
      }
   });

   // Скрипт на плавный скрол
   $(function () {
      $("a[href = '#up']").click(function () {
         const _href = $(this).attr("href");
         $("html, body").animate({
            scrollTop: $(_href).offset().top
         }, {
            duration: 1500,   // по умолчанию «400» 
            easing: "linear" // по умолчанию «swing» 
         });
         return false;
      });
   });

   $(function () {
      $("a[href = '#catalog']").click(function () {
         const _href = $(this).attr("href");
         $("html, body").animate({
            scrollTop: $(_href).offset().top
         }, {
            duration: 1500,   // по умолчанию «400» 
            easing: "linear" // по умолчанию «swing» 
         });
         return false;
      });
   });


   /* Вызов функций */
   detailsLink('.catalog-item__link-details');
   detailsLink('.catalog-item__link-back');
   validateForms('.consultation-form');
   validateForms('#consultation form');
   validateForms('#order form');

   

   /* Скрипт подключающий WOW.js (Анимация) */
   new WOW().init();
});