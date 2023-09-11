//функции для работы с карточками проекта Mesto

import { openPopup } from './utils.js';
import { getData, endPointCards, removeCardFromServer } from './api.js';
import { makeButtonDisabled, makeButtonNotDisabled } from './validate.js'


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

// лайк карточки
const likingCards = (button) => button.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
});

//функция удаления карточки по клику
function removeCardButton (button, elementId) {
    button.addEventListener('click', (evt) => {
        const removingElement = button.closest('.element');
        removingElement.remove();
        removeCardFromServer(endPointCards, elementId);
    })
}

const myid = "297d7896cf9796988b2fda57";
//создание карточки
export const createCard = (element) => {
    const elementTemplate = document.querySelector('#add-element').content;
    const createdCard = elementTemplate.querySelector('.add-element').cloneNode(true);
    const cardLikes = createdCard.querySelector('.element__like');
    const likeCounter = createdCard.querySelector('.element__like-counter');
    const trashButton = createdCard.querySelector('.element__trash-button')
    const createdCardImage = createdCard.querySelector('.add-element__image');

    createdCard.querySelector('.add-element__title').textContent = element.name;
    createdCardImage.src = element.link;
    createdCardImage.alt = element.name;
    likeCounter.textContent = element.likes.length;
    likingCards(cardLikes);
    
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

