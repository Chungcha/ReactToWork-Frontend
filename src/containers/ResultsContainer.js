import React from 'react'
import Result from '../components/Result'
import sortBy from 'lodash/sortBy'

class ResultsContainer extends React.Component {


    arraySorter = (array) => {
        let jobs = sortBy(array,(job)=>{return -(new Date(job.date))})
        return jobs
    }

    jobBolean = (job) => {
        let jobCheckArr = this.props.usersSavedJobs.map(job=>{return job.link})
        return jobCheckArr.includes(job.link)
    }

    render() {
        return <div className="row results-row">
            <div className="col">
            {this.arraySorter(this.props.jobs).map((job)=>{
                return <Result isSaved={this.jobBolean(job)} addToSavedJobs={this.props.addToSavedJobs} key={job.link} job={job}/>
            })}
        </div>
        </div>
    }

}

export default ResultsContainer