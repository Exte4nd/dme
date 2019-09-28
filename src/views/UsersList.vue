<template>
  <div class="users">
      <div class="tools">
        <label>Поиск по имени</label>
        <input type="text" v-model="userName" placeholder="Имя Фамилия" @focus="year = ''; month = ''">
        <label>Поиск по дате рождения</label>
        <div class="group">
          <select v-model="month" @change="userName = ''">
            <option value="">Месяц</option>
            <option value="0">Январь</option>
            <option value="1">Февраль</option>
            <option value="2">Март</option>
            <option value="3">Апрель</option>
            <option value="4">Май</option>
            <option value="5">Июнь</option>
            <option value="6">Июль</option>
            <option value="7">Август</option>
            <option value="8">Сентябрь</option>
            <option value="9">Октябрь</option>
            <option value="10">Ноябрь</option>
            <option value="11">Декабрь</option>
          </select>
          <select v-model="year" @change="userName = ''">
            <option value="">Год</option>
            <option :value="1919+i+''" v-for="i in 81">{{ 1919+i+'' }}</option>
          </select>
        </div>
      </div>
      <div class="wrapper-list">
          <div class="user-item" v-for="user in users" @click="$router.push({name: 'user', params: {name: user.name.first}})">
              <img :src="user.picture.medium" alt="avatar" width="36" height="36">
              <div class="user-info">
                <p>{{ user.name.first | capitalize }} {{ user.name.last | capitalize}}</p>
                <span>{{ user.dob.date | formatDate }}</span>
              </div>
          </div>
      </div>
      <div class="tools">
        <button type="button" @click="sorted">Отсортировать список</button>
      </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
    data() {
      return {
        userName: '',
        month: '',
        year: ''
      }
    },
    methods: {
      sorted(e) {
        this.$store.state.users.sort((a, b) => {
            if(a.name.last < b.name.last)
              return -1;
            else if(a.name.last > b.name.last)
              return 1;
            else if(a.name.first < b.name.first)
              return -1;
            else if(a.name.first > b.name.first )
              return 1;
            else
              return new Date(a.dob.date) - new Date(b.dob.date);
            
        })
        e.target.setAttribute('disabled', true)
      }
    },
    computed: {
      users() {
        return this.$store.getters.getUsersList.filter(user => {
          let name = `${user.name.first} ${user.name.last}`.toLowerCase();

          if(!this.userName.length && !this.month.length && !this.year.length)
            return true;
          else if(this.userName.length && name.indexOf(this.userName.toLowerCase()) > -1)
            return true;
          else if((this.year.length && !this.month.length)
            && (this.year == new Date(user.dob.date).getFullYear()))
            return true;
          else if((this.month.length && !this.year.length )
            && (this.month == new Date(user.dob.date).getMonth()))
            return true;
          else if((this.month.length && this.year.length)
            && (this.year == new Date(user.dob.date).getFullYear())
            && (this.month == new Date(user.dob.date).getMonth()))
            return true;
        });

      }
    }
}
</script>