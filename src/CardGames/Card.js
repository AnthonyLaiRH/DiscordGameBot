module.exports = class Card{
    constructor(value, suit){
        this.value = value;
        this.suit = suit;
        this.shown = false;
    }

    flip(){
        this.shown = !this.shown;
    }
}