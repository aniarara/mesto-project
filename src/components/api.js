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

const checkRes = (res) => {
    if (res.ok) {
        return res.json()
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

export const myid = "297d7896cf9796988b2fda57";

export function getData(endPoint) {
    return fetch(`${config.baseUrl}/${endPoint}`, {
        method: 'GET',
        headers: config.headers
    })
        .then(checkRes(res))
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}

export function changeProfile(endPoint, userName, userContain) {
    return fetch(`${config.baseUrl}/${endPoint}`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: userName,
            about: userContain
        }),
    })
}

export function changeProfileAvatar(avatarLink) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink
        }),
    })
}

export function postNewCard(endPoint, cardName, cardLink) {
    return fetch(`${config.baseUrl}/${endPoint}`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        }),
    })
}

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/${endPointCards}/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
}

export function putData(endPoint, cardId) {
    return fetch(`${config.baseUrl}/${endPoint}/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(checkRes(res))
}
//надо лайкам сделать функцию как setProfileInfo чтобы обновляла лайки при постановке
export function deleteLike(cardId) {
    return fetch(`${config.baseUrl}/${endPointLikes}/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkRes(res))
}

