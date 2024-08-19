import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiCamera } from 'react-icons/fi'; 
import Head from 'next/head';
import Router from 'next/router';
import Topbar from './topbar';
import { country_list } from '../actions/countryAction';
import { state_list_by_country_id,state_list } from '../actions/stateAction';
import { city_list_by_state_id,city_list,CityListById } from '../actions/cityAction';
import { patient_list_by_id,update_patient } from '../actions/patientAction';
import LoadingBar from 'react-top-loading-bar'; 


const Patienteditprofile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const defaultProfileImage = '/images/userLogo.png';
  const [values, setValues] = useState({
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
    patient_register_status: '',
    password: '',
    patient_profile_image: '',
    patient_created_date:'',
    countryList:[],
    stateList:[],
    areaList:[],
      error: '',
  });

  const { countryList,stateList,areaList,patient_first_name ,patient_last_name,patient_phone_number,patient_country_code,patient_dob,patient_gender,patient_email,patient_address,patient_country_id,patient_state_id,patient_area_id,patient_pincode,patient_main_address,patient_register_status,password,patient_profile_image,patient_created_date,error } = values;
  const [loading, setLoading] = useState(true); 
  const [progress, setProgress] = useState(0); 
  
  useEffect(() => {
      const user_id = localStorage.getItem('id');
      if (!user_id) {
          Router.push('/Patientlogin');
      } else {
        setProgress(30);
          loadUserDetails(user_id);
      }
  }, []);

  const loadUserDetails = (user_id) => {
    country_list()
      .then(countrydata => {
        if (countrydata.error) {
          console.log(countrydata.error);
        } else {
          state_list().then(state => {
            if (state.error) {
              console.log(state.error);
            } else {
              city_list().then(city => {
                if (city.error) {
                  console.log(city.error);
                } else {
    patient_list_by_id(user_id)
          .then(data => {
              if (data.error) {
                  console.log(data.error);
                  setValues({ ...values, error: data.error, loading: false });
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
                      password: patientData.password,
                      patient_profile_image: patientData.patient_profile_image || defaultProfileImage,
                      patient_created_date: patientData.patient_created_date,
                      countryList:countrydata.admin_country_list,
                      stateList:state.state_list,
                      areaList:city.city_list,
                      loading: false
                  });
              }setProgress(100); 
              setLoading(false); 
          })
          .catch(error => {
              console.error('Error:', error);
              setValues({ ...values, error: 'Error: Network request failed', loading: false });
              setProgress(100); 
              setLoading(false); 
            });
        }
      });
    }
    });
    }
      });
  };

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
    const value = e.target.value;
    if (name === 'patient_gender') {
      setValues({ ...values, patient_gender: value });
    } else {
      setValues({ ...values, [name]: value });
    }
    if (name === "patient_country_id") {
      state_list_by_country_id(value).then(data1 => {
        if (data1.error) {
          console.log(data1.error);
        } else {
          setValues({ ...values, stateList: data1.state_list, patient_country_id: value });
        }
      });
    }
    if (name === "patient_state_id") {
      city_list_by_state_id(value).then(data2 => {
        if (data2.error) {
          console.log(data2.error);
        } else {
          setValues({ ...values, areaList: data2.city_list, patient_state_id: value });
        }
      });
    }
    if (name === "patient_area_id") {
      CityListById(value).then(data3 => {
        if (data3.error) {
          console.log(data3.error);
        } else {
          setValues({ ...values,  patient_area_id: value });
        }
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const patient_id = localStorage.getItem('id'); 
    const countryId = document.getElementById('country').value;
    const stateId = document.getElementById('patient_state_id').value;
    const areaId = document.getElementById('patient_area_id').value;  
        const formData = new FormData();
            formData.append('patient_id', patient_id);
            formData.append('patient_first_name', patient_first_name);
            formData.append('patient_last_name', patient_last_name);
            formData.append('demoimg', profileImage);
            formData.append('patient_phone_number', patient_phone_number);
            formData.append('patient_country_code',patient_country_code );
            formData.append('patient_dob', patient_dob);
            formData.append('patient_gender', patient_gender);
            formData.append('patient_email', patient_email);
            formData.append('patient_address', patient_address);
            formData.append('patient_country_id', countryId);
            formData.append('patient_state_id', stateId);
            formData.append('patient_area_id', areaId);
            formData.append('patient_pincode', patient_pincode);
            formData.append('patient_main_address', patient_main_address);
            formData.append('password', password);
    try {
      const response = await update_patient(formData);
  
      if (response.error) {
        setValues({ ...values, error: response.error });
      } else {
        Router.push(`/PatientProfileUI`);
      }
    } catch (error) {
      console.error('Error:', error);
      setValues({ ...values, error: 'Error updating profile', loading: false });
    }
  };
  
  

  const onFileChange = (e) => {
      setProfileImage(e.target.files[0]);
  };

  const Cancel = () => {
    Router.push(`/PatientProfileUI`);

};


  return (
    <div className="container" style={{ marginTop:'0px'}}>
           <LoadingBar
        color="#3498db"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      /> 
          <Head>
        <title>Edit Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content='Edit Profil' />
        <link rel="icon" href="/images/title_logo.png" />
      </Head>
      <div className="row flex-lg-nowrap">
        <Topbar/>
        <div className="col">
          <div className="row">
            <div className="col mb-3">
              <div className="card" style={{marginTop:'80px'}}>
              <form className="form" onSubmit={handleSubmit} noValidate>
                <div className="card-body" style={{width:'900px',maxWidth:'900px', top: '50%', left: '50%', overflowY: 'auto'}}>
                  <div className="e-profile">
                    <div className="row">
                      <div className="col-12 col-sm-auto mb-3">
                        <div className="mx-auto" style={{ width: '140px' }}>
                          {/* <div className="d-flex justify-content-center align-items-center rounded" style={{ height: '140px', backgroundColor: 'rgb(233, 236, 239)' }}> */}
                          <div className="user-avatar" style={{ position: 'relative', display: 'inline-block' }}>
                         
                          <label htmlFor="fileInput" className="user-avatar" style={{ position: 'relative', display: 'inline-block' }}>
                          <img src={patient_profile_image} alt="Admin Profile" style={{ width: '90px', height: '90px', borderRadius: '50%', cursor: 'pointer' }} />
                          <div style={{ position: 'absolute', bottom: '0', left: '0', zIndex: '1' }}>
                              <span style={{ color: 'black', cursor: 'pointer', width: '100%' }}><FiCamera /></span>
                          </div>
                        </label>
                          <input type="file" onChange={onFileChange} id="fileInput" style={{ display: 'none' }} />

                                        </div>
                                        
                            {/* <span style={{ color: 'rgb(166, 168, 170)', font: 'bold 8pt Arial' }}>140x140</span> */}
                          {/* </div> */}
                        </div>
                      </div>
                  
                      <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                        <div className="text-center text-sm-left mb-2 mb-sm-0">
                          <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">{values.patient_first_name} {values.patient_last_name}</h4>

                          <div className="text-muted"><small>{values.patient_email}</small></div>
                          
                        </div>
                       
                      </div>
                    </div>
            
                    {/* <ul className="nav nav-tabs">
                      <li className="nav-item"><a href="" className="active nav-link">Settings</a></li>
                    </ul> */}
               
                    <div className="tab-content pt-3">
                      <div className="tab-pane active">
                    
                          <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                              <label className="small mb-1" htmlFor="FirstName">First Name*</label>
                              <input className="form-control" id="FirstName" type="text" value={patient_first_name} onChange={handleChange('patient_first_name')}  />
                              
                            </div>
                            <div className="col-md-6">
                              <label className="small mb-1" htmlFor="LastName">Last Name*</label>
                              <input className="form-control" id="LastName" type="text" value={patient_last_name} onChange={handleChange('patient_last_name')}  />
                              
                            </div>
                          </div>

                          <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                              <label className="small mb-1" htmlFor="CountryCode">Country Code*</label>
                              <select className="form-control" id="CountryCode" >
                                <option value="India">India</option>
                              </select>
                            </div>
                            <div className="col-md-6">
                              <label className="small mb-1" htmlFor="Phone">Phone Number*</label>
                              <input className="form-control" id="Phone" type="tel" value={patient_phone_number} onChange={handleChange('patient_phone_number')}  />
                              
                            </div>
                          </div>

                          <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                              <label className="small mb-1" htmlFor="Dob">Date Of Birth*</label>
                              <input className="form-control" id="Dob" type="date" value={patient_dob} onChange={handleChange('patient_dob')} />
                              
                            </div>
                            <div className="col-md-6">
  <label className="small mb-1">Gender*</label><br />
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      id="male"
      name="gender"
      value="male"
      checked={patient_gender === 'male'}
      onChange={handleChange('patient_gender')}
    />
    <label className="form-check-label" htmlFor="male">Male</label>
  </div>
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      id="female"
      name="gender"
      value="female"
      checked={patient_gender === 'female'}
      onChange={handleChange('patient_gender')}
    />
    <label className="form-check-label" htmlFor="female">Female</label>
  </div>
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      id="other"
      name="gender"
      value="Other"
      checked={patient_gender === 'Other'}
      onChange={handleChange('patient_gender')}
    />
    <label className="form-check-label" htmlFor="other">Other</label>
  </div>
</div>

                          </div>

                          <div className="mb-3">
                            <label className="small mb-1" htmlFor="Email">Email*</label>
                            <input className="form-control" id="Email" type="email" onChange={handleChange('patient_email')} value={patient_email}  />
                            
                          </div>

                          <div className="mb-3">
                            <label className="small mb-1" htmlFor="Address">Address*</label>
                            <textarea className="form-control" id="Address" rows="3" onChange={handleChange('patient_address')} value={patient_address}></textarea>
                          </div>

                          <div className="row gx-3 mb-3">
                            <div className="col-md-4">
                              <label className="small mb-1" htmlFor="Country">Country*</label>
                              <select className="form-control" id="country" value={patient_country_id} onChange={handleChange('patient_country_id')} >
                                {countryList.map(country => (
                                    <option key={country._id} value={country._id}>{country.admin_country_name}</option>
                                ))}
                            </select>
                            </div>
                            <div className="col-md-4">
                              <label className="small mb-1" htmlFor="State">State*</label>
                              <select className="form-control" id="patient_state_id"  value={patient_state_id} onChange={handleChange('patient_state_id')} required>
                                                    {stateList.map(state => (
                                                        <option key={state._id} value={state._id}>
                                                            {state.admin_state_name}
                                                        </option>
                                                    ))}
                                                </select>  
                            </div>
                            <div className="col-md-4">
                              <label className="small mb-1" htmlFor="Area">Area*</label>
                              <select className="form-control" id="patient_area_id"  value={patient_area_id} onChange={handleChange('patient_area_id')} required>
                                                    {areaList.map(area => (
                                                        <option key={area._id} value={area._id}>
                                                            {area.admin_city_name}
                                                        </option>
                                                    ))}
                                                </select>  
                            </div>
                          </div>

                          <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                              <label className="small mb-1" htmlFor="Pincode">Pincode*</label>
                              <input className="form-control" id="Pincode" type="text" onChange={handleChange('patient_pincode')} value={patient_pincode} />
                             
                            </div>
                            <div className="col-md-6">
                              <label className="small mb-1" htmlFor="MainAddress">Main Address*</label>
                              <textarea className="form-control" id="MainAddress" rows="3" onChange={handleChange('patient_main_address')} value={patient_main_address} ></textarea>
                            </div>
                          </div>

                      
                          <div className="row">
                            <div className="col d-flex justify-content-end">
                            <button type="submit" className="patient-dashboard-btn" >Update</button>
                            <button type="button" className="patient-dashboard-btn"  onClick={Cancel} style={{marginLeft:'20px'}} >Cancel</button>

                            </div>
                          </div>
                        
                      </div>
                    </div>
                  </div>
                  </div>
                  </form>
                </div>
              </div>
            </div>

            {/* <div className="col-12 col-md-3 mb-3">
              <div className="card mb-3">
                <div className="card-body">
                <Link href="">
                <input type="button" className="profile-back-btn" name="btnAddMore" value="Back" style={{border: 'none',borderRadius: '1rem',width: '100%',padding: '2%',fontWeight: 600,color: '#576065',cursor: 'pointer',marginTop: '10px',}} />
              </Link>
                  <div className="px-xl-3"></div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
   
  );
};

export default Patienteditprofile;

