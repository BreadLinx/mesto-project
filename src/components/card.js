export class Card {
  constructor(options, classesInstantces, handlers) {
    this._name = options.name;
    this._link = options.link;
    this._likesAmount = options.likesAmount;
    this._ownerID = options.ownerID;
    this._myLike = options.myLike;
    this.id = options.id;

    this._photoPopupInstantce = classesInstantces.photoPopupInstantce;
    this._submitPopupInstantce = classesInstantces.submitPopupInstantce;
    this._userInfoInstantce = classesInstantces.userInfoInstantce;

    this._putLikeOnCard = handlers.handlePutLikeOnCard;
    this._deleteLikeFromCard = handlers.handleDeleteLikeFromCard;

    this._cardElement = document.querySelector('#card-template').content.cloneNode(true);
    this._likeElement = this._cardElement.querySelector('.card__like');
    this.cardPhotoElement = this._cardElement.querySelector('.card__photo');
    this._likeCounterElement = this._cardElement.querySelector('.card__likes-counter');
    this._deleteCardButton = this._cardElement.querySelector('.card__delete-button');

    this._deleteActionSubmitPopupNode = document.querySelector('#delete-action-submit-popup');
    this._deleteActionSubmitPopupSubmit = this._deleteActionSubmitPopupNode.querySelector('.popup__submit');
    this._deleteActionSubmitPopupCloseBtn = this._deleteActionSubmitPopupNode.querySelector('.popup__close-icon');
  }

  createCard() {
    this.cardPhotoElement.src = this._link;
    this.cardPhotoElement.alt = `Изображние показывающее ${this._name}`;
    this._cardElement.querySelector('.card__description').textContent = this._name;
    this._likeCounterElement.textContent = this._likesAmount;
    if(this._myLike === true) {
      this._likeElement.classList.add('card__like_active');
    }
    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    this.cardPhotoElement.addEventListener('click', () => {
      this._photoPopupInstantce.open(this._link, this._name);
    });
    this._likeElement.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('card__like_active')) {
        this._deleteLikeFromCard(this);
      } else {
        this._putLikeOnCard(this);
      }
    });
    if(this._ownerID === this._userInfoInstantce.getUserInfo().id) {
      this._deleteCardButton.addEventListener('click', () => {
        this._deleteCard();
      });
    } else {
      this._deleteCardButton.remove();
    }
  }

  _handleDeleteCard(cardElement) {
    cardElement.remove();
    cardElement = null;
  }

  _deleteCard() {
    this._submitPopupInstantce.open(this);
  }
}