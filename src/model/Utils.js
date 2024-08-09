/**
 * This file contains some utility functions that will be needed elsewhere.
 */

/**
 * This function generates seeds from a string, to be used in psuedo-RNG's.
 * Calling cyrb128() will produce a 128-bit hash value from a string which can be used to seed a PRNG.
 * 
 * Source: https://stackoverflow.com/a/47593316
 * 
 * @param {String} str the input string the seed will be based off
 * @returns 4 32-bit numbers to be used in a PRNG as seeds
 */
function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;

    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }

    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;

    return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
}

/**
 * A 32-bit state PRNG that was made by taking MurmurHash3's mixing
 * function, adding a incrementor and tweaking the constants.
 * 
 * Source: https://stackoverflow.com/a/47593316
 * 
 * @param {Number} a a 32-bit state used for this PRNG function, provided by a seeding hash function.
 * @returns a pseudo-random value between 0 and 1
 */
function splitmix32(a) {
    return function() {
        a |= 0;
        a = a + 0x9e3779b9 | 0;
        let t = a ^ a >>> 16;
        t = Math.imul(t, 0x21f0aaad);
        t = t ^ t >>> 15;
        t = Math.imul(t, 0x735a2d97);
        return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
    }
}

export { cyrb128, splitmix32 };