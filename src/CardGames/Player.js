exports = class Player{
    constructor(user, userID, cards){
        this.user = user;
        this.userID = userID;
        this.cards = cards;
    }

    insertCard(card){
        this.cards.push(card);
    }
}