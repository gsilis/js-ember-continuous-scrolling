import Ember from 'ember';
import { convertCollection } from 'js-ember-continuous-scrolling/utils/convert-activity-meta';

const { computed, inject } = Ember;

export default Ember.Controller.extend({
  store: inject.service(),

  metaData: null,
  page: 1,
  pageIsLoading: false,
  perPage: 100,
  items: [],

  stillHasPages: computed('metaData.total_pages', 'page', function() {
    const totalPages = this.get('metaData.total_pages');
    const page = this.get('page');

    return page < totalPages;
  }),

  actions: {
    reachedTheEnd: function() {
      this.set('pageIsLoading', true); 
      this.incrementProperty('page');

      const store = this.get('store');
      const page = this.get('page');
      const perPage = this.get('perPage');

      store.query('item', { page: page, per_page: perPage }).then(result => {
        const metaData = result.get('meta');
        const convertedCollection = convertCollection(result, metaData.markers);


        this.get('items').pushObjects(convertedCollection.content);
        this.setProperties({
          metaData: metaData,
          pageIsLoading: false,
          page: metaData.page,
        });
      });
    }
  },
});
