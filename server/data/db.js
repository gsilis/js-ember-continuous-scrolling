var Collection = require('./collection');

module.exports = {
  createFor: function(name) {
    return this[name] = new Collection(name);
  }
};
