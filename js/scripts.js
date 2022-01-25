//========================================
//  Treehouse FSJS Techdegree
//  Project 5 - Public API Requests 
// =========================================


// ------------------------------------------------------------------------
// Fetch Function
// ------------------------------------------------------------------------
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    // .then(searchFilter)
    .catch(err => console.log(err))


// Search container------------------------------------------------------------
const searchContainer = document.querySelector('.search-container');
const searchHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
    `;
searchContainer.insertAdjacentHTML('beforeend', searchHTML);
 
//  document.getElementById('search-input').focus();

// const errorMessage = document.querySelector('.errorMessage');


 //  searchFilter Function for Employees can be filtered by name
 
 function searchFilter(e) {
    let searchName = e.target.value.toLowerCase();   
    let employeeNames = document.querySelectorAll(".card-name");
    // console.log(employeeNames.length)

    employeeNames.forEach(employeeName => {
         let name =employeeName.textContent.toLowerCase();
         let nameOfEmployee = employeeName.parentElement.parentElement;
        
      if(name.includes(searchName)){
        nameOfEmployee.style.display = "";
       
      } else {
        
        nameOfEmployee.style.display = "none";
      }
      
    });
}

const search = document.getElementById("search-input");
search.addEventListener('input', searchFilter);


// ------------------------------------------------------------------------
//   displayEmployees function
// ------------------------------------------------------------------------
// Gallery 
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

// displayModel function
const modalContainer = document.querySelector(".modal-container");
const modalInfoContainer = document.querySelector(".modal-info-container");
const modalClose = document.querySelector(".modal-close");



// function displayModal(index){

//     // console.log(index);
//     const modalHTML = `
//     <div class="modal-container">
//         <div class="modal">
//             <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//             <div class="modal-info-container">
//                 <img class="modal-img" src="${picture.large}" alt="profile picture">
//                 <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
//                 <p class="modal-text">${email}</p>
//                 <p class="modal-text cap">${city}</p>
//                 <hr>
//                 <p class="modal-text">${phone}</p>
//                 <p class="modal-text">${street.number} ${street.name}, ${state} ${postcode}</p>
//                 <p class="modal-text">Birthday:
//                 ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
//             </div>
//         </div>

//         <div class="modal-btn-container">
//             <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
//             <button type="button" id="modal-next" class="modal-next btn">Next</button>
//         </div>
//   </div>
//     `;
//     modalContainer.classList.remove("hidden");
//     modalInfoContainer.innerHTML = modalHTML;
//     indexOfModal = index;
// }

