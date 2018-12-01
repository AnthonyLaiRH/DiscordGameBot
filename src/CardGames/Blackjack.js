class Blackjack{
    constructor(botRef){
        this.currentPlayerIndex = 0;
        this.gameStarted = false;
        this.dealingDeck = new Deck;
        this.readyPlayers = [];
        this.table = [new this.player(botRef.user, botRef.userID)];
    }

    receive(botRef){
        var command = botRef.message.toLowerCase()
        switch (command){
            case "sit":
                this.addPlayer(botRef);
                break;
            case "leave":
                this.removePlayer(botRef);
                break;
        }
        if (!this.gameStarted){
            if (command == "deal" && this.readyPlayers.includes(botRef.userID)){
                this.readyPlayers.push[botRef.userID]
                if (this.readyPlayers.length == this.table.length){
                    this.gameStarted = true;
                    this.dealStartingHand();
                }
            }
        }else if(botRef.userID == this.table[this.currentPlayerIndex].userID){
            if (command == "")

            this.play(command, botRef);
        }

    }

    joinLobby(botRef){
        botRef.bot.sendMessage({
            to: botRef.channelID,
            message: "Welcome to Blackjack! Room" + botRef.channelID,
        });
    }

    addPlayer(botRef){
        var newPlayer = new this.player(botRef.user, botRef.userID);
        if (this.table.length  < 8){
           this.table.push[newPlayer];

            botRef.bot.sendMessage({
                to: botRef.channelID,
                message: "Welcome to Blackjack! Room" + botRef.channelID,
            });
        }else{
            botRef.bot.sendMessage({
                to: botRef.channelID,
                message: "Sorry. Table Currently Full.",
            });
        }
    }

    removePlayer(botRef){
        for( var i = 0; i < this.table.length; i++){ 
            if ( this.table[i] == botRef.userID) {
              this.table.splice(i, 1); 
              break;
            }
        }
        
        botRef.bot.sendMessage({
            to: botRef.channelID,
            message: "Goodbye.",
        });

        return this.table.length;
    }
    
    dealStartingHand(){
        Deck.firstDeal();
        playerTurns(botDef);
    }

    play(action,botRef){
        var hand = this.table[this.currentPlayerIndex].hand;
        var player = this.table[this.currentPlayerIndex];
        Deck.dealCard(hand,player,action);
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
            this.dealerTurn();
        }
    }

    dealerTurn(){
    }

}