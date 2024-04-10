import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { country_list } from '../../actions/countryAction';
import { StateListById, update_state } from '../../actions/stateAction';
import Header from '../Header';
import Topbar from '../topbar';

const StateEdit = () => {
    const router = useRouter();
    const [values, setValues] = useState({
        admin_state_name: '',
        admin_country_id: '',
        countrydetail: []
    });

    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const { admin_state_name, admin_country_id, countrydetail } = values;

    useEffect(() => {
        loadStateDetails();
    }, [router.query._id]);

    const loadStateDetails = async () => {
        try {
            const countryData = await country_list();
            if (countryData.error) {
                console.log(countryData.error);
            } else {
                const stateData = await StateListById(router.query._id);
                if (stateData.error) {
                    console.log(stateData.error);
                } else {
                    setValues({
                        ...values,
                        admin_country_id: stateData.state_list[0].admin_country_id,
                        admin_state_name: stateData.state_list[0].admin_state_name,
                        countrydetail: countryData.admin_country_list
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit =  (e) => {
        e.preventDefault();
        setLoading(true);
        const stateData = {
            _id: router.query._id,
            admin_country_id,
            admin_state_name
        };

        try {
            const res =  update_state(stateData);
            if (res.error) {
                setValues({ ...values });
            } else {
                setMsg('State edited successfully');
                setTimeout(() => {
                    setMsg('');
                }, 5000); 
                Router.push(`/Location/viewState`);
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
      <title>Edit State</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="title" content='Edit State' />
      <link rel="icon" href="/images/title_logo.png" />
    </Head>
            <Header />
            <Topbar />
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card mb-4" style={{ width: "600px", marginTop: "50px" }}>
                                    <div className="card-header">Edit State here</div>
                                    <div className="card-body" style={{ maxWidth: "400px" }}>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-6">
                                                    <label className="small mb-1" htmlFor="admin_country_id">Country Name</label>
                                                    <select className="form-control" id="admin_country_id" name="admin_country_id" value={admin_country_id} onChange={handleChange('admin_country_id')} required style={{ width: "105%" }}>
                                                        {countrydetail.map(country => (
                                                    <option key={country._id} value={country._id}>
                                                        {country.admin_country_name}
                                                    </option>
                                                ))}
                                                    </select>                              
                                                     </div>
                                            </div>
                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-6">
                                                    <label className="small mb-1" htmlFor="admin_state_name">State Name</label>
                                                    <input className="form-control" id="admin_state_name" type="text" placeholder="Enter State Name" name="admin_state_name" value={admin_state_name} onChange={handleChange('admin_state_name')} required style={{ width: "105%" }} />
                                                </div>
                                            </div>
                                            <button className="btn btn-primary" type="submit" style={{  background: "linear-gradient(to bottom, #7ebce9, #1e7bb5)", borderColor: "#0c9da8", marginTop:"10px" }}>Submit</button>
                                            {loading && <div className="alert alert-info">Loading...</div>}
                                        </form>
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

export default StateEdit;
