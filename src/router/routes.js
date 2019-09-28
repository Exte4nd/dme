import Vue from 'vue';
import VueRouter from 'vue-router';

import UsersList from '.././views/UsersList.vue';
import User from '.././views/User.vue';
import NotFound from '.././views/NotFound.vue';
import { store } from '../vuex/store';

Vue.use(VueRouter);

var routes = [
    {
        path: '/',
        name: 'users',
        component: UsersList
    },
    {
        path: '/user/:name',
        name: 'user',
        component: User,
        beforeEnter: (to, from, next) => {
            if(!store.state.users.length) {
                next('/');
                return;
            }
            next();
        }
    },
    {
        path: '*',
        name: 'error',
        component: NotFound
    }
]

export const router = new VueRouter({
    mode: 'history',
    routes
})