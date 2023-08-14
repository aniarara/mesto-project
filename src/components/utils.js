//утилитарные функции, которые используются в работе сразу нескольких других функций

//открытие попапа
export const openPopup = popup => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

//закрытие попапа
export const closePopup = popup => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
        closePopup(document.querySelector('.popup_opened'))
    }
}