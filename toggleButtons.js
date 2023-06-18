export function drawCard(/*drawtype*/) {
    //var cardContainer = document.createElement('img-cards');
    //need to implement the container around the card, give it the correct id, etc.
    
    var newCard = document.createElement('img');
    newCard.src = 'Card-Back-Images/Summoner\'s-Rift.png';
    newCard.className = 'img-cards';
    //newCard
    //newCard.setAttribute("src", "Card-Back-Images/Summoner's-Rift.png");
    //newCard.setAttribute('class', 'img-cards');
    document.getElementById('flex-card-image-container').appendChild(newCard);
}

//export { drawCard };