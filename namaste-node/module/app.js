console.log("This is printed from app.js");

console.log("app module before require", module); // no children
const indexFn = require("./index.js");
console.log("app module after require", module); // has children

indexFn();
