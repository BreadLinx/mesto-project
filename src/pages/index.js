import '../pages/index.css';
import {Api} from '../components/api.js';
import {Card} from '../components/card.js';
import {UserInfo} from '../components/userInfo.js';
import {PopupWithImage, PopupWithForm} from '../components/modal.js';
import {editProfileButton, editProfileInputName, profileName, editProfileInputWork, profileInfoAbout, editProfilePopupSelector, apiConfig, editProfilePopupSubmit, addNewPopupSelector, addNewPopupSubmit, addNewButton, uploadAvatarPopupSelector, avatarOverlay, uploadAvatarPopupSubmit, profileAvatar} from '../utils/constants.js';
import {FormValidator} from '../components/validate.js';
import {Section} from '../components/section.js';
export const api = new Api(apiConfig);
export const userInfo = new UserInfo(profileName, profileInfoAbout, profileAvatar);
export const photoPopup = new PopupWithImage('#photo-popup');
export const submitPopup = new PopupWithForm('#delete-action-submit-popup');
export const editProfilePopup = new PopupWithForm(editProfilePopupSelector, handleEditFormSubmit);
export const addNewPopup = new PopupWithForm(addNewPopupSelector, handleAddNewFormSubmit);
export const uploadAvatarPopup = new PopupWithForm(uploadAvatarPopupSelector, handleUploadAvatarSubmit);
photoPopup.setEventListeners();
submitPopup.setEventListeners();

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  editProfilePopupSubmit.textContent = 'Сохранение...';
  const inputValues = editProfilePopup.getInputValues();
  userInfo.setUserInfo(inputValues[0], inputValues[1]);
}

function handleUploadAvatarSubmit(evt) {
  evt.preventDefault();
  uploadAvatarPopupSubmit.textContent = 'Сохранение...';
  const inputValues = uploadAvatarPopup.getInputValues();
  userInfo.setUserAvatar(inputValues[0]);
}

function handleAddNewFormSubmit(evt) {  // Доделать функцию добавления новой карточки
  evt.preventDefault();
  const inputValues = addNewPopup.getInputValues();
  addNewPopupSubmit.textContent = 'Сохранение...';
  api.addNewCardRequest(inputValues[0], inputValues[1])
  .then((res) => {
    addNewCardSectionInstanse.addItem(res);
  })
  .then(() => {
    addNewPopupSubmit.textContent = 'Сохранено';
    addNewPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    addNewPopupSubmit.textContent = 'Создать';
  });
}

const addNewCardSectionInstanse = new Section({
  items: null,
  renderer: function(card, container) {
      const cardInstanse = new Card(card.name, card.link, card.likes.length, card.owner._id, card._id, false, '#card-template');
      container.prepend(cardInstanse.createCard());
  }
}, '.elements');

Promise.all([api.uploadUserInformationRequest(), api.getCardsArrayRequest()])
.then((results) => {
  userInfo._name = results[0].name;
  userInfo._work = results[0].about;
  userInfo._avatar = results[0].avatar;
  userInfo._id = results[0]._id;
  userInfo.updateUserInfo();
  userInfo.updateUserAvatar();
  const sectionInstanse = new Section({
    items: results[1],
    renderer: function(card, container) {
      if(card.likes.length === 0) {
        const cardInstanse = new Card(card.name, card.link, card.likes.length, card.owner._id, card._id, false, '#card-template');
        container.append(cardInstanse.createCard());
      } else {
        const myLike = card.likes.some(user => {return user._id === userInfo.getUserInfo().id});
        const cardInstanse = new Card(card.name, card.link, card.likes.length, card.owner._id, card._id, myLike, '#card-template');
        container.append(cardInstanse.createCard());
      }
    }
  }, '.elements');
  sectionInstanse.renderItems();
})
.catch((err) => {
  console.log(err);
});

editProfilePopup.setEventListeners(); // Вешаем обработчики закрытия(Крестик, оверлей) на попап редактирования профиля
editProfileButton.addEventListener('click', () => {
    editProfileInputName.value = userInfo.getUserInfo().name;
    editProfileInputWork.value = userInfo.getUserInfo().work;
    editProfilePopup.open();
}); // евентлистенер для открытия попапа редактирования профиля

addNewPopup.setEventListeners();
addNewButton.addEventListener('click', () => {
  addNewPopup.open();
}); // евентлистенер для открытия попапа добавления карточки

uploadAvatarPopup.setEventListeners();
avatarOverlay.addEventListener('click', () => {
  uploadAvatarPopup.open();
}); // евентлистенер для открытия попапа обновление аватара

// Валидация форм
const forms = Array.from(document.forms);
forms.forEach((form) => {
  const formInstanse = new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    submitButtonInactiveClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_error',
    errorSpanOpenedClass: 'popup__error-message_opened',
  }, form);
  formInstanse.enableValidation();
});