// src/App.js
import React from 'react';
import HomePage from './Homepage';
import Head from 'next/head';
import Footer from './Footer';
//import Navbar from './Navbar';


function App() {
    const appStyles = {
        backgroundImage: 'url("./images/bg_profile1.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', // Ensure that the background covers the entire viewport height
        padding: '20px', // Add padding to center content
        boxSizing: 'border-box', // Include padding in total width/height
      };

  return (
    
    <div style={appStyles}>
       <Head>
                <title>Home</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <nav className="navbar" style={{ position: 'fixed' }}>
        <img src="./icons/img1.png" alt="Logo" className="navbar-logo" />
    <ul className="navbar-navb ">
      <li className="nav-item"><a href="./Home" className="nav-link">Home</a></li>
      <li className="nav-item"><a href="#services" className="nav-link">Services</a></li>
      <li className="nav-item"><a href="#about" className="nav-link">About Us</a></li>
      <li className="nav-item"><a href="#contact" className="nav-link">Contact</a></li>
      <li className="nav-item"><a href="./Patientlogin" className="nav-link">LOGIN</a></li>
      
    </ul>
  </nav>
  <header style={{ textAlign: 'center', marginBottom:'30px', paddingTop:'120px'}}>
      <h1>Welcome to HealthCare Plus</h1>
      <p>Your trusted partner for healthcare services</p>
    </header>
  <section class="top-widgets">
  <div class="widget-mr" >
            <div class="container text-center">
                <div class="row justify-content-center">
                    <div class="col-md-11">
                        <div class="row row-cols-3 row-cols-lg-6 g-2 g-lg-4">
                               <div class="col">
                                 <a href="./Patientlogin" target="_blank" class="tp_widget" id="btn-cta-bb-book-appointment" style={{color:'#0071BA',fontWeight:'600px'}}>
                                    <img src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/bookappt_icon.svg" alt="icon" width="64"/>
                                    <h5>Book Appointment</h5>
                                 </a>
                              </div>
                               <div class="col  d-none d-sm-block">
                     <a href="./Registration" target="_blank" class="tp_widget" id="btn-cta-bb-book-prohealth">
                        <img src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/bookhelathcheck_icon.svg" alt="icon"/>
                        <h5>Book Health Check-Up</h5>
                     </a>
                  </div>
                  <div class="col d-sm-none d-block">
                     <a href="./Registration" target="_blank" class="tp_widget" id="btn-cta-bb-book-prohealth">
                        <img src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/bookhelathcheck_icon.svg" alt="icon"/>
                        <h5>Book Health Check-Up</h5>
                     </a>
                  </div>
                              <div class="col">
                                 <a href="./Registration" id="btn-cta-bb-consult-online" target="_blank" class="tp_widget">
                                    <img src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/buymedicines_icon.svg" alt="icon"/>
                                    <h5>Consult Online</h5>
                                 </a>
                              </div>
                              <div class="col">
                                 <a href="./Registration" id="btn-cta-bb-buy-medicine" target="_blank" class="tp_widget">
                                    <img src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/consultonline_icon.svg" alt="icon"/>
                                    <h5>Buy Medicine</h5>
                                 </a>
                              </div>
                            
                              <div class="col">
                                 <a href="./Registration" id="btn-cta-bb-find-hospital" class="tp_widget">
                                    <img src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/findhsptl_icon.svg" alt="icon"/>
                                    <h5>Find Hospital</h5>
                                 </a>
                              </div>
                              <div class="col">
                                 <a href="./Registration" target="_blank" id="btn-cta-bb-book-labtest" class="tp_widget">
                                    <img src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/finddoctor_icon.svg" alt="icon"/>
                                    <h5>View Health Record</h5>
                                 </a>
                              </div> 
    
    
                        </div>
                    </div>
                   
                </div>
    
    
            </div>
        </div>
        <div class="clear-fix"></div>
    
    </section>
        <HomePage />
        <Footer />
      </div>
    );
  }
  
  export default App;

