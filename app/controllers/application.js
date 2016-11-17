import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Controller.extend({
  store: inject.service(),

  metaData: null,
  page: 1,
  pageIsLoading: false,
  perPage: 50,
  items: [],

  stillHasPages: computed('metaData.total_pages', 'page', function() {
    const totalPages = this.get('metaData.total_pages');
    const page = this.get('page');

    return totalPages < page;
  }),

  activeItems: computed.filterBy('items', 'isDeleted', false),

  actions: {
    reachedTheEnd: function() {
      this.set('pageIsLoading', true); 
      this.incrementProperty('page');

      const store = this.get('store');
      const page = this.get('page');
      const perPage = this.get('perPage');

      store.query('item', { page: page, per_page: perPage }).then(result => {
        const metaData = result.get('meta');

        this.get('items').pushObjects(result.get('content'));
        this.setProperties({
          metaData: metaData,
          pageIsLoading: false,
        });
      });
    }
  },
});
