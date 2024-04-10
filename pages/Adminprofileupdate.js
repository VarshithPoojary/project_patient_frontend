import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Topbar from './topbar';
import Header from './Header';
import { FiCamera } from 'react-icons/fi'; 
import Head from 'next/head';
import Router from 'next/router';
import { admin_details_by_id, update_admin } from '../actions/adminprofileAction';

const UserProfileUpdate = () => {
    const [profileImage, setProfileImage] = useState(null);
    const defaultProfileImage = '/images/userLogo.jpeg';
    const [values, setValues] = useState({
        admin_firstname: '',
        admin_lastname: '',
        admin_password: '',
        admin_mobile_no: '',
        admin_email: '',
        admin_username: '',
        admin_type: '',
        admin_profile_image: '',
        error: '',
        loading: false,
    });

    const { admin_firstname, admin_lastname, admin_password, admin_profile_image, admin_mobile_no, admin_email, admin_username, admin_type, error, loading } = values;

    useEffect(() => {
        const user_id = localStorage.getItem('id');
        if (!user_id) {
            Router.push('/login');
        } else {
            loadUserDetails(user_id);
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
                        admin_profile_image: adminData.admin_profile_image || defaultProfileImage,
                        admin_mobile_no: adminData.admin_mobile_no,
                        admin_password: adminData.admin_password,
                        loading: false
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setValues({ ...values, error: 'Error: Network request failed', loading: false });
            });
    };

    const onFileChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    
const handleSubmit = async (e) => {
    e.preventDefault();
    const admin_id = localStorage.getItem('id');   
        const formData = new FormData();
            formData.append('admin_id', admin_id);
            formData.append('admin_firstname', admin_firstname);
            formData.append('admin_lastname', admin_lastname);
            formData.append('demoimg', profileImage);
            formData.append('admin_password', admin_password);
            formData.append('admin_mobile_no', admin_mobile_no);
            formData.append('admin_email', admin_email);
            formData.append('admin_username', admin_username);
            formData.append('admin_type', admin_type);
 

    try {
        const response = update_admin(formData); 
        if (response.error) {
            setValues({ ...values, error: response.error });
        } else {
            Router.push(`/dashboard`);
        }
    } catch (error) {
        console.error('Error:', error);
        setValues({ ...values, error: 'Error updating profile', loading: false });
    }
};


    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    const Cancel = () => {
        const user_id = localStorage.getItem("id");
        loadUserDetails(user_id);
    };

    return (
        <div>
            <Head>
                <title>Edit Profile</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Edit Profile' />
                <link rel="icon" href="/images/title_logo.png" />

            </Head>
            <Header />
            <Topbar />
            <div className="container">
                <form role="form" onSubmit={handleSubmit}>
                    <div className="row gutters">
                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="card h-100" style={{ Top: '50%', left: '50%', marginTop: '80px', maxHeight: '400px' }}>
                                <div className="card-body">
                                    <div className="user-profile text-center">
                                        <label htmlFor="fileInput">
                                        <div className="user-avatar" style={{ position: 'relative', display: 'inline-block' }}>
                                            <img src={admin_profile_image} alt="Admin Profile" style={{ width: '90px', height: '90px', borderRadius: '50%', cursor: 'pointer' }} />
                                            <div style={{ position: 'absolute', bottom: '0', left: '0', zIndex: '1' }}>
                                                <span style={{ color: 'black', cursor: 'pointer',width:'100%' }}><FiCamera /></span>
                                            </div>
                                            <div className='img-update' style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', cursor: 'pointer', zIndex: '2' }}>
                                                <input type="file" onChange={onFileChange} id="fileInput" style={{ display: 'none' }} />
                                            </div>
                                        </div>

                                        </label>
                                        <h5 className="user-name">{`${admin_firstname} ${admin_lastname}`}</h5>
                                        <h6 className="user-type">{admin_type}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                            <div className="card h-100" style={{ Top: '50%', left: '20%', marginTop: '80px', maxHeight: '400px' }}>
                                <div className="card-body">
                                    <div className="row gutters">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <h6 className="mb-2 text-primary">Personal Details</h6>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="admin-profile-form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" className="form-control" id="firstName" placeholder="Enter first name" value={ admin_firstname} onChange={handleChange('admin_firstname')} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="admin-profile-form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" className="form-control" id="lastName" placeholder="Enter last name" value={ admin_lastname} onChange={handleChange('admin_lastname')} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="admin-profile-form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter email" value={ admin_email} onChange={handleChange('admin_email')} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="admin-profile-form-group">
                                        <label htmlFor="mobileNumber">Mobile Number</label>
                                        <input type="text" className="form-control" id="mobileNumber" placeholder="Enter mobile number" value={ admin_mobile_no} onChange={handleChange('admin_mobile_no')} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="admin-profile-form-group">
                                        <label htmlFor="userName">Username</label>
                                        <input type="text" className="form-control" id="userName" placeholder="Enter username" value={ admin_username} onChange={handleChange('admin_username')} />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div className="admin-profile-form-group">
                                        <label htmlFor="userType">User type</label>
                                        <select
                                    
                                    className="form-control"
                                        id="userType"
                                        value={admin_type}
                                         onChange={handleChange('admin_type')}>
                                        <option value="admin">Admin</option>
                                        <option value="doctor">Doctor</option>
                                        <option value="patient">Patient</option>
                                    </select>
                                    </div>
                                </div>
                                    </div>
                                    <div className="row gutters">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="text-right">
                                                <Link href="/Adminprofileui">
                                                    <button type="button" className="btn btn-primary mr-2" style={{     background: "linear-gradient(to top, #7ebce9, #1e7bb5)", borderColor: "#0c9da8", marginTop:"10px" }}>Profile</button>
                                                </Link>
                                                <button type="submit" className="btn btn-primary mr-2" style={{  background: "linear-gradient(to top, #7ebce9, #1e7bb5)", borderColor: "#0c9da8", marginTop:"10px" }}>Update</button>
                                                {loading && <div className="alert alert-success margin-top-10">Edited Successfully</div>}
                                                <button type="button" className="btn btn-secondary" onClick={Cancel} style={{ marginTop:"10px" }}>Cancel</button>
                                            </div>
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

export default UserProfileUpdate;
