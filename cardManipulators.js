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

    card.style.display = "none";
    label.style.display = "none";

    document.getElementById(wrapperID).style.display = "none";

    redoCardNums();
    amtcards--;
}