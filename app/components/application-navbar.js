import Ember from 'ember';
import Component from '@ember/component';
const { inject, computed } = Ember;

export default Component.extend({
  currentUser: inject.service(),
  name: computed(function () {
    return this.get('currentUser').getName();
  }),
  actions: {
    logout() {
      this.get('currentUser').invalidateSession();
    }
  }
});
