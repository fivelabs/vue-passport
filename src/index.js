import _ from 'lodash';

export Auth from './auth';
export Resource from './resource';

export default {

  install(Vue, { resources }) {

    if (!resources) {
      console.error('Must pass the resources. i.e. Vue.use(VueResource, { resources })');
    }

    _.each(resources, (Resource, key) => {

      resources[key] = new Resource;

    });

    Vue.passport = resources;

    Object.defineProperties(Vue.prototype, {

      $passport: {

        get() {

          return Vue.passport;

        },

      },

    });

  },

};