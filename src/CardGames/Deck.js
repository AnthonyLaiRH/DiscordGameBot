var Card = require("./Card");

exports = class Deck{
    constructor(players){
        this.players = players;
        this.cards = [];
        var suit = ["Heart", "Spade", "Diamond", "Club"];
        var value = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
        var card = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J" ,"Q", "K"];
        for(var i = 0; i < card.length; i++){
            for(var j = 0; j < suit.length; j++){
                cards.push(new Card(value, card, suit));
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
                    if(player[j].cards[i].name == "A"){
                        if(i == 1 && player[j].cards[i-1].value + 11 > 21){
                            player[j].cards[i].value = 1;
                        }
                    }
                    console.log("card inserted");
                }else{
                    console.log("No more cards");
                }
            }
        }
    }
    
    dealCard(hand, player, dealMode){
        if(dealMode.toUpperCase() == "HIT"){
            console.log("hit");
            if(cards.length != 0){
                var card = cards.shift();
                if(player.hands.length != 0){
                    if(card.name == "A"){
                        if(hand[hand.length-1].value + 11 > 21){
                            card.value = 1;
                        }
                    }
                    player.insertCard(hand, card);
                    console.log("card inserted");
                }
                else{
                    if(card.name == "A"){
                        if(player.cards[player.cards.length-1].value + 11 > 21){
                            card.value = 1;
                        }
                    }
                    player.insertCard(hand, card);
                    console.log("card inserted");
                }
                
            }else{
                console.log("No more cards");
            }
        }
        else if(dealMode.toUpperCase() == "DOUBLE"){
            console.log("double");
            //first card
            if(cards.length != 0){
                var card1 = cards.shift();
                if(player.hands.length != 0){
                    if(card1.name == "A");
                        if(hand[hand.length-1].value + 11 > 21){
                            card1.value = 1;
                        }
                    }
                    player.insertCard(hand, card1);    
                    console.log("card inserted");
                }else{
                    if(card1.name == "A"){
                        if(player.cards[player.cards.length-1].value + 11 > 21){
                            card1.value = 1;
                        }
                    }
                    player.insertCard(card1)
                    console.log("card inserted");
                }
                
                //second card
                if(cards.length !== 0){
                    var card2 = cards.shift();
                    if(player.hands.length != 0){
                        if(card2 == "A"){
                            if(hand[hand.length-1].value + 11 > 21){
                                card2.value = 1;
                            }
                        }
                        player.insertCard(hand, card2);
                        console.log("card inserted");
                    }
                    else{
                        if(card2 == "A"){
                            if(player.cards[player.cards.length-1].value + 11 > 21){
                                card2.value = 1;
                            }
                        }
                        player.insertCard(hand, card2);
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

