import Link from 'next/link';
import React, { useState } from 'react';
import Router from 'next/router';
import TopBarHome from './homeTopbar.js';
import Footer from './Footer.js'
import { Patientsignin } from '../actions/patientAction';

const LoginForm = () => {
    const [values, setValues] = useState({
        phone_number: '',
        password: '',
        error: '',
        loading: false,
        showPassword: false, 
    });
    const { phone_number, password, error, loading, showPassword } = values;

    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!phone_number || !password) {
            setValues({ ...values, error: 'Please enter all fields' });
            setTimeout(() => {
                setValues({ ...values, error: '', loading: false });
            }, 1000);
            return;
        }
        setValues({ ...values, loading: true, error: '' });
    
        try {
            const loginData = { phone_number, password };
            const response = await Patientsignin(loginData);
            if (response.error) {
                setValues({ ...values, error: 'Incorrect phone number or password', loading: false });
                setTimeout(() => {
                    setValues({ ...values, error: '', loading: false });
                }, 2000);
            } else {
                localStorage.setItem('id', response.userId);
                setIsSuccess(true);
                setSuccessMessage('Login successful!');
                setValues({ ...values, phone_number: '', password: '', loading: false });
                Router.push('/dashboard');
            } 
        } catch (error) {
            console.error('Error in login:', error);
            setValues({ ...values, error: 'An error occurred during login', loading: false });
        }
    };
    
    const handleChange = (name) => (e) => {
        setValues({ ...values, [name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    return (
        <div style={{width:'100%', backgroundColor:'white'}}>
            <TopBarHome/>
            <div className="container">
                <div className="screen">
                    <div className="screen__content">
                        <b className="login-text">LOGIN</b>
                        <form className="login mt-1" onSubmit={handleSubmit}>
                            <div className="row gx-3 mb-1">
                                <div className="col-md-12">
                                    <label className="small mb-1" htmlFor="phone_number">Enter your Phone Number:</label>
                                    <input
                                        className="form-control"
                                        id="phone_number"
                                        type="text"
                                        placeholder="Enter Your Phone Number"
                                        name="phone_number"
                                        value={phone_number}
                                        onChange={handleChange('phone_number')}
                                    />
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">
                                <div className="col-md-12">
                                    <label className="small mb-1" htmlFor="password">Enter your Password:</label>
                                    <div className="password-input-container">
                                    <input
                                        className="form-control"
                                        id="password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        placeholder="Enter Your Password"
                                        name="password"
                                        value={password}
                                        onChange={handleChange('password')}
                                    />
                                    <span
                                        className={`fas ${values.showPassword ? 'fa-eye-slash' : 'fa-eye'} userPassword-toggle-icon`}
                                        onClick={togglePasswordVisibility}
                                        style={{ cursor: 'pointer' }}
                                    ></span>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="button login__submit">
                                <span className="button__text">Login</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>
                            <Link href="/Forgotpassword">
                                <a>Forgot Password?</a>
                            </Link>
                            <div className="mt-3 login-link">
                                Don't have an account?{' '}
                                <div>
                                    <Link href="/PatientRegistration">
                                        <a>Register Here</a>
                                    </Link>
                                </div>
                                {error && <div className="alert alert-danger mt-1">{error}</div>}
                                {isSuccess && <div className="success-message">{successMessage}</div>}
                            </div>
                        </form>
                    </div>
                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape3"></span>
                        <span className="screen__background__shape screen__background__shape2"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
