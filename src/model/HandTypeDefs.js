/**
 * This exported const object lists the hand types that can be scored in Balatro, as well as their scoring priority.
 * (If a played hand contains both a Pair and a Flush, the played hand will be scored as a Flush).
 * 
 * Royal Flushes still count as Straight Flushes when scoring.
 * 
 * Priority is ranked as thus: 12 = highest, 1 = lowest
 * 
 * The Flush Five, Flush House, and Five of a Kind hands are secret hands unique to Balatro and not found in poker normally.
 * 
 */

const HandTypePriorities = Object.freeze({
    FLUSH_FIVE: 12,
    FLUSH_HOUSE: 11,
    FIVE_OF_A_KIND: 10,
    STRAIGHT_FLUSH: 9,
    FOUR_OF_A_KIND: 8,
    FULL_HOUSE: 7,
    FLUSH: 6,
    STRAIGHT: 5,
    THREE_OF_A_KIND: 4,
    TWO_PAIR: 3,
    PAIR: 2,
    HIGH_CARD: 1,
});

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

const HandTypeScores = Object.freeze({
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

export { HandTypePriorities, HandTypeScores };