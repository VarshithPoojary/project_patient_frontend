import React from 'react';
import Link from 'next/link';

const ContactDetail = () => {
  return (
    <div className="col-xxl-8 mb-5 mb-xxl-0">
      <div className="card appointment-card" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '700px', Height: '120vh', padding: '40px',  borderRadius: '20px'}}>
        <div className="card-body">
        <h3 style={{ color: '#666' }}>Appointment Form</h3>
          <div className="row g-3">
           
            <div className="col-md-6">
              <label className="form-label mt-3">Full Name *</label>
              <input type="text" className="form-control" placeholder="Enter First Name" aria-label="Full Name" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.375rem', border: '1px solid #dee2e6', background: 'white', fontWeight: 500, fontSize: '16px', color: '#495057', outline: 'none', resize: 'none' }} />
            </div>
          
            <div className="col-md-6">
              <label className="form-label mt-3">Phone Number *</label>
              <input type="text" className="form-control" placeholder="Enter Last Name" aria-label="Phone Number"  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.375rem', border: '1px solid #dee2e6', background: 'white', fontWeight: 500, fontSize: '16px', color: '#495057', outline: 'none', resize: 'none' }} />
            </div>
          
            <div className="col-md-6">
              <label className="form-label mt-3">Email Address *</label>
              <input type="email" className="form-control" placeholder="Enter Email Address" aria-label="Email Address"  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.375rem', border: '1px solid #dee2e6', background: 'white', fontWeight: 500, fontSize: '16px', color: '#495057', outline: 'none', resize: 'none' }} />
            </div>
          
            <div className="col-md-6">
              <label className="form-label mt-3">Date *</label>
              <input type="date" className="form-control" aria-label="Date" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.375rem', border: '1px solid #dee2e6', background: 'white', fontWeight: 500, fontSize: '16px', color: '#495057', outline: 'none', resize: 'none' }} />
            </div>
           
            <div className="col-md-6">
              <label className="form-label mt-3">Time *</label>
              <input type="time" className="form-control" aria-label="Time" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.375rem', border: '1px solid #dee2e6', background: 'white', fontWeight: 500, fontSize: '16px', color: '#495057', outline: 'none', resize: 'none' }} />
            </div>
           
            <div className="col-12">
              <label className="form-label mt-3">Address Details *</label>
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Enter Area" aria-label="Area" style={{ width: '50%', padding: '0.75rem 1rem', borderRadius: '0.375rem', border: '1px solid #dee2e6', background: 'white', fontWeight: 500, fontSize: '16px', color: '#495057', outline: 'none', resize: 'none' }} />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Enter City" aria-label="City" style={{ width: '50%', padding: '0.75rem 1rem', borderRadius: '0.375rem', border: '1px solid #dee2e6', background: 'white', fontWeight: 500, fontSize: '16px', color: '#495057', outline: 'none', resize: 'none' }} />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control mt-3" placeholder="Enter State" aria-label="State" style={{ width: '50%', padding: '0.75rem 1rem', borderRadius: '0.375rem', border: '1px solid #dee2e6', background: 'white', fontWeight: 500, fontSize: '16px', color: '#495057', outline: 'none', resize: 'none' }} />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control mt-3" placeholder="Enter Pincode" aria-label="Pincode" style={{ width: '50%', padding: '0.75rem 1rem', borderRadius: '0.375rem', border: '1px solid #dee2e6', background: 'white', fontWeight: 500, fontSize: '16px', color: '#495057', outline: 'none', resize: 'none' }} />
            </div>
            
            <div className="col-12">
              <label className="form-label mt-3">Reason for Appointment</label>
              <textarea className="form-control" rows="4" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.375rem', border: '1px solid #dee2e6', background: 'white', fontWeight: 500, fontSize: '16px', color: '#495057', outline: 'none', resize: 'none' }}></textarea>
            </div>
            <div className="btn-container">
  <style>
    {`
      .btn-container {
        display: flex;
       gap:20%;
        margin-top: 20px;
       
        
      }

      .profile-submit-btn, .profile-cancel-btn {
        border: none;
        border-radius: 1rem;
        width: 100%;
        padding: 10px;
        font-weight: 600;
        color: white;
        cursor: pointer;
      }

      .profile-submit-btn {
        background-color: grey;
      }

      .profile-cancel-btn {
        background-color: grey;
      }

      .profile-submit-btn:hover, .profile-cancel-btn:hover {
        background-color: #0056b3;
      }
    `}
  </style>
  <Link href="">
    <input type="button" className="profile-submit-btn" value="Submit" />
  </Link>
  <button className="profile-cancel-btn">Cancel</button>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
