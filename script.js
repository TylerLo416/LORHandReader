const numberOfCards = 4;  // Number of cards to generate
const cardContainer = document.getElementById('flex-card-image-container');

//generate initial set of 4 cards
for (let i = 1; i <= numberOfCards; i++) {
  const imgCardDiv = document.createElement('div');
  imgCardDiv.className = 'img-cards';
  imgCardDiv.id = `img-cards-${i}`;

  const img = document.createElement('img');
  img.src = "Card-Back-Images/Summoner's-Rift-old.png";
  img.alt = "LOR Card";
  img.className = "LORCardClass";
  img.style.width = "100%";
  img.style.height = "100%";
  img.id = `LORCard${i}`;
  img.onclick = () => cardSelected(`LORCard${i}`, `LORCard-label${i}`, `img-cards-${i}`);

  const label = document.createElement('p');
  label.className = 'card-labels';
  label.id = `LORCard-label${i}`;
  label.innerHTML = `Card ${i}`;

  let mulliganButton = document.createElement('img');
  mulliganButton.src = "Button-Images/replaceButtonStandard.png";
  mulliganButton.alt = "replaceButton";
  mulliganButton.id = `replace${i}`;
  mulliganButton.onclick = () => handleReplaceButton(i);

  imgCardDiv.appendChild(label);
  imgCardDiv.appendChild(img);
  imgCardDiv.appendChild(mulliganButton);
  cardContainer.appendChild(imgCardDiv);

  //Add right click to delete TODO
  const contextMenuHandler = (e) => handleContextMenu(e, i);
  img.addEventListener('contextmenu', contextMenuHandler);
}


//toggles whether or not card should have the mulled or kept tag
function handleReplaceButton(cardNumber) {
  let card = document.getElementById(`LORCard${cardNumber}`).src;
  if(!card.includes("Card-Back-Images/Summoner's-Rift-faded.png")) {
    document.getElementById(`LORCard${cardNumber}`).src = "Card-Back-Images/Summoner's-Rift-faded.png";
  }
  else {
    document.getElementById(`LORCard${cardNumber}`).src = "Card-Back-Images/Summoner's-Rift-old.png";
  }
}

function handleStartButton() {
  for (let i = 1; i <= numberOfCards; i++) {
    curCardImg = document.getElementById(`LORCard${i}`);
    let label = document.getElementById(`LORCard-label${i}`);
    if(curCardImg.src.includes("Card-Back-Images/Summoner's-Rift-faded.png")) {
      label.innerHTML += '<br>Mulled';
      curCardImg.src = "Card-Back-Images/Summoner's-Rift-old.png";
    }
    else {
      label.innerHTML += '<br>Kept';
    }
    document.getElementById(`replace${i}`).remove();
  }
}


//turn counter
let counterPlusElem = document.getElementById('next-turn');

let turnCounter = 0;

var amtcards = 4;

function updateDisplay(){
    let counterDisplayElem = document.getElementById('counter-display');
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

//keybindings
let ignoreEventListener = false;
document.addEventListener('keydown', function(event) {
  if(ignoreEventListener) {
    return;
  }
  switch (event.key) {
    case 'q':
      ButtonSelected('next');
      break;
    case 'w':
      ButtonSelected('draw');
      break;
    case 'e':
      ButtonSelected('discard-play');
      break;
    case 'r':
      ButtonSelected('manual-input');
      break;
    // Add more cases for other keys if needed
    default:
      break;
  }
});


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
      case "next":
          turnCounter++;
          deleteFleeting();
          updateDisplay();
          return;
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
        location.reload();
        return;
      case "start-game":
        document.getElementById('mulligan-phase').style.display = 'none';
        document.getElementById('game-phase').style.display = 'flex';
        handleStartButton();
        return;
      default: throw "Issue with button selection occured";
    }
}

