//утилитарные функции, которые используются в работе сразу нескольких других функций

//открытие попапа
export const openPopup = popup => {
    popup.classList.add('popup_opened');
    popup.addEventListener('keydown', closeByEscape);
}

//закрытие попапа
export const closePopup = popup => {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('keydown', closeByEscape);
}

export const makeInputValid = popup => {
    popup.querySelectorAll('.form__input').forEach((input) => {
    input.classList.remove('form__input_invalid');
});
}

export const removeInputErrors = popup => {
    popup.querySelectorAll('.form__input-error').forEach((inputError) => {
        inputError.classList.remove('form__input-error_active');
    });
}

//closing popups by escape
export const closeByEscape = (evt) => {
    if (evt.key === 'Escape') {
        closePopup(evt.target.closest('.popup'))
    }
};