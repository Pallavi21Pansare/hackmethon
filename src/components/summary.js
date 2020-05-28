/* eslint-disable */

import React, { Component } from 'react';


class Summary extends Component {

    constructor(props){
        super(props);
       
        this.onSubmit = this.onSubmit.bind(this);
        this.onBack = this.onBack.bind(this);
        this.fields = { 
            step: ''
        };        
    }
    onSubmit(event){
        this.navigate('5',event);
    }
    onBack(event){
        this.navigate('3',event);
    }
    navigate(step,event)
    {
        event.preventDefault();
        this.fields.step = step;
        this.props.onSubmit(this.fields);
    }

    static defaultProps = {
            data: {
                FirstName: '',
                DoB: '',
                LastName: '',
                EmailID: '',
                Location: '',
                Profession: ''
            }
        }
    render() {      
       
        return (       
            <div className="terms">
                            <h5> User Information: </h5>
                            <div className="review">
                                <ul>
                                    <li><b> First Name:</b> {this.props.data.FirstName} </li>
                                    <li><b> Date of Birth:</b> {this.props.data.DoB}</li>
                                    <li><b>  Last Name :</b> {this.props.data.LastName}</li>
                                    <li><b>  Email Id:</b> {this.props.data.EmailID}</li>
                                     <li><b> Location : </b>{this.props.data.Location}</li>
                                    <li><b>  Profession:</b> {this.props.data.Profession}</li>
                                </ul>
                            </div>


                            <div className="bottom-nav">
                                <ul>
                                    <li> <button className="btn btn-default fl" onClick = {this.onBack}>Back</button></li>
                                    <li> <button className="btn btn-primary fr" onClick = {this.onSubmit}>Continue</button></li>
                                </ul>
                            </div>
                        </div>
      );
            }
    }

export default Summary;