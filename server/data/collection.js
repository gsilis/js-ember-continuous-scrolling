var PaginatedSet = require('./paginated-set');

var Collection = function() {
  this.items = [];
  this.nextId = 0;
}

var CollectionClass = {
  /**
   * Remap constructor
   */
  constructor: Collection,

  add: function(data) {
    if (!data.id) {
      data = Object.assign({}, data, { id: this.getNextId() });
    }

    this.items.push(data);
  },

  find: function(id) {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        return this.items[i];
      }
    }

    return null;
  },

  getNextId: function() {
    return this.nextId += 1;
  },

  query: function(params) {
    var perPage = params.per_page;
    var page = params.page;

    delete params.per_page;
    delete params.page;

    var records = this.items.filter(this.queryFilterFor(params));
    return this.paginate(records, perPage, page);
  },

  queryFilterFor: function(params) {
    return function(record) {
      return this.checkRecordAgainstParams(record, params);
    }.bind(this);
  },

  checkRecordAgainstParams: function(record, params) {
    var keys = Object.keys(params);

    if (keys.length < 1) {
      return true;
    }
    
    return keys.reduce(function(valid, key) {
      if (record[key] !== params[key]) {
        return false;
      }

      return valid;
    }, true);
  },

  paginate: function(records, perPage, page) {
    page = page || 1;
    perPage = perPage || 50;

    var startIndex = (page - 1) * perPage;
    var endIndex = page * perPage;
    var sliced = records.slice(startIndex, endIndex);

    return new PaginatedSet(sliced, page, perPage, this.items.length);
  },
};

Collection.prototype = CollectionClass;

module.exports = Collection;
