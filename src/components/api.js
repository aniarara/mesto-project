export const endPointUser = `users/me`;
export const endPointCards = `cards`;
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
    .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(res.status);
        }
    })
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