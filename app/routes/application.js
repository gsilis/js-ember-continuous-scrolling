import Ember from 'ember';
import { convertCollection } from 'js-ember-continuous-scrolling/utils/convert-activity-meta';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('account').then(accounts => {
      return Ember.RSVP.hash({
        accounts,
        items: this.store.query('item', { per_page: 100, page: 1 }),
      });
    });
  },

  setupController: function(controller, model) {
    this._super(...arguments);

    const metaData = model.items.get('meta');
    const convertedCollection = convertCollection(model.items, metaData.markers);

    controller.setProperties({
      accounts: model.accounts,
      primaryAccount: model.accounts.get('firstObject'),
      secondaryAccount: model.accounts.get('lastObject'),
      items: convertedCollection,
      metaData,
    });
  },
});
