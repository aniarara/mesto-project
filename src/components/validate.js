//функциональность валидации форм

export const makeInputValid = (popup, invalidClass) => {
    popup.querySelectorAll('.form__input').forEach((input) => {
    input.classList.remove(invalidClass);
});
}

export const removeInputErrors = popup => {
    popup.querySelectorAll('.form__input-error').forEach((inputError) => {
        inputError.classList.remove('form__input-error_active');
    });
}

export function enableValidation({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inputErrorClass,
    errorClass
  }) {
    const allForms = Array.from(document.querySelectorAll(formSelector));
    allForms.forEach((form) => {
        checkForm(
            form,
            inputSelector,
            submitButtonSelector,
            inputErrorClass,
            errorClass
          )
    })
}

const checkForm = (
    form,
    inputSelector,
    submitButtonSelector,
    inputErrorClass,
    errorClass
  ) => {
    const formInputs = Array.from(form.querySelectorAll(inputSelector));
    const saveButton = form.querySelector(submitButtonSelector);
    formInputs.forEach((inp) => {
        inp.addEventListener('input', () => {
            checkValidity(inp);
            cneckError(form, inp, inputErrorClass, errorClass);
            checkSaveButton(formInputs, saveButton)
        })
    })
  }
  
  const checkValidity = (inp) => {
    if (inp.validity.valid === true) {
        return true;
    } else {
        return false;
    }
  }

  const checkSaveButton = (formInputs, saveButton) => {
    if (formInputs.every(checkValidity) === true) {
        makeButtonNotDisabled(saveButton);
    } else makeButtonDisabled(saveButton);
  }

  export const makeButtonDisabled = (button) => button.setAttribute('disabled', true);

  export const makeButtonNotDisabled = (button) => button.removeAttribute('disabled');

  const cneckError = (form, inp, inputErrorClass, errorClass) => {
    if (checkValidity(inp) === true) {
        hideInputError(form, inp, inputErrorClass, errorClass);
    } else {
        showInputError(form, inp, inputErrorClass, errorClass, inp.validationMessage);
    }
  }

  const showInputError = (form, inp, inputErrorClass, errorClass, errorText) => {
    const errorSpan = form.querySelector(`.${inp.id}-error`);
    inp.classList.add(inputErrorClass);
    errorSpan.classList.add(errorClass);
    errorSpan.textContent = errorText;
    if (inp.validity.patternMismatch === true) {
        errorSpan.textContent = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
    }
  }

  const hideInputError = (form, inp, inputErrorClass, errorClass) => {
    const errorSpan = form.querySelector(`.${inp.id}-error`);
    inp.classList.remove(inputErrorClass);
    errorSpan.classList.remove(errorClass);
    errorSpan.textContent = '';
  }