/**
 * This exported const object lists the hand types that can be scored in Balatro, as well as their base scoring components.
 * Both numbers can be affected by the type of hand played, the cards played, planet cards (which upgrade the scoring for
 * various hand types), and various joker effects.
 * 
 * The object keys that map to the score component arrays are based off the priority values in the HandTypesAndPriority file.
 * 
 * [Chips, Multiplier]
 * 
 * The Flush Five, Flush House, and Five of a Kind hands are secret hands unique to Balatro and not found in poker normally.
 */

import TypesAndPriority from "./HandTypesAndPriority";

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
    12: [160, 16],
    11: [140, 14],
    10: [120, 12],
    9: [100, 8],
    8: [60, 7],
    7: [40, 4],
    6: [35, 4],
    5: [30, 4],
    4: [30, 3],
    3: [20, 2],
    2: [10, 2],
    1: [5, 1],
});

export default TypesAndScores;