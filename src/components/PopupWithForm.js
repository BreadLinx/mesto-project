import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
      super(popupSelector);
      this._submitCallback = submitCallback;
      this._popupForm = this._popup.querySelector('.popup__form');
      this._inputList = this._popupForm.querySelectorAll('.popup__input');
      this._submitButtonElement = this._popup.querySelector('.popup__submit');
      this._submitButtonText = this._submitButtonElement.textContent;
    }
  
    close() {
      super.close();
      this._popupForm.reset();
    }
  
    getInputValues() {
      this._formValues = {};
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
      return this._formValues;
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener('submit', this._submitCallback);
    }

    renderLoading(isLoading, loadingText='Сохранение...') {
      if(isLoading) {
        this._submitButtonElement.textContent = loadingText;
      } else {
        this._submitButtonElement.textContent = this._submitButtonText;
      }
    }

    setInputValues(data) {
      this._inputList.forEach((input) => {
        input.value = data[input.name];
      });
    }
}