export class FormValidator {
  constructor({formSelector, inputSelector, submitButtonSelector, submitButtonInactiveClass, inputErrorClass, errorSpanOpenedClass}, formElement) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._submitButtonInactiveClass = submitButtonInactiveClass;
    this._inputErrorClass = inputErrorClass;
    this._errorSpanOpenedClass = errorSpanOpenedClass;
    this._formElement = formElement;
  }

  enableValidation() {
    this._setEventListener();
  }

  _setEventListener() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formElement.reset();
      this._toggleButtonState(inputList, buttonElement);
    });
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _isValid(input) {
    if(!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-span`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorSpanOpenedClass);
    errorElement.textContent = '';
  }

  _showInputError(inputElement, errorText = 'В поле ввода допущена ошибка') {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-span`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorText;
    errorElement.classList.add(this._errorSpanOpenedClass);
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if(this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._submitButtonInactiveClass);
      buttonElement.setAttribute('disabled', 0);
    } else {
      buttonElement.classList.remove(this._submitButtonInactiveClass);
      buttonElement.removeAttribute('disabled', 0);
    }
  }
}