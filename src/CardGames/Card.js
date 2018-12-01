module.exports = class Card{
    constructor(value, name, suit){
        this.value = value;
        this.name = name;
        this.suit = suit;
        this.shown = false;
    }

    flip(){
        this.shown = !this.shown;
    }
}