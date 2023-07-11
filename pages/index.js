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
function addButtonPopup () {
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


// // //нужно будет добавлять новую карточку в массив верхним

// const queue = ['Рабочие', 'Школьники', 'Студенты'];
// queue.unshift('Пенсионеры', 'Инвалиды');
// console.log(queue);
// // ["Пенсионеры", "Инвалиды", "Рабочие", "Школьники", "Студенты"]

// // в функции добавления карточки новую можно добавлять штукой сверху (добавить новый аргумент)
// на самом деле лучше через pop/push
//const fourthQuarter = months.slice(-3);
//так можно через pop/push взять массив в обратном порядке

// const initialCards = [
//     {
//         name: 'Архыз',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//     },
//     {
//         name: 'Челябинская область',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//     },
//     {
//         name: 'Иваново',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//     },
//     {
//         name: 'Камчатка',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//     },
//     {
//         name: 'Холмогорский район',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//     },
//     {
//         name: 'Байкал',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//     }
// ];
// //далее пример функции добавления массива элементов
// // const list = document.querySelector('.todo-list');
// // // массив дел на сегодня
// // const tasks = [
// //   'Сделать проектную работу',
// //   'Погулять с собакой',
// //   'Пройти туториал по Реакту'
// // ];
// // // создадим из массива дел массив элементов
// // const taskElements = [];
// // for (let i = 0; i < tasks.length; i++) {
// //   const listItem = document.createElement('li');
// //   listItem.textContent = tasks[i];
// //     taskElements[i] = listItem;
// // }
// // // добавим элементы в DOM с использованием цикла
// // for (let i = 0; i < taskElements.length; i++) {
// //     list.append(taskElements[i])
// // }