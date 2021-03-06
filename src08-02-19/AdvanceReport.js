import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import ReportMenuPage from './ReportMenuPage';
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import $ from 'jquery';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import CryptoJS from 'crypto-js';
import FooterText from './FooterText';
import EmailPage from './EmailPage';
import EmployeeMenuPage from './EmployeeMenuPage';
import SalaryCalcConfig from './SalaryCalcConfig';
import ViewPayroll from './ViewPayroll';
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import SelectSearch from 'react-select';
import './GeneratePaySlip.css';
import OrganizationAdvanceReport from './OrganizationAdvanceReport';
import moment from 'moment'

var advanceCredit=0;
var advanceDebit=0;

class AdvanceReport extends Component {

    constructor() {
      super()
  
      this.state = {
        salarySelection:'',
        workingDays:'',
        days:'',
        month:'',
    };
}

componentDidMount() {

  $("#advanceTable").hide();
  $("#nodata").hide();
  $("#summary").hide();
  $("#tableOverflow").hide();

}

BackbtnFunc() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={EmployeeMenuPage} />
          <Route path="/" component={FooterText} />
        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();
  }

IndividualAdvanceReport(){

    ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={EmployeeMenuHeader} />
            <Route path="/" component={AdvanceReport} />
            <Route path="/" component={FooterText} />
          </div>
        </Router>,
        document.getElementById('root'));
      registerServiceWorker();
}

OrganizationAdvanceReport(){

    ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={EmployeeMenuHeader} />
            <Route path="/" component={OrganizationAdvanceReport} />
            <Route path="/" component={FooterText} />
          </div>
        </Router>,
        document.getElementById('root'));
      registerServiceWorker();
}

SelectOption= (e) => {

    $("#advanceTable").empty();
    //$("#nodata").hide();
    $("#summary").empty();
    $("#tableOverflow").hide();

    const name = e.target.name;
    const value = e.target.value;
    this.setState({
        [name]: value,
  
    });

   // alert("MONTH SELECTED " +value);

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeId= CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
  
    this.state.companyId = companyId;
    this.state.employeeId = employeeId;
    this.state.month = value;

    this.setState({
      companyId: companyId,
      employeeId:employeeId,
      month:this.state.month ,
    });

    var monthName=value;

    if(monthName== "12"){
    //  alert("IF PART FOR MONTH");
      monthName=11;
    }else{
     // alert("ELSE PART FOR MONTH");

      monthName=Number(value) - 1;
    }
    

    var formattedMonth = moment().month(monthName).format('MMMM');
    console.log(formattedMonth)
this.state.monthName=formattedMonth;

    $.ajax({
        type: 'POST',
        data: JSON.stringify({
          schoolId:this.state.companyId,
          employeeId:this.state.employeeId,
          month:this.state.month,
         
        }),
      // url: "http://localhost:8080/EmployeeAttendenceAPI/advanceReport/IndividualAdvanceReport",
        url: "https://wildfly.tictoks.com:443/EmployeeAttendenceAPI/advanceReport/IndividualAdvanceReport",
            
        
        contentType: "application/json",
        dataType: 'json',
        async: false,
        crossDomain: true,
      
        success: function (data, textStatus, jqXHR) {
      
            var advanceList;
            var color;
            var summarList;
            var advanceGranted=0;

if(data.length!=0){

    $("#advanceTable").show();
    $("#summary").show();
    $("#tableOverflow").show();

    advanceList += '<thead className="headcolor" style="color: white ;  text-align: center; '
   +'background-color: #486885;" ><tr><th>EmployeeId</th><th>EmployeeName</th><th>Role</th>'
   +'<th>Department</th><th>Advance</th><th>Date</th><th>Status</th></tr></thead>';

            $.each(data, function (i, item) {

                if(item.status == "Credit"){
                    
                    color = "#ff000087";
                    advanceCredit = Number(advanceCredit) + Number(item.advance);
                //    alert("CREDIT "+advanceCredit);
                }else{
                  
                    color = "#5cb85cad";
                    advanceDebit = Number(advanceDebit) + Number(item.advance);
                  //  alert("DEBIT "+advanceDebit);
                }

                advanceList +=  '<tbody id= "myTable" ><tr  style="background-color:' + color + ';"  text-align: center;"><td>' + item.employeeId + '</td>'
                +'<td>'+item.name+'</td><td>' + item.role + '</td><td>' + item.department + '</td>'
                +'<td>'+item.advance+'</td><td>'+item.date+'</td>'
                +'<td>'+item.status+'</td></tr></tbody>';
  
                advanceGranted=item.grantedAdvance;
                
              });
  
              $("#advanceTable").append(advanceList);


              summarList+='<tbody id= "myTable" >'
              +'<tr  style="background-color:#ff000087" ;  text-align: center;">'
              +'<td>Advance Pending </td>'
              +'<td>' + advanceGranted + '</td></tr>'
              +'<tr  style="background-color:#ff000087" ;  text-align: center;">'
              +'<td>Advance Credited </td>'
              +'<td>'+advanceCredit+'</td></tr>'
              +'<tr  style="background-color:#5cb85cad" ;  text-align: center;">'
              +'<td>Advance Debited </td>'
              +'<td>' + advanceDebit + '</td></tr></tbody>';


              $("#summary").append(summarList);

            }else{
                $("#nodata").show();
            }







            console.log("SUCCESS DATA",data);
          confirmAlert({
            title: 'Success',                        // Title dialog
            message: 'Added Payment SuccessFully',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });
      
      }
      
      });







}



