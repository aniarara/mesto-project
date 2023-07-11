//переменные
const formElement = document.querySelector('.edit-profile-form');

// edit profile form
const editProfilePopup = document.querySelector('.edit-profile-popup');
//куда
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
//откуда
const editProfileNameInput = document.querySelectorAll('.edit-profile-form__input')[0];
const editProfileContentInput = document.querySelectorAll('.edit-profile-form__input')[1];

//add card form
const profileAddButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.add-card-popup');
const addFormElement = document.querySelector('.add-card-form');
//куда
const elementTitle = document.querySelector('.element__title');
const elementImage = document.querySelector('.element__image');
//откуда
const addCardPlaceInput = document.querySelectorAll('.add-card-form__input')[0];
const addCardLinkInput = document.querySelectorAll('.add-card-form__input')[1];

function editPopupOpen() {
    editProfilePopup.classList.toggle('popup_opened');
    editProfileNameInput.value = profileName.textContent;
    editProfileContentInput.value = profileCaption.textContent;
}
//edit profile popup open
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', editPopupOpen);
//edit profile popup close
const editPopupCloseButton = editProfilePopup.querySelector('.edit-profile-popup__close-button');
editPopupCloseButton.addEventListener('click', editPopupOpen);
//edit profile form save
function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = `${editProfileNameInput.value}`;
    profileCaption.textContent = `${editProfileContentInput.value}`;
    editProfilePopup.classList.toggle('popup_opened');
}
formElement.addEventListener('submit', editFormSubmitHandler);

//ad new card
//add card popup open
function addButtonPopup () {
    addCardPopup.classList.toggle('popup_opened');
    addCardPlaceInput.value = '';
    addCardLinkInput.value = '';
}
profileAddButton.addEventListener('click', addButtonPopup);
//add card popup close
addCardPopup.querySelector('.add-card-popup__close-button').addEventListener('click', addButtonPopup);

// add card
function addElementFunction(cardTitle, cardLink) {
    const elementsContainer = document.querySelector('.elements');
    const elementTemplate = document.querySelector('#add-element').content;
    const addElementNewCard = elementTemplate.querySelector('.add-element').cloneNode(true);
    addElementNewCard.querySelector('.add-element__title').textContent = `${cardTitle.value}`;
    addElementNewCard.querySelector('.add-element__image').setAttribute('src', `${cardLink.value}`);    
    //функция лайка
    addElementNewCard.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    //добавление карточки в начало массива
    //
    elementsContainer.append(addElementNewCard);
}

//add card form save
function addFormSubmitHandler(evt) {
    evt.preventDefault();
    
    addElementFunction(addCardPlaceInput, addCardLinkInput);
    addCardPopup.classList.toggle('popup_opened');
    addCardPlaceInput.value = '';
    addCardLinkInput.value = '';
}
addFormElement.addEventListener('submit', addFormSubmitHandler);
