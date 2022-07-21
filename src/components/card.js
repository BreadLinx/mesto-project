import {photoPopup, submitPopup} from "../pages/index.js";
import {photoPopupPhoto, photoPopupDescription} from '../utils/constants.js'
import {api} from './api.js';
import {userId, deleteActionSubmitPopup, deleteActionSubmitPopupSubmit, deleteActionSubmitPopupCloseBtn} from '../utils/constants.js';

export class Card {
  constructor(name, link, likesAmount, ownerID, cardID, myLike = false, selector) {
    this._name = name,
    this._link = link,
    this._likesAmount = likesAmount,
    this._ownerID = ownerID,
    this._cardID = cardID,
    this._myLike = myLike,
    this._selector = selector
  }

  createCard() {
    const card = document.querySelector(this._selector).content.cloneNode(true);
    card.id = this._cardID;
    const cardPhoto = card.querySelector('.card__photo');
    cardPhoto.src = this._link;
    cardPhoto.alt = `Изображние показывающее ${this._name}`;
    cardPhoto.addEventListener('click', () => {
      photoPopup.open();
      photoPopupPhoto.src = this._link;
      photoPopupPhoto.alt = `Изображние показывающее ${this._name}`;
      photoPopupDescription.textContent = this._name;
    });
    card.querySelector('.card__description').textContent = this._name;
    const like = card.querySelector('.card__like');
    if(this._myLike === true) {
      like.classList.add('card__like_active');
    }
    like.addEventListener('click', (evt) => {
        const targetCardID = card.id;
        const targetCard = evt.target.closest('.card');
        if(evt.target.classList.contains('card__like_active')) {
          this._deleteLikeFromCard(targetCard, targetCardID);
        } else {
          this._putLikeOnCard(targetCard, targetCardID);
        }
    });
    const likeCounter = card.querySelector('.card__likes-counter');
    likeCounter.textContent = this._likesAmount;
    const cardDeleteButton = card.querySelector('.card__delete-button');
    if(this._ownerID === userId) {
      cardDeleteButton.addEventListener('click', (evt) => {
        const targetCard = evt.target.closest('.card');
        const targetCardID = card.id;
        this._deleteCard(deleteActionSubmitPopup, submitPopup, deleteActionSubmitPopupCloseBtn, targetCard, targetCardID);
      });
    } else {
      cardDeleteButton.remove();
    }
    return card;
  }

  _handleDeleteCard(cardElement) {
    cardElement.remove();
    cardElement = null;
  }

  _deleteCard(submitPopupNode, submitPopupInstant, closeIcon, cardElement, cardID) {
    function handleRemoveCardSubmit(evt) {
      evt.preventDefault();
      deleteActionSubmitPopupSubmit.textContent = 'Удаление...';
      api.sendDeleteRequest(cardID)
      .then(() => {
        this._handleDeleteCard(cardElement);
        removeCloseEventListeners();
        removeSubmitEventListener();
        deleteActionSubmitPopupSubmit.textContent = 'Удалено';
        submitPopupInstant.close();
        return Promise.resolve();
      })
      .catch((err) => {
        console.log(err);
        removeCloseEventListeners();
        removeSubmitEventListener();
      })
      .finally(() => {
        deleteActionSubmitPopupSubmit.textContent = 'Да';
      });
    }
      
    function closeSubmitPopupByOverlay(evt) {
      if(evt.target.id === 'delete-action-submit-popup') {
        removeSubmitEventListener();
        removeCloseEventListeners();
      }
    }

    function closeSubmitPopupByESC(evt) {
      if(evt.key === "Escape") {
        removeSubmitEventListener();
        removeCloseEventListeners();
      }
    }
      
    function closeSubmitPopupByCloseIcon() {
      removeSubmitEventListener();
     removeCloseEventListeners();
    }
      
    function removeSubmitEventListener() {
      submitPopupNode.removeEventListener('submit', handleRemoveCardSubmit);
    }
      
    function removeCloseEventListeners() {
      closeIcon.removeEventListener('mousedown', closeSubmitPopupByCloseIcon);
      submitPopupNode.removeEventListener('mousedown', closeSubmitPopupByOverlay);
      document.removeEventListener('keydown', closeSubmitPopupByESC);
    }
      
    submitPopupNode.addEventListener('submit', handleRemoveCardSubmit);
    submitPopupNode.addEventListener('mousedown', closeSubmitPopupByOverlay);
    document.addEventListener('keydown', closeSubmitPopupByESC);
    closeIcon.addEventListener('mousedown', closeSubmitPopupByCloseIcon);
    submitPopupInstant.open();
  }

  _putLikeOnCard(targetCard, cardID) {
    api.sendPutLikeRequest(cardID)
    .then((res) => {
      targetCard.querySelector('.card__like').classList.add('card__like_active');
      targetCard.querySelector('.card__likes-counter').textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  }

  _deleteLikeFromCard(targetCard, cardID) {
    api.sendDeleteLikeRequest(cardID)
    .then((res) => {
      targetCard.querySelector('.card__like').classList.remove('card__like_active');
      targetCard.querySelector('.card__likes-counter').textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  }
}