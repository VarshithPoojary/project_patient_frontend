import { API } from '../config';
import fetch from 'isomorphic-fetch';



export const PatientRegistration = formData => {
    return fetch(`${API}/add_patient`, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(err => {
            console.error('Error:', err);
            throw err; 
        });
};

export const patient_list = () => {
    return fetch(`${API}/patient_list`,{
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

export const getOtpByEmail = otpData => {
    var email={"patient_email":otpData};
    return fetch(`${API}/getOtpByEmail`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const Patientsignin = patientLogin => {
    return fetch(`${API}/Patientlogin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientLogin)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const authenticate = (data, callback) => {
    console.log('Authenticating user:', data);
    localStorage.setItem('user', JSON.stringify(data));
    callback();
};
