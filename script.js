//turn counter
let counterDisplayElem = document.querySelector('.counter-display');
let counterPlusElem = document.getElementById('next-turn');

let count = 0;

var amtcards = 10;

counterPlusElem.addEventListener("click",()=>{
    count++;
    updateDisplay();
});

function updateDisplay(){
    counterDisplayElem.innerHTML = "Turn: " + count;
}


function Discardcard(cardID, cardlabel)
{
    document.getElementById(cardID).style.visibility = "hidden";//make display = "none" when needed for the cards to move
    document.getElementById(cardlabel).style.visibility = "hidden";
}

//seperate all cards into a div class of toggle cards that interact with clicking the cards (this may also need to be split into markers and deleting/adding)
//the second group are cards that do not interact with clicking the cards

//main function for cards
function ButtonSelected(buttonID)
{
    //remove all other active button classes - set them to inactive
    var buttons = document.getElementsByClassName("button active");

    //var querybuttons = document.querySelectorAll(".button active");
    for(var i = 0; i < buttons.length; i++){
      if(buttons[i].classList.contains("active")){
        buttons[i].classList.add("inactive");
        buttons[i].classList.remove("active");
      }
    }
    
    var pressedbutton = document.getElementById(buttonID);


    //if statement for non-toggle buttons - if they are non-toggle class, go into a switch case to do the correct thing-
    if(pressedbutton.classList.contains("inactive")){
      pressedbutton.classList.remove("inactive");
      pressedbutton.classList.add("active");
      return;
    }

    switch(buttonID) {

      case "next-turn":
      case "draw":
      case "create":
      case "manifest":
      case "nab":
      case "fleeting":
      case "predicted-draw":
      case "restart":
      default: throw "Issue with button selection occured";
    }
    amtcards = amtcards-1;
}

function cardSelected(selectedcard, cardlabel)
{
    //check which button is currently active
    //use a switch case to choose the correct action based on which button is currently active
    var activeButton = document.getElementsByClassName("button active");
    switch(activeButton[0].id) {
      case "discard-play":
        Discardcard(selectedcard, cardlabel);
        activeButton[0].classList.add("inactive");
        activeButton[0].classList.remove("active");
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "unit":
      case "spell":
      case "champion":
      case "landmark":
      case "token":
      case "shown":
      case "move-to-end":
      default: return;
    }
}