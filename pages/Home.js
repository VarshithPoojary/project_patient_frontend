import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import HomeContent from './Homepage';
import Footer from './Footer';
import { banner_list } from '../actions/bannerAction';

const App = () => {
    const [values, setValues] = useState({
        bannerList: [],
        loading: false
    });

    const { bannerList, loading } = values;

    useEffect(() => {
        loadBanner();
    }, []);

    const loadBanner = () => {
        banner_list()
            .then(banner => {
                if (banner.error) {
                    console.log(banner.error);
                } else {
                    setValues(values => ({
                        ...values,
                        bannerList: banner.banner_Image_list,
                    }));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setValues(values => ({ ...values, error: 'Error: Network request failed', loading: false }));
            });
    };

    const handleBookAppointment = () =>{
        Router.push('./Patientlogin');
    }


    return (
        <div className='home-app'>
            <Head>
                <title>Home</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <nav className="home-navbar">
                <img src="/images/title_logo.png" alt="Logo" className="home-navbar-logo" />
                <ul className="home-navbar-nav">
                    <li className="home-nav-item">
                        <Link href="./Home">
                            <a className="home-nav-link">Home</a>
                        </Link>
                    </li>
                    <li className="home-nav-item">
                        <Link href="#services">
                            <a className="home-nav-link">Service</a>
                        </Link>
                    </li>
                    <li className="home-nav-item">
                        <Link href="#specialist">
                            <a className="home-nav-link">Specialist</a>
                        </Link>
                    </li>
                    <li className="home-nav-item">
                        <Link href="#about">
                            <a className="home-nav-link">About</a>
                        </Link>
                    </li>
                    <li className="home-nav-item">
                        <Link href="#help">
                            <a className="home-nav-link">Help</a>
                        </Link>
                    </li>
                    <li className="home-nav-item">
                        <Link href="/Patientlogin">
                            <a className="home-nav home-signup-button">Sign In</a>
                        </Link>
                    </li>
                </ul>
            </nav>
            <header className="home-header">
                <div className="home-header-content">
                    <div className="home-header-text">
                        <h1 className="fade-slide-in">Your Health And Safety Is Our Priority</h1>
                        <p className="fade-slide-in">Now take the appointments by sitting at Home,save you time </p>
                        <button onClick={handleBookAppointment} className="home-signup-button fade-slide-in">Book Appointment</button>
                    </div>
                </div>
            </header>
            <section className="home-top-widgets">
                <div className="home-widget-mr">
                    <h2>What Would You Like To Do Today?</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-11">
                            <div className="row row-cols-3 row-cols-lg-6 g-2 g-lg-4">
                                <div className="col home-link-main">
                                <Link href="./Patientlogin">
                                <a  className="home-tp_widget" id="home-btn-cta-bb-book-appointment" style={{ color: '#0071BA', fontWeight: '600px' }}>
                                        <img src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/bookappt_icon.svg" alt="icon" width="64" />
                                        <h5>Book Appointment</h5>
                                    </a>
                        </Link>
                                </div>
                                <div className="col d-none d-sm-block home-link-main">
                                    <a href="./Registration" target="_blank" className="home-tp_widget" id="home-btn-cta-bb-book-prohealth">
                                        <img src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/bookhelathcheck_icon.svg" alt="icon" />
                                        <h5>Book Health Check-Up</h5>
                                    </a>
                                </div>
                                <div className="col d-sm-none d-block home-link-main">
                                    <a href="./Registration" target="_blank" className="home-tp_widget" id="home-btn-cta-bb-book-prohealth">
                                        <img src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/bookhelathcheck_icon.svg" alt="icon" />
                                        <h5>Book Health Check-Up</h5>
                                    </a>
                                </div>
                                <div className="col home-link-main">
                                    <a href="./Registration" id="home-btn-cta-bb-consult-online" target="_blank" className="home-tp_widget">
                                        <img src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/buymedicines_icon.svg" alt="icon" />
                                        <h5>Consult Online</h5>
                                    </a>
                                </div>
                                <div className="col home-link-main">
                                    <a href="./Registration" id="home-btn-cta-bb-buy-medicine" target="_blank" className="home-tp_widget">
                                        <img src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/consultonline_icon.svg" alt="icon" />
                                        <h5>Buy Medicine</h5>
                                    </a>
                                </div>
                                <div className="col home-link-main">
                                    <a href="./Registration" id="home-btn-cta-bb-find-hospital" className="home-tp_widget">
                                        <img src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/findhsptl_icon.svg" alt="icon" />
                                        <h5>Find Hospital</h5>
                                    </a>
                                </div>
                                <div className="col home-link-main">
                                    <a href="./Registration" target="_blank" id="home-btn-cta-bb-book-labtest" className="home-tp_widget">
                                        <img src="https://www.apollohospitals.com/wp-content/themes/apollohospitals/assets-v3/images/finddoctor_icon.svg" alt="icon" />
                                        <h5>View Health Record</h5>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-clear-fix"></div>
            </section>
            <section>
                <div className="home-top-section">
                    <Carousel
                        showArrows={true}
                        showThumbs={false}
                        infiniteLoop={true}
                        autoPlay={true}
                        interval={2000}
                    >
                        {bannerList.map((banner, index) => (
                            <div key={index} className="home-top-image">
                                <img src={banner.admin_banner_image_name} alt={`Banner ${index}`} />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </section>
            <HomeContent />
           
            <Footer />
        </div>
    );
};

export default App;