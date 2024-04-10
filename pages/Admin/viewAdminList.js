import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Router from 'next/router';
import Header from '../Header';
import Topbar from '../topbar';
import { admin_list } from '../../actions/adminprofileAction';

const AdminView = () => {
    const [adminDetail, setAdminDetail] = useState([]);
    const [values, setValues] = useState({
        admindetail: []
    });

    const [msg, setMsg] = useState('')
    const { admindetail} = values;
    useEffect(() => {
        loadAdminDetails();
    }, []);

    const loadAdminDetails = () => {
        admin_list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, admindetail: data.admin_list });
            }
        })
    }

    

    return (
        <Fragment>
            <Head>
                <title>Admin List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header/>
            <Topbar/>
            <div className="container-viewLocation">
                <div className="center-table">
                    <center><h2><b>ADMIN LIST</b></h2></center>
                    
                    <BootstrapTable data={admindetail} search={true}>
                        <TableHeaderColumn dataField="sno" width="100" dataAlign="center" dataSort><b>S.No</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
                        
                        <TableHeaderColumn dataField="admin_firstname" dataSort><b>Admin Name</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="admin_mobile_no" dataSort><b>Mobile No.</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="admin_email" dataSort><b>Email</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="admin_type" dataSort><b>Type</b></TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        </Fragment>
    );
};

export default AdminView;
