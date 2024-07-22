import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Topbar from '../topbar';
import { FaGraduationCap, FaPhone, FaEye, FaDownload } from 'react-icons/fa';
import { appointment_list_by_patientId } from '../../actions/appointmentAction';
import { addRatings } from '../../actions/doctorAction';
import ReactStars from 'react-rating-stars-component';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CompletedAppointments = () => {
    const defaultProfileImage = '/images/doctorMenLogo.png';
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [selectedAppointmentIndex, setSelectedAppointmentIndex] = useState(null);
    const [rating, setRating] = useState(0);
    const [ratedDoctors, setRatedDoctors] = useState([]);
    const [showBill, setShowBill] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem('id');
        if (userId) {
            loadAppointments(userId);
            loadRatedDoctors(userId);
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
            const completedAppointments = data.appointment_list
                .filter(app => app.status === 'Done')
                .sort((a, b) => {
                    const dateA = new Date(a.appointment_date);
                    const dateB = new Date(b.appointment_date);
                    
                    if (dateA < dateB) return 1;
                    if (dateA > dateB) return -1;
                    
                    const earliestFeeDateA = new Date(
                        Math.min(...a.amount_details.map(detail => new Date(detail.treatment_fees_created_date)))
                    );
                    const earliestFeeDateB = new Date(
                        Math.min(...b.amount_details.map(detail => new Date(detail.treatment_fees_created_date)))
                    );
                    
                    if (earliestFeeDateA < earliestFeeDateB) return 1;
                    if (earliestFeeDateA > earliestFeeDateB) return -1;
                    
                    return 0;
                });
    
            setAppointments(completedAppointments);
            if (completedAppointments.length > 0) {
                setSelectedAppointment(completedAppointments[0]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };
    

    const loadRatedDoctors = (userId) => {
        const ratedDoctors = JSON.parse(localStorage.getItem(`${userId}_rated_doctors`) || '[]');
        setRatedDoctors(ratedDoctors);
    };

    const handleView = (appointment) => {
        setSelectedAppointment(appointment);
        setSelectedAppointmentIndex(appointments.indexOf(appointment));
        setShowBill(false);
    };

    const handleRatingChange = async (newRating) => {
        setRating(newRating);
        await handleRatingSubmit(newRating);
    };

    const handleRatingSubmit = async (newRating) => {
        const userId = localStorage.getItem('id');
        try {
            const ratingData = {
                caretaker_id: selectedAppointment.caretaker_id,
                rating: newRating
            };
            const data = await addRatings(ratingData);
            const updatedRatedDoctors = [...ratedDoctors, selectedAppointment.caretaker_id];
            localStorage.setItem(`${userId}_rated_doctors`, JSON.stringify(updatedRatedDoctors));
            setRatedDoctors(updatedRatedDoctors);
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

    const hasRatedDoctor = (doctorId) => {
        return ratedDoctors.includes(doctorId);
    };

    const handleShowBill = () => {
        setShowBill(true);
    };

    const handleHideBill = () => {
        setShowBill(false);
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
    
        const img = new Image();
        img.src = '/images/title_logo.png';
    
        img.onload = () => {
            addPage(doc, img, selectedAppointment, 1);
    
            doc.addPage();
    
            addPage(doc, img, selectedAppointment, 2);
    
            doc.save('invoice.pdf');
        };
    };
    
    const addPage = (doc, img, selectedAppointment, pageNumber) => {
        doc.setDrawColor(0);
        doc.setLineWidth(0.7);
        doc.rect(10, 10, 190, 277);
    
        doc.addImage(img, 'PNG', 20, 20, 20, 20);
        doc.setFontSize(20);
        doc.setTextColor("#1464af");
        doc.setFont("helvetica", "bold");
        doc.text('CareConnect Booking System', 60, 30);
    
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
    
        if (pageNumber === 1) {
            doc.text('Patient name:', 14, 60);
            doc.text(selectedAppointment.patient_name, 50, 60);
    
            doc.text('Appointment Date:', 14, 70);
            doc.text(new Date(selectedAppointment.appointment_date).toLocaleDateString(), 50, 70);
    
            doc.text('Date Of Birth:', 14, 80);
            doc.text(selectedAppointment.patient_dob, 50, 80);
    
            doc.text('Gender:', 14, 90);
            doc.text(selectedAppointment.patient_gender, 50, 90);
    
            doc.text('Doctor:', 14, 100);
            doc.text(selectedAppointment.doctor_name, 50, 100);
    
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "bold");
            doc.text('Treatment Fees', 90, 120);
    
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "normal");
            doc.setDrawColor(0);
            doc.setLineWidth(0.7);
    
            const treatmentFeesColumns = ['S.No.', 'Treatment Name', 'Price'];
            const treatmentFeesRows = selectedAppointment.amount_details.map((detail, index) => [
                index + 1,
                detail.treatmentName || 'N/A',
                parseFloat(detail.amount).toFixed(2)
            ]);
    
            doc.autoTable({
                head: [treatmentFeesColumns],
                body: treatmentFeesRows,
                startY: 130,
                margin: { top: 10 }
            });
    
            const total = selectedAppointment.amount_details.reduce((acc, detail) => acc + parseFloat(detail.amount), 0);
    
            doc.text(`Total Amount: ₹ ${total.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);
    
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "bold");
            doc.text('Treatment Disclaimer', 85, doc.autoTable.previous.finalY + 30);
    
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "normal");
    
            const disclaimerColumns = ['Description'];
            const disclaimerRows = [[selectedAppointment.disclaimer || 'N/A']];
    
            doc.autoTable({
                head: [disclaimerColumns],
                body: disclaimerRows,
                startY: doc.autoTable.previous.finalY + 40,
                margin: { top: 10 }
            });
        } else if (pageNumber === 2) {
            doc.text('Patient name:', 14, 60);
            doc.text(selectedAppointment.patient_name, 50, 60);
    
            doc.text('Doctor:', 14, 70);
            doc.text(selectedAppointment.doctor_name, 50, 70);
    
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "bold");
            doc.text('Treatment Medicine', 90, 98);
    
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "normal");
            doc.setDrawColor(0);
            doc.setLineWidth(0.7);
            doc.line(14, 100, 195, 100);
    
            const treatmentMedicinesColumns = ['Description'];
            const treatmentMedicinesRows = selectedAppointment.amount_details.map(detail => [
                detail.description || 'N/A'
            ]);
    
            doc.autoTable({
                head: [treatmentMedicinesColumns],
                body: treatmentMedicinesRows,
                startY: 110,
                margin: { top: 10 }
            });
        }
    };
    
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Topbar />
            <div className='appointmentReport-main'>
                <div className="appointmentReport-container">
                    <div className="appointmentReport-left">
                        <h1>Reports</h1>
                        {appointments.map((appointment, index) => (
                            <div
                                key={index}
                                className={`appointmentReport-item ${index === selectedAppointmentIndex ? 'appointmentReport-item-selected' : ''}`}
                            >
                                <div className="appointmentReport-date">
                                    {new Date(appointment.appointment_date).toLocaleDateString('en-US', {
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
                                <div className="appointmentReport-topbar">Medical Report</div>
                                <div className="invoice-header">
                                    <img
                                        src={selectedAppointment.doctor_profile_img || defaultProfileImage}
                                        alt="Profile"
                                    />
                                    <div>
                                        <h4>{selectedAppointment.doctor_name}</h4>
                                        <h6><FaGraduationCap /> {selectedAppointment.caretaker_type}</h6>
                                        <p><FaPhone /> {selectedAppointment.caretaker_phone_number}</p>
                                        {!hasRatedDoctor(selectedAppointment.caretaker_id) ? (
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '300px' }}>
                                                    <h6>Rate the Doctor: </h6>
                                                    <ReactStars
                                                        count={5}
                                                        onChange={handleRatingChange}
                                                        size={24}
                                                        color2={'#f5bf4b'}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
                                    </div>
                                </div>
                                <div className="invoice-details">
                                    <div>
                                        <p>Appointment Dated On: {selectedAppointment.appointment_date}</p>
                                    </div>
                                    <div>
                                        <p>Timing: {selectedAppointment.slot_timing}</p>
                                    </div>
                                </div>
                                <div className="appointmentReport-disclaimer">
                                    <h3>Disclaimer </h3>
                                    {selectedAppointment.disclaimer}
                                </div>
                                <button className="appointmentReport-btn" onClick={handleShowBill}>View Bill</button>
                                {showBill && (
                                    <div className="bill-details">
                                        <table className="invoice-table">
                                            <thead>
                                                <tr>
                                                    <th>S.No.</th>
                                                    <th>Treatment Name</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedAppointment.amount_details.map((amount, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{amount.treatmentName}</td>
                                                        <td>{parseFloat(amount.amount).toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="invoice-total">
                                            Total: {selectedAppointment.amount_details.reduce((acc, amount) => acc + parseFloat(amount.amount), 0).toFixed(2)}/-
                                        </div>
                                        {selectedAppointment.amount_details.map((amount, index) => (
                                            <div className="appointmentReport-medicine" key={index}>
                                                <h3>Medicines</h3>
                                                {amount.description || 'N/A'}
                                            </div>   
                                        ))}
                                        <div className="appointmentReport-button">
                                            <button className="appointmentReport-btn" onClick={handleDownloadPDF}><FaDownload/> Download Bill</button>
                                            <button className="appointmentReport-btn" onClick={handleHideBill}>Close</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>No appointment selected.</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompletedAppointments;
