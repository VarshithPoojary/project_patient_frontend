import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import TopBarHome from './homeTopbar.js'
import { PatientRegistration } from '../actions/patientAction';
import { country_list } from '../actions/countryAction';
import { state_list_by_country_id } from '../actions/stateAction';
import { city_list_by_state_id } from '../actions/cityAction';


const PatientRegistrations = () => {
    const [values,setValues]=useState('');
    const [countryList, setCountryList] = useState([]);
    const [stateDetail, setStateDetail] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [patientNumber, setPatientNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [countryCode, setCountryCode] = useState('91'); 
    const [patient_register_status, setPatient_register_status] = useState('false'); 
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [area, setArea] = useState('');
    const [pincode, setPincode] = useState('');
    const [mainAddress, setMainAddress] = useState('');
    const [lattitude, setLattitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
        lattitude: '',
        longitude: '',
        patient_password:'',
        profilePhoto: '', 
    });
    const [passwordValidations, setPasswordValidations] = useState({
        upperCase: false,
        lowerCase: false,
        digit: false,
        specialChar: false,
        length: false,
    });

    

    useEffect(() => {
        loadCountryDetail();  
    }, []);

    const loadCountryDetail = () => {
        country_list()
            .then(response => {
                if (response.error) {
                    console.log(response.error);
                } else {
                    setCountryList(response.admin_country_list);
                }
            })
            .catch(error => console.error(error));
    };

    const handleCountryChange = (admin_country_id) => {
        state_list_by_country_id(admin_country_id)
            .then(response => {
                setCountry(admin_country_id)
                setStateDetail(response.state_list);
            })
            .catch(error => {
                console.error('Error fetching state list:', error);
            });
    };

    const handleStateChange = (admin_state_id) => {
        city_list_by_state_id(admin_state_id)
            .then(response => {
                setState(admin_state_id)
                setCityList(response.city_list);
            })
            .catch(error => {
                console.error('Error fetching city list:', error);
            });
    };
    


    const onFileChange = (e) => {
        setProfilePhoto(e.target.files[0]);
    };

    useEffect(() => {
        validatePassword(password);
    }, [password]);

    const validatePassword = (password) => {
        const validations = {
            upperCase: /[A-Z]/.test(password),
            lowerCase: /[a-z]/.test(password),
            digit: /[0-9]/.test(password),
            specialChar: /[^A-Za-z0-9]/.test(password),
            length: password.length >= 8 && password.length <= 16,
        };
        setPasswordValidations(validations);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        

        const validationErrors = {};
        if (!firstName.trim()) {
            validationErrors.firstName = 'Please enter your first name.';
        }
        if (!lastName.trim()) {
            validationErrors.lastName = 'Please enter your last name.';
        }
        if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
            validationErrors.phoneNumber = 'Please enter a valid phone number.';
        }
    
        if (!dateOfBirth) {
            validationErrors.dateOfBirth = 'Please enter your date of birth.';
        }
    
        if (!gender) {
            validationErrors.gender = 'Please select your gender.';
        }
    
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = 'Please enter a valid email address.';
        }
    
        if (!address.trim()) {
            validationErrors.address = 'Please enter your address.';
        }
    
        if (!country) {
            validationErrors.country = 'Please select your country.';
        }
    
        if (!state) {
            validationErrors.state = 'Please select your state.';
        }
    
        if (!area) {
            validationErrors.area = 'Please select your area.';
        }
    
        if (!/^\d{6}$/.test(pincode)) {
            validationErrors.pincode = 'Please enter a valid pincode.';
        }
    
        if (!mainAddress.trim()) {
            validationErrors.mainAddress = 'Please enter your main address.';
        }

        if(!lattitude.trim()){
            validationErrors.lattitude = 'Please enter your lattitude.';
        }

        if(!longitude.trim()){
            validationErrors.longitude = 'Please enter your longitude.';
        }

        if (!password) {
            validationErrors.password = 'Please enter your password.';
        }

        if (!confirmPassword) {
            validationErrors.confirmPassword = 'Please confirm your password.';
        }

        if (password !== confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match.';
        }
    
        // if (!profilePhoto) {
        //     validationErrors.profilePhoto = 'Please upload your profile photo.';
        // }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            // alert(JSON.stringify(validationErrors))
            setIsLoading(false);
            setTimeout(() => {
                setErrors({});
            }, 10000);
            return;
           
        }

        const formData = new FormData();
        formData.append('patient_first_name', firstName);
        formData.append('patient_last_name', lastName);
        //   formData.append('patient_unique_number', patientNumber);
          formData.append('patient_phone_number', phoneNumber);
          formData.append('patient_country_code', countryCode);
          formData.append('patient_dob', dateOfBirth);
          formData.append('patient_gender', gender);
          formData.append('patient_email', email);
          formData.append('patient_address', address);
          formData.append('patient_country_id', country);
          formData.append('patient_state_id', state);
          formData.append('patient_area_id', area);
          formData.append('patient_pincode', pincode);
          formData.append('patient_latitude', lattitude);
          formData.append('patient_longitude', longitude);
          formData.append('patient_main_address', mainAddress);
          formData.append('patient_register_status', patient_register_status);
          formData.append('password', password);
          formData.append('demoimg', profilePhoto);

        try {
            const response = await PatientRegistration(formData);
            if (response.msg) {
                setErrorMessage(response.msg);
                setTimeout(() => {
                    setErrorMessage('');
                }, 1000);
            } else {
                setIsSuccess(true);
                setSuccessMessage('Mail Sent To Your Email');
                setTimeout(() => {
                    localStorage.setItem('userPhone', phoneNumber);
                    Router.push(`/PatientLoginOTP`);
                }, 1000);
            }
        } catch (error) {
            console.error('Error:', error);
                setErrorMessage('Error saving data. Please try again.');
                setTimeout(() => {
                    setErrorMessage('');
                }, 1000);
        }

        setIsLoading(false);
    };

    const togglePasswordVisibility = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const toggleConfirmPasswordVisibility = () => {
        setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
    };

    return (
        <div style={{width:'100%', backgroundColor:'white'}}>
            <Head>
                <title>Patient Registration</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content="Patient Registration Form" />
                <link rel="icon" href="/images/title_logo.png" />
            </Head>
            <TopBarHome/>
            <div className="container mt-4" style={{width:'100%'}}>
                <div className="card mb-4" style={{ width: '80%', boxShadow: '0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%)', marginTop:'80px'}}>
                    <h2 className="mb-3 text-center" style={{fontSize: '2.5em',color: '#7c7c7c',textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',margin: '20px',borderRadius: '5px'}}>Registration Form</h2>
                    <p className="mb-2 text-center">Please fill in your details to register as a new patient.</p>

                    <div className="card-body" style={{ padding: '20px' }}>
                        <form onSubmit={handleSubmit}>
                        {/* <div className="mb-3">
                                    <label className="small mb-1" htmlFor="PatientNumber">Patient Number</label>
                                    <input className="form-control"  type="text" value={patientNumber} readOnly />
                                </div> */}
                            <div className="form-group">
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="big mb-1" htmlFor="FirstName">First Name<span style={{color:'red'}}>*</span> :</label>
                                        <input className="form-control" id="FirstName" type="text" placeholder="Enter your first name" value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)} />
                                        {errors.firstName && <div className="error-message" style={{color:'red'}}>{errors.firstName}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="big mb-1" htmlFor="LastName">Last Name<span style={{color:'red'}}>*</span> :</label>
                                        <input className="form-control" id="LastName" type="text" placeholder="Enter your last name" value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}/>
                                        {errors.lastName && <div className="error-message" style={{color:'red'}}>{errors.lastName}</div>}
                                    </div>
                                </div>
    
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="big mb-1" htmlFor="CountryCode">Country Code<span style={{color:'red'}}>*</span> :</label>
                                        <select className="form-control" id="CountryCode" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                                            <option value="India">India(+91)</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="big mb-1" htmlFor="Phone">Phone Number<span style={{color:'red'}}>*</span> :</label>
                                        <input className="form-control" id="Phone" type="tel" placeholder="Enter your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}  />
                                        {errors.phoneNumber && <div className="error-message" style={{color:'red'}}>{errors.phoneNumber}</div>}
                                    </div>
                                </div>
    
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="big mb-1" htmlFor="Dob">Date Of Birth<span style={{color:'red'}}>*</span> :</label>
                                        <input className="form-control" id="Dob" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                                        {errors.dateOfBirth && <div className="error-message" style={{color:'red'}}>{errors.dateOfBirth}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="big mb-1">Gender<span style={{color:'red'}}>*</span> :</label><br />
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
                                        {errors.gender && <div className="error-message" style={{color:'red'}}>{errors.gender}</div>}
                                    </div>
                                </div>
    
                                <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="big mb-1" htmlFor="Email">Email<span style={{color:'red'}}>*</span> :</label>
                                    <input className="form-control" id="Email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {errors.email && <div className="error-message" style={{color:'red'}}>{errors.email}</div>}
                                </div>
    
                                <div className="col-md-6">
                                    <label className="big mb-1" htmlFor="Address">Address<span style={{color:'red'}}>*</span> :</label>
                                    <textarea className="form-control" id="Address" rows="3" placeholder="Enter your address"value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                                    {errors.address && <div className="error-message" style={{color:'red'}}>{errors.address}</div>}

                                </div>
                                </div>
    
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-4">
                                    <label className="big mb-1" htmlFor="country">Country<span style={{color:'red'}}>*</span> :</label>
                            <select className="form-control" id="country" onChange={(e) => handleCountryChange(e.target.value)}>
                                <option value="">Select Country</option>
                                {countryList.map(country => (
                                    <option key={country._id} value={country._id}>{country.admin_country_name}</option>
                                ))}
                            </select>
                            {errors.country && <div className="error-message" style={{color:'red'}}>{errors.country}</div>}
                                    </div>
                                    <div className="col-md-4">
                                    <label className="big mb-1" htmlFor="state">State<span style={{color:'red'}}>*</span> :</label>
                            <select className="form-control" id="state" onChange={(e) => handleStateChange(e.target.value)}>
                                <option value="">Select State</option>
                                {stateDetail.map(state => (
                                    <option key={state._id} value={state._id}>{state.admin_state_name}</option>
                                ))}
                            </select>
                            {errors.state && <div className="error-message" style={{color:'red'}}>{errors.state}</div>}

                                    </div>
                                    <div className="col-md-4">
                                        <label className="big mb-1" htmlFor="city">Area<span style={{color:'red'}}>*</span> :</label>
                                        <select className="form-control" id="city" onChange={(e) => setArea(e.target.value)}>
                                            <option value="">Select City</option>
                                            {cityList.map(city => (
                                                <option key={city._id} value={city._id}>{city.admin_city_name}</option>
                                            ))}
                                        </select>
                                        {errors.area && <div className="error-message" style={{color:'red'}}>{errors.area}</div>}

                                    </div>

                                </div>
    
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="big mb-1" htmlFor="Pincode">Pincode<span style={{color:'red'}}>*</span> :</label>
                                        <input className="form-control" id="Pincode" type="text" placeholder="Enter your pincode" value={pincode} onChange={(e) => setPincode(e.target.value)}  />
                                        {errors.pincode && <div className="error-message" style={{color:'red'}}>{errors.pincode}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="big mb-1" htmlFor="MainAddress">Main Address<span style={{color:'red'}}>*</span> :</label>
                                        <textarea className="form-control" id="MainAddress" rows="3" placeholder="Enter your main address" value={mainAddress} onChange={(e) => setMainAddress(e.target.value)}></textarea>
                                        {errors.mainAddress && <div className="error-message" style={{color:'red'}}>{errors.mainAddress}</div>}
                                    </div>
                                </div>

                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="big mb-1" htmlFor="Latitude">Lattitude<span style={{color:'red'}}>*</span> :</label>
                                        <input className="form-control" id="lattitude" type="text" placeholder="Enter your lattitude" value={lattitude} onChange={(e) => setLattitude(e.target.value)}  />
                                        {errors.lattitude && <div className="error-message" style={{color:'red'}}>{errors.lattitude}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="big mb-1" htmlFor="Longitude">Longitude<span style={{color:'red'}}>*</span> :</label>
                                        <input className="form-control" id="Longitude" rows="3" placeholder="Enter your Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)}></input>
                                        {errors.longitude && <div className="error-message" style={{color:'red'}}>{errors.longitude}</div>}
                                    </div>
                                </div>

                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                    <label htmlFor="password" className="big mb-1">Password<span style={{color:'red'}}>*</span> :</label>
                                    <input
                                        type={values.showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span
                                        className={`fas ${values.showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                        onClick={togglePasswordVisibility}
                                        style={{ cursor: 'pointer' }}
                                    ></span>
                                    {errors.password && <div className="error-message" style={{color:'red'}}>{errors.password}</div>}
                                    {password && (
                                        <div>
                                            <div style={{ color: passwordValidations.upperCase ? 'green' : 'red' }}>
                                                {passwordValidations.upperCase ? 'Contains uppercase letter ✓' : 'Requires at least one uppercase letter'}
                                            </div>
                                            <div style={{ color: passwordValidations.lowerCase ? 'green' : 'red' }}>
                                                {passwordValidations.lowerCase ? 'Contains lowercase letter ✓' : 'Requires at least one lowercase letter'}
                                            </div>
                                            <div style={{ color: passwordValidations.digit ? 'green' : 'red' }}>
                                                {passwordValidations.digit ? 'Contains digit ✓' : 'Requires at least one digit'}
                                            </div>
                                            <div style={{ color: passwordValidations.specialChar ? 'green' : 'red' }}>
                                                {passwordValidations.specialChar ? 'Contains special character ✓' : 'Requires at least one special character'}
                                            </div>
                                            <div style={{ color: passwordValidations.length ? 'green' : 'red' }}>
                                                {passwordValidations.length ? 'Length between 8 and 16 characters ✓' : 'Requires length between 8 and 16 characters'}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                    <div className="col-md-6">
                                    <label htmlFor="confirmPassword" className="big mb-1">Confirm Password<span style={{color:'red'}}>*</span> :</label>
                                <input
                                    type={values.showConfirmPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                  <span
                                    className={`fas ${values.showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                    onClick={toggleConfirmPasswordVisibility}
                                    style={{ cursor: 'pointer' }}
                                ></span>
                                {errors.confirmPassword && <div className="error-message" style={{color:'red'}}>{errors.confirmPassword}</div>}

                                </div>
                                </div>
    
                                <div className="mb-3">
                                    <label className="big mb-1" htmlFor="ProfilePhoto">Profile Photo</label>
                                    <input className="form-control" id="ProfilePhoto" type="file" onChange={onFileChange} />
                                    {/* {errors.profilePhoto && <div className="error-message"style={{color:'red'}}>{errors.profilePhoto}</div>} */}
                                </div>
                                </div>
    
                                <div className="form-group">
                                 <div className="row justify-content-center">
                                 <div className="col text-center">
                                    <button className='registration-button' type="submit" disabled={isLoading}>
                                         {isLoading ? 'Loading...' : 'Register'}
                                    </button>
                                    </div>
                                         {isSuccess && <div className="success-message">{successMessage}</div>}
                                         {errorMessage && <div className="error-message">{errorMessage}</div>}
                                  
                                 </div>
                                 </div>
                        </form>
                        <div className="text-center mt-3 login-link">
                            Already a member?{' '}
                            <Link href="/Patientlogin">
                                <a>Login</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientRegistrations;
