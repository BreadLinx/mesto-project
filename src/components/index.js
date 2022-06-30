import '../pages/index.css';
import {enableValidation} from './validate.js';
import {handleEditFormSubmit, handleAddNewFormSubmit, createCard, insertCardToHTML} from './card';
import {openPopup, closePopup, closePopupByESC} from './modal';
import {sendDeleteRequest} from './api';

const editProfileButton = document.querySelector('.profile__edit-button'); // кнопка изменения профиля
const editProfilePopup = document.querySelector('#edit-profile-popup'); // попап изменения профиля
const editProfileForm = document.querySelector('#edit-profile-form');  // форма изменения профиля
const editProfileInputName = document.querySelector('#input-name');  // поле ввода имени в форме попапа изменения профиля
const profileName = document.querySelector('.profile__name');  // имя в секции profile
const editProfileInputWork = document.querySelector('#input-work');  // поле вводе деятельности в форме попапа изменения профиля
const profileInfoAbout = document.querySelector('.profile__info-about'); // деятельность в секции profile
const addNewButton = document.querySelector('.profile__add-button'); // берем кнопку для открытия попапа добавления нового места в секции profile
const addNewPopup = document.querySelector('#add-new-popup'); // берем попап добавления нового места
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
const deleteSubmitForm = document.querySelector('#delete-submit-form');

export {profileName, editProfileInputName, profileInfoAbout, editProfileInputWork, editProfilePopup, addNewInputPlace, addNewInputPlaceLink, addNewPopup, cards, photoPopup, photoPopupPhoto, popupImage, deleteActionSubmitPopup};

fetch('https://nomoreparties.co/v1/plus-cohort-13/users/me', {
  method: 'GET',
  headers: {
    authorization: 'd0237f44-6bee-4b11-b7b4-b67bb1856179'
  }
})
.then((res) => {
  return res.json();
})
.then((res) => {
  profileName.textContent = res.name;
  profileInfoAbout.textContent = res.about;
  profileAvatar.src = res.avatar;
})
.catch((err) => {
  console.log('Ошибка при попытке загрузки профиля.');
});

fetch('https://nomoreparties.co/v1/plus-cohort-13/cards',{
  method: 'GET',
  headers: {
    authorization: 'd0237f44-6bee-4b11-b7b4-b67bb1856179'
  }
})
.then((res) => {
  return res.json();
})
.then((res) => {
  res.forEach((card) => {
    if(card.likes.length === 0) {
      insertCardToHTML(createCard(card.name, card.link, card.likes.length, card.owner._id, card._id, false));
    } else {
      const myLike = card.likes.some((user) => {
        return user._id === '3aa69ff877e5d2e63a6e38fc';
      });
      insertCardToHTML(createCard(card.name, card.link, card.likes.length, card.owner._id, card._id, myLike));
    }
  });
})
.catch((err) => {
  console.log('Ошибка при попытке загрузки карточек.');
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-icon')) {
      closePopup(popup)
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

// Валидация форм
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  submitButtonInactiveClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_error',
  errorSpanOpenedClass: 'popup__error-message_opened',
});