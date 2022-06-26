import geyrangerFiord from '../images/kawachi-touen.jpg';
import petraCity from '../images/Geirangerfjord.jpg';
import {openPopup, closePopup, closePopupByESC} from './modal';
import {enableValidation} from './validate';
import {profileName, editProfileInputName, profileInfoAbout, editProfileInputWork, editProfilePopup, addNewInputPlace, addNewInputPlaceLink, addNewPopup, cards} from './index';

export const initialCards = [
    {
      name: 'Гималаи',
      link: 'https://n1s2.hsmedia.ru/27/72/71/277271fa9416ddcf1e241745ff26ca78/728x485_1_353f8938b57b1e2d4d00704b67489fa2@2121x1414_0xac120003_8761593421620220037.jpg'
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
];

export function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editProfileInputName.value;
    profileInfoAbout.textContent = editProfileInputWork.value;
    closePopup(editProfilePopup);
}

export function handleAddNewFormSubmit(evt) {
    evt.preventDefault();
    if(addNewInputPlace.value !== '' && addNewInputPlaceLink.value !== '') {
    insertCardToHTML(createCard(addNewInputPlace.value, addNewInputPlaceLink.value));
    closePopup(addNewPopup);
    evt.target.reset();
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
  }
}

export function createCard(name, link) {
    const card = document.querySelector('#card-template').content.cloneNode(true);
    let cardPhoto = card.querySelector('.card__photo');
    cardPhoto.src = link;
    cardPhoto.alt = `Изображние показывающее ${name}`;
    cardPhoto.addEventListener('click', () => {
      const photoPopup = document.querySelector('#photo-popup');
      openPopup(photoPopup);
      const photoPopupPhoto = photoPopup.querySelector('.popup__image');
      photoPopupPhoto.src = link;
      photoPopupPhoto.alt = `Изображние показывающее ${name}`;
      const popupImage = photoPopup.querySelector('.popup__description');
      popupImage.textContent = name;
    });
    card.querySelector('.card__description').textContent = name;
    let like = card.querySelector('.card__like');
    like.addEventListener('click', () => {
        like.classList.toggle('card__like_active');
    });
    let cardDeleteButton = card.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', () => {
      cardDeleteButton.closest('.card').remove();
    });
    return card;
}

export function insertCardToHTML(card) {
  cards.prepend(card);
}