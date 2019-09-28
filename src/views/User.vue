<template>
    <div class="user">
        <div class="user-card">
            <img :src="user.picture.large" alt="avatar" @click="showFull = true">
            <div class="user-info">
                <p>{{ user.name.first | capitalize }} {{ user.name.last | capitalize }}</p>
                <a :href="`tel:${user.phone}`"><i class="icon icon-phone"></i>{{ user.phone }}</a>
                <a :href="`mailto:${user.email}`"><i class="icon icon-email"></i>{{ user.email }}</a>
            </div>
            <footer class="footer">
                <router-link to="/">Список</router-link>
            </footer>
        </div>
        <div class="big-picture" v-show="showFull" @click="showFull = false">
            <img :src="user.picture.large" alt="avatar-big" width="200" height="200">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showFull: false
        }
    },
    computed: {
        user() {
            return this.$store.getters.getUserByName(this.$route.params.name);
        }
    }
}
</script>