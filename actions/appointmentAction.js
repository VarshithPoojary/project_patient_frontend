import { API } from '../config';
import fetch from 'isomorphic-fetch';

// export const doctor_list = () => {
//     return fetch(`${API}/caretaker_list`,{
//         method: 'GET',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//         },
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };



export const get_available_slots = (slotData) => {
    return fetch(`${API}/slot_listby_date`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(slotData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error.msg || 'An error occurred while fetching the slots.');
            });
        }
        try {
            return response.json();
        } catch (error) {
            throw new Error('Error parsing JSON response');
        }
    })
    .catch(err => {
        console.error('Error fetching available slots:', err);
        return { error: true, msg: err.message };
    });
};

export const add_appointment = appointmentData => {
    return fetch(`${API}/addAppointment`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const appointment_list = () => {
    return fetch(`${API}/appointment_list`,{
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


export const appointment_list_by_id = appointmentData => {
    var id={"_id":appointmentData};
    return fetch(`${API}/appointment_list_by_id`, {
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


export const appointment_list_by_patientId = patientData => {
    var id={"_id":patientData};
    return fetch(`${API}/appointment_list_by_patientId`, {
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

export const update_appointment = (appointmentData) => {
    return fetch(`${API}/update_appointment`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

    export const appointment_cancel = patientData => {
        return fetch(`${API}/appointment_cancel`, {
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







