/**
 * This class will handle the logic for checking for what kind of hand the player has played.
 * 
 * The Flush Five, Flush House, and Five of a Kind hands are secret hands unique to Balatro and not found in poker normally.
 * 
 * TODO: Need to consider the fact that stone cards will always be counted for +50 chips and score.
 * FOR NOW, ASSUME NO STONE CARDS
 */

import { EnhancementTypes } from "./CardTypes";
import { HandTypePriorities } from "./HandTypeDefs";
import { JokerDefs, JokerIDs } from "./JokerCards/JokerDefs";
import { Suits } from "./CardTypes";
import PlayedHand from "./PlayedHandObject";

function checkHandType(playedHand, jokers) {

    //what if we just clear out the stone cards here first, to avoid repetition in each function checking for them?
    let stoneCards = [];

    //stone cards are always scored last
    for (let i = 0; i < playedHand.size; i++) {
        let currCard = playedHand.cards[i];
        if (currCard.enhancement === EnhancementTypes.STONE) {
            stoneCards.push(currCard);
        }
    }

    playedHand.cards = playedHand.cards.filter((currCard) => 
        currCard.enhancement != EnhancementTypes.STONE
    );

    playedHand.size = playedHand.size - stoneCards.length;

//todo: need to change this such that the cards are sorted for easy hand type checking,
//but need to preserve the order of the actually played cards, as they must be scored 
//from LEFT to RIGHT in the order they were played.
//e.g. there is a difference between HOLOGRAPHIC +10 + POLYCHROME x1.5 PAIR vs
//the other way around

    //sort cards in descending order ahead of time for convenience
    //playedHand.cards = playedHand.cards.sort((cardA, cardB) => {
    //    return cardB.rank - cardA.rank;
    //});

    let sortedCardsForCheck = playedHand.cards.slice(0, playedHand.size);
    sortedCardsForCheck = sortedCardsForCheck.sort((cardA, cardB) => {
        return cardB.rank - cardA.rank;
    });

    let sortedHand = new PlayedHand(sortedCardsForCheck);

    //sort stone cards in descending order as well, and remember that they are always scored last
    stoneCards.sort((cardA, cardB) => {
        return cardB.rank - cardA.rank;
    });

    //an object that will store { boolean, array of Cards }
    let handCheck;

    //for speed, checks for small hand sizes will go first
    if (sortedHand.size === 1) {
        return {handType: HandTypePriorities.HIGH_CARD, scoringCards: playedHand.cards};
    } else if (sortedHand.size === 2) {
        handCheck = isPair(sortedHand, jokers);
        if (handCheck.isHand) {
            let out = getCorrespondingCardsFromScoringArray(handCheck.scoringCards, playedHand.cards);
            return {handType: HandTypePriorities.PAIR, scoringCards: out.concat(stoneCards)};
        }

    } else if (sortedHand.size === 3) {
        handCheck = isThreeOfAKind(sortedHand, jokers);
        if (handCheck.isHand) {
            let out = getCorrespondingCardsFromScoringArray(handCheck.scoringCards, playedHand.cards);
            return {handType: HandTypePriorities.THREE_OF_A_KIND, scoringCards: out.concat(stoneCards)};
        }
    }

    if (sortedHand.size === 5) {
        handCheck = isFlushFive(sortedHand, jokers);
        if (handCheck.isHand) {
            let out = getCorrespondingCardsFromScoringArray(handCheck.scoringCards, playedHand.cards);
            return {handType: HandTypePriorities.FLUSH_FIVE, scoringCards: out.concat(stoneCards)};
        }

        handCheck = isFlushHouse(sortedHand, jokers);
        if (handCheck.isHand) {
            let out = getCorrespondingCardsFromScoringArray(handCheck.scoringCards, playedHand.cards);
            return {handType: HandTypePriorities.FLUSH_HOUSE, scoringCards: out.concat(stoneCards)};
        }

        handCheck = isFiveOfAKind(sortedHand, jokers);
        if (handCheck.isHand) {
            let out = getCorrespondingCardsFromScoringArray(handCheck.scoringCards, playedHand.cards);
            return {handType: HandTypePriorities.FIVE_OF_A_KIND, scoringCards: out.concat(stoneCards)};
        }

        handCheck = isFullHouse(sortedHand, jokers);
        if (handCheck.isHand) {
            let out = getCorrespondingCardsFromScoringArray(handCheck.scoringCards, playedHand.cards);
            return {handType: HandTypePriorities.FULL_HOUSE, scoringCards: out.concat(stoneCards)};
        }
    }
    
    handCheck = isStraightFlush(sortedHand, jokers);
    if (handCheck.isHand) {
        let out = getCorrespondingCardsFromScoringArray(handCheck.scoringCards, playedHand.cards);
        return {handType: HandTypePriorities.STRAIGHT_FLUSH, scoringCards: out.concat(stoneCards)};
    }

    handCheck = isFourOfAKind(sortedHand, jokers);
    if (handCheck.isHand) {
        let out = getCorrespondingCardsFromScoringArray(handCheck.scoringCards, playedHand.cards);

        return {handType: HandTypePriorities.FOUR_OF_A_KIND, scoringCards: out.concat(stoneCards)};
    }

    handCheck = isFlush(sortedHand, jokers);
    if (handCheck.isHand) {
        let out = getCorrespondingCardsFromScoringArray(handCheck.scoringCards, playedHand.cards);
        return {handType: HandTypePriorities.FLUSH, scoringCards: out.concat(stoneCards)};
    }

    handCheck = isStraight(sortedHand, jokers);
    if (handCheck.isHand) {
        let out = getCorrespondingCardsFromScoringArray(handCheck.scoringCards, playedHand.cards);
        return {handType: HandTypePriorities.STRAIGHT, scoringCards: out.concat(stoneCards)};
    }

    handCheck = isThreeOfAKind(sortedHand, jokers);
    if (handCheck.isHand) {
        let out = getCorrespondingCardsFromScoringArray(handCheck.scoringCards, playedHand.cards);
        return {handType: HandTypePriorities.THREE_OF_A_KIND, scoringCards: out.concat(stoneCards)};
    }

    handCheck = isTwoPair(sortedHand, jokers);
    if (handCheck.isHand) {
        let out = getCorrespondingCardsFromScoringArray(handCheck.scoringCards, playedHand.cards);
        return {handType: HandTypePriorities.TWO_PAIR, scoringCards: out.concat(stoneCards)};
    }

    handCheck = isPair(sortedHand, jokers);
    if (handCheck.isHand) {
        let out = getCorrespondingCardsFromScoringArray(handCheck.scoringCards, playedHand.cards);
        return {handType: HandTypePriorities.PAIR, scoringCards: out.concat(stoneCards)};
    }

    handCheck = isHighCard(sortedHand, jokers);
    let out = getCorrespondingCardsFromScoringArray(handCheck.scoringCards, playedHand.cards);
    return {handType: HandTypePriorities.HIGH_CARD, scoringCards: out.concat(stoneCards)};
}

