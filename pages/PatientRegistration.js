import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import Router from 'next/router';
import { PatientRegistration } from '../actions/patientregistrationAction';

const PatientRegistrations = () => {
    const defaultProfileImage = '/images/userLogo.jpeg';
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [patientNumber, setPatientNumber] = useState('');
    const [countryCode, setCountryCode] = useState('91'); 
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [area, setArea] = useState('');
    const [pincode, setPincode] = useState('');
    const [mainAddress, setMainAddress] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        email: '',
        address: '',
        country: '',
        state: '',
        area: '',
        pincode: '',
        mainAddress: '',
        
    });

    // useEffect(() => {
    //     // Reset the patient number in localStorage when the component mounts
    //     localStorage.removeItem('lastPatientNumber');
    // }, []);

    // useEffect(() => {
    //     // Get the last patient number from localStorage
    //     const lastPatientNumber = localStorage.getItem('lastPatientNumber');
    //     // If there's no last patient number, set it to P001
    //     if (!lastPatientNumber) {
    //         setPatientNumber('P001');
    //         localStorage.setItem('lastPatientNumber', 'P001');
    //     } else {
    //         // Set the patient number to the last patient number
    //         setPatientNumber(lastPatientNumber);
    //     }
    // }, []);

    const onFileChange = (e) => {
        setProfilePhoto(e.target.files[0]);
    }
    const handleSubmit = async (e) => {
        alert(JSON.stringify(e))
        e.preventDefault();
        setIsLoading(true);

        // const nextPatientNumber = `P${parseInt(patientNumber.substring(1)) + 1}`;
        // setPatientNumber(nextPatientNumber);
        // localStorage.setItem('lastPatientNumber', nextPatientNumber);

        

        const validationErrors = {};

        if (!/^[a-zA-Z]+$/.test(firstName)) {
            validationErrors.firstName = 'Please enter a valid first name.';
        }
    
        if (!/^[a-zA-Z]+$/.test(lastName)) {
            validationErrors.lastName = 'Please enter a valid last name.';
        }

        if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
            validationErrors.phoneNumber = 'Please enter a valid phone number.';
        }
    
        // if (!dateOfBirth) {
        //     validationErrors.dateOfBirth = 'Please enter your date of birth.';
        // }
    
        // if (!gender) {
        //     validationErrors.gender = 'Please select your gender.';
        // }
    
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = 'Please enter a valid email address.';
        }
    
        if (!address.trim()) {
            validationErrors.address = 'Please enter your address.';
        }
    
        // if (!country) {
        //     validationErrors.country = 'Please select your country.';
        // }
    
        // if (!state) {
        //     validationErrors.state = 'Please select your state.';
        // }
    
        // if (!area) {
        //     validationErrors.area = 'Please select your area.';
        // }
    
        if (!/^\d{6}$/.test(pincode)) {
            validationErrors.pincode = 'Please enter a valid pincode.';
        }
    
        if (!mainAddress.trim()) {
            validationErrors.mainAddress = 'Please enter your main address.';
        }
    
        if (!profilePhoto) {
            validationErrors.profilePhoto = 'Please upload your profile photo.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            setTimeout(() => {
                setErrors({});
            }, 10000);
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('patient_first_name', firstName);
            formData.append('patient_last_name', lastName);
            //formData.append('patient_unique_number', patientNumber);
            formData.append('patient_phone_number', phoneNumber);
            //formData.append('patient_country_code', countryCode);
            //formData.append('patient_dob', dateOfBirth);
            formData.append('patient_gender', gender);
            formData.append('patient_email', email);
            formData.append('patient_address', address);
            //formData.append('patient_country_id', country);
            //formData.append('patient_state_id', state);
            //formData.append('patient_area_id', area);
            formData.append('patient_pincode', pincode);
            formData.append('patient_main_address', mainAddress);
            formData.append('demoimg', profilePhoto);
            alert(JSON.stringify(formData))
            PatientRegistration(formData).then(response => {
                alert(JSON.stringify('not added'))
                if (response.msg) {
                    setErrors({ errorMessage: response.msg });
                    setTimeout(() => {
                        setErrorMessage('');
                    }, 5000);
                } else if (response.error) {
                    setValues({ ...values });
                } else {
                    alert(JSON.stringify('added'))
                    setIsSuccess(true);
                    setSuccessMessage('Registered successfully!');
                    setTimeout(() => {
                        Router.push(`/login`);
                        console.log('Response from backend:', response.data);
                    }, 100);
                }
            });
        } catch (error) {
           console.error('Error:', error);
            setErrors({ errorMessage: 'Error saving data. Please try again.' });
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log('Form submitted:', {
            firstName,
            lastName,
            patientNumber,
            countryCode,
            phoneNumber,
            dateOfBirth,
            gender,
            email,
            address,
            country,
            state,
            area,
            pincode,
            mainAddress,
            profilePhoto,
        });
        
    
        setIsSuccess(false);
        setIsLoading(false);

        
    };
    




    return (
        <>
            <Head>
                <title>Patient Registration</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Patient Registration Form' />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
    
            <div className="container mt-4">
                <div className="col-md-6 offset-md-3">
                    <div className="card mb-4" style={{ width: '600px', margin: '0 auto', boxShadow: '0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%)' }}>
                        <h4 className="mb-3 text-center">Registration Form</h4>
                        <p className="mb-3 text-center">Please fill in your details to register as a new patient.</p>
    
                        <div className="card-body" style={{ padding: '20px' }}>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="PatientNumber">Patient Number</label>
                                    <input className="form-control"  type="text" value={patientNumber} readOnly />
                                </div>
    
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="FirstName">First Name*</label>
                                        <input className="form-control" id="FirstName" type="text" placeholder="Enter your first name" value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)} />
                                        {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="LastName">Last Name*</label>
                                        <input className="form-control" id="LastName" type="text" placeholder="Enter your last name" value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}/>
                                        {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                                    </div>
                                </div>
    
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="CountryCode">Country Code*</label>
                                        <select className="form-control" id="CountryCode" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                                            <option value="India">India</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="Phone">Phone Number*</label>
                                        <input className="form-control" id="Phone" type="tel" placeholder="Enter your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}  />
                                        {errors.phone && <div className="error-message">{errors.phone}</div>}
                                    </div>
                                </div>
    
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="Dob">Date Of Birth*</label>
                                        <input className="form-control" id="Dob" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                                        {errors.dob && <div className="error-message">{errors.dob}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1">Gender*</label><br />
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
                                            <label className="form-check-label" htmlFor="male">Male</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" id="female" name="gender"value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
                                            <label className="form-check-label" htmlFor="female">Female</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" id="other" name="gender" value="other" checked={gender === 'other'} onChange={(e) => setGender(e.target.value)} />
                                            <label className="form-check-label" htmlFor="other">Other</label>
                                        </div>
                                        {errors.gender && <div className="error-message">{errors.gender}</div>}
                                    </div>
                                </div>
    
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="Email">Email*</label>
                                    <input className="form-control" id="Email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {errors.email && <div className="error-message">{errors.email}</div>}
                                </div>
    
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="Address">Address*</label>
                                    <textarea className="form-control" id="Address" rows="3" placeholder="Enter your address"value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                                </div>
    
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-4">
                                        <label className="small mb-1" htmlFor="Country">Country*</label>
                                        <select className="form-control" id="Country" value={country} onChange={(e) => setCountry(e.target.value)}>
                                           <option value="India">India</option>
                                         </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small mb-1" htmlFor="State">State*</label>
                                        <select className="form-control" id="State" value={state} onChange={(e) => setState(e.target.value)}></select>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small mb-1" htmlFor="Area">Area*</label>
                                        <select className="form-control" id="Area" value={area} onChange={(e) => setArea(e.target.value)}></select>
                                    </div>
                                </div>
    
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="Pincode">Pincode*</label>
                                        <input className="form-control" id="Pincode" type="text" placeholder="Enter your pincode" value={pincode} onChange={(e) => setPincode(e.target.value)}  />
                                        {errors.pincode && <div className="error-message">{errors.pincode}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="MainAddress">Main Address*</label>
                                        <textarea className="form-control" id="MainAddress" rows="3" placeholder="Enter your main address" value={mainAddress} onChange={(e) => setMainAddress(e.target.value)}></textarea>
                                    </div>
                                </div>
    
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="ProfilePhoto">Profile Photo*</label>
                                    <input className="form-control" id="ProfilePhoto" type="file" onChange={onFileChange} />
                                    {errors.profilePhoto && <div className="error-message">{errors.profilePhoto}</div>}
                                </div>
    
                                <div className="form-group">
                                 <div className="row justify-content-center">
                                 <div className="col text-center">
                                    <button className='registration-button' type="submit" disabled={isLoading}>
                                         {isLoading ? 'Loading...' : 'Register'}
                                    </button>
                                         {isSuccess && <div className="success-message">{successMessage}</div>}
                                         {errorMessage && <div className="error-message">{errorMessage}</div>}
                                  </div>
                                 </div>
                                 </div>
                            </form>
                            <div className="text-center mt-3 login-link">
                        Already a member?{' '}
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    
}

export default PatientRegistrations;
