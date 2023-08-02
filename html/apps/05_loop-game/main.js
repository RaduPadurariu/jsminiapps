// Selectors
const gameSceneElem = document.getElementById('game-container');
const livesContainerElem = document.getElementById('lives-container');
const replayBtnElem = document.querySelector('.replay-btn');



// Global variables and classes
// Cars
class CarObject {
    constructor () {
        this.width = 100;
        this.height = 50;

        this.x = 0;
        this.y = 0;
        this.generateRef();
    }

    generateRef() {
        this.ref = document.createElement('img');
        this.ref.style.width = this.width + "px";
        this.ref.style.position = "absolute";
        gameSceneElem.appendChild(this.ref);
        this.ref.style.top = 0;
        this.ref.style.left = 0;
    }

    move (x, y) {
        this.x = x;
        this.y = y;
        this.ref.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    removeRef() {
      this.ref.remove();
    }
}

// Player 
class Player extends CarObject {
    constructor () {
        super();
        this.ref.src = "./imgs/sport-car.png";
        this.move (50, 250)
    }

    moveUp() {
        if (this.y >= 60) this.move (this.x, this.y - 15);
    }

    moveDown () {
        if (this.y <= 300) this.move (this.x, this.y + 15);
    }

}

// Road cars
class RoadCar extends CarObject {
    constructor(type) {
      super();
      this.ref.src = `./imgs/${type}/${Math.floor(Math.random() * 12)}.png`;
      this.move(0, 0);
    }
  
    moveLeft(speed) {
      this.move(this.x - speed, this.y);
    }
}

// Cars factory
class CarsFactory {
    constructor() {
      this.cars = [];
    }
  
    createCar(x, y, type) {
      const car = new RoadCar(type);
      car.move(x, y);
      // add a flag for collide detection
      car.collideFlag = 'no'; 
      this.cars.push(car);
    }
  
    destroyCars() {
      this.cars = this.cars.filter((car) => {
        if (car.x < -100) {
          car.removeRef();
          return false;
        }
  
        return true;
      });
    }
  
    moveCars(speed) {
      for (const car of this.cars) {
        car.moveLeft(speed);
      }
    }
}


// Lives Factory

class Lives {
  constructor () {
      this.width = 30;
      this.height = 30;
      this.id = -1;
      this.renderLives();
  }

  renderLives() {
      this.lives = document.createElement('img');
      this.lives.src = "./imgs/heart.png";
      this.lives.style.width = `${this.width}px`;
      this.lives.style.height = `${this.height}px`;
      this.lives.classList.add('lives');
      livesContainerElem.appendChild(this.lives);    
  }

  removeLives() {
      this.lives.remove();
    }

}


class LivesFactory {
  constructor() {
    this.livesArr = [];
  }

  createLives() {
      const live = new Lives();
      live.id = livesId;
      this.livesArr.push(live);  
  }

  destroyLive() {
    // using filter to an array we always update the remaining lives.
    this.livesArr = this.livesArr.filter((live) => {

        if (live.id == this.livesArr.length-1){
          live.removeLives();
          return false;
        }
      return true;
    });

  }

}


// Create Objects from classes

const player = new Player();
const contraCarsFactory = new CarsFactory();
const carsFactory = new CarsFactory();
const livesCount = new LivesFactory();

//Global variables
let keyUpPress = false;
let keyDownPress = false;
let count = 0;
let livesId = 0;


// create three lives.
for (let index = 0; index < 3; index++) {
  livesCount.createLives();
  livesId++;  
}

// Events

document.addEventListener('keydown', (event) => {
    if(event.key === "ArrowUp") {
        keyUpPress = true;
    }

    if(event.key === "ArrowDown") {
        keyDownPress = true;
    }
})

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp") {
      keyUpPress = false;
    }
  
    if (event.key === "ArrowDown") {
      keyDownPress = false;
    }
  });


// Functions

let gameLoop = setInterval(() => {
    if (keyUpPress) player.moveUp();
    if (keyDownPress) player.moveDown();
    
    if (count % 30 === 0) contraCarsFactory.createCar(800, 50 + Math.floor(Math.random() * 100), 'contraCars');
    if (count % 30 === 0) carsFactory.createCar(800, 220 + Math.floor(Math.random() * 70), 'cars');
    
    contraCarsFactory.moveCars(40);
    carsFactory.moveCars(10);
    
    // if the player collide with any of the obstacles we need to close the game loops, alert the user and refresh the game
    if (collisionDetection(player, contraCarsFactory.cars)) {
      destroyLives(player.y);
    }
    if (collisionDetection(player, carsFactory.cars)) {
      destroyLives(player.y);
    }

  // we check every game loop if we need to destroy objects outside of the game scene
    contraCarsFactory.destroyCars();
    carsFactory.destroyCars();
    count++;

}, 60)


// -- Collision Detection
function collisionDetection(player, cars) {
  for (const car of cars) {
    
    if (car.collideFlag == 'no') {
    if (
      (player.x < car.x + car.width &&
        player.x + player.width > car.x &&
        player.y < car.y + car.height &&
        player.height + player.y > car.y)
    ) {
      car.collideFlag = 'yes';
      return true;
    }
  }
     
  }

  return false;
}


function destroyLives (player) {
  livesCount.destroyLive();

  const smoke = document.createElement('img');
      smoke.src = "./imgs/explosion.png";
      smoke.classList.add ('smoke');
      smoke.style.top = player + "px";
      smoke.style.left = 110 + "px";
      gameSceneElem.appendChild(smoke);
      setTimeout (function () {
        smoke.remove();
      }, 1000);

  if (livesCount.livesArr.length == 0) {
    clearInterval(gameLoop);

    livesContainerElem.innerText = "YOU LOST !"
    playAgainBtn();
  }
}


// Play again button
function playAgainBtn () {
  const btnPlayAgainElem = document.createElement('button');
  btnPlayAgainElem.addEventListener ('click', function () {
    window.location.reload();
  });
  btnPlayAgainElem.classList.add ('replay-btn');
  replayBtnElem.appendChild(btnPlayAgainElem);
  btnPlayAgainElem.innerText = "Play Again";
}