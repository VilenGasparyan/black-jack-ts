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

    constructor() {
        this.deck = new Deck()
        this.dealer = new Dealer()
        this.player = new Player(1000)
    }

    reset() {
        this.dealer.reset();
        this.player.reset();
        this.deck = new Deck();
    }

    isPlayerEndGame() {
        if (this.player.ishasBlackjack()) {
            this.player.win()
            return true
        } else if (this.player.burn()) {
            return false;
        } else {
            return null;
        }
    }

    startGame() {
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

        while (true) {
            console.log("Your balance: " + this.player.getBalance())
            console.log("Your hand:")
            FigletService.print(this.player.getHand())
            let playerState = this.isPlayerEndGame();
            if (playerState !== null) {
                return playerState;
            }
            const possibleActions = this.player.posibleAction()
            for (const action in possibleActions) {
                console.log(action + " " + PlayerAction[action])
            }
            const playerChoose = +askQuestion("Choose action: ")
            let choosedAction = PlayerAction[playerChoose]

            if (choosedAction === PlayerAction[PlayerAction.hit]) {
                this.player.receiveCard(this.deck.drawCard())
            }
            if (choosedAction === PlayerAction[PlayerAction.double]) {
                if (this.player.getBalance() < betAmount) {
                    console.log("No enough balance to double")
                    continue;
                }
                this.player.doBet(betAmount)
                this.player.receiveCard(this.deck.drawCard())
                choosedAction = PlayerAction[PlayerAction.stand]
                playerState = this.isPlayerEndGame();
                if (playerState !== null) {
                    return playerState;
                }
            }
            if (choosedAction === PlayerAction[PlayerAction.stand]) {
                this.dealer.revealHand()
                while (this.dealer.getScore() < 16) {
                    this.dealer.receiveCard(this.deck.drawCard())
                    if (this.dealer.burn()) {
                        return true;
                    }
                }
                if (this.dealer.getScore() == this.player.getScore()) {
                    return null;
                } else if (this.dealer.getScore() > this.player.getScore()) {
                    return false;
                } else {
                    this.player.win();
                    return true;
                }
            }
        }
    }

    printState() {
        this.dealer.revealHand()
        FigletService.print(this.dealer.getHand());
        FigletService.print(this.player.getHand()); 
    }

}