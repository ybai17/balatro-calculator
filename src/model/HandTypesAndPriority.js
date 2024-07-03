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

const TypesAndPriority = Object.freeze({
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

export default TypesAndPriority;