let counterDisplayElem = document.querySelector('.counter-display');
let counterPlusElem = document.querySelector('.next-turn');

let count = 0;

counterPlusElem.addEventListener("click",()=>{
    count++;
    updateDisplay();
});

function updateDisplay(){
    counterDisplayElem.innerHTML = count;
}
/*let btnNextTurn = document.querySelector('next-turn');
let input = document.querySelector('input');

btnNextTurn.addEventListener('click', () =>{
    input.value = parseInt(input.value) + 1;
});*/

/*var turnCounter = 0;

const totalTurnCounter = document.getElementById("turn-counter");
totalTurnCounter.innerHTML = turnCounter;
const incrementCount = document.getElementById("next-turn");

const handleIncrement = () => {
    turnCounter++;
    totalTurnCounter.innerHTML = count;
}


incrementCount.addEventListener("click", handleIncrement);*/