const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopupSelector = '#edit-profile-popup';
const editProfilePopupSubmit = document.querySelector('#edit-profile-form').querySelector('.popup__submit');
const editProfileInputName = document.querySelector('#input-name');
const profileName = document.querySelector('.profile__name');
const editProfileInputWork = document.querySelector('#input-work');
const profileInfoAbout = document.querySelector('.profile__info-about');
const addNewButton = document.querySelector('.profile__add-button');
const addNewPopupSelector = '#add-new-popup';
const addNewPopupSubmit = document.querySelector('#add-new-popup .popup__submit');
const photoPopupPhoto = document.querySelector('#photo-popup .popup__image');
const photoPopupDescription = document.querySelector('#photo-popup .popup__description');
const profileAvatar = document.querySelector('.profile__avatar');
const deleteActionSubmitPopup = document.querySelector('#delete-action-submit-popup');
const deleteActionSubmitPopupCloseBtn = deleteActionSubmitPopup.querySelector('.popup__close-icon');
const deleteActionSubmitPopupSubmit = deleteActionSubmitPopup.querySelector('.popup__submit');
const avatarOverlay = document.querySelector('.profile__avatar-overlay');
const uploadAvatarPopupSelector = '#upload-new-avatar-popup';
const uploadAvatarPopupSubmit = document.querySelector('#upload-new-avatar-popup .popup__submit');

const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-13',
    headers: {
        authorization: 'd0237f44-6bee-4b11-b7b4-b67bb1856179',
        'Content-Type': 'application/json'
    },
};

export {editProfileButton, editProfileInputName, profileName, editProfileInputWork, profileInfoAbout, editProfilePopupSelector, apiConfig, editProfilePopupSubmit, addNewPopupSelector, addNewPopupSubmit, addNewButton, photoPopupPhoto, photoPopupDescription, deleteActionSubmitPopup, deleteActionSubmitPopupSubmit, deleteActionSubmitPopupCloseBtn, uploadAvatarPopupSelector, avatarOverlay, uploadAvatarPopupSubmit, profileAvatar};