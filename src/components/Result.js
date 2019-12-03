import React from 'react';
import Moment from 'react-moment'
import { Markup } from 'interweave';

class Result extends React.Component {

    state = {
        stackOverFlowJob:true
    }

    innerTextHelper = (description) => {
        let newDesc = description.split("â").join("'")
        if (newDesc.length > 280) {
            return newDesc.slice(0,280) + "..."
        }
            return newDesc
    }

    render() {
        return <div className="card">
            <div className="card-body">
                <div className="row">
                <div className="col-10 job-description-div">
                <h6 className="float-right d-inline"><Moment format="MM/DD/YYYY">{this.props.job.date}</Moment></h6>
                <h5 className="card-title">{this.props.job.position}</h5>
                <Markup content={this.innerTextHelper(this.props.job.description)} />
                
                </div>
                <div className="col d-flex justify-content-center align-items-center">
                <div className="row justify-content-center">
                <button className="btn btn-info align-middle">Button</button>
                </div>
                </div>
                </div>
            </div>
        </div>
    }

}

export default Result