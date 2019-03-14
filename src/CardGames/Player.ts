import { Card } from './Card';

export class Player {
    private _user: string;
    private _userID: string;
    private _cards: Card[];

    private _role: string;
    private _hands: any[];

    private _ready: boolean;
    private _bet: number;
    private _numberOfWins: number;
    private _isSplit: boolean;
    private _isStand: boolean;

    constructor(user: string, userID: string, cards: Card[], role: string) {
        this._user = user;
        this._userID = userID;
        this._cards = cards;
        this._hands = [
            [],
            []
        ];
        this._ready = false;
        this._role = role;
        this._bet = 2;
        this._numberOfWins = 0;
        this._isSplit = false;
        this._isStand = false;
    }

    /**
     * Getter user
     * @return {string}
     */
    public get user(): string {
        return this._user;
    }

    /**
     * Getter userID
     * @return {string}
     */
    public get userID(): string {
        return this._userID;
    }

    /**
     * Getter cards
     * @return {Card[]}
     */
    public get cards(): Card[] {
        return this._cards;
    }

    /**
     * Getter role
     * @return {string}
     */
    public get role(): string {
        return this._role;
    }

    /**
     * Getter hands
     * @return {any[]}
     */
    public get hands(): any[] {
        return this._hands;
    }

    /**
     * Getter ready
     * @return {boolean}
     */
    public get ready(): boolean {
        return this._ready;
    }

    /**
     * Getter bet
     * @return {number}
     */
    public get bet(): number {
        return this._bet;
    }

    /**
     * Getter numberOfWins
     * @return {number}
     */
    public get numberOfWins(): number {
        return this._numberOfWins;
    }

    /**
     * Getter isSplit
     * @return {boolean}
     */
    public get isSplit(): boolean {
        return this._isSplit;
    }

    /**
     * Getter isStand
     * @return {boolean}
     */
    public get isStand(): boolean {
        return this._isStand;
    }

    /**
     * Setter user
     * @param {string} value
     */
    public set user(value: string) {
        this._user = value;
    }

    /**
     * Setter userID
     * @param {string} value
     */
    public set userID(value: string) {
        this._userID = value;
    }

    /**
     * Setter cards
     * @param {Card[]} value
     */
    public set cards(value: Card[]) {
        this._cards = value;
    }

    /**
     * Setter role
     * @param {string} value
     */
    public set role(value: string) {
        this._role = value;
    }

    /**
     * Setter hands
     * @param {any[]} value
     */
    public set hands(value: any[]) {
        this._hands = value;
    }

    /**
     * Setter ready
     * @param {boolean} value
     */
    public set ready(value: boolean) {
        this._ready = value;
    }

    /**
     * Setter bet
     * @param {number} value
     */
    public set bet(value: number) {
        this._bet = value;
    }

    /**
     * Setter numberOfWins
     * @param {number} value
     */
    public set numberOfWins(value: number) {
        this._numberOfWins = value;
    }

    /**
     * Setter isSplit
     * @param {boolean} value
     */
    public set isSplit(value: boolean) {
        this._isSplit = value;
    }

    /**
     * Setter isStand
     * @param {boolean} value
     */
    public set isStand(value: boolean) {
        this._isStand = value;
    }

    insertCard(hand, card) {
        hand.push(card);
    }

    clearHand() {
        this._hands = [
            [],
            []
        ];
    }

    blackjackHandValue(hand) {
        var value = 0;
        var aces = 0;
        for (var i = 0; i < hand.length; i++) {
            if (hand[i].shown) {
                var cardName = hand[i].name;
                console.log(cardName);
                if (cardName == "A") {
                    aces++;
                    value += 11;
                } else if (cardName == "J" || cardName == "Q" || cardName == "K") {
                    value += 10;
                } else {
                    value += parseInt(cardName);
                }
            }
        }
        while (aces > 0 && value > 21) {
            aces -= 1;
            value -= 10;
        }
        return value;
    }
}