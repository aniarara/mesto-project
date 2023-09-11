//функции для работы с карточками проекта Mesto

import { openPopup } from './utils.js';
import { getData, endPointCards, deleteCard, myid, putData, deleteLike, endPointLikes } from './api.js';
import { makeButtonNotDisabled } from './validate.js'

export const elementsContainer = document.querySelector('.elements');
//image popup
const imagePopup = document.querySelector('.image-popup');
const imagePopupImage = imagePopup.querySelector('.image-popup__image');
const imagePopupCaption = imagePopup.querySelector('.image-popup__caption');

export function loadCards() {
    getData(endPointCards)
        .then(json => {
            const arr = Array.from(json)
            arr.forEach(element => {
                createCard(element)
            })
        })
}

//функция удаления карточки по клику
function removeCardButton(button, elementId) {
    button.addEventListener('click', (evt) => {
        const removingElement = button.closest('.element');
        removingElement.remove();
        deleteCard(elementId);
    })
}

//создание карточки
export const createCard = (element) => {
    const elementTemplate = document.querySelector('#add-element').content;
    const createdCard = elementTemplate.querySelector('.add-element').cloneNode(true);
    const likeButton = createdCard.querySelector('.element__like');
    const likeCounter = createdCard.querySelector('.element__like-counter');
    const trashButton = createdCard.querySelector('.element__trash-button')
    const createdCardImage = createdCard.querySelector('.add-element__image');

    createdCard.querySelector('.add-element__title').textContent = element.name;
    createdCardImage.src = element.link;
    createdCardImage.alt = element.name;
    likeCounter.textContent = element.likes.length;

    //проверяем что уже лайкнуто
    if (Array.from(element.likes).some(checkLike)) {
        toggleLike(likeButton);
    }

    //вешаем лайки
    likeButton.addEventListener('click', () => {
        likeCallback(element, element['_id'], likeButton, likeCounter)
    });

    //проверяем и вешаем кнопки удаления
    if (element.owner['_id'] === myid) {
        makeButtonNotDisabled(trashButton);
        removeCardButton(trashButton, element['_id']);
    }

    //попап картинки
    const addElementImage = createdCardImage;
    addElementImage.addEventListener('click', () => {
        openPopup(imagePopup);
        imagePopupImage.src = element.link;
        imagePopupImage.alt = element.name;
        imagePopupCaption.textContent = element.name;
    })
    elementsContainer.prepend(createdCard);
    return createdCard;
};

const checkLike = (like) => like['_id'] === myid;

const toggleLike = (elementLike) => elementLike.classList.toggle('element__like_active');

function likeCallback(element, cardId, elementLike, likeCounter) {
    if (Array.from(element.likes).some(checkLike)) {
        deleteLike(cardId)
            .then(json => {
                likeCounter.textContent = json.likes.length
            });
        toggleLike(elementLike);
    } else {
        putData(endPointLikes, cardId)
            .then(json => {
                likeCounter.textContent = json.likes.length
            });
        toggleLike(elementLike);
    }
}