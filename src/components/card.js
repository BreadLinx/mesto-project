import geyrangerFiord from '../images/kawachi-touen.jpg';
import petraCity from '../images/Geirangerfjord.jpg';
import {popupClose} from './modal';

export const initialCards = [
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
];

const profileName = document.querySelector('.profile__name');  // имя в секции profile
const editProfileInputName = document.querySelector('#input-name');  // поле ввода имени в форме попапа изменения профиля
const profileInfoAbout = document.querySelector('.profile__info-about'); // деятельность в секции profile
const editProfileInputWork = document.querySelector('#input-work');  // поле вводе деятельности в форме попапа изменения профиля
const editProfilePopup = document.querySelector('#edit-profile-popup'); // попап изменения профиля
const addNewInputPlace = document.querySelector('#input-new-place'); // берем первый инпут формы 
const addNewInputPlaceLink = document.querySelector('#input-new-place-link'); // второй инпут формы
const addNewPopup = document.querySelector('#add-new-popup'); // берем попап добавления нового места


export function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = editProfileInputName.value;
    profileInfoAbout.textContent = editProfileInputWork.value;
    popupClose(editProfilePopup);
}

export function addNewFormSubmitHandler(evt) {
    evt.preventDefault();
    if(addNewInputPlace.value !== '' && addNewInputPlaceLink.value !== '') {
    initialCards.push({name: addNewInputPlace.value, link: addNewInputPlaceLink.value},);
    insertCardToHTML(createCard(addNewInputPlace.value, addNewInputPlaceLink.value, initialCards.length - 1));
    addNewInputPlace.value = '';
    addNewInputPlaceLink.value = ''
    popupClose(addNewPopup);
    }
}

export function createCard(name, link, index) {
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

export function insertCardToHTML(card) {
    const cards = document.querySelector('.elements').prepend(card);
}