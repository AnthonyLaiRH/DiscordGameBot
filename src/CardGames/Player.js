module.exports = class Player{
    constructor(user, userID, cards){
        this.user = user;
        this.userID = userID;
        this.cards = cards;
        this.hands = [];
        this.ready = false;
    }

    insertCard(card){
        this.cards.push(card);
    }

    insertCard(hand, card){
        hand.push(card);
    }

    split(){
        this.hands.push(this.cards[0]);
        this.hands.push(this.cards[1]);
    }
    
    clearHand(){
        this.hands = [];
    }
}