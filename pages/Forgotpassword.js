import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { patient_forgot_Password_OTP } from '../actions/forgotpasswordAction';
import Router from 'next/router';

const ForgotPasswordPage = () => {
  const [patient_phone_number, setPatient_phone_number] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleGenerateOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await patient_forgot_Password_OTP(patient_phone_number);
      if(response.error)
        {
          setError(response.error);
          setTimeout(() => {
            setError('');
          }, 1000);
          
        }
        else{
          localStorage.setItem('userPhone',patient_phone_number);
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


      <div id="wrapper">
        
                  <div className="card mb-4" style={{ width: "900px", margin: "auto", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <div className="card-header">Forgot Password</div>
                    <div className="card-body" style={{ maxWidth: "1000px" }}>
                      <form onSubmit={handleGenerateOTP}>
                        <div className="row gx-3 mb-3">
                          <div className="col-md-6">
                            <label className="small mb-1" htmlFor="patient_phone_number">Enter your phone number and you will receive an OTP to your registered Email.
                            </label>
                            <input
                              className="form-control"
                              id="patient_phone_number"
                              type="patient_phone_number"
                              placeholder="Enter Your Mobile Number"
                              name="patient_phone_number"
                              value={patient_phone_number}
                              onChange={(e) => setPatient_phone_number(e.target.value)}
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
