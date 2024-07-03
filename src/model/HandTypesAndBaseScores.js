import ScoreObject from "./ScoreObject";

/**
 * This exported const object lists the hand types that can be scored in Balatro, as well as their base scoring components.
 * Both numbers can be affected by the type of hand played, the cards played, planet cards (which upgrade the scoring for
 * various hand types), and various joker effects.
 * 
 * [Chips, Multiplier]
 * 
 * The Flush Five, Flush House, and Five of a Kind hands are secret hands unique to Balatro and not found in poker normally.
 */

//initialize the base scoring objects? might be needed later
/*
let flush_five = new ScoreObject(160, 16);
let flush_house = new ScoreObject(140, 14);
let five_of_a_kind = new ScoreObject(120, 12);
let straight_flush = new ScoreObject(100, 8);
let four_of_a_kind = new ScoreObject(60, 7);
let full_house = new ScoreObject(40, 4);
let flush = new ScoreObject(35, 4);
let straight = new ScoreObject(30, 4);
let three_of_a_kind = new ScoreObject(30, 3);
let two_pair = new ScoreObject(20, 2);
let pair = new ScoreObject(10, 2);
let high_card = new ScoreObject(5, 1);
*/

const TypesAndScores = Object.freeze({
    FLUSH_FIVE: [160, 16],
    FLUSH_HOUSE: [140, 14],
    FIVE_OF_A_KIND: [120, 12],
    STRAIGHT_FLUSH: [100, 8],
    FOUR_OF_A_KIND: [60, 7],
    FULL_HOUSE: [40, 4],
    FLUSH: [35, 4],
    STRAIGHT: [30, 4],
    THREE_OF_A_KIND: [30, 3],
    TWO_PAIR: [20, 2],
    PAIR: [10, 2],
    HIGH_CARD: [5, 1],
});

export default TypesAndScores;