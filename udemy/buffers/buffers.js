const { Buffer } = require("buffer");
console.log(Buffer.poolSize);

const buff1 = Buffer.alloc(4);
buff1.fill(0x11);
console.log(buff1);

console.log("\n");
const buff2 = Buffer.from([
  0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x57, 0x6f, 0x72, 0x6c, 0x64,
]);
console.log(buff2);
console.log(buff2.toString("utf-8"));
console.log(buff2.toString("binary")); // this is issue because it's not binary its latin1

console.log("\n");
const buff3 = Buffer.from("48656c6c6f20576f726c64", "hex");
console.log(buff3[0]);
console.log(buff3);
console.log(buff3.toString("utf-8"));
console.log(buff3.toString("binary")); // this is issue because it's not binary its latin1

console.log("\n");
const buff5 = Buffer.from("Hello World", "utf-8");
console.log(buff5[0]);
console.log(buff5);
console.log(buff5.toString());
console.log(buff5.toString("hex"));

console.log("\n");
const buff4 = Buffer.from(
  "0100100001100101011011000110110001101111001000000101011101101111011100100110110001100100",
  "binary" // THERE IS NO ENCODING FOR BINARY
);
console.log(buff4[0]);
console.log(buff4);
console.log(buff4.toString("utf-8")); // DOES NOT WORK
console.log(buff4.toString("binary")); // DOES NOT WORK
