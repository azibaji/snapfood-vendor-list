import React, { Component } from 'react';
import Vendors from './vendor/Vendors';
import SearchBox from './shared/SearchBox';
class Home extends Component {
    state = {
        keyword:'',
    }
    search = (keyword) =>{
        this.setState({keyword})
    }
    render() { 
        const {keyword, filter} = this.state
        return (
            <div className="home">

                <SearchBox search={this.search}/>

                <Vendors keyword={keyword}/>
                
            </div>
            );
    }
}
 
export default Home;