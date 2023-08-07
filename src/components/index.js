//переменные
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close-button');
// edit profile form
const editProfileForm = document.forms.editProfile;
const editProfileFormName = editProfileForm.elements.name;
const editProfileFormContain = editProfileForm.elements.contain;
const saveButton = document.querySelector('.form__save-handler');

//profile
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

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
//открытие попапа
const openPopup = popup => {
    popup.classList.add('popup_opened');
    popup.addEventListener('keydown', closeByEscape);
}

//закрытие попапа
const closePopup = popup => {
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

//общее для форм
//кнопка закрытия попапов
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

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

// проверка валидации для кнопки сохранения
const checkSaveButton = (checkname, checkcontent) => {
    if ((checkname === true) && (checkcontent === true)) {
        saveButton.removeAttribute('disabled');
        saveButton.classList.remove('form__save-handler_disabled');
    } else {
        saveButton.setAttribute('disabled', true);
        saveButton.classList.add('form__save-handler_disabled');
    }
};

//попап редактирования профиля
//открытие попапа редактирования профиля
const editPopupOpen = () => {
    openPopup(editProfileForm.closest('.popup'));
    editProfileFormName.value = profileName.textContent;
    editProfileFormContain.value = profileCaption.textContent;
}

document.querySelector('.profile__edit-button').addEventListener('click', editPopupOpen);

// валидация формы "редактирование профиля"
editProfileForm.addEventListener('input', function (evt) {
    const nameIsValid = (
        editProfileFormName.minlength >= 2
        && editProfileFormName.maxlength <= 40 
        && !editProfileFormName.validity.patternMismatch
        );
    const сontainIsValid = (
        editProfileFormContain.minlength >= 2
        && editProfileFormContain.maxlength <= 200
        && !editProfileFormContain.validity.patternMismatch
        );
    checkSaveButton(nameIsValid, сontainIsValid);
});
//строка может быть просто пробелами или дефисами, не нравится

//сохранение формы редактирования профиля
const editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    profileName.textContent = `${editProfileFormName.value}`;
    profileCaption.textContent = `${editProfileFormContain.value}`;
    closePopup(evt.target.closest('.popup'));
}
editProfileForm.addEventListener('submit', editFormSubmitHandler);

// добавление новых карточек
//открытие попапа
const addButtonPopup = () => {
    openPopup(addCardPopup);
    addFormElement.reset();
}

profileAddButton.addEventListener('click', addButtonPopup);

// сохранение формы
const addFormSubmitHandler = (evt) => {
    evt.preventDefault();
    addCardObj.name = addCardPlaceInput.value;
    addCardObj.link = addCardLinkInput.value;
    closePopup(addCardPopup);
    addFormElement.reset();
    elementsContainer.prepend(createCard(addCardObj));
}
addFormElement.addEventListener('submit', addFormSubmitHandler);

