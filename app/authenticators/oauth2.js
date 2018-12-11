import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import config from 'contacts-frontend/config/environment';

const host = config.API_HOST || '';
const namespace = config.API_NAMESPACE;

const serverTokenEndpoint = [ host, namespace, 'users/auth/login' ];
export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: serverTokenEndpoint.join('/')
});
