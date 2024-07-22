import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { FaGraduationCap, FaBriefcase, FaDownload } from 'react-icons/fa';
import { FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';
import Topbar from '../topbar';
import Head from 'next/head';
import { caretaker_list_by_id } from '../../actions/doctorAction';
import { appointment_list_by_id } from '../../actions/appointmentAction';
import { patient_list_by_id } from '../../actions/patientAction';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AppointmentPage = () => {
  const defaultProfileImage = '/images/doctorMenLogo.png';
  const router = useRouter();
  const { _id, appointmentId } = router.query;
  const [showBill, setShowBill] = useState(false);
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
          setValues((values) => ({ ...values, patientDetail: response.patient_list[0] }));
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
      addPage(doc, img, values, 1);
  
      doc.addPage();
  
      addPage(doc, img, values, 2);
  
      doc.save('invoice.pdf');
    };
  };
  
  const addPage = (doc, img, values, pageNumber) => {
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
      doc.text(values.patientDetail.patient_first_name, 50, 60);
  
      doc.text('Appointment Date:', 14, 70);
      doc.text(new Date(values.appointmentDetail.appointment_date).toLocaleDateString(), 50, 70);
  
      doc.text('Date Of Birth:', 14, 80);
      doc.text(values.patientDetail.patient_dob, 50, 80);
  
      doc.text('Gender:', 14, 90);
      doc.text(values.patientDetail.patient_gender, 50, 90);
  
      doc.text('Doctor:', 14, 100);
      doc.text(values.doctorsDetail.caretaker_firstname + ' ' + values.doctorsDetail.caretaker_lastname, 50, 100);
  
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
      const treatmentFeesRows = values.appointmentDetail.amount_details.map((detail, index) => [
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
  
      const total = values.appointmentDetail.amount_details.reduce((acc, detail) => acc + parseFloat(detail.amount), 0);
  
      doc.text(`Total Amount: ₹ ${total.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);
  
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0); 
      doc.setFont("helvetica", "bold");
      doc.text('Treatment Disclaimer', 85, doc.autoTable.previous.finalY + 30);
  
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
  
      const disclaimerColumns = ['Description'];
      const disclaimerRows = [[values.appointmentDetail.disclaimer || 'N/A']];
  
      doc.autoTable({
        head: [disclaimerColumns],
        body: disclaimerRows,
        startY: doc.autoTable.previous.finalY + 40,
        margin: { top: 10 }
      });
    } else if (pageNumber === 2) {
      doc.text('Patient name:', 14, 60);
      doc.text(values.patientDetail.patient_first_name, 50, 60);
  
      doc.text('Doctor:', 14, 70);
      doc.text(values.doctorsDetail.caretaker_firstname + ' ' + values.doctorsDetail.caretaker_lastname, 50, 70);
  
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0); 
      doc.setFont("helvetica", "bold");
      doc.text('Medicine Details', 90, 98);
  
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); 
      doc.setFont("helvetica", "normal");
      doc.setDrawColor(0);
      doc.setLineWidth(0.7);
      doc.line(14, 100, 195, 100);
  
      const treatmentDetails = values.appointmentDetail.amount_details.map(detail => [
        detail.description || 'N/A'
      ]).join(', ');
  
      doc.text(treatmentDetails, 14, 110, { maxWidth: 180 });
    }
  };
  
  
  
  
  const mapStatus = (status) => {
    switch (status) {
      case 'Accepted':
        return 'Accepted';
      case 'Active':
        return 'Pending';
      case 'Canceled':
        return 'Cancelled';
      case 'Done':
        return 'Completed';
      case 'Rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  return (
    <div id="wrapper" style={{ backgroundColor: '#e9e6e6' }}>
       <Head>
        <title>Appointment History</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content='Appointment History' />
        <link rel="icon" href="/images/title_logo.png" />
      </Head>
      <Topbar />
      <div className="content-page" style={{ marginLeft: '10px', position: 'relative', zIndex: '0' }}>
        <div className="row-md-12" style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
          <div className="appointmentHistory-patient-info-sheet">
            <div className="appointmentHistory-header">
              <h1>MEDICAL REPORT</h1>
              <h3>Appointment {mapStatus(values.appointmentDetail.status)}</h3>
            </div>
            <div className="appointmentHistory-doctor-info-section">
              <div className="appointmentHistory-doctor-details1">
                <div className="appointmentHistory-doctor-details-img">
                  <img
                    src={values.doctorsDetail.caretaker_profile_image || defaultProfileImage}
                    alt="Profile"
                    className="appointmentHistory-doctor-img"
                  />
                </div>
                <div className="appointmentHistory-doctor-details">
                  <h4>{values.doctorsDetail.caretaker_firstname} {values.doctorsDetail.caretaker_lastname}</h4>
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
            </div>
            <div className="appointmentHistory-patient-problems-treatments">
              <h2>Patient's Problems and Treatments</h2>
              <div className="appointmentReport-disclaimer">
                <h3>Disclaimer </h3>
                {values.appointmentDetail.disclaimer}
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
                      {values.appointmentDetail.amount_details && values.appointmentDetail.amount_details.map((amount, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{amount.treatmentName}</td>
                          <td>{parseFloat(amount.amount).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="invoice-total">
                    Total: ₹{values.appointmentDetail.amount_details.reduce((acc, amount) => acc + parseFloat(amount.amount), 0).toFixed(2)}/-
                  </div>
                  {values.appointmentDetail.amount_details && values.appointmentDetail.amount_details.map((amount, index) => (
                    <div className="appointmentReport-medicine" key={index}>
                      <h3>Medicines</h3>
                      {amount.description || 'N/A'}
                    </div>
                  ))}
                  <div className="appointmentReport-button">
                    <button className="appointmentReport-btn" onClick={handleDownloadPDF}><FaDownload /> Download Bill</button>
                    <button className="appointmentReport-btn" onClick={handleHideBill}>Close</button>
                  </div>
                </div>
              )}
            </div>
            {/* <div className="appointmentHistory-recommended-section">
              <div className="appointmentHistory-recommended-medicines">
                <h3>Recommended Medicines</h3>
                {values.appointmentDetail.recommended_medicines && values.appointmentDetail.recommended_medicines.map((medicine, index) => (
                  <p key={index}>{medicine}</p>
                ))}
              </div>
              <div className="appointmentHistory-recommended-doctor">
                <h3>Recommended Doctor</h3>
                {values.appointmentDetail.recommended_doctor && values.appointmentDetail.recommended_doctor.map((doctor, index) => (
                  <p key={index}>{doctor}</p>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
