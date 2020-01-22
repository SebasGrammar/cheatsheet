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

/* ---- */

let nestedObjects = {
  first: {
    second: {
      third: [1, 2, 3]
    }
  }
}

let {first: {second: {third: destructuredThird}}} = nestedObjects
console.log(destructuredThird)


// Swapping variables with destructuring

let a = 5, b = 2;
[a, b] = [b, a]

// Destructuring + rest syntax

let [first, ...rest] = test
console.log(first, rest)

// Ternary operator

let value = typeof newTest == "object" ? true : false
console.log(value)

// It is also possible to use multiple conditions with ternary operators. This is not recommended, though, because such expressions are considerably more difficult to read.
value == false ? console.log("False") : value == undefined ? console.log("Undefined") : console.log("True")

// Arrow functions and default parameters

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

// ------------------------------------------------------------------------------------------- //

// Arrow functions don't have their own this, but use that of the enclosing lexical scope.
// As a result, their "this" cannot be rebound via methods such as bind, call and apply.

const testObject = {
  name: "Test object"
}

function goodOldFunction() {
  console.log(this)
}

goodOldFunction.call(testObject)
testObject.logThis = goodOldFunction;
testObject.logThis()

// ---- //

const arrowFunction = () => console.log(this)

arrowFunction.call(testObject)
testObject["arrowFunction"] = arrowFunction
testObject.arrowFunction()

// The same happens with constructor functions and classes

function CreateObject(name) {
  this.name = name;
  // THESE WORK!
  // this.log = function() {
  //   console.log(this.name)
  // };
  // this.arrowLog = () => {
  //   console.log(this.name)
  // }
}

CreateObject.prototype.log = function() {console.log(this)}
// THIS ONE DOESN'T WORK!
// I was born in the window object x_x
CreateObject.prototype.arrowLog = arrowLog = () => {console.log(this)}

const objectFromConstructor = new CreateObject("Object from constructor")
objectFromConstructor.log()
objectFromConstructor.arrowLog()

// Spread syntax will only take you as far

let deepArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

console.log(deepArray)

for (let array of [...deepArray]) {
  [...array].length = 2
}

console.log(deepArray)