/*
 * Day 1 · Tue 3 Nov 2026 · Week 1: JS fundamentals
 *
 * Run:  node day1.js
 * Every check prints ✅ or ❌. Your goal is all ✅ without looking anything up.
 *
 * Tasks
 *   1. DSA: Contains Duplicate (done on LeetCode; rewrite it here from memory)
 *   2. DSA: Valid Anagram (re-solve it; then tick it in the tracker by hand)
 *   3. Learn: types, typeof, == vs ===, coercion. PREDICT first, then run.
 *   4. Say it: why is [] == ![] true? Write your answer in the comment block at the bottom.
 *
 * Rules
 *   - Write the code yourself. Stuck for 25 min → watch the NeetCode video, close it, write it again.
 *   - Above each solution, one line:  // pattern → key idea → time / space
 */

// ---------- tiny test helper (don't edit) ----------
let pass = 0, fail = 0, todo = 0;
const ___ = Symbol("not answered");
function check(label, actual, expected) {
  if (expected === ___) { todo++; console.log(`⬜ ${label}  →  write your prediction first`); return; }
  const ok = Object.is(actual, expected);
  ok ? pass++ : fail++;
  console.log(`${ok ? "✅" : "❌"} ${label}${ok ? "" : `  →  got ${String(actual)}, expected ${String(expected)}`}`);
}

// =====================================================================
// Task 1 · Contains Duplicate (LeetCode 217)
// Return true if any value appears at least twice.
// Say the brute-force approach and its complexity BEFORE writing the fast one.
// =====================================================================

// pattern → key idea → time / space:
function containsDuplicate(nums) {
  let map = new Map();

    for(let i = 0 ; i < nums.length ; i++){
        if(map.has(nums[i])){
            return true
        }else{
            map.set( nums[i] , i)
        }
    }

    return false
}

console.log("\nTask 1 · Contains Duplicate");
check("[1,2,3,1] → true", containsDuplicate([1, 2, 3, 1]), true);
check("[1,2,3,4] → false", containsDuplicate([1, 2, 3, 4]), false);
check("[] → false", containsDuplicate([]), false);
check("[1,1,1,3,3,4,3,2,4,2] → true", containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]), true);

// =====================================================================
// Task 2 · Valid Anagram (LeetCode 242)
// Return true if t is an anagram of s. Write TWO versions and compare them.
// =====================================================================

// Version A: sorting
// pattern → key idea → time / space:
function isAnagramSort(s, t) {
  // your code
  let map = new Map();
    if( s.length != t.length) return false


    for( let i = 0 ; i < s.length ; i++ ){
        if(map.has(s[i])){
            map.set(s[i] , map.get(s[i])+1)
        }else{
            map.set(s[i],1)
        }
    }

    for(let i = 0 ; i < t.length ; i++){
        if(!map.has(t[i])){
            return false
        }else{
            map.set(t[i], map.get(t[i]) -1)
        }
    }

    for(let [key,value] of map){
        if (value != 0) return false 
    }
    
    return true
}

// Version B: counting (one object or Map: +1 for s, -1 for t)
// pattern → key idea → time / space:
function isAnagramCount(s, t) {
  // your code
  let map = new Map();
    if( s.length != t.length) return false


    for( let i = 0 ; i < s.length ; i++ ){
        if(map.has(s[i])){
            map.set(s[i] , map.get(s[i])+1)
        }else{
            map.set(s[i],1)
        }
    }

    for(let i = 0 ; i < t.length ; i++){
        if(!map.has(t[i])){
            return false
        }else{
            map.set(t[i], map.get(t[i]) -1)
        }
    }

    for(let [key,value] of map){
        if (value != 0) return false 
    }
    
    return true
}

console.log("\nTask 2 · Valid Anagram");
for (const [name, fn] of [["sort", isAnagramSort], ["count", isAnagramCount]]) {
  check(`${name}: "anagram","nagaram" → true`, fn("anagram", "nagaram"), true);
  check(`${name}: "rat","car" → false`, fn("rat", "car"), false);
  check(`${name}: "a","ab" → false`, fn("a", "ab"), false);
  check(`${name}: "aacc","ccac" → false`, fn("aacc", "ccac"), false);
}
// Which version is faster, and when would an interviewer prefer the other one?
// Your answer:

// =====================================================================
// Task 3 · Predict the output (types & coercion)
// Replace each ??? with your PREDICTION before you run the file.
// Wrong predictions are the point: each ❌ is a gap to write in notes/01-js-core.md
// =====================================================================

console.log("\nTask 3 · Predictions");

check('typeof null', typeof null, "object");
check('typeof []', typeof [], "object");
check('typeof function () {}', typeof function () {}, "function");
check('typeof NaN', typeof NaN, "number");
check('typeof undefined', typeof undefined, "undefined");
check('1 == "1"', 1 == "1", true);
check('1 === "1"', 1 === "1", false);
check('null == undefined', null == undefined, true);
check('null === undefined', null === undefined, false);
check('null == 0', null == 0, false);
check('null >= 0', null >= 0, true);
check('NaN == NaN', NaN == NaN, false);
check('[] == ""', [] == "", true);
check('[] == 0', [] == 0, true);
check('[] == ![]', [] == ![], true);
check('"5" + 3', "5" + 3, "53");
check('"5" - 3', "5" - 3, 2);
check('true + 1', true + 1, 2);
check('[] + {}', [] + {}, "[object Object]");
check('Boolean("0")', Boolean("0"), true);
check('Boolean("")', Boolean(""), false);
check('0.1 + 0.2 === 0.3', 0.1 + 0.2 === 0.3, false);

// =====================================================================
// Task 4 · Say it out loud, then write it here
// "Is [] == ![] true or false? Walk me through why."
// Write each conversion step, one per line:
//
// 1.![]: an array is an object, and every object is truthy. So ![] is false. Now it’s [] == false.
// 2.When one side of == is a boolean, it becomes a number: false → 0. Now it’s [] == 0.
// 3.When an object is compared with a number, the object becomes a primitive: [] → "" (an empty string). Now it’s "" == 0.
// 4.When a string is compared with a number, the string becomes a number: "" → 0. Now it’s 0 == 0 → true.
// =====================================================================

console.log(`\n${pass} passed · ${fail} to fix · ${todo} predictions not written yet`);
