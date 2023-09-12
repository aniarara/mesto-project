//функции для работы с карточками проекта Mesto

import { catchError, openPopup } from './utils.js';
import { deleteCard, putData, deleteLike, endPointLikes } from './api.js';
import { makeButtonNotDisabled } from './validate.js'
import { userId } from "../pages/index.js"

export const elementsContainer = document.querySelector('.elements');
//image popup
const imagePopup = document.querySelector('.image-popup');
const imagePopupImage = imagePopup.querySelector('.image-popup__image');
const imagePopupCaption = imagePopup.querySelector('.image-popup__caption');

// export function loadCards() {
//     getData(endPointCards)
//         .then(json => {
//             const arr = Array.from(json)
//             arr.forEach(element => {
//                 createdCardToDOM(element)
//             })
//         })
//         .catch(catchError)
// }

//функция удаления карточки по клику
function removeCardButton(button, elementId) {
    button.addEventListener('click', (evt) => {
        const removingElement = button.closest('.element');
        deleteCard(elementId)
            // .then()
            .catch(catchError)
            .finally(removingElement.remove());
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
    if (element.owner['_id'] === userId) {
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
    return createdCard;
};

export const createdCardToDOM = (element) => {
    const createdCard = createCard(element);
    elementsContainer.prepend(createdCard);
}

const checkLike = (like) => like['_id'] === userId;

const toggleLike = (elementLike) => elementLike.classList.toggle('element__like_active');

function likeCallback(element, cardId, elementLike, likeCounter) {
    if (Array.from(element.likes).some(checkLike)) {
        deleteLike(cardId)
            .then(json => {
                likeCounter.textContent = json.likes.length,
                toggleLike(elementLike)
            })
            .catch(catchError)
    } else {
        putData(endPointLikes, cardId)
            .then(json => {
                likeCounter.textContent = json.likes.length,
                toggleLike(elementLike)
            })
            .catch(catchError)
    }
}