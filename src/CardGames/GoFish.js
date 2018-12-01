var Player = require('./Player.js')

module.exports = class BotData{
    constructor(botRef){
        this.currentPlayerIndex = 0;
        this.gameStarted = false;
        this.readyPlayers = [];
        this.table = [new Player(botRef.user, botRef.userID, null, null)];
        this.maxPlayers = 4;
    }

    start(){
        this.dealingDeck = new Deck();
    }

    receive(){

    }
}