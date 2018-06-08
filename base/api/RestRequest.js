import React from 'react';

const REQUEST_TIMEOUT = 5000

export function restAuthRequest({ method, route, body }, callback, onError = (error) => { }) {
    if (!global.authToken) {
        onError("user not authenticated")
        return
    }
    const header = { 'X-TOKEN-AUTH': global.authToken }
    restRequest({ method, route, body }, callback, onError, header)
}

export function restRequest({ method, route, body }, callback, onError = (error) => { console.log('restRequest error: ' ,error) }, headers = {}) {
    fetch(route, {
        method: method,
        headers: {
            ...headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        timeout: REQUEST_TIMEOUT
    })
        .then((response) => response.json())
        .then((response) => {
            callback(response)
        }).catch(error => {
            onError(error)
        });
}