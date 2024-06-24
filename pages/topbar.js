import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Badge } from 'react-bootstrap';
import Link from 'next/link';
import Router from 'next/router';
import { FaHome, FaBell, FaCog, FaCalendar, FaComment, FaUser, FaPhone, FaEnvelope, FaCalendarAlt, FaTransgender } from 'react-icons/fa';
import { patient_list_by_id } from '../actions/patientAction';

const Topbar = () => {
  const defaultProfileImage = '/images/userLogo.jpeg';
  const [values, setValues] = useState({
    patient_list: [],
    patient_first_name: '',
    patient_last_name: '',
    patient_phone_number: '',
    patient_country_code: '',
    patient_dob: '',
    patient_gender: '',
    patient_email: '',
    patient_address: '',
    patient_country_id: '',
    patient_state_id: '',
    patient_area_id: '',
    patient_pincode: '',
    patient_main_address: '',
    patient_profile_image: '',
    patient_password: '',
    error: '',
    loading: false,
    message: '',
    showForm: false, 
    address: {},
    countrydetail: [],
    statedetail: [],
    citydetail: [],
    bannerList: [],
    isEditingAddress: false,
    isEditingDetails: false,
  });

  const { patient_list, patient_first_name, patient_last_name, patient_phone_number, patient_country_code, patient_dob, patient_gender, patient_email, patient_address, patient_country_id, patient_state_id, patient_area_id, patient_pincode, patient_main_address, patient_register_status, password, patient_city_id, patient_profile_image, countrydetail, statedetail, citydetail, bannerList, error, loading, isEditingAddress, isEditingDetails } = values;

  const notificationCount = 0; 
  const messageCount = 0; 

  useEffect(() => {
    const user_id = localStorage.getItem('id');
    if (!user_id) {
      Router.push('/Patientlogin');
    } else {
      loadUserDetails(user_id);
    }
  }, []);

  const loadUserDetails = (user_id) => {
    patient_list_by_id(user_id).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        const patientData = data.patient_list[0];
        setValues({
          ...values,
          patient_first_name: patientData.patient_first_name,
          patient_last_name: patientData.patient_last_name,
          patient_phone_number: patientData.patient_phone_number,
          patient_country_code: patientData.patient_country_code,
          patient_dob: patientData.patient_dob,
          patient_gender: patientData.patient_gender,
          patient_email: patientData.patient_email,
          patient_address: patientData.patient_address,
          patient_country_id: patientData.patient_country_id,
          patient_state_id: patientData.patient_state_id,
          patient_area_id: patientData.patient_area_id,
          patient_pincode: patientData.patient_pincode,
          patient_main_address: patientData.patient_main_address,
          patient_register_status: patientData.patient_register_status,
          patient_password: patientData.patient_password,
          patient_profile_image: patientData.patient_profile_image || defaultProfileImage,
        });
      }
    }).catch(error => {
      console.error('Error:', error);
    });
  }

  const handleLogout = () => {
    localStorage.removeItem('id');
    Router.push('/Home');
  };

  const handleProfile = () => {
    Router.push('/PatientProfileUI');
  };

  return (
    <div className="navbar-custom" style={{ zIndex: '1' }}>
      <ul className="list-unstyled topnav-menu float-right mb-10">
        <li className="notification-list" style={{ float: 'left', marginRight: '700px', pointerEvents: 'none' }}>
          <a href="#" className="topbar-nav-link nav-user mr-0 waves-effect waves-light">
            <span className="d-flex flex-column align-items-center">
              <img src="/images/title_logo.png" alt="Profile" style={{ width: '40px', height: '40px' }} />
            </span>
          </a>
        </li>
        <li className="dropdown notification-list" style={{ zIndex: '2' }}>
          <Link href="/dashboard">
            <a className="topbar-nav-link nav-user mr-0 waves-effect waves-light">
              <span className="d-flex flex-column align-items-center">
                <FaHome size={20} />
                <span>Home</span>
              </span>
            </a>
          </Link>
        </li>
        <li className="dropdown notification-list">
        <Link href="/Doctor/specialistView">
          <a  className="topbar-nav-link nav-user mr-0 waves-effect waves-light">
            <span className="d-flex flex-column align-items-center">
              <FaCalendar size={20} />
              <span>Appointment</span>
            </span>
          </a>
          </Link>
        </li>
        <li className="dropdown notification-list">
          <a href="#" className="topbar-nav-link nav-user mr-0 waves-effect waves-light">
            <span className="d-flex flex-column align-items-center position-relative" >
              <FaComment size={20} />
              <Badge pill bg="danger" className="position-absolute top-0 start-50 translate-middle"  style={{marginTop:'7px',marginLeft:'8px', fontSize: '0.6em' }}>
                {messageCount}
              </Badge>
              <span>Message</span>
            </span>
          </a>
        </li>
        <li className="dropdown notification-list">
          <a href="#" className="topbar-nav-link nav-user mr-0 waves-effect waves-light">
            <span className="d-flex flex-column align-items-center position-relative" >
              <FaBell size={20} />
              <Badge pill bg="danger" className="position-absolute top-0 start-50 translate-middle" style={{marginTop:'7px',marginLeft:'8px', fontSize: '0.6em' }}>
                {notificationCount}
              </Badge>
              <span>Notification</span>
            </span>
          </a>
        </li>
        <li className="dropdown notification-list">
          <a href="#" className="topbar-nav-link nav-user mr-0 waves-effect waves-light">
            <span className="d-flex flex-column align-items-center">
              <FaCog size={20} />
              <span>Settings</span>
            </span>
          </a>
        </li>
        <li className="dropdown notification-list">
          <Dropdown alignRight>
            <Dropdown.Toggle variant="link" id="dropdown-basic">
              <span className="d-flex flex-column align-items-center position-relative">
                <img src={values.patient_profile_image} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item disabled style={{ pointerEvents: 'none' }}>
                <div className="profile-info">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ color: 'black', fontSize: '16px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                      {values.patient_first_name} {values.patient_last_name}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaPhone style={{ marginRight: '5px' }} />
                    <div>{values.patient_phone_number}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaEnvelope style={{ marginRight: '5px' }} />
                    <div>{values.patient_email}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaCalendarAlt style={{ marginRight: '5px' }} />
                    <div>{values.patient_dob}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaTransgender style={{ marginRight: '5px' }} />
                    <div>{values.patient_gender}</div>
                  </div>
                </div>
                <hr style={{ margin: '5px 0' }} />
              </Dropdown.Item>
              <Link href="/PatientProfileUI">
                <Dropdown.Item onClick={handleProfile}>View Profile</Dropdown.Item>
              </Link>
              <Link href="/settings">
                <Dropdown.Item>Settings</Dropdown.Item>
              </Link>
              <Link href="/Patientlogin">
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    </div>
  );
};

export default Topbar;
