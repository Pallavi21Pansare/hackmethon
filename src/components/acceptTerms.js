/* eslint-disable */

import React, { Component } from 'react';


class AcceptTerms extends Component {

    constructor(props){
        super(props);
       
        this.onSubmit = this.onSubmit.bind(this);
        this.onBack = this.onBack.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.fields = {
            FirstName: '', 
            LastName: '', 
            DoB : '', 
            Location : '', 
            Profession: '',
            step: '',
            acceptTerms: false,
            challenges:[]
        };
        this.state = { acceptTerms : this.props.data.acceptTerms};

    }
    onSubmit(event){
        this.navigate('4',event);
    }
    onBack(event){
        this.navigate('2',event);
    }
    navigate(step,event)
    {
        event.preventDefault();
        this.fields.step = step;
        this.fields.acceptTerms = this.state.acceptTerms;
        this.props.onSubmit(this.fields);
    }
    handleOnChange(e)   {

         this.setState({acceptTerms : !(this.state.acceptTerms)});
       

    }

     static defaultProps = {
            data: {
                acceptTerms: false,        
            }
        }
    render() {
        const {data} = this.props;
        this.fields = data;
        
        
        return (
              <div className="terms">
                                      <textarea>
                                          What is Lorem Ipsum?
                                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

        Why do we use it?
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                      </textarea>
                                      <div className="accept-terms">
                                          <input type="checkbox" onChange={this.handleOnChange.bind(this)} checked = {this.state.acceptTerms} />  I accept all of the terms and conditions defined on this page
                                      </div>
                                      <div className="bottom-nav">
                                          <ul>
                                              <li> <button className="btn btn-default fl" onClick = {this.onBack}>Back</button></li>
                                              <li> <button className="btn btn-primary fr" onClick = {this.onSubmit} disabled={!(this.state.acceptTerms)}>Continue</button></li>
                                          </ul>
                                      </div>
                                  </div>
      );
                                          }


 
          }

export default AcceptTerms;