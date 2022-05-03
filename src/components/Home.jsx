import React, { Component } from 'react';
import Vendors from './vendor/Vendors';
import SearchBox from './shared/SearchBox';
import Filter from './shared/Filter'
class Home extends Component {
    state = {
        keyword:'',
        filters:[
            {
                id:1,
                title:'دارای کوپن',
                name:'has_coupon',
                value:false
            },
            {
                id:2,
                title:'دارای تخفیف',
                name:'has_discount',
                value:false
            }

        ],
        filter:{}
    }
    search = (keyword) =>{
        this.setState({keyword})
    }
    filter = (filterName, filterValue) =>{
        let filter ={
            name:filterName,
            value:filterValue
        }
        this.setState({filter})
    }
    render() { 
        const {filters, keyword, filter} = this.state
        return (
            <div className="home">
                <SearchBox search={this.search}/>

                <div className="filters">
                    {filters.map(filter => (
                        <Filter 
                            key={filter.id}
                            title={filter.title}
                            name={filter.name}
                            filter={this.filter}/>
                    ))}
                </div>

                <Vendors 
                    keyword={keyword}
                    filter={filter}/>
            </div>
            );
    }
}
 
export default Home;