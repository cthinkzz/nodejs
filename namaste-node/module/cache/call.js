console.log("cache before", require.cache); // How come its not empty ??

const circle1 = require("./circle.js");

console.log("cache after", require.cache); // How come circle.js is cached ??

console.log(require.resolve("./circle.js")); //returns the absoulte path
// console.log("cached", require.cache[require.resolve("./circle.js")]);
console.log("cached", require.cache[require.resolve("./dummy.js")]); // returns undefined as it is not cached

console.log(`The area of a circle of radius 4 is ${circle1.area(4)}`);
console.log(
  `The area of a circle of radius 4 is ${require.cache[
    require.resolve("./circle.js")
  ].exports.area(4)}`
); // we can access the exports of the cached module also

let circle2;
let circle3;

setTimeout(() => {
  circle2 = require("./circle.js"); // this will run the circle.js file again as it is deleted from cache
  delete require.cache[require.resolve("./circle.js")];
}, 2000);

setTimeout(() => {
  circle3 = require("./circle.js"); // this will run the circle.js file again as it is deleted from cache
}, 3000);

setInterval(() => {
  //   console.log("circle1 ", circle1.value); // 0 pass by value, so is not updated
  //   console.log("circle2 ", circle2?.value); // 0 pass by value, so is not updated
  //   console.log("circle3 ", circle3?.value); // 0 pass by value, so is not updated

  console.log("circle1 ", circle1.obj.value); // as per the setInterval in circle.js
  console.log("circle2 ", circle2?.obj?.value); // as per circle1, because circle2 is cached
  console.log("circle3 ", circle3?.obj?.value); // as per the setInterval in circle.js but with different interavel of time as cache is deleted and then imported again
  console.log("\n");
}, 1000);
