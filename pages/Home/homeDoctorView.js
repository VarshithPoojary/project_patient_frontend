import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import TopBarHome from '../homeTopbar.js';
import ReactStars from 'react-stars';
import { caretaker_list_by_specialist } from '../../actions/doctorAction';

const DoctorList = () => {
  const defaultProfileImage = '/images/doctorMenLogo.png';
  const [values, setValues] = useState({
    doctorsList: [],
  });

  const router = useRouter();

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    caretaker_list_by_specialist(router.query.specialist_type_name)
      .then((doctors) => {
        if (doctors.error) {
          console.log(doctors.error);
        } else {
          setValues({
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
    <div id="home-wrapper" style={{ backgroundColor: '#ffffff' }}>
      <TopBarHome />
      <div className="home-content-page">
        <div className="home-row-md-12">
          <div className="home-patient-content-page-doctorlist">
            <h3>{router.query.specialist_type_name} </h3>
            <label style={{ color: 'gray', padding: '10px' }}>{values.totalDoctors} Doctors Available in {router.query.specialist_type_name}</label>
            <div className="home-specialistView-doctor-list">
              {values.doctorsList.length > 0 ? (
                values.doctorsList.map((doctor, index) => (
                  <div key={index} className="home-specialistView-card">
                    <div className="home-specialist-card-content">
                      <div className="home-specialist-card-img">
                        <img
                          src={doctor.caretaker_profile_image || defaultProfileImage}
                          alt="Profile"
                          className="home-specialist-img"
                        />
                      </div>
                      <div className="home-specialist-info">
                        <h5 className="home-specialistView-title">{doctor.caretaker_firstname} {doctor.caretaker_lastname}</h5>
                      <h6> 
                        <ReactStars
                                                        count={5}
                                                        value={doctor.caretaker_rating}
                                                        size={24}
                                                        color2={'#f5bf4b'}
                                                        edit={false}
                                                        className='homeDoctorView-ReactStars'
                                                    /></h6>
                        <label className="home-specialistView-degree"><FaGraduationCap /> {doctor.degree_name}</label>
                        <p className="home-specialistView-experience"><FaBriefcase /> {doctor.caretaker_work_experience} Years experienced overall</p>
                        <p className="home-specialistView-address"><FiMapPin /> {doctor.caretaker_address}</p>
                        {/* <div className="home-doctor-slot-container">
                          <button className="home-specialist-btn" onClick={() => handleBookAppointment(doctor._id, `${doctor.caretaker_firstname} ${doctor.caretaker_lastname}`)}>Book Appointment</button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ width: '100%', textAlign: 'center' }}>No doctors found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
