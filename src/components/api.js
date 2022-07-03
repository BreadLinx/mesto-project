const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-13',
    headers: {
        authorization: 'd0237f44-6bee-4b11-b7b4-b67bb1856179',
        'Content-Type': 'application/json'
    },
};

export function checkResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

export function uploadUserInformationRequest() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
        })
}

export function getCardsArrayRequest() {
    return fetch(`${config.baseUrl}/cards`,{
        method: 'GET',
        headers: config.headers
        })
}

export function sendDeleteRequest(cardID) {
    return fetch(`${config.baseUrl}/cards/${cardID}`, {
        method: 'DELETE',
        headers: config.headers
    })
}

export function sendPutLikeRequest(cardID) {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'PUT',
        headers: config.headers
    })
}

export function sendDeleteLikeRequest(cardID) {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'DELETE',
        headers: config.headers
    })
}

export function getLikes(cardID) {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'GET',
        headers: config.headers
    })
}

export function updateAvatar(avatarLink) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink
        })
    })
}

export function uploadNewUserInformationRequest(name, work) {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: work
      })
    })
}

export function addNewCardRequest(placeName, placeLink) {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: placeName,
        link: placeLink
      })
    })
}