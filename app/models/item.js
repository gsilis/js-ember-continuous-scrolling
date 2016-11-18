import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  birthdate: attr('date'),

  account: belongsTo('account'),
});
