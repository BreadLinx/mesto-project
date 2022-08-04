export class Card {
  constructor(card, classesInstantces, handlers, cardTemplateSelector) {
    this._card = card;
    this._name = this._card.name;
    this._link = this._card.link;
    this.id = this._card._id;

    this._photoPopupInstantce = classesInstantces.photoPopup;
    this._submitPopupInstantce = classesInstantces.submitPopup;
    this._userInfoInstantce = classesInstantces.userInfo;

    this._putLikeOnCard = handlers.handlePutLikeOnCard;
    this._deleteLikeFromCard = handlers.handleDeleteLikeFromCard;

    this._cardElement = document.querySelector(cardTemplateSelector).content.cloneNode(true);
    this._likeElement = this._cardElement.querySelector('.card__like');
    this._cardPhotoElement = this._cardElement.querySelector('.card__photo');
    this._likeCounterElement = this._cardElement.querySelector('.card__likes-counter');
    this._deleteCardButton = this._cardElement.querySelector('.card__delete-button');

    this._deleteActionSubmitPopupNode = document.querySelector('#delete-action-submit-popup');
    this._deleteActionSubmitPopupSubmit = this._deleteActionSubmitPopupNode.querySelector('.popup__submit');
    this._deleteActionSubmitPopupCloseBtn = this._deleteActionSubmitPopupNode.querySelector('.popup__close-icon');
  }

  createCard() {
    this._cardPhotoElement.src = this._link;
    this._cardPhotoElement.alt = `Изображние показывающее ${this._name}`;
    this._cardElement.querySelector('.card__description').textContent = this._name;
    this._likeCounterElement.textContent = this._card.likes.length;
    this._myLike = this._card.likes.some(user => {return user._id === this._userInfoInstantce.getUserInfo().id});
    if(this._myLike === true) {
      this._likeElement.classList.add('card__like_active');
    }
    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    this._cardPhotoElement.addEventListener('click', () => {
      this._photoPopupInstantce.open(this._link, this._name);
    });
    this._likeElement.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('card__like_active')) {
        this._deleteLikeFromCard(this);
      } else {
        this._putLikeOnCard(this);
      }
    });
    if(this._card.owner._id === this._userInfoInstantce.getUserInfo().id) {
      this._deleteCardButton.addEventListener('click', () => {
        this._deleteCard();
      });
    } else {
      this._deleteCardButton.remove();
    }
  }

  handleDeleteCard() {
    this._cardPhotoElement.closest('.card').remove();
  }

  _deleteCard() {
    this._submitPopupInstantce.open(this);
  }

  addLike(res) {
    this._likeElement.classList.add('card__like_active');
    this._likeCounterElement.textContent = res.likes.length;
  }

  deleteLike(res) {
    this._likeElement.classList.remove('card__like_active');
    this._likeCounterElement.textContent = res.likes.length;
  }
}