// edit profile form
const editProfilePopup = document.querySelector('.edit-profile-popup');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const editProfileNameInput = document.querySelectorAll('.edit-profile-form__input')[0];
const editProfileContentInput = document.querySelectorAll('.edit-profile-form__input')[1];

function editPopupOpen() {
    editProfilePopup.classList.toggle('popup_opened');
    editProfileNameInput.value = profileName.textContent;
    editProfileContentInput.value = profileCaption.textContent;
}

const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', editPopupOpen);

const editPopupCloseButton = editProfilePopup.querySelector('.edit-profile-popup__close-button');
editPopupCloseButton.addEventListener('click', editPopupOpen);

const formElement = document.querySelector('.edit-profile-form');

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = `${editProfileNameInput.value}`;
    profileCaption.textContent = `${editProfileContentInput.value}`;

    editProfilePopup.classList.toggle('popup_opened');
    console.log("ggh");
}

formElement.addEventListener('submit', editFormSubmitHandler);

//add card form
const profileAddButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.add-card-popup');
//куда вставляем
const elementTitle = document.querySelector('.element__title');
const elementImage = document.querySelector('.element__image');
//откуда вставляем
const addCardPlaceInput = document.querySelectorAll('.add-card-form__input')[0];
const addCardLinkInput = document.querySelectorAll('.add-card-form__input')[1];
//открываем попап
function addButtonPopup() {
    addCardPopup.classList.toggle('popup_opened');
    addCardPlaceInput.value = '';
    addCardLinkInput.value = '';
}
profileAddButton.addEventListener('click', addButtonPopup);
//закрываем попап
addCardPopup.querySelector('.add-card-popup__close-button').addEventListener('click', addButtonPopup);
//выбираем саму форму
const addFormElement = document.querySelector('.add-card-form');

// добавление карточки / add-element
const elementsContainer = document.querySelector('.elements');
function addElementFunction(cardTitle, cardLink) {
    const elementTemplate = document.querySelector('#add-element').content;
    const addElementNewCard = elementTemplate.querySelector('.add-element').cloneNode(true);
    addElementNewCard.querySelector('.add-element__title').textContent = `${cardTitle.value}`;
    addElementNewCard.querySelector('.add-element__image').setAttribute('src', `${cardLink.value}`);
    elementsContainer.append(addElementNewCard);
}

function addFormSubmitHandler(evt) {
    evt.preventDefault();

    addElementFunction(addCardPlaceInput, addCardLinkInput);
    addCardPopup.classList.toggle('popup_opened');
    addCardPlaceInput.value = '';
    addCardLinkInput.value = '';
}

addFormElement.addEventListener('submit', addFormSubmitHandler);