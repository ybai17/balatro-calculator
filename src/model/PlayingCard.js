/**
 * This class represents a regular playing card (2, 3, 4, ..., K, A).
 * Keep in mind that in Balatro, you can have more or fewer playing cards than the standard 52,
 * and that suit and rank distributions are mutable.
 * 
 * A card will be designated with an ID similar to their rank:
 *  Ace = 1
 *  2 = 2
 *  3 = 3
 *  ...
 *  Jack = 11
 *  Queen = 12
 *  King = 13
 * 
 * ----------------------------------------------------
 * 
 * In Balatro, each card has a base chip value (adding to the score to be multiplied):
 *  2 = +2
 *  3 = +3
 *  ...
 *  10 = +10
 *  J, Q, K = +10
 *  A = +11
 * 
 * ---------------------------------------------------
 * 
 * Playing cards can also have a number of special modifiers, of which there are 3 types:   
 *  1). Editions (None, Foil, Holographic, Polychrome)
 *  2). Enhancements (None, Bonus Card, Mult Card, Wild Card, Glass Card, Steel Card, Stone Card, Gold Card, Lucky Card)
 *  3). Seals (None, Gold, Red, Blue, Purple)
 * 
 * Playing cards can only have one modifier of each type. Applying any edition, enhancement, or seal changes
 * overrides the previous one of the same type if it exists.
 * 
 * ---------------------------------------------------
 * 
 * Playing cards all come with the standard 4 suits, but suit gets overriden if it has the Wild Card enhancement.
 * 
 * ---------------------------------------------------
 * 
 * 
 */

import { EditionTypes, EnhancementTypes, SealTypes } from "./CardTypes";

class PlayingCard {

    editionChipsModifier = 0;
    enhancementChipsModifier = 0;

    constructor(rank, suit, edition, enhancement, seal) {
        this.rank = rank;
        this.suit = suit;
        this.edition = edition;
        this.enhancement = enhancement;
        this.seal = seal;
    }

    //getters and setters

    get rank() {
        return this.rank;
    }

    get suit() {
        return this.suit;
    }

    get edition() {
        return this.edition;
    }

    get enhancement() {
        return this.enhancement;
    }

    get seal() {
        return this.seal;
    }
    //--------------------------------------
    set rank(newRank) {
        this.rank = newRank;
    }

    set suit(newSuit) {
        this.suit = newSuit;
    }

    set edition(newEdition) {
        this.edition = newEdition;
    }

    set enhancement(newEnhancement) {
        this.enhancement = newEnhancement;
    }

    set seal(newSeal) {
        this.sea = newSeal;
    }

    //-----------------------------------------------------------

    getChipsForScoring() {

        if (this.enhancement === EnhancementTypes.STONE) {
            return this.editionChipsModifier + this.enhancementChipsModifier;
        }

        switch(this.rank) {
            case 2, 3, 4, 5, 6, 7, 8, 9, 10:
                return this.rank + this.editionChipsModifier + this.enhancementChipsModifier;
            case 11, 12, 13:
                return 10 + this.editionChipsModifier + this.enhancementChipsModifier;
            case 1:
                return 11 + this.editionChipsModifier + this.enhancementChipsModifier;
        }
    }

    hasEdition() {
        if (this.edition === EditionTypes.NONE) {
            return false;
        }
        return true;
    }

    hasEnhancement() {
        if (this.enhancement === EnhancementTypes.NONE) {
            return false;
        }
        return true;
    }

    hasSeal() {
        if (this.seal === SealTypes.NONE) {
            return false;
        }
        return true;
    }
}

export default PlayingCard;