
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import EmployeeMenuHeader from './EmployeeMenuHeader';

import AttendanceRegulation from './AttendanceRegulation';
import AttendanceDisplay from './AttendanceDisplay';
import EmployeeMenuPage from './EmployeeMenuPage';
import AttendanceRegulationSupervisor from './AttendanceRegulationSupervisor';


import './Maintenance.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import LeaveManagement from './LeaveManagement';
import CryptoJS from 'crypto-js';
import FooterText from './FooterText';
import AllowanceAdditionPage from './AllowanceAdditionPage';
import ReductionCatagoryPage from './ReductionCatagoryPage';
import SalaryCalcConfig from './SalaryCalcConfig';
import ConfigurationPage from './ConfigurationPage';


class PayRollConfigMenuPage extends Component {

    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        var self = this;

        window.scrollTo(0, 0);

        self.AdditionCatog();
    }
    AdditionCatog() {
        ReactDOM.render(
          <Router>
            <div>
              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={PayRollConfigMenuPage} />              
              <Route path="/" component={AllowanceAdditionPage} />
              <Route path="/" component={FooterText} />
            </div>
          </Router>,
          document.getElementById('root'));
        registerServiceWorker();
      }
      
      ReductionCatogFunc() {
    
        ReactDOM.render(
          <Router>
            <div>
              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={PayRollConfigMenuPage} />        
              <Route path="/" component={ReductionCatagoryPage} />
              <Route path="/" component={FooterText} />
            </div>
          </Router>,
          document.getElementById('root'));
        registerServiceWorker();
    
      }
      
      SalaryCalcFunc() {
       
        ReactDOM.render(
          <Router>
            <div>
              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={PayRollConfigMenuPage} />        
              <Route path="/" component={SalaryCalcConfig} />
              <Route path="/" component={FooterText} />
            </div>
          </Router>,
          document.getElementById('root'));
        registerServiceWorker();
    
    
      }
    
      GeneratePaySlip(){
     
          confirmAlert({
            title: 'Service Message',                        // Title dialog
            message: 'Still In Progress',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          });
      }

    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={ConfigurationPage} />
                    <Route path="/" component={FooterText} />


                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();
    }





    render() {
        return (



            <div className="container">

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

                <h3 className="centerAlign" style={{ marginTop: "-10px", textAlign: "center" }}>PayRole Configurtion</h3>

                <div id='horMenu'>
                    <ul id='horMenunew' style={{ backgroundColor: "#8811d6" }}>
                        <li><a className="active" onClick={() => this.AdditionCatog()}><span class="glyphicon glyphicon-plus"> Allowance Category</span></a></li>
                        <li><a onClick={() => this.ReductionCatogFunc()}><span class="glyphicon glyphicon-minus"> Deduction Category</span> </a></li>
                        <li><a onClick={() => this.SalaryCalcFunc()}><span class="glyphicon glyphicon-minus"> Salary Calculation</span> </a></li>
                        <li><a onClick={() => this.GeneratePaySlip()}><span class="glyphicon glyphicon-plus"> Generate Pay Slip</span> </a></li>

                    </ul>
                </div>

            </div>




        );
    }

}


export default PayRollConfigMenuPage;

