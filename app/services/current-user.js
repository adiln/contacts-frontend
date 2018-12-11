import Ember from 'ember';
import Service from '@ember/service';
const { inject, isPresent, get, computed, getOwner } = Ember;
export default Service.extend({
  store: inject.service(),
  session: inject.service(),
  user: undefined,
  _setUserFromSession() {
    this.set('user', this.get('session.data.authenticated.user'));
  },

  sessionValid: computed('session.isAuthenticated', function() {
    let session = this.get('session');
    let user = get(session, 'data.authenticated.user');
    return isPresent(user);
  }),

  userId: computed('session.isAuthenticated', function () {
    let session = this.get('session');
    return get(session, 'data.authenticated.user.user_id');
  }),

  name: computed('session.isAuthenticated', function() {
    let session = this.get('session');
    let user = get(session, 'data.authenticated.user');
    return `${user.first_name} ${user.last_name}`;
  }),
  invalidateSession() {
    const transition = getOwner(this).lookup('router:main');
    this.get('session').invalidate();
    return transition.transitionTo('login');
  }
});
