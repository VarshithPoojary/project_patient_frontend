import Link from 'next/link';
import React, { Fragment } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Topbar from '../topbar';
import Header from '../Header';
import { add_country } from '../../actions/countryAction';
import axios from 'axios';
import { API } from '../../config';


const cookies = new Cookies();

const CountryAdd = () => {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [values, setValues] = useState({
        
        
        admin_country_name:''

    });
    const { admin_country_name } = values;
    

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const adminId = localStorage.getItem('id');
        try {
            const data = { admin_created_by_id: adminId, admin_country_name };
            const res = await add_country(data); 
            setLoading(false);
           if (res.msg) {
            setMsg(res.msg); 
            setTimeout(() => {
                setMsg('');
        }, 1000);
            } else  if (res.error) {
                console.error('Error adding country:', res.error);
                setTimeout(() => {
                    setMsg('');
            }, 1000);
            } else {
                setMsg('Added Successfully');
                setTimeout(() => {
                    setMsg('');
                    Router.push(`/Location/viewCountry`);
                }, 1000);
            }
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
            setMsg('An unexpected error occurred. Please try again.');
        }
    };

    

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
        
    };

    return (
        <div id="wrapper">
               <Head>
      <title>Add Country</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="title" content='Add Country' />
      <link rel="icon" href="/images/title_logo.png" />
    </Head>
            <Topbar/>
            <Header/>
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card mb-4" style={{ width: "600px", marginTop: "70px" }}>
                                    <div className="card-header">Add Country here</div>
                                    <div className="card-body" style={{ maxWidth: "400px" }}>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-6">
                                                    <label className="small mb-1" htmlFor="admin_country_name">Country Name</label>
                                                    <input className="form-control" id="admin_country_name" type="text" placeholder="Enter Country Name" name="admin_country_name" onChange={handleChange('admin_country_name')} required style={{ width: "105%" }} />
                                                </div>
                                            </div>
                                            <button className="btn btn-primary" type="submit" style={{  background: "linear-gradient(to bottom, #7ebce9, #1e7bb5)", borderColor: "#0c9da8" }}>Submit</button>
                                            {loading ? (<div className="alert alert-success margin-top-10">Added successfully</div>) : null}
                                            {msg && (<div className="alert alert-success margin-top-10">{msg}</div>)}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryAdd;