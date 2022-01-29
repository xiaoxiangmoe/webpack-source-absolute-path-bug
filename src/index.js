const foo = Math.random() > 0.5 ? "a" : "b";

const m = require(`./foo/${foo}.js`);

console.log(m);
