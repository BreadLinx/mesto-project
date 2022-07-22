import {api} from '../pages/index.js';
import {editProfilePopupSubmit} from '../utils/constants.js';
import {editProfilePopup} from '../pages/index.js';

export class UserInfo {
    constructor({nameSelector, workSelector}) {
        this._nameSelector = nameSelector;
        this._workSelector = workSelector;
    }

    getUserInfo() {
        let user = {};
        api.uploadUserInformationRequest()
        .then((res) => {
            user.name = res.name;
            user.work = res.about;
            user.id = res.id;
            user.avatar = res.avatar;
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            return user;
        });
    }

    setUserInfo(name, work) {
        api.uploadNewUserInformationRequest(name, work)
        .then((res) => {
            document.querySelector(this._nameSelector).textContent = res.name;
            document.querySelector(this._workSelector).textContent = res.about;
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
}