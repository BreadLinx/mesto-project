import '../pages/index.css';
import {enableValidation} from './validate.js';
import {initialCards, editFormSubmitHandler, addNewFormSubmitHandler, createCard, insertCardToHTML} from './card';
import {popupOpen, popupClose} from './modal';

// форма редактирования профиля

const editProfileButton = document.querySelector('.profile__edit-button'); // кнопка изменения профиля
const editProfilePopup = document.querySelector('#edit-profile-popup'); // попап изменения профиля
const editProfileCloseButton = document.querySelector('#edit-profile-close-button'); // копнка закрывающая попап изменения профиля
const editProfileForm = document.querySelector('#edit-profile-form');  // форма изменения профиля

editProfileButton.addEventListener('click', () => {
    popupOpen(editProfilePopup);
}); // евентлистенер на открытие попапа редактирования профиля
editProfileCloseButton.addEventListener('click', () => {
    popupClose(editProfilePopup);
}); // евентлистенер на закрытие попапа редактирования профиля
editProfileForm.addEventListener('submit', editFormSubmitHandler);

editProfilePopup.addEventListener('click', (evt) => {
  if(evt.target === editProfilePopup) {
    popupClose(editProfilePopup);
  }
});

// форма редактирования профиля

const addNewButton = document.querySelector('.profile__add-button'); // берем кнопку для открытия попапа добавления нового места в секции profile
const addNewPopup = document.querySelector('#add-new-popup'); // берем попап добавления нового места
const addNewCloseButton = document.querySelector('#add-new-close-button'); // берем кнопку закрытия попапа добавления нового места
const addNewForm = document.querySelector('#add-new-form');  // берем форму добавления места в попапе

addNewButton.addEventListener('click', () => {
    popupOpen(addNewPopup);
}); // евентлистенер для открытия попапа
addNewCloseButton.addEventListener('click', () => {
  popupClose(addNewPopup);
}); // евентлистенер для закрытия попапа
addNewForm.addEventListener('submit', addNewFormSubmitHandler);  // евентлистенер для обработки формы и добавления нового места
addNewPopup.addEventListener('click', (evt) => {
  if(evt.target === addNewPopup) {
    popupClose(addNewPopup);
  }
});

// добавление карточек джаваскриптом при загрузке страницы и добавление карточек пользователем
initialCards.forEach((item, index) => {
    insertCardToHTML(createCard(item.name, item.link, index));
});  // цикл перебирающий карточки и отрисовывающий карточки из массива InitialCards при закгрузке страницы

let photoPopup = document.querySelector('#photo-popup');
let photoPopupDeleteBtn = photoPopup.querySelector('.popup__close-icon');
photoPopupDeleteBtn.addEventListener('click', () => {
photoPopupDeleteBtn.closest('#photo-popup').classList.remove('popup_opened');
});

// закрытие фото-попап на оверлей
const photoPopupOverlay = document.querySelector('#photo-popup');
photoPopupOverlay.addEventListener('click', (evt) => {
  if(evt.target === photoPopupOverlay) {
    popupClose(photoPopupOverlay);
  }
});
// закрытие попапа на esc
document.addEventListener('keydown', (evt) => {
  if(evt.key === "Escape") {
    popupClose(editProfilePopup);
    popupClose(addNewPopup);
    popupClose(photoPopupOverlay);
  }
});

// Валидация форм
enableValidation({
  formSelector: '.popup__form',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
  errorSpanOpenedClass: 'popup__error-message_opened',
  submitButtonDisabledClass: 'popup__submit_disabled',
  editFormNameInputId: '#input-name',
  editFormWorkInputId: '#input-work',
  addNewFormNewPlaceNameId: '#input-new-place',
  addNewFormNewPlaceLinkId: '#input-new-place-link',
});