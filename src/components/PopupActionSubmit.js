import {Popup} from './Popup.js';

export class PopupActionSubmit extends Popup {
  constructor(popupSelector, handleRemoveCardSubmit) {
    super(popupSelector);
    this._submitButtonElement = this._popup.querySelector('.popup__submit');
    this._submitButtonText = this._submitButtonElement.textContent;
    this.handleRemoveCardSubmit = handleRemoveCardSubmit;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.handleRemoveCardSubmit(this._card);
    });
    super.setEventListeners();
  }

  renderLoading(isLoading, loadingText='Удаление...') {
    if(isLoading) {
      this._submitButtonElement.textContent = loadingText;
    } else {
      this._submitButtonElement.textContent = this._submitButtonText;
    }
  }
}