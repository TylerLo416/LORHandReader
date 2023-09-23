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

//need to set the card id numbers to be 1, 2, 3, 4, etc. after a card is deleted
function redoCardNums() {
    //for each element in div id="flex-card-image-container"
  }
  