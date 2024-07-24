import { PlanetTypes, PlanetEditions } from "./PlanetDefs";

/**
 * This defines a planet card object, which upgrade the base scoring values for different hand types.
 * 
 * Planet cards can have a negative edition if the legendary joker card Perkeo is used a specific way.
 * Otherwise, they normally don't have any editions, enhancements, etc.
 */
class PlanetCard {
    planetCardType;
    cardEditionType;

    /**
     * Create a PlanetCard. 
     * @param {PlanetTypes} planetType the type of planet card
     * @param {PlanetEditions} editionType the edition of this planet card
     */
    constructor(planetType, editionType) {
        this.planetCardType = planetType;
        this.cardEditionType = editionType;
    }

    get planetType() {
        return this.planetCardType;
    }

    set planetType(newPlanetType) {
        this.planetCardType = newPlanetType;
    }
}

export default PlanetCard;