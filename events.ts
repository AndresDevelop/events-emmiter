interface Handlers {
  [key: string]: Array<Handler>;
}

interface Handler {
  (...args: any): void;
}

const createEvents = () => {
  const handlers: Handlers = {};

  const trigger = (type: string, ...args: any) => {
    const event = handlers[type];
    if (event) {
      event.forEach((handler) => handler(...args));
    } else {
      throw new Error(`No event handler found for type ${type}`);
    }
  };

  const on = (type: string, handler: Handler) => {
    if (!handlers[type]) {
      handlers[type] = [];
    }
    handlers[type].push(handler);
  };

  const off = (type: string, handlerToRemove: Handler) => {
    if (handlers[type]) {
      const removeHandlers = handlers[type].filter(
        (handler) => handler !== handlerToRemove
      );
      handlers[type] = removeHandlers;
    }
  };

  return { trigger, on, off };
};

export default createEvents;
