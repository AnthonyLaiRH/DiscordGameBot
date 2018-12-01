module.export = class Blackjack{
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