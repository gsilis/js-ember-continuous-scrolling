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
      Object.assign({}, data, { id: this.getNextId() });
    }

    this.items.push(data);
  },

  getNextId: function() {
    return this.nextId += 1;
  },

  query: function(params) {
    return this.items.filter(this.queryFilterFor(params));
  },

  queryFilterFor: function(params) {
    var perPage = params.perPage;
    var page = params.page;

    delete params.perPage;
    delete params.page;

    var records = function(record) {
      return this.checkRecordAgainstParams(record, params);
    }.bind(this);

    return this.paginate(records, perPage, page);
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

    var startIndex = page - 1 * perPage;
    var endIndex = page * perPage;
    var sliced = records.slice(startIndex, endIndex);

    return new PaginatedSet(sliced, page, perPage, this.items.length);
  },
};

Collection.prototype = CollectionClass;

module.exports = Collection;
