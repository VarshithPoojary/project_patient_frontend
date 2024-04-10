import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import { API } from '../../config';
import Header from '../Header';
import Topbar from '../topbar';
import { update_country, CountryListById } from '../../actions/countryAction';

const CountryEdit = () => {
    const router = useRouter();
    const [values, setValues] = useState({
        admin_country_name: ''
    });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const { admin_country_name } = values;


    useEffect(() => {
        loadStateDetails();
    }, [router.query._id]);

    const loadStateDetails = () => {
        CountryListById(router.query._id).then(country => {
            if (country.error) {
                console.log(country.error);
            } else {
                setValues({
                    ...values,
                    admin_country_name: country.admin_country_list[0].admin_country_name
                });
            }
        });
    };

    const handleSubmit =  (e) => {
        e.preventDefault();
        setLoading(true);
        const adminId = localStorage.getItem('id');
        var _id = router.query._id;
        const country_data = {
            country_id: _id,
            admin_country_name,
            admin_updated_by_id: adminId
        };

        try {
            const res =  update_country(country_data);
            if (res.error) {
                setValues({ ...values });
            } else {
                setMsg('Edited Successfully');
                setTimeout(() => {
                    setMsg('');
                }, 5000); 
                Router.push(`/Location/viewCountry`);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    return (
        <div id="wrapper">
               <Head>
      <title>Edit Country</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="title" content='Edit Country' />
      <link rel="icon" href="/images/title_logo.png" />
    </Head>
            <Header />
            <Topbar />
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12"  >
                                <div className="card mb-4" style={{ width: "600px", marginTop: "70px" }}>
                                    <div className="card-header">Edit Country here</div>
                                    <div className="card-body" style={{ maxWidth: "400px" }}>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-6">
                                                    <label className="small mb-1" htmlFor="admin_country_list">Country Name</label>
                                                    <input className="form-control" id="admin_country_name" type="text" placeholder="Enter Country Name" name="admin_country_name" value={values.admin_country_name} onChange={handleChange('admin_country_name')} required style={{ width: "105%" }} />
                                                </div>
                                            </div>
                                            <button className="btn btn-primary" type="submit" style={{  background: "linear-gradient(to bottom, #7ebce9, #1e7bb5)", borderColor: "#0c9da8", marginTop:"10px" }}>Submit</button>
                                        </form>
                                        {loading && <div className="alert alert-info">Loading...</div>}
                                        {msg && <div className="alert alert-success margin-top-10">{msg}</div>}
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

export default CountryEdit;
