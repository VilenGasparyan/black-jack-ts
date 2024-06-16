import { CardValue } from "./cardValue"
import { Suit } from "./suit"


export class Card {
    private value: CardValue
    private suit: Suit
    private isHidden: boolean
    constructor(value: CardValue, suit: Suit){
        this.value = value
        this.suit = suit
        this.isHidden = false;
    }

    hide() {
        this.isHidden = true;
    }

    getValue(){
        return this.value;
    }

    isAce (){
         return this.value === CardValue.ace 
    }

    getSuit() {
        return this.suit;
    }

    getIsHidden() {
        return this.isHidden;
    }

}