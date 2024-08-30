/**
 * This file will be used to test the various util functions in /models/Utils.js.
 */

import { test, expect } from "vitest";
import * as util from "../src/model/Utils";

//1abcdef
//abcd1111efgh
//abcd1001efgh
//abcd1000efgh

//e_lucky0 first value 0.3472295
//e_lucky1 first value 0.0153865
//e_lucky2 first value 0.0137015
//e_lucky3 first value 0.0461084
//e_lucky4 first value 0.1374326
//e_lucky5 first value 0.8672560
//e_lucky6 first value 0.3976924
//e_lucky7 first value 0.0697531
//e_lucky8 first value 0.7523544

let print_debug = true;
let test_string = "e_lucky8";
let diff_string = "f";

//let test_string = "abcd_lucky1";
//let diff_string = "abcd_lucky2";

//-------------------------------------------------------------
// Test the seeding hash function and PRNG function
//-------------------------------------------------------------

test("cyrb128 test same seed", () => {

    let first = util.cyrb128(test_string);
    let second = util.cyrb128(test_string);

    if (print_debug) {
        console.log(first);
        console.log(second);
    }

    expect(first[0]).toBe(second[0]);
    expect(first[1]).toBe(second[1]);
    expect(first[2]).toBe(second[2]);
    expect(first[3]).toBe(second[3]);
});

test("cyrb128 test diff seed", () => {
    let first = util.cyrb128(test_string);
    let second = util.cyrb128(diff_string);

    if (print_debug) {
        console.log(first);
        console.log(second);
    }

    expect(first[0] === second[0]).toBeFalsy();
    expect(first[1] === second[1]).toBeFalsy();
    expect(first[2] === second[2]).toBeFalsy();
    expect(first[3] === second[3]).toBeFalsy();
});

test("splitmix32 + cyrb128 test same seed", () => {
    console.log("----------------splitmix32 + cyrb128 same seed----------------");

    let seeds = util.cyrb128(test_string);

    let result_functions = [];
    let results = [];

    for (let i = 0; i < 4; i++) {
        result_functions[i] = util.splitmix32(seeds[i]);
        results[i] = result_functions[i]();
        if (print_debug) {
            console.log(results[i]);
        }
    }

    let seeds_same = util.cyrb128(test_string);

    let result_functions_same = [];
    let results_same = [];

    for (let i = 0; i < 4; i++) {
        result_functions_same[i] = util.splitmix32(seeds_same[i]);
        results_same[i] = result_functions_same[i]();
        if (print_debug) {
            console.log(results_same[i]);
        }
    }

    for (let i = 0; i < 4; i++) {
        expect(results[i]).toBe(results_same[i]);
    }
});

test("splitmax32 + cyrb128 test diff seed", () => {
    console.log("----------------splitmix32 + cyrb128 diff seed----------------");

    let seeds = util.cyrb128(test_string);

    let result_functions = [];
    let results = [];

    for (let i = 0; i < 4; i++) {
        result_functions[i] = util.splitmix32(seeds[i]);
        results[i] = result_functions[i]();
        if (print_debug) {
            console.log(results[i]);
        }
    }

    let seeds_diff = util.cyrb128(diff_string);

    let result_functions_diff = [];
    let results_diff = [];

    for (let i = 0; i < 4; i++) {
        result_functions_diff[i] = util.splitmix32(seeds_diff[i]);
        results_diff[i] = result_functions_diff[i]();
        if (print_debug) {
            console.log(results_diff[i]);
        }
    }

    for (let i = 0; i < 4; i++) {
        expect(results[i] === results_diff[i]).toBeFalsy();
    }
});