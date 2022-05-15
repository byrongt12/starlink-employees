import { React } from 'react'
import './ListSalaryPerRole.css'

function ListSalaryPerRole(props) {

    const data = props.data
    
    return (
        <ul>
            <div className="cardTitleSGR">
                <div className="container">
                    <span className='listDataTitleSGD'>Role name</span> 
                    <span className='listDataTitleSGD'>Total salary</span> 
                </div>
            </div>
            {data.map((item) => (

                <div className="cardSGD" key={item.role_name}>
                <div className="container">
                    <span className='listDataSGD'><b>{item.role_name}</b></span> 
                    <span className='listDataSGD'>{item.sum}</span> 
                </div>
                </div>
            
            ))}
      </ul>
    )
}

export default ListSalaryPerRole