module.exports = class Player{
    constructor(user, userID, cards, role){
        this.user = user;
        this.userID = userID;
        this.cards = cards;
        this.hands = [[],[]];
        this.ready = false;
        this.role = role;
        this.bet = 2;
        this.numberOfWins = 0;
    }

    //insertCard(card){
        //this.cards.push(card);
    //}

    insertCard(hand, card){
        hand.push(card);
    }

    split(){
        this.hands.push(this.cards[0]);
        this.hands.push(this.cards[1]);
    }
    
    clearHand(){
        this.hands = [[],[]];
    }

    blackjackHandValue(){
        var value = 0;
        var aces = 0;
        for(var i = 0; i < this.hands[0].length; i++){
            var cardName = this.hands[0][i].name;
            console.log(cardName);
            if (cardName=="A"){
                aces++;
                value+=11;
            }
            else if (cardName == "J" || cardName == "Q" || cardName == "K"){
                value += 10;
            }
            else{
                value += parseInt(cardName);
            }
        }
        while (aces > 0 && value > 21){
            aces -= 1;
            value -= 10;
        }
        return value;
    }
}