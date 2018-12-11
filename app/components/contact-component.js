import Ember from 'ember';
import Component from '@ember/component';
const { inject } = Ember;
import { computed, get } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  dataFetcher: inject.service('data-fetcher'),
  currentUser: inject.service(),
  ajax: inject.service(),
  flashMessages: inject.service(),
  showContactModal: false,
  contacts: computed('dataFetcher', function () {
    this.fetchContacts();
  }),

  fetchContacts() {
    return this.get('dataFetcher').fetchContacts($.param({ user_id: this.get('currentUser.userId') })).then((response) => {
      if (this.isDestroyed) {
        return;
      }
      this.set('contacts', response.contacts);
    });
  },

  groups: computed('dataFetcher', function () {
    return this.get('dataFetcher').fetchGroups($.param({ user_id: this.get('currentUser.userId') })).then((response) => {
      if (this.isDestroyed) {
        return;
      }
      this.set('groups', response.groups);
    });
  }),

  isGroupAvailable: computed.gt('groups.length', 0),

  actions: {
    deleteContact(contact_id) {
      const flashMessages = get(this, 'flashMessages');
      this.get('ajax').request(`/contacts/${contact_id}`, { method: 'DELETE' }).then(() => {
        flashMessages.success('Successfully deleted!');
        this.fetchContacts();
      });
    },

    openCreateContactModal() {
      this.toggleProperty('showContactModal');
      this.setProperties({
        name: '',
        email: ''
      });
      this.set('edit', false);
      return;
    },

    closeModal() {
      this.toggleProperty('showContactModal');
    },

    setSelection: function(selected) {
      this.set('selectedOption', selected)
    },

    createContact() {
      const requestPayload = {
        method: 'POST',
        data: {
          user_id: this.get('currentUser.userId'),
          group_id: parseInt(this.get('selectedOption')),
          name: this.get('name'),
          email: this.get('email')
        }
      };
      const flashMessages = get(this, 'flashMessages');
      this.get('ajax').request('/contacts', requestPayload).then((response) => {
        flashMessages.success('Successfully created!');
        this.set('contacts', response.contacts);
      }).catch((error) => {
        let msg = [];
        Object.keys(error.payload).forEach(key => {
          msg.push(`${key} ${error.payload[key]}`);
        });
        flashMessages.danger(msg.join(' ,'));
      });
      this.set('showContactModal', false);
    }
  }
});
