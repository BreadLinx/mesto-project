// export function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', closePopupByESC);
// }

// export function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closePopupByESC);
// }

// export function closePopupByESC(evt) {
//   if(evt.key === "Escape") {
//     closePopup(document.querySelector('.popup_opened'));
//   }
// }

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if(evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this._close();
      }
      if (evt.target.classList.contains('popup__close-icon')) {
        this._close();
      }
    });
  }
}

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photo = this._popup.querySelector('.popup__image');
    this._description = this._popup.querySelector('.popup__description');
    this._src = src;
    this._text = text;
  }

  open() {
    this._photo.src = this._src;
    this._photo.alt = this._text;
    this._description.textContent = this._text
    super.open();
  }
}

class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
  }

  _getInputValues() {

  }

  setEventListeners() {
    
  }
}