//-----------------------------------------
//The functions that do the checking. Need to return true or false, as well as a Hand object containing the scoring cards
//-----------------------------------------

function isFlushFive(playedHand, jokers) {

    if (playedHand.size == 5) {
        let firstCard = playedHand.cards[0];

        for (let i = 1; i < 5; i++) {
            let curr = playedHand.cards[i];

            if (firstCard.rank != curr.rank || !firstCard.areSuitsEqual(curr)) {
                return {isHand: false, scoringCards: []};
            }
        }

        return {isHand: true, scoringCards: playedHand.cards};
    }

    return {isHand: false, scoringCards: []};
}

function isFlushHouse(playedHand, jokers) {

    let fullHouseCheck = isFullHouse(playedHand, jokers);
    if (fullHouseCheck.isHand) {

        let flushCheck = isFlush(playedHand, jokers);
        return {isHand: flushCheck.isHand, scoringCards: flushCheck.scoringCards};
    }

    return {isHand: false, scoringCards: []};
}

function isFiveOfAKind(playedHand, jokers) {
    if (playedHand.size == 5) {
        let firstCard = playedHand.cards[0];

        for (let i = 1; i < 5; i++) {
            let curr = playedHand.cards[i];

            if (firstCard.rank !== curr.rank) {
                return {isHand: false, scoringCards: []};
            }
        }

        return {isHand: true, scoringCards: playedHand.cards};
    }

    return {isHand: false, scoringCards: []};
}

function isStraightFlush(playedHand, jokers) {

    let flushCheck = isFlush(playedHand, jokers);
    if (flushCheck.isHand) {

        let straightCheck = isStraight(playedHand, jokers);
        return {isHand: straightCheck.isHand, scoringCards: straightCheck.scoringCards};
    }

    return {isHand: false, scoringCards: []};
}

