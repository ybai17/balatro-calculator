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
    FOIL: 1, //+50 Chips
    HOLOGRAPHIC: 2, //+10 Mult
    POLYCHROME: 3, //x1.5 Mult
    NEGATIVE: -1, //Jokers only: doesn't take up a card slot
});

const EnhancementTypes = Object.freeze({
    NONE: 0,
    BONUS: 1, //+30 Chips
    MULT: 2, //+4 Mult
    WILD: 3, //Is considered to be every suit simultaneously 
    GLASS: 4, //x2 Mult, 1 in 4 chance to destroy card after all scoring is finished
    STEEL: 5, //x1.5 Mult while this card stays in hand
    STONE: 6, //+50 Chips, no rank or suit, card always scores
    GOLD: 7, //$3 if this card is held in hand at end of round
    LUCKY: 8, //1 in 5 chance for +20 Mult, 1 in 15 chance to win $20
});

const SealTypes = Object.freeze({
    NONE: 0,
    GOLD: 1, //Earn $3 when this card is played and scores
    RED: 2, //Retrigger this card 1 time. Also applies to cards whose effects trigger while held in hand.
    BLUE: 3, //If this card is held at end of round, it creates the Planet card matching the final poker hand played, if you have room
    PURPLE: 4, //Creates a Tarot card when discarded, if you have room
});

const Suits = Object.freeze({
    CLUBS: 0,
    DIAMONDS: 1,
    HEARTS: 2,
    SPADES: 3,
});

const Ranks = Object.freeze({
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    JACK: 11,
    QUEEN: 12,
    KING: 13,
    ACE: 14,
});

export { EditionTypes, EnhancementTypes, SealTypes, Suits, Ranks};