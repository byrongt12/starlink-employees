import React from 'react'
import Tree from 'react-animated-tree'
import './EmployeeTree.css'


export default function EmployeeTree(props) {
      
    const typeStyles = {
      fontSize: '3.8em',
      verticalAlign: 'middle'
    }   


    var temp = Object.assign({}, props.data)

    var data = temp,
    
    tree = function (data) {
        var t = {},
        parents = {};

        Object.values(data).forEach(({ employee_number: key, name: label, reporting_line, surname, birthdate, role_name, total_salary }) => {
            Object.assign(t[key] = t[key] || {}, { key, label, surname, birthdate, role_name, total_salary});
            t[reporting_line] = t[reporting_line] || { };
            t[reporting_line].children = t[reporting_line].children || [];
            t[reporting_line].children.push(t[key]);
            parents[key] = true;
        });
        return Object
            .keys(t)
            .filter(k => !parents[k])
            .flatMap(k => t[k].children);
    }(data);

    const Build = (props) => {
      return (
        <>
          {props.arr.map((item, key) => (
            
              <Tree key={key} style={{ color: '#434EE8' }} type={<span style={typeStyles}></span>} open>
                <div className="cardTree" key={item.id}>
                <div className="container">
                    <span className='listData'><b>{item.label}</b></span> 
                    <span className='listData'>{item.surname}</span> 
                    <span className='listData'>{item.birthdate.substring(0,10)}</span>
                    <span className='listData'>{item.key}</span>
                    <span className='listData'>{item.role_name}</span>
                    <span className='listData'>{item.total_salary}</span>
                </div>

                </div>
                {item.children?.length && <Build arr={item.children} />}
              </Tree>
           
          ))}
        </>
      );
    };

    
    return (

      <Build arr={tree}/>
    );
}