function isFourOfAKind(playedHand, jokers) {

    if (playedHand.size < 4) {
        return {isHand: false, scoringCards: []};
    }

    let uniqueRanksAndCounts = {};

    playedHand.cards.forEach((curr) => {
        if (!uniqueRanksAndCounts.hasOwnProperty(curr.rank)) {
            uniqueRanksAndCounts[curr.rank] = [curr]; //store it as a scoring card
            return;
        }
        uniqueRanksAndCounts[curr.rank].push(curr);
    });

    for (const rankKey in uniqueRanksAndCounts) {
        let currRankArray = uniqueRanksAndCounts[rankKey];

        if (currRankArray.length === 4) {
            return {isHand: true, scoringCards: currRankArray};
        }
    }

    return {isHand: false, scoringCards: []};
}

function isFullHouse(playedHand, jokers) {
    if (playedHand.size === 5) {

        let uniqueRanksAndCounts = {};

        playedHand.cards.forEach((curr) => {
            if (!uniqueRanksAndCounts.hasOwnProperty(curr.rank)) {
                uniqueRanksAndCounts[curr.rank] = 1;
                return;
            }
            uniqueRanksAndCounts[curr.rank] += 1;
        });

        if (Object.keys(uniqueRanksAndCounts).length !== 2) {
            return {isHand: false, scoringCards: []};
        }

        //here we can guarantee that there are only 2 ranks. Now we have to confirm it's a 3-2 distribution
        //we cannot guarantee the order of the ranks stored in the differentRanks object
        let [first, second] = Object.keys(uniqueRanksAndCounts);

        if ((uniqueRanksAndCounts[first] === 3 && uniqueRanksAndCounts[second] === 2) ||
            (uniqueRanksAndCounts[first] === 2 && uniqueRanksAndCounts[second] === 3)) {
            return {isHand: true, scoringCards: playedHand.cards};
        }
    }

    return {isHand: false, scoringCards: []};
}

function isFlush(playedHand, jokers) {

    if (playedHand.size < 4) {
        return {isHand: false, scoringCards: []};
    }

    let suitsAndCounts = {
        CLUBS: [],
        DIAMONDS: [],
        HEARTS: [],
        SPADES: [],
    };

    playedHand.cards.forEach((currCard) => {
        if (currCard.enhancement === EnhancementTypes.WILD) {
            suitsAndCounts.CLUBS.push(currCard);
            suitsAndCounts.DIAMONDS.push(currCard);
            suitsAndCounts.HEARTS.push(currCard);
            suitsAndCounts.SPADES.push(currCard);
            return;
        }
        switch (currCard.suit) {
            case Suits.CLUBS:
                suitsAndCounts.CLUBS.push(currCard);
                break;
            case Suits.DIAMONDS:
                suitsAndCounts.DIAMONDS.push(currCard);
                break;
            case Suits.HEARTS:
                suitsAndCounts.HEARTS.push(currCard);
                break;
            case Suits.SPADES:
                suitsAndCounts.SPADES.push(currCard);
                break;
        }
    });

    for (const suitKey in suitsAndCounts) {
        let currArray = suitsAndCounts[suitKey];

        if (jokers.includes(JokerIDs.FOUR_FINGERS)) {
            if (currArray.length === 4) {
                return {isHand: true, scoringCards: currArray};
            }
        }
        if (currArray.length === 5) {
            return {isHand: true, scoringCards: currArray};
        }
    }

    return {isHand: false, scoringCards: []};
}

//cards should already be sorted in descending order by rank when this is called
function isStraight(playedHand, jokers) {

    if (playedHand.size < 4) {
        return {isHand: false, scoringCards: []};
    }

    let handArray = playedHand.cards;

    if (jokers.includes(JokerIDs.FOUR_FINGERS)) {
        //todo: implement check for straight with a combo of 4 cards
        if (handArray[0].rank - handArray[1].rank === 1 &&
            handArray[1].rank - handArray[2].rank === 1 &&
            handArray[2].rank - handArray[3].rank === 1) {
            
            return {isHand: true, scoringCards: playedHand.cards.splice(0, 4)};
        }

        if (handArray[1].rank - handArray[2].rank === 1 &&
            handArray[2].rank - handArray[3].rank === 1 &&
            handArray[3].rank - handArray[4].rank === 1) {
            
            return {isHand: true, scoringCards: playedHand.cards.splice(1, 4)};
        }
    } else {
        //normal check with 5 cards
        if (handArray[0].rank - handArray[1].rank === 1 &&
            handArray[1].rank - handArray[2].rank === 1 &&
            handArray[2].rank - handArray[3].rank === 1 &&
            handArray[3].rank - handArray[4].rank === 1) {
            
            return {isHand: true, scoringCards: playedHand.cards};
        }
    }

    return {isHand: false, scoringCards: []};
}

