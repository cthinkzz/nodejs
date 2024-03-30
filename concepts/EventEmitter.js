/**
 * The EventEmitter class in Node.js is designed to facilitate event-driven programming. When extended or instantiated, it creates an object that can store event names (keys) and corresponding event listener functions for those events. If the same event name is attached multiple times, the EventEmitter will handle it by registering multiple listener functions for that event, maintaining them in an array.
 */

const EventEmitter = require('events').EventEmitter;

class MyClass extends EventEmitter {}
const myEmitter = new MyClass();
myEmitter.on('foo', () => {
  console.log('Foo - 1');
});
myEmitter.on('foo', () => {
  console.log('Foo - 2');
});
myEmitter.on('foo', (...args) => {
  console.log('Foo with args', args);
});

myEmitter.emit('foo');
myEmitter.emit('foo', 'first', 'second');

myEmitter.once('bar', () => {
  console.log('Bar - called only once');
});
myEmitter.on('bar', () => {
  console.log('Bar - called many times');
});
myEmitter.emit('bar');
myEmitter.emit('bar');

myEmitter.emit('notregistered');

myEmitter.once('car', () => {
  try {
    console.log('Car - called');
    throw new Error('Errored');
  } catch (err) {
    myEmitter.emit('error', err); //have to emit error manually, error inside listeners won't be caught automatically
  }
});
myEmitter.on('error', (err) => console.log('Error caught:', err));
myEmitter.emit('car');
