import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu, 
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {BiCalendar, BiUser, BiListUl, BiCart,  BiEdit, BiCreditCard, BiLock } from 'react-icons/bi'; 
import {GiMedicines} from "react-icons/gi";
import {FaNotesMedical, FaSquareFull,FaHandsHelping,FaShoppingCart,FaHome,FaUserMd} from "react-icons/fa";
import {FiHome,FiLogOut, FiMapPin} from "react-icons/fi";
import "react-pro-sidebar/dist/css/styles.css";
import Topbar from './topbar';
import { useRouter } from 'next/router';
import { patient_list_by_id, patient_delete,patient_personal_update,update_patient } from '../actions/patientAction';
import { country_list } from '../actions/countryAction';
import { state_list, state_list_by_country_id } from '../actions/stateAction';
import { city_list,city_list_by_state_id } from '../actions/cityAction';
import { banner_list } from '../actions/bannerAction';
import { timers } from 'jquery';
import { Button } from 'react-bootstrap';



const PatientProfile = () => {
  const router = useRouter();
  const defaultProfileImage = '/images/userLogo.jpeg';
  const [countryList, setCountryList] = useState([]);
  const [stateDetail, setStateDetail] = useState([]);
  const [cityList, setCityList] = useState([]);
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [area, setArea] = useState('');
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
    bannerList:[],
    isEditingAddress: false,
    isEditingDetails: false,
  });

  const { patient_list,patient_first_name ,patient_last_name,patient_phone_number,patient_country_code,patient_dob,patient_gender,patient_email,patient_address,patient_country_id,patient_state_id,patient_area_id,patient_pincode,patient_main_address,patient_register_status,password,patient_city_id, patient_profile_image,countrydetail, statedetail, citydetail,bannerList, error, loading, isEditingAddress, isEditingDetails } = values;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user_id = localStorage.getItem('id');
      if (user_id === "" || user_id === null || user_id === undefined) {
        Router.push('/Patientlogin');
      } else {
         loadUserDetails(user_id);
      }
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
                  banner_list().then(banner => {
                    if (banner.error) {
                      console.log(banner.error);
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
            password: patientData.password,
            countrydetail:countrydata.admin_country_list,
            statedetail:state.state_list,
            citydetail:city.city_list,
            bannerList:banner.banner_Image_list,
            patient_profile_image: patientData.patient_profile_image || defaultProfileImage,
            loading: false
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setValues({ ...values, error: 'Error: Network request failed', loading: false });
      });
    }
    });
}
});
}
});
        }
});
};

const handleCountryChange = (admin_country_id) => {
  state_list_by_country_id(admin_country_id)
      .then(response => {
        setValues({
          ...values,patient_country_id: admin_country_id})
          setStateDetail(response.state_list);
      })
      .catch(error => {
          console.error('Error fetching state list:', error);
      });
};

const handleChange = name => e => {
  setValues({ ...values, [name]: e.target.value });
  const value = e.target.value;
  setValues({ ...values, [name]: value });
  if (name === "patient_country_id") {
    state_list_by_country_id(value).then(data1 => {
      if (data1.error) {
        console.log(data1.error);
      } else {
        setValues({ ...values, statedetail: data1.state_list, patient_country_id: value });
      }
    });
  }
  if (name === "patient_state_id") {
    city_list_by_state_id(value).then(data2 => {
      if (data2.error) {
        console.log(data2.error);
      } else {
        setValues({ ...values, citydetail: data2.city_list, patient_state_id: value });
      }
    });
  }
};




const handleStateChange = (admin_state_id) => {
  city_list_by_state_id(admin_state_id)
      .then(response => {
          setState(admin_state_id)
          setCityList(response.city_list);
      })
      .catch(error => {
          console.error('Error fetching city list:', error);
      });
};


const handleEditAddress = () => {
  setValues({ ...values, isEditingAddress: true });
};

const handleEditDetails = () => {
  setValues({ ...values, isEditingDetails: true });
};

