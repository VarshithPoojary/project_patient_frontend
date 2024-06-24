import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import Topbar from '../topbar';
import { appointment_list_by_patientId } from '../../actions/appointmentAction';
import { FaEye } from 'react-icons/fa';

const CompletedAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem('id');
        if (userId) {
            loadAppointments(userId);
        } else {
            router.push('/Patientlogin');
        }
    }, []);

    const loadAppointments = async (userId) => {
        try {
            const data = await appointment_list_by_patientId(userId);
            if (data.error) {
                console.log(data.error);
                return;
            }
            const completedAppointments = data.appointment_list.filter(app => app.status === 'Done');
            setAppointments(completedAppointments);
            if (completedAppointments.length > 0) {
                setSelectedAppointment(completedAppointments[0]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleView = (appointment) => {
        setSelectedAppointment(appointment);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='appointmentReport-main'>
            <Topbar />
            <div className="appointmentReport-container">
                <div className="appointmentReport-left">
                    <h1>Reports</h1>
                    {appointments.map((appointment, index) => (
                        <div key={index} className="appointmentReport-item">
                            <div className="appointmentReport-date">
                                {new Date(appointment.appointment_date).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    day: '2-digit',
                                    month: 'short',
                                })}
                            </div>
                            <div className="appointmentReport-doctor">
                                {appointment.doctor_name}
                            </div>
                            <div className="appointmentReport-actions">
                                <button onClick={() => handleView(appointment)} style={{ border: 'none', background: 'none' }}>
                                    <FaEye />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="appointmentReport-right">
                    {selectedAppointment ? (
                        <div className="appointmentReport-details">
                            <h2>{selectedAppointment.doctor_name}</h2>
                            <p>{new Date(selectedAppointment.appointment_date).toLocaleString()}</p>
                            <p>{selectedAppointment.slot_timing}</p>
                            <img src={selectedAppointment.doctor_profile_img} alt={`${selectedAppointment.doctor_name}'s profile`} />
                            <div>Medical Information 1</div>
                            <div>Medical Information 2</div>
                        </div>
                    ) : (
                        <div>No appointment selected.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompletedAppointments;
