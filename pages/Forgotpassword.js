import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import TopBarHome from './homeTopbar.js';
import { patient_forgot_Password_OTP } from '../actions/forgotpasswordAction';
import Router from 'next/router';


const ForgotPasswordPage = () => {
  const [patient_email, setPatient_email] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleGenerateOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await patient_forgot_Password_OTP(patient_email);
      if(response.error)
        {
          setError(response.error);
          setTimeout(() => {
            setError('');
          }, 1000);
          
        }
        else{
          localStorage.setItem('userEmail',patient_email);
          setMessage("OTP sent to you mail")
          setTimeout(() => {
            setMessage("")
            Router.push('/OTPform');
          }, 1000);
          
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
    <TopBarHome/>

      <div id="wrapper">
        
                  <div className="card mb-4" style={{ width: "900px", margin: "auto", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <div className="card-header">Forgot Password</div>
                    <div className="card-body" style={{ maxWidth: "1000px" }}>
                      <form onSubmit={handleGenerateOTP}>
                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label className="small mb-1" htmlFor="patient_email">Enter your registered Email and you will receive an OTP to your Email.
                            </label>
                            <input
                              className="form-control"
                              id="patient_email"
                              type="patient_email"
                              placeholder="Enter Your Email"
                              name="patient_email"
                              value={patient_email}
                              onChange={(e) => setPatient_email(e.target.value)}
                              required
                              style={{ width: "150%" }}
                            />
                          </div>
                        </div>
                        <button className="btn btn-primary" type="submit" style={{ backgroundColor: "#87CEFA", borderColor: "#87CEFA", width: "30%" }}>Send OTP</button>
                        <div className="d-flex justify-content-between mt-4">
                        <Link href="/Patientlogin">
                                    <a  className="">Login</a>
                                </Link>
                                <Link href="/PatientRegistration">
                                    <a  className="">Registration</a>
                                </Link>
                        </div>
                      </form>
                      {message && <div className="alert alert-success mt-3">{message}</div>}
                      {error && <div className="alert alert-danger mt-3">{error}</div>}
                    </div>
                  </div>
                
      </div>
    </>
  );
};

export default ForgotPasswordPage;
