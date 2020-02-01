let test = [{score: 3}, {score: 2}, {score: 1}]

// Preventing side effects by spreading the array in question.

console.log([...test].sort((a, b) => {return a.score - b.score}))
console.log(test)

// Object destructuring and computed properties

let [{score: firstScore}] = test;
console.log(`First score: ${firstScore}`)

let newTest = test.map(({score}) => { // ({score}) vs (score) -> in (1) we are destructuring the property "score". in (2) we would just be iterating over the array.
  return {
    [score]: score * 2,
    "score": score * 2
  }
})

let mix = [...test, ...newTest]

/*****************************/

let person = {
  info: {
    name: "Homer Simpson",
    age: 39,
  },
  getInfo() {
    return this.info
  },
  updateInfo(value) {
    this.info = value
  },
  updateDetails(value) {
    for (detail in value) {
      this.info[detail] = value[detail]
    }
  }
}

let {name, age} = person.getInfo();
name = "Bart Simpson"
age = 15
person.updateInfo({name, age})
console.log(person.getInfo())
person.updateDetails({age: 10})
console.log(person.getInfo())
/******/

// let variable = {value: 1}
// let {value} = object; -> object
// let objectA = {value}

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

// Spread syntax will only take you so far when it comes to cloning an array/object. (1 level deep)
// so how do you clone multidimensional arrays with the spread syntax?

let deepArray = [[3, 2, 1], [6, 5, 4], [9, 8, 7]]
let newDeepArray = [...deepArray]

// newDeepArray.forEach(array => array.sort((a, b) => a - b))
//newDeepArray.forEach((...array) => array.sort((a, b) => a - b))

for (let array of newDeepArray) {
  array.sort((a, b) => {return a - b})
}

console.log(newDeepArray)
console.log(deepArray) // OOPS!

// -- (1) -- // 

const multiArray = [[3, 2, 1], [6, 5, 4], [9, 8, 7]]
const newMultiArray = []

for (let array of multiArray) {
  newMultiArray.push([...array]) // Far from efficient. Not dynamic.
}

for (let array of newMultiArray) {
  array.sort((a, b) => a - b)
}

console.log(multiArray)
console.log(newMultiArray)

// -- (2) -- //

// I found this one on an article by Samantha Ming:

const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);
const multidimensionalArray = clone(multiArray)
console.log(multiArray)
console.log(multidimensionalArray.map(item => item.sort((a, b) => a - b)))
