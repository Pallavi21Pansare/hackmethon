/* eslint-disable */

import React, { Component } from 'react';


class tab extends Component {
    constructor(props){
        super(props);

        this.setActive = this.setActive.bind(this);
        this.fields = { step1: 'step1', 
            step2: 'step2', 
            step3 :'step3',
            step4 : 'step4',
            step5: 'step5'
        };
     
    }
 
    setActive()
    {
        const {data} = this.props;
        switch (data) {
            case '2':
                this.fields.step2 = 'step2 active';
                this.fields.step1 = 'step1';
                this.fields.step3 = 'step3';
                this.fields.step4 = 'step4';
                this.fields.step5 = 'step5';
                break;
            case '3':
                this.fields.step3 = 'step3 active';
                this.fields.step1 = 'step1';
                this.fields.step2 = 'step2';
                this.fields.step4 = 'step4';
                this.fields.step5 = 'step5';
                break;
            case '4':
                this.fields.step4 = 'step4 active';
                this.fields.step1 = 'step1';
                this.fields.step2 = 'step2';
                this.fields.step3 = 'step3';
                this.fields.step5 = 'step5';
                break;
            case '5':
                this.fields.step5 = 'step5 active';
                this.fields.step1 = 'step1';
                this.fields.step2 = 'step2';
                this.fields.step3 = 'step3';
                this.fields.step4 = 'step4';
                break;
            default:
                this.fields.step1 = 'step1 active';
                this.fields.step4 = 'step4';
                this.fields.step2 = 'step2';
                this.fields.step3 = 'step3';
                this.fields.step5 = 'step5';
                break;
        }
    }
    onSubmit(event){
        event.preventDefault();
    }
    render() {
      
        this.setActive();         
        return (
       
                <div className="nav-step">
                                  <ul>
                                      <li className={this.fields.step1}><button onClick = {this.onSubmit}> 1. User Information</button></li>
                                      <li className={this.fields.step2}><button onClick={this.onSubmit}>   2. Courses</button></li>
                                      <li className={this.fields.step3}><button onClick = {this.onSubmit}> 3. Terms & Conditions</button> </li>
                                      <li className={this.fields.step4}><button onClick = {this.onSubmit}> 4. Review</button></li>
                                      <li className={this.fields.step5}><button onClick = {this.onSubmit}> 5. Finish</button></li>
                                  </ul>
                              </div>
     );
    }
}

export default tab;