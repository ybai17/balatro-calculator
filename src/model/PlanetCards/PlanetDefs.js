/**
 * Planet cards upgrade the various hand types by a set amount to the base chips and multiplier each time
 * one is played.
 * 
 * This file defines an object with the planet cards and their IDs,
 * as well as an object that stores those set amounts.
 * 
 * Ex: Each time you use a Jupiter card:
 *  Flush level: +1
 *  Base chips: +15 Chips
 *  Multiplier: +2 Mult
 * 
 * PlanetCards is ordered in the same way as hand types are in TypesAndPriorities.
 */

const PlanetCards = Object.freeze({
    ERIS: 12, //FLUSH_FIVE: 12,
    CERES: 11, //FLUSH_HOUSE: 11,
    PLANET_X: 10, //FIVE_OF_A_KIND: 10,
    NEPTUNE: 9, //STRAIGHT_FLUSH: 9,
    MARS: 8, //FOUR_OF_A_KIND: 8,
    EARTH: 7, //FULL_HOUSE: 7,
    JUPITER: 6, //FLUSH: 6,
    SATURN: 5, //STRAIGHT: 5,
    VENUS: 4, //THREE_OF_A_KIND: 4,
    URANUS: 3, //TWO_PAIR: 3,
    MERCURY: 2, //PAIR: 2,
    PLUTO: 1, //HIGH_CARD: 1,
});

/**
 * [Chips, Multiplier]
 * 
 * The keys are numbers such that their values can be accessed using PlanetCards like an enum.
 * 
 * Ex: PlanetBoosts[PlanetCards.VENUS] gets the Chips and Mult array for VENUS
*/
const PlanetBoosts = Object.freeze({
    12: [3, 50], //ERIS, FLUSH_FIVE
    11: [4, 40], //CERES, FLUSH_HOUSE
    10: [3, 35], //PLANET_X, FIVE_OF_A_KIND
    9: [4, 40], //NEPTUNE, STRAIGHT_FLUSH
    8: [3, 30], //MARS, FOUR_OF_A_KIND
    7: [2, 25], //EARTH, FULL_HOUSE
    6: [2, 15], //JUPITER, FLUSH
    5: [3, 30], //SATURN, STRAIGHT
    4: [2, 20], //VENUS, THREE_OF_A_KIND
    3: [1, 20], //URANUS, TWO_PAIR
    2: [1, 15], //MERCURY, PAIR
    1: [1, 10], //PLUTO, HIGH_CARD
});