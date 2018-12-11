import Ember from 'ember';
import Component from '@ember/component';
const { inject, getOwner } = Ember;

export default Component.extend({
  session: inject.service(),
  ajax: inject.service(),
  currentUser: inject.service(),
  email: '',
  password: '',
  actions: {
    authenticate() {
      const { email, password } = this.getProperties('email', 'password');
      const transition = getOwner(this).lookup('router:main');
      this.get('session').authenticate('authenticator:oauth2', email, password).then(() => {
        this.get('currentUser')._setUserFromSession();
        return transition.transitionTo('index');
        }, (err) => {
        this.set('errorMessage', reason.error || reason);
        console.log('Error obtaining token: ' + err.responseText);
      });
    }
  }
});
