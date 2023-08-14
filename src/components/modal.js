//работу модальных окон — в файл modal.js

import { openPopup, closePopup } from './utils.js';
import { createCard } from './card.js';
import { makeInputValid, removeInputErrors, makeButtonDisabled, makeButtonNotDisabled } from './validate.js';
import { elementsContainer } from '../pages/index.js';


const forms = document.forms;

// edit profile form
export const editProfileForm = document.forms.editProfile;
const editProfileFormName = editProfileForm.elements.name;
const editProfileFormContain = editProfileForm.elements.contain;
const editProfileFormInputs = editProfileForm.querySelectorAll('.form__input');
//profile
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
//add card
const addCardPopup = document.querySelector('.add-card-popup');
const addCardPopupInputs = Array.from(addCardPopup.querySelectorAll('.form__input'));

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
    makeButtonNotDisabled(editProfileForm.querySelector('.form__save-handler'));
    editProfileFormName.value = profileName.textContent;
    editProfileFormContain.value = profileCaption.textContent;
    makeInputValid(editProfileForm, 'form__input_invalid');
    removeInputErrors(editProfileForm);
};

//сохранение формы редактирования профиля
export const editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    profileName.textContent = `${editProfileFormName.value}`;
    profileCaption.textContent = `${editProfileFormContain.value}`;
    closePopup(evt.target.closest('.popup'));
}

//открытие попапа добавления новых карточек
export const openAddButtonPopup = () => {
    openPopup(addCardPopup);
    addCardForm.reset();
    makeInputValid(addCardPopup, 'form__input_invalid');
    removeInputErrors(addCardPopup);
    makeButtonDisabled(addCardPopup.querySelector('.form__save-handler'));
}

// сохранение формы add Card Form
export const addFormSubmitHandler = (evt) => {
    evt.preventDefault();
    addCardObj.name = addCardFormName.value;
    addCardObj.link = addCardFormContain.value;
    closePopup(addCardPopup);
    addCardForm.reset();
    elementsContainer.prepend(createCard(addCardObj));
}