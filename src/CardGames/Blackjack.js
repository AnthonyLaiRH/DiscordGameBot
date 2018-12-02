var Player = require('./Player.js')
var Deck = require('./Deck.js')

module.exports = class Blackjack{
    constructor(botRef){
        this.currentPlayerIndex = 0;
        this.maxPlayers = 8;
        this.gameStarted = false;
        this.dealingDeck;
        this.readyPlayers = [];
        this.table = [new Player(botRef.user, botRef.userID, [], "")];
    }

    createPlayer(botRef){return new Player(botRef.user, botRef.userID, [], 'player')}
    start(botRef){
        this.dealer = new Player("the Dealer", "", [], "dealer");
        this.table.push(this.dealer);
        this.deck = new Deck(this.table);
        this.gameStarted = true;
        this.deck.firstDeal();
        var msg = "";
        for(var i = 0; i < this.table.length; i++){
            msg += this.table[i].user+ "'s hand: " + this.table[i].handValue();

        }
        botRef.bot.sendMessage({
                                    to: botRef.channelID,
                                    message: msg,
                                });
        this.dealer = this.table[this.table.length-1];
    }
    receive(botRef){
        var command = botRef.message.toLowerCase()
        if(botRef.userID == this.table[this.currentPlayerIndex].userID){
            if (command == "stand"){
                this.currentPlayerIndex++;
                if (this.currentPlayerIndex >= this.table.length-1){
                    this.dealerTurn(botRef);
                }
            }else if (command == "hit" || command == "double"
                    || command == "split"){
                this.play(command, botRef);
            }
        }
    }

    play(action,botRef){
        var hand = this.table[this.currentPlayerIndex].hands[0];
        var player = this.table[this.currentPlayerIndex];
        this.deck.dealCard(hand,player,action);
        if (player.handValue() > 21){
            botRef.bot.sendMessage({
                to: botRef.channelID,
                message: "Bust!",
            });
            this.currentPlayerIndex++;
        }else if (player.handValue() == 21){
            botRef.bot.sendMessage({
                to: botRef.channelID,
                message: "21!",
            });
            this.currentPlayerIndex++;
        }else{
            botRef.bot.sendMessage({
                to: botRef.channelID,
                message: player.handValue(),
            });
        }

        if (this.currentPlayerIndex >= this.table.length){
            this.dealerTurn(botRef);
        }

    }

    dealerTurn(botRef){
        while(this.dealer.handValue() < 17){
            this.deck.dealCard(this.dealer.hands[0], this.dealer, "hit");
        }
        this.determinWinners(botRef);
        this.currentPlayerIndex = 0;
    }

    determinWinners(botRef){
        for(var i = 0; i < this.table.length-1; i++){
        var winner;
            if (this.table[i].handValue() > this.dealer.handValue()){
                //Player wins
                console.log("here1");
                console.log(botRef.channelID);
                this.table[i].numberOfWins ++;
                winner = 'player';
            }else if (this.table[i].handValue() < this.dealer.handValue()){
                //Dealer wins
                console.log('here2');
                console.log(botRef.channelID);
                this.dealer.numberOfWins++;
                winner = 'dealer';
            }else if (this.table[i].handValue() == this.dealer.handValue()){
                //push
                console.log("here3")
                console.log(botRef.channelID)
                winner = 'draw';
            }
            botRef.bot.sendMessage({
                to: botRef.channelID,
                message: (winner + ". " + this.table[i].user + " " + this.table[i].handValue().toString() + ", dealer " + this.dealer.handValue()),
            });
        }
    }
}