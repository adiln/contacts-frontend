import JSONAPIAdapter from 'ember-data/adapters/json-api';
import config from 'contacts-frontend/config/environment';

export default JSONAPIAdapter.extend({
  namespace: config.API_NAMESPACE
});


