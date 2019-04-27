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
import NewTickets from './NewTickets';
import ClosedTickets from './ClosedTickets';

var currentRow;
class OpenedTickets extends Component {


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

        var self=this;

        this.GetOpenedTickets();

        $("#tableHeadings").on('click', '#close', function () {
 

            currentRow = $(this).closest("tr");
           
        
          self.state.companyId = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
          self.state.ticketId = currentRow.find("td:eq(1)").text(); // get current row 1st TD value
       /*   self.state.issueCategory = currentRow.find("td:eq(2)").text(); // get current row 2nd TD
          self.state.leaveType=currentRow.find("td:eq(3)").text();
          self.state.fromDate = currentRow.find("td:eq(4)").text();
          self.state.toDate = currentRow.find("td:eq(5)").text(); // get current row 3rd TD
          self.state.subject = currentRow.find("td:eq(6)").text(); // get current row 3rd TD
        */
        
        self.setState({
            companyId:self.state.companyId,
            ticketId:self.state.ticketId
        })
      
        self.CloseIssue(currentRow);
      });

      $("#tableHeadings").on('click', '#reply', function () {
 

        currentRow = $(this).closest("tr");
       
    
      self.state.companyId = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
      self.state.ticketId = currentRow.find("td:eq(1)").text(); // get current row 1st TD value
   /*   self.state.issueCategory = currentRow.find("td:eq(2)").text(); // get current row 2nd TD
      self.state.leaveType=currentRow.find("td:eq(3)").text();
      self.state.fromDate = currentRow.find("td:eq(4)").text();
      self.state.toDate = currentRow.find("td:eq(5)").text(); // get current row 3rd TD
      self.state.subject = currentRow.find("td:eq(6)").text(); // get current row 3rd TD
    */
    
    self.setState({
        companyId:self.state.companyId,
        ticketId:self.state.ticketId
    })
  
    self.CloseIssue(currentRow);
  });





    }

GetOpenedTickets(){

    var self=this;
    $.ajax({
        type: 'POST',
        data: JSON.stringify({

            status:"Open",
        }),
       // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/leaverequest",
        
        // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/leaverequest",
        url: "http://localhost:8080/EmployeeAttendenceAPI/ticket/newopenedclosedticket",
     
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data, textStatus, jqXHR) {
  
            
            console.log("DATA :" ,data);
         
            if(data.length!=0){

                var tab = '<thead><tr class="headcolor"><th>CompanyId</th><th>TicketId</th><th>IssueCategory</th><th>Issue</th><th>Submitted Date</th><th>Opened Date</th><th>Action</th></tr></thead>';

            $.each(data, function (i, item) {
               
    tab += '<tbody id= "myTable" ><tr><td>' + item.companyId + '</td><td>'+item.ticketId+'</td><td>' + item.issueCategory + '</td>'
    +'<td>' + item.issue + '</td><td>'+item.submittedDate+'</td><td>'+item.openedDate+'</td><td><button id="reply">Reply</button></td>'
    +'<td><button id="close">Close</button></td>'
    +'<td class="to">'+item.to+'</td><td class="cc">'+item.cc+'</td><td class="bcc">'+item.bcc+'</td></tr></tbody>';
   
   // +'</tr></tbody>';
   // +'<td class="to">'+item.to+'</td><td class="cc">'+item.cc+'</td><td class="bcc">'+item.bcc+'</td></tr></tbody>';
   
        })
    }else{
        tab ='<p>No Data </p>';
    }
        $("#tableHeadings").append(tab);
        $(".to").hide();
        $(".cc").hide();
        $(".bcc").hide();
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





    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,

        });

    }

    CloseIssue(){
        var self=this;

        $.ajax({
            type: 'POST',
            data: JSON.stringify({

                companyId:self.state.companyId,
                ticketId:self.state.ticketId,
                status:"Close",
                date:self.state.date

            }),
           // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/leaverequest",
            
            // url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/employeeleaverequest/leaverequest",
            url: "http://localhost:8080/EmployeeAttendenceAPI/ticket/opencloseticket",
         
            contentType: "application/json",
            dataType: 'json',
            async: false,
            success: function (data, textStatus, jqXHR) {
      
            currentRow.remove();
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

New(){
    ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={EmployeeMenuHeader} />
  
            <Route path="/" component={NewTickets} />
            <Route path="/" component={FooterText} />
  
  
          </div>
        </Router>,
        document.getElementById('root'));
      registerServiceWorker();
}

Opened(){

    ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={EmployeeMenuHeader} />
  
            <Route path="/" component={OpenedTickets} />
            <Route path="/" component={FooterText} />
  
  
          </div>
        </Router>,
        document.getElementById('root'));
      registerServiceWorker();
}

Closed(){
    ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={EmployeeMenuHeader} />
  
            <Route path="/" component={ClosedTickets} />
            <Route path="/" component={FooterText} />
  
  
          </div>
        </Router>,
        document.getElementById('root'));
      registerServiceWorker();
}


    render() {

        return (


            <div className="container" style={{ marginBottom: '30%' }}>
                <div class="jumbotron">
                
                <div id='horMenunew' >
          <ul id='horMenunew' style={{ backgroundColor: "#8811d6" ,padding: "10px 0px!important" }}>
            <li><a style={{ padding: "10px 0px"}} className="active"   onClick={() => this.New()} ><span class="glyphicon glyphicon-user">New</span></a></li>
            <li><a  style={{ padding: "10px 0px"}}  onClick={() => this.Opened()}><span class="glyphicon glyphicon-th-large">Opened</span> </a></li>
            <li><a  style={{ padding: "10px 0px"}}  onClick={() => this.Closed()}><span class="glyphicon glyphicon-th-large">Closed</span> </a></li>
    
          </ul>

        </div>

                <table style={{ margin: "auto" ,marginBottom: "10%"}} class="table" id="tableHeadings">

                </table>

                </div>
            </div>
        );
    }
}
export default OpenedTickets;
