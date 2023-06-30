
const Popup = document.querySelector('.popup');

const nameInput = document.querySelectorAll('.form__input')[0];
const jobInput = document.querySelectorAll('.form__input')[1];
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
//profileCaption.setAttribute()

function profileEditPopup() {
    Popup.classList.toggle('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileCaption.textContent;
}

let profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', profileEditPopup);

let popupCloseButton = Popup.querySelector('.popup__close-button');
popupCloseButton.addEventListener('click', profileEditPopup);

const formElement = document.querySelector('.form');

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = `${nameInput.value}`;
    profileCaption.textContent = `${jobInput.value}`;

    Popup.classList.toggle('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
