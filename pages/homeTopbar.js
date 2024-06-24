import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const TopBarHome = (children) => {
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
                    <Link href="/Home">
                        <a className="home-nav-link">Home</a>
                    </Link>
                </li>
                <li className="home-nav-item">
                    <Link href="./Home#services">
                        <a className="home-nav-link">Service</a>
                    </Link>
                </li>
                <li className="home-nav-item">
                    <Link href="./Home#specialist">
                        <a className="home-nav-link">Specialist</a>
                    </Link>
                </li>
                <li className="home-nav-item">
                    <Link href="./Home#about">
                        <a className="home-nav-link">About</a>
                    </Link>
                </li>
                <li className="home-nav-item">
                    <Link href="./Home#help">
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
        </div>
    );
};

export default TopBarHome;