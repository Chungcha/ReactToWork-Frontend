import React, { Fragment } from 'react';
import Moment from 'react-moment'
import { Markup } from 'interweave';
import {FaCaretDown, FaCaretUp, FaStackOverflow} from 'react-icons/fa'
import {AiOutlineSave} from 'react-icons/ai'

class Result extends React.Component {

    state = {
        stackOverFlowJob:true,
        expanded:false
    }

    componentDidMount = () => {
        if (!this.props.job.link.includes("stackoverflow")) {
            this.setState({stackOverFlowJob:false})
        }
    }

    innerTextHelper = (description) => {
        let newDesc = description.split("â").join("'")
        if (!this.state.expanded) {
            if (newDesc.length > 280) {
                return newDesc.slice(0,280) + `...`
            }
        }
            return newDesc
    }


    toggleExpand = () => {
        this.setState(pre=>{return{expanded:!pre.expanded}})
    }

    render() {
        return <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-10 job-description-div">
                        <h6 className="float-right d-inline"><strong>Posted On:</strong><Moment format="MM/DD/YYYY">{this.props.job.date}</Moment></h6>
                        <h5 className="card-title">{this.props.job.position}</h5>
                        <Markup content={this.innerTextHelper(this.props.job.description)} />
                        {this.state.stackOverFlowJob ? <span className="expander" onClick={this.toggleExpand}>{this.state.expanded ? <FaCaretUp/> : <FaCaretDown/>}</span> : <span className="expander"><a href={this.props.job.link}><i>See full description on RemoteOK.io</i></a></span>}
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <div className="">
                            <button onClick={()=>window.open(`${this.props.job.link}`,'_blank')} className="btn btn-info align-middle button-result">{this.state.stackOverFlowJob ? <span>View Job on StackOverflow  <FaStackOverflow/></span>: "View Job On RemoteOK.io"}</button>
                            <button className="btn btn-success align-middle button-save">Save This Job <AiOutlineSave/></button>
                        </div>
                    </div>
                </div>
                
            </div>
    <div className="card-footer"><strong>Company: </strong>{this.props.job.company ? `${this.props.job.company}` : "Not Listed"} <br></br><strong>Tags: </strong>{Array.isArray(this.props.job.category) ? this.props.job.category.map((tag,i)=>{return <Fragment key={i}><i>{tag} </i>| </Fragment> }) : "None" }</div>
        </div>
    }

}

export default Result