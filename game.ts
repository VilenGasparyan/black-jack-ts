import { Card } from "./card";
import { CardValue } from "./cardValue";
import { Deck } from "./deck";
import { Hand } from "./hand";
import { Dealer, Player } from "./participant";
import { PlayerAction } from "./playerAction";
import { Suit } from "./suit";
import { askQuestion } from "./util";
import { FigletService } from './figlet'

export class Game {
    private dealer: Dealer
    private player: Player
    private deck: Deck
    constructor () {
          this.deck = new Deck()
          this.dealer = new Dealer()
          this.player = new Player(1000)
    }
    startGame (){
        const betAmount = +askQuestion("do your bet: ")
        console.log(betAmount);
        this.player.doBet(betAmount)
        this.player.receiveCard(this.deck.drawCard())
        this.dealer.receiveCard(this.deck.drawCard())
        this.player.receiveCard(this.deck.drawCard())
        let hiddenCart = this.deck.drawCard()
        hiddenCart.hide()
        this.dealer.receiveCard(hiddenCart)
        console.log("Dealers hand:")
        FigletService.print(this.dealer.getHand());
        console.log("Your hand:")
        FigletService.print(this.player.getHand())

        if (this.player.ishasBlackjack()) {
            this.player.win()
            return true
        }
        const possibleActions = this.player.posibleAction()
        for(const action in possibleActions) {
            console.log(action + " " + PlayerAction[action])
            
        }
        const playerChoose = +askQuestion("choose action: ")      
        const choosedAction = PlayerAction[playerChoose]

        if (choosedAction === PlayerAction[PlayerAction.hit]) {
            this.player.receiveCard(this.deck.drawCard())
        }
        if (choosedAction === PlayerAction[PlayerAction.double]) {
            this.player.doBet(betAmount)
            this.player.receiveCard(this.deck.drawCard())
        }
        if (this.player.ishasBlackjack()) {
            this.player.win()
        }

    }


}