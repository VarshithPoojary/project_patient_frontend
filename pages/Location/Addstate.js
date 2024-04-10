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
import { country_list } from '../../actions/countryAction';
import { add_state } from '../../actions/stateAction';
import axios from 'axios';
import { API } from '../../config';


const cookies = new Cookies();

const StateAdd = () => {
    const [msg, setMsg] = useState('');
    const [values, setValues] = useState({
        
        country_list:[],
        admin_country_id:'',
        admin_state_name:''

    });
    
    const { admin_country_id,admin_state_name,loading } = values;

     useEffect(() =>{
        loadCountryNames() ;
    },[]);


    
    const loadCountryNames = () =>{
     
        country_list().then(data => {
             
            if (data.error) {
                console.log(data.error);
            } else {
                 
             
                setValues({ ...values, country_list: data.admin_country_list });
            }
        })
    
}

const handleSubmit = (e) => {
    e.preventDefault();
    const admin_created_by_id = localStorage.getItem('id');
    const state_data = { admin_country_id, admin_state_name, admin_created_by_id };

    add_state(state_data).then(res => {
        if (res.msg) {  
            setMsg(res.msg);
            setTimeout(() => {
                setMsg('');
        }, 1000);
        } else if (res.error) {
            setMsg('Error adding state. Please try again.');
            setTimeout(() => {
                setMsg('');
        }, 1000);
        } else {
            setValues({ ...values, loading: true });
            setTimeout(() => {
                setValues({ ...values, loading: false });
                Router.push('/Location/viewState');
            }, 1000);
        }
    });
};

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
        
    };

    return (
        <div id="wrapper">
               <Head>
      <title>Add State</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="title" content='Add State' />
      <link rel="icon" href="/images/title_logo.png" />
    </Head>
             <Topbar />
            <Header />
            <div className="content-page">
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12"  >
                            <div className="card mb-4" style={{ width: "600px", marginTop: "50px" }}>
                                <div className="card-header">Add State here</div>
                                <div className="card-body" style={{ maxWidth: "400px" }}>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="country_id">Country Name</label>
                                                    <select className="form-control" id="admin_country_id" name="admin_country_id" onChange={handleChange('admin_country_id')} required style={{ width: "105%" }}>
                                                        <option value="">Select Country</option>
                                                        {values.country_list.map(country => (
                                                    <option key={country._id} value={country._id}>
                                                        {country.admin_country_name}
                                                    </option>
                                                ))}
                                                    </select>
                                            </div>
                                        </div>
                                        
                                        <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="state_name">State Name</label>
                                            <input className="form-control" id="admin_state_name" type="text" placeholder="Enter State Name" name="admin_state_name" onChange={handleChange('admin_state_name')} required style={{ width: "105%" }} />
                                        </div>
                                    </div>
                                        <button className="btn btn-primary" type="submit" style={{   background: "linear-gradient(to bottom, #7ebce9, #1e7bb5)", borderColor: "#0c9da8" }}>Submit</button>
                                        {loading ? (<div className="alert alert-success margin-top-10">Added Successfully</div>) : null}
                                        {msg ? (<div className="alert alert-success margin-top-10"> {msg}</div>) : null}
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
export default StateAdd;