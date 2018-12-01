
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function firstDeal(){
    console.log("first deal");
    for(var i = 0; i < 2; i++){
        for(var j = 0; j < players.length; j++){
            if(cards.length !== 0){
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
    if(dealMode == "Hit"){
        console.log("hit")
        if(cards.length !== 0){
            if(player.hands.length != 0){
                player.insertCard(hand, card);
                cards.shift();
            }
            console.log("card inserted")
        }else{
            console.log("No more cards");
        }
    }
    else if(dealMode == "Double"){
        console.log("double");
        if(cards.length !== 0){
            if(player.hands.length != 0){
                player.insertCard(hand, card);
                cards.shift();
            }
            console.log("card inserted");
            if(cards.length !== 0){
                if(player.hands.length != 0){
                    player.insertCard(hand, card);
                    cards.shift();
                }
                console.log("card inserted");
            }else{
                console.log("No more cards");
            }            
        }else{
            console.log("No more cards");
        }
    }    
}