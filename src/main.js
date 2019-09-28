import Vue from 'vue';
import { router } from './router/routes';
import { store } from './vuex/store';
import moment from 'moment';

Vue.filter('capitalize', function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
})

Vue.filter('formatDate', function(date) {
  return moment(String(date)).format('DD.MM.YYYY')
})

new Vue({
  el: '#app',
  created() {
    this.$store.dispatch('requestUsers');
  },
  router,
  store
})
