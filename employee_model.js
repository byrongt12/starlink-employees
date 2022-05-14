const Pool = require('pg').Pool
require("dotenv").config();

const devConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false,
  }
}

const proConfig = {
  connectionString: process.env.DATABASE_URL //heroku url
}

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);



const getEmployees = () => {
  return new Promise(function(resolve, reject) {

    pool.query('SELECT e.id, e.name, e.surname, e.birthdate, e.employee_number, e.marital_status, e.post_code, e.address_1, e.address_2, e.contact_no, c.country_name, s.total_salary, r.reporting_line, rl.role_name, de.dep_name, di.div_name, com.comp_name, o.org_name, q.qual_level FROM "Employees" e JOIN "EmpRole" r ON e.employee_number=r.employee_number JOIN "EmpSalary" s ON r.salary_id=s.salary_id JOIN "Countries" c ON e.country_id=c.country_id JOIN "EmpQualification" q ON r.qual_id=q.qual_id JOIN "Role" rl ON r.role_id=rl.role_id JOIN "Department" de ON r.dep_id=de.dep_id JOIN "Division" di ON de.div_id=di.div_id JOIN "Company" com ON di.comp_id=com.comp_id JOIN "Organization" o ON com.org_id=o.org_id;', (error, results) => {
      if (error) {
        console.log(error)
        reject(error)
      }
      if (!results){
        resolve()
      }
      else{
        resolve(results.rows)
      }
    })
  }) 
}

