import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Cookies from 'universal-cookie';
import { FaHome, FaBell, FaCog, FaComment, FaUserMd, FaRegImage, FaBriefcase, FaGraduationCap, FaHandsHelping, FaShoppingCart, FaBookMedical, FaCalendar, FaNotesMedical, FaSquareFull, FaEye, FaCalendarAlt, FaLocationArrow } from 'react-icons/fa';
import { BiCalendarPlus, BiUser, BiListUl, BiCart, BiEdit, BiClinic, BiUserPlus, BiMap, BiCreditCard } from 'react-icons/bi';
import { GiMedicines } from "react-icons/gi";
import { FiHome, FiLogOut, FiMapPin, FiUsers, FiMap } from "react-icons/fi";
import { patient_list_by_id } from '../actions/patientAction';
import { banner_list } from '../actions/bannerAction';
import { findDoctorsWithinRadius } from '../actions/doctorAction';
import { specialist_list } from '../actions/specialistAction';
import { appointment_list_by_patientId, appointment_cancel } from '../actions/appointmentAction';
import ReactStars from 'react-stars';

const Users = () => {
    const defaultProfileImage = '/images/userLogo.jpeg';
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
        acceptedAppointment: '',
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
    }, []);

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

            const today = new Date();
            const todayDateString = today.toISOString().split('T')[0];
    
            const acceptedAppointments = appointment.appointment_list.filter(appointment => {
                const appointmentDate = new Date(appointment.appointment_date);
                const appointmentDateString = appointmentDate.toISOString().split('T')[0];
                const status = appointment.status;
                return (appointmentDateString >= todayDateString) && (status === "Accepted");
            });
            const upcomingAppointments = appointment.appointment_list.filter(appointment => {
                const appointmentDate = new Date(appointment.appointment_date);
                const appointmentDateString = appointmentDate.toISOString().split('T')[0];
                const status = appointment.status;
                return (appointmentDateString >= todayDateString) && (status === "Accepted" || status === "Active");
              }).sort((a, b) => {
                const dateA = new Date(a.appointment_date);
                const dateB = new Date(b.appointment_date);
                return dateA - dateB;
              });
              

            setValues(prevValues => ({
                ...prevValues,
                bannerList: banner.banner_Image_list,
                specialistList: specialist.admin_specialist_type_list,
                doctorsList: doctors.nearby_doctors,
                appointments: upcomingAppointments,
                acceptedAppointment: acceptedAppointments.length 
            }));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('id');
        Router.push('/Home');
    };

    const handleViewButton = () => {
        Router.push('/Doctor/specialistView');
    };

    const handleAppointment = () => {
        Router.push('/Doctor/specialistView');
    }; 

    const handleView = (_id, appointmentId) => {
        Router.push({
            pathname: '/Appointment/viewAppointment',
            query: {
                _id, appointmentId
            }
        });
    };

    const handleBookAppointment = (_id, doctorName) => {
        router.push({
          pathname: '/Appointment/bookAppointment',
          query: { _id, doctorName },
        });
      };

      const approvedStatusFormatter = (status) => {
        if (status === "Accepted") {
            return { text: "Accepted", color: "green" };
        } else if(status === "Active") {
            return { text: "Pending", color: "grey" };              
        }
    };


    return (
        <div id="wrapper" style={{ backgroundColor: '#e9e6e6' }}>
            <div className="content-page" style={{ marginLeft: '10px', position: 'relative', zIndex: '0' }}>
                <div className='row-md-12' style={{ display: 'flex' }}>
                    <div className="patient-content-side" style={{ backgroundColor: '#fff', width: '20%' }}>
                        <span className="d-flex flex-column align-items-center">
                            <img src={values.patient_profile_image} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%', marginTop: '20px' }} />
                        </span>
                        <div className="profile-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#535252' }}>
                            <div style={{ color: 'black', fontSize: '16px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', margin:'10px' }}> {values.patient_first_name} {values.patient_last_name} </div>
                            <h6 style={{display:'flex', position:'relative', textAlign:'center',fontFamily: ' sans-serif', fontSize:'15px'}}><FiMapPin style={{width:'40px', color:'gray'}}/>{values.patient_address}</h6>
                                 {/* Your health is our priority. Book appointments, view records, and stay connected with your healthcare team.</h6> */}
                        </div>
                        <hr style={{ margin: '12px 0' }} />
                        <div className="patient-custom-sidebar" style={{ padding: '10px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '5px', marginBottom: '20px' }}>
                            <h5>Quick Links</h5>
                            <ul style={{ listStyleType: 'none', padding: '0', cursor: 'pointer' }}>
                                <li className="patient-content-menu" style={{ marginBottom: '10px' }}>
                                    <FaCalendar style={{ marginRight: '5px' }} />
                                    <Link href='/Doctor/specialistView'><span>Appointment</span></Link>
                                </li>
                                <li className="patient-content-menu" style={{ marginBottom: '10px' }}>
                                    <FaUserMd style={{ marginRight: '5px' }} />
                                    <Link href='/Doctor/doctorList'><span>Doctor</span></Link>
                                </li>
                                <li className="patient-content-menu" style={{ marginBottom: '10px' }}>
                                    <FaUserMd style={{ marginRight: '5px' }} />
                                    <Link href='/Doctor/specialistView'><span>Specialist</span></Link>
                                </li>
                                <li className="patient-content-menu" style={{ marginBottom: '10px' }}>
                                    <FaNotesMedical style={{ marginRight: '5px' }} />
                                    <Link href='/Appointment/appointmentReport'><span>Report</span></Link>
                                </li>
                                <li className="patient-content-menu" style={{ marginBottom: '10px' }}>
                                    <FaBookMedical style={{ marginRight: '5px' }} />
                                    <Link href='/Appointment/appointmentList'><span>Medical History</span></Link>
                                </li>
                                <li className="patient-content-menu" style={{ marginBottom: '10px' }}>
                                    <FiLogOut style={{ marginRight: '5px' }} />
                                    <span onClick={handleLogout}>Logout</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="patient-content-page" style={{ backgroundColor: '#fff', width: '70%', maxWidth: '80%' }}>
                        {/* <h5 style={{margin:'10px'}}>
                            <span style={{ marginTop: '10px', fontFamily:'monospace', color:'#277a98'}}>Welcome,</span>
                            <span style={{ marginTop: '10px', fontFamily:'sans-serif',fontWeight:'bold', color:'#277a98', fontSize:'25px'}}>{values.patient_first_name} {values.patient_last_name} </span>
                        </h5> */}
                        <Carousel
                            showArrows={true}
                            autoPlay={true}
                            infiniteLoop={true}
                            showThumbs={false}
                            showStatus={false}
                            interval={3000}
                        >
                            {values.bannerList.map((banner, index) => (
                                <div key={index} className="patient-dashboard-top-image">
                                    <img src={banner.admin_banner_image_name} alt={`Banner ${index}`}/>
                                </div>
                            ))}
                        </Carousel>
                        <h6 style={{ marginTop: '10px', fontFamily:'monospace' }}>You Have {values.acceptedAppointment} Upcoming Appointments.</h6>
                        {/* <hr style={{ margin: '5px 0' }} /> */}
                        <div className="dashboard-appointment-container">
  <div className="patient-content-text-container">
    <h2 className="content-appointment-heading">
      <span className="serif">Get Your <FaCalendarAlt/></span>
      <span className="sans-serif"> Appointment</span>
    </h2>
    <h6 className="patient-content-description">Book your appointment now! Schedule a consultation with our expert doctors to receive the care you need. Click the "Book Appointment" button to secure your spot today!</h6>
    <button className="patient-dashboard-appointment-btn" onClick={handleAppointment}>
      <FaCalendar style={{ marginRight: '5px' }} />
      Book Appointment
    </button>
  </div>
  <img src="/images/dashboard-doc4.jpeg" alt="Specialists" className="patient-content-image"/>
</div>
                    </div>
                </div>
                {
  values.appointments && values.appointments.length > 0 ? (
    <div className="appointment-list" style={{ width: '100%'  }}>
      <h5 style={{ marginTop: '10px' }}>Appointment Details</h5>
      <table style={{ width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{ border: '1px solid #ddd', padding: '8px', backgroundColor:'#277a98', color:'white'}}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Doctor</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Time</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>View</th>
          </tr>
        </thead>
        <tbody>
          {values.appointments.map((appointment, index) => {
            const { text: statusText, color: statusColor } = approvedStatusFormatter(appointment.status);
            return (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px'}}>
                  <img src={appointment.doctor_profile_img} alt={`${appointment.doctor_name}'s profile`} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '8px' }} />
                  {appointment.doctor_name}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.appointment_date}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.slot_timing}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', color: statusColor }}>{statusText}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button onClick={() => handleView(`${appointment.caretaker_id}`, `${appointment._id}`)} style={{ background: 'none',border: 'none'}}><FaEye /></button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <p style={{ width: '100%', textAlign: 'center' }}></p>
  )
}
                    <div className='dashboard-content-step-main'>
                      <p className='dashboard-content-step-heading'><span className="serif">How it </span><span className="sans-serif"> works</span></p> 
                        <div className="dashboard-content-step">
                            <div className="dashboard-content-details">
                                <h2>Find a Specialist</h2>
                                <p>Determine the type of specialist you need based on your medical condition and click on the "View Specialists"  to browse the list of available specialists.</p>
                                <Link href='/Doctor/specialistView'><span style={{cursor:'pointer', fontWeight:'bold'}}>View Specialist</span></Link>
                            </div>
                            <img className="dashboard-content-image" src="/images/specialistFind.jpg" alt="Specialist" />
                        </div>
                        <div className="dashboard-content-step">
                            <img className="dashboard-content-image" src="/images/specialistList.jpg" alt="Book" />
                            <div className="dashboard-content-details">
                            <h2>My Doctors</h2>
                                <p>Under each specialist, there is a list of doctors. Click "View Doctors" to see the available doctors and choose one for your consultation.</p>
                                <Link href='/Doctor/doctorList'><span style={{cursor:'pointer', fontWeight:'bold'}}>View Doctor</span></Link>
                                
                            </div>
                        </div>
                        <div className="dashboard-content-step">
                            <div className="dashboard-content-details">
                            <h2>Book an Appointment</h2>
                                <p>Select a convenient date and time, and the doctor will review your request. If accepted, you'll receive a confirmation email.</p>
                                <Link href='/Doctor/specialistView'><span style={{cursor:'pointer', fontWeight:'bold'}}>Book Now</span></Link>
                            </div>
                            <img className="dashboard-content-image" src="/images/appointment-done.jpg" alt="My Doctors" />
                        </div>
                        <div className="dashboard-content-step">
                            <img className="dashboard-content-image" src="/images/report1.jpg" alt="Records" />
                            <div className="dashboard-content-details">
                                <h2>Medical Records</h2>
                                <p>After successful treatment and payment completion, you can view and manage your medical records online.</p>
                                <Link href='/Appointment/appointmentReport'><span style={{cursor:'pointer', fontWeight:'bold'}}>Medical Record</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

            
        
    );
};

export default Users;
