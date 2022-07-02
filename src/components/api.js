export function uploadUserInformationRequest() {
    return fetch('https://nomoreparties.co/v1/plus-cohort-13/users/me', {
        method: 'GET',
        headers: {
            authorization: 'd0237f44-6bee-4b11-b7b4-b67bb1856179'
        }
        })
}

export function getCardsArrayRequest() {
    return fetch('https://nomoreparties.co/v1/plus-cohort-13/cards',{
        method: 'GET',
        headers: {
            authorization: 'd0237f44-6bee-4b11-b7b4-b67bb1856179'
        }
        })
}

export function sendDeleteRequest(cardID) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-13/cards/${cardID}`, {
        method: 'DELETE',
        headers: {
        authorization: 'd0237f44-6bee-4b11-b7b4-b67bb1856179',
        'Content-Type': 'application/json'
        }
    })
}

export function sendPutLikeRequest(cardID) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-13/cards/likes/${cardID}`, {
        method: 'PUT',
        headers: {
            authorization: 'd0237f44-6bee-4b11-b7b4-b67bb1856179',
            'Content-Type': 'application/json'
        }
    })
}

export function sendDeleteLikeRequest(cardID) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-13/cards/likes/${cardID}`, {
        method: 'DELETE',
        headers: {
            authorization: 'd0237f44-6bee-4b11-b7b4-b67bb1856179',
            'Content-Type': 'application/json'
        }
    })
}

export function getLikes(cardID) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-13/cards/likes/${cardID}`, {
        method: 'GET',
        headers: {
            authorization: 'd0237f44-6bee-4b11-b7b4-b67bb1856179'
        }
    })
}

export function updateAvatar(avatarLink) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-13/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: 'd0237f44-6bee-4b11-b7b4-b67bb1856179',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarLink
        })
    })
}

export function uploadNewUserInformationRequest(name, work) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-13/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'd0237f44-6bee-4b11-b7b4-b67bb1856179',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: work
      })
    })
}

export function addNewCardRequest(placeName, placeLink) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-13/cards', {
      method: 'POST',
      headers: {
        authorization: 'd0237f44-6bee-4b11-b7b4-b67bb1856179',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: placeName,
        link: placeLink
      })
    })
}