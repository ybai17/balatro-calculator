/**
 * This file will be more advanced than the HandTypeChecker tests, as we are now factoring in scoring from:
 * 1) Hand type + any level ups from planet card use
 * 2) The played cards themselves
 * 
 * These tests will verify that hand scores + planet card hand upgrades are calculated for score correctly.
 * There will be no card modifiers in use here.
 * No jokers in use except the FOUR_FINGERS joker, due to how it uniquely interacts with hand detection.
 */

import ScoreObject from "../src/model/ScoreObject";
import checkHandType from "../src/model/HandTypeChecker";
import { HandTypePriorities, HandTypeScores } from "../src/model/HandTypeDefs";

import PlanetCard from "../src/model/PlanetCards/PlanetCard";
import { PlanetTypes, PlanetBoosts, PlanetEditions, PlanetTracker } from "../src/model/PlanetCards/PlanetDefs";

import { JokerIDs } from "../src/model/JokerCards/JokerDefs";

import PlayingCard from "../src/model/PlayingCard";
import { EditionTypes, EnhancementTypes, SealTypes, Suits, Ranks } from "../src/model/CardTypes";

import PlayedHand from "../src/model/PlayedHandObject";

import { expect, test } from "vitest";

test("FLUSH_FIVE simple Level 1", () => {
    //testing the score values for a simple FLUSH_FIVE hand

    let testCards = [
        new PlayingCard(Ranks.ACE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheckOutput = checkHandType(hand, jokers);

    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheckOutput.handType,
                                    handCheckOutput.scoringCards,
                                    jokers,
                                    tracker);

    let [testChips, testMult] = testScore.getFinalScoreValues();
    
    expect(handCheckOutput.handType).toBe(HandTypePriorities.FLUSH_FIVE);
    expect(testChips).toBe(215);
    expect(testMult).toBe(16);
});