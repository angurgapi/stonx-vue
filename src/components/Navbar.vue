<template>
    <header class="header">
        <div class="header__logo"><router-link to="/"><i class="fas fa-home"></i></router-link></div>       
        <nav class="navpannel">
            <ul class="navpanel__links">
                <router-link v-if="!user.loggedIn" class="navpannel__link" to="/login">вход</router-link>
                <router-link v-if="!user.loggedIn" class="navpannel__link" to="/signin">регистрация</router-link>
                <router-link v-if="user.loggedIn" class="navpannel__link" to="/">{{user.data.displayName}}</router-link>   
                <li v-if="user.loggedIn" @click="signOut" class="navpannel__link">Выход</li>  
            </ul>
        </nav>
    </header>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
    name: 'Navbar',
    computed: {
        ...mapGetters({
            user: 'user'
        })
    },
    methods: {       
        signOut(){
            console.log('signing out!')
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.replace({
                        component: 'Index'
                    })
                })
        }
    }
}
</script>

<style lang="sass">
.header 
    width: 100%
    height: 80px
    display: flex
    align-items: center
    justify-content: flex-end
    &__logo 
        display: flex
        align-items: center
        justify-content: center
        height: 50px
        width: 50px
        background-color: rgba(255, 255, 255, 0.3) 
        position: absolute
        left: 20px
        top: 20px
        border-radius: 50%
        border: 2px solid #fff
.navpannel 
    display: flex
    justify-content: space-between    
    &__link
        color: #fbb034
        letter-spacing: 1.5px
        font-weight: 700
        margin-left: 20px
        &:hover 
            border-bottom: 3px solid #fbb034
        &:not(first-child)
            margin-right: 20px

.router-link-exact-active
    color: rgba(255,255,255,.6)

</style>