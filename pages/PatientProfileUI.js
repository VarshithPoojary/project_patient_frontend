import React from 'react';
import Link from 'next/link';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu, 
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {BiCalendar, BiUser, BiListUl, BiCart,  BiEdit } from 'react-icons/bi'; 
import {GiMedicines} from "react-icons/gi";
import {FaNotesMedical} from "react-icons/fa";
import {FiHome,FiLogOut, FiMapPin} from "react-icons/fi";
import "react-pro-sidebar/dist/css/styles.css";
import Topbar from './topbar';


const PatientProfile = () => {
  // const [menuCollapse, setMenuCollapse] = useState(true);

  // const menuIconClick = () => {
  //   setMenuCollapse(!menuCollapse);
  // };


  return (
    <section className="patient-profile">
      <div className="patient-top-section">
        {/* <Topbar/> */}
        <img src="images/banner5.jpg" alt="Top Image" className="patient-top-image" />
        <div className="patient-profile-header">
          <img src="images/userLogo.jpeg" alt="Profile Avatar" className="patient-profile-image" />
        </div>
        
      </div>
      <div className="patient-profile-container">

      <div className="patient-profile-container-card">
        {/* <ProSidebar  > */}
          {/* <SidebarHeader>
            <div className="logotext">
            </div>
            <div className="closemenu" >
              <FiMenu />
            </div>
          </SidebarHeader> */}
          {/* <SidebarContent className="patient-profile-container-scroll"> */}
            <Scrollbars  className="patient-profile-container-scroll">
              <Menu iconShape="round" >
              <MenuItem icon={<FiHome />} title="Dashboard" className='patient-profile-menu'>
        <Link href='/dashboard'><span>Dashboard</span></Link>
      </MenuItem>
      <MenuItem icon={<BiUser />} title="Specialist" className='patient-profile-menu'>
        <Link href='/Admin/viewAdminList'><span>Specialist</span></Link>
      </MenuItem>
      <MenuItem icon={<BiListUl />} title="Appointment" className='patient-profile-menu'>Appointment</MenuItem>
      <MenuItem icon={<BiCalendar />} title="Slot" className='patient-profile-menu'>View Slot</MenuItem>
      <MenuItem icon={<GiMedicines />} title="Product" className='patient-profile-menu'>View Product</MenuItem>
      <MenuItem icon={<FaNotesMedical />} title="Description" className='patient-profile-menu'>View Description</MenuItem>
      <MenuItem icon={<BiCart />} title="Order" className='patient-profile-menu'>Your Order</MenuItem>
      <MenuItem icon={<FiLogOut />} title="Logout" className='patient-profile-menu'>LogOut</MenuItem>

      
                {/* <SubMenu title="Locations" icon={<FiMapPin />}  className='patient-profile-menu'>
                  <MenuItem title="Country" icon={<BiMap />} className='patient-profile-menu'>
                  <Link href='/Location/viewCountry'><span >Country</span></Link></MenuItem>
                  <MenuItem title="State" icon={<BiMap />} className='patient-profile-menu'>
                  <Link href='/Location/viewState'><span>State</span></Link></MenuItem>
                  <MenuItem title="City" icon={<BiMap />} className='patient-profile-menu'>
                  <Link href='/Location/viewCity'><span>City</span></Link></MenuItem>
                </SubMenu> */}
              </Menu>
            </Scrollbars>
          {/* </SidebarContent> */}
          {/* <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />} title="Logout" > 
                <span>Logout</span>
              </MenuItem>
            </Menu>
          </SidebarFooter> */}
        {/* </ProSidebar> */}
  {/* <div className="patient-profile-links">
    <Link href="/home">Home</Link>
    <Link href="/appointments">Appointments</Link>
    <Link href="/view">View</Link>
  </div> */}


        </div>
            <div className="patient-profile-container-card2">
              
            <div className="patient-profile-details" id="home" role="tabpanel" aria-labelledby="home-tab">
    <div className="row">
    <div className="col-md-12">
    <div className="profile-info d-flex align-items-center">
        <div className="profile-image">
            <img src="images/userLogo.jpeg" alt="Profile Avatar" className="patient-profile-image1" />
        </div>
        <div className="personal-info ml-3">
            <div className="name">Varshith C Poojary</div>
            <div className="email">varshithvarshi43@gmail.com</div>
            <div className="phone">8884607146</div>
        </div>
    </div>
</div>

        <div className="col-md-6" >
            <div className="patient-card-header">
                <span>{<BiUser />} Personal Details</span>
                <span className="patient-edit-icon">{< BiEdit />}</span> 
            </div>
            <div className="row">
                <div className="col-md-12">
                    <label htmlFor="FirstName">Varshith C Poojary</label>
                </div>
                <div className="col-md-12">
                    <label htmlFor="FirstName">8884607146</label>
                </div>
                <div className="col-md-12">
                    <label htmlFor="FirstName">16-10-2001</label>
                </div>
                <div className="col-md-12">
                    <label htmlFor="FirstName">Male</label>
                </div>
                <div className="col-md-12">
                    <label htmlFor="FirstName">varshithvarshi43@gmail.com</label>
                </div>
            </div>
           
        </div>
        <div className="col-md-6">
            <div className="patient-card-header">
                <span>{<FiMapPin />} Address Details</span>
                <span className="patient-edit-icon">{< BiEdit />}</span> 
            </div>
            <div className="row">
                <div className="col-md-12">
                    <label htmlFor="country">52 Heroor Rajeev nagar</label>
                </div>
                <div className="col-md-12">
                    <label htmlFor="country">India</label>
                </div>
                <div className="col-md-12">
                    <label htmlFor="country">Karnataka</label>
                </div>
                <div className="col-md-12">
                    <label htmlFor="country">Brahmavara</label>
                </div>
                <div className="col-md-12">
                    <label htmlFor="country">576213</label>
                </div>
                
            </div>
          
        </div>
    </div>
</div>

    
        <div className="patient-profile-actions">
          <Link href="/PatientEditProfile">
            <button className="patient-profile-edit-btn">Edit</button>
          </Link>
          <button className="patient-profile-back-btn">Home Page</button>
        </div>
        </div>
      </div>
    </section>
  );
};

export default PatientProfile;
