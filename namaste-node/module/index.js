require("./route.js");

console.log("This is printed from index.js");

console.log("index module before exports", module);
module.exports = function () {
  console.log("This is printed from index.js again");
};
console.log("index module after exports", module);
