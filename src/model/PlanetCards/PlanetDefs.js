import { HandTypeScores } from "../HandTypeDefs";

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
 * PlanetTypes is ordered in the same way as hand types are in TypesAndPriorities.
 */
const PlanetTypes = Object.freeze({
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
    ERIS: [3, 50], //FLUSH_FIVE
    CERES: [4, 40], //FLUSH_HOUSE
    PLANET_X: [3, 35], //FIVE_OF_A_KIND
    NEPTUNE: [4, 40], //STRAIGHT_FLUSH
    MARS: [3, 30], //FOUR_OF_A_KIND
    EARTH: [2, 25], //FULL_HOUSE
    JUPITER: [2, 15], //FLUSH
    SATURN: [3, 30], //STRAIGHT
    VENUS: [2, 20], //THREE_OF_A_KIND
    URANUS: [1, 20], //TWO_PAIR
    MERCURY: [1, 15], //PAIR
    PLUTO: [1, 10], //HIGH_CARD
});

/**
 * Planet card modifiers, of which there is only 1: Negative (when using the Perkeo joker).
 * Otherwise, planet cards cannot have any other modifier.
 */
const PlanetEditions = Object.freeze({
    NONE: 0,
    NEGATIVE: -1,
});

/**
 * A class that defines an object that will manage and keep track of the levels of each hand type,
 * and handles planet cards being played that upgrade the base scoring values for each hand type.
 */
class PlanetTracker {

    handScores = {};

    constructor() {
        this.handScores = structuredClone(HandTypeScores);
    }

    /**
     * Play a planet card and apply its upgrades to the appropriate hand type.
     * @param planetCard a PlanetCard object representing a planet card.
     */
    playPlanetCard(planetCard) {
        switch (planetCard.planetType) {
            case PlanetTypes.ERIS:
                this.handScores.FLUSH_FIVE[0] += PlanetBoosts.ERIS[0];
                this.handScores.FLUSH_FIVE[1] += PlanetBoosts.ERIS[1];
                break;
            case PlanetTypes.CERES:
                this.handScores.FLUSH_HOUSE[0] += PlanetBoosts.CERES[0];
                this.handScores.FLUSH_HOUSE[1] += PlanetBoosts.CERES[1];
                break;
            case PlanetTypes.PLANET_X:
                this.handScores.FIVE_OF_A_KIND[0] += PlanetBoosts.PLANET_X[0];
                this.handScores.FIVE_OF_A_KIND[1] += PlanetBoosts.PLANET_X[1];
                break;
            case PlanetTypes.NEPTUNE:
                this.handScores.STRAIGHT_FLUSH[0] += PlanetBoosts.NEPTUNE[0];
                this.handScores.STRAIGHT_FLUSH[1] += PlanetBoosts.NEPTUNE[1];
                break;
            case PlanetTypes.MARS:
                this.handScores.FOUR_OF_A_KIND[0] += PlanetBoosts.MARS[0];
                this.handScores.FOUR_OF_A_KIND[1] += PlanetBoosts.MARS[1];
                break;
            case PlanetTypes.EARTH:
                this.handScores.FULL_HOUSE[0] += PlanetBoosts.EARTH[0];
                this.handScores.FULL_HOUSE[1] += PlanetBoosts.EARTH[1];
                break;
            case PlanetTypes.JUPITER:
                this.handScores.FLUSH[0] += PlanetBoosts.JUPITER[0];
                this.handScores.FLUSH[1] += PlanetBoosts.JUPITER[1];
                break;
            case PlanetTypes.SATURN:
                this.handScores.STRAIGHT[0] += PlanetBoosts.SATURN[0];
                this.handScores.STRAIGHT[1] += PlanetBoosts.SATURN[1];
                break;
            case PlanetTypes.VENUS:
                this.handScores.THREE_OF_A_KIND[0] += PlanetBoosts.VENUS[0];
                this.handScores.THREE_OF_A_KIND[1] += PlanetBoosts.VENUS[1];
                break;
            case PlanetTypes.URANUS:
                this.handScores.TWO_PAIR[0] += PlanetBoosts.URANUS[0];
                this.handScores.TWO_PAIR[1] += PlanetBoosts.URANUS[1];
                break;
            case PlanetTypes.MERCURY:
                this.handScores.PAIR[0] += PlanetBoosts.MERCURY[0];
                this.handScores.PAIR[1] += PlanetBoosts.MERCURY[1];
                break;
            case PlanetTypes.PLUTO:
                this.handScores.HIGH_CARD[0] += PlanetBoosts.PLUTO[0];
                this.handScores.HIGH_CARD[1] += PlanetBoosts.PLUTO[1];
                break;
        }
    }

    /**
     * 
     * @param {HandTypePriorities} handType 
     * @returns {Array} an array of two values: [Chips, Mult] to be used for calculating score
     */
    getHandBaseScore(handType) {
        return this.handScores[handType];
    }
}

export { PlanetTypes, PlanetBoosts, PlanetEditions, PlanetTracker };