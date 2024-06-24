import { API } from '../config';
import fetch from 'isomorphic-fetch';

export const specialist_list = () => {
    return fetch(`${API}/specialistType_list`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};