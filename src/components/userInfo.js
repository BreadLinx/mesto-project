import {api} from '../pages/index.js';
import {editProfilePopupSubmit, uploadAvatarPopupSubmit} from '../utils/constants.js';
import {editProfilePopup, uploadAvatarPopup} from '../pages/index.js';

export class UserInfo {
    constructor(nameElement, workElement, avatarElement) {
        this._nameElement = nameElement;
        this._workElement = workElement;
        this._avatarElement = avatarElement;
        this._name = '';
        this._work = '';
        this._id = '';
        this._avatar = '';
    }

    uploadUserInfo() {
        api.uploadUserInformationRequest()
        .then((res) => {
            this._name = res.name;
            this._work = res.about;
            this._id = res.id;
            this._avatar = res.avatar;
        })
        .catch((err) => {
            console.log(err);
        });
    }
 
    getUserInfo() {
        return {
            name: this._name,
            work: this._work,
            id: this._id,
            avatar: this._avatar
        };
    }

    setUserInfo(name, work) {
        api.uploadNewUserInformationRequest(name, work)
        .then((res) => {
            this._name = res.name;
            this._work = res.about;
            this.updateUserInfo();
            editProfilePopupSubmit.textContent = 'Сохранено';
        })
        .then(() => {
            editProfilePopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            editProfilePopupSubmit.textContent = 'Сохранить';
        });
    }

    setUserAvatar(link) {
        api.updateAvatar(link)
        .then((res) => {
            this._avatar = res.avatar;
            this.updateUserAvatar()
            uploadAvatarPopupSubmit.textContent = 'Сохранено';
        })
        .then(() => {
            uploadAvatarPopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            uploadAvatarPopupSubmit.textContent = 'Сохранить';
        });
    }

    updateUserInfo() {
        this._nameElement.textContent = this._name;
        this._workElement.textContent = this._work;
    }

    updateUserAvatar() {
        this._avatarElement.src = this._avatar;
    }
}