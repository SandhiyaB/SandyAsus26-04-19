import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import $ from 'jquery';
import CryptoJS from 'crypto-js';

//css
import './Gstdashboard1css.css';
import './Tictoksheader.css';
import './gstdashboard.css';
//pages

import registerServiceWorker from './registerServiceWorker';
import LoginPage from './LoginPage';
//import Dashboardoverall from './Dashboardoverall';
import TaskMapping from './TaskMapping';
import LeaveManagement from './LeaveManagement';
import Attendence from './Attendence';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import Maintenance from './Maintenance';
import Charts from './Charts';
import ReportMenuPage from './ReportMenuPage';
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import EmployeeAttendanceRequest from './EmployeeAttendanceRequest';
import EmployeeRequestAcceptReject from './EmployeeRequestAcceptReject';
import ConfigurationPage from './ConfigurationPage';
import FooterText from './FooterText';
import EmailPage from './EmailPage';
import Calendar from './Calendar';
import HomeWorkPageStudent from './HomeWorkPageStudent';
import HomeWorkStudentMenuPage from './HomeWorkStudentMenuPage';
import HomeWorkPageTeacherMenu from './HomeWorkPageTeacherMenu';
import DashboardDisplay from './DashboardDisplay';
import RaisingTickets from './RaisingTickets';
import NewTickets from './NewTickets';


