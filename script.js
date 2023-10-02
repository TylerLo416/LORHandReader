//Generate (10) cards
const numberOfCards = 4;  // Number of cards to generate
const cardContainer = document.getElementById('flex-card-image-container');

for (let i = 1; i <= numberOfCards; i++) {
  const imgCardDiv = document.createElement('div');
  imgCardDiv.className = 'img-cards';
  imgCardDiv.id = `img-cards-${i}`;

  const img = document.createElement('img');
  img.src = "Card-Back-Images/Summoner's-Rift.png";
  img.alt = "LOR Card";
  img.style.width = "100%";
  img.style.height = "100%";
  img.id = `LORCard${i}`
  img.onclick = () => cardSelected(`LORCard${i}`, `LORCard-label${i}`, `img-cards-${i}`);

  const label = document.createElement('p');
  label.className = 'card-labels';
  label.id = `LORCard-label${i}`;
  label.textContent = `Card ${i}`;

  imgCardDiv.appendChild(img);
  imgCardDiv.appendChild(label);
  cardContainer.appendChild(imgCardDiv);
}


//turn counter
let counterDisplayElem = document.querySelector('.counter-display');
let counterPlusElem = document.getElementById('next-turn');

let turnCounter = 0;

var amtcards = 4;

counterPlusElem.addEventListener("click",()=>{
    turnCounter++;
    deleteFleeting();
    updateDisplay();
});

function updateDisplay(){
    counterDisplayElem.innerHTML = "Turn: " + turnCounter;
    amtcards = drawCard(amtcards, "drawn");
}

function deleteFleeting() {
  for (let i = 1; i <= amtcards; i++) {
    const currentCardDiv = document.getElementById(`img-cards-${i}`);
    const currentCard = document.getElementById(`LORCard${i}`);
    const currentCardLabel = document.getElementById(`LORCard-label${i}`);

    if(currentCardLabel.innerHTML.includes("fleeting")) {
      discardCard(i);
    }
  }
}

//seperate all cards into a div class of toggle cards that interact with clicking the cards 
//(this may also need to be split into markers and deleting/adding)
//the second group are cards that do not interact with clicking the cards

//main function for cards
function ButtonSelected(buttonID)
{
    //remove all other active button classes - set them to inactive
    var buttons = document.getElementsByClassName("button active");
    for(var i = 0; i < buttons.length; i++){
      if(buttons[i].classList.contains("active")){
        buttons[i].classList.add("inactive");
        buttons[i].classList.remove("active");
      }
    }
    
    var pressedbutton = document.getElementById(buttonID);


    //if statement for non-toggle buttons - if they are non-toggle class, 
    //go into a switch case to do the correct thing-
    if(pressedbutton.classList.contains("inactive")){
      pressedbutton.classList.remove("inactive");
      pressedbutton.classList.add("active");
      return;
    }
    switch(buttonID) {
      case "next-turn":
          
      case "draw":
          //drawCard(drawn); - drawn is to be appended to id
          amtcards = drawCard(amtcards, "drawn");
          return;
      case "create":
          amtcards = drawCard(amtcards, "created");
          sortLabel(cardlabel);
          return;
      case "manifest":
          amtcards = drawCard(amtcards, "manifested");
          sortLabel(cardlabel);
        return;
      case "nab":
          amtcards = drawCard(amtcards, "nabbed");
          sortLabel(cardlabel);
        return;
      case "fleeting":
          amtcards = drawCard(amtcards, "fleeting");
          sortLabel(cardlabel);
        return;
      case "restart":
        counterDisplayElem.innerHTML = buttonID;
        location.reload();
        return false;
      default: throw "Issue with button selection occured";
    }
}

function cardSelected(selectedcard, cardlabel, wrapperID)
{
  console.log(selectedcard,cardlabel,wrapperID);
    //check which button is currently active
    //use a switch case to choose the correct action based on 
    //which button is currently active
    var activeButton = document.getElementsByClassName("button active");
    switch(activeButton[0].id) {
      case "discard-play":
        const number = parseInt(wrapperID.split("-")[2]);
        discardCard(number);
        break;
      case "1":
        manalabel(cardlabel, 1);
        sortLabel(cardlabel);
        break;
      case "2":
        manalabel(cardlabel, 2);
        sortLabel(cardlabel);
        break;
      case "3":
        manalabel(cardlabel, 3);
        sortLabel(cardlabel);
        break;
      case "4":
        manalabel(cardlabel, 4);
        sortLabel(cardlabel);
        break;
      case "5":
        manalabel(cardlabel, 5);
        sortLabel(cardlabel);
        break;
      case "6":
        manalabel(cardlabel, 6);
        sortLabel(cardlabel);
        break;
      case "7":
        manalabel(cardlabel, 7);
        sortLabel(cardlabel);
        break;
      case "8":
        manalabel(cardlabel, 8);
        sortLabel(cardlabel);
        break;
      case "9":
        manalabel(cardlabel, 9);
        sortLabel(cardlabel);
        break;
      case "unit":
        cardtypelabel(cardlabel, "unit");
        sortLabel(cardlabel);
        break;
      case "spell":
        cardtypelabel(cardlabel, "spell");
        sortLabel(cardlabel);
        break;
      case "champion":
        cardtypelabel(cardlabel, "champion");
        sortLabel(cardlabel);
        break;
      case "landmark":
        cardtypelabel(cardlabel, "landmark");
        sortLabel(cardlabel);
        break;
      case "token":
        if(!document.getElementById(cardlabel).innerHTML.includes("token")) {
          document.getElementById(cardlabel).innerHTML += " <br /> token";
        }
        else {
          var updatedContent = document.getElementById(cardlabel).innerHTML.replace('token', '');
          document.getElementById(cardlabel).innerHTML = updatedContent;
        }
        break;
      case "predicted":
        if(!document.getElementById(cardlabel).innerHTML.includes("predicted")) {
          document.getElementById(cardlabel).innerHTML += " <br /> predicted";
        }
        else {
          var updatedContent = document.getElementById(cardlabel).innerHTML.replace('predicted', '');
          document.getElementById(cardlabel).innerHTML = updatedContent;
        }
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