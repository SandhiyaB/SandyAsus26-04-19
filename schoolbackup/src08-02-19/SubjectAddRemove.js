import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import EmployeeMenuHeader from './EmployeeMenuHeader';

import Maintenance from './Maintenance';
import AddNewSubject from './AddNewSubject';
import RemoveSubject from './RemoveSubject';
import FooterText from './FooterText';
import SchoolMaintenance from './SchoolMaintenance';


class SubjectAddRemove extends Component {

    constructor() {
        super()
        this.state = {

        };
    }


    AddSubjectFunc() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={SubjectAddRemove} />
                    <Route path="/" component={AddNewSubject} />
                    <Route path="/" component={FooterText} />
                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();
    }

    RemoveSubjectFunc() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={SubjectAddRemove} />
                    <Route path="/" component={RemoveSubject} />
                    <Route path="/" component={FooterText} />
                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();

    }

    BackbtnFunc() {
        ReactDOM.render(
            <Router>
                <div>
                    <Route path="/" component={EmployeeMenuHeader} />
                    <Route path="/" component={SchoolMaintenance} />
                    <Route path="/" component={FooterText} />

                </div>
            </Router>,
            document.getElementById('root'));
        registerServiceWorker();
    }




    render() {
        return (



            <div className="container" style={{ backgroundColor: "#edf5e1" }}>
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

                <div id='horMenunew' >
                    <ul id='horMenunew' style={{ backgroundColor: "#8811d6" }}>
                        <li><a className="active" onClick={() => this.AddSubjectFunc()} ><span class="glyphicon glyphicon-plus">Add</span></a></li>
                        <li><a onClick={() => this.RemoveSubjectFunc()}><span class="glyphicon glyphicon-minus">Remove</span> </a></li>
                    </ul>

                </div>


            </div>




        );
    }

}


export default SubjectAddRemove;
