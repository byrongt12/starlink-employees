import React, {useState, useEffect, Fragment} from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import List from "./components/List";
import ListSalaryPerRole from "./components/ListSalaryPerRole";
import ListSalaryPerDept from "./components/ListSalaryPerDept";

import TextField from "@mui/material/TextField";
import EmployeeTree from './components/EmployeeTree';
import FieldSelector from './components/FieldSelector';
import MultipleFieldSelector from './components/MultipleFieldSelector';
import { GiCheckboxTree   } from 'react-icons/gi';
import { BsBuilding   } from 'react-icons/bs';
import { BsPerson   } from 'react-icons/bs';

import moment from 'moment';


function App() {
  const [employees, setEmployees] = useState();
  const [employeesArr, setEmployeesArr] = useState([]);

  const [sgrData, setSgrData] = useState();
  const [sgrDataArr, setSgrDataArr] = useState([]);

  const [sgdData, setSgdData] = useState();
  const [sgdDataArr, setSgdDataArr] = useState([]);

  const [displayTree, setDisplayTree] = useState(false);
  const [displaySalaryPerRole, setDisplaySalaryPerRole] = useState(false);
  const [displaySalaryPerDept, setDisplaySalaryPerDept] = useState(false);

  const [inputText, setInputText] = useState("");
  const [allFields, setAllFields] = useState([]);
  const [filterFields, setFilterFields] = useState([]);
  const [selectedFilterField, setSelectedFilterField] = useState('');
  const [selectedStartFilter, setSelectedStartFilter] = useState('');
  const [selectedEndFilter, setSelectedEndFilter] = useState('');

  const [selectedSortFields, setSelectedSortFields] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [selectedSortOrder, setSelectedSortOrder] = useState('');

  useEffect(() => {
    getEmployee();
    /*setEmployeesArr(employees)*/
    setFilterFields(['Birthdate', 'Salary', 'Employee Number'])
    setOrderList(['Ascending', 'Descending'])
    document.title = "StarLink Employees"
  }, []);

  useEffect(() => {
    getAllFields()
  }, [employeesArr]);

  const displayTreeEvent = (event) => {
    setDisplayTree(true)
  };

  const hideTreeEvent = (event) => {
    setDisplayTree(false)
    setSelectedFilterField("")
  };

  const displaySalaryRoleEvent = (event) => {
    getEmployeeSGR()
    setDisplaySalaryPerRole(true)
    
  };

  const hideSalaryRoleEvent = (event) => {
    setDisplaySalaryPerRole(false)
    setSelectedFilterField("")
  };

  const displaySalaryDeptEvent = (event) => {
    getEmployeeSGD()
    setDisplaySalaryPerDept(true)
  };

  const hideSalaryDeptEvent = (event) => {
    setDisplaySalaryPerDept(false)
    setSelectedFilterField("")
  };

  let handleStartFilterChange = (e) => {
    setSelectedStartFilter(e.target.value)
  };

  let handleEndFilterChange = (e) => {
    setSelectedEndFilter(e.target.value)
  };

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
 
  const getAllFields = () => {
    if (employeesArr){
        var firstObj = Object.values(employeesArr)[0]
        if (firstObj){
            setAllFields(Object.keys(firstObj))
        }   
    }
  };

  function getEmployee() {
    fetch('/employees')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setEmployees(data);
        setEmployeesArr(Array.from(JSON.parse(data)));
      });
  }

  function getEmployeeSGR() {
    fetch('/employees/sgr')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setSgrData(data);
        setSgrDataArr(Array.from(JSON.parse(data)));
      });
  }

  function getEmployeeSGD() {
    fetch('/employees/sgd')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setSgdData(data);
        setSgdDataArr(Array.from(JSON.parse(data)));
      });
  }

  function isNumber(str) {
    if (str.trim() === '') {
      return false;
    }
  
    return !isNaN(str);
  }

  function getAllEmployees(){
    getEmployee()
  }

  function filterInputChecker() {

    if (selectedFilterField == ''){
      getEmployee()
      return
    }
    
    if (selectedFilterField == 'Birthdate'){

      const dateFormat = 'YYYY-MM-DD'
      var startDateStr = moment(selectedStartFilter.toString(), dateFormat, true);
      var endDateStr = moment(selectedEndFilter.toString(), dateFormat, true);

      if (!startDateStr.isValid()){
        alert("Please enter a correct start date (YYYY-MM-DD)")
        return
      }

      if (!endDateStr.isValid() && selectedEndFilter != ''){
        alert("Please enter a correct end date (YYYY-MM-DD)")
        return
      }
    }
    else{
      if(!isNumber(selectedStartFilter)){
        alert("Please enter a valid start number")
        return
      }
      if(!isNumber(selectedEndFilter) && selectedEndFilter != ''){
        alert("Please enter a valid end number")
        return
      }
    }

    filterEmployees()
  }
  
  function filterEmployees() {
  
    fetch('/employees/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({selectedFilterField, selectedStartFilter, selectedEndFilter}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        setEmployees(data);
        setEmployeesArr(Array.from(JSON.parse(data)));
      });
  }

  function sortEmployees() {

    fetch('/employees/sort', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({selectedSortFields, selectedSortOrder}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        setEmployees(data);
        setEmployeesArr(Array.from(JSON.parse(data)));
      });
  }

  return (
    <div>
      <Navbar />
        <div id='outerDiv'>

          {displayTree &&
            <>
            <button className="backButton" onClick={hideTreeEvent}>Back</button>
            <div id="treeDiv">
              <EmployeeTree data={employeesArr}/>
            </div>
            </>
          }

          {displaySalaryPerRole &&
            <>
            <button className="backButton" onClick={hideSalaryRoleEvent}>Back</button>
             <ListSalaryPerRole data={sgrDataArr}/>
            </>
          }

          {displaySalaryPerDept &&
            <>
            <button className="backButton" onClick={hideSalaryDeptEvent}>Back</button>
             <ListSalaryPerDept data={sgdDataArr}/>
            </>
          } 

          {employeesArr && !displayTree && !displaySalaryPerRole && !displaySalaryPerDept &&
          <>

          <div id="toolBox">
            
              <button id="displayTreeButton" onClick={displayTreeEvent}>
                <p id='displayTreeText'>Display Organogram</p>
                <GiCheckboxTree 
                  size={30} 
                  style={{
                    margin: '0px',
                    paddingRight: '4px',
                    paddingTop: '4px',
                    color: 'white',
                    display: 'flex',
                    float:'right'
                  }} 
                  />
              </button>
              
              <button id="displaySalaryRole" onClick={displaySalaryRoleEvent}>
                <p id='displaySalaryRoleText'>Display Salaries grouped by Role</p>
                <BsPerson 
                  size={30} 
                  style={{
                    margin: '0px',
                    paddingRight: '4px',
                    paddingTop: '4px',
                    color: 'white',
                    display: 'flex',
                    float:'right'
                  }} 
                  />
              </button>

              <button id="displaySalaryDept" onClick={displaySalaryDeptEvent}>
                <p id='displaySalaryDeptText'>Display Salaries grouped by Department</p>
                <BsBuilding 
                  size={25} 
                  style={{
                    margin: '0px',
                    paddingRight: '4px',
                    paddingTop: '4px',
                    color: 'white',
                    display: 'flex',
                    float:'right'
                  }} 
                  />
              </button>
              
            <div id="topToolsDiv">
              <span className="spanGrouper">
                <p id = "filterText">Filter Employees based on a column in a range</p>
                <span className="filterSelector">
                  <FieldSelector data={filterFields} selectedField={selectedFilterField} setSelectedField={setSelectedFilterField} initialText={"Column"}/>
                </span>
                
                <span id="startFilter">
                  <TextField
                    id="startFilterField"
                    style={{
                      width: "150px"
                    }}
                    size="small"
                    variant="outlined"
                    fullWidth
                    label="From"
                    value={selectedStartFilter}
                    onChange={handleStartFilterChange}
                  />
                </span>
                <span id="endFilter">
                  <TextField
                    id="endFilterField"
                    style={{
                      width: "150px"
                    }}
                    size="small"
                    variant="outlined"
                    fullWidth
                    label="To"
                    value={selectedEndFilter}
                    onChange={handleEndFilterChange}
                  />
                </span>
                <button id="removeFilterButton" onClick={getAllEmployees}>
                  Remove filter
                </button>
                <button id="filterButton" onClick={filterInputChecker}>
                  Filter
                </button>
              </span>
              <span className="spanGrouper">
                <p id="sortText">Sort and order Employees on muliple columns</p>
                <span className="mutipleFieldSelector">
                  <MultipleFieldSelector allFields={allFields} selectedFields={selectedSortFields} setSelectedFields={setSelectedSortFields}/>
                </span>

                <span className="filterSelector">
                  <FieldSelector data={orderList} selectedField={selectedSortOrder} setSelectedField={setSelectedSortOrder} initialText={"Order by"}/>
                </span>
                <button id="removeSortButton" onClick={getAllEmployees}>
                  Remove sort
                </button>
                <button id="sortButton" onClick={sortEmployees}>
                  Sort
                </button>
              </span>
            </div>
            <div id="search">
              <TextField
                id="genericSearch"
                onChange={inputHandler}
                variant="outlined"
                fullWidth
                label="Search"
              />
            </div>
            <div className='bottomActionButtons'>
              <button className="getAllEmployees" onClick={getAllEmployees}>Reset Employees List</button>
            </div>
          </div>
          <List input={inputText} data={employeesArr}/>
        
          </>
          }

          {/*employees ? employees : 'There is no employee data available'*/}

        </div>
    </div>
  );
}
export default App;
