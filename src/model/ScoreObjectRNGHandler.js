import * as util from "./Utils";

/**
 * This class defines the object that ScoreObject will accept to handle all the RNG aspects that affect
 * scoring (e.g. LUCKY cards, RNG-based Jokers, etc.).
 * 
 * This object will be provided with a predetermined string to use as a seed.
 * 
 * From there, it will create pseudo-random numbers to be used for the LUCKY cards, Jokers, etc.
 * 
 * This class will only be used for testing and for the score calculator, NOT the actual game implementation.
 */
class ScoreObjectRNGHandler {

    baseStringField;

    /**
     * The constructor for this class. Uses a starting string to create seeds for all the PRNG needed for 
     * the various RNG-based cards and Jokers.
     * 
     * @param {String} baseString the base string to be used as the starting point for seeding all the PRNG
     */
    constructor(baseString) {
        this.baseStringField = baseString;
    }

    /**
     * Function that generates the RNG value that decides whether or not a Lucky card scores.
     * 
     * @param {Number} luckyCardNumber what number this LUCKY card is to ensure the PRNG output is unique
     * @returns 1 RNG roll [0, 1)
     */
    generateLuckyCardRNG(luckyCardNumber) {
        //we only care about the 1 in 5 chance to get +20 Mult right now

        let seeds = util.cyrb128(this.baseStringField + "_lucky" + luckyCardNumber);

        let output = util.splitmix32(seeds[0])();

        return output;
    }

}

export default ScoreObjectRNGHandler;