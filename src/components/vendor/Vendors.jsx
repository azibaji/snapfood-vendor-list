import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Vendor from './Vendor';
import './vendors.scss'
const PAGE_NUMBER = 10
const Vendors = ({keyword}) => {
    const [page, setPage] = useState(PAGE_NUMBER )
    const [vendors, setVendors] = useState([])
    const [openShops, setOpenShops]= useState({})

    useEffect(() =>{
        const params = {
            page: 0,
            page_size: page,
            lat: 35.754,
            long: 51.328 
        }
            axios.get('https://snappfood.ir/mobile/v3/restaurant/vendors-list', {params})
            .then(res => {
                if(res.data) {
                    let vendorsList = res.data.data.finalResult.filter(d=> d.type === 'VENDOR')
                    vendorsList = vendorsList.filter(vendor => vendor.data.title.includes(keyword)) 
                    const openShopsCount= (res.data.data.finalResult.filter(d=> d.type === 'TEXT')).find(d=>d.type ==='TEXT')
                    setVendors(vendorsList)
                    setOpenShops(openShopsCount)
                }
            }).catch(e=> console.log(e))
    }, [page, keyword])

    const scrollToEnd = function(){
        setPage(page+3)
    }
    window.onscroll = function(){
        if( window.innerHeight + document.documentElement.scrollTop ===  document.documentElement.offsetHeight){
            scrollToEnd()
        }
    }
    return (  
        <div className="vendors">

            <p className="vendors__count">
                {openShops.data}
            </p>

            <div className="vendors__items">
                {vendors.map((vendor, index) => (
                    <Vendor 
                        key={index}
                        vendor={vendor}
                    />
                ))}
            </div>
    
        </div>
    );
}
Vendors.propTypes = {
    keyword: PropTypes.string
}
export default Vendors;