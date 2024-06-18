import { Game } from './game';

const game: Game = new Game()

while (true) {
    const verdict = game.startGame();
    if (verdict === null) {
        console.log("Its tie")
    } else if (verdict) {
        console.log("Its win")
    } else {
        console.log("Its lose")
    }
    game.printState()
    game.reset()
}



