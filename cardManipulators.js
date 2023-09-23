function drawCard(/*drawtype*/) {
    //need to implement the container around the card, give it the correct id, etc.
    
    var newCard = document.createElement('img');
    newCard.src = 'Card-Back-Images/Summoner\'s-Rift.png';
    newCard.className = 'img-cards';
    document.getElementById('flex-card-image-container').appendChild(newCard);
  }