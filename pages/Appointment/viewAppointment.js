import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { FaGraduationCap, FaBriefcase, FaCalendarDay } from 'react-icons/fa';
import { FiMapPin, FiEdit2, FiXCircle,FiCalendar,FiClock } from 'react-icons/fi';
import Topbar from '../topbar';
import { caretaker_list_by_id } from '../../actions/doctorAction';
import { get_available_slots, update_appointment, appointment_cancel, appointment_list_by_id } from '../../actions/appointmentAction';
import { patient_list_by_id } from '../../actions/patientAction';
import moment from 'moment';

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
    doctorsDetail: '',
    appointmentDetail: '',
    loading: true,
    error: '',
  });

  const [patientAddress, setPatientAddress] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [dateRangeIndex, setDateRangeIndex] = useState(0);
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [slotTimings, setSlotTimings] = useState([]);
  const [selectedSlotTime, setSelectedSlotTime] = useState('');
  const [slotLoading, setSlotLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [canceled_type, setCanceled_type] = useState('Patient');


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user_id = localStorage.getItem('id');
      if (!user_id) {
        Router.push('/Patientlogin');
      } else {
        loadDoctor();
        loadPatientDetails(user_id);
        loadAppointment();
        generateDates();
      }
    }
  }, [router.query._id, dateRangeIndex]);

  useEffect(() => {
    setShowPreviousButton(dateRangeIndex > 0);
  }, [dateRangeIndex]);

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
          setPatientAddress(response.patient_list[0].patient_area_id);
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

  const generateDates = () => {
    const dates = [];
    const startDate = moment().add(dateRangeIndex * 7, 'days').startOf('day');
    for (let i = 0; i < 7; i++) {
      dates.push(startDate.clone().add(i, 'days'));
    }
    setAvailableDates(dates);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlotTime('');
    fetchAvailableSlots(date);
  };

  const fetchAvailableSlots = (date) => {
    setSlotLoading(true);
    get_available_slots({ caretaker_id: router.query._id, slot_date: date.format('YYYY-MM-DD') })
      .then((response) => {
        if (response.error) {
          console.error('Error fetching available slots:', response.msg);
          setSlotTimings([]);
        } else {
          const timings = response.slot_list.reduce((acc, slot) => {
            return acc.concat(slot.slot_timings.map(timing => ({
              slot_id: slot._id,
              slot_time: timing.slot_time,
              slot_timing_id: timing._id,
            })));
          }, []);
          setSlotTimings(timings);
        }
        setSlotLoading(false);
      })
      .catch((error) => {
        console.error('Network error fetching available slots:', error);
        setSlotTimings([]);
        setSlotLoading(false);
      });
  };

  const handleSelectSlotTime = (slotTime) => {
    setSelectedSlotTime(slotTime);
  };

  const handleNextWeek = () => {
    setDateRangeIndex(dateRangeIndex + 1);
  };

  const handlePreviousWeek = () => {
    setDateRangeIndex(dateRangeIndex - 1);
  };
 
  const handleConfirmAppointment = () => {
    if (!selectedDate || !selectedSlotTime) {
      setErrorMessage('Please select both a date and a time.');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return;
    }

    const selectedSlot = slotTimings.find(slot => slot.slot_time === selectedSlotTime);
    const appointmentData = {
      appointmentId: router.query.appointmentId,
      caretaker_id: router.query._id,
      patient_id: localStorage.getItem('id'),
      address_id: patientAddress,
      appointment_date: selectedDate.format('YYYY-MM-DD'),
      slot: selectedSlot.slot_id,
      slot_timing_id: selectedSlot.slot_timing_id,
    };

    update_appointment(appointmentData)
      .then(response => {
        if (response.error) {
          setErrorMessage(response.error);
          setTimeout(() => {
            setErrorMessage('');
          }, 2000);
        } else {
          Router.push(`/dashboard`);
        }
      })
      .catch(error => {
        console.error('Error confirming appointment:', error);
        setErrorMessage('An error occurred while confirming the appointment.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      });
  };

  const handleCancelConfirmAppointment = () => {
     setIsEditing(false)
     setSelectedSlotTime('')
     setSelectedDate('')

    }

  const handleDeleteAppointment = () => {
    if (!cancelReason) {
      setErrorMessage('Please provide a reason for cancellation.');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return;
    }

   

    const appointmentId = router.query.appointmentId;
    const cancelDetails = { appointmentId, cancelReason,canceled_type }
    appointment_cancel(cancelDetails)
      .then(response => {
        if (response.error) {
          setErrorMessage(response.error);
          setTimeout(() => {
            setErrorMessage('');
          }, 2000);
        } else {
          Router.push(`/dashboard`);
        }
      })
      .catch(error => {
        console.error('Error deleting appointment:', error);
        setErrorMessage('An error occurred while deleting the appointment.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      });
  };

  const handleCancelDeleteAppointment = () => {
    setIsCancelling(false)
    setCancelReason('')

   }

  const renderMonth = () => {
    return selectedDate ? selectedDate.format('DD MMMM YYYY') : '';
  };

  return (
    <div id="wrapper" style={{ backgroundColor: '#e9e6e6' }}>
      <Topbar />
      <div className="content-page" style={{ marginLeft: '10px', position: 'relative', zIndex: '0' }}>
        <div className="row-md-12" style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
          <div className="patient-content-page-doctorlist">
            <div className="doctor-details">
              <h3>Appointment with {values.doctorsDetail.caretaker_firstname} {values.doctorsDetail.caretaker_lastname}</h3>
              {/* <h4>Dated On {values.appointmentDetail.appointment_date} at {values.appointmentDetail.slot_timing}</h4> */}
              <div className="doctor-slot-container">
                <div className="specialistView-card">
                  <div className="specialist-card-content">
                    <div className="specialist-card-img">
                      <img
                        src={values.doctorsDetail.caretaker_profile_image || defaultProfileImage}
                        alt="Profile"
                        className="specialist-img"
                      />
                    </div>
                    <div className="specialist-info">
                      <h5 className="specialist-card-title">
                        {values.doctorsDetail.caretaker_firstname} {values.doctorsDetail.caretaker_lastname}
                      </h5>
                      <p className="specialist-card-text">{values.doctorsDetail.caretaker_type}</p>
                       <p> <FaGraduationCap /> {values.doctorsDetail.degree_name}
                        </p>
                     <p>
                        <FaBriefcase /> {values.doctorsDetail.caretaker_work_experience} years of experience
                        </p>
                      <div className="specialist-location">
                        <FiMapPin /> {values.doctorsDetail.caretaker_address}
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className="specialistView-card">
                    
                  <div className="appointment-info display-appointment-info row-md-3">
                    <p className='appointment-date-display '><strong><FiCalendar/> Date:</strong> {values.appointmentDetail.appointment_date}</p>
                    <p className='appointment-time-display '><strong><FiClock/> Time:</strong> {values.appointmentDetail.slot_timing}</p>
                  </div>
                  <div className="edit-button">
                    <button className="appointment-date-btn" onClick={() => setIsEditing(true)}><FiEdit2 /> Edit</button>
                    <button className="appointment-date-btn" onClick={() => setIsCancelling(true)}><FiXCircle /> Cancel</button>
                  </div>
                  {isEditing && (
                    <div className="edit-modal">
                      <h3>Edit Appointment</h3>
                      <div className="edit-content">
                      <h4>{renderMonth()}</h4>
                        <div className="date-selector">
                          {availableDates.map(date => (
                            <button
                              key={date.format('YYYY-MM-DD')}
                              className={`calendar-date ${selectedDate && date.isSame(selectedDate, 'day') ? 'selected' : ''}`}
                              onClick={() => handleDateChange(date)}
                            >
                              {date.format('ddd DD')}
                            </button>
                          ))}
                        </div>
                        <div className="time-slot-container">
                        {selectedDate && (
                  <>
                    {slotTimings.length > 0 ? (
                      <p>Select appointment time:</p>
                    ) : (
                      <p>No available slots for selected date</p>
                    )}
                    <div className="slot-timings" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                      {slotLoading ? (
                        <p>Loading slots...</p>
                      ) : slotTimings.length > 0 ? (
                        slotTimings.map((slot, index) => (
                          <button
                            key={index}
                            className={`time-slot ${selectedSlotTime === slot.slot_time ? 'selected' : ''}`}
                            onClick={() => handleSelectSlotTime(slot.slot_time)}
                          >
                            {slot.slot_time}
                          </button>
                        ))
                      ) : (
                        <p>Please select another date</p>
                      )}
                    </div>
                  </>
                )}
                        </div>
                        {showPreviousButton && <button className="appointment-date-btn" onClick={handlePreviousWeek}>Previous Week</button>}
                        <button className="appointment-date-btn" onClick={handleNextWeek}>Next Week</button>
                      </div>
                      <div className="edit-actions">
                      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <button className="appointment-date-btn" onClick={handleConfirmAppointment}>Confirm</button>
                        <button className="appointment-date-btn" onClick={handleCancelConfirmAppointment}>Cancel</button>
                      </div>
                    </div>
                  )}
                  {isCancelling && (
                    <div className="cancel-modal">
                      <h3>Cancel Appointment</h3>
                      <textarea
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        placeholder="Reason for cancellation"
                      />
                                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                      <div className="cancel-actions" >
                        <button className="appointment-date-btn" onClick={handleDeleteAppointment}>Confirm</button>
                        <button className="appointment-date-btn" onClick={handleCancelDeleteAppointment}>Cancel</button>
                      </div>
                    </div>
                  )}
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
