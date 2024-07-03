const EditionTypes = Object.freeze({
    NONE: 0,
    FOIL: 1,
    HOLOGRAPHIC: 2,
    POLYCHROME: 3,
    NEGATIVE: 4, //Jokers only
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

export { EditionTypes, EnhancementTypes, SealTypes, Suits };