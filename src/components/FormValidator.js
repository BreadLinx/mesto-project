export class FormValidator {
  constructor({formSelector, inputSelector, submitButtonSelector, submitButtonInactiveClass, inputErrorClass, errorSpanOpenedClass}, formElement) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._submitButtonInactiveClass = submitButtonInactiveClass;
    this._inputErrorClass = inputErrorClass;
    this._errorSpanOpenedClass = errorSpanOpenedClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._setEventListener();
  }

  _setEventListener() {
    this._formElement.addEventListener('reset', () => {
      this._toggleButtonState();
      this._inputList.forEach((input) => {
        this._hideInputError(input);
      });
    });
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
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

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._submitButtonElement.classList.add(this._submitButtonInactiveClass);
      this._submitButtonElement.setAttribute('disabled', 0);
    } else {
      this._submitButtonElement.classList.remove(this._submitButtonInactiveClass);
      this._submitButtonElement.removeAttribute('disabled', 0);
    }
  }
}