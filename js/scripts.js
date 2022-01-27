//========================================
//  Treehouse FSJS Techdegree
//  Project 5 - Public API Requests 
// =========================================


// ------------------------------------------------------------------------
// Fetch Function that recevies urlAPI and fetch urlAPI, then check Status then convert 
// to json format
// ------------------------------------------------------------------------
// const urlAPI="https://randomuser.me/api/?results=12&nat=us";
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
function fetchData(urlAPI){
    // return a promise
    return fetch(urlAPI)
        .then(checkStatus)
        .then(response => response.json())
        .then(data => data.results.map(data => data))
        .catch(err =>console.log(err));
}
fetchData(urlAPI).then(displayEmployees);

// checkStatus Function=============================================================
function checkStatus(response){
  if(!response.ok){
      // reject promise if response is not ok
    return Promise.reject();
  }
  return response;
}

 // Search container===========================================================================
 const searchContainer = document.querySelector('.search-container');
 const searchHTML = `
     <form action="#" method="get">
         <input type="search" id="search-input" class="search-input" placeholder="Search...">
         <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
     </form>
     `;
 searchContainer.insertAdjacentHTML('beforeend', searchHTML);
 
 
 
 // searchFilter function===================================================================== 
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


// displayEmployees Function=========================================================
const gallery = document.querySelector('.gallery');

function displayEmployees(employeeData){
    // console.log(employeeData)

        // loop through each employee and create HTML markup
        employeeData.forEach((employee, index) =>{
            const card = document.createElement("div");
            card.className = "card";        
            gallery.append(card);

            let picture = employee.picture.large;
            let name = employee.name;
            let email = employee.email;
            let city = employee.location.city;
            let state = employee.location.state;

           
            // template literals make this so much cleaner!
          let employeeHTML = `
                <div class="card-img-container">
                    <img class="card-img" src="${picture}" alt="">
                </div>

                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
                    <p class="card-email">${email}</p>
                    <p class="card-city cap">${city}, ${state}</p>
                </div>`;

            card.innerHTML= employeeHTML;
            card.addEventListener("click", () => {
            displayModal(employeeData, index);
            // console.log(employeeData, index);
        });    
    });
}


// displayModal=======================================================================
function displayModal(employeeData, index){
  const employee = employeeData[index];
//   console.log(employeeData.length, index)
  let picture = employee.picture;
  let name = employee.name;
  let email = employee.email;
  let city = employee.location.city;
  let state = employee.location.state;
  let phone = employee.phone;
  let street = employee.location.street;
  let postcode = employee.location.postcode;

    let date = new Date(employee.dob.date);

    // create modal-container div and set the calss name as 'modal-container'
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    // append it to gallery
    gallery.append(modalContainer);

   
   let modalHTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${city}</p>

                <hr>

                <p class="modal-text">${phone}</p>
                <p class="modal-text">${street.number} ${street.name}, ${city}, ${state}, ${postcode}</p>
                <p class="modal-text">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>

            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>

    `;
    modalContainer.innerHTML = modalHTML;

   // modalClose click event : add the hidden class to the modalContainer 
    const modalCloseBtn = document.querySelector(".modal-close-btn");
    modalCloseBtn.addEventListener('click', () => {
        modalContainer.remove();
    });


    const modalNext = document.getElementById("modal-next");
    const modalPrev = document.getElementById("modal-prev");
 // the following eventListener is to switch back and forth between employees when the detail modal window is open


    modalNext.addEventListener("click", (e) => {
        // console.log(employeeData.length)
        if (index >= 0 && index < employeeData.length-1) {
            modalContainer.remove();
            displayModal(employeeData,index+1);
        } else if (index === employeeData.length-1) {
            modalContainer.remove();
            index = 0;
            displayModal(employeeData,index);
        }
    });

    modalPrev.addEventListener("click", (e) => {
        if (index > 0 && index <= employeeData.length-1) {
            modalContainer.remove();
            displayModal(employeeData,index-1);
        } else if (index === 0) {
            modalContainer.remove();
            index = employeeData.length-1;
            displayModal(employeeData,index);
        }
    });

}


  










