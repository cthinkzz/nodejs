const func1 = () => {
  const fs = require('fs');
  console.log('Started');

  setImmediate(() => console.log('setImmediate - 1'));

  setTimeout(() => console.log('setTimeout'), 0);

  fs.readFile('file.txt', () => console.log('File read completed')); //file read may take time so the callback will be pushed to 2nd phase after sometime

  setImmediate(() => console.log('setImmediate - 2'));

  process.nextTick(() => console.log('process.nextTick'));

  console.log('Completed');
};

const func2 = () => {
  const fs = require('fs');
  console.log('Started');

  fs.readFile('file.txt', () => {
    console.log('File read completed');
    setImmediate(() => console.log('setImmediate - 1'));
    setTimeout(() => console.log('setTimeout'), 0);
    setImmediate(() => console.log('setImmediate - 2')); //its logged first because after file reading phase i.e 2nd phase, setImmediate phase comes in the Tick
    process.nextTick(() => console.log('process.nextTick'));
  });

  console.log('Completed');
};

const func3 = () => {
  setImmediate(() => console.log('setImmediate'));
  setTimeout(() => console.log('setTimeout'), 0);
};

// func1();
// func2();
// func3();

//https://nodejs.org/en/learn/asynchronous-work/understanding-setimmediate
const baz = () => console.log('baz');
const foo = () => console.log('foo');
const zoo = () => console.log('zoo');

const start = () => {
  console.log('start');
  setImmediate(baz);
  new Promise((resolve, reject) => {
    resolve('bar');
  }).then((resolve) => {
    console.log(resolve);
    process.nextTick(zoo);
  });
  process.nextTick(foo);
};

// start();

const func4 = () => {
  console.log('Hello => number 1');
  setImmediate(() => {
    console.log('Running before the timeout => number 4'); //it should have run 3rd, but its a known bug, as its falls in 3d phase
  });
  setTimeout(() => {
    console.log('The timeout running last => number 3');
  }, 0);
  process.nextTick(() => {
    console.log('Running at next tick => number 2');
  });
};
func4();
