import { Card } from "./card";
import { Hand } from "./hand";
import { PlayerAction } from "./playerAction";


export class Participant {
    protected hand: Hand
    constructor () {
         this.hand = new Hand()
    }
    receiveCard (card: Card) {
        this.hand.receiveCard(card)
    }
    getScore () {
        return this.hand.getScore()
    }
    ishasBlackjack (){
        return this.hand.isBlackjack()
    }
    getHand() {
        return this.hand;
    }
}

export class Dealer extends Participant {
    
}

export class Player extends Participant {
    private balance : number
    private bet : number
    constructor(balance: number){
        super()
        this.balance = balance
        this.bet = 0
    }
    doBet (bet: number){
        if (this.balance < bet) {
            throw new Error()
        }
        this.balance -= bet
        this.bet += bet
    }
    win () {
        this.balance += this.bet  * 2
    }

    posibleAction (){
        const actions = [PlayerAction.hit, PlayerAction.stand];
        if (this.hand.isStartingHand()) {
            actions.push(PlayerAction.double)
            if (this.hand.isSameCard()) {
                actions.push(PlayerAction.split)
            }
        }
        return actions
    }

    getBet () {
        return this.bet
    }


}