module.export = class Blackjack{
    constructor(botRef){
        this.currentPlayerIndex = 0;
        this.gameStarted = false;
        this.dealingDeck = new Deck;
        this.readyPlayers = [];
        this.table = [new this.player(botRef.user, botRef.userID)];
    }
    start(botRef){
        this.dealStartingHand();
        this.gameStarted = true;
        Deck.firstDeal();
        playerTurns(botRef);
    }
    receive(botRef){
        var command = botRef.message.toLowerCase()

        if(botRef.userID == this.table[this.currentPlayerIndex].userID){
            if (command == "")

            this.play(command, botRef);
        }

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

    }

    dealerTurn(){

    }

}