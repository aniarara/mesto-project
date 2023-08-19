import './index.css';

//инициализацию JS-кода, добавление слушателей 
//и другие важные участки оставьте в файле index.js

//импорты
import * as api from '../components/api.js';
import { initialCards, loadCards } from '../components/card.js';
import { enableValidation } from '../components/validate.js';
import {
    editProfileForm,
    profileName,
    profileCaption,
    addCardForm,
    editPopupOpen,
    editProfileFormName,
    editProfileFormContain,
    profileAvatar,
    editFormSubmitHandler,
    openAddButtonPopup,
    addFormSubmitHandler,
    setProfileInfo
} from '../components/modal.js';
import { closePopup } from '../components/utils.js';

//переменные
const popups = document.querySelectorAll('.popup');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profileEditButton = document.querySelector('.profile__edit-button')

//логика

//при открытии страницы загрузка профиля, загрузка карточек GET done
//POST профиля при отправке формы редактирования
//GET снова setProfileInfo()в конце сабмита  формы профиля

//POST при добавлении карточки
//GETв конце сохранения для обновления страницы


//добавление карточек при открытии страницы
window.addEventListener('load', () => {
    setProfileInfo();
    loadCards();
});

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

//сохранение формы редактирования профиля
editProfileForm.addEventListener('submit', editFormSubmitHandler);

//попап добавление новых карточек
profileAddButton.addEventListener('click', openAddButtonPopup);

// сохранение формы add Card Form
addCardForm.addEventListener('submit', addFormSubmitHandler);

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-handler',
    inputErrorClass: 'form__input_invalid',
    errorClass: 'form__input-error_active'
});

