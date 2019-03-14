import { Card } from "./Card";

export class Deck {
    private _cards: Card[];

    constructor() {
        this.cards = [];
        let suit: string[] = ["Heart", "Spade", "Diamond", "Club"];
        let card: string[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        for (var i = 0; i < card.length; i++) {
            for (var j = 0; j < suit.length; j++) {
                this.cards.push(new Card(card[i], suit[j]));
            }
        }
        this.shuffle();
    }

    /**
     * Getter $cards
     * @return {Card[]}
     */
    public get cards(): Card[] {
        return this._cards;
    }

    /**
     * Setter $cards
     * @param {Card[]} value
     */
    public set cards(value: Card[]) {
        this._cards = value;
    }

    public dummyCard() {
        return new Card("0", "Heart");
    }
    public shuffle() {
        let currentIndex: number = this.cards.length,
            temporaryValue: Card, randomIndex: number;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = this.cards[currentIndex];
            this.cards[currentIndex] = this.cards[randomIndex];
            this.cards[randomIndex] = temporaryValue;
        }
    }

    public dealCard() {
        if (this.cards.length > 0) {
            return this.cards.shift();
        } else {
            return null;
        }
    }
}