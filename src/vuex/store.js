import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);
const url = 'https://randomuser.me/api/';

var state = {
    status: null,
    users: []
}

var getters = {
    getUsersList: state => state.users,
    getUserByName: state => name => {
        return state.users.find(user => name == user.name.first);
    }
}

var actions = {
    requestUsers: ({commit}) => {
        commit('requestUsers');
        Axios.get(`${url}?results=20`).then(res => {
            commit('requestUsersSuccess', res.data);
        }).catch(err => {
            commit('requestUsersError', err);
        })
    }
}

var mutations = {
    requestUsers: (state) => {
        state.status = 'loading';
    },
    requestUsersSuccess: (state, res) => {
        state.status = 'success';
        Vue.set(state, 'users', res.results);
    },
    requestUsersError: (state, err) => {
        state.status = 'error'
        console.log(err)
    },
}

export const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})