const getEmployeesSGR = () => {
  return new Promise(function(resolve, reject) {

    pool.query('SELECT rl.role_name, SUM(s.total_salary) FROM "Employees" e JOIN "EmpRole" r ON e.employee_number=r.employee_number JOIN "EmpSalary" s ON r.salary_id=s.salary_id JOIN "Role" rl ON r.role_id=rl.role_id GROUP BY rl.role_name ORDER BY SUM(s.total_salary) DESC;', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getEmployeesSGD = () => {
  return new Promise(function(resolve, reject) {

    pool.query('SELECT d.dep_name, SUM(s.total_salary) FROM "Department" d JOIN "EmpRole" r ON d.dep_id=r.dep_id JOIN "EmpSalary" s ON r.salary_id=s.salary_id GROUP BY d.dep_name ORDER BY SUM(s.total_salary) DESC;', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const filterEmployees = (body) => {
  return new Promise(function(resolve, reject) {
   
    var column = ''
    var value1 = body.selectedStartFilter
    var value2 = body.selectedEndFilter
    
    if (body.selectedFilterField == 'Birthdate'){
      column = 'birthdate'
      value1 = "'" + value1.toString() + "'"

      if (value2 == ''){
        value2 = 'NOW()'
      }
      else{
        value2 = "'" + value2.toString() + "'"
      }

    }
    else if (body.selectedFilterField == 'Salary'){
      column = 'total_salary'

      if (value2 == ''){
        value2 = '2147483647'
      }
      
    }
    else if (body.selectedFilterField == 'Employee Number'){
      column = 'e.employee_number'

      if (value2 == ''){
        value2 = '2147483647'
      }
    }

    const queryStr = 'SELECT e.id as id, e.name as name, e.surname as surname, e.birthdate as birthdate, e.employee_number as employee_number, e.marital_status as marital_status, e.post_code as post_code, e.address_1 as address_1, e.address_2 as address_2, e.contact_no as contact_no, c.country_name as country_name, s.total_salary as total_salary, r.reporting_line as reporting_line, rl.role_name as role_name, de.dep_name as dep_name, di.div_name as div_name, com.comp_name as comp_name, o.org_name as org_name, q.qual_level as qual_level FROM "Employees" e JOIN "EmpRole" r ON e.employee_number=r.employee_number JOIN "EmpSalary" s ON r.salary_id=s.salary_id JOIN "Countries" c ON e.country_id=c.country_id JOIN "EmpQualification" q ON r.qual_id=q.qual_id JOIN "Role" rl ON r.role_id=rl.role_id JOIN "Department" de ON r.dep_id=de.dep_id JOIN "Division" di ON de.div_id=di.div_id JOIN "Company" com ON di.comp_id=com.comp_id JOIN "Organization" o ON com.org_id=o.org_id WHERE ' + column + ' BETWEEN ' + value1 + ' AND ' + value2 + ';' 

    pool.query(queryStr, (error, results) => {
      if (error) {
        reject(error)
      }
      
      if (!results){
        resolve()
      }
      else{
        resolve(results.rows)
      }
      
    })
  })
}

const sortEmployees = (body) => {
  return new Promise(function(resolve, reject) {

    const items = body.selectedSortFields.join(",")
    
    if (items == ''){
      var queryStr = 'SELECT e.id, e.name, e.surname, e.birthdate, e.employee_number, e.marital_status, e.post_code, e.address_1, e.address_2, e.contact_no, c.country_name, s.total_salary, r.reporting_line, rl.role_name, de.dep_name, di.div_name, com.comp_name, o.org_name, q.qual_level FROM "Employees" e JOIN "EmpRole" r ON e.employee_number=r.employee_number JOIN "EmpSalary" s ON r.salary_id=s.salary_id JOIN "Countries" c ON e.country_id=c.country_id JOIN "EmpQualification" q ON r.qual_id=q.qual_id JOIN "Role" rl ON r.role_id=rl.role_id JOIN "Department" de ON r.dep_id=de.dep_id JOIN "Division" di ON de.div_id=di.div_id JOIN "Company" com ON di.comp_id=com.comp_id JOIN "Organization" o ON com.org_id=o.org_id;'
    }
    else{
      var orderVal = ''
      if (body.selectedSortOrder == 'Ascending'){
        orderVal = 'ASC'
      }
      else if (body.selectedSortOrder == 'Descending'){
        orderVal = 'DESC'
      }

      var queryStr = 'SELECT e.id as id, e.name as name, e.surname as surname, e.birthdate as birthdate, e.employee_number as employee_number, e.marital_status as marital_status, e.post_code as post_code, e.address_1 as address_1, e.address_2 as address_2, e.contact_no as contact_no, c.country_name as country_name, s.total_salary as total_salary, r.reporting_line as reporting_line, rl.role_name as role_name, de.dep_name as dep_name, di.div_name as div_name, com.comp_name as comp_name, o.org_name as org_name, q.qual_level as qual_level FROM "Employees" e JOIN "EmpRole" r ON e.employee_number=r.employee_number JOIN "EmpSalary" s ON r.salary_id=s.salary_id JOIN "Countries" c ON e.country_id=c.country_id JOIN "EmpQualification" q ON r.qual_id=q.qual_id JOIN "Role" rl ON r.role_id=rl.role_id JOIN "Department" de ON r.dep_id=de.dep_id JOIN "Division" di ON de.div_id=di.div_id JOIN "Company" com ON di.comp_id=com.comp_id JOIN "Organization" o ON com.org_id=o.org_id ORDER BY ' + items + ' ' + orderVal + ';'
    }
    

    pool.query(queryStr, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

const createEmployee = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, surname, birthdate, employee_number, salary, role_desc, reporting_line } = body
    pool.query('INSERT INTO Employees (name, surname, birthdate, employee_number, salary, role_desc, reporting_line) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [name, surname, birthdate, employee_number, salary, role_desc, reporting_line], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new employees has been added added: ${results.rows[0]}`)
    })
  })
}
const deleteEmployee = (body) => {
  return new Promise(function(resolve, reject) {
  
    const id = parseInt(body.id)

    let delQuery= "DELETE FROM Employees WHERE id = $1"

    pool.query(delQuery, [id], (error, results) => {
      if (error) {
        console.log(error)
        reject(error)
      }
      resolve(`employees deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getEmployees,
  getEmployeesSGR,
  getEmployeesSGD,
  filterEmployees,
  sortEmployees,
  createEmployee,
  deleteEmployee,
}