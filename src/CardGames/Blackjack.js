module.export = class Blackjack{
    constructor(botRef){
        this.currentPlayerIndex = 0;
        this.maxPlayers = 8;
        this.gameStarted = false;
        this.dealingDeck;
        this.readyPlayers = [];
        this.table = [new this.player(botRef.user, botRef.userID)];
    }
    start(botRef){
        this.dealer = new Player("the Dealer", "", null, "dealer");
        this.table.push(this.dealer);
        this.deck = new Deck(this.table);
        this.gameStarted = true;
        Deck.firstDeal();
        this.dealer = this.table.return(this.table.length-1);
    }
    receive(botRef){
        var command = botRef.message.toLowerCase()
        if(botRef.userID == this.table[this.currentPlayerIndex].userID){
            if (command == "stand"){
                this.currentPlayerIndex++;

                if (this.currentPlayerIndex >= this.table.length){
                    this.dealerTurn();
                }
            }else if (command == "hit" || command == "double"
                    || command == "split"){
                this.play(command, botRef);
            }
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

        if (this.currentPlayerIndex >= this.table.length){
            this.dealerTurn();
        }

    }

    dealerTurn(){
        if(this.dealer.handValue() < 17){
            Deck.dealCard(this.dealer.hand, this.dealer, "hit");
        }else{
            this.determinWinners();
            this.currentPlayerIndex = 0;
        }
    }

    determinWinners(){
        for(i = 0; i < this.table.length; i++){
            if (this.table[i].handValue() > this.dealer.handValue()){
                //Player wins
                this.table[i].numberOfWins ++;
            }else if (this.table[i].handValue() < this.dealer.handValue()){
                //Dealer wins
                this.dealer.numberOfWins++;
            }else if (this.table[i].handValue() == this.dealer.handValue()){
                //push
            }
        }
    }
}