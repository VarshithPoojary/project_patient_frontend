import React from 'react';
import Link from 'next/link';

const Patienteditprofile = () => {
  return (
    <div className="container">
      <div className="row flex-lg-nowrap">
        <div className="col">
          <div className="row">
            <div className="col mb-3">
              <div className="card">
                <div className="card-body" style={{ maxHeight: '600px', top: '50%', left: '50%', overflowY: 'auto', scrollbarWidth: 'thin' }}>
                  <div className="e-profile">
                    <div className="row">
                      <div className="col-12 col-sm-auto mb-3">
                        <div className="mx-auto" style={{ width: '140px' }}>
                          <div className="d-flex justify-content-center align-items-center rounded" style={{ height: '140px', backgroundColor: 'rgb(233, 236, 239)' }}>
                            <span style={{ color: 'rgb(166, 168, 170)', font: 'bold 8pt Arial' }}>140x140</span>
                          </div>
                        </div>
                      </div>
                  
                      <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                        <div className="text-center text-sm-left mb-2 mb-sm-0">
                          <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">aaaaa</h4>

                          <div className="text-muted"><small>Last seen 2 hours ago</small></div>
                          <div className="mt-2">
                            <button className="btn btn-primary" type="button">
                              <i className="fa fa-fw fa-camera"></i>
                              <span>Change Photo</span>
                            </button>
                          </div>
                        </div>
                        <div className="text-center text-sm-right">
                          <span className="badge badge-secondary">Patient</span>
                          <div className="text-muted"><small>Joined 09 Dec 2017</small></div>
                        </div>
                      </div>
                    </div>
            
                    {/* <ul className="nav nav-tabs">
                      <li className="nav-item"><a href="" className="active nav-link">Settings</a></li>
                    </ul> */}
               
                    <div className="tab-content pt-3">
                      <div className="tab-pane active">
                    
                        <form className="form" noValidate>
                          <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                              <label className="small mb-1" htmlFor="FirstName">First Name*</label>
                              <input className="form-control" id="FirstName" type="text" placeholder="Enter your first name"   />
                              
                            </div>
                            <div className="col-md-6">
                              <label className="small mb-1" htmlFor="LastName">Last Name*</label>
                              <input className="form-control" id="LastName" type="text" placeholder="Enter your last name"  />
                              
                            </div>
                          </div>

                          <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                              <label className="small mb-1" htmlFor="CountryCode">Country Code*</label>
                              <select className="form-control" id="CountryCode" >
                                <option value="India">India</option>
                              </select>
                            </div>
                            <div className="col-md-6">
                              <label className="small mb-1" htmlFor="Phone">Phone Number*</label>
                              <input className="form-control" id="Phone" type="tel" placeholder="Enter your phone number"  />
                              
                            </div>
                          </div>

                          <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                              <label className="small mb-1" htmlFor="Dob">Date Of Birth*</label>
                              <input className="form-control" id="Dob" type="date"  />
                              
                            </div>
                            <div className="col-md-6">
                              <label className="small mb-1">Gender*</label><br />
                              <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="male" name="gender"                                  />
                                <label className="form-check-label" htmlFor="male">Male</label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="female" name="gender" 
                                />
                                <label className="form-check-label" htmlFor="female">Female</label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="other" name="gender" 
                                 />
                                <label className="form-check-label" htmlFor="other">Other</label>
                              </div>
                             
                            </div>
                          </div>

                          <div className="mb-3">
                            <label className="small mb-1" htmlFor="Email">Email*</label>
                            <input className="form-control" id="Email" type="email" placeholder="Enter your email"  />
                            
                          </div>

                          <div className="mb-3">
                            <label className="small mb-1" htmlFor="Address">Address*</label>
                            <textarea className="form-control" id="Address" rows="3" placeholder="Enter your address" ></textarea>
                          </div>

                          <div className="row gx-3 mb-3">
                            <div className="col-md-4">
                              <label className="small mb-1" htmlFor="Country">Country*</label>
                              <select className="form-control" id="Country" >
                                <option value="India">India</option>
                              </select>
                            </div>
                            <div className="col-md-4">
                              <label className="small mb-1" htmlFor="State">State*</label>
                              <select className="form-control" id="State" ></select>
                            </div>
                            <div className="col-md-4">
                              <label className="small mb-1" htmlFor="Area">Area*</label>
                              <select className="form-control" id="Area" ></select>
                            </div>
                          </div>

                          <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                              <label className="small mb-1" htmlFor="Pincode">Pincode*</label>
                              <input className="form-control" id="Pincode" type="text" placeholder="Enter your pincode"  />
                             
                            </div>
                            <div className="col-md-6">
                              <label className="small mb-1" htmlFor="MainAddress">Main Address*</label>
                              <textarea className="form-control" id="MainAddress" rows="3" placeholder="Enter your main address" ></textarea>
                            </div>
                          </div>

                      
                          <div className="row">
                            <div className="col d-flex justify-content-end">
                              <button className="btn btn-primary" type="submit">Save Changes</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-3 mb-3">
              <div className="card mb-3">
                <div className="card-body">
                <Link href="">
                <input type="button" className="profile-back-btn" name="btnAddMore" value="Back" style={{border: 'none',borderRadius: '1rem',width: '100%',padding: '2%',fontWeight: 600,color: '#576065',cursor: 'pointer',marginTop: '10px',}} />
              </Link>
                  <div className="px-xl-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patienteditprofile;

