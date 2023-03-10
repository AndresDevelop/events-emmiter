import createEvents from "./events";

const emitter = createEvents();

const handler1 = (...args: any) => {
  return console.log(`This is an event1 ${args}`);
};

const handler2 = (...args: any) => {
  return console.log(`This is an event2 ${args}`);
};

emitter.on("foo", handler1);
emitter.on("foo", handler2);
emitter.on("bar", () => console.log("3"));

emitter.trigger("foo", "hello");
emitter.trigger("bar");

emitter.off("foo", handler1);

emitter.trigger("foo", "foo1", "foo2");
