/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserInformation extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
         FirstName: PropTypes.string,
         LastName: PropTypes.string,
         EmailID: PropTypes.string,
         Location : PropTypes.string,

    };
static defaultProps = {
            data: {
            FirstName: '',
            FirstNameError : '',
            LastName: '', 
            LastNameError : '',
            EmailID: '',
            EmailIDError:'',
            DoB : '',
            DoBError: '',
            Location : '', 
            Profession: '',
            step: '',
            acceptTerms: '',
            challenges:[],
            isValidData: false,      
            }
        }
    constructor(props){
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      
        this.state = { FirstName: '',
            FirstNameError : '',
            LastName: '', 
            LastNameError : '',
            EmailID: '',
            EmailIDError:'',
            DoB : '',
            DoBError: '',
            Location : '', 
            Profession: '',
            step: '',
            acceptTerms: '',
            challenges:[],
            isValidData: false
        };

    }

   

    handleOnChange(e)   {
        var fields = {};
        fields[e.target.name] =  e.target.value;
        
        this.setState(fields);        
    }
    onSubmit(event){
        event.preventDefault();
        if(this.isValidForm())
        {            
            this.setState({isValidData : true});
            
            this.navigate('2',event);
        }        
    }
    navigate(step,event)
    {
      
        if (event.target !==  undefined)
        {
            var fields =  this.state;
            fields.step = step;
            if(fields.Profession === "")
            {
                fields.Profession = 'Student';
            }
            fields.challenges = this.props.data.challenges;
            this.props.onSubmit(fields);
        }
    }
    getProfession()
    {
        var statefield =  this.state.Profession || 'Student';
        var propField = this.props.data.Profession;
        var isBackNavigation  = this.props.data.isValidData;
        
        return (isBackNavigation ?  
           ( this.state.Technology === "" ? propField :statefield ) : statefield);

    }

    
    render() {
    
        return (
<div className="register-form">
                                  
                                      <ul>
                                          <li >
                                              <label> First Name <span className="required">*</span> </label>
                                              <input type="text" name="FirstName" onChange={ this.handleOnChange.bind(this)}  defaultValue={this.props.data.FirstName}  />
                                                  <span className = "required">{ this.state.FirstNameError}</span>
                                          </li>
                                          <li>
                                              <label>Last Name <span className="required">*</span> </label>
                                              <input type="text"  name="LastName" onChange={  this.handleOnChange.bind(this)} defaultValue={this.props.data.LastName} />
                                                  <span className = "required">{ this.state.LastNameError}</span>
                                          </li>
                                          <li>
                                              <label>Date of Birth <span>*</span> </label>
                                              <input type="date"  name="DoB" onChange={this.handleOnChange.bind(this)} defaultValue={this.props.data.DoB} />
                                                  <span className = "required">{ this.state.DoBError}</span>
                                          </li>
                                          <li>
                                              <label>Email Id<span>*</span></label>
                                              <input type="text" name="EmailID" onChange={this.handleOnChange.bind(this)} defaultValue={this.props.data.EmailID} />
                                                   <span className = "required">{ this.state.EmailIDError}</span>
                                          </li>
                                          <li>
                                              <label>Location</label>
                                              <input type="text" name="Location" onChange={this.handleOnChange.bind(this)} defaultValue={this.props.data.Location} />
                                                  <span className = "hide">Location</span>
                                          </li>
                                       <li>
                                              <label>Profession</label>
                                              <span className="Profession">
                                              <input name="Profession" value="Student" checked ={this.getProfession() === 'Student'} onChange={this.handleOnChange} type="radio"/> Student </span>
                                                <span className="Profession">
                                              <input name="Profession" value="Employee" checked ={this.getProfession() === 'Employee'} onChange={this.handleOnChange} type="radio"/>Employee </span>
                                              <span className = "hide">Profession</span>
                                          </li>
                                          <li>
                                              <p> Note: Required fields are marked with an asterisk (<span className="required">*</span>)</p>
        </li>
        <li> <button className="btn btn-primary fr" onClick = {this.onSubmit.bind(this)}>Continue</button></li>
        </ul>
        
        </div>
  );
    }

    isValidForm()
    {
        var fields =  this.state;
        var propFields = this.props.data;
        
        let isValidForm = true;

        if(this.RequiredFieldValidation("FirstName"))
        {
            fields['FirstNameError'] = 'First Name is required';
            isValidForm = false;
        }
        else
        {
            fields['FirstNameError'] = '';
        }
        fields['FirstName'] = fields['FirstName'] || propFields['FirstName'];
        if(this.RequiredFieldValidation("LastName"))
        {
            fields['LastNameError'] = 'Last Name is required';
            isValidForm = false;
        }
        else
        {
            fields['LastNameError'] = '';
        }
        fields['LastName'] = fields['LastName'] || propFields['LastName'];
        if (this.EmailValidation('EmailID')) {
            fields['EmailIDError'] = '';
        } else {
            fields['EmailIDError'] = 'A valid Email ID is required';
            isValidForm = false;
        }
        fields['EmailID'] = fields['EmailID'] || propFields['EmailID'];
        if(this.RequiredFieldValidation("DoB"))
        {
            fields['DoBError'] = 'Date of Birth is required';
            isValidForm = false;
        }
        else
        {
            fields['DoBError'] = '';
        }
        fields['DoB'] = fields['DoB'] || propFields['DoB'];
        fields['Location'] = fields['Location'] || propFields['Location'];
        fields['Profession'] = fields['Profession'] || propFields['Profession'];
        fields['acceptTerms'] = fields['acceptTerms'] || propFields['acceptTerms'];
       
        fields['isValidData'] = isValidForm;
        this.setState(fields);
        return isValidForm;       
    }

    RequiredFieldValidation(fieldName)
    {
        var fields =  this.state;
        var propFields = this.props.data;
        var isBackNavigation  = this.props.data.isValidData;

        return (isBackNavigation ? 
                (fields[fieldName] === "" ? propFields[fieldName] === "":fields[fieldName] === "" ) : fields[fieldName] === "" )
    }

    EmailValidation(fieldName)
    {
        var statefield =  this.state.EmailID;
        var propField = this.props.data.EmailID;
        var isBackNavigation  = this.props.data.isValidData;

        return (isBackNavigation ?  
                (statefield === "" ? propField.indexOf("@") > 0 :statefield.indexOf("@") > 0 ) : statefield.indexOf("@") > 0 )
    }

}

export default UserInformation;