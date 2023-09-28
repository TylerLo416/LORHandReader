function drawCard(amtCards) {
    //need to implement the container around the card, give it the correct id, etc.
    console.log(amtCards);
    if(amtCards < 10)
    {
        const imgCardDiv = document.createElement('div');
        imgCardDiv.className = 'img-cards';
        imgCardDiv.id = `img-cards-${amtCards+1}`;

        const img = document.createElement('img');
        img.src = "Card-Back-Images/Summoner's-Rift.png";
        img.alt = "LOR Card";
        img.style.width = "100%";
        img.style.height = "100%";
        img.id = `LORCard${amtCards+1}`
        img.onclick = () => cardSelected(`LORCard${amtCards+1}`, 
            `LORCard-label${amtCards+1}`, `img-cards-${amtCards+1}`);
        
        const label = document.createElement('p');
        label.className = 'card-labels';
        label.id = `LORCard-label${amtCards+1}`;
        label.textContent = `Card ${amtCards+1}`;
        
        imgCardDiv.appendChild(img);
        imgCardDiv.appendChild(label);
        cardContainer.appendChild(imgCardDiv);

        amtCards += 1;
    }
    return amtCards;
  }

/*function Discardcard(cardID, cardlabel, wrapperID)
{
    const card = document.getElementById(cardID);
    const label = document.getElementById(cardlabel);

    card.style.display = "none";
    label.style.display = "none";

    document.getElementById(wrapperID).style.display = "none";

    redoCardNums();
    amtcards--;
}*/
function discardCard(cardNum) {
    // Remove the specified card
    const wrapper = document.getElementById(`img-cards-${cardNum}`);
    const label = document.getElementById(`LORCard-label${cardNum}`);
    const card = document.getElementById(`LORCard${cardNum}`);
    card.remove();
    label.innerText = '';
    label.remove();
    wrapper.remove();
    //cardDiv.style.display = 'none';

    // Update card labels and IDs for cards after the deleted card
    for (let i = cardNum + 1; i <= amtcards; i++) {
        const currentCardDiv = document.getElementById(`img-cards-${i}`);
        if (currentCardDiv) {
            const currentCardLabel = document.getElementById(`LORCard-label${i}`);
            const innerHTMLLabel = currentCardLabel.innerHTML
x
            const newCardNum = i - 1;
            
            currentCardDiv.id = `img-cards-${newCardNum}`;
            currentCardLabel.id = `LORCard-label${newCardNum}`;
            currentCardLabel.textContent = `Card ${newCardNum}`;
            console.log(currentCardDiv.id + " " + currentCardLabel.id);
        }
    }
    // Adjust the total number of cards
    amtcards--;
}