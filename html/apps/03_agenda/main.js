// Selectors

const firstNameElem = document.querySelector('.first-name');
const lastNameElem = document.querySelector('.last-name');
const emailElem = document.querySelector('.email');
const phoneElem = document.querySelector('.phone');
const cityElem = document.querySelector('.city');
const countryElem = document.querySelector('.country');
const contactContainer = document.querySelector('.contact-container');
const updateContactElem = document.querySelector('.updateContact');
const saveContactElem = document.querySelector('.saveContact');





// Events

saveContactElem.addEventListener('click', saveNewContact);



// Functions




// Get Contacts
getContacts();

function getContacts () {
   
    displayLoader();
    fetch('https://radupadurariuserver.herokuapp.com/agenda')
    .then( response => response.json())
    .then(renderContacts);
}


// Render Contacts
function renderContacts (data) {
    contactContainer.innerText = "";
    data.forEach(element => {
        renderContactHTML (element);    
            }); 
    };


// Render contact HTML
function renderContactHTML (element) {
let contactElem = document.createElement('p');
        contactContainer.appendChild(contactElem);
        contactElem.classList.add ('new-contact');

            // container for name and phone
            let userDataElem = document.createElement('div');
            userDataElem.classList.add('newContact-subContainer');
            contactElem.appendChild(userDataElem);
           

                // container for icon and name
                let userDataNameElem = document.createElement('div');
                userDataNameElem.classList.add('data-container');
                userDataElem.appendChild(userDataNameElem);
                

                    // container for icon-name
                    let userDataIconNameElem = document.createElement('img');
                    userDataIconNameElem.src = "./imgs/profile.png";
                    userDataNameElem.appendChild(userDataIconNameElem);
                    userDataIconNameElem.classList.add('contact-icons');

                    // container for name
                    let userDataNameTextElem = document.createElement('span');
                    userDataNameElem.appendChild(userDataNameTextElem);
                    userDataNameTextElem.innerText = element.first_name + " " + element.last_name;


                // container for icon and phone
                let userDataPhoneElem = document.createElement('div');
                userDataPhoneElem.classList.add('data-container');
                userDataElem.appendChild(userDataPhoneElem);

                    // container for icon-phone
                    let userDataIconPhoneElem = document.createElement('img');
                    userDataIconPhoneElem.src = "./imgs/phone.png";
                    userDataPhoneElem.appendChild(userDataIconPhoneElem);
                    userDataIconPhoneElem.classList.add('contact-icons');

                    // container for phone number
                    let userDataPhoneNumberElem = document.createElement('span');
                    userDataPhoneElem.appendChild(userDataPhoneNumberElem);
                    userDataPhoneNumberElem.innerText = element.phone;

            // container for email and address
            let userContactElem = document.createElement('div');
            userContactElem.classList.add('newContact-subContainer');
            contactElem.appendChild(userContactElem);
        

                // container for email
                let userEmailElem = document.createElement('div');
                userContactElem.appendChild(userEmailElem);

                    // container for icon and email
                    let userContactEmailElem = document.createElement('div');
                    userContactEmailElem.classList.add('data-container');
                    userContactElem.appendChild(userContactEmailElem);

                        // container for icon-email
                        let userContactIconEmailElem = document.createElement('img');
                        userContactIconEmailElem.src = "./imgs/email.png";
                        userContactEmailElem.appendChild(userContactIconEmailElem);
                        userContactIconEmailElem.classList.add('contact-icons');

                        // container for email address
                        let userContactEmailAddressElem = document.createElement('span');
                        userContactEmailElem.appendChild(userContactEmailAddressElem);
                        userContactEmailAddressElem.innerText = element.email;

                // container for address
                let userAddressElem = document.createElement('div');
                userContactElem.appendChild (userAddressElem);

                    // container for icon and address
                    let userContactAddressElem = document.createElement('div');
                    userContactAddressElem.classList.add('data-container');
                    userContactElem.appendChild(userContactAddressElem);

                        // container for icon-address
                        let userContactIconAddressElem = document.createElement('img');
                        userContactIconAddressElem.src = "./imgs/address.png";
                        userContactAddressElem.appendChild(userContactIconAddressElem);
                        userContactIconAddressElem.classList.add('contact-icons');

                        // container for address
                        let userContactAddressTextElem = document.createElement('span');
                        userContactAddressElem.appendChild(userContactAddressTextElem);
                        userContactAddressTextElem.innerText = element.city + ", " + element.country;


            const btnContainer = document.createElement('div');
            btnContainer.classList.add('btn-container')
            contactElem.appendChild(btnContainer);
            
            // edit button
            const editBtn = document.createElement('button');
            const editBtn_img = document.createElement('img');
            editBtn_img.src = "./imgs/edit.png";
            editBtn_img.classList.add('imgBtn');
            editBtn.appendChild(editBtn_img);
            editBtn.classList.add('edit-btn');
            btnContainer.appendChild(editBtn);

            editBtn.addEventListener('click', function () {
                saveContactElem.style.display = "none";
                updateContactElem.style.display = "flex";

                completeFields (element);
                updateContactElem.addEventListener('click', function () {
                    event.preventDefault();
                    updateContacts(element);
                })
            })
        
            // delete button
            const deleteBtn = document.createElement('button');
            const deleteBtn_img = document.createElement('img');
            deleteBtn_img.src = "./imgs/delete.png";
            deleteBtn_img.classList.add('imgBtn');
            deleteBtn.appendChild(deleteBtn_img);
            deleteBtn.classList.add('delete-btn');
            btnContainer.appendChild(deleteBtn);

            deleteBtn.addEventListener('click', function () {
                deleteContact(element.id);
            })
        
}


