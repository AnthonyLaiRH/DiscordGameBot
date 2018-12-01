
function shuffle() {
    var currentIndex = cards.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }
}

function firstDeal(){
    console.log("first deal");
    for(var i = 0; i < 2; i++){
        for(var j = 0; j < players.length; j++){
            if(cards.length != 0){
                players[j].insertCard(card);
                cards.shift();
                console.log("card inserted")
            }else{
                console.log("No more cards");
            }
        }
    }
}

function dealCard(hand, player, dealMode){
    if(dealMode.toUpperCase() == "HIT"){
        console.log("hit")
        if(cards.length != 0){
            if(player.hands.length != 0){
                player.insertCard(hand, card);
                cards.shift();
                console.log("card inserted");
            }
            
        }else{
            console.log("No more cards");
        }
    }
    else if(dealMode.toUpperCase() == "DOUBLE"){
        console.log("double");
        if(cards.length != 0){
            if(player.hands.length != 0){
                player.insertCard(hand, card);
                cards.shift();
                console.log("card inserted");
            }
            
            if(cards.length !== 0){
                if(player.hands.length != 0){
                    player.insertCard(hand, card);
                    cards.shift();
                    console.log("card inserted");
                }
                
            }else{
                console.log("No more cards");
            }            
        }else{
            console.log("No more cards");
        }
    }    
}