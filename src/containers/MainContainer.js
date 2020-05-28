/* eslint-disable */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LeftBanner from '../components/LeftBanner';
import UserInformation from '../components/userInformation';
import ToC from '../components/acceptTerms';
import Review from '../components/summary';
import Final from '../components/Finish';
import ProgressTracker from '../components/progresstracker';
import Tab from '../components/tab';
import Challenges from '../components/challenges';



class MainContainer extends Component {
    static propTypes = {
        onSubmit: PropTypes.func
    };

      constructor(props){
        super(props);
      
        this.onSubmit = this.onSubmit.bind(this);
     

        this.state = { FirstName: '', 
            LastName: '', 
            EmailID : '',
            DoJ : '', 
            Location : '', 
            Profession: '',
            step: '1',
            acceptTerms: '',
            challenges:[]
     
        };
     
    }
    onSubmit(state)
    {
        this.setState(state);
    }

   get componentToRender()
    {
        let component = null;
        const step =  this.state.step; 

 
        switch (step) {
            case '2':
                
                component = <Challenges onSubmit = {fields => this.onSubmit(fields)}  data = {this.state}/>;
                
                break;
            case '3':
                component = <ToC onSubmit = {fields => this.onSubmit(fields)}  data = {this.state}/>;
                break;
            case '4':
                component = <Review onSubmit = {fields => this.onSubmit(fields)}  data = {this.state}/>;
                break;
            case '5':
                component = <Final />;
                break;
            default:
                component = <UserInformation onSubmit = {fields => this.onSubmit(fields)} data = {this.state}/>;
        }
        return component;
    }  

    render() {
        let component = this.componentToRender;
        const step = this.state.step;
       
        return ( 
            <div className="registration">
            <div className="container">
                <div className="row border-outer">
                    <LeftBanner />
                    <main>
                    <form>
                        <div className="col-md-9 col-sm-12">
                            <div className="register">
                                <section>
                                    <div className="container-flow">                           
                                    <ProgressTracker data = {step}/>  
                                    <Tab data = {step}/>
                                        { component }                                           
                                    </div>
                            </section>
                         </div>
                     </div>
                </form>
            </main>   
             </div>
        </div>
    </div>
      );
    }
}

export default MainContainer;