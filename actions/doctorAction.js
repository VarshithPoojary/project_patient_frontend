import { API } from '../config';
import fetch from 'isomorphic-fetch';

export const doctor_list = () => {
    return fetch(`${API}/caretaker_list`,{
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

export const caretaker_list_by_specialist = patientData => {
    var id={"caretaker_type":patientData};
    return fetch(`${API}/caretaker_list_by_specialist`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const caretaker_list_by_id = doctorData => {
    var id={"_id":doctorData};
    return fetch(`${API}/caretaker_list_by_id`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


    export const findDoctorsWithinRadius = patientData => {
        return fetch(`${API}/findDoctorsWithinRadius`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patientData)
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
    };

