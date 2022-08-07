//turn counter
let counterDisplayElem = document.querySelector('.counter-display');
let counterPlusElem = document.getElementById('next-turn');

let count = 0;

counterPlusElem.addEventListener("click",()=>{
    count++;
    updateDisplay();
});

function updateDisplay(){
    counterDisplayElem.innerHTML = count;
}


function Discardcard(cardID)
{
  counterDisplayElem.innerHTML = "i'm in the function discardcard"
    document.getElementById(cardID).style.visibility = "hidden";//make display = "none" when needed for the cards to move
}

//seperate all cards into a div class of toggle cards that interact with clicking the cards (this may also need to be split into markers and deleting/adding)
//the second group are cards that do not interact with clicking the cards

//main function for cards
function ButtonSelected(buttonID)
{
    counterDisplayElem.innerHTML = "i'm at the top of button selected";
    //remove all other active button classes - set them to inactive
    var buttons = document.getElementsByClassName("button active");

    var querybuttons = document.querySelectorAll(".button active");
    counterDisplayElem.innerHTML = "i'm past the first line";
    for(var i = 0; i < buttons.length; i++){
      counterDisplayElem.innerHTML = "in for loop";
      if(buttons[i].classList.contains("active")){
        counterDisplayElem.innerHTML = "in first if";
        buttons[i].classList.remove("active");
        counterDisplayElem.innerHTML = "in first if1";
        buttons[i].classList.add("inactive");
        counterDisplayElem.innerHTML = "in first if2";
      }
    }
    counterDisplayElem.innerHTML = "2nd line";
    
    var pressedbutton = document.getElementById(buttonID);

    counterDisplayElem.innerHTML = "i'm past the first part" + pressedbutton.classList;

    //if statement for non-toggle buttons - if they are non-toggle class, go into a switch case to do the correct thing-
    if(pressedbutton.classList.contains("inactive")){
      pressedbutton.classList.remove("inactive");
      pressedbutton.classList.add("active");
      counterDisplayElem.innerHTML = "this shd display: if statement" + pressedbutton.classList;
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
}

function cardSelected(selectedcard)
{
    //check which button is currently active
    //use a switch case to choose the correct action based on which button is currently active
    counterDisplayElem.innerHTML = "i'm in card selected";
    var activeButton = document.getElementsByClassName("button active");
    switch(activeButton) {
      case "discard-play":
        counterDisplayElem.innerHTML = "i'm in the switch";
        Discardcard(activeButton[0]);
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