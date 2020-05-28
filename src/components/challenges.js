/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Challenges extends Component {
    static propTypes = {
        onSubmit: PropTypes.func
    };

    static defaultProps = {
            data: {
                isValidForm: 'false'

            }
        }

    constructor(props){
        super(props);
        
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.renderChallengeList = this.renderChallengeList.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onBack = this.onBack.bind(this);

            this.state = {challenges : [{"id": "Blockchain","description":"This Blockchain course provides an overview of Bitcoin, Hyperledger, Ethereum, and Multichain blockchain platforms. ","checked":false},
              {"id": "UI Design","description":"This Course Deals with principles and fundamentals of designs","checked":false},
              {"id": "IOT","description":"This course covers basic concepts of IOT application and architecture","checked":false},
              {"id": "Microservices","description":"This course gives an intoduction on Microservices architecture and functionality","checked":false},
              {"id": "Cloud","description":"This course briefs the basic concept of cloud computing","checked":false},
              {"id": "Data Science","description":"This course briefs on Machine learning concepts","checked":false},
              {"id": "Devops","description":"This course gives advanced introduce on all basic concepts in Devops","checked":false},
              {"id": "AI","description":"This course covers concepts in problem solving, reasoning,natural languagae ","checked":false}],
                searchText : '',
                isValidForm : this.props.data.isValidForm,
                isDirty:false};

        this.fields = { FirstName: '',
            LastName: '', 
            EmailID: '',
            DoB : '',
            Location : '', 
            Profession: '',
            step: '',
            acceptTerms: '',
            challenges:[]
        };
      
    } 

    handleCheckboxChange(e)   {


        const updatedChallenges = this.state.challenges.map(item => {
          
            if (item.id === e.target.name) {
                return Object.assign({}, item, { checked: e.target.checked });
            }
            return item;
        });

        const selectedChallenges = updatedChallenges.filter((item) => {
            if(item !== undefined)
                return item.checked;
        }) ;
        
        this.setState({challenges:updatedChallenges,isValidForm : (selectedChallenges.length > 0 && selectedChallenges.length < 4),isDirty:true});        
    }


   handleSearch(e)   {
        this.setState({searchText : e.target.value});        
    }

    onSubmit(event){
        event.preventDefault();          
        this.setState({isValidData : true});
        this.navigate('3',event);  
    }

    onBack(event){
        this.navigate('1',event);
    }

    navigate(step,event)
    {
        if (event.target !==  undefined)
        {
            var fields =  this.state;
            fields.step = step;
            this.props.onSubmit(fields);
        }
    }

    componentDidMount()
    {
        const {isDirty} = this.state;
        const {data} = this.props;

        if(data.isValidForm && !isDirty){
            this.setState({challenges:data.challenges});        
        }
    }
   
    renderChallengeList()
    { 
        const {challenges,searchText} = this.state;       
        const filteredList = challenges.filter(

            (item) => {
            if(item !== undefined)
            return item.id.toLowerCase().search(searchText.toLowerCase()) !== -1;
        }) ;

        return (
             filteredList.map((item) => {
             return( <div className="challenge-content row" key={item.id}>
                    <div className="col-lg-2 col-sm-4 col-xs-4">{ item.id } </div>  
                    <div className="col-lg-8 col-sm-4 col-xs-4"> {item.description}  </div> 
                    <div className="col-lg-2 col-sm-4 col-xs-4 text-alg-right"> <input type="checkbox" name={item.id}  id={item.id} checked = {item.checked} onChange= { (e) => {this.handleCheckboxChange(e)}}/> Select </div>  
                    </div>);
                 })
             );
    }
         
    
    render() {
        const {data} = this.props;
        this.fields = data;
     
    
        return (
        <div className="register-form">                                  
        <div  className="challenge-heading row">
            <div className="col-lg-2 col-sm-4 col-xs-4"> <b>Course </b>  </div> 
            <div className="col-lg-7 col-sm-4 col-xs-4"> <b>Description </b>  </div> 
            <div className="col-lg-3 col-sm-4 col-xs-4"> <input type="text" placeholder="Filter Course / Description" onChange={ this.handleSearch.bind(this)}/>   </div> 
        </div>
            {this.renderChallengeList()}
        <div className="challenge-bottom row">           
             <div className="col-lg-6 col-sm-12 col-xs-12">Note: <b> Select minimum 1 and maximum 3 </b>   </div> 
                <div className="bottom-nav">
                    <ul>
                     <li> <button className="btn btn-default fl" onClick = {this.onBack}>Back</button></li>
                     <li> <button className="btn btn-primary fr" onClick = {this.onSubmit.bind(this)} disabled={!(this.state.isValidForm)}>Continue</button></li>
                    </ul>
                </div>
             </div>    
         </div>
  );
            }

}

export default Challenges;