function cardSelected(selectedcard, cardlabel, wrapperID) {
  const cardnumber = parseInt(wrapperID.split("-")[2]);
  createInputArea(cardnumber, "");
}

/*function cardSelected(selectedcard, cardlabel, wrapperID)
{
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
      case "equipment":
        cardtypelabel(cardlabel, "equipment");
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
      case "manual-input":
        const cardnumber = parseInt(wrapperID.split("-")[2]);
        createInputArea(cardnumber, "");
        break;
      case "reduced-cost":
        const cardnumber1 = parseInt(wrapperID.split("-")[2]);
        createInputArea(cardnumber1, "reduced cost: ");
        break;
      case "move-to-end":
        const cardNumber = parseInt(wrapperID.split("-")[2]);
        let currentCardLabel = document.getElementById(`LORCard-label${cardNumber}`).innerHTML;

        if(currentCardLabel.includes('Kept') || currentCardLabel.includes('Mulled')) {
          currentCardLabel = currentCardLabel.replace(`Card ${cardNumber}<br>`,"");
          discardCard(cardNumber);
          amtcards = moveToEndCard(amtcards, currentCardLabel, 0);
          break;
        }
        currentCardLabel = currentCardLabel.replace(`Card ${cardNumber}<br>`,"");

        const regex = new RegExp('Turn:  \\d+', 'g');
        console.log('regex:' + regex);
        const regex1 = /\d+/g;
        const matches = currentCardLabel.match(regex1);
        const turn = parseInt(matches[0], 10);

        currentCardLabel = currentCardLabel.replace(regex, '');

        discardCard(cardNumber);
        amtcards = moveToEndCard(amtcards, currentCardLabel, turn);
        sortLabel(cardlabel);
        break;
      default: //do nothing;
    }
    activeButton[0].classList.add("inactive");
    activeButton[0].classList.remove("active");
}*/

function showNotification() {
  alert("Next Turn/Draw both draw cards. For Discard/Mana Label/Card Type/MoveToEnd, " + 
    "Click on the button, then the card you want to affect. " + 
    "Q,W,E,R are hotkeys for the corresponding buttons. Go yell at me in discord if you find a bug (there are lots)");
}

//add graphics to buttons
function addButtonEventListeners(buttonId, clickAction) {
  const button = document.getElementById(buttonId);

  button.addEventListener('mouseover', function() {
      ChangeButton(buttonId, 'Hover');
  });

  button.addEventListener('mouseout', function() {
      ChangeButton(buttonId, 'Standard');
  });

  if (clickAction) {
      button.addEventListener('click', function() {
          ChangeButton(buttonId, 'Selected');
      });
  }
}

// List of buttons and their associated click actions (if any)
const buttons = [
  { id: 'next', clickAction: true },
  { id: 'draw', clickAction: true },
  { id: 'start-game' },
  { id: 'restart' },
  { id: 'undo', clickAction: true },
  { id: 'replace1', clickAction: true },
  { id: 'replace2', clickAction: true },
  { id: 'replace3', clickAction: true },
  { id: 'replace4', clickAction: true }
];

// Loop through the buttons and add event listeners
buttons.forEach(button => {
  addButtonEventListeners(button.id, button.clickAction);
});

function ChangeButton(buttonId, functiontype) {
  const prev = document.getElementById(buttonId).src;
  let buttonIdNoNums = buttonId.replace(/\d+$/, '');
  document.getElementById(buttonId).src = `Button-Images/${buttonIdNoNums}Button${functiontype}.png`;
  
  if(functiontype == 'Selected') {
      setTimeout(() => {
          document.getElementById(buttonId).src = prev;
      }, 100)
  }
}

//stops right click menu from showing up
function preventDefault() {
  let background = document.getElementById('flex-background');
  background.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // Prevent default context menu
  });
}

function handleContextMenu(e, cardNumber) {
  e.preventDefault(); // Prevent default context menu
  discardCard(cardNumber); // Call the deleteCard function passing the card number
}