import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import config from 'contacts-frontend/config/environment';

const { inject, computed } = Ember;

export default AjaxService.extend({
  session: inject.service(),
  host: config.API_HOST,
  namespace: config.API_NAMESPACE,
  headers: computed('session.authToken', {
    get() {
      let headers = {};
      const authToken = this.get('session.authToken');
      if (authToken) {
        headers['auth-token'] = authToken;
      }
      return headers;
    }
  }),
  apiRequest(path, ...args) {
    args.unshift(`/api/v1${path}`);
    return this.request(...args);
  }
});
