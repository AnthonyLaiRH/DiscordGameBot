var Card = require("./Card.js");

module.exports = class Deck{
    constructor(players){
        this.players = players;
        this.cards = [];
        var suit = ["Heart", "Spade", "Diamond", "Club"];
        var value = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
        var card = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J" ,"Q", "K"];
        for(var i = 0; i < card.length; i++){
            for(var j = 0; j < suit.length; j++){
                this.cards.push(new Card(value[i], card[i], suit[j]));
            }
        }
        this.shuffle();
    }

    shuffle() {
        var currentIndex = this.cards.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = this.cards[currentIndex];
          this.cards[currentIndex] = this.cards[randomIndex];
          this.cards[randomIndex] = temporaryValue;
        }
    }
    
    firstDeal(){
        console.log("first deal");
        for(var i = 0; i < 2; i++){
            for(var j = 0; j < this.players.length; j++){
                if(this.cards.length != 0){
                    var card = this.cards.shift();
                    if(i == 1){
                        if(card.name == "A"){
                            if(this.players[j].hands[0][i-1].value + 11 > 21){
                                card.value = 1;
                            }
                        }

                        if(this.players[j].role.toUpperCase() == "PLAYER"){
                            card.flip();
                        }
                    }
                    this.players[j].insertCard(this.players[j].hands[0],card);
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
            if(this.cards.length != 0){
                var card = this.cards.shift();
                if(player.hands.length != 0){
                    if(card.name == "A"){
                        if(hand[hand.length-1].value + 11 > 21){
                            card.value = 1;
                        }
                    }
                    card.flip();
                    player.insertCard(hand, card);
                    console.log("card inserted");
                }
                /*
                else{
                    if(card.name == "A"){
                        if(player.cards[player.hands[0].length-1].value + 11 > 21){
                            card.value = 1;
                        }
                    }
                    card.flip();
                    player.insertCard(hand, card);
                    console.log("card inserted");
                }
                */
            }else{
                console.log("No more cards");
            }
        }
        else if(dealMode.toUpperCase() == "DOUBLE"){
            console.log("double");
            //first card
            if(this.cards.length != 0){
                var card = this.cards.shift();
                if(player.hands.length != 0){
                    if(card1.name == "A"){
                        if(hand[hand.length-1].value + 11 > 21){
                            card.value = 1;
                        }
                    }
                    card.flip();
                    player.insertCard(hand, card);    
                    console.log("card inserted");
                }else{
                    if(card1.name == "A"){
                        if(player.cards[player.hands[0].length-1].value + 11 > 21){
                            card.value = 1;
                        }
                    }
                    card.flip();
                    player.insertCard(hand,card)
                    console.log("card inserted");
                }
                player.bet *= 2;
            }else{
                console.log("No more cards");
            }
        }
    }   
}

