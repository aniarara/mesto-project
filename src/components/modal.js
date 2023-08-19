//работу модальных окон — в файл modal.js

import { openPopup, closePopup } from './utils.js';
import { loadCards, elementsContainer } from './card.js';
import { makeInputValid, removeInputErrors, makeButtonDisabled, makeButtonNotDisabled } from './validate.js';
import { getData, endPointUser, changeProfile, endPointCards, postNewCard } from './api.js'


const forms = document.forms;

// edit profile form
export const editProfileForm = document.forms.editProfile;
const editProfileFormName = editProfileForm.elements.name;
const editProfileFormContain = editProfileForm.elements.contain;
const profileAvatar = document.querySelector('.profile__avatar');

// const editProfileFormInputs = editProfileForm.querySelectorAll('.form__input');
//profile
export const profileName = document.querySelector('.profile__name');
export const profileCaption = document.querySelector('.profile__caption');
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

function requestProfileName(string) {
    profileName.textContent = string;
    editProfileFormName.placeholder = string;
    profileAvatar.alt = string;
}

function requestProfileCaption(string) {
    profileCaption.textContent = (string)
    editProfileFormContain.placeholder = string;
}

function requestProfileAvatar(string) {
    profileAvatar.src = string;
}

export function setProfileInfo() {
    getData(endPointUser)
    .then(json => {
            requestProfileName(json.name)
            requestProfileCaption(json.about)
            requestProfileAvatar(json.avatar)
            // console.log(json)
    })
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
    changeProfile(endPointUser, editProfileFormName.value, editProfileFormContain.value)
    .finally(() => setProfileInfo());
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
    postNewCard(endPointCards, addCardFormName.value, addCardFormContain.value)
    .finally(() => {
        elementsContainer.replaceChildren();
        loadCards()
    });
    // addCardObj.name = addCardFormName.value;
    // addCardObj.link = addCardFormContain.value;
    closePopup(addCardPopup);
    addCardForm.reset();
}