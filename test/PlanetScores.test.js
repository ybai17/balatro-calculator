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
    expect(tracker.getLevelForHand(HandTypePriorities.FLUSH_FIVE)).toBe(1);
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
    expect(tracker.getLevelForHand(HandTypePriorities.FLUSH_FIVE)).toBe(3);
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
    expect(tracker.getLevelForHand(HandTypePriorities.FLUSH_HOUSE)).toBe(1);
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
    expect(tracker.getLevelForHand(HandTypePriorities.FLUSH_HOUSE)).toBe(2);
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
    expect(tracker.getLevelForHand(HandTypePriorities.FIVE_OF_A_KIND)).toBe(1);
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
    expect(tracker.getLevelForHand(HandTypePriorities.FIVE_OF_A_KIND)).toBe(4);
});

test("STRAIGHT_FLUSH Level 1", () => {
    //STRAIGHT_FLUSH hand without planet cards played

    let testCards = [
        new PlayingCard(Ranks.TEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.EIGHT, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.NINE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
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

    expect(handCheckOutput.handType).toBe(HandTypePriorities.STRAIGHT_FLUSH);
    expect(testChips).toBe(147);
    expect(testMult).toBe(8);
    expect(tracker.getLevelForHand(HandTypePriorities.STRAIGHT_FLUSH)).toBe(1);
});

test("STRAIGHT_FLUSH Level 3", () => {
    //STRAIGHT_FLUSH with 2 level ups

    let testCards = [
        new PlayingCard(Ranks.TEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheckOutput = checkHandType(hand, jokers);

    let tracker = new PlanetTracker();
    let testPlanet = new PlanetCard(PlanetTypes.NEPTUNE, PlanetEditions.NONE);

    tracker.playPlanetCard(testPlanet);
    tracker.playPlanetCard(testPlanet);

    let testScore = new ScoreObject(handCheckOutput.handType,
                                    handCheckOutput.scoringCards,
                                    jokers,
                                    tracker);

    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheckOutput.handType).toBe(HandTypePriorities.STRAIGHT_FLUSH);
    expect(testChips).toBe(231);
    expect(testMult).toBe(16);
    expect(tracker.getLevelForHand(HandTypePriorities.STRAIGHT_FLUSH)).toBe(3);
});

test("FOUR_OF_A_KIND Level 1", () => {
    //FOUR_OF_A_KIND with no leveling

    let testCards = [
        new PlayingCard(Ranks.THREE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
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

    expect(handCheckOutput.handType).toBe(HandTypePriorities.FOUR_OF_A_KIND);
    expect(testChips).toBe(72);
    expect(testMult).toBe(7);
    expect(tracker.getLevelForHand(HandTypePriorities.FOUR_OF_A_KIND)).toBe(1);
});

test("FOUR_OF_A_KIND Level 2", () => {
    //FOUR_OF_A_KIND with one MARS planet card played

    let testCards = [
        new PlayingCard(Ranks.THREE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheckOutput = checkHandType(hand, jokers);

    let tracker = new PlanetTracker();
    let testPlanet = new PlanetCard(PlanetTypes.MARS, PlanetEditions.NONE);

    tracker.playPlanetCard(testPlanet);

    let testScore = new ScoreObject(handCheckOutput.handType,
                                    handCheckOutput.scoringCards,
                                    jokers,
                                    tracker);

    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheckOutput.handType).toBe(HandTypePriorities.FOUR_OF_A_KIND);
    expect(testChips).toBe(102);
    expect(testMult).toBe(10);
    expect(tracker.getLevelForHand(HandTypePriorities.FOUR_OF_A_KIND)).toBe(2);
});

test("FULL_HOUSE Level 1", () => {
    //FULL_HOUSE without any leveling

    let testCards = [
        new PlayingCard(Ranks.QUEEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
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

    expect(handCheckOutput.handType).toBe(HandTypePriorities.FULL_HOUSE);
    expect(testChips).toBe(92);
    expect(testMult).toBe(4);
    expect(tracker.getLevelForHand(HandTypePriorities.FULL_HOUSE)).toBe(1);
});

test("FULL_HOUSE Level 3", () => {
    //FULL_HOUSE without any leveling

    let testCards = [
        new PlayingCard(Ranks.QUEEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheckOutput = checkHandType(hand, jokers);

    let tracker = new PlanetTracker();
    let testPlanet = new PlanetCard(PlanetTypes.EARTH, PlanetEditions.NONE);

    tracker.playPlanetCard(testPlanet);
    tracker.playPlanetCard(testPlanet);

    let testScore = new ScoreObject(handCheckOutput.handType,
                                    handCheckOutput.scoringCards,
                                    jokers,
                                    tracker);

    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheckOutput.handType).toBe(HandTypePriorities.FULL_HOUSE);
    expect(testChips).toBe(142);
    expect(testMult).toBe(8);
    expect(tracker.getLevelForHand(HandTypePriorities.FULL_HOUSE)).toBe(3);
});