class Gstdashboard1 extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);      
   
        $(document).ready(function () {

            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
            });

		});
		//this.DeviceDetailRequest();
    }
	

  /*   Dashboard() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={Dashboardoverall} />
                </div>
            </Router>,
            document.getElementById('contentRender'));

    }

 */


   
    AttendanceFunc() {
		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "attendance") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

			ReactDOM.render(
				<Router>
					<div>

						<Route path="/" component={Attendence} />
					
					

					</div>
				</Router>,
				document.getElementById('contentRender'));

		}
		else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm

			})
		}

	}

	LogoutFunc() {
		localStorage.clear();
		ReactDOM.render(
			<Router>
				<div>
					<Route path="/" component={LoginPage} />
				
				
				</div>
			</Router>, document.getElementById('root'));

	}


	MessageFunc() {
    
		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));
	
			var flag = 1;//false
			var i = permission.length;
			$.each(permission, function (i, item) {
	
				if (item.permission == "messageCenter") {
					flag = 0;//true
				}
			});
	
			if (flag == 0) {
		ReactDOM.render(
		  <Router>
			<div>
			 
             
			  {/* <Route path="/" component={MessageMenuPage} /> */}
			  <Route path="/" component={EmailPage} />
	
			</div>
		  </Router>,
		  document.getElementById('contentRender'));
		registerServiceWorker();
		}
		else {
		  confirmAlert({
			title: 'Access Deined',                        // Title dialog
			message: 'You are not Allowed to Access this Page',               // Message dialog
			confirmLabel: 'Ok',                           // Text button confirm
	  
		  })
		}
	
	  }
	  
	  Dashboard() {
        ReactDOM.render(
            <Router>
                <div>

                    <Route path="/" component={DashboardDisplay} />
                </div>
            </Router>,
            document.getElementById('contentRender'));

    }

      Dashboard1() {

		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {
			if (item.permission == "chart") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

			var today = new Date();
			today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
			this.state.date = today;
			this.setState(
				{
					date: today,
				});
			var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
			this.state.companyId = companyId;
			this.setState({
				companyId: companyId,
			});

			$.ajax({
				type: 'POST',
				data: JSON.stringify(this.state),
				url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/EmployeeReport/employeeOrganizationAttendanceDailyReport",
				//url: "http://localhost:8080/EmployeeAttendenceAPI/EmployeeReport/employeeOrganizationAttendanceDailyReport",
				
				contentType: "application/json",
				dataType: 'json',
				async: false,
				success: function (data, textStatus, jqXHR) {
					//console.log("chart"+data.employeeRetrievelist);
					ReactDOM.render(
						<Router>
							<div>

							
								<Route path="/" component={() => <DashboardDisplay data={data} />} />
							
							</div>
						</Router>,
						document.getElementById('contentRender'));
					registerServiceWorker();

				},
				error: function (data) {
					confirmAlert({
						title: 'No Internet',                        // Title dialog
						message: 'Network Connection Problem',               // Message dialog
						confirmLabel: 'Ok',                           // Text button confirm
					  });
			  
				},
			});


		}
		else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm

			})
		}

	}

	MaintenanceFunc() {
		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "maintenance") {
				flag = 0;//true
			}
		});

		if (flag == 0) {

			ReactDOM.render(
				<Router>
					<div>
						<Route path="/" component={Maintenance} />
					
					</div>
				</Router>,
				document.getElementById('contentRender'));

		}
		else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm


			})
		}

	}



	ReportFunc() {

		/* var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "report") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
 */
			ReactDOM.render(
				<Router>
					<div>

						

						<Route path="/" component={ReportMenuPage} />
					

					</div>
				</Router>,
				document.getElementById('contentRender'));
			registerServiceWorker();
			/*
				}
 else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm

			})
		}
 */
	}

	AttendanceRegulationsFunc() {
		/* var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "attendanceRegulation") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
		 */	ReactDOM.render(
				<Router>
					<div>
						
						<Route path="/" component={AttendanceRegulationMenuPage} />
					

					</div>
				</Router>,
				document.getElementById('contentRender'));
			registerServiceWorker();

	/* 	}
		else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm
			})
		}
 */


	}

	TaskMappingFunc() {

		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "taskMapping") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
			ReactDOM.render(
				<Router>
					<div>
						
						<Route path="/" component={TaskMapping} />
						
					</div>
				</Router>,
				document.getElementById('contentRender'));
			registerServiceWorker();

		}
		else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm

			})
		}

	}

	LeaveManagementFunc() {

		ReactDOM.render(
			<Router>
				<div>
					
					<Route path="/" component={LeaveManagement} />
				
				

				</div>
			</Router>,
			document.getElementById('contentRender'));
		registerServiceWorker();
	}

	ConfigurationFunc() {
		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "supervisorAuthority") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
		ReactDOM.render(
			<Router>
				<div>
					
					<Route path="/" component={ConfigurationPage} />
					

				</div>
			</Router>,
			document.getElementById('contentRender'));
		registerServiceWorker();
	}
	else {
		confirmAlert({
			title: 'Access Deined',                        // Title dialog
			message: 'You are not Allowed to Access this Page',               // Message dialog
			confirmLabel: 'Ok',                           // Text button confirm

		})
	}
	}


	EmployeeRequestFunc() {

		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "supervisorAuthority") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
			ReactDOM.render(
				<Router>
					<div>
						
						<Route path="/" component={EmployeeRequestAcceptReject} />
					

					</div>
				</Router>,
				document.getElementById('contentRender'));
			registerServiceWorker();


		}
		else {
			confirmAlert({
				title: 'Access Deined',                        // Title dialog
				message: 'You are not Allowed to Access this Page',               // Message dialog
				confirmLabel: 'Ok',                           // Text button confirm

			})
		}


	}
	HomeWork() {
		var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

		var flag = 1;//false
		var i = permission.length;
		$.each(permission, function (i, item) {

			if (item.permission == "supervisorAuthority") {
				flag = 0;//true
			}
		});

		if (flag == 0) {
        ReactDOM.render(
            <Router >
                <div>
                   
                   
                    <Route path="/" component={HomeWorkPageTeacherMenu} />
                   
				   
                </div>
			</Router>, document.getElementById('contentRender'));
				}
				else {
					ReactDOM.render(
						<Router >
							<div>
								
                                
								<Route path="/" component={HomeWorkStudentMenuPage} />
							
							
							</div>
						</Router>, document.getElementById('contentRender'));
				}

    }
   
	Tickets(){

		ReactDOM.render(
			<Router >
				<div>
					<Route path="/" component={RaisingTickets} />
				
				</div>
			</Router>, document.getElementById('contentRender'));

	
	}


	TicketApproval(){

		
		ReactDOM.render(
			<Router >
				<div>
					<Route path="/" component={NewTickets} />
				
				</div>
			</Router>, document.getElementById('contentRender'));

	}

    render() {
        return (


            <div class="" style={{
                paddingTop: "1px !important",
                paddingBottom: "1px !important",
                marginBottom: "25px !important"
            }}>


                <nav class="navbar navbar-inverse" style={{ marginBottom: "0px", backgroundColor: "#26425c" }}>
                    <div class="container-fluid justify-content-center">
                        <div class="navbar-header">
                            <a class="navbar-brand btn btn-info navbar-btn glyphicon glyphicon-align-justify" style={{ backgroundColor: "#26425c" }} id="headerIcon" href="#" to="/" id="sidebarCollapse" >
                            </a>



                            {/*  <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Page 1 <span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li><a href="#">Page 1-1</a></li>
          <li><a href="#">Page 1-2</a></li>
          <li><a href="#">Page 1-3</a></li>
        </ul>
      </li>
	  <li><a href="#">Page 2</a></li> */}
                            <span class="navbar-text "
                                id="headerName"
                                style={{
                                    float: "none",
                                    position: "absolute",
                                    color: "white",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    wordWrap: "break-word",
                                }} >
                               OMR School
                            </span>

                            <div class=" navbar-right"
                                style={{
                                    float: "none",
                                    position: "absolute",
                                    top: "35%",
                                    left: "91%",
                                    /* transform: "translate(-50%, -50%)", */
                                    wordWrap: "break-word",
                                    color: "red",


                                }}>
                                <a href="#" class="btn btn-info btn-sm" onClick={() => this.LogoutFunc()}>
                                    <span class="glyphicon glyphicon-log-out"></span> Log out
        </a>
                                {/*   <a href="#" 

                                    style={{
										/* marginTop: "5px",
										padding: "0px 2px 1px 2px", */
                                }


                                {/* <span class="glyphicon-glyphicon-cog"></span> *logout</a> */}

                                {/*    <ul id="menulogoutbtn" class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1">
                                     <li><a href="#" style={{ backgroundColor: "#677785", color: "white" }}><span class="glyphicon glyphicon-user" onClick={() => this.LogoutFunc()} style={{ float: "left", backgroundColor: "#677785" }}><span style={{ paddingLeft: "10px" }}>LogOut</span></span></a></li>

                                </ul> */}

                            </div>

                        </div>


                    </div>
                </nav>


                {/* 
                <nav class="navbar navbar-expand-lg navbar-light bg-light headertop"  style={{marginBottom:"1px!important"}} >

                    <h4 className="text-center">Company Name </h4>
                    <div class="navbar-header" style={{ height: "10px" }} >
                        <button style={{ paddingTop: "0px", marginBottom: "5px" }} type="button" id="sidebarCollapse" class="btn btn-info navbar-btn">
                            <i class="glyphicon glyphicon-align-left"></i>
                            <span></span>
                        </button>
                        <button style={{ paddingTop: "0px", marginBottom: "5px" }} type="button" id="sidebarCollapse" class="btn btn-info navbar-btn">jeeva
                            <i class="glyphicon glyphicon-user-right"></i>
                            <span></span>
                        </button>
                    </div>

                </nav> */}

                <div class="wrapper">

                    <nav id="sidebar">
                        <div class="sidebar-header" >
                            <h3>School Managment</h3>

                        </div>
                   
<ul class="list-unstyled components" style={{display:"contents"}}>
                            <p onClick={() => this.Dashboard()}><i class="fa fa-pie-chart" style={{fontSize:"26px",padding:"0px 10px", border: "none"}}></i> DASHBOARD</p>
                        
                            
                            <li>
                                <a href="#"onClick={() => this.AttendanceFunc()}><i class="fa fa-fa fa-id-card-o" style={{fontSize:"26px",padding:"0px 10px", border: "none"}}></i> ATTENDANCE</a>
  
                            </li>
                            <li>
                                <a href="#SaleSubmenu"   onClick={() => this.MaintenanceFunc()}><i class="fa fa-users" style={{fontSize:"26px",padding:"0px 10px", border: "none"}}></i>MAINTENANCE</a>
                               
                            </li>
                            <li>
                                <a href="#InvoiceSubmenu"   onClick={() => this.ReportFunc()}><i class="fa fa-pencil-square-o" style={{fontSize:"26px",padding:"0px 10px", border: "none"}}></i>REPORT</a>
                              
                            </li>
                            <li>
                                <a href="#InvoiceSubmenu"   onClick={() => this.AttendanceRegulationsFunc()}><i class="fa  fa-send-o" style={{fontSize:"26px",padding:"0px 10px", border: "none"}}></i>REQUEST</a>
                              
                            </li>
                            <li>
                                <a href="#InvoiceSubmenu"   onClick={() => this.EmployeeRequestFunc()}><i class="fa fa-legal" style={{fontSize:"26px",padding:"0px 10px", border: "none"}}></i>APPROVAL</a>
                              
                            </li>
                            <li>
                                <a href="#InvoiceSubmenu"   onClick={() => this.ConfigurationFunc()}><i class="fa  fa-cogs" style={{fontSize:"26px",padding:"0px 10px", border: "none"}}></i>CONFIGURATION</a>
                              
                            </li>
                            <li>
                                <a href="#InvoiceSubmenu"   onClick={() => this.TaskMappingFunc()}><i class="fa  fa-institution" style={{fontSize:"26px",padding:"0px 10px", border: "none"}}></i>TASKMAPPING</a>
                              
                            </li>
                            <li>
                                <a onClick={() => this.MessageFunc()}><i class="fa fa-envelope" style={{fontSize:"26px",padding:"0px 10px", border: "none"}}></i>MESSAGE</a>
                            </li>
                            
							<li>
                                <a onClick={() => this.Tickets()}><i class="fa fa-envelope" style={{fontSize:"26px",padding:"0px 10px", border: "none"}}></i>Support</a>
                            </li>
                            
							<li>
                                <a onClick={() => this.TicketApproval()}><i class="fa fa-envelope" style={{fontSize:"26px",padding:"0px 10px", border: "none"}}></i>Tickets Approval</a>
                            </li>
     
                            

                        </ul>

               </nav>




                    <div style={{overflow:"hidden"}} id="contentRender">
                    </div>


                </div>


            </div>

        );
    }
}

export default Gstdashboard1;

