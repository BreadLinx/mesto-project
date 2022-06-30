import {openPopup, closePopup, closePopupByESC} from './modal';
import {profileName, editProfileInputName, profileInfoAbout, editProfileInputWork, editProfilePopup, addNewInputPlace, addNewInputPlaceLink, addNewPopup, cards, photoPopup, photoPopupPhoto, popupImage, deleteActionSubmitPopup} from './index';
import {sendDeleteRequest, sendPutLikeRequest, sendDeleteLikeRequest, getLikes} from './api';

export function handleEditFormSubmit(evt) {
    evt.preventDefault();
    fetch('https://nomoreparties.co/v1/plus-cohort-13/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'd0237f44-6bee-4b11-b7b4-b67bb1856179',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: editProfileInputName.value,
        about: editProfileInputWork.value
      })
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      profileName.textContent = res.name;
      profileInfoAbout.textContent = res.about;
    })
    .catch((err) => {
      console.log('Ошибка при попытке изменения профиля');
    });
    closePopup(editProfilePopup);
}

export function handleAddNewFormSubmit(evt) {
    evt.preventDefault();
    if(addNewInputPlace.value !== '' && addNewInputPlaceLink.value !== '') {
    fetch('https://nomoreparties.co/v1/plus-cohort-13/cards', {
      method: 'POST',
      headers: {
        authorization: 'd0237f44-6bee-4b11-b7b4-b67bb1856179',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: addNewInputPlace.value,
        link: addNewInputPlaceLink.value
      })
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      cards.prepend(createCard(res.name, res.link, res.likes.length, res.owner._id, res._id, false));
    })
    .catch((err) => {
      console.log('Ошибка при создании новой карточки.');
    });
    closePopup(addNewPopup);
    evt.target.reset();
  }
}

export function handleDeleteCard(card) {
  card.remove();
  card = null;
}

export function deleteCard(submitPopup, cardElement, cardID) {
  function handleRemoveCardSubmit(evt) {
    evt.preventDefault();
    sendDeleteRequest(cardID)
    .then(() => {
      handleDeleteCard(cardElement);
      submitPopup.removeEventListener('submit', handleRemoveCardSubmit);
      closePopup(submitPopup);
    })
    .catch((err) => {
      console.log(`При удалении карточки произошла ${err}`);
      submitPopup.removeEventListener('submit', handleRemoveCardSubmit);
    });
  }
  submitPopup.addEventListener('submit', handleRemoveCardSubmit);
  openPopup(submitPopup);
}

export function createCard(name, link, likesAmount, ownerID, cardID, myLike = false) {
    const card = document.querySelector('#card-template').content.cloneNode(true);
    card.id = cardID;
    const cardPhoto = card.querySelector('.card__photo');
    cardPhoto.src = link;
    cardPhoto.alt = `Изображние показывающее ${name}`;
    cardPhoto.addEventListener('click', () => {
      openPopup(photoPopup);
      photoPopupPhoto.src = link;
      photoPopupPhoto.alt = `Изображние показывающее ${name}`;
      popupImage.textContent = name;
    });
    card.querySelector('.card__description').textContent = name;
    const like = card.querySelector('.card__like');
    if(myLike === true) {
      like.classList.add('card__like_active');
    }
    like.addEventListener('click', (evt) => {
        const targetCardID = card.id;
        const targetCard = evt.target.closest('.card');
        if(evt.target.classList.contains('card__like_active')) {
          deleteLikeFromCard(targetCard, targetCardID);
        } else {
          putLikeOnCard(targetCard, targetCardID);
        }
    });
    const likeCounter = card.querySelector('.card__likes-counter');
    likeCounter.textContent = likesAmount;
    const cardDeleteButton = card.querySelector('.card__delete-button');
    if(ownerID === "3aa69ff877e5d2e63a6e38fc") {
      cardDeleteButton.addEventListener('click', (evt) => {
        const targetCard = evt.target.closest('.card');
        const targetCardID = card.id;
        deleteCard(deleteActionSubmitPopup, targetCard, targetCardID);
      });
    } else {
      cardDeleteButton.remove();
    }
    return card;
}

export function insertCardToHTML(card) {
  cards.append(card);
}

function putLikeOnCard(targetCard, cardID) {
  sendPutLikeRequest(cardID)
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    // console.log(res);
    targetCard.querySelector('.card__like').classList.add('card__like_active');
    targetCard.querySelector('.card__likes-counter').textContent = res.likes.length;
  })
  .catch((err) => {
    console.log(err);
  });
}

function deleteLikeFromCard(targetCard, cardID) {
  sendDeleteLikeRequest(cardID)
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    // console.log(res);
    targetCard.querySelector('.card__like').classList.remove('card__like_active');
    targetCard.querySelector('.card__likes-counter').textContent = res.likes.length;
  })
  .catch((err) => {
    console.log(err);
  });
}