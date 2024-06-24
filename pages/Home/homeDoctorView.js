import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import TopBarHome from '../homeTopbar.js';
import { patient_list_by_id } from '../../actions/patientAction';
import { doctor_list, findDoctorsWithinRadius ,caretaker_list_by_specialist} from '../../actions/doctorAction';
import { banner_list, specialist_list } from '../../actions/specialistAction';
import { appointment_list_by_patientId } from '../../actions/appointmentAction';

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
    specialistList: [],
  });

  const router = useRouter();

  useEffect(() => {
    
        loadInitialData();
     
  }, []);

  const loadInitialData =  () => {
    caretaker_list_by_specialist(router.query.specialist_type_name)
    .then((doctors) => {
      if (doctors.error) {
        console.log(doctors.error);
      } else {
        setValues({
          ...values,
          doctorsList: doctors.caretaker_list,
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};
    

  const handleBookAppointment = (_id, doctorName) => {
    router.push({
      pathname: '/Appointment/bookAppointment',
      query: { _id, doctorName },
    });
  };

  return (
    <div id="home-wrapper" style={{ backgroundColor: '#e9e6e6' }}>
        <TopBarHome/>
      <div className="home-content-page" >
        <div className="home-row-md-12" >
          <div className="home-patient-content-page-doctorlist">
            <h3>{router.query.specialist_type_name} </h3>
            <label style={{ color: 'gray',padding:'10px' }}>{values.totalDoctors} Doctors Available in {router.query.specialist_type_name}</label>
            <div className="home-specialistView-doctor-list">
              {values.doctorsList.length > 0 ? (
                values.doctorsList.map((doctor, index) => (
                  <div key={index} className="home-specialistView-card">
                    <div className="home-specialist-card-content">
                      <div className="home-specialist-card-img">
                        <img
                          src={doctor.caretaker_profile_image || defaultProfileImage}
                          alt="Profile"
                          className="specialist-img"
                        />
                      </div>
                      <div className="home-specialist-info">
                        <h5 className="home-specialistView-title">{doctor.caretaker_firstname} {doctor.caretaker_lastname}</h5>
                        <label><FaGraduationCap /> {doctor.degree_name}</label>
                        <p><FaBriefcase /> {doctor.caretaker_work_experience} Years experienced overall</p>
                        <p><FiMapPin /> {doctor.caretaker_address}</p>
                        <div className="home-doctor-slot-container">
                          <span className="home-doctor-slot-time">Mon-Fri (09:00 - 12:00)</span>
                          {/* <button className="home-specialist-btn" onClick={() => handleBookAppointment(doctor._id, `${doctor.caretaker_firstname} ${doctor.caretaker_lastname}`)}>Book Appointment</button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ width: '100%', textAlign: 'center' }}>No doctors found.</p>
              )}
            </div>
          </div>
          {/* <div className="specialist-floating-button">
            <button className="home-specialist-btn-warning">Book Appointment</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
