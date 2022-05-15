const express = require('express')
const app = express()
const port = 3001
const employee_model = require('./employee_model')
const path = require("path")
const cors = require("cors");
const PORT = process.env.PORT || 3001;


//middleware
app.use(cors())
app.use(express.json())

//app.use(express.static(path.join(__dirname, "client/build")))
if (process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "client/build")))
}

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});


app.get('/employees', (req, res) => {
    employee_model.getEmployees()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/employees/sgr', (req, res) => {
  employee_model.getEmployeesSGR()
.then(response => {
  res.status(200).send(response);
})
.catch(error => {
  res.status(500).send(error);
})
})

app.get('/employees/sgd', (req, res) => {
  employee_model.getEmployeesSGD()
.then(response => {
  res.status(200).send(response);
})
.catch(error => {
  res.status(500).send(error);
})
})

app.post('/employees/filter', (req, res) => {
  employee_model.filterEmployees(req.body)
.then(response => {
  res.status(200).send(response);
})
.catch(error => {
  res.status(500).send(error);
})
})

app.post('/employees/sort', (req, res) => {
  employee_model.sortEmployees(req.body)
.then(response => {
  res.status(200).send(response);
})
.catch(error => {
  res.status(500).send(error);
})
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"))

})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})