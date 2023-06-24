//https://dog.ceo/api/breeds/list/all
//https://dog.ceo/api/breeds/image/random


// Selectors
const imgContainerElem = document.querySelector(".imageDog-container");
const dogQuestionContainerElem = document.querySelector(".dogQuestions-container");
const dogScoreElem = document.getElementById('dogScore');
const dogRecordElem = document.getElementById('dogRecord');
const dogLivesContainerElem = document.querySelector('.dogLivesContainer');
const dogButtonsContainerElem = document.querySelector('.dogButtonContainer');
const dogSkipButtonElem = document.getElementById('dogSkipBtn');
const dogNextButtonElem = document.getElementById('dogNextBtn');
const numberOfSkipsElem = document.getElementById('nrOfSkips');

// Global variables

let allDogRaces = ['Affenpinscher', 'African', 'Airedale', 'Akita', 'Appenzeller', 'Australian', 'Basenji', 'Beagle', 'Bluetick', 'Borzoi', 'Bouvier', 'Boxer', 'Brabancon', 'Briard', 'Buhund', 'Bulldog', 'Bullterrier', 'Cattledog', 'Chihuahua', 'Chow', 'Clumber', 'Cockapoo', 'Collie', 'Coonhound', 'Corgi', 'Cotondetulear', 'Dachshund', 'Dalmatian', 'Dane', 'Deerhound', 'Dhole', 'Dingo', 'Doberman', 'Elkhound', 'Entlebucher', 'Eskimo', 'Finnish', 'Frise', 'Germanshepherd', 'Greyhound', 'Groenendael', 'Havanese', 'Hound', 'Husky', 'Keeshond', 'Kelpie', 'Komondor', 'Kuvasz', 'Labradoodle', 'Labrador', 'Leonberg', 'Lhasa', 'Malamute', 'Malinois', 'Maltese', 'Mastiff', 'Mexicanhairless', 'Mix', 'Mountain', 'Newfoundland', 'Otterhound', 'Ovcharka', 'Papillon', 'Pekinese', 'Pembroke', 'Pinscher', 'Pitbull', 'Pointer', 'Pomeranian', 'Poodle', 'Pug', 'Puggle', 'Pyrenees', 'Redbone', 'Retriever', 'Ridgeback', 'Rottweiler', 'Saluki', 'Samoyed', 'Schipperke', 'Schnauzer', 'Segugio', 'Setter', 'Sharpei', 'Sheepdog', 'Shiba', 'Shihtzu', 'Spaniel', 'Spitz', 'Springer', 'Stbernard', 'Terrier', 'Tervuren', 'Vizsla', 'Waterdog', 'Weimaraner', 'Whippet', 'Wolfhound']
let dogScore = 0;
let dogRecord = 0;
let gameStatus = true;
dogScoreElem.innerText = dogScore;
dogRecordElem.innerText = dogRecord;
// Functions
// Local Storage for Record answers
const getDogRecord = () => {
    
     // is there a dogRecord in local storage?
    let localDogRecord;
    if(localStorage.getItem('dogRecord') === null) {
        localDogRecord = 0;
    }
    else {
        localDogRecord = JSON.parse(localStorage.getItem("dogRecord"));
    }
    dogRecord = Number(localDogRecord);
    dogRecordElem.innerText = dogRecord.toString();
}

const saveDogRecord = (value) => {
    // is there a dogRecord in local storage?
    let localDogRecord;
    if(localStorage.getItem('dogRecord') === null) {
        localDogRecord = 0;
    }
    else {
        localDogRecord = JSON.parse(localStorage.getItem("dogRecord"));
    }
    
    localDogRecord = value.toString();
    localStorage.setItem("dogRecord", JSON.stringify(localDogRecord));
    
}
getDogRecord()

// Render Lives
for (let i = 0; i < 3; i++) {
    const dogLiveImg = document.createElement('img');
    dogLiveImg.style.marginRight = "0.3rem"
    dogLiveImg.src = "./imgs/heart.png";
    dogLiveImg.classList.add('heart-img')
    dogLivesContainerElem.appendChild(dogLiveImg)
}

// Render Game
const getRandomDog = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
    .then((res) => res.json())
    .then(createDogImg)
}   

function createDogImg (data) {
    imgContainerElem.innerText = "";
    const newDogImg = document.createElement('img');
    newDogImg.classList.add('dog-img');
    newDogImg.src = data.message;
    imgContainerElem.appendChild(newDogImg);
    const nameOfBreed = newDogImg.src.split("/")[4];
    createQuestions(nameOfBreed);
}

function createQuestions (value) {
    const chosenDog = value[0].toUpperCase() + value.slice(1);
    dogQuestionContainerElem.innerText = ""
    let questions = []
    while (questions.length < 3) {
        let q = allDogRaces[Math.floor(Math.random() * allDogRaces.length)]
        if (!questions.includes(q) && (q !== chosenDog)) {
            questions.push(q)
        }
    }
    questions.splice(Math.floor(Math.random() * 4), 0, chosenDog)
    questions.forEach((el) => {
        const questionButton = document.createElement('button');
        questionButton.innerText = el;
        questionButton.classList.add('questionButton');
        dogQuestionContainerElem.appendChild(questionButton);
    })

    for(let key of dogQuestionContainerElem.children) {
        
        key.addEventListener('click', (e) => {
            const item = e.target;
            dogSkipButtonElem.style.display = "none";
            dogNextButtonElem.style.display = "block";
            
            if ( gameStatus === true) {
                if(item.innerText === chosenDog) {
                    item.style.background = "lightgreen";
                    item.style.outline = "5px solid green"
                    dogScore = dogScore + 10;
                    if (dogScore > dogRecord) {dogRecord = dogScore;}
                    dogScoreElem.innerText = dogScore;
                    dogRecordElem.innerText = dogRecord;
                    gameStatus = false;
                }
                else {
                    item.style.background = "pink";
                    item.style.outline = "5px solid red";
                    for(let key of dogQuestionContainerElem.children) {
                        if(key.innerText === chosenDog) {
                            key.style.background = "lightgreen";
                        }
                    }
                    dogLivesContainerElem.lastChild.remove()
                    if (dogLivesContainerElem.children.length === 0) {
                        dogButtonsContainerElem.innerText = "";
                        playAgainBtn()
                        dogLivesContainerElem.innerText = "You Lost!"
                        if(dogScore > Number(JSON.parse(localStorage.getItem("dogRecord")))) {
                                saveDogRecord(dogRecord)
                        }
                    }    
                    gameStatus = false;           
                }
            }
        
        })
    }
}



getRandomDog()


const dogSkip = () => {
    let nrOfSkips = numberOfSkipsElem.innerText;
    if (+nrOfSkips > 0) {
        +nrOfSkips--
        numberOfSkipsElem.innerText = nrOfSkips;
        getRandomDog()
    }
    
    
}

const dogNext = () => {
    dogNextButtonElem.style.display = "none";
    dogSkipButtonElem.style.display = "block";
    gameStatus = true;
    getRandomDog()
}

const playAgainBtn = () => {
    dogButtonsContainerElem.innerText = "";
    const btnPlayAgainElem = document.createElement('button');
    btnPlayAgainElem.addEventListener ('click', function () {
      window.location.reload();
    });
    btnPlayAgainElem.classList.add('replay-btn');
    dogButtonsContainerElem.appendChild(btnPlayAgainElem);
    btnPlayAgainElem.innerText = "Play Again";
  }





// Events

dogSkipButtonElem.addEventListener('click', dogSkip)
dogNextButtonElem.addEventListener("click", dogNext)














