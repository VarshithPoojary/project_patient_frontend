import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';
import Topbar from '../topbar';
import { caretaker_list_by_id } from '../../actions/doctorAction';
import { appointment_list_by_id } from '../../actions/appointmentAction';
import { patient_list_by_id } from '../../actions/patientAction';

const AppointmentPage = () => {
  const defaultProfileImage = '/images/doctorMenLogo.png';
  const router = useRouter();
  const { _id, appointmentId } = router.query;
  const [values, setValues] = useState({
    caretaker_firstname: '',
    caretaker_lastname: '',
    caretaker_phone_number: '',
    caretaker_type: '',
    caretaker_address: '',
    degree_name: '',
    caretaker_work_experience: '',
    caretaker_profile_image: '',
    patientDetail: '',
    doctorsDetail: '',
    appointmentDetail: '',
    loading: true,
    error: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user_id = localStorage.getItem('id');
      if (!user_id) {
        Router.push('/Patientlogin');
      } else {
        loadDoctor();
        loadPatientDetails(user_id);
        loadAppointment();
      }
    }
  }, [router.query._id]);

  const loadDoctor = () => {
    caretaker_list_by_id(router.query._id)
      .then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          setValues((prevValues) => ({
            ...prevValues,
            doctorsDetail: response.caretaker_list[0],
            loading: false,
          }));
        }
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  };

  const loadPatientDetails = (user_id) => {
    patient_list_by_id(user_id)
      .then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          setValues(values => ({ ...values, patientDetail: response.patient_list[0] }));
        }
      })
      .catch((error) => {
        console.error('Error fetching patient details:', error);
      });
  };

  const loadAppointment = () => {
    appointment_list_by_id(router.query.appointmentId)
      .then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          setValues(values => ({ ...values, appointmentDetail: response.appointment_list[0] }));
        }
      })
      .catch((error) => {
        console.error('Error fetching appointment:', error);
      });
  };

  return (
    <div id="wrapper" style={{ backgroundColor: '#e9e6e6' }}>
      <Topbar />
      <div className="content-page" style={{ marginLeft: '10px', position: 'relative', zIndex: '0' }}>
        <div className="row-md-12" style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
          <div className="patient-content-page-doctorlist">
            <div className="appointmentHistory-doctor-details">
              <div className="appointmentHistory-patient-info-sheet">
                <div className="appointmentHistory-header">
                  <h1>PATIENT REPORT</h1>
                  {/* <h3>Appointment On {values.appointmentDetail.appointment_date} at {values.appointmentDetail.slot_timing}</h3> */}
                  <div className="appointmentHistory-patient-info">
                    <p>Patient Name: {values.appointmentDetail.patient_name || 'Smith'}</p>
                    <p>Patient Number: {values.patientDetail.patient_unique_number || '21011'}</p>
                    <p>Patient DOB: {values.patientDetail.patient_dob || 'XXXXX'}</p>
                  </div>
                </div>
                <div className="appointmentHistory-doctor-info-section">
                  <img
                    src={values.doctorsDetail.caretaker_profile_image || defaultProfileImage}
                    alt="Profile"
                    className="appointmentHistory-doctor-img"
                  />
                  <div className="appointmentHistory-doctor-details">
                    <h3>{values.doctorsDetail.caretaker_firstname} {values.doctorsDetail.caretaker_lastname}</h3>
                    <p>{values.doctorsDetail.caretaker_type}</p>
                    <p><FaGraduationCap /> {values.doctorsDetail.degree_name}</p>
                    <p><FaBriefcase /> {values.doctorsDetail.caretaker_work_experience} years of experience</p>
                    <p><FiMapPin /> {values.doctorsDetail.caretaker_address}</p>
                  </div>
                </div>
                <div className="appointmentHistory-appointment-details">
                  <p><strong><FiCalendar /> Date:</strong> {values.appointmentDetail.appointment_date}</p>
                  <p><strong><FiClock /> Time:</strong> {values.appointmentDetail.slot_timing}</p>
                </div>
                <div className="appointmentHistory-patient-problems-treatments">
                  <h2>Patient's Problems and Treatments</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Patient System Problems</th>
                        <th>Recommended Evaluation and Treatments</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Genetic Issues</td>
                        <td>Provide Genetic Counseling<br />Medication: SATB2 Protein</td>
                      </tr>
                      <tr>
                        <td>Speech and Language Issues</td>
                        <td>Intensive Speech Therapy to be given along with certain alternative communication devices<br />Medication: XXXXXX</td>
                      </tr>
                      <tr>
                        <td>Dental Issues</td>
                        <td>Engage in Dental Management and consult a specialized Orthodontist<br />Medication: XXXXXX</td>
                      </tr>
                      <tr>
                        <td>Neurological Problems</td>
                        <td>Consider Neurotherapy treatment and mechanical aids<br />Medication: XXXXXX</td>
                      </tr>
                      <tr>
                        <td>Psychological Problems</td>
                        <td>Psychological evaluation and treat behavioral issues<br />Medication: XXXXXX</td>
                      </tr>
                      <tr>
                        <td>Add patient's problems/issues here</td>
                        <td>Add recommended treatment here<br />Medication: XXXXXX</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="appointmentHistory-recommended-section">
                  <div className="appointmentHistory-recommended-medicines">
                    <h3>Recommended Medicines</h3>
                    <p>Medicine 1 - XXXXXX</p>
                    <p>Medicine 2 - XXXXXX</p>
                    <p>Medicine 3 - XXXXXX</p>
                  </div>
                  <div className="appointmentHistory-recommended-doctor">
                    <h3>Recommended Doctor</h3>
                    <p>Detail 1 - XXXXXX</p>
                    <p>Detail 2 - XXXXXX</p>
                    <p>Detail 3 - XXXXXX</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
