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
  groups: computed('dataFetcher', function () {
    this.fetchGroups();
  }),

  fetchGroups() {
    return this.get('dataFetcher').fetchGroups($.param({ user_id: this.get('currentUser.userId') })).then((response) => {
      if (this.isDestroyed) {
        return;
      }
      this.set('groups', response.groups);
    });
  },

  actions: {
    openEditGroupModal(group_id) {
      let groups = this.get('groups');
      let group = groups.filterBy('id', group_id).get('firstObject');
      this.setProperties({
        group_id: group.id,
        name: group.name,
        active: group.active,
        edit: true
      });
      this.toggleProperty('showGroupModal');
      return;
    },
    deleteGroup(group_id) {
      const flashMessages = get(this, 'flashMessages');
      this.get('ajax').request(`/groups/${group_id}`, { method: 'DELETE' }).then(() => {
        flashMessages.success('Successfully deleted!');
        this.fetchGroups();
      });
    },

    openCreateGroupModal() {
      this.toggleProperty('showGroupModal');
      this.setProperties({
        name: '',
        active: false
      });
      this.set('edit', false);
      return;
    },
    closeModal() {
      this.toggleProperty('showGroupModal');
    },
    createGroup() {
      const flashMessages = get(this, 'flashMessages');
      const requestPayload = {
        method: 'POST',
        data: {
          user_id: this.get('currentUser.userId'),
          name: this.get('name'),
          active: this.get('active')
        }
      };
      this.get('ajax').request('/groups', requestPayload).then((response) => {
        flashMessages.success('Successfully saved!');
        this.set('groups', response.groups);
      }).catch(() => {
        flashMessages.danger('Something went wrong!');
      });
      this.set('showGroupModal', false);
    },

    editGroup(group_id) {
      const requestPayload = {
        method: 'PUT',
        data: {
          name: this.get('name'),
          active: this.get('active')
        }
      };
      const flashMessages = get(this, 'flashMessages');
      this.get('ajax').request(`/groups/${group_id}`, requestPayload).then(() => {
        flashMessages.success('Successfully modified!');
        this.fetchGroups();
      });
      this.set('showGroupModal', false);
    }
  }
});