render() {
    return (
      <div className="container" style={{ marginBottom: "2%" }}>
        <ul class="previous disabled" id="backbutton"
          style={{
            backgroundColor: "#f1b6bf",
            float: "none",
            display: "inline-block",
            marginLeft: "5px",
            borderRadius: "5px",
            padding: "3px 7px 3px 7px"
          }}>
          <a href="#" onClick={() => this.BackbtnFunc()}><i class="arrow left"></i></a></ul>

        <h3 className="centerAlign" style={{ marginTop: "-10px", textAlign: "center" }}>PayRoll Management</h3>

        <div id='horMenu'>
          <ul id='horMenunew' style={{ backgroundColor: "#8811d6" }}>
            <li><a className="active" onClick={() => this.IndividualAdvanceReport()}><span class="glyphicon glyphicon-plus">Individual Advance Report</span></a></li>
             <li><a onClick={() => this.OrganizationAdvanceReport()}><span class="glyphicon glyphicon-minus">Organization Advance Report</span> </a></li>
           
          </ul>
        </div>

          <h3 className="centerAlign" style={{ marginTop: "50px", textAlign: "center" }}>Individual Advance Report</h3>



<div>
    <label >Month :</label>
<select id="month"   onChange={this.SelectOption} value={this.state.month}  >
<option value="" disabled selected hidden>Select Month</option>
<option value="01" >January</option>
<option value="02" >Feburary</option>
<option value="03" >March</option>
<option value="04" >April</option>
<option value="05" >May</option>
<option value="06" >June</option>
<option value="07" >July</option>
<option value="08" >August</option>
<option value="09" >September</option>
<option value="10" >October</option>
<option value="11" >November</option>
<option value="12" >December</option>
</select>
</div>

<h3 className="centerAlign" style={{ marginTop: "50px", textAlign: "center" }}>{this.state.monthName}</h3>

  
<div>
<table class="table table-bordered" id="advanceTable" name="advanceTable" style={{ marginTop: "50px", textAlign: "center" }}>

</table>
</div>

  <div id="tableOverflow">
         <h3 className="centerAlign"  style={{ textAlign: "center" }}>Summary</h3>

          <table class="table" id="summary" style={{ marginBottom: "2%",color:"black" }}>


          </table>

        </div>


 <h3 id="nodata">No Data</h3>

 </div>

);
}

}


export default AdvanceReport;