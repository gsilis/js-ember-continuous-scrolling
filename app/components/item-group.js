import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  store: inject.service(),

  tagName: 'tbody',

  group: null,
  showContents: false,
  fetchedItems: [],

  account: computed('accountId', function() {
    return this.get('accountId') && this.get('store').find('account', this.get('accountId'));
  }),

  fullName: computed.readOnly('account.fullName'),

  itemIds: computed.readOnly('group.itemIds'),
  accountId: computed.readOnly('group.accountId'),

  actions: {
    click() {
      this.toggleProperty('showContents');

      const ids = this.get('itemIds');

      if (this.get('showContents')) {
        this.set('fetchedItems', ids.map(id => this.get('store').find('item', id)));
      }
    }
  },
});
