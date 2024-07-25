/**
 * This file will test playing card modifiers and how they interact with the scoring values.
 * 
 * So it will test if the different playing card Editions, Enhancements, and Seals score properly.
 * 
 * No jokers in play here, but we will test hand levels/planet card use.
 */

import PlayingCard from "../src/model/PlayingCard";
import PlayedHand from "../src/model/PlayedHandObject";
import { Ranks, Suits, EnhancementTypes, EditionTypes, SealTypes } from "../src/model/CardTypes";
import checkHandType from "../src/model/HandTypeChecker";
import ScoreObject from "../src/model/ScoreObject";
import { PlanetTracker } from "../src/model/PlanetCards/PlanetDefs";
import { HandTypePriorities } from "../src/model/HandTypeDefs";
import { expect, test } from "vitest"; 

//----------------------------------------------------------
//EDITIONS (FOIL, HOLOGRAPHIC, POLYCHROME)
//----------------------------------------------------------

test("FOIL 1 card HIGH_CARD", () => {
    //HIGH_CARD hand with the scoring card being a FOIL card (+50 chips)

    let testCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.FOIL, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.NINE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);

    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);

    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.HIGH_CARD);
    expect(testChips).toBe(66);
    expect(testMult).toBe(1);
});

test("HOLOGRAPHIC 1 card HIGH_CARD", () => {
    //HIGH_CARD hand with the scoring card being a HOLOGRAPHIC card (+10 Mult)

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.HOLOGRAPHIC, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.NINE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);

    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);

    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.HIGH_CARD);
    expect(testChips).toBe(15);
    expect(testMult).toBe(11);
});

test("POLYCHROME 1 card HIGH_CARD", () => {
    //HIGH_CARD hand with the scoring card being a POLYCHROME card (x1.5 Mult)

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.SPADES, EditionTypes.POLYCHROME, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.NINE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);

    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);

    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.HIGH_CARD);
    expect(testChips).toBe(15);
    expect(testMult).toBe(1.5);
});

//todo: test for cards with editions being played that won't count for scoring

//ENHANCEMENTS
//todo: STONE cards need to actually count for scoring. Right now they only show up in the scoringCards array


//RED SEAL

//EDITIONS + ENHANCEMENTS

//EDITIONS + RED SEAL

//ENHANCEMENTS + RED SEAL

//EDITIONS + ENHANCEMENTS + RED SEAL