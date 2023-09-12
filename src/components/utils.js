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

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

export const catchError = (err) => {
    console.log(err);
}