const EventEmitter = require("node:events");

class EventClass extends EventEmitter {}

const event = new EventClass();
event.on("foo", () => {
  console.log("Called");
});
setTimeout(() => {
  event.emit("foo");
}, 500);

class MyOwnEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(name, fn) {
    const listener = this.listeners[name];
    if (listener) {
      const temp = [...listener];
      temp.push(fn);
      listener[name] = temp;
    }
    this.listeners[name] = [fn];
  }

  emit(name, ...args) {
    const listener = this.listeners[name];
    listener.forEach((fn) => {
      fn.call(null, ...args);
    });
  }
}

const eventEmitter = new MyOwnEventEmitter();
eventEmitter.on("foo", () => {
  console.log("Foo Called");
});

eventEmitter.on("foo", (arg1, arg2) => {
  console.log("Foo called with args ", arg1, arg2);
});

eventEmitter.on("bar", (arg1) => {
  console.log("bar called with args", arg1);
});

eventEmitter.emit("foo");
eventEmitter.emit("foo", 1, 2);
eventEmitter.emit("bar", 3);
