import Vue from 'vue';
import Store from 'store2';

export const ACCESS_TOKEN = 'accessToken';
export const ACCESS_TOKEN_ID = 'accessTokenId';

export default class {

  get(uri, options) {
    return Vue.http.get(this.baseUrl + uri, this.options(options));
  }

  head(uri, options) {
    return Vue.http.head(this.baseUrl + uri, this.options(options));
  }

  destroy(uri, options) {
    return Vue.http.delete(this.baseUrl + uri, this.options(options));
  }

  jsonp(uri, options) {
    return Vue.http.jsonp(this.baseUrl + uri, this.options(options));
  }

  post(uri, body, options) {
    return Vue.http.post(this.baseUrl + uri, body, this.options(options));
  }

  put(uri, body, options) {
    return Vue.http.put(this.baseUrl + uri, body, this.options(options));
  }

  patch(uri, body, options) {
    return Vue.http.patch(this.baseUrl + uri, body, this.options(options));
  }

  get baseUrl() {
    return '/';
  }

  options(options) {
    options = options || {};
    return {
      headers: this.accessTokenHeaders,
      ...options,
    };
  }

  check() {
    return this.accessToken && this.accessToken.length > 0;
  }

  get accessTokenHeaders() {
    return {
      Authorization: 'Bearer ' + this.accessToken,
    };
  }

  get accessToken() {
    return this.storage.get(ACCESS_TOKEN, '');
  }

  get accessTokenId() {
    return this.storage.get(ACCESS_TOKEN_ID);
  }

  get storage() {
    return Store.namespace('oauth');
  }

};
