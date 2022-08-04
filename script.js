//turn counter
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


//delete a card
var on = 0;
function Buttontoggle()
{
  if(on === 0){
      on = 1;
  }
  else{
      on = 0;
  }
}
function Deletecard(cardID)
{
    if(on == 1) {
        document.getElementById(cardID).style.visibility = "hidden";//make display = "none" when needed for the cards to move
        counterDisplayElem.innerHTML = cardID;
        on = 0;
    }
}
