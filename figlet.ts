import { Card } from "./card";
import { CardValue } from "./cardValue";
import { Hand } from "./hand";
import { Suit } from "./suit";

enum FigletCard {
    CARD_BACK = "################\n#||||||||||||||#\n#|############|#\n#|############|#\n#|############|#\n#|############|#\n#|############|#\n#|############|#\n#|############|#\n#||||||||||||||#\n################",
    CARD_J = "################\n#.J............#\n#.........##...#\n#.........##...#\n#.........##...#\n#.........##...#\n#...##....##...#\n#...##....##...#\n#....######....#\n#............J.#\n################",
    CARD_Q = "################\n#.Q............#\n#....#######...#\n#...##.....##..#\n#...##.....##..#\n#...##.....##..#\n#...##..##.##..#\n#...##....##...#\n#....#####.##..#\n#............Q.#\n################",
    CARD_K = "################\n#.K............#\n#...##....##...#\n#...##...##....#\n#...##..##.....#\n#...#####......#\n#...##..##.....#\n#...##...##....#\n#...##....##...#\n#............K.#\n################",
    CARD_2 = "################\n#.2............#\n#....#######...#\n#...##.....##..#\n#..........##..#\n#....#######...#\n#...##.........#\n#...##.........#\n#...#########..#\n#............2.#\n################",
    CARD_3 = "################\n#.3............#\n#....#######...#\n#...##.....##..#\n#..........##..#\n#....#######...#\n#..........##..#\n#...##.....##..#\n#....#######...#\n#............3.#\n################",
    CARD_4 = "################\n#.4............#\n#...##.........#\n#...##....##...#\n#...##....##...#\n#...##....##...#\n#...#########..#\n#.........##...#\n#.........##...#\n#............4.#\n################",
    CARD_5 = "################\n#.5............#\n#...########...#\n#...##.........#\n#...##.........#\n#...#######....#\n#.........##...#\n#...##....##...#\n#....######....#\n#............5.#\n################",
    CARD_6 = "################\n#.6............#\n#....#######...#\n#...##.....##..#\n#...##.........#\n#...########...#\n#...##.....##..#\n#...##.....##..#\n#....#######...#\n#............6.#\n################",
    CARD_7 = "################\n#.7............#\n#...########...#\n#...##....##...#\n#.......##.....#\n#......##......#\n#.....##.......#\n#.....##.......#\n#.....##.......#\n#............7.#\n################",
    CARD_8 = "################\n#.8............#\n#....#######...#\n#...##.....##..#\n#...##.....##..#\n#....#######...#\n#...##.....##..#\n#...##.....##..#\n#....#######...#\n#............8.#\n################",
    CARD_9 = "################\n#.9............#\n#....#######...#\n#...##.....##..#\n#...##.....##..#\n#....########..#\n#..........##..#\n#...##.....##..#\n#....#######...#\n#............9.#\n################",
    CARD_10 = "################\n#.10...........#\n#...#......#...#\n#..##.....#.#..#\n#...#....#...#.#\n#...#....#...#.#\n#...#....#...#.#\n#...#.....#.#..#\n#.#####....#...#\n#...........10.#\n################",
    CARD_A = "################\n#.A............#\n#......###.....#\n#.....##.##....#\n#....##...##...#\n#...##.....##..#\n#...#########..#\n#...##.....##..#\n#...##.....##..#\n#............A.#\n################"
}


export class FigletService {
    static print(hand: Hand): void {
        const cards = hand.getCards();
        if (cards.length === 0) {
            return;
        }

        const cardLines = cards.map(card => {
            let figletCard;
            if (card.getIsHidden()) {
                figletCard = getCard(null)
            } else {
                figletCard = getCard(card.getValue());
            } 
            
            return figletCard.split('\n');
        });

        for (let i = 0; i < cardLines[0].length; i++) {
            console.log(cardLines.map(lines => lines[i]).join('  '));
        }
    }
}

function getCard(value: CardValue | null): FigletCard {
    switch (value) {
        case CardValue.ace: return FigletCard.CARD_A;
        case CardValue.two: return FigletCard.CARD_2;
        case CardValue.three: return FigletCard.CARD_3;
        case CardValue.four: return FigletCard.CARD_4;
        case CardValue.five: return FigletCard.CARD_5;
        case CardValue.six: return FigletCard.CARD_6;
        case CardValue.seven: return FigletCard.CARD_7;
        case CardValue.eight: return FigletCard.CARD_8;
        case CardValue.nine: return FigletCard.CARD_9;
        case CardValue.ten: return FigletCard.CARD_10;
        case CardValue.jack: return FigletCard.CARD_J;
        case CardValue.queen: return FigletCard.CARD_Q;
        case CardValue.king: return FigletCard.CARD_K;
        default: return FigletCard.CARD_BACK;
    }
}