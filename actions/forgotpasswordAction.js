import { API } from '../config';
import fetch from 'isomorphic-fetch'; 

export const patient_forgot_Password_OTP = patient_email => {
  return fetch(`${API}/patient_forgot_Password_OTP`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({patient_email })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// export const verifyOTP = (adminOTP) => {
//     return fetch(`${API}/verify-otp`, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ admin_otp: adminOTP })
//     })
//       .then(response => {
//         return response.json();
//       })
//       .catch(err => console.log(err));
//   };

export const resendOTP = patient_phone_number => {
  return fetch(`${API}/resendPatientOTP`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({patient_phone_number })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};


export const resetPassword = passwordData => {
  return fetch(`${API}/resetPatientPassword`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(passwordData)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

