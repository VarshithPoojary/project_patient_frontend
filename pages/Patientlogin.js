import Link from 'next/link';
import React, { useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', { email });
    };

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                <b className="login-text" style={{ marginRight: "60%" ,marginTop:"10%"}}>LOGIN</b>
                    <form className="login  mt-3" onSubmit={handleSubmit}>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="admin_email" style={{ width: "200%" }}>Enter your Email and we'll send you an OTP to login.</label>
                                <input
                                    className="form-control"
                                    id="admin_email"
                                    type="email"
                                    placeholder="Enter Your Email"
                                    name="admin_email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{ width: "200%" }}
                                />
                            </div>
                        </div>
                        <Link href="/PatientLoginOTP">
                            <button type="submit" className="button login__submit">
                                <span className="button__text">Enter OTP</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>
                        </Link>
                        <div className="text-center mt-3 login-link">
                            Don't have account?{' '}
                            <div>
                            <Link href="/PatientRegistration">
                                <a>Register Here</a>
                            </Link>
                            </div>
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
    );
};

export default LoginForm;
