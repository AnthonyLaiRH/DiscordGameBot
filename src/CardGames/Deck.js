var Card = require("./Card");

exports = class Deck{
    constructor(players){
        this.players = players;
        this.cards = [];
        var suit = ["Heart", "Spade", "Diamond", "Club"];
        var card = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10,"J" ,"Q", "K"];
        for(var i = 0; i < card.length; i++){
            for(var j = 0; j < suit.length; j++){
                cards.push(new Card(card, suit));
            }
        }
        this.shuffle();
    }

    shuffle() {
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
    
    firstDeal(){
        console.log("first deal");
        for(var i = 0; i < 2; i++){
            for(var j = 0; j < players.length; j++){
                if(cards.length != 0){
                    players[j].insertCard(cards.shift());
                    console.log("card inserted")
                }else{
                    console.log("No more cards");
                }
            }
        }
    }
    
    dealCard(hand, player, dealMode){
        if(dealMode.toUpperCase() == "HIT"){
            console.log("hit")
            if(cards.length != 0){
                if(player.hands.length != 0){
                    player.insertCard(hand, cards.shift());
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
                    player.insertCard(hand, cards.shift());
                    console.log("card inserted");
                }
                
                if(cards.length !== 0){
                    if(player.hands.length != 0){
                        player.insertCard(hand, cards.shift());
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
}

