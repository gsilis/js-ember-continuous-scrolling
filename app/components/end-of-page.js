import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  isActive: false,
  isLoading: false,

  init: function() {
    this._super(...arguments);

    this.onScroll = this.onScroll.bind(this);
  },

  didInsertElement: function() {
    window.addEventListener('scroll', this.onScroll);
  },

  willDestroyElement: function() {
    window.removeEventListener('scroll', this.onScroll);
  },

  shouldStop: computed.or('isLoading', 'isNotActive'),
  isNotActive: computed.not('isActive'),

  onScroll: function(event) {
    if (this.get('shouldStop')) {
      return;
    }

    const paneHeight = window.innerHeight;
    const scrollPosition = window.pageYOffset;
    const componentPosition = this.$().offset().top;

    if (componentPosition - paneHeight <= scrollPosition) {
      this.sendAction('reachedTheEnd');
    }
  },
});
