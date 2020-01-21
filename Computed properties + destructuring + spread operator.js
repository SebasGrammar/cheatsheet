let test = [{score: 3}, {score: 2}, {score: 1}]

// Preventing side effects by spreading the array in question.

console.log([...test].sort((a, b) => {return a.score - b.score}))

// Object destructuring + computed properties

let newTest = test.map(({score}) => {
  return {
    [score]: score * 2,
    "score": score * 2
  }
})

let mix = [...test, ...newTest]

let a = 5, b = 2;

// Swapping variables with destructuring

[a, b] = [b, a]

// Destructuring + rest syntax

let [first, ...rest] = test
console.log(first, rest)

// Ternary operator

let value = typeof newTest == "object" ? true : false
console.log(value)

// It is also possible to use multiple conditions with ternary operators. This is not recommended, though, because such expressions are considerably more difficult to read.
value == false ? console.log("False") : value == undefined ? console.log("Undefined") : console.log("True")

// Arrow functions  and default parameters

const log = (argument) => {console.log(argument)}
const returnValue = (value = 5) => value * 2

log(test)
log( returnValue(2) )
log ( returnValue() )

// Template literals

let firstString = "The lion"

function concatenateString(initialString, words) {
  for (let word of words) {
    initialString = `${initialString} and the friendly ${word}`
    console.log(initialString)
  }
  // return initialString
}

console.log(concatenateString(firstString, ["dog", "cat", "crocodile"]))

console.log(firstString) // No side effects

// https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/