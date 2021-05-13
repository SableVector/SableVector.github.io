"use strict";

// Vanila JavaScript
const burger = document.querySelector('.btn__burger'),
    getMainMenu = document.querySelector('.menu'),
    menuActive = 'menu--active',
    getMainMenuLinks = document.querySelectorAll('.menu__link[href^="#"]'),
    getPromoBtn = document.querySelectorAll('.promo__btn'),
    getForm = document.querySelector('.request__form'),
    getUrlDocument = document.location.pathname,
    getValidateBtn = document.querySelector('.request__form-btn'),
    getFormName = document.getElementById('name'),
    getFormEmail = document.getElementById('email'),
    getFormPhone = document.getElementById('phone'),
    getFormTextarea = document.getElementById('textarea'),
    getFormCheckbox = document.getElementById('request__checkbox'),
    getFormInputs = document.querySelectorAll('.request__form-input'),
    getRequestCheckboxTitle = document.querySelector('.request__checkbox-title');

// Burger button ================================

burger.addEventListener('click', () => {
    getMainMenu.classList.toggle('menu--active');
    burger.classList.toggle('btn__burger--active');
});

// delete menu ================================

function killMenu() {
    if (getUrlDocument === '/about-us.html') {
        burger.style.display = 'none';
        getMainMenu.style.display = 'none';
    }
}

// Плавный скрол до блока ================================

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

// Валидация форм ================================

const generateError = (text) => {
    let errorForm = document.createElement('span');
    errorForm.className = 'request__form-error';
    errorForm.style.color = 'red';
    errorForm.innerHTML = text;
    return errorForm;
};

const removeValidation = () => {
    let errorsForm = document.querySelectorAll('.request__form-error');

    for (let i = 0; i < errorsForm.length; i++) {
        errorsForm[i].remove();
    }
};

const checkFileldsPresence = () => {
    getFormInputs.forEach(item => {
        if (item.value === '') {
            let errorForm = generateError('*');
            item.insertAdjacentElement('beforeBegin', errorForm);
            // Метод insertAdjacentHTML позволяет вставить строку HTML кода в любое место страницы. 
            // Код вставляется относительно опорного элемента. Можно сделать вставку перед опорным 
            // элементом (способ вставки beforeBegin), после него (способ вставки afterEnd), а также в начало 
            // (способ вставки afterBegin) или в конец (способ вставки beforeEnd) опорного элемента.
        }
    });
};

const checkCheckbox = () => {
    if (getFormCheckbox.checked === false) {
        let errorFormCheckbox = generateError(' *');
        getRequestCheckboxTitle.style.color = 'red';
        getRequestCheckboxTitle.insertAdjacentElement('beforeEnd', errorFormCheckbox);
    } else {
        getRequestCheckboxTitle.style.color = '';
    }
};

const validateForm = () => {
    if (getForm !== null) {
        getForm.addEventListener('submit', (e) => {
            e.preventDefault();

            removeValidation();
            checkFileldsPresence();
            checkCheckbox();
        });
    }
};

validateForm();
smoothScrolling(getMainMenuLinks);
smoothScrolling(getPromoBtn);
killMenu();
