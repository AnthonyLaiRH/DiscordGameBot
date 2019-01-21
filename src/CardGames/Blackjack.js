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
        this.botRef = botRef;
    }

    createPlayer(){
        this.table.push(new Player(this.botRef.user, this.botRef.userID, [], 'player'));
    }

    start(){
        this.gameStarted = true;
        if (this.dealer == null){
            this.dealer = new Player("The Dealer", "", [], "dealer");
        }
        this.table.push(this.dealer);

        this.currentPlayerIndex = 0;
        this.deck = new Deck();
        var msg = "";
        for(var i = 0; i < this.table.length-1; i++){
            msg += this.table[i].user+ "'s hand: ";
            for (var j = 0; j<2; j++){
                this.table[i].hands[0].push(this.deck.dealCard());
                msg += this.table[i].hands[0][j].name + " ";
            }
            msg += "Total value is: " + this.table[i].blackjackHandValue(this.table[i].hands[0]) + "\n";
            //there is a chance that one player gets 21 first hand
            if(this.table[i].blackjackHandValue(this.table[i].hands[0]) == 21 && this.table[i].role != "dealer"){
                this.botRef.bot.sendMessage({
                    to: this.botRef.channelID,
                    message: this.table[i].user + "wins",
                })
                this.reset();
            }

        }

        //dealer's initial turn
        this.table[this.table.length-1].hands[0].push(this.deck.dealCard());
        this.table[this.table.length-1].hands[0][0].flip(); //flip a card for dealer so only one is shown
        this.table[this.table.length-1].hands[0].push(this.deck.dealCard());
        msg += "The Dealer's hand (shown cards only): " + this.table[this.table.length-1].blackjackHandValue(this.table[this.table.length-1].hands[0]) + "\n";

        this.botRef.bot.sendMessage({
            to: this.botRef.channelID,
            message: msg,
        });
    }

    receive(){
        var command = this.botRef.message.toLowerCase()
        if(this.botRef.userID == this.table[this.currentPlayerIndex].userID){
            if (command == "stand"){
                this.currentPlayerIndex++;
                if (this.currentPlayerIndex >= this.table.length-1){
                    this.dealerTurn();
                }
            }else if (command == "hit" || command == "double"
                    || command == "split"){
                this.play(command);
            }
        }
    }

    play(action){
        var player = this.table[this.currentPlayerIndex];
        //player chooses to hit, and continues to hit until player decides to stand
        if(action === "hit"){
            this.hit(player);
        }
    
        //player stands, go to next player's turn or dealer's turn
        else if(action === "stand"){
            this.stand();
        }

        else if(action === "split"){
            this.split(player);
        }
        
        console.log(this.table.length);
       
    }

    hit(player){
        if(!player.isSplit){
            player.hands[0].push(this.deck.dealCard());
            console.log("hit: " + player.hands[0][player.hands[0].length-1].name + "\n");
            if (player.blackjackHandValue(player.hands[0]) > 21){
                this.botRef.bot.sendMessage({
                    to: this.botRef.channelID,
                    message: "Bust!",
                });

                if(this.table.length == 2){
                    this.botRef.bot.sendMessage({
                    to: this.botRef.channelID,
                    message: "Dealer wins",
                });
                this.reset();
                }
            }
            else{
                var msg = "Your hand is: ";
                for(var i = 0; i < player.hands[0].length; i++){
                    msg += player.hands[0][i].name + " ";
                }
                msg += "Total value is: " + player.blackjackHandValue(player.hands[0]);
                this.botRef.bot.sendMessage({
                    to: this.botRef.channelID,
                    message: msg,
                });
            }
        }else{
            if(!player.isStand){
                player.hands[0].push(this.deck.dealCard());
                var msg = "";
                for(var i = 0; i < player.hands[0].length; i++){
                    msg += player.hands[0][i].name + " ";
                }
                msg += "Total value is: " + player.blackjackHandValue(player.hands[0]);

                this.botRef.bot.sendMessage({
                    to: this.botRef.channelID,
                    message: "Now dealing cards to your first hand: " + msg,
                });
               
                
            }else{
                player.hands[1].push(this.deck.dealCard());
                var msg = "";
                for(var i = 0; i < player.hands[1].length; i++){
                    msg += player.hands[1][i].name + " ";
                }
                msg += "Total value is: " + player.blackjackHandValue(player.hands[1]);

                this.botRef.bot.sendMessage({
                    to: this.botRef.channelID,
                    message: "Now dealing cards to your second hand: " + msg,
                });
                
            }

        }
    }
    

    stand(){
        this.table[currentPlayerIndex].isStand = true;
        if(!this.table[currentPlayerIndex].isSplit){
            this.currentPlayerIndex++;
            if (this.currentPlayerIndex >= this.table.length-1){
                this.botRef.bot.sendMessage({
                    to: this.botRef.channelID,
                    message: "Dealer\'s turn",
                });
                this.dealerTurn();
            }else{
                this.botRef.bot.sendMessage({
                    to: this.botRef.channelID,
                    message: this.table[currentPlayerIndex].user + "\'s turn",
                });
            }
        }
    }

    split(player){
        var card = player.hands[0].pop();
        player.hands[1].push(card);
        player.isSplit = true;
        this.botRef.bot.sendMessage({
            to: this.botRef.channelID,
            message: player.user + "\'s first hand value: " + player.blackjackHandValue(player.hands[0]) + "\n"
            + player.user + "\'s second hand value: "  + player.blackjackHandValue(player.hands[1]),
        });
    }

    dealerTurn(){
        while(this.dealer.blackjackHandValue(this.dealer.hands[0]) < 17){
            this.dealer.hands[0].push(this.deck.dealCard());
        }
        this.determineWinners(this.botRef);
        this.currentPlayerIndex = 0;
    }

    determineWinners(){
        var dealerHand = this.dealer.blackjackHandValue(this.dealer.hands[0]);
        var winners = [];
        var winner = "";
        if (dealerHand > 21){
            this.botRef.bot.sendMessage({
                to: this.botRef.channelID,
                message: "Dealer busted!\n" + this.botRef.user + " wins."
            });
            this.reset();
        }
        else {
            winners.push(this.dealer);
        }
        for(var i = 0; i < this.table.length-1; i++){
            var playerHand = this.table[i].blackjackHandValue(this.table[i].hands[0]);
            if (playerHand <= 21){
                if (playerHand > winners[0].blackjackHandValue(winners[0].hands[0])){
                    winners = [this.table[i]];
                }
                else if (playerHand == winners[0].blackjackHandValue(winners[0].hands[0])){
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
            winner += " " + this.table[i].user + " has " + this.table[i].blackjackHandValue(this.table[i].hands[0]).toString() + "."
        }

        this.botRef.bot.sendMessage({
            to: this.botRef.channelID,
            message: winner,
        });

        this.reset();
    }

    reset(){
        for (var i = 0; i<this.table.length; i++){
            this.table[i].clearHand();
        }
        this.gameStarted = false;
        this.isStand = false;
        this.isSplit = false;
        this.readyPlayers = [];
        this.table.splice(this.table.length-1, 1);
    }
}