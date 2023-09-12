import './index.css';

//инициализацию JS-кода, добавление слушателей 
//и другие важные участки оставьте в файле index.js

//импорты
import * as api from '../components/api.js';
import { createdCardToDOM } from '../components/card.js';
import { enableValidation } from '../components/validate.js';
import {
    editProfileForm,
    addCardForm,
    editPopupOpen,
    avatarPopupHandler,
    avatarForm,
    profileAvatar,
    editFormSubmitHandler,
    openAddButtonPopup,
    addFormSubmitHandler,
    openAvatarPopup,
    requestProfileName,
    requestProfileCaption,
    requestProfileAvatar
} from '../components/modal.js';
import { closePopup, catchError } from '../components/utils.js';

//переменные
export let userId;
const popups = document.querySelectorAll('.popup');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profileEditButton = document.querySelector('.profile__edit-button');

//добавление карточек при открытии страницы
window.addEventListener('load', () => {
    Promise.all([api.getData(api.endPointUser), api.getData(api.endPointCards)])
  .then(([userData, cards]) => {
    userId = userData._id,
    requestProfileName(userData.name),
    requestProfileCaption(userData.about),
    requestProfileAvatar(userData.avatar),
    Array.from(cards).forEach(card => createdCardToDOM(card))
  })
  .catch(catchError());
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

//открытие попап добавление новых карточек
profileAddButton.addEventListener('click', openAddButtonPopup);

// сохранение формы добавление новых карточек
addCardForm.addEventListener('submit', addFormSubmitHandler);

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-handler',
    inputErrorClass: 'form__input_invalid',
    errorClass: 'form__input-error_active'
});

profileAvatar.addEventListener('click', openAvatarPopup);

avatarForm.addEventListener('submit', avatarPopupHandler)