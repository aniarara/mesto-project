//переменные
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close-button');
const forms = document.forms;

// edit profile form
const editProfileForm = document.forms.editProfile;
const editProfileFormName = editProfileForm.elements.name;
const editProfileFormContain = editProfileForm.elements.contain;

//profile
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

//add card
const profileAddButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.add-card-popup');
const elementsContainer = document.querySelector('.elements');
//add card form
const addCardForm = document.forms.addCardForm;
const addCardFormName = addCardForm.elements.name;
const addCardFormContain = addCardForm.elements.contain;

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
//открытие попапа
const openPopup = popup => {
    popup.classList.add('popup_opened');
    popup.addEventListener('keydown', closeByEscape);
    popup.querySelector('.form__save-handler').removeAttribute('disabled');
}

//закрытие попапа
const closePopup = popup => {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('keydown', closeByEscape);
    popup.querySelectorAll('.form__input').forEach(function callback(input) {
        input.classList.remove('form__input_invalid');
    });
}

//closing popups by overlay
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (popup === evt.target) {
            closePopup(popup);
        }
    })
});

//closing popups by escape
const closeByEscape = (evt) => {
    if (evt.key === 'Escape') {
        closePopup(evt.target.closest('.popup'))
    }
};

//создание карточки
function createCard(element) {
    const elementTemplate = document.querySelector('#add-element').content;
    const createdCard = elementTemplate.querySelector('.add-element').cloneNode(true);
    createdCard.querySelector('.add-element__title').textContent = element.name;
    const createdCardImage = createdCard.querySelector('.add-element__image');
    createdCardImage.src = element.link;
    createdCardImage.alt = element.name;
    // функция лайка
    createdCard.querySelector('.element__like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like_active');
    });
    //удаление карточки
    const trashButton = createdCard.querySelector('.element__trash-button')
    trashButton.addEventListener('click', () => {
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

//кнопка закрытия попапов
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

//попап редактирования профиля
//открытие попапа редактирования профиля
const editPopupOpen = () => {
    openPopup(editProfileForm.closest('.popup'));
    editProfileFormName.value = profileName.textContent;
    editProfileFormContain.value = profileCaption.textContent;
};

document.querySelector('.profile__edit-button').addEventListener('click', editPopupOpen);

//проверка валидации инпута
function checkValidity (element) {
    if ((element.validity.patternMismatch === false)
    && (element.validity.tooLong === false)
    && (element.validity.tooShort === false)
    && (element.validity.typeMismatch === false)
    && (element.validity.valueMissing === false)) {
        element.classList.remove('form__input_invalid');
        return true;
    } else {
        element.classList.add('form__input_invalid');
        return false;
    }
}

//проверка кнопки сохранения
const inputCallback = (evt) => {
    const inputCallbackForm = evt.target.closest('.form');
    const inputCallbackFormSaveButton = inputCallbackForm.querySelector('.form__save-handler');
    if (checkValidity(evt.target)) {
        inputCallbackFormSaveButton.removeAttribute('disabled');
    } else {
        inputCallbackFormSaveButton.setAttribute('disabled', true);
    }
}
     
//событие ввода символов с проверкой на валидацию edit profile form
editProfileForm.addEventListener('input', inputCallback);
// //строка может быть просто пробелами или дефисами, не нравится

//сохранение формы редактирования профиля
const editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    profileName.textContent = `${editProfileFormName.value}`;
    profileCaption.textContent = `${editProfileFormContain.value}`;
    closePopup(evt.target.closest('.popup'));
}
editProfileForm.addEventListener('submit', editFormSubmitHandler);


// //попап добавление новых карточек
// //открытие попапа
const openAddButtonPopup = () => {
    openPopup(addCardPopup);
    addCardForm.reset();
    addCardPopup.querySelector('.form__save-handler').setAttribute('disabled', true);
}

profileAddButton.addEventListener('click', openAddButtonPopup);

//событие ввода символов с проверкой на валидацию add Card Form
addCardForm.addEventListener('input', inputCallback);

// сохранение формы
const addFormSubmitHandler = (evt) => {
    evt.preventDefault();
    addCardObj.name = addCardFormName.value;
    addCardObj.link = addCardFormContain.value;
    closePopup(addCardPopup);
    addCardForm.reset();
    elementsContainer.prepend(createCard(addCardObj));
}
addCardForm.addEventListener('submit', addFormSubmitHandler);