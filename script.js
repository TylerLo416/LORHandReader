const numberOfCards = 4;  // Number of cards to generate
const cardContainer = document.getElementById('flex-card-image-container');
let amtcards = 4;
let counterPlusElem = document.getElementById('next-turn');
let turnCounter = 0;
let ignoreEventListener = false;
let undoStack = [];
let baseState;

function init() {
  // Perform initialization tasks here
  initializeMulligan();
  initializeKeybindings();
  initializeButtons();
  return {
    message: 'Initialization completed successfully!',
  };
}

function initializeMulligan() {
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

    //Add right click to delete onto the image (LORCard${i})
    img.addEventListener('contextmenu', discardCard);
  }
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

//function for startGame Button
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
  baseState = currentState();
}

function initializeKeybindings() {
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
        // Add more cases for other keys if needed
        default:
          break;
      }
  });
  }

function initializeButtons() {
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
}

initConfirmation = init();
console.log(initConfirmation);

function undoUpdateCards() {
  const cardContainer = document.getElementById('flex-card-image-container');
  if(undoStack.length == 0) {
    undoStack.push(baseState);
  }
  let labelArr = undoStack.pop();
  console.log(undoStack);
  if(JSON.stringify(labelArr) === JSON.stringify(currentState())) {
    labelArr = undoStack.pop()
  }
  if(JSON.stringify(currentState()) === JSON.stringify(baseState)) {
    return;
  }

  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
  for (let i = 1; i <= labelArr.length; i++) {
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
    //label.innerHTML = `Card ${i}`;
    label.innerHTML = labelArr[i-1];
    //TODO for every label in the undo stack, append it to the card

    imgCardDiv.appendChild(label);
    imgCardDiv.appendChild(img);
    cardContainer.appendChild(imgCardDiv);

    //Add right click to delete onto the image (LORCard${i})
    img.addEventListener('contextmenu', discardCard);
  }
  amtcards = labelArr.length;
  
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

function updateDisplay(){
    //let counterDisplayElem = document.getElementById('counter-display');
    //counterDisplayElem.innerHTML = "Turn: " + turnCounter;
    amtcards = drawCard(amtcards, "drawn");
}

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
    switch(buttonID) {
      case "next":
          turnCounter++;
          //deleteFleeting();
          updateDisplay();
          break;
      case "draw":
          amtcards = drawCard(amtcards, "drawn");
          break;
      case "restart":
        location.reload();
        break;
      case "start-game":
        document.getElementById('mulligan-phase').style.display = 'none';
        document.getElementById('game-phase').style.display = 'flex';
        handleStartButton();
        break;
      case "undo": //must be last case
        undoUpdateCards();
        return;
      default: throw "Issue with button selection occured";
    }
    const curState = currentState();
    undoStack.push(curState);
}

function showNotification() {
  alert("Next Turn/Draw both draw cards. For Discard/Mana Label/Card Type/MoveToEnd, " + 
    "Click on the button, then the card you want to affect. " + 
    "Q,W,E,R are hotkeys for the corresponding buttons. Go yell at me in discord if you find a bug (there are lots)");
}

//stops right click menu from showing up
function preventDefault() {
  let background = document.getElementById('flex-background');
  background.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // Prevent default context menu
  });
}

//delete a Card on Right Click
function discardCard(event) {
  event.preventDefault(); // Prevent the default context menu

  //get Id's
  const clickedElement = event.target;
  const imgId = clickedElement.id;
  let cardNum = imgId.match(/\d+/g);
  const joinedString = cardNum ? cardNum.join('') : '';
  cardNum = parseInt(joinedString, 10);

  //remove the specified card
  const wrapper = document.getElementById(`img-cards-${cardNum}`);
  const label = document.getElementById(`LORCard-label${cardNum}`);
  const card = document.getElementById(`LORCard${cardNum}`);
  card.remove();
  label.remove();
  wrapper.remove();
  for (let i = cardNum+1; i <= amtcards; i++) {
      let currentCardDiv = document.getElementById(`img-cards-${i}`)
      let currentCard = document.getElementById(`LORCard${i}`);
      let currentCardLabel = document.getElementById(`LORCard-label${i}`);
 
      const newCardNum = i - 1;
      let innerHTMLLabel = currentCardLabel.innerHTML;

      // Replace the numbers in the HTML content while preserving HTML tags
      const updatedLabel = innerHTMLLabel.replace(/\b(?:[1-9]|10)\b/, newCardNum);
      currentCard.onclick = () => cardSelected(`LORCard${newCardNum}`, `LORCard-label${newCardNum}`, `img-cards-${newCardNum}`);

      //set the id's to be reduced by 1
      currentCardLabel.innerHTML = updatedLabel;
      currentCardDiv.id = `img-cards-${newCardNum}`;
      currentCardLabel.id = `LORCard-label${newCardNum}`;
      currentCard.id = `LORCard${newCardNum}`;

  }
  amtcards--;
  const curState = currentState();
  undoStack.push(curState);
  console.log(curState);
}

