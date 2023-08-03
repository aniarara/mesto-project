//переменные
// const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close-button');
// edit profile form
const editProfilePopup = document.querySelector('.edit-profile-popup');
const formElement = document.querySelector('.edit-profile-form');
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
const addCardObj = {
    name: '',
    link: ''
}
//image popup
const imagePopup = document.querySelector('.image-popup');
const imagePopupImage = imagePopup.querySelector('.image-popup__image');
const imagePopupCaption = imagePopup.querySelector('.image-popup__caption');

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

//функции
function closeByEscape (evt) {
        if (evt.key === 'Escape') {
            closePopup(evt.target.closest('.popup'))
        }
    };

//открытие попапа
let openPopup = popup => {
    popup.classList.add('popup_opened');
    popup.addEventListener('keydown', closeByEscape); 
}

//закрытие попапа
let closePopup = popup => {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('keydown', closeByEscape);
} 

//создание карточки
function createCard(element) {
    const elementTemplate = document.querySelector('#add-element').content;
    const createdCard = elementTemplate.querySelector('.add-element').cloneNode(true);
    createdCard.querySelector('.add-element__title').textContent = element.name;
    const createdCardImage = createdCard.querySelector('.add-element__image');
    createdCardImage.src = element.link;
    createdCardImage.alt = element.name;
    // функция лайка
    createdCard.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    //удаление карточки
    const trashButton = createdCard.querySelector('.element__trash-button')
    trashButton.addEventListener('click', function () {
        const removingElement = trashButton.closest('.element');
        removingElement.remove();
    });
    //попап картинки
    const addElementImage = createdCardImage;
    addElementImage.addEventListener('click', () => {
        openPopup(imagePopup);
        imagePopupImage.src = element.link;
        imagePopupImage.alt = element.name;
        imagePopupCaption.textContent = element.name;
    })
    return createdCard;
};

//добавление карточек при открытии страницы
window.addEventListener('load', initialCards.forEach((currentValue) => {
    elementsContainer.prepend(createCard(currentValue));
}));

//кнопка закрытия
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

// const inputs = document.querySelectorAll('input');

// //закрытие попапа нажатием escape 
// inputs.forEach((input) => {
//     const popup = input.closest('.popup');
//     input.addEventListener('keydown', function (evt) {
//         if (evt.key === 'Escape') {
//             closePopup(popup)
//         }
//     });
// });



//edit profile popup function
let editPopupOpen = () => {
    openPopup(editProfilePopup);
    editProfileNameInput.value = profileName.textContent;
    editProfileContentInput.value = profileCaption.textContent;
}

document.querySelector('.profile__edit-button').addEventListener('click', editPopupOpen);

//edit profile form save
let editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    profileName.textContent = `${editProfileNameInput.value}`;
    profileCaption.textContent = `${editProfileContentInput.value}`;
    closePopup(editProfilePopup);
}
formElement.addEventListener('submit', editFormSubmitHandler);

//add card function
let addButtonPopup = () => {
    openPopup(addCardPopup);
    addFormElement.reset();
}

profileAddButton.addEventListener('click', addButtonPopup);

// add card form save
let addFormSubmitHandler = (evt) => {
    evt.preventDefault();
    addCardObj.name = addCardPlaceInput.value;
    addCardObj.link = addCardLinkInput.value;
    closePopup(addCardPopup);
    addFormElement.reset();
    elementsContainer.prepend(createCard(addCardObj));
}
addFormElement.addEventListener('submit', addFormSubmitHandler);

//closing popups by overlay
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (popup === evt.target) {
            closePopup(popup);
        }
    }) 
});