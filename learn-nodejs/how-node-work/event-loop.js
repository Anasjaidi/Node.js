setTimeout(() => {
  setImmediate(() => console.log('test'))
  setTimeout(() => console.log("test time 1"), 0);
  setImmediate(() => console.log('test2'))
  setTimeout(() => console.log("test time 2"), 0);
}, 0);
