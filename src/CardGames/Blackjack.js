var Player = require('./Player.js')
var Deck = require('./Deck.js')
var Card = require
module.exports = class Blackjack{
    constructor(botRef){
        this.maxPlayers = 8;
        this.gameStarted = false;
        this.readyPlayers = [];
        this.table = [new Player(botRef.user, botRef.userID, [], "player")];
        this.dealer = null;
    }

    createPlayer(botRef){
        this.table.push(new Player(botRef.user, botRef.userID, [], 'player'));
    }

    start(botRef){
        if (this.dealer == null){
            this.dealer = new Player("The Dealer", "", [], "dealer");
            this.table.push(this.dealer);
        }
        this.currentPlayerIndex = 0;
        this.deck = new Deck();
        this.gameStarted = true;
        var msg = "";
        for(var i = 0; i < this.table.length; i++){
            for (var j = 0; j<2; j++){
                this.table[i].hands[0].push(this.deck.dealCard());
            }
            msg += this.table[i].user+ "'s hand: " + this.table[i].blackjackHandValue();

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
        if (action == "hit"){
            player.hands[0].push(this.deck.dealCard());
            if (player.blackjackHandValue() > 21){
                botRef.bot.sendMessage({
                    to: botRef.channelID,
                    message: "Bust!",
                });
                this.currentPlayerIndex++;
            }
        }
        botRef.bot.sendMessage({
            to: botRef.channelID,
            message: player.blackjackHandValue(),
        });
        console.log(this.table.length);
        if (this.currentPlayerIndex >= this.table.length-1){
            this.dealerTurn(botRef);
        }
    }

    dealerTurn(botRef){
        while(this.dealer.blackjackHandValue() < 17){
            this.dealer.hands[0].push(this.deck.dealCard());
        }
        this.determineWinners(botRef);
        this.currentPlayerIndex = 0;
    }

    determineWinners(botRef){
        var dealerHand = this.dealer.blackjackHandValue();
        var winners = [];
        var winner = "";
        if (dealerHand > 21){
            winners = [new Player("Dummy", "", [], 'player')];
            winners[0].hands[0].push(this.deck.dummyCard());
            console.log(winners[0].blackjackHandValue());
        }
        else {
            winners = [this.dealer];
        }
        for(var i = 0; i < this.table.length-1; i++){
            var playerHand = this.table[i].blackjackHandValue();
            if (playerHand <= 21){
                if (playerHand > winners[0].blackjackHandValue()){
                    winners = [this.table[i]];
                }
                else if (playerHand == winners[0].blackjackHandValue() && winners[0].role == 'player'){
                    winners.push(this.table[i]);
                }
            }
        }
        if (winners.length > 1){
            winner = "Draw.";
        }
        else if (winners[0].role == 'player'){
            winner = winners[0].user + " wins.";
        }
        else {
            winner = "Dealer wins.";
        }
        for(var i = 0; i < this.table.length; i++){
            winner += " " + this.table[i].user + " has " + this.table[i].blackjackHandValue().toString() + "."
        }

        botRef.bot.sendMessage({
            to: botRef.channelID,
            message: winner,
        });

        this.reset(botRef);
    }

    reset(botRef){
        for (var i = 0; i<this.table.length; i++){
            this.table[i].clearHand();
        }
        this.gameStarted = false;
        this.readyPlayers = [];
    }
}