export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByESC);
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByESC);
}

export function closePopupByESC(evt) {
  if(evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}