function isThreeOfAKind(playedHand, jokers) {

    if (playedHand.size < 3) {
        return {isHand: false, scoringCards: []};
    }

    let uniqueRanksAndCounts = {};

    playedHand.cards.forEach((curr) => {
        if (!uniqueRanksAndCounts.hasOwnProperty(curr.rank)) {
            uniqueRanksAndCounts[curr.rank] = [curr];
            return;
        }
        uniqueRanksAndCounts[curr.rank].push(curr);
    });

    for (const rankKey in uniqueRanksAndCounts) {
        let currRankArray = uniqueRanksAndCounts[rankKey];
        if (currRankArray.length === 3) {
            return {isHand: true, scoringCards: currRankArray};
        }
    }

    return {isHand: false, scoringCards: []};
}

function isTwoPair(playedHand, jokers) {
    if (playedHand.size < 4) {
        return {isHand: false, scoringCards: []};
    }

    let uniqueRanksAndCounts = {};

    playedHand.cards.forEach((currCard) => {
        if (!uniqueRanksAndCounts.hasOwnProperty(currCard.rank)) {
            uniqueRanksAndCounts[currCard.rank] = [currCard];
            return;
        }  
        uniqueRanksAndCounts[currCard.rank].push(currCard);
    });

    let ranksWithPairArray = [];

    for (const rankKey in uniqueRanksAndCounts) {
        let currRankArray = uniqueRanksAndCounts[rankKey];
        if (currRankArray.length === 2) {
            ranksWithPairArray = ranksWithPairArray.concat(currRankArray);
        }
    }

    ranksWithPairArray.reverse(); //to keep higher rank cards first in the output array

    if (ranksWithPairArray.length == 4) {
        return {isHand: true, scoringCards: ranksWithPairArray};
    }

    return {isHand: false, scoringCards: []};
}

function isPair(playedHand, jokers) {
    if (playedHand.size < 2) {
        return {isHand: false, scoringCards: []};
    }

    let uniqueRanksAndCounts = {};

    playedHand.cards.forEach((currCard) => {
        if (!uniqueRanksAndCounts.hasOwnProperty(currCard.rank)) {
            uniqueRanksAndCounts[currCard.rank] = [currCard];
            return;
        }  
        uniqueRanksAndCounts[currCard.rank].push(currCard);
    });

    let ranksWithPairArray = [];

    for (const rankKey in uniqueRanksAndCounts) {
        let currRankArray = uniqueRanksAndCounts[rankKey];
        if (currRankArray.length === 2) {
            ranksWithPairArray = ranksWithPairArray.concat(currRankArray);
        }
    }

    if (ranksWithPairArray.length == 2) {
        return {isHand: true, scoringCards: ranksWithPairArray};
    }

    return {isHand: false, scoringCards: []};
}

//high card will be the default if no other hands are detected

function isHighCard(playedHand, jokers) {

    //in case 5 STONE cards are played:
    if (playedHand.size === 0) {
        return {isHand: true, scoringCards: []};
    }

    //find the card with the highest rank
    let highestCard = playedHand.cards[0];

    for (let i = 0; i < playedHand.size; i++) {
        let currCompare = playedHand.cards[i];

        if (currCompare.rank > highestCard.rank) {
            highestCard = currCompare;
        }
    }

    return {isHand: true, scoringCards: [highestCard]};
}

//helper function for finding the matches for the scoring cards in the original PlayedHand object,
//so that we return the scoring cards in the exact order they were played,
//because the order matters.
//return the subset of the originalPlayedHand cards that score, in that order
function getCorrespondingCardsFromScoringArray(scoringCards, originalPlayedHandCards) {
    let output = [];

    originalPlayedHandCards.forEach((currCard) => {
        for (let i = 0; i < scoringCards.length; i++) {
            if (currCard.isSameCardDeep(scoringCards[i])) {
                output.push(currCard);
            }
        }
    });

    return output;
}

export default checkHandType;