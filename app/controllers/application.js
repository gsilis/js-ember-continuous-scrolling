import Ember from 'ember';

export default Ember.Controller.extend({
  page: 1,
  perPage: 50,
  items: [],

  actions: {
    nextPage: function() {
      console.log('U R NEX!');
    },

    reachedTheEnd: function() {
      console.log('REACHED EDN');
    }
  },
});
