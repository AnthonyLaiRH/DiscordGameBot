module.exports = class Card{
    constructor(name, suit){
        this.name = name;
        this.suit = suit;
        this.shown = false;
    }

    flip(){
        this.shown = !this.shown;
    }
}