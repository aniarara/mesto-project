//переменные
// const popup = document.querySelector('.popup');
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
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

//закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

//создание карточки
function createCard (element) {
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
    addElementImage.addEventListener('click', function () {
        openPopup(imagePopup);
        const imagePopupImage = imagePopup.querySelector('.image-popup__image')
        imagePopupImage.src = element.link;
        imagePopupImage.alt = element.name;
        imagePopup.querySelector('.image-popup__caption').textContent = element.name;
        //закрытие попапа с картинкой
    })
    elementsContainer.prepend(createdCard);
};

//добавление карточек при открытии страницы
window.addEventListener('load', initialCards.forEach(createCard));


//кнопка закрытия
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//edit profile popup function
function editPopupOpen() {
    openPopup(editProfilePopup);
    editProfileNameInput.value = profileName.textContent;
    editProfileContentInput.value = profileCaption.textContent;
}

document.querySelector('.profile__edit-button').addEventListener('click', editPopupOpen);

//edit profile form save
function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = `${editProfileNameInput.value}`;
    profileCaption.textContent = `${editProfileContentInput.value}`;
    closePopup(editProfilePopup);
}
formElement.addEventListener('submit', editFormSubmitHandler);

//добавление новой карточки
//add card function
function addButtonPopup () {
    openPopup(addCardPopup);
    addCardPlaceInput.value = '';
    addCardLinkInput.value = '';
}

profileAddButton.addEventListener('click', addButtonPopup);

// add card form save
function addFormSubmitHandler(evt) {
    evt.preventDefault();
    addCardObj.name = addCardPlaceInput.value;
    addCardObj.link = addCardLinkInput.value;
    createCard(addCardObj);
    closePopup(addCardPopup);
    addCardPlaceInput.value = '';
    addCardLinkInput.value = '';
}
addFormElement.addEventListener('submit', addFormSubmitHandler);


//отдельно на кнопку submit формы add card вызывается функция с аргументами значений из инпутов формы

//в dom вставляем все карточки массивом(че?)

//ф-я не должна дублироваться, можно ее вызов засунуть в слушатели

// add card
// function createCard(cardTitle, cardLink) {
//     addElementTitle.textContent = `${cardTitle.value}`;
//     const addElementLink = createdCard.querySelector('.add-element__image')
//     addElementLink.setAttribute('src', `${cardLink.value}`);
//     //добавление карточки в начало массива
//вот это не надо а тчо надо я не пойму
//не надо записывать новые карточки в массив жестб
//     initialCards.unshift({
//         name: `${cardTitle.value}`,
//         link: `${cardLink.value}`
//     });
// }

// //add new card
// //add card popup close
// addCardPopup.querySelector('.add-card-popup__close-button').addEventListener('click', addButtonPopup);