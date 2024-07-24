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
import { HandTypePriorities} from "../src/model/HandTypeDefs";

import PlanetCard from "../src/model/PlanetCards/PlanetCard";
import { PlanetTypes, PlanetBoosts, PlanetEditions, PlanetTracker } from "../src/model/PlanetCards/PlanetDefs";

import { JokerIDs } from "../src/model/JokerCards/JokerDefs";

import PlayingCard from "../src/model/PlayingCard";
import { EditionTypes, EnhancementTypes, SealTypes, Suits, Ranks } from "../src/model/CardTypes";

import PlayedHand from "../src/model/PlayedHandObject";

import { expect, test } from "vitest";

test("FLUSH_FIVE Level 1", () => {
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

test("FLUSH_FIVE Level 3", () => {
    //testing FLUSH_FIVE scoring values once 2 ERIS planet cards have been played

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
    let testPlanet = new PlanetCard(PlanetTypes.ERIS, PlanetEditions.NONE);

    tracker.playPlanetCard(testPlanet);
    tracker.playPlanetCard(testPlanet);

    let testScore = new ScoreObject(handCheckOutput.handType,
                                    handCheckOutput.scoringCards,
                                    jokers,
                                    tracker);

    let [testChips, testMult] = testScore.getFinalScoreValues();
    
    expect(handCheckOutput.handType).toBe(HandTypePriorities.FLUSH_FIVE);
    expect(testChips).toBe(315);
    expect(testMult).toBe(22);
});

test("FLUSH_HOUSE Level 1", () => {
    //check a simple FLUSH_HOUSE hand

    let testCards = [
        new PlayingCard(Ranks.JACK, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
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

    expect(handCheckOutput.handType).toBe(HandTypePriorities.FLUSH_HOUSE);
    expect(testChips).toBe(180);
    expect(testMult).toBe(14);
});

test("FLUSH_HOUSE Level 2", () => {
    //testing FLUSH_HOUSE scoring after being upgraded once

    let testCards = [
        new PlayingCard(Ranks.JACK, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheckOutput = checkHandType(hand, jokers);

    let tracker = new PlanetTracker();
    let testPlanet = new PlanetCard(PlanetTypes.CERES, PlanetEditions.NONE);

    tracker.playPlanetCard(testPlanet);

    let testScore = new ScoreObject(handCheckOutput.handType,
                                    handCheckOutput.scoringCards,
                                    jokers,
                                    tracker);
    
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheckOutput.handType).toBe(HandTypePriorities.FLUSH_HOUSE);
    expect(testChips).toBe(220);
    expect(testMult).toBe(18);
});

test("FIVE_OF_A_KIND Level 1", () => {
    //test FIVE_OF_A_KIND without level ups

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
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

    expect(handCheckOutput.handType).toBe(HandTypePriorities.FIVE_OF_A_KIND);
    expect(testChips).toBe(130);
    expect(testMult).toBe(12);
});

test("FIVE_OF_A_KIND Level 4", () => {
    //test FIVE_OF_A_KIND without level ups

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheckOutput = checkHandType(hand, jokers);

    let tracker = new PlanetTracker();
    let testPlanet = new PlanetCard(PlanetTypes.PLANET_X, PlanetEditions.NONE);

    tracker.playPlanetCard(testPlanet);
    tracker.playPlanetCard(testPlanet);
    tracker.playPlanetCard(testPlanet);

    let testScore = new ScoreObject(handCheckOutput.handType,
                                    handCheckOutput.scoringCards,
                                    jokers,
                                    tracker);
    
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheckOutput.handType).toBe(HandTypePriorities.FIVE_OF_A_KIND);
    expect(testChips).toBe(235);
    expect(testMult).toBe(21);
});

