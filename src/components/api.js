import { checkResponse } from "./utils";

export const endPointUser = `users/me`;
export const endPointCards = `cards`;
export const endPointLikes = `cards/likes`;
const token = '6c00d9e7-1d53-4ff5-b415-3fd58f54b51e';
const cohort = 'plus-cohort-27';
const config = {
    baseUrl: `https://nomoreparties.co/v1/${cohort}`,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
}

export function getData(endPoint) {
    return fetch(`${config.baseUrl}/${endPoint}`, {
        method: 'GET',
        headers: config.headers
    })
        .then(checkResponse)
}

export function changeProfile(endPoint, userName, userContain) {
    return fetch(`${config.baseUrl}/${endPoint}`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: userName,
            about: userContain
        })
    })
    .then(checkResponse)
}

export function changeProfileAvatar(avatarLink) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink
        }),
    })
    .then(checkResponse)
}

export function postNewCard(element) {
    return fetch(`${config.baseUrl}/${endPointCards}`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(element)
    })
    .then(checkResponse)
}

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/${endPointCards}/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(checkResponse)
}

export function putData(endPoint, cardId) {
    return fetch(`${config.baseUrl}/${endPoint}/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(checkResponse)
}

export function deleteLike(cardId) {
    return fetch(`${config.baseUrl}/${endPointLikes}/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkResponse)
}

