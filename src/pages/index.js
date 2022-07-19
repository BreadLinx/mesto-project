import '../pages/index.css';
// import {enableValidation} from './validate.js';
// import {handleEditFormSubmit, handleAddNewFormSubmit, createCard, insertCardToHTML, handleUploadAvatarSubmit} from './card';
// import {openPopup, closePopup} from './modal';
import {Api} from '../components/api.js';
import {Card} from '../components/card';
import {editProfileButton, editProfilePopup, editProfilePopupSubmit, editProfileForm, editProfileInputName, profileName, editProfileInputWork, profileInfoAbout, addNewButton, addNewPopup, addNewPopupSubmit, addNewForm, addNewInputPlace, addNewInputPlaceLink, cards, popups, photoPopup, photoPopupPhoto, popupImage, profileAvatar, deleteActionSubmitPopup, deleteActionSubmitPopupDeleteBtn, deleteActionSubmitPopupSubmit, avatarOverlay, uploadAvatarPopup, uploadAvatarPopupSubmit, uploadAvatarForm, inputUploadAvatar, cardTemplate, apiConfig, userId} from '../utils/constants.js';
const api = new Api(apiConfig);



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

editProfileButton.addEventListener('click', () => { // ЗАВТРА РАБОТАЕМ НАД ЭТИМ!!!
    editProfileInputName.value = profileName.textContent;
    editProfileInputWork.value = profileInfoAbout.textContent;
    openPopup(editProfilePopup);
}); // евентлистенер на открытие попапа редактирования профиля

editProfileForm.addEventListener('submit', handleEditFormSubmit);

// форма редактирования профиля

addNewButton.addEventListener('click', () => {
  openPopup(addNewPopup);
}); // евентлистенер для открытия попапа

addNewForm.addEventListener('submit', handleAddNewFormSubmit);  // евентлистенер для добавления нового места

avatarOverlay.addEventListener('click', () => {
  openPopup(uploadAvatarPopup);
});

uploadAvatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleUploadAvatarSubmit(inputUploadAvatar.value);
  uploadAvatarForm.reset();
});

// // Валидация форм
// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__submit',
//   submitButtonInactiveClass: 'popup__submit_disabled',
//   inputErrorClass: 'popup__input_error',
//   errorSpanOpenedClass: 'popup__error-message_opened',
// });