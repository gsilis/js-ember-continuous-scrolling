import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  birthdate: attr('date'),
});
