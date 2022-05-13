import { React, useState } from 'react'
import './ListSalaryPerDept.css'

function ListSalaryPerDept(props) {

    const data = props.data
    
    return (
        <ul>
            <div className="cardTitleSGD">
                <div className="container">
                    <span className='listDataTitleSGD'>Department name</span> 
                    <span className='listDataTitleSGD'>Total salary</span> 
                </div>
            </div>
            {data.map((item) => (

                <div className="cardSGD" key={item.dep_name}>
                <div className="container">
                    <span className='listDataSGD'><b>{item.dep_name}</b></span> 
                    <span className='listDataSGD'>{item.sum}</span> 
                </div>
                </div>
            
            ))}
      </ul>
    )
}

export default ListSalaryPerDept