import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import Topbar from '../topbar';
import { appointment_list_by_patientId } from '../../actions/appointmentAction';
import { FaEye } from 'react-icons/fa';

const AllAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Upcoming');
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
            setAppointments(data.appointment_list);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleView = (_id, appointmentId) => {
        Router.push({
            pathname: '/Appointment/appointmentHistory',
            query: { _id, appointmentId }
        });
    };

    const filterAppointments = (status) => {
        switch (status) {
            case 'Upcoming':
                return appointments.filter(app => app.status === 'Accepted');
            case 'Pending':
                return appointments.filter(app => app.status === 'Active');
            case 'Completed':
                return appointments.filter(app => app.status === 'Done');
            case 'Rejected':
                return appointments.filter(app => app.status === 'Rejected');
            case 'Canceled':
                return appointments.filter(app => app.status === 'Canceled');
            default:
                return appointments;
        }
    };

    const groupAppointmentsByMonth = (appointments) => {
        return appointments.reduce((groups, appointment) => {
            const date = new Date(appointment.appointment_date);
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            const key = `${month} ${year}`;

            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(appointment);

            return groups;
        }, {});
    };

    const sortedGroupedAppointments = (appointments, reverse = false) => {
        const grouped = groupAppointmentsByMonth(appointments);
        const sortedKeys = Object.keys(grouped).sort((a, b) => reverse ? new Date(b) - new Date(a) : new Date(a) - new Date(b));

        return sortedKeys.map(key => ({
            monthYear: key,
            appointments: grouped[key].sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date))
        }));
    };

    const filteredAppointments = activeTab === 'Completed' || activeTab === 'Rejected' || activeTab === 'Canceled'
        ? sortedGroupedAppointments(filterAppointments(activeTab), true)
        : sortedGroupedAppointments(filterAppointments(activeTab));

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='appointmentList-main'>
            <Topbar />
            <div className="appointmentList-container">
                <div className="appointmentList-tabs">
                    <h1>Appointment History</h1>
                    {['Upcoming', 'Pending', 'Completed', 'Rejected', 'Canceled'].map(tab => (
                        <div
                            key={tab}
                            className={`appointmentList-tab ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
                <div className="appointmentList-table">
                    {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((group, index) => (
                            <div key={index} className="appointmentList-group">
                                <h5>{group.monthYear}</h5>
                                {group.appointments.map((appointment, index) => (
                                    <div key={index} className="appointmentList-appointment">
                                        <div className="appointmentList-appointmentDetails">
                                            <div className="appointmentList-date">
                                                {new Date(appointment.appointment_date).toLocaleDateString('en-US', {
                                                    weekday: 'short',
                                                    day: '2-digit',
                                                    // month: 'short',
                                                })}
                                            </div>
                                            <div>
                                                <img src={appointment.doctor_profile_img} alt={`${appointment.doctor_name}'s profile`} />
                                                {appointment.doctor_name}
                                            </div>
                                            <div>
                                                {appointment.slot_timing}
                                            </div>
                                            <div>
                                                {approvedStatusFormatter(appointment.status)}
                                            </div>
                                            <div className="appointmentList-actions">
                                                <button onClick={() => handleView(`${appointment.caretaker_id}`, `${appointment._id}`)} style={{ border: 'none', background: 'none' }}>
                                                    <FaEye />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div>No appointments found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const approvedStatusFormatter = (status) => {
    if (status === "Accepted") {
        return "Accepted";
    } else if (status === "Rejected") {
        return "Rejected";
    } else if (status === "Done") {
        return "Completed";
    } else {
        return "Active";
    }
};

export default AllAppointments;
