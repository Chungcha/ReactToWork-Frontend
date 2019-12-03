import React from 'react'
import Result from '../components/Result'

class ResultsContainer extends React.Component {


    render() {
        return <div className="row results-row">
            <div className="col">
            {this.props.jobs.map(job=>{
                return <Result job={job}/>
            })}
        </div>
        </div>
    }

}

export default ResultsContainer