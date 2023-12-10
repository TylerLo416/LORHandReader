function drawCard(amtCards, drawtype) {
    //need to implement the container around the card, give it the correct id, etc.
    if(amtCards < 10)
    {
        const imgCardDiv = document.createElement('div');
        imgCardDiv.className = 'img-cards';
        imgCardDiv.id = `img-cards-${amtCards+1}`;

        const img = document.createElement('img');
        img.src = "Card-Back-Images/Summoner's-Rift-old.png";
        img.alt = "LOR Card";
        img.style.width = "100%";
        img.style.height = "100%";
        img.id = `LORCard${amtCards+1}`;
        img.className = 'LORCardClass';
        img.onclick = () => cardSelected(`LORCard${amtCards}`, 
            `LORCard-label${amtCards}`, `img-cards-${amtCards}`);
        
        const label = document.createElement('p');
        label.className = 'card-labels';
        label.id = `LORCard-label${amtCards+1}`;
        label.innerHTML = `Card ${amtCards+1}<br>${drawtype}<br>Turn: ${turnCounter}`;
        
        imgCardDiv.appendChild(label);
        imgCardDiv.appendChild(img);
        cardContainer.appendChild(imgCardDiv);

        //create right click functionality
        // Add contextmenu event listener for right-click
        /*const curAmtCards = amtCards;
        imgCardDiv.addEventListener('contextmenu', (event) => {
            event.preventDefault(); // Prevent default context menu
            discardCard(curAmtCards); // Call discardCard function with card number i
        });*/

        amtCards += 1;
    }
    return amtCards;
  }

  function moveToEndCard(amtCards, drawlabel, turnNumber) {
    //need to implement the container around the card, give it the correct id, etc.
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
        img.onclick = () => cardSelected(`LORCard${amtCards}`, 
            `LORCard-label${amtCards}`, `img-cards-${amtCards}`);
        
        const label = document.createElement('p');
        label.className = 'card-labels';
        label.id = `LORCard-label${amtCards+1}`;
        if(!(drawlabel.includes('Mulled') || drawlabel.includes('Kept'))) {
            label.innerHTML = `Card ${amtCards+1}<br>${drawlabel}Turn: ${turnNumber}`;
        }
        else {
            console.log("drawlabel:" + drawlabel)
            label.innerHTML = `Card ${amtCards+1}<br>${drawlabel}`
        } 
        
        imgCardDiv.appendChild(img);
        imgCardDiv.appendChild(label);
        cardContainer.appendChild(imgCardDiv);

        amtCards += 1;
    }
    return amtCards;
  }

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
    for (let i = cardNum + 1; i <= amtcards; i++) {
        const currentCardDiv = document.getElementById(`img-cards-${i}`);
        const currentCard = document.getElementById(`LORCard${i}`);
        const currentCardLabel = document.getElementById(`LORCard-label${i}`);
    
        const newCardNum = i - 1;
        let innerHTMLLabel = currentCardLabel.innerHTML;
    
        // Replace the numbers in the HTML content while preserving HTML tags
        const updatedLabel = innerHTMLLabel.replace(/\b(?:[1-9]|10)\b/, newCardNum);
        
    
        currentCard.onclick = () => cardSelected(`LORCard${newCardNum}`, `LORCard-label${newCardNum}`, `img-cards-${newCardNum}`);
    
        currentCardDiv.id = `img-cards-${newCardNum}`;
        currentCardLabel.id = `LORCard-label${newCardNum}`;
        currentCard.id = `LORCard${newCardNum}`;
    
        currentCardLabel.innerHTML = updatedLabel;
        console.log(currentCardDiv.id + " " + currentCardLabel.id);
    }
    // Adjust the total number of cards
    amtcards--;
}

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
    { id: 'replace', clickAction: true }
];

// Loop through the buttons and add event listeners
buttons.forEach(button => {
    addButtonEventListeners(button.id, button.clickAction);
});

function ChangeButton(buttonId, functiontype) {
    const prev = document.getElementById(buttonId).src;
    document.getElementById(buttonId).src = `Button-Images/${buttonId}Button${functiontype}.png`;
    
    if(functiontype == 'Selected') {
        setTimeout(() => {
            document.getElementById(buttonId).src = prev;
        }, 100)
    }
}