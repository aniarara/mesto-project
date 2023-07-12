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
const elementsContainer = document.querySelector('.elements');
//куда
const elementTitle = document.querySelector('.element__title');
const elementImage = document.querySelector('.element__image');
//откуда
const addCardPlaceInput = document.querySelectorAll('.add-card-form__input')[0];
const addCardLinkInput = document.querySelectorAll('.add-card-form__input')[1];

//cards array
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

window.addEventListener('load', initialCards.forEach(function (element) {
    const elementTemplate = document.querySelector('#add-element').content;
    const addElementNewCard = elementTemplate.querySelector('.add-element').cloneNode(true);
    addElementNewCard.querySelector('.add-element__title').textContent = element.name;
    addElementNewCard.querySelector('.add-element__image').src = element.link;
    //функция лайка
    addElementNewCard.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    //удаление карточки
    const trashButton = addElementNewCard.querySelector('.element__trash-button')
    trashButton.addEventListener('click', function () {
        const removingElement = trashButton.closest('.element');
        removingElement.remove();
    });
    //попап картинки
    const addElementImage = addElementNewCard.querySelector('.add-element__image')
    addElementImage.addEventListener('click', function () {
        const imagePopup = document.querySelector('.image-popup')
        imagePopup.classList.toggle('popup_opened');
        imagePopup.querySelector('.image-popup__image').src = element.link;
        imagePopup.querySelector('.image-popup__caption').textContent = element.name;
        //закрытие попапа с картинкой
        imagePopup.querySelector('.image-popup__close-button').addEventListener('click', function() {
            imagePopup.classList.toggle('popup_opened');
        })
    })
    elementsContainer.append(addElementNewCard);
}));

//edit rrofile popup function
function editPopupOpen() {
    editProfilePopup.classList.toggle('popup_opened');
    editProfileNameInput.value = profileName.textContent;
    editProfileContentInput.value = profileCaption.textContent;
}
//edit profile popup open
document.querySelector('.profile__edit-button').addEventListener('click', editPopupOpen);

//edit profile popup close
editProfilePopup.querySelector('.edit-profile-popup__close-button').addEventListener('click', editPopupOpen);

//edit profile form save
function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = `${editProfileNameInput.value}`;
    profileCaption.textContent = `${editProfileContentInput.value}`;
    editProfilePopup.classList.toggle('popup_opened');
}
formElement.addEventListener('submit', editFormSubmitHandler);

//add new card
//add card popup open
function addButtonPopup() {
    addCardPopup.classList.toggle('popup_opened');
    addCardPlaceInput.value = '';
    addCardLinkInput.value = '';
}
profileAddButton.addEventListener('click', addButtonPopup);
//add card popup close
addCardPopup.querySelector('.add-card-popup__close-button').addEventListener('click', addButtonPopup);

// add card
function addElementFunction(cardTitle, cardLink) {
    const elementTemplate = document.querySelector('#add-element').content;
    const addElementNewCard = elementTemplate.querySelector('.add-element').cloneNode(true);
    addElementNewCard.querySelector('.add-element__title').textContent = `${cardTitle.value}`;
    addElementNewCard.querySelector('.add-element__image').setAttribute('src', `${cardLink.value}`);
    //добавление карточки в начало массива
    initialCards.unshift({
        name: `${cardTitle.value}`,
        link: `${cardLink.value}`
    });
    //функция лайка
    addElementNewCard.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    //удаление карточки
    const trashButton = addElementNewCard.querySelector('.element__trash-button')
    trashButton.addEventListener('click', function () {
        const removingElement = trashButton.closest('.element');
        removingElement.remove();
    });
    
    elementsContainer.prepend(addElementNewCard);
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

//image popup
