import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { FaHome, FaBell,FaUser, FaCog } from 'react-icons/fa';
import { FiHome, FiBell, FiSettings, FiUser } from 'react-icons/fi'; 
import { admin_details_by_id } from '../actions/adminprofileAction';

const Topbar = () => {
  const defaultProfileImage = '/images/userLogo.jpeg';
  const [adminProfileImage, setAdminProfileImage] = useState(defaultProfileImage);

  useEffect(() => {
    const user_id = localStorage.getItem('id');
    if (user_id === "" || user_id === null || user_id === undefined) {
      Router.push('/Patientlogin');
    } else {
      loadUserDetails(user_id);
    }
  }, []);

  const loadUserDetails = (user_id) => {
    admin_details_by_id(user_id).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        const adminData = data.admin_list[0];
        setAdminProfileImage(adminData.admin_profile_image || defaultProfileImage);
      }
    }).catch(error => {
      console.error('Error:', error);
    });
  }

  return (
    <div className="navbar-custom">
      <ul className="list-unstyled topnav-menu float-right mb-0">
        <li className="dropdown notification-list">
          <Link href="/dashboard">
            <a className="topbar-nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown"  role="button" aria-haspopup="false" aria-expanded="false">
              <span className="d-flex flex-column align-items-center">
                <FaHome size={20} />
                <span style={{size:'10px'}}>Dashboard</span>
              </span>
            </a>
          </Link>
        </li>
        <li className="dropdown notification-list">
          <a href="#" className="topbar-nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
            <span className="d-flex flex-column align-items-center">
              <FaBell size={20} />
              <span>Notification</span>
            </span>
          </a>
        </li>
        <li className="dropdown notification-list">
          <a href='#' className="topbar-nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
            <span className="d-flex flex-column align-items-center">
              <FaCog size={20} />
              <span>Settings</span>
            </span>
          </a>
        </li>
        <li className="dropdown notification-list">
          <Link href="/Adminprofileui">
            <a  className="topbar-nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
              <span className="d-flex flex-column align-items-center">
                <FaUser size={20} />
                <span>Profile</span>
              </span>
            </a>
          </Link>
        </li>
        <li className="dropdown notification-list">
          <Link href='/Adminprofileui'>
            <a  className="topbar-nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" role="button" aria-haspopup="false" >
              <img src={adminProfileImage} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Topbar;
