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
 * 
 * The keys are numbers such that their values can be accessed using TypesAndPriority like an enum.
 * 
 * Ex: HandTypeScores[HandTypePriorities.FLUSH] gets the Chips and Mult array for a FLUSH hand
 */

const HandTypeScores = Object.freeze({
    12: [160, 16], //FLUSH_FIVE
    11: [140, 14], //FLUSH_HOUSE
    10: [120, 12], //FIVE_OF_A_KIND
    9: [100, 8], //STRAIGHT_FLUSH
    8: [60, 7], //FOUR_OF_A_KIND
    7: [40, 4], //FULL_HOUSE
    6: [35, 4], //FLUSH
    5: [30, 4], //STRAIGHT
    4: [30, 3], //THREE_OF_A_KIND
    3: [20, 2], //TWO_PAIR
    2: [10, 2], //PAIR
    1: [5, 1], //HIGH_CARD
});

export { HandTypePriorities, HandTypeScores };