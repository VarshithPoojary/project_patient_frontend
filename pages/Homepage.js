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
              <h3>98%</h3>
              <p>Patient Satisfaction Rate</p>
            </div>
            <div className="home-services-card">
              <img src="/images/hospital-icon2.png" alt="Clinics" />
              <h3>400+</h3>
              <p> Successful Home Treatments </p>
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

      <section id="ourServices" className="homeSection-ourServices-section">
      <h2>Our <span class="services-highlight">Services</span></h2>
      <div className="homeSection-ourServices-service">
    <div className="homeSection-ourServices-content">
      <h2>Interconsultation</h2>
      <p>Connect with specialists for expert opinions and collaborative care. Our interconsultation service ensures comprehensive evaluations and personalized treatment plans.</p>
            </div>
    <button className="homeSection-ourServices-button">LEARN MORE</button>
  </div>
  <div className="homeSection-ourServices-service">
    <div className="homeSection-ourServices-content">
      <h2>Medication Order</h2>
      <p>Easily order your prescribed medications online. Our service provides a convenient way to manage and refill your prescriptions, ensuring you never miss a dose.</p>
            </div>
    <button className="homeSection-ourServices-button">LEARN MORE</button>
  </div>
  <div className="homeSection-ourServices-service">
    <div className="homeSection-ourServices-content">
      <h2>Health Monitoring      </h2>
      <p>Track your health metrics with our integrated monitoring system. Our service helps you stay on top of your health by providing regular updates and personalized recommendations.</p>
      </div>
    <button className="homeSection-ourServices-button">LEARN MORE</button>
  </div>
  {/* <div className="homeSection-ourServices-service">
    <div className="homeSection-ourServices-content">
      <h2>Medication Order</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <button className="homeSection-ourServices-button">LEARN MORE</button>
  </div> */}
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
            <img src="/images/fullDoctor-2.png" alt="Specialists" layout="fill" objectFit="content" />
          </div>
        </div>
      </section>

      

      {/* <section>
        <div className="homeSection-card">
          <h3>Emergency Care</h3>
          <p>We understand the importance of immediate access to high-quality emergency medical services. You can trust our dedicated team to provide you with 24/7 emergency medical services.</p>
        </div>
      </section> */}

      <section id="about" class="homeSection-section homeSection-about">
    <div class="homeSection-about-content">
        <h2>About <span class="highlight">us</span></h2>
        <p>Our mission is to deliver high-quality healthcare services directly to your doorstep. Our team of experienced and compassionate healthcare professionals is dedicated to your well-being, ensuring you receive the best care in the comfort of your home.</p>  <button class="get-in-contact">Get in Contact</button>
    </div>
    <div class="homeSection-about-image">
        <img src="/images/home-doc1.jpg" alt="Doctor shaking hands with a patient"/>
    </div>
</section>
<section id="mission" class="homeSection-section homeSection-mission">
    <div class="homeSection-mission-content">
        <h2>Our Mission</h2>
        <div class="homeSection-mission-text">
            <p>At CareConnect, our mission is to provide accessible, high-quality healthcare services to everyone. We aim to connect patients with the best specialists and doctors for their needs, ensuring personalized and efficient care.</p>
           <p>Through our platform, you can easily find and book appointments with healthcare professionals, access your medical records, and manage your healthcare journey seamlessly. Your health and well-being are our top priorities, and we are committed to supporting you every step of the way.</p>
           </div>
        <button class="send-message">Send Us a Message</button>
    </div>
</section>

<section id="values" class="homeSection-section homeSection-values">
    <div class="homeSection-values-content">
        <h2>Our <span class="highlight"> Values</span></h2>
        <div class="homeSection-values-list">
            <div class="homeSection-values-item">
                <div class="homeSection-values-icon">
                    <img src="/images/home-eye.png" alt="Honesty Icon"/>
                </div>
                <h3>Honesty</h3>
                <div class="homeSection-values-text">
                    <p>We embrace honesty as a fundamental value, essential to building trust and fostering strong relationships with our patients. At CareConnect, we are truthful and transparent in all our interactions, ensuring that our patients receive the highest level of care with integrity.</p>
                    </div>
            </div>
            <hr class="values-line"/>
            <div class="homeSection-values-item">
                <div class="homeSection-values-icon">
                    <img src="/images/home-quality.png" alt="Quality Icon"/>
                </div>
                <h3>Highest Quality</h3>
                <div class="homeSection-values-text">
                    <p>We are dedicated to delivering the highest quality healthcare services, constantly striving for excellence in everything we do. Our team of experts utilizes the latest advancements in medical technology and techniques to provide personalized care that exceeds our patients' expectations.</p>
                    </div>
            </div>
            <hr class="values-line"/>
            <div class="homeSection-values-item">
                <div class="homeSection-values-icon">
                    <img src="/images/home-responsibility.png" alt="Quality Icon"/>
                </div>
                <h3>Responsibility</h3>
                <div class="homeSection-values-text">
                    <p>We take ownership of our actions and decisions, acknowledging our responsibility to provide dependable and compassionate care. Our team is committed to being accountable for every aspect of our services, ensuring that our patients receive the best possible care.</p>
                     </div>
            </div>
        </div>
    </div>
    <div class="homeSection-values-image">
        <img src="/images/home-doc7.jpg" alt="Doctor"/>
    </div>
</section>


<section id="contact" className="homeSection-section homeSection-contact">
  <div className="homeSection-contact-container">
    <div className="homeSection-contact-info-container">
      <h2 className="homeSection-contact-title">Get in touch</h2>
      <p className="homeSection-contact-subtitle">Get in touch with us to schedule an appointment or inquire about our services.</p>
      <div className="homeSection-contact-details">
        <p>Call us</p>
        <p className="homeSection-contact-info">(+91) 9 11 2405 4775</p>
      </div>
      <div className="homeSection-contact-details">
        <p>Email us</p>
        <p className="homeSection-contact-info">contact@msupport.com</p>
      </div>
    </div>
    <div className="homeSection-contact-form-container">
      <form className="homeSection-contact-form">
        <label>Name*</label>
        <input type="text" placeholder="Write down your name" required />
        <label>Email Address*</label>
        <input type="email" placeholder="Share your email address" required />
        <label>Phone*</label>
        <input type="tel" placeholder="Share your phone number" required />
        <label>Message*</label>
        <textarea placeholder="Write your message here" required></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</section>


    </div>
  );
}

export default HomeContent;
