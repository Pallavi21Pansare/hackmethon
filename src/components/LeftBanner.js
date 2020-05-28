/* eslint-disable */

import React, { Component } from 'react';
import elearning from '../img/learning.jpg';

class LeftBanner extends Component {

    render() {
        return (

<aside>
             <div className="col-md-3 col-sm-12">
                 <div className="sidebar">
                     <h1>Register for e-course</h1>
                      <img src={elearning} alt="Hackathon" />
                 </div>
             </div>
</aside>
  );
                      }
}

export default LeftBanner;