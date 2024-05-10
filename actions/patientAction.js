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
    var phone={"patient_phone_number":otpData};
    return fetch(`${API}/getOtpByEmail`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(phone)
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


export const patient_list_by_id = patientData => {
    var id={"_id":patientData};
    return fetch(`${API}/patient_list_by_id`, {
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

export const update_patient = formData => {
    return fetch(`${API}/update_patient`, {
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

export const patient_personal_update = patientData => {
    return fetch(`${API}/patient_personal_update`, {
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

export const patient_registration_update = patientData => {
        return fetch(`${API}/patient_registration_update`, {
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

export const patient_delete = (patientData) => {
    var id={"_id":patientData};
    return fetch(`${API}/patient_delete`, {
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

