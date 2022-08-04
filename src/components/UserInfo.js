export class UserInfo {
    constructor(selectors) {
        this._nameElement = document.querySelector(selectors.nameSelector);
        this._workElement = document.querySelector(selectors.workSelector);
        this._avatarElement = document.querySelector(selectors.avatarSelector);
        this._name = '';
        this._work = '';
        this._id = '';
        this._avatar = '';
    }
    getUserInfo() {
        return {
            name: this._name,
            work: this._work,
            id: this._id,
            avatar: this._avatar
        };
    }

    setUserInfo({name, about, avatar, _id}) {
        this._name = name;
        this._work = about;
        this._avatar = avatar;
        this._id = _id;
        this._nameElement.textContent = this._name;
        this._workElement.textContent = this._work;
        this._avatarElement.src = this._avatar;
    }
}