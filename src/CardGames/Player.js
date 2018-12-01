module.exports = class Player{
    constructor(user, userID, cards, role){
        this.user = user;
        this.userID = userID;
        this.cards = cards;
        this.hands = [];
        this.ready = false;
        this.role = role;
        this.bet = 2;
        this.numberOfWins = 0;
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