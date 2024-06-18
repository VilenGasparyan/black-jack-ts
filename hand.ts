import { Card } from "./card";


export class Hand {
    private cards: Card[] = []
    private score: number = 0
    receiveCard (card: Card){
        this.cards.push(card)
        this.score = this.calculateScore()
    }

    calculateScore () {
        const aceis = this.cards.filter(el => {
            return el.isAce()
        })
        const notAsis = this.cards.filter(el => {
            return !(el.isAce())
        })
        let innerScore = 0
        notAsis.forEach(el => {
            innerScore += el.getValue()
        })
        aceis.forEach(el => {
            if (el.isAce() && innerScore + 11 > 21) {
               innerScore += 1;
            } else {
                innerScore += el.getValue()
            }
        })
        return innerScore
    }
    getScore (){
        return this.score;
    }

    isBlackjack() {
      return this.getScore() === 21

    }

    isStartingHand (){
        return this.cards.length === 2
    }

    isSameCard (){
        return this.cards[0].getValue() === this.cards[1].getValue()
    }

    getCards() {
        return this.cards;
    }
    revealAll() {
        this.cards.forEach(el => el.reveal())
    }
}