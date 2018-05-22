import React from 'react';

export function restAuthRequest({method, route, body}, callback, onError = (error) => {}) {
    if (!global.authToken) {
        onError("user not authenticated")
        return
    }
    const header = {'X-TOKEN-AUTH': global.authToken}
    restRequest({method, route, body}, callback, onError, header)
}

export function restRequest({method, route, body}, callback, onError = (error) => {}, headers = {} ) {
    fetch(route, {
        method: method,
        headers: {
            ...headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then((response) => response.json())
        .then((response) => {
            callback(response)
        }).catch(error => { 
            onError(error) 
        });
}