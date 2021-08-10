<template>
 <div class="wallet card"> 
    <div class="wallet__header"> 
        <h4 class="wallet__symbol">{{ symbol }}</h4><span class="removeBtn">x</span>
    </div>
    <p class="wallet__price">Balance: {{ amount }}</p>
    <p class="wallet__price">Purchased at {{ price }}</p>    
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
    padding: 0    
    box-shadow: 2px 2px 10px #fff
    &__header
        height: 30px
        display: flex
        align-items: center
        justify-content: space-between
        background-color: rgba(255,255,255,.4)
        margin: 0

.removeBtn
    height: 25px
    width: 25px
    margin-left: 15px
    border: 1px solid white
</style>