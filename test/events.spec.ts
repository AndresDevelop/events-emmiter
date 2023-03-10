import { expect, test, describe, vi } from "vitest";

import createEvents from "../events";

describe("Events", () => {
  test("The method on should be called once", () => {
    const emitter = createEvents();
    const emitterSpy = vi.spyOn(emitter, "on");
    const handler = vi.fn();
    emitter.on("foo", handler);
    expect(emitterSpy).toBeCalled();
  });

  test("The method trigger should be called once", () => {
    const emitter = createEvents();
    const emitterSpy = vi.spyOn(emitter, "trigger");
    const handler = vi.fn();
    emitter.on("foo", handler);
    emitter.trigger("foo");
    expect(emitterSpy).toBeCalled();
  });

  test("The method trigger should be called once and have at least one argument", () => {
    const emitter = createEvents();
    const emitterSpy = vi.spyOn(emitter, "trigger");
    const handler = vi.fn();
    emitter.on("foo", handler);
    emitter.trigger("foo", "hello test");
    expect(emitterSpy).toBeCalled();
    expect(handler).toHaveBeenCalledWith("hello test");
  });

  test("The method trigger should be called once and have multiple arguments", () => {
    const emitter = createEvents();
    const emitterSpy = vi.spyOn(emitter, "trigger");
    const handler = vi.fn();
    emitter.on("foo", handler);
    emitter.trigger("foo", "hello test", "hello test 2");
    expect(emitterSpy).toBeCalled();
    expect(handler).toHaveBeenCalledWith("hello test", "hello test 2");
  });

  test("The method on should be called twice", () => {
    const emitter = createEvents();
    const emitterSpy = vi.spyOn(emitter, "on");
    const handler = vi.fn();
    emitter.on("foo", handler);
    emitter.on("foo", handler);
    emitter.trigger("foo", "hello test");
    expect(emitterSpy).toBeCalledTimes(2);
  });

  test("The method on should called for handlers for the same event", () => {
    const emitter = createEvents();
    const handler = vi.fn();
    const handler2 = vi.fn();

    emitter.on("foo", handler);
    emitter.on("foo", handler2);
    emitter.trigger("foo");
    expect(handler).toBeCalledTimes(1);
    expect(handler2).toBeCalledTimes(1);
  });

  test("Remove one of the events", () => {
    const emitter = createEvents();
    const handler = vi.fn();

    emitter.on("foo", handler);
    emitter.off("foo", handler);
    emitter.trigger("foo");
    expect(handler).not.toBeCalled();
  });
});
