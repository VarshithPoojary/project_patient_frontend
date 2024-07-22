import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import Link from 'next/link';
import Topbar from '../topbar';
import { patient_list_by_id } from '../../actions/patientAction';
import { banner_list } from '../../actions/bannerAction';
import { findDoctorsWithinRadius } from '../../actions/doctorAction';
import { specialist_list } from '../../actions/specialistAction';
import { appointment_list_by_patientId } from '../../actions/appointmentAction';
import ReactStars from 'react-stars';

const Users = () => {
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

    const [scrolledSpecialists, setScrolledSpecialists] = useState([]);
    const [showSpecialists, setShowSpecialists] = useState(false);

    useEffect(() => {
        const user_id = localStorage.getItem('id');
        if (!user_id) {
            Router.push('/Patientlogin');
        } else {
            loadUserDetails(user_id);
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const specialists = document.querySelectorAll('.doctorList-specialization-title');
        const scrolled = [];

        specialists.forEach((specialist) => {
            const rect = specialist.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                scrolled.push(specialist.id);
            }
        });

        setScrolledSpecialists(scrolled);
    };

    const loadUserDetails = async (user_id) => {
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

            setValues(prevValues => ({
                ...prevValues,
                bannerList: banner.banner_Image_list,
                specialistList: specialist.admin_specialist_type_list.map(specialist => ({
                    ...specialist,
                    currentPage: 0
                })),
                doctorsList: doctors.nearby_doctors,
                appointments: appointment.appointment_list
            }));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const doctorsPerPage = 3;

    const getPaginatedDoctors = (specialist) => {
        const start = specialist.currentPage * doctorsPerPage;
        const end = start + doctorsPerPage;
        return specialist.doctors.slice(start, end);
    };

    const handleNextPage = (index) => {
        setValues(prevValues => {
            const newSpecialists = [...prevValues.specialistList];
            newSpecialists[index].currentPage++;
            return {
                ...prevValues,
                specialistList: newSpecialists
            };
        });
    };

    const handlePrevPage = (index) => {
        setValues(prevValues => {
            const newSpecialists = [...prevValues.specialistList];
            newSpecialists[index].currentPage--;
            return {
                ...prevValues,
                specialistList: newSpecialists
            };
        });
    };

    const handleBookAppointment = (_id, doctorName) => {
        router.push({
            pathname: '/Appointment/bookAppointment',
            query: { _id, doctorName },
        });
    };

    const handleGetAppointmentMouseEnter = () => {
        setShowSpecialists(true);
    };

    const handleGetAppointmentMouseLeave = () => {
        setShowSpecialists(false);
    };

    const handleSpecialistClick = (index) => {
        setShowSpecialists(false);
        const element = document.getElementById(`specialist-${index}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div id="wrapper" style={{ backgroundColor: '#e9e6e6' }}>
            <Topbar />
            <div className="doctorList-banner">
                <div className="doctorList-bannerContent">
                    <h1>We’re Always Ready To Help</h1>
                    <p>The Clinic provides diagnosis and management of pain in the head, face, mouth, and teeth</p>
                   
                </div>
                <div className="doctorList-bannerImage">
                    <img src="/images/doc-1.png" alt="Doctor" />
                </div>
            </div>
            <div
                        onMouseEnter={handleGetAppointmentMouseEnter}
                        onMouseLeave={handleGetAppointmentMouseLeave}
                        style={{ position: 'relative', display: 'inline-block', zIndex:'1000' }}
                        className='doctorList-getAppointment-btn'
                    >
                        <button>Get Appointment</button>
                        {showSpecialists && (
                            <div className="specialist-dropdown" style={{
                                position: 'relative',
                                top: '100%',
                                left: '0',
                                backgroundColor: '#fff',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                zIndex: '-1',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                flexWrap: 'wrap',
                                width: '100%',
                                padding: '10px',
                                marginRight:'40px'
                            }}>
                                {values.specialistList.map((specialist, index) => (
                                    <div
                                        key={index}
                                        className="specialist-item"
                                        onClick={() => handleSpecialistClick(index)}
                                        style={{ padding: '10px', cursor: 'pointer', width: '20%', color:'black',zIndex:'-1'}}
                                    >
                                        {specialist.specialist_type_name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
            <div id="appointment" className="content-page" style={{ margin: '0', marginLeft: '10px', position: 'relative', zIndex: '0' }}>
                <div className="doctorList-content">
                    <div className="doctorList-container">
                        {values.specialistList.map((specialist, index) => {
                            specialist.doctors = values.doctorsList.filter(doctor => doctor.caretaker_type === specialist.specialist_type_name);

                            const paginatedDoctors = getPaginatedDoctors(specialist);

                            return (
                                <div key={index} className="doctorList-specialization">
                                    <h6
                                        id={`specialist-${index}`}
                                        className={`doctorList-specialization-title ${scrolledSpecialists.includes(`specialist-${index}`) ? 'animate-slide-in' : ''}`}
                                    >
                                        <img src={specialist.admin_icon} alt={specialist.specialist_type_name} className="doctorList-specialist-image" />
                                        {specialist.specialist_type_name}
                                    </h6>
                                    <div className="doctorList-specialization-container">
                                        {paginatedDoctors.map((doctor, index) => (
                                            <div key={index} className="doctorList-card">
                                                <img src={doctor.caretaker_profile_image} alt={doctor.caretaker_firstname} className="doctorList-card-image" />
                                                <div className="doctorList-card-content">
                                                    <p className="doctorList-card-specialization">{doctor.caretaker_type}</p>
                                                    <h6 className="doctorList-card-name"> {doctor.caretaker_firstname}</h6>
                                                    <p className="doctorList-card-description">
                                                        <label><FaGraduationCap /> {doctor.degree_name}</label>
                                                        <p><FaBriefcase /> {doctor.caretaker_work_experience} Years experienced overall</p>
                                                        <p><ReactStars
                                                        count={5}
                                                        value={doctor.caretaker_rating}
                                                        size={24}
                                                        color2={'#f5bf4b'}
                                                        edit={false}
                                                    /></p>
                                                    </p>
                                                </div>
                                                <div className="doctor-card-buttons">
                                                    <button className="patient-dashboard-btn" onClick={() => handleBookAppointment(`${doctor._id}`, `${doctor.caretaker_firstname} ${doctor.caretaker_lastname}`)}>Book Appointment</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {specialist.doctors.length > doctorsPerPage && (
                                        <div className="pagination-buttons">
                                            <button onClick={() => handlePrevPage(index)} disabled={specialist.currentPage === 0}>Previous</button>
                                            <button onClick={() => handleNextPage(index)} disabled={(specialist.currentPage + 1) * doctorsPerPage >= specialist.doctors.length}>Next</button>
                                        </div>
                                    )}
                                    <hr style={{ margin: '5px 0' }} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
