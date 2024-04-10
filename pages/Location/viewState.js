import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Router from 'next/router';
import Header from '../Header';
import Topbar from '../topbar';
import { state_list, DeleteStateDetails } from '../../actions/stateAction';



const StateView = () => {
    const [values, setValues] = useState({
       statedetail: [],
    });
    const [msg, setMsg] = useState('');
    const { statedetail} = values;


    useEffect(() => {
        loadStateDetails();
    }, []);

        const loadStateDetails = () => {
            state_list().then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, statedetail: data.state_list });
                }
            })
        }
    

    const handleEdit = (row) => {
        Router.push({
            pathname: '/Location/Editstate',
            query: {
                _id: row._id,

            }
        })
        }

    const handleDelete = (row) => {
        let created_by_id = localStorage.getItem('id');
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this country!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let query = { "_id": row._id, "created_by_id": created_by_id }
                DeleteStateDetails(query).then(data => {
                    loadStateDetails();
                    setMsg(`State "${row.admin_state_name}" deleted successfully.`);
                    setTimeout(() => {
                        setMsg('');
                    }, 2000); 
                });
            }
        });
    }
    


    const actionFormatter = (cell, row) => {
        return (
            <div>
                <button className="icons-edit" style={{ backgroundColor: "#7ebce9", borderColor: "#1e7bb5",width:"50px",marginLeft:"10px" }} onClick={() => handleEdit(row)}>
                    <FiEdit  />
                </button>
                <button className="icons-delete" style={{ backgroundColor: "#7ebce9", borderColor: "#1e7bb5",width:"50px",marginLeft:"20px" }} onClick={() => handleDelete(row)}>
                    <FiTrash2 />
                </button>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>State List</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='State List' />
                <link rel="icon" href="/images/title_logo.png" />
    
            </Head>
            <Header/>
            <Topbar/>
            <div className="container-viewLocation">
                
                <div className="center-table">
                    <center><h2><b>STATE LIST</b></h2></center>
                    <Link href="/Location/Addstate">
                        <a className="btn btn-success mb-3" style={{   background: "linear-gradient(to bottom, #7ebce9, #1e7bb5)", borderColor: "#0c9da8", width:'20%' }}>Add State</a>
                    </Link>
                    {msg && <div className="alert alert-success">{msg}</div>}
                    <BootstrapTable data={statedetail} search={true}>
                        <TableHeaderColumn dataField="sno" width="100" dataAlign="center" dataSort><b>S.No</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
                       
                        <TableHeaderColumn dataField="admin_state_name" dataSort><b>State Name</b></TableHeaderColumn>
                        {/* <TableHeaderColumn dataField="admin_country_id" dataSort><b>Country id</b></TableHeaderColumn> */}
                        <TableHeaderColumn dataField="admin_country_name" dataSort><b>Country Name</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="admin_firstname" dataSort><b>Created Admin</b></TableHeaderColumn>
                        <TableHeaderColumn dataField="actions" dataFormat={actionFormatter}><b>Actions</b></TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
            
        </Fragment>
    );
};

export default StateView;
