import '../pages/index.css';
import {Api} from '../components/api.js';
import {Card} from '../components/card.js';
import {UserInfo} from '../components/userInfo.js';
import {Popup, PopupWithImage, PopupWithForm} from '../components/modal.js';
import {editProfileButton, editProfileInputName, profileName, editProfileInputWork, profileInfoAbout, editProfilePopupSelector, apiConfig, editProfilePopupSubmit, addNewPopupSelector, addNewPopupSubmit, addNewButton, userObject, uploadAvatarPopupSelector, avatarOverlay} from '../utils/constants.js';
import {FormValidator} from '../components/validate.js';
import {Section} from '../components/section.js';
export const api = new Api(apiConfig);
const userInfo = new UserInfo({nameSelector: '.profile__name', workSelector: '.profile__info-about'});
export const photoPopup = new PopupWithImage();
export const submitPopup = new PopupWithForm('#delete-action-submit-popup', );
export const editProfilePopup = new PopupWithForm(editProfilePopupSelector, handleEditFormSubmit);
export const addNewPopup = new PopupWithForm(addNewPopupSelector, handleAddNewFormSubmit);
export const uploadAvatarPopup = new PopupWithForm(uploadAvatarPopupSelector, handleUploadAvatarSubmit)

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  editProfilePopupSubmit.textContent = 'Сохранение...';
  const inputValues = editProfilePopup.getInputValues();
  userInfo.setUserInfo(inputValues[0], inputValues[1]);
}

// function handleAddNewFormSubmit(evt) {  // Доделать функцию добавления новой карточки
//   evt.preventDefault();
//   const inputValues = addNewPopup.getInputValues();
//   if(inputValues.length === 2) {
//   addNewPopupSubmit.textContent = 'Сохранение...';
//   api.addNewCardRequest(inputValues[0], inputValues[1])
//   .then((res) => {
//     const rederer = new Section({
//       null,
//       rederer: function(element, container) {
//           const card = new Card();
//       }
//   }, '.elements');
//     cards.prepend(createCard(res.name, res.link, res.likes.length, res.owner._id, res._id, false));
//   })
//   .then(() => {
//     addNewPopupSubmit.textContent = 'Сохранено';
//     addNewPopup.close();
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     addNewPopupSubmit.textContent = 'Создать';
//   });
//   }
// }

// export function handleUploadAvatarSubmit(avatarLink) {
//   uploadAvatarPopupSubmit.textContent = 'Сохранение...';
//   updateAvatar(avatarLink)
//   .then(checkResponse)
//   .then((res) => {
//     profileAvatar.src = res.avatar;
//     uploadAvatarPopupSubmit.textContent = 'Сохранено';
//     closePopup(uploadAvatarPopup);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     uploadAvatarPopupSubmit.textContent = 'Сохранить';
//   });
// }

Promise.all([userInfo.getUserInfo(), api.getCardsArrayRequest()])
.then((results) => {
  profileName.textContent = results[0].name;
  profileInfoAbout.textContent = results[0].work;
  profileAvatar.src = results[0].avatar;
  userObject.id = results[0].id;
  userObject.name = results[0].name;
  userObject.work = results[0].work;
  userObject.avatar = results[0].avatar;
  const sectionInstanse = new Section({
    items: results[1],
    renderer: function(card, container) {
      if(card.likes.length === 0) {
        const cardInstanse = new Card(card.name, card.link, card.likes.length, card.owner._id, card._id, false, '#card-template');
        container.append(cardInstanse.createCard());
      } else {
        const myLike = card.likes.some(user => {user._id === userObject.id});
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