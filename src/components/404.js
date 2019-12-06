
import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../assets/404-error-alt.json'
import {navigate} from '@reach/router'

class FourOFour extends React.Component {

    backToHome = () => {
        navigate("/")
    }

    render() {

        const defaultOptions = {
            loop: true,
            autoplay: true, 
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };

    return <div className=" App container-fluid four-o-four-bg" id="home">
          
     
      
          <div className={`landing-text row`}>
          <div onClick={this.backToHome} className="col lottie-holder-fof">   
          <Lottie options={defaultOptions}height="100%"width="100%"/></div>
                <div className="col"><h1 onClick={this.backToHome} className="hero-text display-1  fof-text">{"<"}BackToHome{"/>"}</h1>
      </div>
        </div>
    </div>
        }
    }
    
    export default FourOFour