const handleCancelEditAddress = () => {
  const user_id = localStorage.getItem('id');
  patient_list_by_id(user_id)
    .then(data => {
      if (data.error) {
        console.log(data.error);
        setValues({ ...values, error: data.error, loading: false });
      } else {
        const patientData = data.patient_list[0];
        setValues({
          ...values,
          patient_address: patientData.patient_address,
          patient_country_id: patientData.patient_country_id,
          patient_state_id: patientData.patient_state_id,
          patient_area_id: patientData.patient_area_id,
          patient_pincode: patientData.patient_pincode,
          isEditingAddress: false,
          isEditingDetails: false
        });
      }
    })
    .catch(error => {
      console.error('Error fetching patient details:', error);
      setValues({ ...values, error: 'Error: Network request failed', loading: false });
    });
};


const handleSaveAddress = (newAddress) => {
  console.log("New Address:", newAddress);
  setValues({ ...values, isEditingAddress: false });
};

const handleCancelEditDetails = () => {
  const user_id = localStorage.getItem('id');
  patient_list_by_id(user_id)
    .then(data => {
      if (data.error) {
        console.log(data.error);
        setValues({ ...values, error: data.error, loading: false });
      } else {
        const patientData = data.patient_list[0];
        setValues({
          ...values,
          patient_address: patientData.patient_address,
          patient_country_id: patientData.patient_country_id,
          patient_state_id: patientData.patient_state_id,
          patient_area_id: patientData.patient_area_id,
          patient_pincode: patientData.patient_pincode,
          isEditingAddress: false,
          isEditingDetails: false
        });
      }
    })
    .catch(error => {
      console.error('Error fetching patient details:', error);
      setValues({ ...values, error: 'Error: Network request failed', loading: false });
    });
};


const handleSaveDetails = async (e) => {
  e.preventDefault();
  const patient_id = localStorage.getItem('id');
  const formData = new FormData();
  formData.append('patient_id', patient_id);
  formData.append('patient_first_name', values.patient_first_name);
  formData.append('patient_last_name', values.patient_last_name);
  formData.append('demoimg', values.patient_profile_image); // Assuming profileImage is a file object
  formData.append('patient_phone_number', values.patient_phone_number);
  formData.append('patient_dob', values.patient_dob);
  formData.append('patient_gender', values.patient_gender);
  formData.append('patient_email', values.patient_email);
  try {
    const response = await update_patient(formData);

    if (response.error) {
      setValues({ ...values, error: response.error });
    } else {
      setValues({ ...values, isEditingDetails: false });
    }
  } catch (error) {
    console.error('Error:', error);
    setValues({ ...values, error: 'Error updating profile', loading: false });
  }
};




const handleLogout = () => {
  localStorage.removeItem('id');
  Router.push('/Home');
};

const handleEditProfile = () => {
  Router.push('/PatientEditProfile');
};

const handleHomePage = () => {
  Router.push('/Home');
};

const renderEditButton = () => {
  if (isEditingAddress) {
    return (
      <div>
        <button onClick={handleSaveAddress} className="patient-profile-edit-btn">Submit</button>
        <button onClick={handleCancelEditAddress} className="patient-profile-back-btn">Cancel</button>
      </div>
    );
  } else if (isEditingDetails) {
    return (
      <div>
        <button type="submit" onClick={handleSaveDetails} className="patient-profile-edit-btn">Submit</button>
        <button onClick={handleCancelEditDetails} className="patient-profile-back-btn">Cancel</button>
      </div>
    );
  }else{
    return (
      <div>
        <button onClick={handleEditProfile} className="patient-profile-edit-btn">Edit</button>
        <button onClick={handleHomePage} className="patient-profile-back-btn">Home Page</button>
      </div>
    );
  }
};


