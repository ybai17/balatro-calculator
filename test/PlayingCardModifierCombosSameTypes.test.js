/**
 * This file will contain tests for different combinations of the various card modifiers,
 * with combinations from those of the same type (i.e. EDITION + EDITION, ENHANCEMENT + ENHANCEMENT)
 */

import ScoreObject from "../src/model/ScoreObject";
import PlayedHand from "../src/model/PlayedHandObject";
import PlayingCard from "../src/model/PlayingCard";
import checkHandType from "../src/model/HandTypeChecker";

import { EditionTypes, EnhancementTypes, SealTypes, Suits, Ranks } from "../src/model/CardTypes";
import { HandTypePriorities } from "../src/model/HandTypeDefs";
import { PlanetTracker } from "../src/model/PlanetCards/PlanetDefs";

import { test, expect } from "vitest";

//---------------------------------------------------------
/**
 * EDITIONS + EDITIONS
 */
//---------------------------------------------------------

test("FOIL + FOIL", () => {

});

test("FOIL + HOLOGRAPHIC", () => {

});

test("FOIL + POLYCHROME", () => {

});

//order of cards played matters!
test("HOLOGRAPHIC + POLYCHROME", () => {

});

//order of cards played matters!
test("POLYCHROME + HOLOGRAPHIC", () => {

});
//---------------------------------------------------------
/**
 * ENHANCEMENTS + ENHANCEMENTS
 */
//---------------------------------------------------------

test("BONUS + MULT", () => {

});

test("BONUS + WILD", () => {

});

test("BONUS + GLASS", () => {

});

test("BONUS + STEEL", () => {

});

test("BONUS + STONE", () => {

});

test("BONUS + LUCKY", () => {

});

test("MULT + WILD", () => {

});

//order of cards played matters!
test("MULT + GLASS", () => {

});

//order of cards played matters!
test("MULT + STEEL", () => {

});

test("MULT + STONE", () => {

});

test("MULT + LUCKY", () => {

});

test("WILD + GLASS", () => {

});

test("WILD + STEEL", () => {

});

test("WILD + STONE", () => {

});

test("WILD + LUCKY", () => {

});

test("GLASS + STEEL", () => {

});

//order of cards played matters!
test("GLASS + LUCKY", () => {

});

test("STEEL + STONE", () => {

});

test("STEEL + LUCKY", () => {

});

test("STONE + LUCKY", () => {

});

//order of cards played matters!
test("LUCKY + GLASS", () => {

});

//order of cards played matters!
test("LUCKY + STEEL", () => {

});