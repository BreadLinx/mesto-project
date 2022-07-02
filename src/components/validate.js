export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListener(formElement);
  });

  function setEventListener(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      formElement.reset();
      toggleButtonState(inputList, buttonElement);
    });
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }

  function isValid(formElement, input) {
    if(!input.validity.valid) {
      showInputError(formElement, input, input.validationMessage);
    } else {
      hideInputError(formElement, input);
    }
  }
  
  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-span`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorSpanOpenedClass);
    errorElement.textContent = '';
  }
  
  function showInputError(formElement, inputElement, errorText = 'В поле ввода допущена ошибка') {
    const errorElement = formElement.querySelector(`#${inputElement.id}-span`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorText;
    errorElement.classList.add(config.errorSpanOpenedClass);
  }
  
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  function toggleButtonState(inputList, buttonElement) {
    if(hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.submitButtonInactiveClass);
      buttonElement.setAttribute('disabled', 0);
    } else {
      buttonElement.classList.remove(config.submitButtonInactiveClass);
      buttonElement.removeAttribute('disabled', 0);
    }
  }
}