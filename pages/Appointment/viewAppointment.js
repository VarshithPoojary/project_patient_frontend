import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { FaGraduationCap, FaBriefcase, FaCalendarDay, FaCheck, FaTimes, FaClock } from 'react-icons/fa';
import { FiMapPin, FiEdit2, FiXCircle, FiCalendar, FiClock, FiDelete } from 'react-icons/fi';
import Topbar from '../topbar';
import { caretaker_list_by_id } from '../../actions/doctorAction';
import { get_available_slots, update_appointment, appointment_cancel, appointment_list_by_id } from '../../actions/appointmentAction';
import { patient_list_by_id } from '../../actions/patientAction';
import moment from 'moment';
import Modal from 'react-modal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

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
          setValues((values) => ({ ...values, appointmentDetail: response.appointment_list[0] }));
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

    const selectedSlot = slotTimings.find((slot) => slot.slot_time === selectedSlotTime);
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
      .then((response) => {
        if (response.error) {
          setErrorMessage(response.error);
          setTimeout(() => {
            setErrorMessage('');
          }, 2000);
        } else {
          setModalMessage('Appointment successfully edited.');
          setIsModalOpen(true);
        }
      })
      .catch((error) => {
        console.error('Error confirming appointment:', error);
        setErrorMessage('An error occurred while confirming the appointment.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      });
  };

  const handleCancelConfirmAppointment = () => {
    setIsEditing(false);
    setSelectedSlotTime('');
    setSelectedDate('');
  };

  const handleDeleteAppointment = () => {
    if (!cancelReason) {
      setErrorMessage('Please provide a reason for cancellation.');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return;
    }
    const user_id = localStorage.getItem('id');
    const appointmentId = router.query.appointmentId;
    const cancelDetails = { appointmentId, cancelReason, canceled_type, user_id };
    appointment_cancel(cancelDetails)
      .then((response) => {
        if (response.error) {
          setErrorMessage(response.error);
          setTimeout(() => {
            setErrorMessage('');
          }, 2000);
        } else {
          setModalMessage('Appointment successfully canceled.');
          setIsModalOpen(true);
        }
      })
      .catch((error) => {
        console.error('Error deleting appointment:', error);
        setErrorMessage('An error occurred while deleting the appointment.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    Router.push(`/dashboard`);
  };

  const handleCancelDeleteAppointment = () => {
    setIsCancelling(false);
    setCancelReason('');
  };

  const renderMonth = () => {
    return selectedDate ? selectedDate.format('DD MMMM YYYY') : '';
  };

  return (
    <div id="wrapper" className="appointmentView-wrapper">
      <Topbar />
      <div className="appointmentView-content-page">
        <div className="appointmentView-row-md-12">
          <div className="appointmentView-patient-content-page-doctorlist">
            <div className="appointmentView-doctor-details">
              <h3>Appointment with {values.doctorsDetail.caretaker_firstname} {values.doctorsDetail.caretaker_lastname}</h3>
              <h6>Dated on {values.appointmentDetail.appointment_date} at {values.appointmentDetail.slot_timing}</h6>
              <div className="appointmentView-doctor-image">
                <img src={values.doctorsDetail.caretaker_profile_image || defaultProfileImage} alt="Doctor" />
              </div>
              <div className="appointmentView-doctor-info">
                <p><FaGraduationCap /> {values.doctorsDetail.degree_name}</p>
                <p><FaBriefcase /> {values.doctorsDetail.caretaker_work_experience} Years of Experience</p>
                <p><FiMapPin /> {values.doctorsDetail.caretaker_address}</p>
              </div>
              <div className="appointmentView-buttons">
              {values.appointmentDetail.status === 'Active' && (
                <button onClick={() => setIsEditing(true)} className="appointmentView-edit-button">
                  <FiEdit2 /> Edit Appointment
                </button>
              )}
                <button onClick={() => setIsCancelling(true)} className="appointmentView-delete-button">
                  <FiDelete /> Cancel Appointment
                </button>
              </div>
            </div>
            {isEditing && (
              <div className="appointmentView-appointment-details">
                <h4>Select a new date and time: </h4>
                <div className="appointmentView-dates">
                  {availableDates.map((date) => (
                    <div
                      key={date.format('YYYY-MM-DD')}
                      className={`appointmentView-date ${selectedDate && selectedDate.isSame(date, 'day') ? 'appointmentView-selected' : ''}`}
                      onClick={() => handleDateChange(date)}
                    >
                      {date.format('ddd, DD MMM')}
                    </div>
                  ))}
                </div>
                <div className="next-week-button">
                  {showPreviousButton && <button className="appointment-date-btn" onClick={handlePreviousWeek}>〈 Prev</button>}
                  <button className="appointment-date-btn" onClick={handleNextWeek}>Next 〉</button>
                </div>
                {selectedDate && (
                  <div className="appointmentView-slots">
                    {slotLoading ? (
                      <p>Loading available slots...</p>
                    ) : slotTimings.length === 0 ? (
                      <p>No available slots for the selected date.</p>
                    ) : (
                      slotTimings.map((slot) => (
                        <div
                          key={slot.slot_time}
                          className={`appointmentView-slot ${selectedSlotTime === slot.slot_time ? 'appointmentView-selected' : ''}`}
                          onClick={() => handleSelectSlotTime(slot.slot_time)}
                        >
                          {slot.slot_time}
                        </div>
                      ))
                    )}
                  </div>
                )}
                <p className='appointmentView-selected-date-time'><span><FiCalendar/> Date: {renderMonth() ? renderMonth() : "Select Date"}</span>
                <span> <FiClock/> Time: {selectedSlotTime ? selectedSlotTime : "Select Time"}</span></p>

                <div className="appointmentView-buttons">
                  <button onClick={handleConfirmAppointment} className="appointmentView-confirm-button">
                    <FaCheck /> Confirm
                  </button>
                  <button onClick={handleCancelConfirmAppointment} className="appointmentView-cancel-button">
                    <FaTimes /> Cancel
                  </button>
                </div>
              </div>
            )}
            {isCancelling && (
              <div className="appointmentView-cancel-confirmation">
                <h4>Reason for Cancellation:</h4>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Enter reason for cancellation"
                />
                <div className="appointmentView-buttons">
                  <button onClick={handleDeleteAppointment} className="appointmentView-delete-button">
                    <FiDelete /> Confirm Cancellation
                  </button>
                  <button onClick={handleCancelDeleteAppointment} className="appointmentView-cancel-button">
                    <FaTimes /> Cancel
                  </button>
                </div>
              </div>
            )}
            {errorMessage && <p className="appointmentView-error-message">{errorMessage}</p>}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="appointmentView-modal" overlayClassName="appointmentView-modal-overlay">
            <FaCheck className='Right-Icon'/>
              <h2>{modalMessage}</h2>
              <p>Your appointment has been successfully {modalMessage === 'Appointment successfully edited.' ? 'edited' : 'canceled'}.</p>
              <button onClick={closeModal} className="appointmentView-close-button">Close</button>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
