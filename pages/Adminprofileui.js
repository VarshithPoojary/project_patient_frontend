import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from './Header';
import Topbar from './topbar';
import Router from 'next/router';
import Swal from 'sweetalert2';
import { admin_details_by_id, DeleteAdminDetails } from '../actions/adminprofileAction';

const AdminProfile = () => {
  const defaultProfileImage = '/images/userLogo.jpeg';
  const [values, setValues] = useState({
    admin_list: [],
    admin_profile_image: '',
    admin_password: '',
    admin_type: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const [bio, setBio] = useState('');
  const { admin_list, admin_profile_image, error, loading } = values;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user_id = localStorage.getItem('id');
      if (user_id === "" || user_id === null || user_id === undefined) {
        Router.push('/login');
      } else {
        loadUserDetails(user_id);
        loadBio(user_id);
      }
    }
  }, []);

  const loadUserDetails = (user_id) => {
    admin_details_by_id(user_id)
      .then(data => {
        if (data.error) {
          console.log(data.error);
          setValues({ ...values, error: data.error, loading: false });
        } else {
          const adminData = data.admin_list[0];
          setValues({
            ...values,
            admin_firstname: adminData.admin_firstname,
            admin_lastname: adminData.admin_lastname,
            admin_username: adminData.admin_username,
            admin_type: adminData.admin_type,
            admin_email: adminData.admin_email,
            admin_mobile_no: adminData.admin_mobile_no,
            admin_profile_image: adminData.admin_profile_image || defaultProfileImage,
            loading: false
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setValues({ ...values, error: 'Error: Network request failed', loading: false });
      });
  };

  const loadBio = (user_id) => {
    const savedBio = localStorage.getItem(`adminBio_${user_id}`);
    if (savedBio) {
      setBio(savedBio);
    }
  };

  const handleBioChange = (e) => {
    const newBio = e.target.value;
    setBio(newBio);
    const user_id = localStorage.getItem('id');
    localStorage.setItem(`adminBio_${user_id}`, newBio);
  };

 
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Profile!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
      if (result.isConfirmed) {
    const user_id = localStorage.getItem("id");
    DeleteAdminDetails(user_id);
    localStorage.removeItem('id');
    Router.push('/login');

  }
});
}

  return (
    <div>
      <Head>
        <title>Admin Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content='Admin_Profile' />
        <link rel="icon" href="/images/title_logo.png" />
      </Head>

      <Topbar />
      <Header />

      <div className=" emp-profile">
        <form method="post">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img" style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden' }}>
                <label htmlFor="fileInput">
                  <img src={admin_profile_image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}></img>
                </label>
                <input id="fileInput" name="file" style={{ display: 'none' }} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h4>{admin_list ? `${values.admin_firstname} ${values.admin_lastname}` : 'Admin Name'}</h4>
                <h5>{admin_list ? `${values.admin_type}` : 'Admin'}</h5>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="" role="tab" aria-controls="home" aria-selected="true">Personal Details</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <Link href="/Adminprofileupdate">
                <input type="button" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
              </Link>
              <Link href="/Adminprofilepasswordupdate">
                <input type="button" className="profile-edit-btn" name="btnAddMore" value="Edit Password" />
              </Link>
              <input type="button" className="profile-edit-btn" name="btnAddMore" value="Delete Profile" onClick={() => handleDelete()} />

            </div>

          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="col-md-8">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Add Bio"
                  value={bio}
                  onChange={handleBioChange}
                ></textarea>
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="row">
                    <div className="col-md-6" >
                      <label>First Name</label>
                    </div>
                    <div className="col-md-6 small-width-input">
                      <input type="text" className="form-control" value={values.admin_firstname} readOnly />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <label>Last Name</label>
                    </div>
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <input type="text" className="form-control" value={values.admin_lastname} readOnly />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <label>Username</label>
                    </div>
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <input type="text" className="form-control" value={values.admin_username} readOnly />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <label>Email</label>
                    </div>
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <input type="text" className="form-control" value={values.admin_email} readOnly />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <label>Mobile Number</label>
                    </div>
                    <div className="col-md-6" style={{ marginTop: '10px' }}>
                      <input type="text" className="form-control" value={values.admin_mobile_no} readOnly />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
