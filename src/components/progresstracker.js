import React, { Component } from 'react';


class progresstracker extends Component {
    constructor(props){
        super(props);

        this.setActive = this.setActive.bind(this);
        this.fields = { step1: 'step1', 
            step2: 'step2', 
            step3 :'step3',
            step4 : 'step4',
            step5 : 'step5'
        };
     
    }

    setActive()
    {
        const {data} = this.props;
        switch (data) {
            case '2':
                this.fields.step2 = 'step2';
                this.fields.step1='step1 active';
                this.fields.step3='step3';
                this.fields.step4='step4';
                this.fields.step5 = 'step5';
                break;
            case '3':
                this.fields.step3 = 'step3';
                this.fields.step1='step1 active';
                this.fields.step2='step2 active';
                this.fields.step4='step4';
                this.fields.step5 = 'step5';
                break;
            case '4':
                this.fields.step4 = 'step4';
                this.fields.step1='step1 active';
                this.fields.step2='step2 active';
                this.fields.step3='step3 active';
                this.fields.step5 = 'step5';
                break;
            case '5':
                this.fields.step4 = 'step4 active';
                this.fields.step1='step1 active';
                this.fields.step2='step2 active';
                this.fields.step3='step3 active';
                this.fields.step5 = 'step5';
                break;
            default:
                this.fields.step1 = 'step1';
                this.fields.step4='step4';
                this.fields.step2='step2';
                this.fields.step3='step3';
                this.fields.step5 = 'step5';
                break;
        }
    }

     render() {
      
         this.setActive();
         
         return (
       
             <div className="row">
                                   <div className="board">
                                       <div className="board-inner">
                                           <ul className="nav nav-tabs" id="myTab">
                                               <li className={this.fields.step1}>
                                               <a> 
                                                       <span className="round-tabs one">1</span>
                                                  </a>
                                               </li>
                                               <li className={this.fields.step2}>
                                                 <a> 
                                                       <span className="round-tabs two">2</span>
                                                   </a>
                                               </li>
											     <li className={this.fields.step3}>
                                                 <a> 
                                                       <span className="round-tabs three">3</span>
                                                   </a>
                                               </li>
                                               <li className={this.fields.step4}>
                                                 <a> 
                                                      <span className="round-tabs four">4</span>
                                                  </a>
                                              </li>
                                              <li className={this.fields.step5}>
                                                 <a> 
                                                      <span className="round-tabs five">5</span>
                                                 </a>
                                              </li>
                                          </ul>
                                      </div>
                                  </div>
                              </div>
      );
                                      }
                                  }

export default progresstracker;