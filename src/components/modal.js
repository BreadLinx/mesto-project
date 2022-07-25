export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', Popup.prototype._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', Popup.prototype._handleEscClose);
  }

  _handleEscClose(evt) {
    if(evt.key === "Escape") {
      const popup = document.querySelector('.popup_opened');
      popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', Popup.prototype._handleEscClose);
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close-icon')) {
        this.close();
      }
    });
  }
}

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

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  getInputValues() {
    const inputs = this._popupForm.querySelectorAll('.popup__input');
    const inputsValues = [];
    inputs.forEach((input) => {
      inputsValues.push(input.value);
    });
    return inputsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._submitCallback);
  }
}