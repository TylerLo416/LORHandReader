function cardSelected(cardId, labelId, imgCardId) {
  console.log("Card selected:", cardId);
}

const numberOfCards = 10;  // Number of cards to generate
const cardContainer = document.getElementById('flex-card-image-container');

for (let i = 1; i <= numberOfCards; i++) {
  const imgCardDiv = document.createElement('div');
  imgCardDiv.className = 'img-cards';
  imgCardDiv.id = `img-cards-${i}`;

  const img = document.createElement('img');
  img.src = "Card-Back-Images/Summoner's-Rift.png";
  img.alt = "LOR Card";
  img.style.width = "100%";
  img.style.height = "100%";
  img.onclick = () => cardSelected(`LORCard${i}`, `LORCard-label${i}`, `img-cards-${i}`);

  const label = document.createElement('p');
  label.className = 'card-labels';
  label.id = `LORCard-label${i}`;
  label.textContent = `Card ${i}`;

  imgCardDiv.appendChild(img);
  imgCardDiv.appendChild(label);
  cardContainer.appendChild(imgCardDiv);
}

// Function to handle card selection and menu display
function handleCardSelection(card) {
    storeCardInfo(card);
  
    // Set input values based on stored card info
    document.getElementById('shown').value = storedCardInfo.shown || '';
    document.getElementById('turn-drawn-input').value = storedCardInfo.turnDrawn || '';
    document.querySelectorAll('.mana-button').forEach(button => {
      if (button.textContent === storedCardInfo.mana) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
    document.querySelectorAll('.button').forEach(button => {
      if (button.textContent === storedCardInfo.type || button.textContent === storedCardInfo.drawType) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
    document.getElementById('predicted').checked = storedCardInfo.predicted || false;
    document.getElementById('reduced-cost-input').value = storedCardInfo.reducedCost || '';
  
    // Show the card info menu
    document.getElementById('card-info-menu').style.display = 'block';
  }
  
  // Function to handle shift-click to delete cards
  function setupShiftClickToDelete() {
    const cards = document.querySelectorAll('.img-cards');
    cards.forEach(card => {
      card.addEventListener('click', function (e) {
        if (e.shiftKey) {
          removeCardAndRenumber(card);
        } else {
          // Handle left-click to edit card info
          handleCardSelection(card);
        }
      });
    });
  }

  // Event listener for "Update Card Info" button
  const updateButton = document.getElementById('update-card-info');
  updateButton.addEventListener('click', updateCardInfo);
  

  
  // Function to update the card's info
  function updateCardInfo() {
    if (!selectedCard) return;
  
    const cardLabelId = `LORCard-label${selectedCard.id.split('-')[2]}`;
    const cardLabel = document.getElementById(cardLabelId);
  
    // Get input values
    const shownInput = document.getElementById('shown').value;
    const turnDrawnInput = document.getElementById('turn-drawn-input').value;
    const manaInput = document.querySelector('.mana-button.active')?.textContent || '';
    const typeInput = document.querySelector('.button.active')?.textContent || '';
    const predictedInput = document.getElementById('predicted').checked ? 'Predicted' : '';
    const reducedCostInput = document.getElementById('reduced-cost-input').value;
    const drawTypeInput = document.querySelector('.button.active')?.textContent || '';
  
    // Construct the card info text
    let cardInfo = '';
    if (shownInput) cardInfo += `${shownInput}<br>`;
    if (turnDrawnInput) cardInfo += `Turn Drawn: ${turnDrawnInput}<br>`;
    if (manaInput) cardInfo += `Mana: ${manaInput}<br>`;
    if (typeInput) cardInfo += `Type: ${typeInput}<br>`;
    if (predictedInput) cardInfo += `${predictedInput}<br>`;
    if (reducedCostInput) cardInfo += `Reduced Cost: ${reducedCostInput}<br>`;
    if (drawTypeInput) cardInfo += `Draw Type: ${drawTypeInput}<br>`;
  
    // Update the card info
    cardLabel.innerHTML = cardInfo;
  
    // Clear the menu and unselect the card
    clearMenu();
  }
  
  // Event listener for card selection
  const cards = document.querySelectorAll('.img-cards');
  cards.forEach(card => {
    card.addEventListener('click', function (e) {
      if (!e.shiftKey) {
        handleCardSelection(card);
      }
    });
  });
  
  // Function to add a new card
  function addCard() {
    const numberOfCards = document.querySelectorAll('.img-cards').length + 1;
    const imgCardDiv = document.createElement('div');
    imgCardDiv.className = 'img-cards';
    imgCardDiv.id = `img-cards-${numberOfCards}`;
  
    const img = document.createElement('img');
    img.src = "Card-Back-Images/Summoner's-Rift.png";
    img.alt = "LOR Card";
    img.style.width = "100%";
    img.style.height = "100%";
    img.onclick = () => cardSelected(`LORCard${numberOfCards}`, `LORCard-label${numberOfCards}`, `img-cards-${numberOfCards}`);
  
    const label = document.createElement('p');
    label.className = 'card-labels';
    label.id = `LORCard-label${numberOfCards}`;
    label.textContent = `Card ${numberOfCards}`;
  
    imgCardDiv.appendChild(img);
    imgCardDiv.appendChild(label);
    cardContainer.appendChild(imgCardDiv);
  
    // Update the event listeners
    setupShiftClickToDelete();
  }
  
  // Event listener for "Add Card" button
  const addButton = document.getElementById('add-card');
  addButton.addEventListener('click', addCard);
  
  // ... (rest of your code) ...
  
  // Run the setup when the DOM is loaded
  document.addEventListener('DOMContentLoaded', function () {
    setupShiftClickToDelete();
  });
  