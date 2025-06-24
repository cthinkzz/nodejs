console.log("This is printed from app.js");
// hello();
let hello = require("./index.cjs"); // not hoisted, executes in synchornous order
console.log("This is printed from app.js");
