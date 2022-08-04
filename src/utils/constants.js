const photoPopupSelector = '#photo-popup';
const deleteActionSubmitSelector = '#delete-action-submit-popup';
const editProfilePopupSelector = '#edit-profile-popup';
const addNewPopupSelector = '#add-new-popup';
const uploadAvatarPopupSelector = '#upload-new-avatar-popup';

const editProfileButton = document.querySelector('.profile__edit-button');
const addNewButton = document.querySelector('.profile__add-button');
const avatarOverlay = document.querySelector('.profile__avatar-overlay');

const cardTemplateSelector = '#card-template';
const profileNameSelector = '.profile__name';
const profileWorkSelector = '.profile__info-about';
const profileAvatarSelector = '.profile__avatar';

const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-13',
    headers: {
        authorization: 'd0237f44-6bee-4b11-b7b4-b67bb1856179',
        'Content-Type': 'application/json'
    },
};

export {editProfileButton, apiConfig, addNewButton, uploadAvatarPopupSelector, avatarOverlay, photoPopupSelector, deleteActionSubmitSelector, editProfilePopupSelector, addNewPopupSelector, cardTemplateSelector, profileNameSelector, profileWorkSelector, profileAvatarSelector};