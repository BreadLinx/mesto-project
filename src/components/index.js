import '../pages/index.css';
import {enableValidation} from './validate.js';
import {handleEditFormSubmit, handleAddNewFormSubmit, createCard, insertCardToHTML, handleUploadAvatarSubmit} from './card';
import {openPopup, closePopup} from './modal';
// import {uploadUserInformationRequest, getCardsArrayRequest} from './api';
import {Api} from './api';


const editProfileButton = document.querySelector('.profile__edit-button'); // кнопка изменения профиля
const editProfilePopup = document.querySelector('#edit-profile-popup'); // попап изменения профиля
const editProfilePopupSubmit = editProfilePopup.querySelector('.popup__submit');
const editProfileForm = document.querySelector('#edit-profile-form');  // форма изменения профиля
const editProfileInputName = document.querySelector('#input-name');  // поле ввода имени в форме попапа изменения профиля
const profileName = document.querySelector('.profile__name');  // имя в секции profile
const editProfileInputWork = document.querySelector('#input-work');  // поле вводе деятельности в форме попапа изменения профиля
const profileInfoAbout = document.querySelector('.profile__info-about'); // деятельность в секции profile
const addNewButton = document.querySelector('.profile__add-button'); // берем кнопку для открытия попапа добавления нового места в секции profile
const addNewPopup = document.querySelector('#add-new-popup'); // берем попап добавления нового места
const addNewPopupSubmit = addNewPopup.querySelector('.popup__submit');
const addNewForm = document.querySelector('#add-new-form');  // берем форму добавления места в попапе
const addNewInputPlace = document.querySelector('#input-new-place');
const addNewInputPlaceLink = document.querySelector('#input-new-place-link');
const cards = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup');
const photoPopup = document.querySelector('#photo-popup');
const photoPopupPhoto = photoPopup.querySelector('.popup__image');
const popupImage = photoPopup.querySelector('.popup__description');
const profileAvatar = document.querySelector('.profile__avatar');
const deleteActionSubmitPopup = document.querySelector('#delete-action-submit-popup');
const deleteActionSubmitPopupDeleteBtn = deleteActionSubmitPopup.querySelector('.popup__close-icon');
const deleteActionSubmitPopupSubmit = deleteActionSubmitPopup.querySelector('.popup__submit');
const avatarOverlay = document.querySelector('.profile__avatar-overlay');
const uploadAvatarPopup = document.querySelector('#upload-new-avatar-popup');
const uploadAvatarPopupSubmit = uploadAvatarPopup.querySelector('.popup__submit');
const uploadAvatarForm = document.querySelector('#upload-new-avatar-form');
const inputUploadAvatar = document.querySelector('#input-upload-avatar');
const cardTemplate = document.querySelector('#card-template');
let userId;

export {profileName, editProfileInputName, profileInfoAbout, editProfileInputWork, editProfilePopup, addNewInputPlace, addNewInputPlaceLink, addNewPopup, cards, photoPopup, photoPopupPhoto, popupImage, deleteActionSubmitPopup, profileAvatar, uploadAvatarPopup, deleteActionSubmitPopupDeleteBtn, editProfilePopupSubmit, addNewPopupSubmit, deleteActionSubmitPopupSubmit, uploadAvatarPopupSubmit, cardTemplate, userId};

Promise.all([uploadUserInformationRequest(), getCardsArrayRequest()])
.then((results) => {
  const responseStatus = results.some((result) => {
    return result.ok === true;
  });
  if(responseStatus) {
    return Promise.all(results.map((result => result.json())));
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
})
.then((results) => {
  profileName.textContent = results[0].name;
  profileInfoAbout.textContent = results[0].about;
  profileAvatar.src = results[0].avatar;
  userId = results[0]._id;
  results[1].forEach((card) => {
    if(card.likes.length === 0) {
      insertCardToHTML(createCard(card.name, card.link, card.likes.length, card.owner._id, card._id, false));
    } else {
      const myLike = card.likes.some((user) => {
        return user._id === userId;
      });
      insertCardToHTML(createCard(card.name, card.link, card.likes.length, card.owner._id, card._id, myLike));
    }
  });
})
.catch((err) => {
  console.log(err);
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-icon')) {
      closePopup(popup);
    }
  });
});

editProfileButton.addEventListener('click', () => {
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

// Валидация форм
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  submitButtonInactiveClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_error',
  errorSpanOpenedClass: 'popup__error-message_opened',
});