// Post contacts

function saveNewContact (event) {
    event.preventDefault();

    const newContact = {
        first_name: firstNameElem.value,
        last_name: lastNameElem.value,
        phone: phoneElem.value,
        email: emailElem.value,
        city: cityElem.value,
        country: countryElem.value
    }

    fetch('https://radupadurariuserver.herokuapp.com/agenda', {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "CORS" :"access-control-allow-origin",
            "access-control-allow-origin" : "*"
        },
        method: "POST",
        body: JSON.stringify(newContact)
    })
    .then(response => response.json())
    .then(renderContactHTML)
    .then(getContacts);

    clearFields();
}

function clearFields () {
    firstNameElem.value = '';
    lastNameElem.value = '';
    phoneElem.value = '';
    emailElem.value = '';
    cityElem.value = '';
    countryElem.value = '';
}

// Edit and Delete

function deleteContact (id) {
    fetch('https://radupadurariuserver.herokuapp.com/agenda/' + id, {
        method: "DELETE"
    })
    .then(getContacts);
}

function updateContacts (userData) {
    
    updateContactElem.style.display = "none";
    saveContactElem.style.display = "flex";

    userData.first_name = firstNameElem.value;
    userData.last_name = lastNameElem.value;
    userData.phone = phoneElem.value;
    userData.email = emailElem.value;
    userData.city = cityElem.value;
    userData.country = countryElem.value;
    
    fetch('https://radupadurariuserver.herokuapp.com/agenda/' + userData.id, {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "access-control-allow-origin" : "*"
  },
  method: "PUT",
  body: JSON.stringify(userData)
  })
  .then(response => response.json())
  .then(getContacts)
  clearFields ();
}


function displayLoader () {
    const loadingElem = document.createElement('img');
    contactContainer.innerText = "";
    loadingElem.src="./imgs/spinner.gif";
    loadingElem.classList.add('loading-spinner');  
    contactContainer.appendChild(loadingElem);   
}


// complete fields when updating
function completeFields (userData) {
    firstNameElem.value = userData.first_name;
    lastNameElem.value = userData.last_name;
    phoneElem.value = userData.phone;
    emailElem.value = userData.email;
    cityElem.value = userData.city;
    countryElem.value = userData.country;
  }