const { Buffer, constants } = require('buffer');

const memoryContainer = Buffer.alloc(4);
memoryContainer.writeInt8(10, 0);
memoryContainer.writeInt8(-128, 1); //<Buffer 0a 80 00 14> 80, because in binary it is 1000 0000
// memoryContainer.writeInt8(128, 2); // error because range is from -128 to 127
memoryContainer.writeInt8(20, 3);

// Buffer.from() No need to mention the memory upfront
console.log('memoryContainer', memoryContainer);
console.log('memoryContainer', memoryContainer[0].toString());

const memoryContainer2 = Buffer.from([0x48, 0x69, 0x21], 'utf-8');
console.log('memoryContainer2', memoryContainer2);
console.log('memoryContainer2', memoryContainer2.toString());

const memoryContainer3 = Buffer.from('Hi!', 'utf-8'); //uses allocUnsafe() behind the scenes
console.log('memoryContainer3', memoryContainer3);
console.log('memoryContainer3', memoryContainer3.toString());
console.log('memoryContainer3', memoryContainer3.toString());

console.log('poolSize', Buffer.poolSize);
console.log('MAX_LENGTH', constants.MAX_LENGTH);
