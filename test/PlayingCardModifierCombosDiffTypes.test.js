/**
 * This file will contain tests for different combinations of the various card modifiers,
 * with combinations from those of different type (e.g. EDITION + ENHANCEMENT, EDITION + SEAL, etc.)
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
 * EDITIONS + ENHANCEMENTS - 21 combos total
 * 
 *         FOIL, HOLOGRPAHIC, POLYCHROME
 *                       X
 *   BONUS, MULT, WILD, GLASS, STEEL, STONE, LUCKY
 */
//---------------------------------------------------------

test("FOIL + BONUS", () => {

});

test("FOIL + MULT", () => {

});

test("FOIL + WILD", () => {

});

test("FOIL + GLASS", () => {

});

test("FOIL + STEEL", () => {

});

test("FOIL + STONE", () => {

});

test("FOIL + LUCKY", () => {

});

//---------------------------------------------------------
//EDITIONS + RED SEAL
//---------------------------------------------------------

//---------------------------------------------------------
//ENHANCEMENTS + RED SEAL
//---------------------------------------------------------

//---------------------------------------------------------
//EDITIONS + ENHANCEMENTS + RED SEAL
//---------------------------------------------------------