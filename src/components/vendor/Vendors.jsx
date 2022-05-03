import React, { Component } from 'react';
import axios from 'axios';
import Vendor from './Vendor';
import './vendors.scss'
class Vendors extends Component {
    state = {
        vendors:[],
        openShops:{},
        filteredVendors:[]
    }
    
    componentDidMount(){
        this.getVendors() 
    }
    componentDidUpdate(prevProps){
        if(prevProps.keyword !== this.props.keyword){
            this.searchVendors()
        }
        if(prevProps.filter.value !== this.props.filter.value || prevProps.filter.name !== this.props.filter.name){
            this.filterVendors()
        }
    }
    searchVendors(){
        const filteredVendors = this.state.vendors.filter(vendor => vendor.data.title.includes(this.props.keyword)) 
        this.setState({filteredVendors})
    }
    filterVendors(){
        let filteredVendors;
        if(this.props.filter.value){
            const prop=String(this.props.filter.name)
            filteredVendors = this.state.vendors.filter(vendor => vendor.data[prop] === true)
            console.log(filteredVendors)
            
        } else{
            filteredVendors=this.state.vendors
        }
        
        this.setState({filteredVendors})
    }
    async getVendors(){
        const params = {
            page: 0,
            page_size: 10,
            lat: 35.754,
            long: 51.328 
        }
        try{
            const {data} = await axios.get('https://snappfood.ir/mobile/v3/restaurant/vendors-list', {params})
            if(data){
                console.log(data.data.finalResult)
                const vendors = data.data.finalResult.filter(d=> d.type === 'VENDOR')
                const openShops = (data.data.finalResult.filter(d=> d.type === 'TEXT')).find(d=>d.type ==='TEXT')
                this.setState({vendors, openShops, filteredVendors : vendors})
                console.log(vendors)
            }
        }
        catch(e){
            console.log(e)
        }
    }
    render() { 
        const {filteredVendors, openShops} = this.state
        return (
            <div className="vendors">
                <p className="vendors__count">
                    {openShops.data}
                </p>
                <div className="vendors__items">
                    {filteredVendors.map((vendor, index) => (
                        <Vendor 
                            key={index}
                            vendor={vendor}
                        />
                    ))}
                </div>
                
            </div>);
    }
}
 
export default Vendors;