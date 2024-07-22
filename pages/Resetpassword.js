import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { resetPassword } from '../actions/forgotpasswordAction';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
   password:'',
   confirmPassword:''
});
  

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const validationErrors = {};
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      validationErrors.password = 'Please enter your new password.';
    } else if (!passwordRegex.test(password)) {
      validationErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long';
    } else if (!confirmPassword) {
      validationErrors.confirmPassword = 'Please enter confirm password.';
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match.';
    } 
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTimeout(() => 
        setErrors(''),
       2000);
      return;
    }
  
    const patient_email = localStorage.getItem('userEmail');
        try {
          const passwordData = {
            patient_email: patient_email,
            password: password,
          };
      const response = await resetPassword(passwordData);
      if (response.error) {
        setErrorMessage(response.error);
      } else {
        setMessage('Password changed successfully');
        setPassword('');
        setConfirmPassword('');
        localStorage.removeItem('userEmail');
        setTimeout(() => Router.push('/Patientlogin'), 1000);
      } 
    } catch (err) {
      console.error('Error resetting password:', err); 
      setErrorMessage('Failed to reset password');
    }
  };
  
  
  return (
    <>
      <Head>
        <title>Reset Password</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content='Reset_password' />
      </Head>

      <div id="wrapper">
       
         
      <div className="card mb-4" style={{ width: "500px", margin: "auto", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
  

                    <div className="card-header">Reset Password</div>
                    <div className="card-body">
                      <form onSubmit={handleResetPassword}>
                      <div className="mb-3">
    <label htmlFor="password" className="form-label">New Password</label>
    <input
        className="form-control"
        id="password"
        type="password"
        placeholder="Enter New Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
    />
      {errors.password && <div className="error-message" style={{color:'red'}}>{errors.password}</div>}
</div>
<div className="mb-3">
    <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
    <input
        className="form-control"
        id="confirm_password"
        type="password"
        placeholder="Confirm New Password"
        name="confirm_password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
    />
     {errors.confirmPassword && <div className="error-message" style={{color:'red'}}>{errors.confirmPassword}</div>}
</div>

                        <button className="btn btn-primary" type="submit" style={{ backgroundColor: "#87CEFA", borderColor: "#87CEFA" }}>Update</button>
                      </form>
                      <div className="mt-3 text-center">
                        <Link href="/Patientlogin">Login</Link>
                      </div>
                      {message && <div className="alert alert-success mt-3">{message}</div>}
                      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                    </div>
                  </div>
         
       
      </div>
    </>
  );
};

export default ResetPasswordPage;
