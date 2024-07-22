import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Topbar from './topbar';
import Modal from 'react-modal';
import { FaCheck } from 'react-icons/fa';
import { patient_list_by_id, update_patient } from '../actions/patientAction';

const PatientEditPassword = () => {
  const [values, setValues] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
    error: '',
    success: '',
    loading: false,
    showPassword: false, 
    showConfirmPassword: false, 
    step: 1,
  });

  const [storedPassword, setStoredPassword] = useState('');
  const [profileImage, setProfileImage] = useState('null');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { old_password, new_password, confirm_password, error, success, step } = values;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user_id = localStorage.getItem('id');
      if (!user_id) {
        Router.push('/Patientlogin');
      } else {
        loadUserDetails(user_id);
      }
    }
  }, []);

  const loadUserDetails = async (user_id) => {
    try {
      const data = await patient_list_by_id(user_id);
      if (data.error) {
        console.log(data.error);
        setValues({ ...values, error: data.error, loading: false });
      } else {
        const patientData = data.patient_list[0];
        setStoredPassword(patientData.password);
        setProfileImage(patientData.patient_profile_image);
      }
    } catch (err) {
      console.error('Error fetching patient details:', err);
      setValues({ ...values, error: 'Error fetching patient details', loading: false });
    }
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleOldPasswordSubmit = (e) => {
    e.preventDefault();
    if (old_password !== storedPassword) {
    setValues({ ...values, error: 'Old password is incorrect' });
    setTimeout(() => {
        setValues({ ...values, error:'' });
        }, 2000);
    } else {
    setValues({ ...values,error:'', success: 'Old password verified' });
    setTimeout(() => {
    setValues({ ...values, step: 2, showPassword: false, success: '' });
    }, 2000);
    }
    };
    

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();

    if (!new_password || !confirm_password) {
      setValues({ ...values, error: 'Please enter both new password and confirm password' });
      return;
    }

    if (new_password !== confirm_password) {
      setValues({ ...values, error: 'New password and confirm password do not match' });
      return;
    }

    const patient_id = localStorage.getItem('id');

    const formData = new FormData();
    formData.append('patient_id', patient_id);
    formData.append('demoimg', profileImage);
    formData.append('password', new_password);

    try {
      const response = await update_patient(formData);
      if (response.error) {
        setValues({ ...values, error: response.error });
      } else {
        setIsModalOpen(true);

      }
    } catch (error) {
      console.error('Error:', error);
      setValues({ ...values, error: 'Error updating password', loading: false });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    Router.push('/PatientProfileUI');
};

  const togglePasswordVisibility = () => {
    setValues({ ...values, showPassword: !values.showPassword });
};

const toggleConfirmPasswordVisibility = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
};

  const Cancel = () => {
    Router.push('/PatientProfileUI');
  };

  return (
    < >
                  <Topbar />
    <div className="container userPasswordEdit-container">
      <Head>
        <title>Edit Password</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="Edit Password" />
        <link rel="icon" href="/images/title_logo.png" />
      </Head>
        <div className="userPasswordEdit-card">
          <img src="/images/padlock.png" alt="Protected Page" className="userPasswordEdit-image" />
          {/* <h1 className="userPasswordEdit-title">Verify Password</h1> */}
          {step === 1 && (
            <form className="userPasswordEdit-form" onSubmit={handleOldPasswordSubmit} noValidate>
                        <h1 className="userPasswordEdit-title">Verify Password</h1>
                        <div className="userPasswordEdit-field">
                        <label className="userPasswordEdit-label" htmlFor="oldPassword">Old Password</label>
                        <div className="password-input-container">
        <input
          className="userPasswordEdit-input"
          id="oldPassword"
          type={values.showPassword ? 'text' : 'password'}
          value={old_password}
          onChange={handleChange('old_password')}
          placeholder="Enter password"
          required
        />
        <span
          className={`fas ${values.showPassword ? 'fa-eye-slash' : 'fa-eye'} userPassword-toggle-icon`}
          onClick={togglePasswordVisibility}
        ></span>
      </div>
      </div>
              {error && <div className="userPasswordEdit-error">{error}</div>}
              {success && <div className="userPasswordEdit-success">{success}</div>}
              <button type="submit" className="userPasswordEdit-submit">Submit</button>
            </form>
          )}
          {step === 2 && (
            <form className="userPasswordEdit-form" onSubmit={handleNewPasswordSubmit} noValidate>
                        <h1 className="userPasswordEdit-title">Change Password</h1>
              <div className="userPasswordEdit-field">
                <label className="userPasswordEdit-label" htmlFor="newPassword">New Password</label>
                <div className="password-input-container">
                <input
                  className="userPasswordEdit-input"
                  id="newPassword"
                  type={values.showPassword ? 'text' : 'password'}
                  value={new_password}
                  onChange={handleChange('new_password')}
                  placeholder="Enter your new password"
                  required
                />
                 <span
          className={`fas ${values.showPassword ? 'fa-eye-slash' : 'fa-eye'} userPassword-toggle-icon`}
          onClick={togglePasswordVisibility}
        ></span>
        </div>
              </div>
              <div className="userPasswordEdit-field">
                <label className="userPasswordEdit-label" htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input-container">
                <input
                
                  className="userPasswordEdit-input"
                  id="confirmPassword"
                  type={values.showConfirmPassword ? 'text' : 'password'}
                  value={confirm_password}
                  onChange={handleChange('confirm_password')}
                  placeholder="Confirm your new password"
                  required
                />
                <span
          className={`fas ${values.showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} userPassword-toggle-icon`}
          onClick={toggleConfirmPasswordVisibility}
        ></span>
        </div>
              </div>
              {error && <div className="userPasswordEdit-error">{error}</div>}
              <button type="submit" className="userPasswordEdit-submit">Update</button>
            </form>
          )}
        </div>
    </div>
    <Modal isOpen={isModalOpen} className="appointmentView-modal" overlayClassName="appointmentView-modal-overlay">
        <FaCheck className='Right-Icon'/>
        <h2>Password Updated</h2>
        <p>Your password has Successfully updated.</p>
        <button  onClick={closeModal} className="appointmentView-close-button">OK</button>
      </Modal>
    </>

  );
};

export default PatientEditPassword;
