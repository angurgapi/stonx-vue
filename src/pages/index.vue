<template>
    <main class="main">
        <div class="page-grid">
            <div class="market">
            <Dashboard />
            </div>
            <div v-if="user.loggedIn" class="wallets">
                <h4>walletz!!!</h4>
                <Wallet v-for="coin, index in selectedCoins" :key="index" :symbol="`${coin.symbol}`" :price="`${coin.price}`" :amount="`${coin.amount}`"/>               
                
            </div>
            <div v-else class="authorize">
                <i class="fas fa-lock"></i>
                <h4>Обзор кошельков доступен только авторизированным пользователям.</h4>
                <h4><router-link class="advisory__link" to="/signin">Зарегистрируйтесь</router-link> или <router-link class="advisory__link" to="/login">войдите в аккаунт.</router-link></h4>
            </div>
        </div>
    </main>
</template>

<script>
import Dashboard from '../components/Dashboard.vue'
import Wallet from '../components/Wallet.vue'
import { mapGetters } from "vuex";
export default {
    name: 'Index',
    components: {
        Dashboard,
        Wallet
    },
    data(){
        return{
            
        }
    },
    computed: { 
    ...mapGetters({
      user: "user"
    })
  }
}

</script>

<style lang="sass">
.page-grid 
    display: grid
    grid-template-columns: 1fr 1fr
    @media(max-width: 800px)
        grid-template-columns: 1fr
.navigation 
    display: flex
    justify-content: space-between
    width: 320px
.advisory__link
    color: #fbb034
    &:hover, &:focus
        border-bottom: 3px solid rgba(255,2555,255,.7)
.authorize
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
.fa-lock
    font-size: 36px
</style>