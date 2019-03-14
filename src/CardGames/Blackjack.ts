import { Player } from './Player';
import { Deck } from './Deck';
import { Card } from './Card';
import { BotData } from '../BotData';

export class Blackjack {
    private _maxPlayers: number;
    private _gameStarted: boolean;
    private _readyPlayers: Player[];
    private _table: Player[];
    private _dealer: Player;
    private _botRef: BotData;

    private _currentPlayerIndex: number;
    private _deck: Deck;

    constructor(botRef: BotData) {
        this._maxPlayers = 8;
        this._gameStarted = false;
        this._readyPlayers = [];
        this._table = [new Player(botRef.user, botRef.userID, [], "player")];
        this._dealer = null;
        this._botRef = botRef;
    }

    createPlayer() {
        this._table.push(new Player(this._botRef.user, this._botRef.userID, [], 'player'));
    }

    start() {
        this._gameStarted = true;
        if (this._dealer == null) {
            this._dealer = new Player("The Dealer", "", [], "dealer");
        }
        this._table.push(this._dealer);

        this._currentPlayerIndex = 0;
        this._deck = new Deck();
        var msg = "";
        for (var i = 0; i < this._table.length - 1; i++) {
            msg += this._table[i].user + "'s hand: ";
            for (var j = 0; j < 2; j++) {
                this._table[i].hands[0].push(this._deck.dealCard());
                msg += this._table[i].hands[0][j].name + " ";
            }
            msg += "Total value is: " + this._table[i].blackjackHandValue(this._table[i].hands[0]) + "\n";
            //there is a chance that one player gets 21 first hand
            if (this._table[i].blackjackHandValue(this._table[i].hands[0]) == 21 && this._table[i].role != "dealer") {
                this._botRef.channelID.send(this._table[i].user + " wins");
                this.reset();
            }

        }

        //dealer's initial turn
        this._table[this._table.length - 1].hands[0].push(this._deck.dealCard());
        this._table[this._table.length - 1].hands[0][0].flip(); //flip a card for dealer so only one is shown
        this._table[this._table.length - 1].hands[0].push(this._deck.dealCard());
        msg += "The Dealer's hand (shown cards only): " + this._table[this._table.length - 1].blackjackHandValue(this._table[this._table.length - 1].hands[0]) + "\n";

        this._botRef.channelID.send(msg);
    }

    receive() {
        var command = this._botRef.message.toLowerCase()
        if (this._botRef.userID == this._table[this._currentPlayerIndex].userID) {
            if (command == "stand") {
                this._currentPlayerIndex++;
                if (this._currentPlayerIndex >= this._table.length - 1) {
                    this.dealerTurn();
                }
            } else if (command == "hit" || command == "double"
                || command == "split") {
                this.play(command);
            }
        }
    }

    play(action) {
        var player = this._table[this._currentPlayerIndex];
        //player chooses to hit, and continues to hit until player decides to stand
        if (action === "hit") {
            this.hit(player);
        }

        //player stands, go to next player's turn or dealer's turn
        else if (action === "stand") {
            this.stand();
        }

        else if (action === "split") {
            this.split(player);
        }

        console.log(this._table.length);

    }

    hit(player) {
        if (!player.isSplit) {
            player.hands[0].push(this._deck.dealCard());
            console.log("hit: " + player.hands[0][player.hands[0].length - 1].name + "\n");
            if (player.blackjackHandValue(player.hands[0]) > 21) {
                this._botRef.channelID.send("Bust!");

                if (this._table.length == 2) {
                    this._botRef.channelID.send("Dealer wins");
                    this.reset();
                }
            }
            else {
                var msg = "Your hand is: ";
                for (var i = 0; i < player.hands[0].length; i++) {
                    msg += player.hands[0][i].name + " ";
                }
                msg += "Total value is: " + player.blackjackHandValue(player.hands[0]);
                this._botRef.channelID.send(msg);
            }
        } else {
            if (!player.isStand) {
                player.hands[0].push(this._deck.dealCard());
                var msg = "";
                for (var i = 0; i < player.hands[0].length; i++) {
                    msg += player.hands[0][i].name + " ";
                }
                msg += "Total value is: " + player.blackjackHandValue(player.hands[0]);

                this.botRef.channelID.send("Now dealing cards to your first hand: " + msg);


            } else {
                player.hands[1].push(this._deck.dealCard());
                var msg = "";
                for (var i = 0; i < player.hands[1].length; i++) {
                    msg += player.hands[1][i].name + " ";
                }
                msg += "Total value is: " + player.blackjackHandValue(player.hands[1]);

                this._botRef.channelID.send("Now dealing cards to your second hand: " + msg);

            }

        }
    }


    stand() {
        this.table[currentPlayerIndex].isStand = true;
        if (!this.table[currentPlayerIndex].isSplit) {
            this.currentPlayerIndex++;
            if (this.currentPlayerIndex >= this.table.length - 1) {
                this.botRef.channelID.send("Dealer\'s turn");
                this.dealerTurn();
            } else {
                this.botRef.channelID.send(this.table[currentPlayerIndex].user + "\'s turn");
            }
        }
    }

    split(player) {
        var card = player.hands[0].pop();
        player.hands[1].push(card);
        player.isSplit = true;
        this.botRef.channelID.send(player.user + "\'s first hand value: " + player.blackjackHandValue(player.hands[0]) + "\n"
            + player.user + "\'s second hand value: " + player.blackjackHandValue(player.hands[1]));
    }

    dealerTurn() {
        while (this.dealer.blackjackHandValue(this.dealer.hands[0]) < 17) {
            this.dealer.hands[0].push(this.deck.dealCard());
        }
        this.determineWinners(this.botRef);
        this.currentPlayerIndex = 0;
    }

    determineWinners() {
        var dealerHand = this.dealer.blackjackHandValue(this.dealer.hands[0]);
        var winners = [];
        var winner = "";
        if (dealerHand > 21) {
            this.botRef.channelID.send("Dealer busted!\n" + this.botRef.user + " wins.");
            this.reset();
        }
        else {
            winners.push(this.dealer);
        }
        for (var i = 0; i < this.table.length - 1; i++) {
            var playerHand = this.table[i].blackjackHandValue(this.table[i].hands[0]);
            if (playerHand <= 21) {
                if (playerHand > winners[0].blackjackHandValue(winners[0].hands[0])) {
                    winners = [this.table[i]];
                }
                else if (playerHand == winners[0].blackjackHandValue(winners[0].hands[0])) {
                    winners.push(this.table[i]);
                }
            }
        }
        if (winners.length > 1) {
            winner = "Draw.";
        }
        else {
            winner = "Dealer wins.";
        }
        for (var i = 0; i < this.table.length; i++) {
            winner += " " + this.table[i].user + " has " + this.table[i].blackjackHandValue(this.table[i].hands[0]).toString() + "."
        }

        this.botRef.channelID.send(winner);

        this.reset();
    }

    reset() {
        for (var i = 0; i < this.table.length; i++) {
            this.table[i].clearHand();
        }
        this.gameStarted = false;
        this.isStand = false;
        this.isSplit = false;
        this.readyPlayers = [];
        this.table.splice(this.table.length - 1, 1);
    }
}