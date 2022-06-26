import '../pages/index.css';
import {enableValidation} from './validate.js';
import {initialCards, handleEditFormSubmit, handleAddNewFormSubmit, createCard, insertCardToHTML} from './card';
import {openPopup, closePopup, closePopupByESC} from './modal';

const editProfileButton = document.querySelector('.profile__edit-button'); // кнопка изменения профиля
const editProfilePopup = document.querySelector('#edit-profile-popup'); // попап изменения профиля
const editProfileCloseButton = document.querySelector('#edit-profile-close-button'); // копнка закрывающая попап изменения профиля
const editProfileForm = document.querySelector('#edit-profile-form');  // форма изменения профиля
const editProfileInputName = document.querySelector('#input-name');  // поле ввода имени в форме попапа изменения профиля
const profileName = document.querySelector('.profile__name');  // имя в секции profile
const editProfileInputWork = document.querySelector('#input-work');  // поле вводе деятельности в форме попапа изменения профиля
const profileInfoAbout = document.querySelector('.profile__info-about'); // деятельность в секции profile
const addNewButton = document.querySelector('.profile__add-button'); // берем кнопку для открытия попапа добавления нового места в секции profile
const addNewPopup = document.querySelector('#add-new-popup'); // берем попап добавления нового места
const addNewCloseButton = document.querySelector('#add-new-close-button'); // берем кнопку закрытия попапа добавления нового места
const addNewForm = document.querySelector('#add-new-form');  // берем форму добавления места в попапе
const photoPopup = document.querySelector('#photo-popup'); // берем фото попап
const photoPopupCloseBtn = photoPopup.querySelector('.popup__close-icon'); // кнопка удаления в фото попапе
const addNewInputPlace = document.querySelector('#input-new-place');
const addNewInputPlaceLink = document.querySelector('#input-new-place-link');
const cards = document.querySelector('.elements');

export {profileName, editProfileInputName, profileInfoAbout, editProfileInputWork, editProfilePopup, addNewInputPlace, addNewInputPlaceLink, addNewPopup, cards};

editProfileInputName.value = profileName.textContent;
editProfileInputWork.value = profileInfoAbout.textContent;

editProfileButton.addEventListener('click', () => {
    openPopup(editProfilePopup);
}); // евентлистенер на открытие попапа редактирования профиля
editProfileCloseButton.addEventListener('click', () => {
    closePopup(editProfilePopup);
}); // евентлистенер на закрытие попапа редактирования профиля
editProfileForm.addEventListener('submit', handleEditFormSubmit);

editProfilePopup.addEventListener('click', (evt) => {
  if(evt.target === editProfilePopup) {
    closePopup(editProfilePopup);
  }
});

// форма редактирования профиля

addNewButton.addEventListener('click', () => {
  openPopup(addNewPopup);
}); // евентлистенер для открытия попапа
addNewCloseButton.addEventListener('click', () => {
  closePopup(addNewPopup);
}); // евентлистенер для закрытия попапа
addNewForm.addEventListener('submit', handleAddNewFormSubmit);  // евентлистенер для обработки формы и добавления нового места
addNewPopup.addEventListener('click', (evt) => {
  if(evt.target === addNewPopup) {
    closePopup(addNewPopup);
  }
});

// добавление карточек джаваскриптом при загрузке страницы и добавление карточек пользователем
initialCards.forEach((item, index) => {
    insertCardToHTML(createCard(item.name, item.link, index));
});  // цикл перебирающий карточки и отрисовывающий карточки из массива InitialCards при закгрузке страницы


photoPopupCloseBtn.addEventListener('click', () => {
  closePopup(photoPopup);
});

// закрытие фото-попап на оверлей
photoPopup.addEventListener('click', (evt) => {
  if(evt.target === photoPopup) {
    closePopup(photoPopup);
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