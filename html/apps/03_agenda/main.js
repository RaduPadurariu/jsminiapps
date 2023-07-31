// Selectors
const contactContainer = document.querySelector('.contact-container');
const updateContactElem = document.querySelector('.updateContact');
const saveContactElem = document.querySelector('.newContact-container');
const saveContactElem2 = document.getElementById('newContact-container');

// Events
saveContactElem.addEventListener('submit', saveNewContact);




// Functions

// Get Contacts

// setInterval(getContacts, 200);
function getContacts () {
    displayLoader();
    fetch('https://origin-cors-anywhere-radu.herokuapp.com/https://radupadurariuserver.herokuapp.com/agenda')
    .then(processResponse)
    .then(renderContacts);
}

function processResponse(response) {
    return response.json();
}

// Render Contacts
function renderContacts (data) {
    contactContainer.innerText = ""; 
    for (const user of data) {
        renderContactHTML(user);
    }
    };

getContacts();


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
            editBtn.title = "Edit contact"
            editBtn_img.src = "./imgs/edit.png";
            editBtn_img.classList.add('imgBtn');
            editBtn.appendChild(editBtn_img);
            editBtn.classList.add('edit-btn');
            btnContainer.appendChild(editBtn);

            editBtn.addEventListener('click', function () {
                document.getElementById('saveContact').style.display = "none";
                updateContactElem.style.display = "flex";

                completeFields (element);
                editBtn.disabled = true;
                // Create update button
                updateContactElem.innerText = "";
                const updateBtn = document.createElement('button');
                updateBtn.title = "Update contact"
                updateBtn.classList.add('updateContactBtn')
                const updateBtnImg = document.createElement('img');
                updateBtnImg.style.width = "40px";
                updateBtnImg.src = "./imgs/update.png";
                updateBtn.appendChild(updateBtnImg);
                updateContactElem.appendChild(updateBtn);
               
                // Update contacts
                updateBtn.addEventListener('click', function () {
                    updateContacts(element, updateBtn);
                    editBtn.disabled = false;
                })
            })
        
            // delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.title = "Delete contact"
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
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        city: document.getElementById('city').value,
        country: document.getElementById('country').value
    }

    fetch('https://origin-cors-anywhere-radu.herokuapp.com/https://radupadurariuserver.herokuapp.com/agenda', {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newContact)
    })
    .then(response => response.json())
    .then(getContacts)

    clearFields();
}

function clearFields () {
    document.getElementById('first_name').value = '';
    document.getElementById('last_name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('city').value = '';
    document.getElementById('country').value = '';
}

// Edit and Delete

function deleteContact (id) {
    fetch('https://origin-cors-anywhere-radu.herokuapp.com/https://radupadurariuserver.herokuapp.com/agenda/' + id, {
        method: "DELETE"
    })
    .then(getContacts)
}

function updateContacts (userData, buttonUpdate) {
    buttonUpdate.remove();
    document.getElementById('saveContact').style.display = "flex";
    // document.getElementById('updateContact').style.display = "none";
    

    userData.first_name = document.getElementById('first_name').value;
    userData.last_name = document.getElementById('last_name').value;
    userData.phone = document.getElementById('phone').value;
    userData.email = document.getElementById('email').value;
    userData.city = document.getElementById('city').value;
    userData.country = document.getElementById('country').value;

    fetch('https://origin-cors-anywhere-radu.herokuapp.com/https://radupadurariuserver.herokuapp.com/agenda/' + userData.id, {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  method: "PUT",
  body: JSON.stringify(userData)
  })
  .then(processResponse)
  .then(getContacts)
  clearFields ();
}


// loader
function displayLoader () {
    const loadingElem = document.createElement('img');
    contactContainer.innerText = "";
    loadingElem.src="./imgs/spinner.gif";
    loadingElem.classList.add('loading-spinner');  
    contactContainer.appendChild(loadingElem);   
}


// complete fields when updating
function completeFields (userData) {
    document.getElementById('first_name').value = userData.first_name;
    document.getElementById('last_name').value = userData.last_name;
    document.getElementById('phone').value = userData.phone;
    document.getElementById('email').value = userData.email;
    document.getElementById('city').value = userData.city;
    document.getElementById('country').value = userData.country;
}