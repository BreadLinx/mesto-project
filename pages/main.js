const initialCards = [
    {
      name: 'Гималаи',
      link: 'https://nicko.ru/wp-content/uploads/2016/12/%D0%93%D0%B8%D0%BC%D0%B0%D0%BB%D0%B0%D0%B8.jpg'
    },
    {
      name: 'Гейрангер-фьорд',
      link: './images/kawachi-touen.jpg'
    },
    {
      name: 'город Петра',
      link: './images/Geirangerfjord.jpg'
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
const ProfileName = document.querySelector('.profile__name');  // имя в секции profile
const ProfileInfoAbout = document.querySelector('.profile__info-about'); // деятельность в секции profile

editProfileInputName.value = ProfileName.textContent; // при загрузке страницы поле в форме изменения профиля заполняется текстом из html
editProfileInputWork.value = ProfileInfoAbout.textContent;

editProfileButton.addEventListener('click', editPopupOpen); // евентлистенер на открытие попапа редактирования профиля
editProfileCloseButton.addEventListener('click', editPopupClose); // евентлистенер на закрытие попапа редактирования профиля
editProfileForm.addEventListener('submit', editFormSubmitHandler);  // евентлистенер на собыие submit формы


function editPopupOpen() {
    editProfilePopup.classList.add('popup_opened');
} // функция открытия попапа изменения профиля

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    ProfileName.textContent = editProfileInputName.value;
    ProfileInfoAbout.textContent = editProfileInputWork.value;
    editProfilePopup.classList.remove('popup_opened');
}  // функция-обработчик события нажатия на кнопку submit 

function editPopupClose() {
    editProfilePopup.classList.remove('popup_opened');
    editProfileInputName.value = ProfileName.textContent;
    editProfileInputWork.value = ProfileInfoAbout.textContent;
}  // функция закрытия попапа изменения профиля

// открытие и закрытие попапа добавления нового места

const addNewButton = document.querySelector('.profile__add-button'); // берем кнопку для открытия попапа добавления нового места в секции profile
const addNewPopup = document.querySelector('#add-new-popup'); // берем попап добавления нового места
const addNewCloseButton = document.querySelector('#add-new-close-button'); // берем кнопку закрытия попапа добавления нового места
const addNewForm = document.querySelector('#add-new-form');  // берем форму добавления места в попапе
const addNewInputPlace = document.querySelector('#input-new-place'); // берем первый инпут формы 
const addNewInputPlaceLink = document.querySelector('#input-new-place-link'); // второй инпут формы
const addNewFormSubmit = document.querySelector('#add-new-form-submit');  // субмит формы

addNewButton.addEventListener('click', addPopupOpen); // евентлистенер для открытия попапа
addNewCloseButton.addEventListener('click', addPopupClose); // евентлистенер для закрытия попапа
addNewForm.addEventListener('submit', addNewFormSubmitHandler);  // евентлистенер для обработки формы и добавления нового места

function addPopupOpen() {
    addNewPopup.classList.add('popup_opened');
} // функция открытия попапа

function addPopupClose() {
    addNewPopup.classList.remove('popup_opened');
}  // функция закрытия попапа

function addNewFormSubmitHandler(evt) {
    evt.preventDefault();
    if(addNewInputPlace.value !== '' && addNewInputPlaceLink.value !== '') {
    initialCards.push({name: addNewInputPlace.value, link: addNewInputPlaceLink.value},);
    generateCard(addNewInputPlace.value, addNewInputPlaceLink.value, initialCards.length - 1);
    addNewInputPlace.value = '';
    addNewInputPlaceLink.value = ''
    addPopupClose();
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
        generateCard(item.name, item.link, index);
    });  // цикл перебирающий карточки и отрисовывающий карточки из массива InitialCards при закгрузке страницы

// функция принимает на вход описание карточки, ссылку на картинку и ее индекс в массиве и генерирует карточку
function generateCard(name, link, index) {
    let card = document.querySelector('#card-template').content.cloneNode(true);
    let cardPhoto = card.querySelector('.card__photo');
    cardPhoto.src = link;
    cardPhoto.addEventListener('click', () => {
      let card = cardPhoto.closest('.card');
      card.querySelector('.card-popup').classList.add('card-popup_opened');
    });
    let cardPopupCloseButton = card.querySelector('.card-popup__close-icon');
    cardPopupCloseButton.addEventListener('click', () => {
      let card = cardPopupCloseButton.closest('.card');
      card.querySelector('.card-popup').classList.remove('card-popup_opened');
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
    card.querySelector('.card-popup__image').src = link;
    card.querySelector('.card-popup__description').textContent = name;
    const cards = document.querySelector('.elements').prepend(card);
}
// функция-строитель карточек
// 1. клонирует card-template из html
// 2. берет фото в карточке, добавляет ему атрибус src с ссылкой на картинку и евентлистенер для открытия попапа карточки
// 3. берет кнопкудля закрытия попапа карточки и добавяет ему евентлистенер для закрытия карточки
// 4. меняет описание карточки
// 5. делает кнопку like рабочей
// 6. делает кнопку delete рабочей. При нажатии на нее удаляет карточку из html и из массива с карточками.
// 7. задает image и описания для попапа карточки
// 8. вставляет карточку в поток html в самое начала секции elements