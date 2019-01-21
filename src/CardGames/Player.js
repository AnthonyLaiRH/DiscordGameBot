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
        this.isSplit = false;
        this.isStand = false;
    }

    //insertCard(card){
        //this.cards.push(card);
    //}

    insertCard(hand, card){
        hand.push(card);
    }

    clearHand(){
        this.hands = [[],[]];
    }

    blackjackHandValue(hand){
        var value = 0;
        var aces = 0;
        for(var i = 0; i < hand.length; i++){
            if(hand[i].shown){
                var cardName = hand[i].name;
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
        }
        while (aces > 0 && value > 21){
            aces -= 1;
            value -= 10;
        }
        return value;
    }
}