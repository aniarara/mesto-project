//работу модальных окон — в файл modal.js

import { openPopup, closePopup, makeInputValid, removeInputErrors } from './utils.js';
import { createCard } from './card.js';
import { elementsContainer } from './../index.js';


const forms = document.forms;

// edit profile form
export const editProfileForm = document.forms.editProfile;
const editProfileFormName = editProfileForm.elements.name;
const editProfileFormContain = editProfileForm.elements.contain;
//profile
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
//add card
const addCardPopup = document.querySelector('.add-card-popup');

//add card form
export const addCardForm = document.forms.addCardForm;
const addCardFormName = addCardForm.elements.name;
const addCardFormContain = addCardForm.elements.contain;

const addCardObj = {
    name: '',
    link: ''
}

//открытие попапа редактирования профиля
export const editPopupOpen = () => {
    openPopup(editProfileForm.closest('.popup'));
    editProfileForm.querySelector('.form__save-handler').removeAttribute('disabled');
    editProfileFormName.value = profileName.textContent;
    editProfileFormContain.value = profileCaption.textContent;
};

//сохранение формы редактирования профиля
export const editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    profileName.textContent = `${editProfileFormName.value}`;
    profileCaption.textContent = `${editProfileFormContain.value}`;
    closePopup(evt.target.closest('.popup'));
    makeInputValid(evt.target.closest('.popup'));
    removeInputErrors(evt.target.closest('.popup'));
}

//открытие попапа добавления новых карточек
export const openAddButtonPopup = () => {
    openPopup(addCardPopup);
    addCardForm.reset();
    addCardPopup.querySelector('.form__save-handler').setAttribute('disabled', true);
}

// сохранение формы add Card Form
export const addFormSubmitHandler = (evt) => {
    evt.preventDefault();
    addCardObj.name = addCardFormName.value;
    addCardObj.link = addCardFormContain.value;
    closePopup(addCardPopup);
    makeInputValid(evt.target.closest('.popup'));
    removeInputErrors(evt.target.closest('.popup'));
    addCardForm.reset();
    elementsContainer.prepend(createCard(addCardObj));
}