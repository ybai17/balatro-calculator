/**
 * This file has two objects, one which contains mappings between the Joker cards and their functions as Strings,
 * as well as the Joker cards and their actual IDs for use in comparisons.
 */

const JokerDefs = Object.freeze({
    JOKER: "+4 Mult",
    GREEDY_JOKER: "Played cards with Diamond suit give +3 Mult when scored",
    LUSTY_JOKER: "Played cards with Heart suit give +3 Mult when scored",
    WRATHFUL_JOKER: "Played cards with Spade suit give +3 Mult when scored",
    GLUTTONOUS_JOKER: "Played cards with Club   suit give +3 Mult when scored",
    JOLLY_JOKER: "+8 Mult if played hand contains a Pair",
    ZANY_JOKER: "+12 Mult if played hand contains a Three of a Kind",
    MAD_JOKER: "+10 Mult if played hand contains a Two Pair",
    CRAZY_JOKER: "+12 Mult if played hand contains a Straight",
    DROLL_JOKER: "+10 Mult if played hand contains a Flush",
    SLY_JOKER: "+50 Chips if played hand contains a Pair",
    WILY_JOKER: "+100 Chips if played hand contains a Three of a Kind",
    CLEVER_JOKER: "+80 Chips if played hand contains a Two Pair",
    DEVIOUS_JOKER: "+100 Chips if played hand contains a Straight",
    CRAFTY_JOKER: "+80 Chips if played hand contains a Flush",
    HALF_JOKER: "+20 Mult if played hand contains 3 or fewer cards.",
    JOKER_STENCIL: "X1 Mult for each empty Joker slot. Joker Stencil included (Currently X1 Mult)",
    FOUR_FINGERS: "All Flushes and Straights can be made with 4 cards",
});

const JokerIDs = Object.freeze({
    JOKER: 0,
    GREEDY_JOKER: 1,
    LUSTY_JOKER: 2,
    WRATHFUL_JOKER: 3,
    GLUTTONOUS_JOKER: 4,
    JOLLY_JOKER: 5,
    ZANY_JOKER: 6,
    MAD_JOKER: 7,
    CRAZY_JOKER: 8,
    DROLL_JOKER: 9,
    SLY_JOKER: 10,
    WILY_JOKER: 11,
    CLEVER_JOKER: 12,
    DEVIOUS_JOKER: 13,
    CRAFTY_JOKER: 14,
    HALF_JOKER: 15,
    JOKER_STENCIL: 16,
    FOUR_FINGERS: 17,
});

export {JokerDefs, JokerIDs};