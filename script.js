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
      case "1":
        document.getElementById(cardlabel).innerHTML += " <br /> mana: 1";
        break;
      case "2":
        document.getElementById(cardlabel).innerHTML += " <br /> mana: 2";
        break;
      case "3":
        document.getElementById(cardlabel).innerHTML += " <br /> mana: 3";
        break;
      case "4":
        document.getElementById(cardlabel).innerHTML += " <br /> mana: 4";
        break;
      case "5":
        document.getElementById(cardlabel).innerHTML += " <br /> mana: 5";
        break;
      case "6":
        document.getElementById(cardlabel).innerHTML += " <br /> mana: 6";
        break;
      case "7":
        document.getElementById(cardlabel).innerHTML += " <br /> mana: 7";
        break;
      case "8":
        document.getElementById(cardlabel).innerHTML += " <br /> mana: 8";
        break;
      case "9":
        document.getElementById(cardlabel).innerHTML += " <br /> mana: 9";
        break;
      case "unit":
        document.getElementById(cardlabel).innerHTML += " <br /> unit";
        break;
      case "spell":
        document.getElementById(cardlabel).innerHTML += " <br /> spell";
        break;
      case "champion":
        document.getElementById(cardlabel).innerHTML += " <br /> champion";
        break;
      case "landmark":
        document.getElementById(cardlabel).innerHTML += " <br /> landmark";
        break;
      case "token":
        document.getElementById(cardlabel).innerHTML += " <br /> token";
        break;
      case "shown":
        document.getElementById(cardlabel).innerHTML += " <br /> shown";
        break;
      case "move-to-end":
      default: //do nothing;
    }
    activeButton[0].classList.add("inactive");
    activeButton[0].classList.remove("active");
}