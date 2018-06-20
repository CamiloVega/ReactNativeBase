import React from 'react';

const REQUEST_TIMEOUT = 2000

export function restAuthRequest({ method, route, body }) {
    if (!global.authToken) {
        console.log("ERROR: User Not Authenticated")
        return
    }
    const header = { 'X-TOKEN-AUTH': global.authToken }
    return restRequest({ method, route, body }, header)
}

export function restRequest({ method, route, body}, headers = {}) {
    return fetch(
        route, 
        {
        method: method,
        headers: {
            ...headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        timeout: REQUEST_TIMEOUT
    }).then((response) => response.json())    
}