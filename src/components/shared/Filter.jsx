import React, { Component } from 'react';
import './Filter.scss'
class Filter extends Component {
    filter=()=>{
        this.props.filter(this.props.name)
    }
    render() { 
        const {title} = this.props
        return (
            <div className="filter" onClick={this.filter}>
                {title}
            </div>
            );
    }
}
 
export default Filter;