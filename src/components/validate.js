//функциональность валидации форм

export const makeInputValid = popup => {
    popup.querySelectorAll('.form__input').forEach((input) => {
    input.classList.remove('form__input_invalid');
});
}

export const removeInputErrors = popup => {
    popup.querySelectorAll('.popup__input_type_error').forEach((inputError) => {
        inputError.classList.remove('form__input-error_active');
    });
}

export function enableValidation({
    formSelector,
    inputSelector,
    submitButtonSelector,
    // inactiveButtonClass,
    inputErrorClass,
    errorClass
  }) {
    const allForms = Array.from(document.querySelectorAll(formSelector));
    allForms.forEach((form) => {
        checkForm({
            form,
            inputSelector,
            submitButtonSelector,
            // inactiveButtonClass,
            inputErrorClass,
            errorClass
          })
    })
}

const checkForm = ({
    form,
    inputSelector,
    submitButtonSelector,
    // inactiveButtonClass,
    inputErrorClass,
    errorClass
  }) => {
    const formInputs = Array.from(form.querySelectorAll(inputSelector));
    const saveButton = form.querySelector(submitButtonSelector);
    formInputs.forEach((formInput) => {
        formInput.addEventListener('input', () => {
            checkValidity(form, formInput, inputErrorClass);
            checkSaveButton(formInputs, saveButton)
        })
    })
  }
  
//проверка валидации поля ввода
const checkValidity = (form, formInput, inputErrorClass) => {
    if ((formInput.validity.valid === true)) {
        hideInputError(form, formInput);
        return true;
    } else {
        showInputError(form, formInput, formInput.validationMessage, inputErrorClass, errorClass);
        return false;
    }
}

const showInputError = (form, formInput, errorMessage, inputErrorClass, errorClass) => {
    const errorSpan = form.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(inputErrorClass);
    errorSpan.classList.add(errorClass);
    errorSpan.textContent = errorMessage;

    if (formInput.validity.patternMismatch === true) {
        errorSpan.textContent = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
    }
}

const hideInputError = (form, formInput) => {
    const errorSpan = form.querySelector(`.${element.id}-error`);
    formInput.classList.remove(inputErrorClass);
    errorSpan.classList.remove(errorClass);
    errorSpan.textContent = '';
}

const checkSaveButton = (formInputs, saveButton) => {
    if (formInputs.every(checkValidity)) {
        saveButton.removeAttribute('disabled');
    } else saveButton.setAttribute('disabled', true);
}