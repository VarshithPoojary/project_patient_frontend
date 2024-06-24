import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { specialist_list } from '../actions/specialistAction';

const HomeContent = () => {
  const [values, setValues] = useState({
    specialists: [],
    loading: false,
    error: ''
  });

  const { specialists, loading, error } = values;

  useEffect(() => {
    loadSpecialists();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadSpecialists = () => {
    specialist_list()
      .then(specialistData => {
        if (specialistData.error) {
          console.log(specialistData.error);
        } else {
          setValues(values => ({
            ...values,
            specialists: specialistData.admin_specialist_type_list,
          }));
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setValues(values => ({ ...values, error: 'Error: Network request failed', loading: false }));
      });
  };

  const handleViewDoctors = (specialistName) => {
    Router.push({
      pathname: '/Home/homeDoctorView',
      query: {
        specialist_type_name: specialistName,
      }
    });
  };

  const handleScroll = () => {
    const specialistSection = document.getElementById('specialist');
    const specialistImage = document.querySelector('.home-specialist-image');
    if (specialistSection && specialistImage) {
      const sectionTop = specialistSection.offsetTop;
      const sectionBottom = sectionTop + specialistSection.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > sectionTop - viewportHeight && scrollTop < sectionBottom) {
        specialistImage.classList.add('visible');
        window.removeEventListener('scroll', handleScroll);
      }
    }
  };

  return (
    <div className="homeSection-container">
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <section id="services" className="homeSection-section homeSection-services">
      <h2>Why Choose Us?</h2>
      <p>Best way to get Appointment</p>
      <div className="home-specialists-container">
      <div className="home-services-image">
            <img src="/images/homeServices.png" alt="services" />
          </div>
      <div className="home-services-grid">
            <div className="home-services-card">
              <img src="/images/hospital-icon1.png" alt="Hospitals" />
              <h3>73+</h3>
              <p>Total Hospital</p>
            </div>
            <div className="home-services-card">
              <img src="/images/hospital-icon2.png" alt="Clinics" />
              <h3>400+</h3>
              <p>Total Clinik </p>
            </div>
            <div className="home-services-card">
              <img src="/images/doctor-icon.png" alt="Doctors" />
              <h3>1,100+</h3>
              <p>Doctors across India</p>
            </div>
            <div className="home-services-card">
              <img src="/images/patient-icon.png" alt="Pharmacies" />
              <h3>5,000+</h3>
              <p>Registered Patients across India</p>
            </div>
          </div>
         
        </div>
      </section>

      <section id="specialist" className="homeSection-section homeSection-specialist">
        <h2>Explore our Specialists</h2>
        <p>We will Provide Best Specialists</p>
        <div className="home-specialists-container">
          <div className="home-specialists-grid">
            {specialists.map((specialist, index) => (
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
          <div className="home-specialist-image">
            <img src="/images/specalistImg.png" alt="Specialists" layout="fill" objectFit="cover" />
          </div>
        </div>
      </section>

      <section>
        <div className="homeSection-card">
          <h3>Emergency Care</h3>
          <p>We understand the importance of immediate access to high-quality emergency medical services. You can trust our dedicated team to provide you with 24/7 emergency medical services.</p>
        </div>
      </section>

      <section id="about" className="homeSection-section homeSection-about">
        <h2>About Us</h2>
        <div className="homeSection-card">
          <p>We are dedicated to providing high-quality healthcare services to our community. Our team of experienced healthcare professionals is committed to your well-being.</p>
          <h3 className="homeSection-subsection-title">Why Choose Us?</h3>
          <ul className="homeSection-choose-us-list">
            <li>Experienced and compassionate healthcare providers dedicated to your well-being.</li>
            <li>Convenient appointment scheduling and flexible hours to accommodate your busy lifestyle.</li>
            <li>State-of-the-art facilities equipped with the latest technology for accurate diagnosis and treatment.</li>
            <li>A commitment to excellence in patient care, safety, and satisfaction.</li>
          </ul>
        </div>
      </section>

      <section id="contact" className="homeSection-section homeSection-contact">
        <h2>Contact Us</h2>
        <p>Get in touch with us to schedule an appointment or inquire about our services.</p>
        <p>Phone: <span className="homeSection-contact-info">123-456-7890</span></p>
        <p>Email: <span className="homeSection-contact-info">info@healthcareplus.com</span></p>
      </section>
    </div>
  );
}

export default HomeContent;
