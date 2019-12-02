import React from 'react'
import Result from '../components/Result'

class ResultsContainer extends React.Component {


    render() {
        return <div>
            {this.props.jobs.map(job=>{
                return <Result job={job}/>
            })}
        </div>
    }

}

export default ResultsContainer