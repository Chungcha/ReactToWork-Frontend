import React from 'react'

class Result extends React.Component {


    render() {
        return <div>
            {this.props.job.position}
        </div>
    }

}

export default Result