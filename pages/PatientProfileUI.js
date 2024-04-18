import React from 'react';
import Link from 'next/link';

const PatientProfile = () => {
  return (
    <section className="section about-section gray-bg" id="about">
      <style>
        {`
          body {
            color: #6F8BA4;
            margin-top: 20px;
          }

          .section {
            padding: 100px 0;
            position: relative;
          }

          .gray-bg {
            background-color: #f5f5f5;
          }

           img {
            max-width: 100%;
            vertical-align: middle;
            border-style: none;
          }    

          
          .about-avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 100px;
            margin-bottom:500px;
          }

          .about-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .patientcard {
            background-color: #f5f5f5;
            border-radius: 10px;
            box-shadow: 0 0 30px rgba(31, 45, 61, 0.125);
            padding: 20px;
            margin-bottom: 200px;
            top:50%;
            left:50%;
            display: flex;
            width: 800px;
            align-items: center;
            justify-content: space-between;
          }

          .card-content {
            flex: 2;
            margin-bottom: 20px;
            margin-top: 20px;
            width: calc(50% - 20px);
          }

          .patient-profile-fields {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .patient-profile-fields label {
            font-weight: 600;
          }

          .patient-profile-fields input[type="text"] {
            border: none;
            border-bottom: 1px solid #ccc;
            padding: 5px;
            width: 100%;
          }

          .patient-profile-fields input[readonly] {
            background-color: #f9f9f9;
          }
          
          .field-divider {
            border-bottom: 1px solid #ccc;
            margin-bottom: 10px;
          }

            .btn-container {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
          }

          .profile-edit-btn, .profile-back-btn {
            border: none;
            border-radius: 1rem;
            width: 45%;
            padding: 10px;
            font-weight: 600;
            color: white;
            cursor: pointer;
          }

          .profile-edit-btn {
            background-color: grey;
          }

          .profile-back-btn {
            background-color: grey;
          }

          .profile-edit-btn:hover, .profile-back-btn:hover {
            background-color: #0056b3;
          }
        `}
      </style>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="patientcard">
              <div className="about-avatar">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt="" />
              </div>
              <div className="card-content">
                <h3 style={{ color: '#666' }}>Patient Profile</h3>
                <div className="patient-profile-fields">
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6 mt-4">
                      <label>First Name</label>
                      <input type="text" readOnly />
                    </div>
                    <div className="col-md-6 mt-4">
                      <label>Last Name</label>
                      <input type="text" readOnly />
                    </div>
                  </div>
                  <div className="field-divider"></div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label>Email</label>
                      <input type="text" readOnly />
                    </div>
                    <div className="col-md-6">
                      <label>Mobile Number</label>
                      <input type="text" readOnly />
                    </div>
                  </div>
                  <div className="field-divider"></div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label>Date Of Birth</label>
                      <input type="text" readOnly />
                    </div>
                    <div className="col-md-6">
                      <label>Gender</label>
                      <input type="text" readOnly />
                    </div>
                  </div>
                  <div className="field-divider"></div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-12">
                      <label>Address</label>
                      <input type="text" readOnly />
                    </div>
                  </div>
                </div>
                <div className="btn-container">
                 <Link href="/PatientEditProfile">
                <input type="button" className="profile-edit-btn"  value="Edit" />
                </Link>
                  <button className="profile-back-btn">Home Page</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientProfile;
