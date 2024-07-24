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

    //planetType is one of the PlanetTypes from PlanetDefs
    //editionType is one of the PlanetEditions from PlanetDefs
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