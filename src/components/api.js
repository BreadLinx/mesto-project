export class Api {
    constructor({baseUrl, headers}) {
        this._url = baseUrl;
        this._headers = headers;
    }

    _checkResponce(res) {
        return res.ok ? res.json() : Promise.reject(`Что-то пошло не так: ${res.status}`);
    }

    uploadUserInformationRequest() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkResponce)
    }

    getCardsArrayRequest() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkResponce)
    }

    sendDeleteRequest(cardID) {
        return fetch(`${this._url}/cards/${cardID}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponce)
    }

    sendPutLikeRequest(cardID) {
        return fetch(`${this._url}/cards/likes/${cardID}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._checkResponce)
    }

    sendDeleteLikeRequest(cardID) {
        return fetch(`${this._url}/cards/likes/${cardID}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponce)
    }

    getLikes(cardID) {
        return fetch(`${this._url}/cards/likes/${cardID}`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._checkResponce)
    }

    updateAvatar(avatarLink) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink
            })
        })
    }

    uploadNewUserInformationRequest(name, work) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: work
            })
        })
    }

    addNewCardRequest(placeName, placeLink) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: placeName,
                link: placeLink
            })
        })
        .then(this._checkResponce)
    }
}