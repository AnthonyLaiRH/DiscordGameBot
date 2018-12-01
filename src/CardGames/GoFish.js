module.exports = class BotData{
    constructor(botRef){
        this.currentPlayerIndex = 0;
        this.gameStarted = false;
        this.dealingDeck = new Deck;
        this.readyPlayers = [];
        this.table = [new this.player(botRef.user, botRef.userID)];
        this.maxPlayers = 2;
    }

    start(){

    }

    receive{

    }
}