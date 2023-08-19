//функции для работы с карточками проекта Mesto

import { openPopup } from './utils.js';
import { getData, endPointCards } from './api.js';


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
                console.log(element)
            })
            
        })
}

//создание карточки
export const createCard = (element) => {
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
    elementsContainer.prepend(createdCard);
    return createdCard;
};

