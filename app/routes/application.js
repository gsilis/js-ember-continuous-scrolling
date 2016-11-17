import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.query('item', { page: 1, per_page: 50 });
  },

  setupController: function(controller, model) {
    this._super(...arguments);

    controller.setProperties({
      items: model,
      metaData: model.get('content.meta'),
    });
  },
});
