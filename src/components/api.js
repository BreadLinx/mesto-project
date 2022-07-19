// const config = {
//     baseUrl: 'https://nomoreparties.co/v1/plus-cohort-13',
//     headers: {
//         authorization: 'd0237f44-6bee-4b11-b7b4-b67bb1856179',
//         'Content-Type': 'application/json'
//     },
// };

// export function checkResponse(res) {
//     if(res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Что-то пошло не так: ${res.status}`);
// }

// export function uploadUserInformationRequest() {
//     return fetch(`${config.baseUrl}/users/me`, {
//         method: 'GET',
//         headers: config.headers
//         })
// }

// export function getCardsArrayRequest() {
//     return fetch(`${config.baseUrl}/cards`,{
//         method: 'GET',
//         headers: config.headers
//         })
// }

// export function sendDeleteRequest(cardID) {
//     return fetch(`${config.baseUrl}/cards/${cardID}`, {
//         method: 'DELETE',
//         headers: config.headers
//     })
// }

// export function sendPutLikeRequest(cardID) {
//     return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
//         method: 'PUT',
//         headers: config.headers
//     })
// }

// export function sendDeleteLikeRequest(cardID) {
//     return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
//         method: 'DELETE',
//         headers: config.headers
//     })
// }

// export function getLikes(cardID) {
//     return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
//         method: 'GET',
//         headers: config.headers
//     })
// }

// export function updateAvatar(avatarLink) {
//     return fetch(`${config.baseUrl}/users/me/avatar`, {
//         method: 'PATCH',
//         headers: config.headers,
//         body: JSON.stringify({
//             avatar: avatarLink
//         })
//     })
// }

// export function uploadNewUserInformationRequest(name, work) {
//     return fetch(`${config.baseUrl}/users/me`, {
//       method: 'PATCH',
//       headers: config.headers,
//       body: JSON.stringify({
//         name: name,
//         about: work
//       })
//     })
// }

// export function addNewCardRequest(placeName, placeLink) {
//     return fetch(`${config.baseUrl}/cards`, {
//       method: 'POST',
//       headers: config.headers,
//       body: JSON.stringify({
//         name: placeName,
//         link: placeLink
//       })
//     })
// }

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
    }
}