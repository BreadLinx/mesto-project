import '../pages/index.css';
import {Api} from '../components/Api.js';
import {Card} from '../components/Card.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupActionSubmit} from '../components/PopupActionSubmit.js';
import {editProfileButton, editProfilePopupSelector, apiConfig, addNewPopupSelector, addNewButton, uploadAvatarPopupSelector, avatarOverlay} from '../utils/constants.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
export const api = new Api(apiConfig);
export const userInfo = new UserInfo();
export const photoPopup = new PopupWithImage('#photo-popup');
export const submitPopup = new PopupActionSubmit('#delete-action-submit-popup', handleRemoveCardSubmit);
export const editProfilePopup = new PopupWithForm(editProfilePopupSelector, handleEditFormSubmit);
export const addNewPopup = new PopupWithForm(addNewPopupSelector, handleAddNewFormSubmit);
export const uploadAvatarPopup = new PopupWithForm(uploadAvatarPopupSelector, handleUploadAvatarSubmit);
photoPopup.setEventListeners();
submitPopup.setEventListeners();

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  editProfilePopup.renderLoading(true);
  const inputValues = editProfilePopup.getInputValues();
  api.uploadNewUserInformationRequest(inputValues['name'], inputValues['work'])
  .then((res) => {
    userInfo.setUserInfo({name: res.name, about: res.about, avatar: res.avatar, _id: res._id})
    editProfilePopup.renderLoading(true, 'Сохранено');
  })
  .then(() => {
    editProfilePopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    editProfilePopup.renderLoading(false);
  });
}

function handleUploadAvatarSubmit(evt) {
  evt.preventDefault();
  uploadAvatarPopup.renderLoading(true);
  const inputValues = uploadAvatarPopup.getInputValues();
  api.updateAvatar(inputValues['avatarLink'])
  .then((res) => {
    userInfo.setUserInfo({name: res.name, about: res.about, avatar: res.avatar, _id: res._id})
    uploadAvatarPopup.renderLoading(true, 'Сохранено');
  })
  .then(() => {
    uploadAvatarPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    uploadAvatarPopup.renderLoading(false);
  });
}

function handleAddNewFormSubmit(evt) {  // Доделать функцию добавления новой карточки
  evt.preventDefault();
  const inputValues = addNewPopup.getInputValues();
  addNewPopup.renderLoading(true);
  api.addNewCardRequest(inputValues['placeName'], inputValues['placeLink'])
  .then((res) => {
    addNewCardSectionInstanse.addItem(res);
    addNewPopup.renderLoading(true, 'Сохранено');
  })
  .then(() => {
    addNewPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    addNewPopup.renderLoading(false);
  });
}

function handlePutLikeOnCard(card) {
  api.sendPutLikeRequest(card.id)
    .then((res) => {
      card._likeElement.classList.add('card__like_active');
      card._likeCounterElement.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDeleteLikeFromCard(card) {
  api.sendDeleteLikeRequest(card.id)
    .then((res) => {
      card._likeElement.classList.remove('card__like_active');
      card._likeCounterElement.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleRemoveCardSubmit(card) {
  submitPopup.renderLoading(true, 'Удаление...');
  api.sendDeleteRequest(card.id)
  .then(() => {
    card._handleDeleteCard(card.cardPhotoElement.closest('.card'));
    submitPopup.renderLoading(true, 'Удалено');
    submitPopup.close();
    return Promise.resolve();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    submitPopup.renderLoading(false);
  });
}

const addNewCardSectionInstanse = new Section({
  items: null,
  renderer: function(card) {
      const cardInstanse = new Card(
        {name: card.name, link: card.link, likesAmount: card.likes.length, ownerID: card.owner._id, myLike: false, id: card._id},
        {photoPopupInstantce: photoPopup, submitPopupInstantce: submitPopup, userInfoInstantce: userInfo},
        {handlePutLikeOnCard, handleDeleteLikeFromCard}
      );
      return cardInstanse.createCard();
  }
}, '.elements');

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  submitButtonInactiveClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_error',
  errorSpanOpenedClass: 'popup__error-message_opened',
});

Promise.all([api.uploadUserInformationRequest(), api.getCardsArrayRequest()])
.then((results) => {
  userInfo.setUserInfo({name: results[0].name, about: results[0].about, avatar: results[0].avatar, _id: results[0]._id});
  addNewCardSectionInstanse.setNewItems(results[1]);
  addNewCardSectionInstanse.setNewRenderer(
    function renderer(card) {
      if(card.likes.length === 0) {
        const cardInstanse = new Card(
          {name: card.name, link: card.link, likesAmount: card.likes.length, ownerID: card.owner._id, myLike: false, id: card._id},
          {photoPopupInstantce: photoPopup, submitPopupInstantce: submitPopup, userInfoInstantce: userInfo},
          {handlePutLikeOnCard, handleDeleteLikeFromCard}
        );
        return cardInstanse.createCard();
      } else {
        const myLike = card.likes.some(user => {return user._id === userInfo.getUserInfo().id});
        const cardInstanse = new Card(
          {name: card.name, link: card.link, likesAmount: card.likes.length, ownerID: card.owner._id, myLike, id: card._id},
          {photoPopupInstantce: photoPopup, submitPopupInstantce: submitPopup, userInfoInstantce: userInfo},
          {handlePutLikeOnCard, handleDeleteLikeFromCard}
        );
        return cardInstanse.createCard();
      }
    }
  );
  addNewCardSectionInstanse.renderItems();
})
.catch((err) => {
  console.log(err);
})
.finally(() => {
  addNewCardSectionInstanse.setNewItems(null);
  addNewCardSectionInstanse.setNewRenderer(
    function renderer(card) {
      const cardInstanse = new Card(
        {name: card.name, link: card.link, likesAmount: card.likes.length, ownerID: card.owner._id, myLike: false, id: card._id},
        {photoPopupInstantce: photoPopup, submitPopupInstantce: submitPopup, userInfoInstantce: userInfo},
        {handlePutLikeOnCard, handleDeleteLikeFromCard}
      );
      return cardInstanse.createCard();
    }
  );
});

editProfilePopup.setEventListeners();
editProfileButton.addEventListener('click', () => {
    const {name, work} = userInfo.getUserInfo();
    editProfilePopup.setInputValues({name: name, work: work});
    formValidators['editForm'].resetValidation();
    editProfilePopup.open();
});

addNewPopup.setEventListeners();
addNewButton.addEventListener('click', () => {
  formValidators['addNewform'].resetValidation();
  addNewPopup.open();
});

uploadAvatarPopup.setEventListeners();
avatarOverlay.addEventListener('click', () => {
  formValidators['uploadAvatarForm'].resetValidation();
  uploadAvatarPopup.open();
});