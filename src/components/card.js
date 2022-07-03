import {openPopup, closePopup} from './modal';
import {profileName, editProfileInputName, profileInfoAbout, editProfileInputWork, editProfilePopup, addNewInputPlace, addNewInputPlaceLink, addNewPopup, cards, photoPopup, photoPopupPhoto, popupImage, deleteActionSubmitPopup, profileAvatar, uploadAvatarPopup, deleteActionSubmitPopupDeleteBtn, editProfilePopupSubmit, addNewPopupSubmit, deleteActionSubmitPopupSubmit, uploadAvatarPopupSubmit, cardTemplate, userId} from './index';
import {sendDeleteRequest, sendPutLikeRequest, sendDeleteLikeRequest, updateAvatar, uploadNewUserInformationRequest, addNewCardRequest} from './api';

export function handleEditFormSubmit(evt) {
    evt.preventDefault();
    editProfilePopupSubmit.textContent = 'Сохранение...';
    uploadNewUserInformationRequest(editProfileInputName.value, editProfileInputWork.value)
    .then(checkResponse)
    .then((res) => {
      profileName.textContent = res.name;
      profileInfoAbout.textContent = res.about;
      editProfilePopupSubmit.textContent = 'Сохранено';
    })
    .then(() => {
      closePopup(editProfilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfilePopupSubmit.textContent = 'Сохранить';
    });
}

export function handleAddNewFormSubmit(evt) {
    evt.preventDefault();
    if(addNewInputPlace.value !== '' && addNewInputPlaceLink.value !== '') {
    addNewPopupSubmit.textContent = 'Сохранение...';
    addNewCardRequest(addNewInputPlace.value, addNewInputPlaceLink.value)
    .then(checkResponse)
    .then((res) => {
      cards.prepend(createCard(res.name, res.link, res.likes.length, res.owner._id, res._id, false));
    })
    .then(() => {
      addNewPopupSubmit.textContent = 'Сохранено';
      closePopup(addNewPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addNewPopupSubmit.textContent = 'Создать';
    });
  }
}

export function handleDeleteCard(card) {
  card.remove();
  card = null;
}

export function deleteCard(submitPopup, closeIcon, cardElement, cardID) {
  function handleRemoveCardSubmit(evt) {
    evt.preventDefault();
    deleteActionSubmitPopupSubmit.textContent = 'Удаление...';
    sendDeleteRequest(cardID)
    .then((res) => {
      if(res.ok) {
        handleDeleteCard(cardElement);
        removeCloseEventListeners();
        removeSubmitEventListener();
        deleteActionSubmitPopupSubmit.textContent = 'Удалено';
        closePopup(submitPopup);
        return Promise.resolve(res.json());
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
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
    submitPopup.removeEventListener('submit', handleRemoveCardSubmit);
  }

  function removeCloseEventListeners() {
    closeIcon.removeEventListener('mousedown', closeSubmitPopupByCloseIcon);
    submitPopup.removeEventListener('mousedown', closeSubmitPopupByOverlay);
    document.removeEventListener('keydown', closeSubmitPopupByESC);
  }

  submitPopup.addEventListener('submit', handleRemoveCardSubmit);
  submitPopup.addEventListener('mousedown', closeSubmitPopupByOverlay);
  document.addEventListener('keydown', closeSubmitPopupByESC);
  closeIcon.addEventListener('mousedown', closeSubmitPopupByCloseIcon);
  openPopup(submitPopup);
}

export function createCard(name, link, likesAmount, ownerID, cardID, myLike = false) {
    const card = cardTemplate.content.cloneNode(true);
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
    if(ownerID === userId) {
      cardDeleteButton.addEventListener('click', (evt) => {
        const targetCard = evt.target.closest('.card');
        const targetCardID = card.id;
        deleteCard(deleteActionSubmitPopup, deleteActionSubmitPopupDeleteBtn, targetCard, targetCardID);
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
  .then(checkResponse)
  .then((res) => {
    targetCard.querySelector('.card__like').classList.add('card__like_active');
    targetCard.querySelector('.card__likes-counter').textContent = res.likes.length;
  })
  .catch((err) => {
    console.log(err);
  });
}

function deleteLikeFromCard(targetCard, cardID) {
  sendDeleteLikeRequest(cardID)
  .then(checkResponse)
  .then((res) => {
    targetCard.querySelector('.card__like').classList.remove('card__like_active');
    targetCard.querySelector('.card__likes-counter').textContent = res.likes.length;
  })
  .catch((err) => {
    console.log(err);
  });
}

export function handleUploadAvatarSubmit(avatarLink) {
  uploadAvatarPopupSubmit.textContent = 'Сохранение...';
  updateAvatar(avatarLink)
  .then(checkResponse)
  .then((res) => {
    profileAvatar.src = res.avatar;
    uploadAvatarPopupSubmit.textContent = 'Сохранено';
    closePopup(uploadAvatarPopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    uploadAvatarPopupSubmit.textContent = 'Сохранить';
  });
}

function checkResponse(res) {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}