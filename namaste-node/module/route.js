console.log("This is printed from route.js");

console.log("route module before exports ", module);
module.exports = function () {
  console.log("This is printed from route.js again");
};
console.log("route module after exports", module);
