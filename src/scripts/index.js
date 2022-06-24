import '../pages/index.css';

import geyrangerFiord from '../images/kawachi-touen.jpg';
import petraCity from '../images/Geirangerfjord.jpg';

const initialCards = [
    {
      name: 'Гималаи',
      link: 'https://nicko.ru/wp-content/uploads/2016/12/%D0%93%D0%B8%D0%BC%D0%B0%D0%BB%D0%B0%D0%B8.jpg'
    },
    {
      name: 'Гейрангер-фьорд',
      link: geyrangerFiord
    },
    {
      name: 'город Петра',
      link: petraCity
    },
    {
      name: 'Гранд-Каньон',
      link: 'https://chydesa-mira.ru/wp-content/uploads/2016/12/grand22-min.jpg'
    },
    {
      name: 'Гаваи',
      link: 'https://quick-trips.com/wp-content/uploads/2017/11/christian-joudrey-89399-e1510148866824.jpg'
    },
    {
      name: 'Норвежские фьорды',
      link: 'https://i.pinimg.com/736x/81/e5/e0/81e5e0c68a0fde843d40058035d4a857.jpg'
    },
]; // массив с карточками в виде объектов


// открытие, редактирование и закрытие попапа редактироования профиля

const editProfileButton = document.querySelector('.profile__edit-button'); // кнопка изменения профиля
const editProfilePopup = document.querySelector('#edit-profile-popup'); // попап изменения профиля
const editProfileCloseButton = document.querySelector('#edit-profile-close-button'); // копнка закрывающая попап изменения профиля
const editProfileForm = document.querySelector('#edit-profile-form');  // форма изменения профиля
const editProfileInputName = document.querySelector('#input-name');  // поле ввода имени в форме попапа изменения профиля
const editProfileInputWork = document.querySelector('#input-work');  // поле вводе деятельности в форме попапа изменения профиля
const editProfileFormSubmit = document.querySelector('#edit-profile-form-submit'); // submit формы в попапе изменения профиля
const profileName = document.querySelector('.profile__name');  // имя в секции profile
const profileInfoAbout = document.querySelector('.profile__info-about'); // деятельность в секции profile

editProfileButton.addEventListener('click', () => {
    popupOpen(editProfilePopup);
}); // евентлистенер на открытие попапа редактирования профиля
editProfileCloseButton.addEventListener('click', () => {
    popupClose(editProfilePopup);
}); // евентлистенер на закрытие попапа редактирования профиля
editProfileForm.addEventListener('submit', editFormSubmitHandler);  // евентлистенер на собыие submit формы

editProfilePopup.addEventListener('click', (evt) => {
  if(evt.target === editProfilePopup) {
    popupClose(editProfilePopup);
  }
});

function popupOpen(popup) {
  if(popup === editProfilePopup) {
    editProfileInputName.value = profileName.textContent;
    editProfileInputWork.value = profileInfoAbout.textContent;
  }

  popup.classList.add('popup_opened');
} // функция открытия попапа изменения профиля

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = editProfileInputName.value;
    profileInfoAbout.textContent = editProfileInputWork.value;
    popupClose(editProfilePopup);
}  // функция-обработчик события нажатия на кнопку submit 

function popupClose(popup) {
    popup.classList.remove('popup_opened');
}  // функция закрытия попапа изменения профиля

// открытие и закрытие попапа добавления нового места

const addNewButton = document.querySelector('.profile__add-button'); // берем кнопку для открытия попапа добавления нового места в секции profile
const addNewPopup = document.querySelector('#add-new-popup'); // берем попап добавления нового места
const addNewCloseButton = document.querySelector('#add-new-close-button'); // берем кнопку закрытия попапа добавления нового места
const addNewForm = document.querySelector('#add-new-form');  // берем форму добавления места в попапе
const addNewInputPlace = document.querySelector('#input-new-place'); // берем первый инпут формы 
const addNewInputPlaceLink = document.querySelector('#input-new-place-link'); // второй инпут формы
const addNewFormSubmit = document.querySelector('#add-new-form-submit');  // субмит формы

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

function addNewFormSubmitHandler(evt) {
    evt.preventDefault();
    if(addNewInputPlace.value !== '' && addNewInputPlaceLink.value !== '') {
    initialCards.push({name: addNewInputPlace.value, link: addNewInputPlaceLink.value},);
    insertCardToHTML(createCard(addNewInputPlace.value, addNewInputPlaceLink.value, initialCards.length - 1));
    addNewInputPlace.value = '';
    addNewInputPlaceLink.value = ''
    popupClose(addNewPopup);
    } else {
        alert('Ошибка. Вы что-то забыли ввести.');
    }
} 
// функция добавления нового места. 
// 1. добавляет в массив карточек новую карточку.
// 2. добавляет новую карточку на страницу с помощью функции generateCard.
// 3. Сбрасывает поля формы и закрывает попап.

