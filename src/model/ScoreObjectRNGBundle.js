import * as util from "./Utils";

/**
 * This class defines the object that ScoreObject will accept to handle all the RNG aspects that affect
 * scoring (e.g. LUCKY cards, RNG-based Jokers, etc.).
 * 
 * This object will be provided with a predetermined string to use as a seed.
 * 
 * From there, it will create pseudo-random numbers to be used for the LUCKY cards, Jokers, etc.
 */
class ScoreObjectRNGBundle {

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

    

}

export default ScoreObjectRNGBundle;