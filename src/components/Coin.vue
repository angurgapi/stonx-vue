<template>
 <tr class="coin">
    
    <td><p class="coin__symbol">{{ symbol }}</p></td>
    <td><p class="coin__price">{{ parseFloat(price).toFixed(5) }}</p></td>
    <td><div class="coin__plus" :id="`${symbol}`" @click="processCoin(symbol, price)">+</div></td>
    <!-- <td><input class="coin__amount" type="text" :v-model="`${amount}`" @change="registerAmount(symbol, price)"/></td> -->
  </tr>


</template>

<script>

export default {
    name: 'Coin',
    props: {
        symbol: {
            type: String
        },
        price: {
            type: String
        }
    },
    data(){
        return{
            amount: 0
        }
    },
    methods: {
        processCoin(smbl, price){
            console.log(smbl, price)
        },
        addToSelected(smbl, price){
            this.$parent.selectedCoins.push(
                {symbol: smbl, 
                price: price, 
                amount: 0
                })
            console.log(this.$parent.selectedCoins)       
        },
        removeFromSelected(smbl){
            this.$parent.selectedCoins = this.$parent.selectedCoins.filter(coin => {
                    return coin.symbol !== smbl
                })
                console.log(this.$parent.selectedCoins)
        },         
        
        registerAmount(smbl){            
            this.$parent.selectedCoins.filter(coin => {
            return coin.symbol === smbl
            })[0].amount = event.target.value
            console.log(this.$parent.selectedCoins) 
        }
    }
}
</script>

<style lang="sass">
.coin
    color: rgba(255,255,255,.8)
    align-items: center
    &__symbol
        font-weight: 700
    &__price
        margin-left: 10px
    &__plus
        margin-left: 10px
        height: 25px
        width: 25px
        border-radius: 50%
        background-color: #fbb034
        color: #08071a
        display: flex
        justify-content: center
        align-items: center
        font-weight: 700
    &__amount
        margin-left: 10px
        width: 60px
td, tr
    padding-top: 0
    margin-top: 0
</style>