//работу модальных окон — в файл modal.js

import { openPopup, closePopup, catchError } from './utils.js';
import { loadCards, elementsContainer, createdCardToDOM, createCard } from './card.js';
import { makeInputValid, removeInputErrors, makeButtonDisabled, makeButtonNotDisabled, clearPopup } from './validate.js';
import { getData, endPointUser, changeProfile, endPointCards, postNewCard, changeProfileAvatar } from './api.js'


// edit profile form
const editProfilePopup = document.querySelector('.edit-profile-popup');
export const editProfileForm = document.forms.editProfile;
const editProfileFormName = editProfileForm.elements.name;
const editProfileFormContain = editProfileForm.elements.contain;
const editProfileSaver = editProfileForm.querySelector('.form__save-handler');

//profile
export const profileName = document.querySelector('.profile__name');
export const profileCaption = document.querySelector('.profile__caption');
//add card
const addCardPopup = document.querySelector('.add-card-popup');
const addCardSaver = addCardPopup.querySelector('.form__save-handler');

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

export function requestProfileName(string) {
    profileName.textContent = string;
    editProfileFormName.placeholder = string;
    profileAvatar.alt = string;
}

export function requestProfileCaption(string) {
    profileCaption.textContent = (string)
    editProfileFormContain.placeholder = string;
}

export function requestProfileAvatar(link) {
    profileAvatar.src = link;
}



//открытие попапа редактирования профиля
export const editPopupOpen = () => {
    openPopup(editProfilePopup);
    clearPopup(editProfilePopup);
    makeButtonNotDisabled(editProfileSaver);
    editProfileFormName.value = profileName.textContent;
    editProfileFormContain.value = profileCaption.textContent;
};

//сохранение формы редактирования профиля
export const editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    checkLoading(true, editProfileSaver);
    changeProfile(endPointUser, editProfileFormName.value, editProfileFormContain.value)
    .then(() => {
        profileName.textContent = editProfileFormName.value,
        profileCaption.textContent = editProfileFormContain.value,
        closePopup(evt.target.closest('.popup'));
    })
        .catch(catchError)
        .finally(() => {
            checkLoading(false, editProfileSaver);
        });
}

//открытие попапа добавления новых карточек
export const openAddButtonPopup = () => {
    openPopup(addCardPopup);
    clearPopup(addCardPopup);
    makeButtonDisabled(addCardSaver);
}

// сохранение формы add Card Form
export const addFormSubmitHandler = (evt) => {
    evt.preventDefault();
    checkLoading(true, addCardSaver);
    postNewCard({name: addCardFormName.value,
            link: addCardFormContain.value
        })
    .then(json => {
        createdCardToDOM(json),
        closePopup(addCardPopup)
    })
        .catch(catchError)
        .finally(() => {
            checkLoading(false, addCardSaver);
        })
}

//проверка загрузки
const checkLoading = (check, button) => {
    if (check) {
        button.textContent = 'Сохранение...';
    } else button.textContent = 'Сохранить';
}

//открытие формы изменения аватара
export const openAvatarPopup = () => {
    openPopup(avatarPopup);
    clearPopup(avatarPopup);
    makeButtonDisabled(avatarSaver);
}

//сохранение формы изменения аватара
export const avatarPopupHandler = (evt) => {
    evt.preventDefault();
    checkLoading(true, avatarSaver);
    changeProfileAvatar(avatarFormLink.value)
    .then(closePopup(avatarPopup))
        .catch(catchError)
        .finally(() => {
            checkLoading(false, avatarSaver);
            setProfileInfo()
        });
    avatarForm.reset();
}

export function setProfileInfo() {
    getData(endPointUser)
        .then(json => {
            requestProfileName(json.name)
            requestProfileCaption(json.about)
            requestProfileAvatar(json.avatar)
        })
        .catch(catchError);
}
