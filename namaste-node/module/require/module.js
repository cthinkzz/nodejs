console.log("before require ", module); //no children
require("./submodule");
console.log("after require ", module); //has children
