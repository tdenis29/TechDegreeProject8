let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const input = document.querySelector("input");
const cards = document.getElementsByClassName("card");
const next = document.getElementById('next');
const prev = document.getElementById("prev")
// FETCH FUNC 

// uses url variable to make a call
fetch(urlAPI)
// parse to json
.then(response => response.json())
// parse to data
.then(data => employees = data.results)
// Data to save to aaray
// pass control to display employes function to write html
.then(displayEmployees)
// error handler
.catch(err => console.log(err))

// Employee HTML
function displayEmployees(employeeData) {
    let employees = employeeData;
    let employeeHTML = "";
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        employeeHTML += `
            <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            </div>
            </div>
            `
})
gridContainer.innerHTML = employeeHTML;
};

// MODAL fucntionality

function displayModal(index) {
    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date)
    console.log(street)
    const modalHTML = `
        <img class="avatar" src="${picture.large}"/>
        <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <hr/>
        <p>${phone}</p>
        <p class="address"> ${street.number} ${street.name}, ${city}, ${state}, ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
        `;
    
    modalContainer.innerHTML = modalHTML;
    overlay.style.display = "block"
}


// Event Listeners 

gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    displayModal(index);
    }
    });

    // Modal close
    modalClose.addEventListener('click', () => {
        overlay.style.display = "none"
        });


// Search BAR
input.addEventListener("keydown", (e) => {
    let search = input.value.toLowerCase();
    for (i = 0; i < cards.length; i++){
    let name = cards[i].querySelector('h2').textContent.toLowerCase();
    if (name.includes(search)) {
        cards[i].style.display = '';
    } else {
        cards[i].style.display = 'none';
    }}});

    // Modal window controls
    
    let index = 1;
    showSlides(index);
    
    // Next controls
    function plusSlides(n) {
        if(index === 11){
         index = 0;
      showSlides(index += n);
    } else {
        showSlides(index += n)
    }
}
    // Previous 
    function minusSlides(n){
        if (index === 0){
            index = 11;
            showSlides(index -= 1)
        } else {
        showSlides(index -= 1)
    }}
    // Thumbnail image controls
    function currentSlide(n) {
      showSlides(index = n);
    }
    
    function showSlides(n) {
      displayModal(index)
    }
 
