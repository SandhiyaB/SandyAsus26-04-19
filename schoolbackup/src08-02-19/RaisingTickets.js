import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
    FormErrors
} from './FormErrors';
import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './LoginPage.css';
import OneDay from './OneDay';
import MoreThanOneDay from './MoreThanOneDay';
import AttendanceRegulation from './AttendanceRegulation';
import EmployeeLeaveRequest from './EmployeeLeaveRequest';
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import FooterText from './FooterText';

class RaisingTickets extends Component {


    constructor(props) {
        super(props)

        var today = new Date();
        var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      
        this.state = {
            date:today1,
            noOfDays: '',
            fromDate: '',
            toDate: '',


        }
    }

    componentDidMount(){

        var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeId= CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var employeeName=CryptoJS.AES.decrypt(localStorage.getItem('EmployeeName'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var role=CryptoJS.AES.decrypt(localStorage.getItem('Role'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
        var department=CryptoJS.AES.decrypt(localStorage.getItem('Department'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    
        this.state.empDetails=employeeId +" "+employeeName+" "+role+" "+department;
        this.state.companyId=companyId;
        this.state.employeeId=employeeId;
        this.state.department=department;
        this.state.role=role;

this.setState({
    empDetails:this.state.empDetails,
    companyId: this.state.companyId,
    employeeId:this.state.employeeId,
    department: this.state.department,
    role:this.state.role,
    date:this.state.date

})



    }







    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,

        });

    }

    Submit(){
        
        $.ajax({
            type: 'POST',
            data: JSON.stringify({

                companyId: this.state.companyId,
                employeeId:this.state.employeeId,
                department: this.state.department,
                role:this.state.role,
                to:this.state.to,
                cc:this.state.cc,
                bcc:this.state.bcc,
                issueCategory:this.state.issueCategory,
                issue:this.state.issue,
                date:this.state.date

            }),
           // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/leaverequest",
            
            // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/leaverequest",
            url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/ticket/submitticket",
         
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
      

            },

            error: function (data, textStatus, jqXHR) {
                confirmAlert({
                    title: 'No Internet',                        // Title dialog
                    message: 'Network Connection Problem',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm
                  });
          
            },

        });




    }
    render() {

        return (


            <div className="container" style={{ marginBottom: '30%' }}>
                <div class="jumbotron">
                    <h2  style={{ marginTop: '-65px' }}>Tickets</h2>
<br/>

                    <form style={{ paddingBottom: '20px', position: 'inline-block' }}>

            <form id="name" >

            <label for="name" >
                Ticket Raiser Details:
            </label>
            <div >
                <textarea  value={this.state.empDetails}
                    name="name"
                    id="name"
                    maxlength="175"
                    placeholder="Your Subject.." required style={{ height: '50px', width: '75%' }}   readOnly/>                             </div>
            </form>

                <form id="to" >

                <label for="to" >
                    Reply To:
                </label>

                <div >
                    <textarea id="address"
                        name="to"
                        onChange={this.handleUserInput}
                        id="to"
                        maxlength="175"
                        placeholder="Your reason.." required style={{ height: '50px', width: '75%' }}></textarea>
                </div>

                </form>

                 <form id="cc" >

                <label for="cc" >
                Reply CC:
                </label>

                <div >
                    <textarea 
                        name="cc"
                        onChange={this.handleUserInput}
                        id="cc"
                        maxlength="175"
                        placeholder="Your reason.." required style={{ height: '50px', width: '75%' }}></textarea>
                </div>

                </form>

            <form id="bcc" >

            <label for="bcc" >
            Reply BCC:
            </label>

            <div >
                <textarea 
                    name="bcc"
                    onChange={this.handleUserInput}
                    id="bcc"
                    maxlength="175"
                    placeholder="Your reason.." required style={{ height: '50px', width: '75%' }}></textarea>
            </div>

            </form>

                        <form id="issuecategory" >
                            <label for="issuecategoryradiobutton" >
                                Issue Category:
                            </label>
                            <br />
                            <div>
                          <input type="radio" id="radio1" name="issueCategory" value="Finance" onChange={this.handleUserInput} />Finance <br/>
                          <input style={{ marginLeft: '10%' }} type="radio" id="radio2" name="issueCategory" value="Technical" onChange={this.handleUserInput} />Technical <br/>
                          <input style={{ marginLeft: '10%' }} type="radio" id="radio3" name="issueCategory" value="HardWork" onChange={this.handleUserInput} />HardWare <br/>
                          </div>
            </form>
                       


          <form id="issue" >

                    <label for="issue" >
                        Isuue:
                    </label>
                    <div >
                        <textarea
                            name="issue"
                            onChange={this.handleUserInput}
                            id="issue"
                            maxlength="300"
                            placeholder="Your Subject.." required style={{ height: '100px', width: '75%' }} />                             </div>
         </form>

         <input type="file" id="files" name="files"/>


                        <button type="button" id="submit"  onClick={() => this.Submit()} class="btn btn-info">Submit</button>

                    </form>
                </div>
            </div>
        );
    }
}
export default RaisingTickets;
