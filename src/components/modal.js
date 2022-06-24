const editProfilePopup = document.querySelector('#edit-profile-popup'); // попап изменения профиля
const editProfileInputName = document.querySelector('#input-name');  // поле ввода имени в форме попапа изменения профиля
const profileName = document.querySelector('.profile__name');  // имя в секции profile
const editProfileInputWork = document.querySelector('#input-work');  // поле вводе деятельности в форме попапа изменения профиля
const profileInfoAbout = document.querySelector('.profile__info-about'); // деятельность в секции profile

export function popupOpen(popup) {
    if(popup === editProfilePopup) {
      editProfileInputName.value = profileName.textContent;
      editProfileInputWork.value = profileInfoAbout.textContent;
    }
  
    popup.classList.add('popup_opened');
}

export function popupClose(popup) {
    popup.classList.remove('popup_opened');
}