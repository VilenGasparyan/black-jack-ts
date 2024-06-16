import { Card } from "./card";
import { CardValue } from "./cardValue";
import { Suit } from "./suit";


export class Deck {
    private cards: Card[] = []
    constructor(){
        for (const value of Object.values(CardValue).filter(v => typeof v === 'number')) {
            for (const suit of Object.values(Suit).filter(s => typeof s === 'number')) {
                this.cards.push(new Card(value as CardValue, suit as Suit));
            }
        }
        this.shuffle(this.cards)
    }

    drawCard() : Card {
       const card = this.cards.pop()
       if (card != undefined) {
        return card;
       }
       throw new Error();
    }
    
    shuffle(array : any) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}