function drawCard(amtCards, drawtype) {
  if(amtCards < 10)
  {
      amtCards += 1;
      const imgCardDiv = document.createElement('div');
      imgCardDiv.className = 'img-cards';
      imgCardDiv.id = `img-cards-${amtCards}`;

      const img = document.createElement('img');
      img.src = "Card-Back-Images/Summoner's-Rift-old.png";
      img.alt = "LOR Card";   
      img.style.width = "100%";
      img.style.height = "100%";
      img.id = `LORCard${amtCards}`;
      img.className = 'LORCardClass';
      img.onclick = () => cardSelected(`LORCard${amtCards}`, 
          `LORCard-label${amtCards}`, `img-cards-${amtCards}`);
      
      const label = document.createElement('p');
      label.className = 'card-labels';
      label.id = `LORCard-label${amtCards}`;
      label.innerHTML = `Card ${amtCards}<br>${drawtype}<br>Turn: ${turnCounter}`;
      
      imgCardDiv.appendChild(label);
      imgCardDiv.appendChild(img);
      cardContainer.appendChild(imgCardDiv);

      //create right click functionality
      // Add contextmenu event listener for right-click
      img.addEventListener('contextmenu', discardCard);
  }
  return amtCards;
}

//sets the mana label to be the first label, then sorts the rest alphabetically
function sortLabel(cardlabel)
{
  const label = document.getElementById(cardlabel);
  const labelArray = label.innerHTML.split("<br>");
  label.innerHTML = labelArray[0] + "<br>";

  for(var i = 0; i < labelArray.length; i++) {
    if(labelArray[i].indexOf("mana") === 1) {
      label.innerHTML += labelArray[i] + "<br>";
    }
  }
  for(var i = 1; i < labelArray.length; i++) {
    if(labelArray[i].indexOf("mana") === -1) {
      label.innerHTML += labelArray[i] + "<br>";
    }
  }
  label.innerHTML = label.innerHTML.substring(0, label.innerHTML.lastIndexOf("<br>"));
}

function cardSelected(selectedcard, cardlabel, wrapperID) {
  const cardnumber = parseInt(wrapperID.split("-")[2]);
  createInputArea(cardnumber, "");
}

//Custom Labels
function createInputArea(cardnumber, reducedCost) {
    ignoreEventListener = true;
    // Create the inputContainer and other elements
    const inputContainer = document.createElement('div');
    inputContainer.id = 'inputContainer';

    const userInput = document.createElement('input');
    userInput.type = 'text';
    userInput.id = 'userInput';
    userInput.placeholder = 'Enter text';
    userInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        getUserInput(cardnumber, reducedCost); // Pass the cardnumber when Enter is pressed
        ignoreEventListener = false;
      }
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.onclick = function() {
      getUserInput(cardnumber, reducedCost); // Pass the cardnumber when the button is clicked
      ignoreEventListener = false;
    };

    inputContainer.appendChild(userInput);
    inputContainer.appendChild(submitButton);

    // Get the flex-card-image-container and append the inputContainer
    const flexCardImageContainer = document.getElementById(`img-cards-${cardnumber}`);
    flexCardImageContainer.appendChild(inputContainer);

    // Set focus on the input field when displayed
    userInput.focus();
}

//helper function for createInputArea
function getUserInput(cardnumber, reducedCost) {
  const userInputIntoLabel = document.getElementById('userInput').value;
  if (userInputIntoLabel.trim() !== '') {
    // Do something with the user's input
    const currentCardLabel = document.getElementById(`LORCard-label${cardnumber}`);
    currentCardLabel.innerHTML += '<br>' + reducedCost + userInputIntoLabel;
  }
  // Remove the inputContainer (which contains the input and submit button)
  const inputContainer = document.getElementById('inputContainer');
  inputContainer.parentNode.removeChild(inputContainer);

  const curState = currentState();
  undoStack.push([curState]);
}

//returns current cards
function currentState() {
  const cardLabelsElements = document.querySelectorAll('.card-labels');

  // Initialize an array to store the labels
  const labelsArray = [];

  // Iterate through each element and store its content in the array
  cardLabelsElements.forEach(element => {
    labelsArray.push(element.innerHTML);
  });

  // Log the array to the console
  return labelsArray;
}