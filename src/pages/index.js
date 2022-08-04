import '../pages/index.css';
import {Api} from '../components/Api.js';
import {Card} from '../components/Card.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupActionSubmit} from '../components/PopupActionSubmit.js';
import {editProfileButton, apiConfig, addNewButton, uploadAvatarPopupSelector, avatarOverlay, photoPopupSelector, deleteActionSubmitSelector, editProfilePopupSelector, addNewPopupSelector, cardTemplateSelector, profileNameSelector, profileWorkSelector, profileAvatarSelector} from '../utils/constants.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
export const api = new Api(apiConfig);
export const userInfo = new UserInfo({nameSelector: profileNameSelector, workSelector: profileWorkSelector, avatarSelector: profileAvatarSelector});
export const photoPopup = new PopupWithImage(photoPopupSelector);
export const submitPopup = new PopupActionSubmit(deleteActionSubmitSelector, handleRemoveCardSubmit);
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
    userInfo.setUserInfo(res)
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
    userInfo.setUserInfo(res)
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

function handleAddNewFormSubmit(evt) {
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
      card.addLike(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDeleteLikeFromCard(card) {
  api.sendDeleteLikeRequest(card.id)
    .then((res) => {
      card.deleteLike(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleRemoveCardSubmit(card) {
  submitPopup.renderLoading(true, 'Удаление...');
  api.sendDeleteRequest(card.id)
  .then(() => {
    card.handleDeleteCard();
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
        card,
        {photoPopup, submitPopup, userInfo},
        {handlePutLikeOnCard, handleDeleteLikeFromCard},
        cardTemplateSelector
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
  userInfo.setUserInfo(results[0]);
  addNewCardSectionInstanse.setNewItems(results[1]);
  addNewCardSectionInstanse.renderItems();
})
.catch((err) => {
  console.log(err);
});

editProfilePopup.setEventListeners();
editProfileButton.addEventListener('click', () => {
    editProfilePopup.setInputValues(userInfo.getUserInfo());
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