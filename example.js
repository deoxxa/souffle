#!/usr/bin/env node

var Souffle = require("./index");

var souffle = new Souffle();

souffle.layer({from: 1, time: Date.now()});
souffle.put("a", "x");

souffle.layer({from: 2, time: Date.now()});
souffle.put("b", "y");

souffle.layer({from: 3, time: Date.now()});
souffle.put("d.e", "f1");
souffle.put("d.f", "f2");
souffle.put("d.g", "f3");

souffle.layer({from: 4, time: Date.now()});
souffle.put("d.h", "f4");

souffle.layer({from: 5, time: Date.now()});
souffle.put("a", "replaced data");

//console.log(souffle.get("d"));

function wrap(s) {
  var l = new Array(s.length + 1).join("=");
  return [l, s, l, ""].join("\n");
};

console.log(wrap("history"));

souffle.list.forEach(function(e) {
  console.log("# meta");
  console.log(JSON.stringify(e.meta));
  console.log("# data");
  console.log(JSON.stringify(e.data));
  console.log("");
});

console.log(wrap("compiled"));
console.log(JSON.stringify(souffle.collapse(), null, 2));
