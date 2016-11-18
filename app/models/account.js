import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { attr } = DS;

export default DS.Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),

  fullName: computed('lastName', 'firstName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),
});
