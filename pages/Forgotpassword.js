import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { generateOTP } from '../actions/forgotpasswordAction';
import Router from 'next/router';

const ForgotPasswordPage = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleGenerateOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await generateOTP(mobileNumber);
      setMessage(response.message);
      setError('');
      if (response.message === 'OTP generated successfully') {
        
        Router.push('/OTPform');
      }
    } catch (err) {
      setMessage('');
      setError('Failed to generate OTP');
    }
  };

  return (
    <>

    <Head>
    <title>Forgot Password</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="title" content='Forgot Password' />
      <link rel="icon" href="/images/title_logo.png" />
    </Head>


      <div id="wrapper">
        <div className="content-page">
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card mb-4" style={{ width: "900px", marginTop: "70px" }}>
                    <div className="card-header">Forgot Password</div>
                    <div className="card-body" style={{ maxWidth: "1000px" }}>
                      <form onSubmit={handleGenerateOTP}>
                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label className="small mb-1" htmlFor="admin_mobile_no"> Enter your Mobile Number and we'll send you an OTP to reset your password.
                            </label>
                            <input
                              className="form-control"
                              id="admin_mobile_no"
                              type="text"
                              placeholder="Enter Your Mobile Number"
                              name="admin_mobile_no"
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                              required
                              style={{ width: "150%" }}
                            />
                          </div>
                        </div>
                        <button className="btn btn-primary" type="submit" style={{ backgroundColor: "#87CEFA", borderColor: "#87CEFA", width: "30%" }}>Send OTP</button>
                        <div className="d-flex justify-content-between mt-4">
                          <a className="" href="/login">Login</a>
                          <a className="" href="/Registration">Register</a>
                        </div>
                      </form>
                      {message && <div className="alert alert-success mt-3">{message}</div>}
                      {error && <div className="alert alert-danger mt-3">{error}</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
