import '../pages/index.css';
// import {enableValidation} from './validate.js';
// import {handleEditFormSubmit, handleAddNewFormSubmit, createCard, insertCardToHTML, handleUploadAvatarSubmit} from './card';
// import {openPopup, closePopup} from './modal';
import {Api} from '../components/api.js';
import {Card} from '../components/card.js';
import {UserInfo} from '../components/userInfo.js';
import {Popup, PopupWithImage, PopupWithForm} from '../components/modal.js';
import {editProfileButton, editProfileInputName, profileName, editProfileInputWork, profileInfoAbout, editProfilePopupSelector, apiConfig, editProfilePopupSubmit, addNewPopupSelector, addNewPopupSubmit, addNewButton} from '../utils/constants.js';
// import {editProfileButton, editProfilePopupSelector, editProfileForm, editProfileInputName, profileName, editProfileInputWork, profileInfoAbout, addNewButton, addNewPopup, addNewPopupSubmit, addNewForm, addNewInputPlace, addNewInputPlaceLink, cards, popups, photoPopup, photoPopupPhoto, popupImage, profileAvatar, deleteActionSubmitPopup, deleteActionSubmitPopupDeleteBtn, deleteActionSubmitPopupSubmit, avatarOverlay, uploadAvatarPopup, uploadAvatarPopupSubmit, uploadAvatarForm, inputUploadAvatar, cardTemplate, apiConfig, userId} from '../utils/constants.js';
export const api = new Api(apiConfig);
const userInfo = new UserInfo({nameSelector: '.profile__name', workSelector: '.profile__info-about'});
export const photoPopup = new PopupWithImage(); 
export const submitPopup = new PopupWithForm('#delete-action-submit-popup', );

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  editProfilePopupSubmit.textContent = 'Сохранение...';
  userInfo.setUserInfo(editProfileInputName.value, editProfileInputWork.value);
}

// function handleAddNewFormSubmit(evt) {
//   evt.preventDefault();
//   addNewPopup.getInputValues();
//   // if(addNewInputPlace.value !== '' && addNewInputPlaceLink.value !== '') {
//   // addNewPopupSubmit.textContent = 'Сохранение...';
//   // api.addNewCardRequest(addNewInputPlace.value, addNewInputPlaceLink.value) // переписать после добавления в класс Popup метода getInputValues
//   // .then((res) => {
//   //   cards.prepend(createCard(res.name, res.link, res.likes.length, res.owner._id, res._id, false));
//   // })
//   // .then(() => {
//   //   addNewPopupSubmit.textContent = 'Сохранено';
//   //   addNewPopup.close();
//   // })
//   // .catch((err) => {
//   //   console.log(err);
//   // })
//   // .finally(() => {
//   //   addNewPopupSubmit.textContent = 'Создать';
//   // });
//   // }
// }

// Promise.all([api.uploadUserInformationRequest(), api.getCardsArrayRequest()]) // ДОПИСАТЬ КОГДА БУДЕТ КЛАСС SECTION
// .then((results) => {
//   profileName.textContent = results[0].name;
//   profileInfoAbout.textContent = results[0].about;
//   profileAvatar.src = results[0].avatar;
//   userId = results[0]._id;
//   results[1].forEach((card) => {
//     if(card.likes.length === 0) {
//       // insertCardToHTML(createCard(card.name, card.link, card.likes.length, card.owner._id, card._id, false)); // переделать с учетом класса Card
//     } else {
//       const myLike = card.likes.some((user) => {
//         return user._id === userId;
//       });
//       // console.log(myLike);
//       // insertCardToHTML(createCard(card.name, card.link, card.likes.length, card.owner._id, card._id, myLike));
//       // console.log(new Card(card.name, card.link, card.likes.length, card.owner._id, card._id, myLike));
//     }
//   });
// })
// .catch((err) => {
//   console.log(err);
// });

// popups.forEach((popup) => { // ДОПИСАТЬ ЛОГИКУ ЗАКРЫТИЯ ПОПАПА НА КРЕСТИК И ОВЕРЛЕЙ В КЛАССЕ
//   popup.addEventListener('mousedown', (evt) => {
//     if (evt.target.classList.contains('popup_opened')) {
//       closePopup(popup);
//     }
//     if (evt.target.classList.contains('popup__close-icon')) {
//       closePopup(popup);
//     }
//   });
// }); // ПРЕДВАРИТЕЛЬНО ГОТОВО


export const editProfilePopup = new PopupWithForm(editProfilePopupSelector, handleEditFormSubmit);
editProfilePopup.setEventListeners();
editProfileButton.addEventListener('click', () => {
    console.log(userInfo.getUserInfo());
    // console.log(userInfo.getUserInfo());
    // editProfileInputName.value = profileName.textContent;
    // editProfileInputWork.value = profileInfoAbout.textContent;
    // editProfilePopup.open();
}); // евентлистенер на открытие попапа редактирования профиля

// // форма редактирования профиля


const addNewPopup = new PopupWithForm(addNewPopupSelector, handleAddNewFormSubmit);
addNewButton.addEventListener('click', () => {
  addNewPopup.open();
}); // евентлистенер для открытия попапа

// addNewForm.addEventListener('submit', handleAddNewFormSubmit);  // евентлистенер для добавления нового места

// avatarOverlay.addEventListener('click', () => {
//   openPopup(uploadAvatarPopup);
// });

// uploadAvatarForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   handleUploadAvatarSubmit(inputUploadAvatar.value);
//   uploadAvatarForm.reset();
// });

// // // Валидация форм






// // enableValidation({
// //   formSelector: '.popup__form',
// //   inputSelector: '.popup__input',
// //   submitButtonSelector: '.popup__submit',
// //   submitButtonInactiveClass: 'popup__submit_disabled',
// //   inputErrorClass: 'popup__input_error',
// //   errorSpanOpenedClass: 'popup__error-message_opened',
// // });

 // ОБНОВЛЕНИЕ АВАТАРА ПЕРЕДЕЛАТЬ
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