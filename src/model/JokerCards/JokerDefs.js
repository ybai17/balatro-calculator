import { createFactory } from "react";

const JokerCards = Object.freeze({
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

export default JokerCards;