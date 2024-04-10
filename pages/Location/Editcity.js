import Link from 'next/link';
import React, { Fragment } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import { API } from '../../config';
import Header from '../Header';
import Topbar from '../topbar';
import { country_list } from '../../actions/countryAction';
import { state_list, state_list_by_country_id } from '../../actions/stateAction';
import { CityListById, update_city } from '../../actions/cityAction';



const cookies = new Cookies();

const CityEdit = () => {
    const router = useRouter();
    const [values, setValues] = useState({
        admin_city_name: '',
        admin_state_id: '',
        state_name:'',
        admin_country_id: '', 
        country_name:'',
        admin_pincode: '',
        admin_updated_by_id:'',
        countrydetail: [],
        statedetail: [],
        loading: false
    });

    const [msg, setmsg] = useState('');
    const { admin_city_name, admin_country_id,country_name, admin_state_id,state_name,admin_pincode, countrydetail, statedetail, loading } = values;

    useEffect(() => {
        if (router.query._id) {
            loadCityDetails();
        }
    }, [router.query._id]);

    const loadCityDetails = () => {
        country_list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                state_list().then(state => {
                    if(state.error){
                        console.log(state.error);
                    } else {
                        CityListById(router.query._id).then(city => {
                            if (city.error) {
                                console.log(city.error);
                            } else {
                                setValues({
                                    ...values,
                                    admin_city_name: city.city_list[0]. admin_city_name,
                                    admin_state_id: city.city_list[0]. admin_state_id,
                                    admin_country_id: city.city_list[0]. admin_country_id,
                                    admin_pincode: city.city_list[0]. admin_pincode,
                                    country_name: city.city_list[0].country_name,
                                    state_name:city.city_list[0].state_name,
                                    countrydetail: data.admin_country_list,
                                    statedetail: state.state_list
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    const _id = router.query._id;
    const admin_updated_by_id = localStorage.getItem('id');
    const city_data = { _id, admin_city_name, admin_country_id, admin_state_id,admin_pincode, admin_updated_by_id };

    update_city(city_data).then(res => {
        if (res.error) {
            console.log(res.error);
        } else {
            setValues({ ...values, loading: true });
            setTimeout(() => {
                setValues({ ...values, loading: false });
                Router.push(`/Location/viewCity`);
            }, 1000);
        }
    });
};

const handleChange = name => e => {
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    if (name === "admin_country_id") {
        state_list_by_country_id(value).then(data1 => {
            if (data1.error) {
                console.log(data1.error);
            } else {
                setValues({ ...values, statedetail: data1.state_list, admin_country_id: value });
            }
        });
    }
};

  

return (
    <div id="wrapper">
           <Head>
      <title>Edit City</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="title" content='Edit City' />
      <link rel="icon" href="/images/title_logo.png" />
    </Head>
        <Header/>
        <Topbar/>
        <div className="content-page">
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card mb-4" style={{ width: "600px", marginTop: "40px" }}>
                                <div className="card-header">Edit City here</div>
                                <div className="card-body" style={{ maxWidth: "400px" }}>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col">
                                                <label className="small mb-1" htmlFor="text">Country Name</label>
                                                <select className="form-control" id="admin_country_id" name="admin_country_id" value={admin_country_id} onChange={handleChange('admin_country_id')} required style={{ width: "105%" }}>
                                                    {countrydetail.map(country => (
                                                        <option key={country._id} value={country._id}>
                                                            {country.admin_country_name}
                                                        </option>
                                                    ))}
                                                </select>                                             
                                            </div>
                                      
                                            <div className="col">
                                                <label className="small mb-1" htmlFor="text">State Name</label>
                                                <select className="form-control" id="admin_state_id" name="admin_state_id" value={admin_state_id} onChange={handleChange('admin_state_id')} required>
                                                    {statedetail.map(state => (
                                                        <option key={state._id} value={state._id}>
                                                            {state.admin_state_name}
                                                        </option>
                                                    ))}
                                                </select>                                          
                                            </div>
                                        </div>
                                        <div className="row">
                                        <div className="col">
                                            <label className="small mb-1" htmlFor="admin_city_name">City Name</label>
                                            <input className="form-control" id="admin_city_name" type="text" placeholder="Enter City Name" name="admin_city_name" value={admin_city_name} onChange={handleChange('admin_city_name')} required style={{ width: "105%" }} />
                                        </div>
                                            <div className="col">
                                                <label className="small mb-1" htmlFor="number">Pincode</label>
                                                <input className="form-control" id="admin_pincode" type="number" placeholder="Enter Pincode" name="admin_pincode" value={admin_pincode} onChange={handleChange('admin_pincode')} required style={{ width: "105%" }} />
                                            </div>
                                        </div>
                                        <button className="btn btn-primary" type="submit" style={{  background: "linear-gradient(to bottom, #7ebce9, #1e7bb5)", borderColor: "#0c9da8", marginTop:"10px" }}>Submit</button>
                                        {loading ? (<div className="alert alert-success margin-top-10">Edited Successfully</div>) : null}
                                    </form>
                                </div>
                            </div>
                            {msg ? (<div className="alert alert-success margin-top-10"> {msg}</div>) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};
export default CityEdit;