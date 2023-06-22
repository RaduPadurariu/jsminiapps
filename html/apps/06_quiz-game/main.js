//https://dog.ceo/api/breeds/list/all
//https://dog.ceo/api/breeds/image/random


// Selectors
const imgContainerElem = document.querySelector(".imageDog-container");
const dogQuestionContainerElem = document.querySelector(".dogQuestions-container");
// Global variables

let allDogRace = ['Affenpinscher', 'African', 'Airedale', 'Akita', 'Appenzeller', 'Australian', 'Basenji', 'Beagle', 'Bluetick', 'Borzoi', 'Bouvier', 'Boxer', 'Brabancon', 'Briard', 'Buhund', 'Bulldog', 'Bullterrier', 'Cattledog', 'Chihuahua', 'Chow', 'Clumber', 'Cockapoo', 'Collie', 'Coonhound', 'Corgi', 'Cotondetulear', 'Dachshund', 'Dalmatian', 'Dane', 'Deerhound', 'Dhole', 'Dingo', 'Doberman', 'Elkhound', 'Entlebucher', 'Eskimo', 'Finnish', 'Frise', 'Germanshepherd', 'Greyhound', 'Groenendael', 'Havanese', 'Hound', 'Husky', 'Keeshond', 'Kelpie', 'Komondor', 'Kuvasz', 'Labradoodle', 'Labrador', 'Leonberg', 'Lhasa', 'Malamute', 'Malinois', 'Maltese', 'Mastiff', 'Mexicanhairless', 'Mix', 'Mountain', 'Newfoundland', 'Otterhound', 'Ovcharka', 'Papillon', 'Pekinese', 'Pembroke', 'Pinscher', 'Pitbull', 'Pointer', 'Pomeranian', 'Poodle', 'Pug', 'Puggle', 'Pyrenees', 'Redbone', 'Retriever', 'Ridgeback', 'Rottweiler', 'Saluki', 'Samoyed', 'Schipperke', 'Schnauzer', 'Segugio', 'Setter', 'Sharpei', 'Sheepdog', 'Shiba', 'Shihtzu', 'Spaniel', 'Spitz', 'Springer', 'Stbernard', 'Terrier', 'Tervuren', 'Vizsla', 'Waterdog', 'Weimaraner', 'Whippet', 'Wolfhound']


// Functions

const getRandomDog = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
    .then((res) => res.json())
    .then(createDogImg)
}   

function createDogImg (data) {
    console.log(data)
    const newDogImg = document.createElement('img');
    newDogImg.classList.add('dog-img')
    newDogImg.src = data.message
    imgContainerElem.appendChild(newDogImg)
    const nameOfBreed = newDogImg.src.split("/")[4]
    console.log(nameOfBreed)
    createQuestions(nameOfBreed)
}

function createQuestions (value) {
    const chosenDog = value[0].toUpperCase() + value.slice(1);
    dogQuestionContainerElem.innerText = ""
    let questions = []
    while (questions.length < 3) {
        let q = allDogRace[Math.floor(Math.random() * allDogRace.length)]
        if (!questions.includes(q)) {
            questions.push(q)
        }
    }
    questions.splice(Math.floor(Math.random() * 4), 0, chosenDog)
    console.log(questions)
    questions.forEach((el) => {
        const questionButton = document.createElement('button');
        questionButton.innerText = el;
        questionButton.classList.add('questionButton');
        dogQuestionContainerElem.appendChild(questionButton);
    })

    for(let key of dogQuestionContainerElem.children) {
        key.addEventListener('click', (e) => {
            const item = e.target;
            if(item.innerText === chosenDog) {
                item.style.background = "lightgreen"
            }
            else {
                item.style.background = "red"
            }
        })
    }
}



getRandomDog()













// Events

















