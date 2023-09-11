//работу модальных окон — в файл modal.js

import { openPopup, closePopup } from './utils.js';
import { loadCards, elementsContainer } from './card.js';
import { makeInputValid, removeInputErrors, makeButtonDisabled, makeButtonNotDisabled } from './validate.js';
import { getData, endPointUser, changeProfile, endPointCards, postNewCard, changeProfileAvatar } from './api.js'


// const forms = document.forms;

// edit profile form
export const editProfileForm = document.forms.editProfile;
const editProfileFormName = editProfileForm.elements.name;
const editProfileFormContain = editProfileForm.elements.contain;
const editProfileSaver = editProfileForm.querySelector('.form__save-handler');

//profile
export const profileName = document.querySelector('.profile__name');
export const profileCaption = document.querySelector('.profile__caption');
//add card
const addCardPopup = document.querySelector('.add-card-popup');
const addCardSaver =  addCardPopup.querySelector('.form__save-handler');
// const addCardPopupInputs = Array.from(addCardPopup.querySelectorAll('.form__input'));

//add card form
export const addCardForm = document.forms.addCardForm;
const addCardFormName = addCardForm.elements.name;
const addCardFormContain = addCardForm.elements.contain;

//avatar form
export const profileAvatar = document.querySelector('.profile__avatar');
const avatarPopup = document.querySelector('.avatar-popup');
export const avatarForm = document.forms.avatarForm;
const avatarFormLink = avatarForm.contain;
const avatarSaver = avatarPopup.querySelector('.form__save-handler');

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
    })
}

//открытие попапа редактирования профиля
export const editPopupOpen = () => {
    openPopup(editProfileForm.closest('.popup'));
    makeButtonNotDisabled(editProfileSaver);
    editProfileFormName.value = profileName.textContent;
    editProfileFormContain.value = profileCaption.textContent;
    makeInputValid(editProfileForm, 'form__input_invalid');
    removeInputErrors(editProfileForm);
};

//сохранение формы редактирования профиля
export const editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    checkLoading(true, editProfileSaver);
    changeProfile(endPointUser, editProfileFormName.value, editProfileFormContain.value)
    .finally(() => {
        checkLoading(false, editProfileSaver);
        setProfileInfo()
    });
    closePopup(evt.target.closest('.popup'));
}

//открытие попапа добавления новых карточек
export const openAddButtonPopup = () => {
    openPopup(addCardPopup);
    makeInputValid(addCardPopup, 'form__input_invalid');
    removeInputErrors(addCardPopup);
    makeButtonDisabled(addCardSaver);
}

// сохранение формы add Card Form
export const addFormSubmitHandler = (evt) => {
    evt.preventDefault();
    checkLoading(true, addCardSaver);
    postNewCard(endPointCards, addCardFormName.value, addCardFormContain.value)
    .finally(() => {
        elementsContainer.replaceChildren();
        checkLoading(false, addCardSaver);
        loadCards()
    });
    // addCardObj.name = addCardFormName.value;
    // addCardObj.link = addCardFormContain.value;
    closePopup(addCardPopup);
    addCardForm.reset();
}

export const avatarPopupHandler = (evt) => {
    evt.preventDefault();
    checkLoading(true, avatarSaver);
    changeProfileAvatar(avatarFormLink.value)
    .finally(() => {
        checkLoading(false, avatarSaver);
        setProfileInfo()
    });
    closePopup(avatarPopup);
    avatarForm.reset();
}

//проверка загрузки
const checkLoading = (check, button) => {
    if (check) {
        button.textContent = 'Сохранение...';
    } else button.textContent = 'Сохранить';
}