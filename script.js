import { drawCard } from './toggleButtons.js';


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


//MAKE AN addCard function here:
/*function addCard(tag)
{

}*/


function Discardcard(cardID, cardlabel, wrapperID)
{
    //document.getElementById(cardID).style.visibility = "hidden";//make display = "none" when needed for the cards to move
    //document.getElementById(cardlabel).style.visibility = "hidden";
    const card = document.getElementById(cardID);
    const label = document.getElementById(cardlabel);

    card.style.display = "none";//make display = "none" when needed for the cards to move
    label.style.display = "none";

    document.getElementById(wrapperID).style.display = "none";

    redoCardNums();

    //document.getElementById('flex-card-image-container').style.justifyContent = 'center';
    //document.getElementById('flex-card-image-container').style.justifyContent = 'center';
    //counterDisplayElem.innerHTML = "hi";
    //document.getElementById(cardID).style.display = "none";//make display = "none" when needed for the cards to move
    //document.getElementById(cardlabel).style.display = "none";
}

function redoCardNums() {
  //for each element in div id="flex-card-image-container"
}

//function for the mana toggle labels
function manalabel(cardlabel, number)
{
  const label = document.getElementById(cardlabel);
  //if no mana 1
  if(label.innerHTML.indexOf("mana") === -1){
    label.innerHTML += "<br> mana: " + number;
  }
  //if mana: 1 already shown delete it
  else if(label.innerHTML.indexOf("mana: " + number) !== -1){
    //counterDisplayElem.innerHTML = "were here" + label.innerHTML.indexOf("mana") + " 0: " + label.innerHTML.charAt("1") + 
    //  "char: " + label.innerHTML.charAt(12) + " length: " + label.innerText.length;
    /*counterDisplayElem.innerHTML = "hi " + label.innerHTML.substring(0, label.innerHTML.indexOf("mana")-6);
    label.innerHTML = label.innerHTML.substring(0, label.innerHTML.indexOf("<br /> mana")) + 
      label.innerHTML.substring(label.innerHTML.indexOf("1"), label.innerHTML.length-1);//possible problem is label.length doesnt work*/
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

function cardtypelabel(cardlabel, cardtype)
{
  const label = document.getElementById(cardlabel);
  //if no cardtype
  if(label.innerHTML.indexOf("unit") === -1 && label.innerHTML.indexOf("spell") === -1
    && label.innerHTML.indexOf("champion") === -1 && label.innerHTML.indexOf("landmark") === -1){
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
      && labelArray[i].indexOf("champion") === -1 && labelArray[i].indexOf("landmark") === -1) {
        label.innerHTML += labelArray[i] + "<br>";
      }
      else {
        label.innerHTML += cardtype + "<br>";
      }
    }
    label.innerHTML = label.innerHTML.substring(0, label.innerHTML.lastIndexOf("<br>"));
  }
}

//sets the mana label to be the first label, then sorts the rest alphabeticalls
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

//seperate all cards into a div class of toggle cards that interact with clicking the cards (this may also need to be split into markers and deleting/adding)
//the second group are cards that do not interact with clicking the cards

//main function for cards
var nextTurn = document.getElementById('next-turn');
var discardPlay = document.getElementById('discard-play');
var draw = document.getElementById('draw');
var create = document.getElementById('create');
var manifest = document.getElementById('manifest');
var fleeting = document.getElementById('fleeting');
var predictedDraw = document.getElementById('predicted-draw');
var shown = document.getElementById('shown');
var one = document.getElementById('1');
var two = document.getElementById('2');
var three = document.getElementById('3');
var four = document.getElementById('4');
var five = document.getElementById('5');
var six = document.getElementById('6');
var seven = document.getElementById('7');
var eight = document.getElementById('8');
var nine = document.getElementById('9');
var unit = document.getElementById('unit');
var spell = document.getElementById('spell');
var champion = document.getElementById('champion');
var landmark = document.getElementById('landmark');
var token = document.getElementById('token');
var moveToEnd = document.getElementById('move-to-end');
var restart = document.getElementById('restart');


