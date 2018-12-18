var Card = require("./Card.js");

module.exports = class Deck{
    constructor(){
        this.cards = [];
        var suit = ["Heart", "Spade", "Diamond", "Club"];
        var card = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J" ,"Q", "K"];
        for(var i = 0; i < card.length; i++){
            for(var j = 0; j < suit.length; j++){
                this.cards.push(new Card(card[i], suit[j]));
            }
        }
        this.shuffle();
    }
    dummyCard(){
        return new Card("0", "Heart");
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

    dealCard(){
        if (this.cards.length > 0){
            return this.cards.shift();
        }
        else {
            return null;
        }
    }   
}

