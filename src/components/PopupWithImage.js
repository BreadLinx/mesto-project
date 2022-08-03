import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._photoElement = this._popup.querySelector('.popup__image');
      this._descriptionElement = this._popup.querySelector('.popup__description');
    }
  
    open(src, text) {
      this._photoElement.src = src;
      this._photoElement.alt = text;
      this._descriptionElement.textContent = text;
      super.open();
    }
}