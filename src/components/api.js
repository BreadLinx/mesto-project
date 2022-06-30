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