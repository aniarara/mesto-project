//функциональность валидации форм

//проверка валидации поля ввода
const checkValidity = (element) => {
    const elementForm = element.closest('.form');
    const elementError = elementForm.querySelector(`.${element.id}-error`);
    if ((element.validity.patternMismatch === false)
    && (element.validity.tooLong === false)
    && (element.validity.tooShort === false)
    && (element.validity.typeMismatch === false)
    && (element.validity.valueMissing === false)) {
        element.classList.remove('form__input_invalid');
        elementError.classList.remove('form__input-error_active');
        elementError.textContent = '';
        return true;
    } else { 
        element.classList.add('form__input_invalid');
        elementError.classList.add('form__input-error_active');
        elementError.textContent = element.validationMessage;
        if (element.validity.patternMismatch === true) {
            elementError.textContent = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
            return false;
        }
        return false;
    }
}

//проверка кнопки сохранения
export const inputCallback = (evt) => {
    const inputCallbackForm = evt.target.closest('.form');
    const inputs = inputCallbackForm.querySelectorAll('.form__input');
    const inputCallbackSaveButton = inputCallbackForm.querySelector('.form__save-handler');
    if (Array.from(inputs).every(checkValidity) === true) {
        inputCallbackSaveButton.removeAttribute('disabled', true);
    } else {
        inputCallbackSaveButton.setAttribute('disabled', true);
    }
}