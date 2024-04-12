import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { verifyOTP } from '../actions/forgotpasswordAction';

const OTPPage = () => {
  const [otpDigits, setOtpDigits] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleOtpChange = (e) => {
    setOtpDigits(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form...');
    try {
      const response = await verifyOTP(otpDigits); 
      setMessage(response.message);
      setError('');
      if (response.message === 'OTP verified successfully') {
        Router.push('/Dashboard');
      }
    } catch (err) {
      setMessage('');
      setError('Failed to verify OTP');
    }
  };

  return (
    <>
      <Head>
        <title>OTP</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="Admin_Profile" />
      </Head>

      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <b className="login-text" style={{ marginRight: "70%" ,marginTop:"10%"}}>OTP</b>
            <form className="login mt-3" onSubmit={handleSubmit}>
              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="admin_otp" style={{ width: "200%" }}>
                    Enter OTP sent to your Email
                  </label>
                  <div className="otp-container">
                    <input
                      className="form-control"
                      id="admin_otp"
                      type="text"
                      placeholder="Enter OTP"
                      value={otpDigits}
                      onChange={handleOtpChange}
                      style={{ width: "150%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="d-grid">
                <button className="button login__submit" type="submit">
                  <span className="button__text">Login</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              </div>
            </form>
            {message && <div className="alert alert-success mt-1">{message}</div>}
            {error && <div className="alert alert-danger mt-1">{error}</div>}
            <div className="mt-9 text-center" style={{ marginRight: "20%"}}>
              <Link href="/Patientlogin">Back</Link>
              <span>&nbsp;|&nbsp;</span>
              <Link href="/ResendOTP">Resend OTP</Link>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPPage;
