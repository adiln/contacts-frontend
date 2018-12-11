import Component from '@ember/component';
import Ember from 'ember';
const { inject, getOwner } = Ember;
export default Component.extend({
  ajax: inject.service(),
  flashMessages: inject.service(),
  actions: {
    signup() {
      const flashMessages = this.get('flashMessages');
      const requestPayload = {
        method: 'POST',
        data: {
          first_name: this.get('firstName'),
          last_name: this.get('lastName'),
          email: this.get('email'),
          zip_code: this.get('zip_code'),
          aadhaar: this.get('aadhaar'),
          address: this.get('address'),
          password: this.get('password'),
          confirm_password: this.get('confirm_password')
        }
      };

      const transition = getOwner(this).lookup('router:main');
      this.get('ajax').request('/users/auth/register', requestPayload).then((response) => {
        flashMessages.success('Signed up successfully!');
        return transition.transitionTo('login');
      }).catch((error) => {
        let msg = [];
        Object.keys(error.payload).forEach(key => {
          msg.push(`${key} ${error.payload[key]}`);
        });
        flashMessages.danger(msg.join(' ,'));
      });
    }
  }
});
