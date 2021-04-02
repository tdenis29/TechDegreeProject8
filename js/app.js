let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");


// FETCH FUNC 

// uses url variable to make a call
fetch(urlAPI)
// parse to json
.then(response => response.json())
// parse to data
.then(data => data.results)
// pass control to display employes function to write html
.then(displayEmployees)
// error handler
.catch(err => console.log(err))

// Employee HTML
