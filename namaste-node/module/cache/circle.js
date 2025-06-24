const { PI } = Math;

console.log("This is printed from circle.js");
exports.area = (r) => PI * r ** 2;

exports.circumference = (r) => 2 * PI * r;

let value = 0;
let obj = {
  value: 0,
};

setInterval(() => {
  value++;
  //  console.log("value in circle.js", value); // this update does not reflect in call.js as it is pass by value

  obj.value++;
  //  console.log("value in circle.js", obj.value); // this update reflects in call.js as it is pass by reference
}, 1000);
exports.value = value;
exports.obj = obj;
