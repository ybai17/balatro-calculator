/**
 * This file will be more advanced than the HandTypeChecker tests, as we are now factoring in hand types
 * as well as the different scores they bring along with planet card use.
 * 
 * These tests will verify that hand scores + planet card hand upgrades are calculated for score correctly.
 * There will be no card modifiers in use here.
 * No jokers in use except the FOUR_FINGERS joker, due to how it uniquely interacts with hand detection.
 */

import ScoreObject from "../src/model/ScoreObject";
import checkHandType from "../src/model/HandTypeChecker";
import PlanetCard from "../src/model/PlanetCards/PlanetCard";
import { PlanetTypes, PlanetBoosts, PlanetEditions, PlanetTracker } from "../src/model/PlanetCards/PlanetDefs";
import { HandTypePriorities, HandTypeScores } from "../src/model/HandTypeDefs";
import { JokerIDs } from "../src/model/JokerCards/JokerDefs";

