var dotty = require("dotty"),
    merge = require("deepmerge");

var Souffle = module.exports = function Souffle() {
  this.list = [];
  this.current = null;
};

Souffle.prototype.layer = function layer(meta) {
  this.current = Object.create(null);
  this.list.push({meta: meta, data: this.current});
};

Souffle.prototype.exists = function exists(key) {
  return dotty.exists(this.collapse(), key);
};

Souffle.prototype.get = function get(key) {
  return dotty.get(this.collapse(), key);
};

Souffle.prototype.put = function put(key, value) {
  dotty.put(this.current, key, value);
};

Souffle.prototype.collapse = function collapse() {
  return this.list.map(function(e) { return e.data; }).reduce(merge, {});
};
