import './index.css';

//инициализацию JS-кода, добавление слушателей 
//и другие важные участки оставьте в файле index.js

//импорты
import { initialCards, createCard } from '../components/card.js';
import { enableValidation } from '../components/validate.js';
import { 
    editProfileForm, 
    addCardForm, 
    editPopupOpen, 
    editFormSubmitHandler, 
    openAddButtonPopup, 
    addFormSubmitHandler 
} from '../components/modal.js';
import { closePopup } from '../components/utils.js';
    
//переменные
const popups = document.querySelectorAll('.popup');
const profileAddButton = document.querySelector('.profile__add-button');
export const elementsContainer = document.querySelector('.elements');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profileEditButton = document.querySelector('.profile__edit-button')

//добавление карточек при открытии страницы
window.addEventListener('load', initialCards.forEach((card) => {
    elementsContainer.prepend(createCard(card));
}));

//closing popups by overlay
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (popup === evt.target) {
            closePopup(popup);
        }
    })
});

//кнопка закрытия попапов
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => {
        closePopup(popup);
    })
});

//открытие попапа редактирования профиля
profileEditButton.addEventListener('click', editPopupOpen);

// //событие ввода символов с проверкой на валидацию edit profile form
// editProfileForm.addEventListener('input', inputCallback);

//сохранение формы редактирования профиля
editProfileForm.addEventListener('submit', editFormSubmitHandler);

//попап добавление новых карточек
profileAddButton.addEventListener('click', openAddButtonPopup);

// //событие ввода символов с проверкой на валидацию add Card Form
// addCardForm.addEventListener('input', inputCallback);

// сохранение формы add Card Form
addCardForm.addEventListener('submit', addFormSubmitHandler);

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-handler',
    inputErrorClass: 'form__input_invalid',
    errorClass: 'form__input-error_active'
  }); 