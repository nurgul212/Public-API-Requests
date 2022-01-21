//========================================
//  Treehouse FSJS Techdegree
//  Project 5 - Public API Requests 
// =========================================


// Search container------------------------------------------------------------
const searchContainer = document.querySelector('.search-container');
const search = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
    `;
searchContainer.insertAdjacentHTML('beforeend', search);
 
//  document.getElementById('search-input').focus();

// fetch data from API
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))



// Gallery ---------------------------------------------------------------
const gallery = document.getElementById('gallery');

// displayEmployees function
function displayEmployees(employeeData) {
    employees = employeeData;
    // console.log(employees.length);

    // store the employee HTML as we create it
    let employeeHTML = '';

    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
        let picture = employee.picture;
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let state = employee.location.state;  

     employeeHTML += `
        <div class="card">
            <div class="card-img-container" data-index="${index}">
                <img class="card-img" src="${picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="${name}" class="card-name cap">${name.first} ${name.last}</h3>
                <p class="card-email">${email}</p>
                <p class="card-text cap">${city}, ${state}</p>
            </div>
        </div>
    `});
    gallery.innerHTML= employeeHTML;
};

