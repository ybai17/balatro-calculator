/**
 * Defines the editions, enhancements, seals, and suits for the playing cards.
 * 
 * Playing cards can also have a number of special modifiers, of which there are 3 types:   
 *  1). Editions (None, Foil, Holographic, Polychrome)
 *  2). Enhancements (None, Bonus Card, Mult Card, Wild Card, Glass Card, Steel Card, Stone Card, Gold Card, Lucky Card)
 *  3). Seals (None, Gold, Red, Blue, Purple)
 * 
 * Jokers can have edition types but not enhancements, seals, or suits.
 * 
 * Playing cards can only have one modifier of each type. Applying any edition, enhancement, or seal changes
 * overrides the previous one of the same type if it exists.
 */

const EditionTypes = Object.freeze({
    NONE: 0,
    FOIL: 1,
    HOLOGRAPHIC: 2,
    POLYCHROME: 3,
    NEGATIVE: -1, //Jokers only
});

const EnhancementTypes = Object.freeze({
    NONE: 0,
    BONUS: 1,
    MULT: 2,
    WILD: 3,
    GLASS: 4,
    STEEL: 5,
    STONE: 6,
    GOLD: 7,
    LUCKY: 8,
});

const SealTypes = Object.freeze({
    NONE: 0,
    GOLD: 1,
    RED: 2,
    BLUE: 3,
    PURPLE: 4,
});

const Suits = Object.freeze({
    CLUBS: 0,
    DIAMONDS: 1,
    HEARTS: 2,
    SPADES: 3,
});

export { EditionTypes, EnhancementTypes, SealTypes, Suits};