import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { FaGraduationCap, FaBriefcase,FaCalendar, FaCheck } from 'react-icons/fa';
import { FiMapPin,FiCalendar } from 'react-icons/fi';
import Topbar from '../topbar';
import { caretaker_list_by_id } from '../../actions/doctorAction';
import { get_available_slots, add_appointment } from '../../actions/appointmentAction';
import { patient_list_by_id } from '../../actions/patientAction';
import moment from 'moment';
import Modal from 'react-modal';

const AppointmentPage = () => {
  const defaultProfileImage = '/images/doctorMenLogo.png';
  const router = useRouter();
  const { _id, doctorName } = router.query;
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
    loading: true,
    error: '',
  });

  const [patientAddress, setPatientAddress] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [dateRangeIndex, setDateRangeIndex] = useState(0);
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [slotTimings, setSlotTimings] = useState([]);
  const [selectedSlotTime, setSelectedSlotTime] = useState('');
  const [slotLoading, setSlotLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user_id = localStorage.getItem('id');
      if (!user_id) {
        Router.push('/Patientlogin');
      } else {
        loadDoctor();
        loadPatientDetails(user_id);
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
          setValues({
            ...values,
            doctorsDetail: response.caretaker_list[0],
            loading: false,
          });
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
            return acc.concat(slot.slot_timings.filter(timing => timing.book_status === 'Available').map(timing => ({
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
    setSelectedSlotTime('');
  };

  const handlePreviousWeek = () => {
    setDateRangeIndex(dateRangeIndex - 1);
  };

  const handleConfirmAppointment = () => {
    if (!selectedDate || !selectedSlotTime) {
      setErrorMessage('Please select both date and time.');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return;
    }

    const selectedSlot = slotTimings.find(slot => slot.slot_time === selectedSlotTime);
    const appointmentData = {
      caretaker_id: router.query._id,
      patient_id: localStorage.getItem('id'),
      address_id: patientAddress,
      appointment_date: selectedDate.format('YYYY-MM-DD'),
      slot: selectedSlot.slot_id,
      slot_timing_id: selectedSlot.slot_timing_id,
    };

    add_appointment(appointmentData)
      .then(response => {
        if (response.error) {
          setErrorMessage(response.error);
          setTimeout(() => {
            setErrorMessage('');
          }, 2000);
        } else {
          setIsModalOpen(true);
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

  const closeModal = () => {
    setIsModalOpen(false);
    Router.push(`/dashboard`);
  };

  const renderMonth = () => {
    return selectedDate ? selectedDate.format('DD MMMM YYYY') : '';
  };

  return (
    <div id="wrapper" style={{ backgroundColor: '#e9e6e6' }}>
      <Topbar />
      {/* <div className="appointment-banner">
        <img
          src="/images/doc-7.png"
          alt="Doctor"
          className='appointment-banner-doctor'
        />
          
           <h2 class="appointment-doctor-heading"><span class="serif">Book Appointment with </span>
           
           <span class="sans-serif">   {doctorName}</span></h2> 

           <img
          src="/images/clock-2.png"
          alt="Doctor"
          className='appointment-clock'
        />
      </div> */}
      <div className="content-page" style={{ margin: '15px', position: 'relative', zIndex: '0' }}>
        <div className="row-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="appointment-content-page">
          <h2 class="appointment-doctor-heading"><span class="serif">Book Appointment </span>
           
           {/* <span class="sans-serif">   {doctorName}</span> */}
           </h2> 
            <div className="doctor-slot-container">
              <div className="appointment-specialistView-card">
                <div className="appointment-specialist-card-content">
                  <div className="appointment-specialist-card-img">
                    <img
                      src={values.doctorsDetail.caretaker_profile_image || defaultProfileImage}
                      alt="Profile"
                      className="appointment-specialist-img"
                    />
                  </div>
                  <div className="appointment-specialist-info">
                    <h5 className="appointment-specialistView-title">
                      {values.doctorsDetail.caretaker_firstname} {values.doctorsDetail.caretaker_lastname}
                    </h5>
                    <label><FaGraduationCap /> {values.doctorsDetail.degree_name}</label>
                    <p><FaBriefcase /> {values.doctorsDetail.caretaker_work_experience} Years experienced overall</p>
                    <p><FiMapPin /> {values.doctorsDetail.caretaker_address}</p>
                   
                  </div>
                  
                </div>
                <div className='appointment-doctor-description'>
              <h1 style={{ color: '#1294a3', fontSize: '30px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>About Doctor:</h1>
                  <p style={{ color: 'black', fontSize: '15px', fontFamily: 'Arial, sans-serif' }}>{values.doctorsDetail.description}</p>
                  </div>
              </div>
              <div className="appointment-specialistView-card">
                <p>Select appointment date:</p>
                <h5 style={{color:'gray'}}>{renderMonth()}</h5>
                <div className="date-selector">
                  {availableDates.map((date, index) => (
                    <button
                      key={index}
                      className={`calendar-date ${date.isSame(selectedDate, 'day') ? 'selected' : ''}`}
                      onClick={() => handleDateChange(date)}
                    >
                      {date.format('ddd DD')}
                    </button>
                  ))}
                </div>
                <div className="next-week-button">
  {showPreviousButton && <button className="appointment-date-btn" onClick={handlePreviousWeek}>〈 Prev</button>}
  <button className="appointment-date-btn" onClick={handleNextWeek}>Next 〉</button>
</div>

                {selectedDate && (
                  <>
                    {slotTimings.length > 0 ? (
                      <p>Select appointment time:</p>
                    ) : (
                      <p >No available slots for selected date</p>
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
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <button className="appointment-btn" onClick={handleConfirmAppointment}>Confirm Date</button>
                  </>
                )}
              </div>
            </div>
           
          </div>
        </div>
          
      </div>
      <Modal isOpen={isModalOpen} className="appointmentView-modal" overlayClassName="appointmentView-modal-overlay">
        <FaCheck className='Right-Icon'/>
        <h2>Appointment Booked Successfully!</h2>
        <p>Your appointment has been requested.</p>
        <button  onClick={closeModal} className="appointmentView-close-button">OK</button>
      </Modal>
    </div>
  );
};

export default AppointmentPage;
