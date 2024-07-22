import React, { useEffect, useState } from 'react';
import { specialist_list } from '../../actions/specialistAction';
import Router from 'next/router';
import Topbar from '../topbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Specialist() {
  const [values, setValues] = useState({
    specialistList: [],
    doctorsList: [],
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
        specialist_type_name: specialistName
      }
  });  };


  return (
    <>
      <Topbar />
      <div className="specialist-container my-8">
      <h2 class="specialist-view-heading"><span class="serif">Choose A </span><span class="sans-serif"> Specialist </span><span class="serif"> You Want </span></h2>
        {/* <h2 className="text-center mb-4">Choose a Specialist You Want</h2> */}
        <div className="home-specialists-container">
        <div className="home-specialists-grid">
            {values.specialistList.map((specialist, index) => (
              <div
                key={index}
                className="home-specialist-card"
                onClick={() => handleViewDoctors(specialist.specialist_type_name)}
                style={{ cursor: 'pointer' }}
              >
                <img src={specialist.admin_icon} alt={specialist.specialist_type_name} />
                <h6>{specialist.specialist_type_name}</h6>
              </div>
            ))}
          </div>
          <div className="specialist-side-image">
            <img src="/images/fullDoctor-1.png" alt="Specialists" layout="fill" objectFit="cover" />
          </div>
          </div>
           <div className='specialist-view-footer'>

</div>
        </div>
        <div className="specialist-floating-button">
        <button className="specialist-btn-warning">Book Appointment</button>
      </div>
    </>
  );
}

export default Specialist;
