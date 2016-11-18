import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':item-item', 'isPrimary:is-primary'],
  tagName: 'tr',
  item: null,
});
