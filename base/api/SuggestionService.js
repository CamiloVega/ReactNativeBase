import React from 'react';
import * as RestClient from './RestClient'

export const getSuggestionList = ((callback, onError = (error) => console.log(error)) => {
    RestClient.getSuggestionList((suggestionsResponse) => {
        callback(suggestionsResponse)
    }, onError)
});
