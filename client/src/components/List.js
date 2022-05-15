import { React } from 'react'
import './List.css'
function List(props) {

    const filteredData = props.data.filter((el) => {
        if (props.input === '') {
            return el;
        }
        else {
            return el.name.toLowerCase().includes(props.input) 
            || el.surname.toLowerCase().includes(props.input) 
            || el.birthdate.toString().toLowerCase().includes(props.input) 
            || el.employee_number.toString().toLowerCase().includes(props.input) 
            || el.marital_status.toLowerCase().includes(props.input) 
            || el.post_code.toString().toLowerCase().includes(props.input) 
            || el.address_1.toLowerCase().includes(props.input) 
            || el.address_2.toLowerCase().includes(props.input) 
            || el.contact_no.toLowerCase().includes(props.input) 
            || el.country_name.toLowerCase().includes(props.input) 
            || el.total_salary.toString().toLowerCase().includes(props.input) 
            || el.role_name.toLowerCase().includes(props.input) 
            || el.dep_name.toLowerCase().includes(props.input) 
            || el.div_name.toLowerCase().includes(props.input) 
            || el.comp_name.toLowerCase().includes(props.input) 
            || el.org_name.toLowerCase().includes(props.input) 
            || el.qual_level.toLowerCase().includes(props.input) 
            || (el.reporting_line && el.reporting_line.toString().toLowerCase().includes(props.input)) 
        }
    })
    return (
        <ul>
            <div className="cardTitle">
                <div className="container">
                    <span className='listDataTitle'>Name</span> 
                    <span className='listDataTitle'>Surname</span> 
                    <span className='listDataTitle'>Birthdate</span>
                    <span className='listDataTitle'>Employee No</span>
                    <span className='listDataTitle'>Marital Status</span>
                    <span className='listDataTitle'>Postal Code</span> 
                    <span className='listDataTitle'>Address 1</span> 
                    <span className='listDataTitle'>Address 2</span>
                    <span className='listDataTitle'>Contact No</span>
                    <span className='listDataTitle'>Country</span>
                    <span className='listDataTitle'>Salary</span>
                    <span className='listDataTitle'>Reporting line</span> 
                    <span className='listDataTitle'>Role Name</span> 
                    <span className='listDataTitle'>Dep Name</span>
                    <span className='listDataTitle'>Div Name</span>
                    <span className='listDataTitle'>Comp Name</span>
                    <span className='listDataTitle'>Org Name</span>
                    <span className='listDataTitle'>Qualification</span>
                </div>
            </div>
            {filteredData.map((item) => (

                <div className="card" key={item.id}>
                <div className="container">
                    <span className='listData'><b>{item.name}</b></span> 
                    <span className='listData'>{item.surname}</span> 
                    <span className='listData'>{item.birthdate.substring(0,10)}</span>
                    <span className='listData'>{item.employee_number}</span>
                    <span className='listData'>{item.marital_status}</span>
                    <span className='listData'>{item.post_code}</span> 
                    <span className='listData'>{item.address_1}</span> 
                    <span className='listData'>{item.address_2}</span>
                    <span className='listData'>{item.contact_no}</span>
                    <span className='listData'>{item.country_name}</span>
                    <span className='listData'>{item.total_salary}</span> 
                    <span className='listData'>{item.reporting_line}</span> 
                    <span className='listData'>{item.role_name}</span>
                    <span className='listData'>{item.dep_name}</span>
                    <span className='listData'>{item.div_name}</span>
                    <span className='listData'>{item.comp_name}</span>
                    <span className='listData'>{item.org_name}</span>
                    <span className='listData'>{item.qual_level}</span>
                </div>
                </div>
                

            ))}
      </ul>
    )
}

export default List