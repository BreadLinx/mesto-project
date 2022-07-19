const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('#edit-profile-popup');
const editProfilePopupSubmit = editProfilePopup.querySelector('.popup__submit');
const editProfileForm = document.querySelector('#edit-profile-form');
const editProfileInputName = document.querySelector('#input-name');
const profileName = document.querySelector('.profile__name');
const editProfileInputWork = document.querySelector('#input-work');
const profileInfoAbout = document.querySelector('.profile__info-about');
const addNewButton = document.querySelector('.profile__add-button');
const addNewPopup = document.querySelector('#add-new-popup');
const addNewPopupSubmit = addNewPopup.querySelector('.popup__submit');
const addNewForm = document.querySelector('#add-new-form');
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
const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-13',
    headers: {
        authorization: 'd0237f44-6bee-4b11-b7b4-b67bb1856179',
        'Content-Type': 'application/json'
    },
};
let userId;



export {editProfileButton, editProfilePopup, editProfilePopupSubmit, editProfileForm, editProfileInputName, profileName, editProfileInputWork, profileInfoAbout, addNewButton, addNewPopup, addNewPopupSubmit, addNewForm, addNewInputPlace, addNewInputPlaceLink, cards, popups, photoPopup, photoPopupPhoto, popupImage, profileAvatar, deleteActionSubmitPopup, deleteActionSubmitPopupDeleteBtn, deleteActionSubmitPopupSubmit, avatarOverlay, uploadAvatarPopup, uploadAvatarPopupSubmit, uploadAvatarForm, inputUploadAvatar, cardTemplate, apiConfig, userId};