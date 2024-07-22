import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import Topbar from '../topbar';
import { FaUserMd,FaBriefcase,FaGraduationCap } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { patient_list_by_id } from '../../actions/patientAction';
import { caretaker_list_by_specialist,findDoctorsWithinRadius } from '../../actions/doctorAction';
import { banner_list } from '../../actions/bannerAction';
import { specialist_list } from '../../actions/specialistAction';
import { appointment_list_by_patientId, appointment_cancel } from '../../actions/appointmentAction';


const DoctorList = () => {
  const defaultProfileImage = '/images/doctorMenLogo.png';
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
    patient_profile_image: '',
    patient_latitude: null,
    patient_longitude: null,
    bannerList: [],
    appointments: [],
    doctorsList: [], 
    specialistList: []
});

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user_id = localStorage.getItem('id');
      if (!user_id) {
        Router.push('/Patientlogin');
      } else {
        loadInitialData(user_id);

      }
    }
  }, [router.query.specialist_type_name]);

  const loadInitialData = async (user_id) => {
    try {
      const data = await patient_list_by_id(user_id);
      if (data.error) {
        console.log(data.error);
        return;
      }
  
      const patientData = data.patient_list[0];
      const { patient_latitude, patient_longitude } = patientData;
  
      setValues(prevValues => ({
        ...prevValues,
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
        patient_latitude: patient_latitude,
        patient_longitude: patient_longitude,
        patient_profile_image: patientData.patient_profile_image || defaultProfileImage,
      }));
  
      const [banner, specialist, doctors, appointment] = await Promise.all([
        banner_list(),
        specialist_list(),
        findDoctorsWithinRadius({ patient_latitude, patient_longitude }),
        appointment_list_by_patientId(user_id)
      ]);
  
      if (banner.error) console.log(banner.error);
      if (specialist.error) console.log(specialist.error);
      if (doctors.error) console.log(doctors.error);
      if (appointment.error) console.log(appointment.error);
  
      const specialistTypeName = router.query.specialist_type_name;
      const filteredDoctors = doctors.nearby_doctors.filter(
        (doctor) => doctor.caretaker_type === specialistTypeName
      );
      setValues(prevValues => ({
        ...prevValues,
        bannerList: banner.banner_Image_list,
        specialistList: specialist.admin_specialist_type_list,
        doctorsList: filteredDoctors,
        appointments: appointment.appointment_list
      }));
    } catch (error) {
      console.error('Error:', error);
    }
  };
  



  

  const handleBookAppointment = (_id, doctorName) => {
    router.push({
      pathname: '/Appointment/bookAppointment',
      query: { _id, doctorName },
    });
  };


  return (
    <div id="wrapper" style={{backgroundColor:'#e9e6e6'}}>
      <Topbar />
      <div className="content-page" style={{marginLeft:'10px', position:'relative', zIndex:'0'}}>
        <div className="row-md-12" style={{display:'flex',flexDirection:'column', marginTop:'20px'}}>
          <div className="patient-content-page-doctorlist">
            <h3 className='specialist-topbar '>{router.query.specialist_type_name} </h3>
            <label style={{color:'gray'}}>{values.totalDoctors} Doctors Available in {router.query.specialist_type_name}</label>
            <div className="specialistView-doctor-list">
              {values.doctorsList.length > 0 ? (
                values.doctorsList.map((doctor, index) => (
                  <div key={index} className="specialistView-card">
                    <div className="specialist-card-content">
                      <div className="specialist-card-img">
                        <img
                          src={doctor.caretaker_profile_image || defaultProfileImage}
                          alt="Profile"
                          className="specialist-img"
                        />
                        {/* <h6 style={{textAlign:'center', padding:'10px', color:'white'}}>{doctor.caretaker_firstname} {doctor.caretaker_lastname}</h6> */}

                      </div>
                      <div className="specialist-info">
                        <h5 className="specialistView-title" >{doctor.caretaker_firstname} {doctor.caretaker_lastname}</h5>
                        {/* <p>{doctor.caretaker_phone_number}</p>
                        <p>{doctor.caretaker_email}</p> */}
                        <h6><FaGraduationCap/> {doctor.degree_name}</h6>
                        <h6><FaBriefcase/> {doctor.caretaker_work_experience} Years experienced overall</h6>
                        <div className="doctor-slot-container">
                            <button className="specialist-btn"  onClick={() => handleBookAppointment(`${doctor._id}`, `${doctor.caretaker_firstname} ${doctor.caretaker_lastname}`)}>Book Appointment</button>
                        </div>
                      </div>
                    </div>
                    <label style={{padding:'10px 20px'}}>{doctor.description}</label> 

                  </div>
                ))
              ) : (
                <p style={{ width: '100%', textAlign: 'center' }}>No doctors found.</p>
              )}
            </div>
          </div>
          {/* <div className="specialist-floating-button">
            <button className="specialist-btn-warning">Book Appointment</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
