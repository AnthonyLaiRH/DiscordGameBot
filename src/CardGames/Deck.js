
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

function dealCard(array, player){
    if(firstDeal){
        if(array.length !== 0){
            player.cards.push(array[0]);
            array.shift();
        }else{
            console.log("No more cards");
        }
    }else{
        //TODO: need to know rules after first deal
    }
   
}