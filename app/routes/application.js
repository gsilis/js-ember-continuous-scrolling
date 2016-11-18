import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('account').then(accounts => {
      return Ember.RSVP.hash({
        accounts,
        items: this.store.query('item', { per_page: 50, page: 1 }),
      });
    });
  },

  setupController: function(controller, model) {
    this._super(...arguments);

    controller.setProperties({
      accounts: model.accounts,
      primaryAccount: accounts.get('firstObject'),
      secondaryAccount: accounts.get('lastObject'),
      items: model.items,
      metaData: model.items.get('content.meta'),
    });
  },
});
