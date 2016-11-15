var PaginatedSet = function(records, page, perPage, collectionSize) {
  this.records = records;
  this.page = page;
  this.perPage = perPage;
  this.collectionSize = collectionSize;
}

var PaginatedSetClass = {
  constructor: PaginatedSet,

  getMeta: function() {
    var totalPages = Math.ceil(this.collectionSize / this.perPage);

    return {
      page: this.page,
      per_page: this.perPage,
      total_pages: totalPages,
    };
  }
};

PaginatedSet.prototype = PaginatedSetClass;

module.exports = PaginatedSet;
