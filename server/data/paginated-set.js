var PaginatedSet = function(records, page, perPage, collectionSize) {
  this.records = records;
  this.page = page;
  this.perPage = perPage;
  this.collectionSize = collectionSize;
}

var PaginatedSetClass = {
  constructor: PaginatedSet,

  getRecords: function() {
    return this.records;
  },

  getMeta: function() {
    var totalPages = Math.ceil(this.collectionSize / this.perPage);

    return {
      page: this.page,
      per_page: this.perPage,
      total_pages: totalPages,
    };
  },

  asJSON: function(keyName) {
    var data = {
      meta: this.getMeta(),
    };
    
    data[keyName] = this.getRecords();

    return data;
  },
};

PaginatedSet.prototype = PaginatedSetClass;

module.exports = PaginatedSet;
