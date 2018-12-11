import Ember from 'ember';
import Service from '@ember/service';
const { inject } = Ember;

export default Service.extend({
  ajax: inject.service(),
  store: inject.service(),
  fetchGroups(query) {
    const url = `/groups?${query}`;
    return this.get('ajax').apiRequest(url);
  },
  fetchContacts(query) {
    const url = `/contacts?${query}`;
    return this.get('ajax').apiRequest(url);
  }
});
