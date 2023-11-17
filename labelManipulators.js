//function for the mana toggle labels
function manalabel(cardlabel, number)
{
  const label = document.getElementById(cardlabel);
  //if no mana 1
  if(label.innerHTML.indexOf("mana") === -1){
    label.innerHTML += "<br> mana: " + number;
  }
  //if mana: 1 (already shown) delete it
  else if(label.innerHTML.indexOf("mana: " + number) !== -1){
    const labelArray = label.innerHTML.split("<br>");
    label.innerHTML = "";
    for(var i = 0; i < labelArray.length; i++) {
      if(labelArray[i].indexOf("mana") === -1) {
        label.innerHTML += labelArray[i] + "<br>";
      }
    }
    label.innerHTML = label.innerHTML.substring(0, label.innerHTML.lastIndexOf("<br>"));
      
  }
  //if other mana number
  else {
    const labelArray = label.innerHTML.split("<br>");
    label.innerHTML = "";
    for(var i = 0; i < labelArray.length; i++) {
      if(labelArray[i].indexOf("mana") === -1) {
        label.innerHTML += labelArray[i] + "<br>";
      }
      else {
        label.innerHTML += labelArray[i].replace(/[0-9]/g, number) + "<br>";
      }
    }
    label.innerHTML = label.innerHTML.substring(0, label.innerHTML.lastIndexOf("<br>"));
  }
}

//labels cardtype (unit, spell, champion, landmark)
function cardtypelabel(cardlabel, cardtype)
{
  const label = document.getElementById(cardlabel);
  //if no cardtype
  if(label.innerHTML.indexOf("unit") === -1 && label.innerHTML.indexOf("spell") === -1
    && label.innerHTML.indexOf("champion") === -1 && label.innerHTML.indexOf("landmark") === -1
    && label.innerHTML.indexOf("equipment") === -1){
    label.innerHTML += "<br>" + cardtype;
  }
  //if same card type delete
  else if(label.innerHTML.indexOf(cardtype) !== -1) {
    const labelArray = label.innerHTML.split("<br>");
    label.innerHTML = "";
    for(var i = 0; i < labelArray.length; i++) {
      if(labelArray[i].indexOf(cardtype) === -1) {
        label.innerHTML += labelArray[i] + "<br>";
      }
    }
    label.innerHTML = label.innerHTML.substring(0, label.innerHTML.lastIndexOf("<br>"));
  }
  //if different cardtype
  else {
    const labelArray = label.innerHTML.split("<br>");
    label.innerHTML = "";
    for(var i = 0; i < labelArray.length; i++) {
      if(labelArray[i].indexOf("unit") === -1 && labelArray[i].indexOf("spell") === -1
      && labelArray[i].indexOf("champion") === -1 && labelArray[i].indexOf("landmark") === -1
      && labelArray[i].indexOf("equipment") === -1) {
        label.innerHTML += labelArray[i] + "<br>";
      }
      else {
        label.innerHTML += cardtype + "<br>";
      }
    }
    label.innerHTML = label.innerHTML.substring(0, label.innerHTML.lastIndexOf("<br>"));
  }
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

//Custom Labels
function createInputArea(cardnumber, reducedCost) {
  ignoreEventListener = true;
  console.log("inputarea: " + reducedCost);
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
  console.log(ignoreEventListener);
}

function getUserInput(cardnumber, reducedCost) {
  const userInputIntoLabel = document.getElementById('userInput').value;
  if (userInputIntoLabel.trim() !== '') {
    // Do something with the user's input
    const currentCardLabel = document.getElementById(`LORCard-label${cardnumber}`);
    console.log(reducedCost);
    currentCardLabel.innerHTML += '<br>' + reducedCost + userInputIntoLabel;

    // Remove the inputContainer (which contains the input and submit button)
    const inputContainer = document.getElementById('inputContainer');
    inputContainer.parentNode.removeChild(inputContainer);
  }
}