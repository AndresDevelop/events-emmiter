const handlers = {};
const trigger = (type) => {
  handlers[type]();
};
const on = (type, handler) => {
  handlers[type] = handler;
};
