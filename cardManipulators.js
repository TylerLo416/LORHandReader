function drawCard() {
    //need to implement the container around the card, give it the correct id, etc.
    console.log(gv.amtCards);
    if(gv.amtCards < 10)
    {
        const imgCardDiv = document.createElement('div');
        imgCardDiv.className = 'img-cards';
        imgCardDiv.id = `img-cards-${gv.amtCards+1}`;

        const img = document.createElement('img');
        img.src = "Card-Back-Images/Summoner's-Rift.png";
        img.alt = "LOR Card";
        img.style.width = "100%";
        img.style.height = "100%";
        img.id = `LORCard${gv.amtCards+1}`
        img.onclick = () => cardSelected(`LORCard${gv.amtCards}`, 
            `LORCard-label${gv.amtCards}`, `img-cards-${gv.amtCards}`);
        
        const label = document.createElement('p');
        label.className = 'card-labels';
        label.id = `LORCard-label${gv.amtCards+1}`;
        label.textContent = `Card ${gv.amtCards+1}`;
        
        imgCardDiv.appendChild(img);
        imgCardDiv.appendChild(label);
        cardContainer.appendChild(imgCardDiv);

        gv.amtCards++;
    }
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
    card.onclick = null;
    card.remove();
    label.innerText = '';
    label.remove();
    wrapper.remove();
    //cardDiv.style.display = 'none';
    console.log("cardNum " + cardNum);
    // Update card labels and IDs for cards after the deleted card
    for (let i = cardNum + 1; i <= gv.amtCards; i++) {
        const currentCardDiv = document.getElementById(`img-cards-${i}`);
        const currentCard = document.getElementById(`LORCard${i}`);
        const currentCardLabel = document.getElementById(`LORCard-label${i}`);
    
        const newCardNum = i - 1;
        let innerHTMLLabel = currentCardLabel.innerHTML;
    
        // Replace the numbers in the HTML content while preserving HTML tags
        const updatedLabel = innerHTMLLabel.replace(/\d+/g, newCardNum);
        
    
        currentCard.onclick = () => cardSelected(`LORCard${newCardNum}`, `LORCard-label${newCardNum}`, `img-cards-${newCardNum}`);
    
        currentCardDiv.id = `img-cards-${newCardNum}`;
        currentCardLabel.id = `LORCard-label${newCardNum}`;
        currentCard.id = `LORCard${newCardNum}`;
    
        currentCardLabel.innerHTML = updatedLabel;
        console.log(currentCardDiv.id + " " + currentCardLabel.id);
    }
    // Adjust the total number of cards
    gv.amtCards--;
}