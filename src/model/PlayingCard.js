/**
 * This class represents a regular playing card (2, 3, 4, ..., K, A).
 * Keep in mind that in Balatro, you can have more or fewer playing cards than the standard 52,
 * and that suit and rank distributions are mutable.
 * 
 * A card will be designated with an ID similar to their rank:
 *  Ace = 1
 *  2 = 2
 *  3 = 3
 *  ...
 *  Jack = 11
 *  Queen = 12
 *  King = 13
 * 
 * ----------------------------------------------------
 * 
 * In Balatro, each card has a base chip value (adding to the score to be multiplied):
 *  2 = +2
 *  3 = +3
 *  ...
 *  10 = +10
 *  J, Q, K = +10
 *  A = +11
 * 
 * ---------------------------------------------------
 * 
 * Playing cards can also have a number of special modifiers, of which there are 3 types:   
 *  1). Editions (Foil, Holographic, Polychrome)
 *  2). Enhancements (Bonus Card, Mult Card, Wild Card, Glass Card, Steel Card, Stone Card, Gold Card, Lucky Card)
 *  3). Seals (Gold, Red, Blue, Purple)
 * 
 * Playing cards can only have one modifier of each type. Applying any edition, enhancement, or seal changes
 * overrides the previous respective one if it exists.
 * 
 * ---------------------------------------------------
 * 
 * Playing cards all come with the standard 4 suits, but suit gets overriden if it has the Wild Card enhancement.
 * 
 * ---------------------------------------------------
 * 
 * 
 */

class PlayingCard {
    
}