return (
  <section className="patient-profile">
    
       <Head>
        <title>Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content='Profil' />
        <link rel="icon" href="/images/title_logo.png" />
      </Head>
      <Topbar/>
    <div className="patient-top-section">
      {/* <Topbar/> */}
      {/* <img src={values.bannerList[0]} alt="Top Image" className="patient-top-image" /> */}
      <Carousel
  showArrows={true}
  showThumbs={false}
  infiniteLoop={true}
  autoPlay={true}
  interval={2000}
>
  {bannerList.map((banner, index) => (
    <div key={index} className="patient-top-image">
      <img src={banner.admin_banner_image_name} alt={`Banner ${index}`} />
    </div>
  ))}
</Carousel>

      <div className="patient-profile-header">
        <img src={values.patient_profile_image} alt="Profile Avatar" className="patient-profile-image" />
      </div>
      
    </div>
    <div className="patient-profile-container">

    <div className="patient-profile-container-card">
      {/* <ProSidebar  > */}
        {/* <SidebarHeader>
          <div className="logotext">
          </div>
          <div className="closemenu" >
            <FiMenu />
          </div>
        </SidebarHeader> */}
        {/* <SidebarContent className="patient-profile-container-scroll"> */}
          <Scrollbars  className="patient-profile-container-scroll">
            <Menu iconShape="round" >
            <MenuItem icon={<FaHome />} title="Dashboard" className='patient-profile-menu'>
      <Link href='/dashboard'><span>Dashboard</span></Link>
    </MenuItem>
    <MenuItem icon={<FaUserMd />} title="Specialist" className='patient-profile-menu'>
      <Link href='/Admin/viewAdminList'><span>Specialist</span></Link>
    </MenuItem>
    <MenuItem icon={<BiListUl />} title="Appointment" className='patient-profile-menu'>Appointment</MenuItem>
    <MenuItem icon={<BiCalendar />} title="Slot" className='patient-profile-menu'>View Slot</MenuItem>
    <MenuItem icon={<GiMedicines />} title="Product" className='patient-profile-menu'>View Product</MenuItem>
    <MenuItem icon={<FaNotesMedical />} title="Description" className='patient-profile-menu'>View Description</MenuItem>
    <MenuItem icon={<BiCreditCard />} title="Description" className='patient-profile-menu'>Payment Details</MenuItem>
    <MenuItem icon={<BiLock />} title="Description" className='patient-profile-menu'>Security</MenuItem>
    <MenuItem icon={<BiCart />} title="Order" className='patient-profile-menu'>Your Order</MenuItem>
    {/* <MenuItem icon={<FaShoppingCart />} title="Order" className='patient-profile-menu'>Cart</MenuItem> */}
    <MenuItem icon={<FaHandsHelping />} title="Order" className='patient-profile-menu'>Help</MenuItem>
    <MenuItem icon={<FiLogOut />} title="Logout" className='patient-profile-menu' onClick={handleLogout}>
    <span>Logout</span>
    </MenuItem>

    
              {/* <SubMenu title="Locations" icon={<FiMapPin />}  className='patient-profile-menu'>
                <MenuItem title="Country" icon={<BiMap />} className='patient-profile-menu'>
                <Link href='/Location/viewCountry'><span >Country</span></Link></MenuItem>
                <MenuItem title="State" icon={<BiMap />} className='patient-profile-menu'>
                <Link href='/Location/viewState'><span>State</span></Link></MenuItem>
                <MenuItem title="City" icon={<BiMap />} className='patient-profile-menu'>
                <Link href='/Location/viewCity'><span>City</span></Link></MenuItem>
              </SubMenu> */}
            </Menu>
          </Scrollbars>
        {/* </SidebarContent> */}
        {/* <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem icon={<FiLogOut />} title="Logout" > 
              <span>Logout</span>
            </MenuItem>
          </Menu>
        </SidebarFooter> */}
      {/* </ProSidebar> */}
{/* <div className="patient-profile-links">
<Link href="/home">Home</Link>
<Link href="/appointments">Appointments</Link>
<Link href="/view">View</Link>
</div> */}


    </div>
        <div className="patient-profile-container-card2">
          
        <div className="patient-profile-details" id="home" role="tabpanel" aria-labelledby="home-tab">
<div className="row">
<div className="col-md-12">
<div className="profile-info d-flex align-items-center">
  <div className="profile-image">
      <img src={patient_profile_image} alt="Profile Avatar" className="patient-profile-image1" />
  </div>
  <div className="personal-info ml-3">
      <div className="name">{values.patient_first_name} {values.patient_last_name}</div>
      <div className="email">{values.patient_email}</div>
      <div className="phone">{values.patient_phone_number}</div>
  </div>
</div>
</div>

<div className="col-md-6" >
<form className="form" onSubmit={handleSaveDetails} noValidate>
<div className="patient-card-header">
  <span>{<BiUser />} Personal Details</span>
  <span className="patient-edit-icon" onClick={handleEditDetails}>{<BiEdit />}</span>
</div>
<div className="row">
  <div className="col-md-12">
    {isEditingDetails ? (
      <div>
      <input className="form-control col-md-12" type="text" value={values.patient_first_name} onChange={handleChange('patient_first_name')} />
      <input className="form-control col-md-12" type="text" value={values.patient_last_name} onChange={handleChange('patient_last_name')} />
      </div>
    ) : (
      <label htmlFor="FirstName">{values.patient_first_name} {values.patient_last_name}</label>
    )}
  </div>
  <div className="col-md-12">
    {isEditingDetails ? (
      <input className="form-control col-md-12" type="text" value={values.patient_phone_number} onChange={handleChange('patient_phone_number')} />
    ) : (
      <label htmlFor="FirstName">{values.patient_phone_number}</label>
    )}
  </div>
  <div className="col-md-12">
    {isEditingDetails ? (
      <input className="form-control col-md-12" type="date" value={values.patient_dob} onChange={handleChange('patient_dob')} />
    ) : (
      <label htmlFor="FirstName">{values.patient_dob}</label>
    )}
  </div>
  <div className="col-md-12">
    {isEditingDetails ? (
      <div className="col-md-12">
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
      // <input className="form-control col-md-12" type="text" value={values.patient_gender} onChange={handleChange('patient_gender')} />
    ) : (
      <label htmlFor="FirstName">{values.patient_gender}</label>
    )}
  </div>
  <div className="col-md-12">
    {isEditingDetails ? (
      <input className="form-control col-md-12" type="text" value={values.patient_email} onChange={handleChange('patient_email')} />
    ) : (
      <label htmlFor="FirstName">{values.patient_email}</label>
    )}
  </div>
</div>

 </form>
</div>
<div className="col-md-6">
  <div className="patient-card-header">
      <span>{<FiMapPin />} Address Details</span>
      <span className="patient-edit-icon" onClick={handleEditAddress}>{< BiEdit />}</span> 
    </div>
    
    <div className="row">
        <div className="col-md-12">
            {isEditingAddress ? (
              <textarea className="form-control col-md-12" type="text" value={values.patient_address} onChange={(e) => setValues({ ...values, patient_address: e.target.value })} />
            ) : (
              <label htmlFor="country" >{values.patient_address} </label>
            )}
        </div>
        <div className="col-md-12">
        {/* {isEditingAddress && <label className="small mb-1" htmlFor="country">Country:</label>} */}
            {isEditingAddress ? (
              <select className="form-control" id="country" name="country" value={values.patient_country_id} onChange={handleChange('patient_country_id')}>
              {countrydetail.map(country => (
                <option key={country._id} value={country._id}>
                  {country.admin_country_name}
                </option>
              ))}
            </select>
              // <input type="text" value={values.patient_country_id} onChange={(e) => setValues({ ...values, patient_country_id: e.target.value })} />
            ) : (
              <label htmlFor="country">{values.patient_country_id}</label>
            )}
        </div>
        <div className="col-md-12">
            {isEditingAddress ? (
               <select className="form-control" id="state" name="state"  value={values.patient_state_id} onChange={handleChange('patient_state_id')}>
               {statedetail.map(state => (
                 <option key={state._id} value={state._id}>
                   {state.admin_state_name}
                 </option>
               ))}
             </select>
              // <input type="text" value={values.patient_state_id} onChange={(e) => setValues({ ...values, patient_state_id: e.target.value })} />
            ) : (
              <label htmlFor="country">{values.patient_state_id}</label>
            )}
        </div>
        <div className="col-md-12">
            {isEditingAddress ? (
               <select className="form-control" id="city" name="city"  value={values.patient_area_id} onChange={handleChange('patient_area_id')}>
               
               {citydetail.map(city => (
                 <option key={city._id} value={city._id}>
                   {city.admin_city_name}
                 </option>
               ))}
             </select>
              // <input type="text" value={values.patient_area_id} onChange={(e) => setValues({ ...values, patient_area_id: e.target.value })} />
            ) : (
              <label htmlFor="country">{values.patient_area_id}</label>
            )}
        </div>
        <div className="col-md-12">
            {isEditingAddress ? (
              <input type="text" className="form-control" value={values.patient_pincode} onChange={(e) => setValues({ ...values, patient_pincode: e.target.value })} />
            ) : (
              <label htmlFor="country">{values.patient_pincode}</label>
            )}
        </div>
        
    </div>
    
</div>
</div>
</div>

  
<div className="patient-profile-actions">
  {renderEditButton()}
</div>
</div>
</div>
</section>
);
};

export default PatientProfile;