// добавление карточек джаваскриптом при загрузке страницы и добавление карточек пользователем

initialCards.forEach((item, index) => {
    insertCardToHTML(createCard(item.name, item.link, index));
});  // цикл перебирающий карточки и отрисовывающий карточки из массива InitialCards при закгрузке страницы

// функция принимает на вход описание карточки, ссылку на картинку и ее индекс в массиве и генерирует карточку
function createCard(name, link, index) {
    let card = document.querySelector('#card-template').content.cloneNode(true);
    let cardPhoto = card.querySelector('.card__photo');
    cardPhoto.src = link;
    cardPhoto.alt = name;
    cardPhoto.addEventListener('click', () => {
      let photoPopup = document.querySelector('#photo-popup');
      photoPopup.classList.add('popup_opened');
      photoPopup.querySelector('.popup__image').src = link;
      photoPopup.querySelector('.popup__description').textContent = name;
    });
    card.querySelector('.card__description').textContent = name;
    let like = card.querySelector('.card__like');
    like.addEventListener('click', () => {
        like.classList.toggle('card__like_active');
    });
    let cardDeleteButton = card.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', () => {
      cardDeleteButton.closest('.card').remove();
      initialCards.splice(index, 1);
    });
    return card;
}

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

document.addEventListener('keydown', (evt) => {
  if(evt.key === "Escape") {
    popupClose(editProfilePopup);
    popupClose(addNewPopup);
    popupClose(photoPopupOverlay);
  }
});

function insertCardToHTML(card) {
    const cards = document.querySelector('.elements').prepend(card);
}

// Валидация форм
function enableValidation(obj) {
  const editFormFirstInput = Array.from(document.forms.editForm.elements)[0];
  const editFormSecondInput = Array.from(document.forms.editForm.elements)[1];
  const addNewFormFirstInput = Array.from(document.forms.addNewform.elements)[0];
  const addNewFormSecondInput = Array.from(document.forms.addNewform.elements)[1];

  isValid(editFormFirstInput);
  isValid(editFormSecondInput);
  isValid(addNewFormFirstInput);
  isValid(addNewFormSecondInput);

  editFormFirstInput.addEventListener('input', () => {
    isValid(editFormFirstInput);
  });
  
  editFormSecondInput.addEventListener('input', () => {
    isValid(editFormSecondInput);
  });
  
  addNewFormFirstInput.addEventListener('input', () => {
    isValid(addNewFormFirstInput);
  });
  
  addNewFormSecondInput.addEventListener('input', () => {
    isValid(addNewFormSecondInput);
  });

  function showInputError(element, errorText = 'В поле ввода допущена ошибка') {
    let elementId = element.id;
    let elementSpan = document.querySelector(`#${elementId}-span`);
    let submitButton = element.closest('.popup__form').querySelector('.popup__submit');
    element.classList.add('popup__input_error');
    elementSpan.classList.add('popup__error-message_opened');
    elementSpan.textContent = errorText;
    submitButton.setAttribute('disabled', 0);
    submitButton.classList.add('popup__submit_disabled');
  }
  
  function hideInputError(element) {
    let elementId = element.id;
    let elementSpan = document.querySelector(`#${elementId}-span`);
    let submitButton = element.closest('.popup__form').querySelector('.popup__submit');
    element.classList.remove('popup__input_error');
    elementSpan.classList.remove('popup__error-message_opened');
    elementSpan.textContent = '';
    if(element.closest('.popup__form').id === 'edit-profile-form') {
      if(element.closest('.popup__form').querySelector('#input-name').validity.valid && element.closest('.popup__form').querySelector('#input-work').validity.valid) {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove('popup__submit_disabled');
      }
    } else if(element.closest('.popup__form').id === 'add-new-form'){
      if(element.closest('.popup__form').querySelector('#input-new-place').validity.valid && element.closest('.popup__form').querySelector('#input-new-place-link').validity.valid) {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove('popup__submit_disabled');
      }
    }
  }
  
  function isValid(input) {
    if(!input.validity.valid) {
      showInputError(input, input.validationMessage);
    } else {
      hideInputError(input);
    }
  }
}

enableValidation({
  formSelector: '.popup__form',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});