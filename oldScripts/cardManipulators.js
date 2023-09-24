function drawCard(amtCards) {
    //need to implement the container around the card, give it the correct id, etc.
    console.log(amtCards);
    if(amtCards < 10)
    {
        var newCard = document.createElement('img');
        newCard.src = 'Card-Back-Images/Summoner\'s-Rift.png';
        newCard.className = 'img-cards';
        document.getElementById('flex-card-image-container').appendChild(newCard);
        amtCards += 1;
    }
    return amtCards;
  }

function Discardcard(cardID, cardlabel, wrapperID)
{

    const card = document.getElementById(cardID);
    const label = document.getElementById(cardlabel);
    const cardNum = wrapperID.split('-')[2];

    //remove card that is being deleted
    card.remove();
    label.remove();
    document.getElementById(wrapperID).remove();


    redoCardNums();
    amtcards--;
}

//need to set the card id numbers to be 1, 2, 3, 4, etc. after a card is deleted
function redoCardNums() {
    //for each element in div id="flex-card-image-container"
  }
  