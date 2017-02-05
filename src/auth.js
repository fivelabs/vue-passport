import _ from 'lodash';
import Resource from './resource';
import { ACCESS_TOKEN, ACCESS_TOKEN_ID } from './resource';

const BASE_URI = 'oauth/';

const ACCESS_TOKEN_SCOPES = 'scopes';

export default class extends Resource {

  accessTokenKey = ACCESS_TOKEN;
  accessTokenIdKey = ACCESS_TOKEN_ID;
  accessTokenScopesKey = ACCESS_TOKEN_ID;
  loginPath = 'login';
  logoutPath = 'logout';
  userPath = 'user';

  login(credentials) {
    return this.post(BASE_URI + this.loginPath, credentials).then(
      response => this.remember(
        _.get(response.data, this.accessTokenKey),
        _.get(response.data, this.accessTokenIdKey),
        _.get(response.data, this.accessTokenScopesKey)
      )
    );
  }

  logout() {
    return this.destroy(BASE_URI + this.logoutPath + '/' + this.accessTokenId).then(this.forget);
  }

  forget() {
    super.storage.clear();
    return this;
  }

  remember(accessToken, accessTokenId, scopes) {
    super.storage.set(ACCESS_TOKEN, accessToken);
    super.storage.set(ACCESS_TOKEN_ID, accessTokenId);
    super.storage.set(ACCESS_TOKEN_SCOPES, scopes);
    return this;
  }

  user() {
    return this.get(BASE_URI + this.userPath, this.userOptions);
  }

  get userOptions() {
    return {
      params: {

      }
    };
  }

}