nextTurn.addEventListener("click", ButtonSelected('next-turn'));
discardPlay.addEventListener("click", ButtonSelected('discard-play'));
draw.addEventListener("click", ButtonSelected('draw'));
create.addEventListener("click", ButtonSelected('create'));
manifest.addEventListener("click", ButtonSelected('manifest'));
fleeting.addEventListener("click", ButtonSelected('fleeting'));
predictedDraw.addEventListener("click", ButtonSelected('predicted-draw'));
shown.addEventListener("click", ButtonSelected('shown'));
one.addEventListener("click", ButtonSelected('1'));
two.addEventListener("click", ButtonSelected('2'));
three.addEventListener("click", ButtonSelected('3'));
four.addEventListener("click", ButtonSelected('4'));
five.addEventListener("click", ButtonSelected('5'));
six.addEventListener("click", ButtonSelected('6'));
seven.addEventListener("click", ButtonSelected('7'));
eight.addEventListener("click", ButtonSelected('8'));
nine.addEventListener("click", ButtonSelected('9'));
unit.addEventListener("click", ButtonSelected('unit'));
spell.addEventListener("click", ButtonSelected('spell'));
champion.addEventListener("click", ButtonSelected('champion'));
landmark.addEventListener("click", ButtonSelected('landmark'));
token.addEventListener("click", ButtonSelected('token'));
moveToEnd.addEventListener("click", ButtonSelected('move-to-end'));
/*restart.addEventListener("click", ButtonSelected('restart'));*/

function ButtonSelected(buttonID)
{
    counterDisplayElem.innerHTML = "in button selected";
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
    counterDisplayElem.innerHTML = "button ID:" + buttonID;


    //if statement for non-toggle buttons - if they are non-toggle class, go into a switch case to do the correct thing-
    if(pressedbutton.classList.contains("inactive")){
      pressedbutton.classList.remove("inactive");
      pressedbutton.classList.add("active");
      return;
    }
    switch(buttonID) {
      case "next-turn":
          break;
      case "draw":
          //drawCard(drawn); - drawn is to be appended to id
          drawCard();
          break;
      case "create":
          break;
      case "manifest":
          break;
      case "nab":
          break;  
      case "fleeting":
          break;
      case "predicted-draw":
          break;
      case "restart":
          counterDisplayElem.innerHTML = buttonID;
          location.reload();
          break;
      default: throw "Issue with button selection occured";
    }
}


var card1 = document.getElementById("img-cards-1");
var card2 = document.getElementById("img-cards-2");
var card3 = document.getElementById("img-cards-3");
var card4 = document.getElementById("img-cards-4");
var card5 = document.getElementById("img-cards-5");
var card6 = document.getElementById("img-cards-6");
var card7 = document.getElementById("img-cards-7");
var card8 = document.getElementById("img-cards-8");
var card9 = document.getElementById("img-cards-9");
var card10 = document.getElementById("img-cards-10");
card1.addEventListener("click", cardSelected('LORCard1', 'LOR-Card-label1', 'img-cards1'));
card2.addEventListener("click", cardSelected('LORCard1', 'LOR-Card-label1', 'img-cards1'));
card3.addEventListener("click", cardSelected('LORCard1', 'LOR-Card-label1', 'img-cards1'));
card4.addEventListener("click", cardSelected('LORCard1', 'LOR-Card-label1', 'img-cards1'));
card5.addEventListener("click", cardSelected('LORCard1', 'LOR-Card-label1', 'img-cards1'));
card6.addEventListener("click", cardSelected('LORCard1', 'LOR-Card-label1', 'img-cards1'));
card7.addEventListener("click", cardSelected('LORCard1', 'LOR-Card-label1', 'img-cards1'));
card8.addEventListener("click", cardSelected('LORCard1', 'LOR-Card-label1', 'img-cards1'));
card9.addEventListener("click", cardSelected('LORCard1', 'LOR-Card-label1', 'img-cards1'));
card10.addEventListener("click", cardSelected('LORCard1', 'LOR-Card-label1', 'img-cards1'));

function cardSelected(selectedcard, cardlabel, wrapperID)
{
    //check which button is currently active
    //use a switch case to choose the correct action based on which button is currently active
    var activeButton = document.getElementsByClassName("button active");
    switch(activeButton[0].id) {
      case "discard-play":
        Discardcard(selectedcard, cardlabel, wrapperID);
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
        document.getElementById(cardlabel).innerHTML += " <br /> token";
        break;
      case "shown":
        document.getElementById(cardlabel).innerHTML += " <br /> shown";
        break;
      case "move-to-end":
        break;
      default: break;//do nothing;
    }
    activeButton[0].classList.add("inactive");
    activeButton[0].classList.remove("active");
}

/*function drawCard(/*drawtype) {
  //var cardContainer = document.createElement('img-cards');
  //need to implement the container around the card, give it the correct id, etc.
  
  var newCard = document.createElement('img');
  newCard.src = 'Card-Back-Images/Summoner\'s-Rift.png';
  newCard.className = 'img-cards';
  //newCard
  //newCard.setAttribute("src", "Card-Back-Images/Summoner's-Rift.png");
  //newCard.setAttribute('class', 'img-cards');
  document.getElementById('flex-card-image-container').appendChild(newCard);
}*/

