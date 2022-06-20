// Selectors
const firstNameElem = document.querySelector('.first-name');
const lastNameElem = document.querySelector('.last-name');
const emailElem = document.querySelector('.email');
const phoneElem = document.querySelector('.phone');
const cityElem = document.querySelector('.city');
const countryElem = document.querySelector('.country');
const contactContainer = document.querySelector('.contact-container');

const btnContactElem = document.querySelector('.btnContact');




// Events

btnContactElem.addEventListener('click', saveNewContact);





// Functions


// Get Contacts
getContacts();

function getContacts () {
    fetch('https://radupadurariuserver.herokuapp.com/agenda')
    .then( response => response.json())
    .then(renderContacts);
}


// Render Contacts
function renderContacts (data) {
    
    data.forEach(element => {
        console.log(element);
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
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(newContact)
    })
    .then(response => response.json())
    .then(renderContactHTML)

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