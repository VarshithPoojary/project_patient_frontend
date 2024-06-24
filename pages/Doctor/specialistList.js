import React, { useEffect, useState } from 'react';
import { specialist_list } from '../../actions/specialistAction';
import Router from 'next/router';
import Topbar from '../topbar';

const Doctors = () => {
  const [values, setValues] = useState({
    specialistList: [],
  });

  useEffect(() => {
    const user_id = localStorage.getItem('id');
    if (!user_id) {
      Router.push('/Patientlogin');
    } else {
      loadSpecialistType();
    }
  }, []);

  const loadSpecialistType = () => {
    specialist_list()
      .then((specialist) => {
        if (specialist.error) {
          console.log(specialist.error);
        } else {
          setValues({
            ...values,
            specialistList: specialist.admin_specialist_type_list,
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleViewDoctors = (specialistName) => {
    Router.push({
      pathname: '/Doctor/doctorListBySpecialist' ,
      query: {
        specialist_type_name: specialistName,
      }
  });  };

  return (
    <>
      <Topbar />
      <div className="specialist-container my-8">
        <h2 className="specialist-heading">DOCTORS</h2>
        <div className="row justify-content-center">
          {values.specialistList.map((specialist) => (
            <div key={specialist._id} className="col-md-3 mb-4 d-flex align-items-stretch">
              <div className="card specialist-card h-10 shadow-sm">
                <img
                  src={specialist.admin_icon}
                  className="card-img-top specialist-card-img-top"
                  alt={specialist.specialist_type_name}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title specialist-card-title">
                    {specialist.specialist_type_name}
                  </h5>
                  <button
                    className="specialist-view-btn"
                    onClick={() => handleViewDoctors(specialist.specialist_type_name)}
                  >
                    View Doctors
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="specialist-floating-button">
        <button className="specialist-btn-warning">Book Appointment</button>
      </div>
    </>
  );
};

export default Doctors;
