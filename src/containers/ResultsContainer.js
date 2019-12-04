import React from 'react'
import Result from '../components/Result'
import sortBy from 'lodash/sortBy'

class ResultsContainer extends React.Component {


    arraySorter = (array) => {
        let jobs = sortBy(array,(job)=>{return -(new Date(job.date))})
        return jobs
    }

    render() {
        return <div className="row results-row">
            <div className="col">
            {this.arraySorter(this.props.jobs).map((job)=>{
                return <Result key={job.link} job={job}/>
            })}
        </div>
        </div>
    }

}

export default ResultsContainer