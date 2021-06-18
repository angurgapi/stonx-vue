<template>
 <div class="wallet card">    
    <h2 class="coin__symbol">{{ symbol }}</h2>
    <p class="coin__price">Balance: {{ amount }}</p>
    <p class="coin__price">Purchased at {{ price }}</p>    
  </div>


</template>

<script>

export default {
    name: 'Wallet',
    props: {
        symbol: {
            type: String
        },
        price: {
            type: String
        },
        amount: {
            type: String
        }
    },
    data(){
        return{
           
        }
    },
    methods: {
        
    }
}
</script>

<style lang="sass">
.wallet    
    padding: 20px    
    box-shadow: 2px 2px 10px #fff
</style>