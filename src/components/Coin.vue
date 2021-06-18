<template>
 <tr class="coin">
    <td><input type="checkbox" :id="`${symbol}`" @change="addToSelected(symbol, price)"/></td>
    <td><p class="coin__symbol">{{ symbol }}</p></td>
    <td> <p class="coin__price">{{ price }}</p></td>
    <td><input class="coin__amount" type="text" :v-model="`${amount}`" @change="registerAmount(symbol, price)"/></td>
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
        addToSelected(smbl, price){
            if(event.target.checked){
                this.$parent.selectedCoins.push(
                {symbol: smbl, 
                price: price, 
                amount: 0
                }
            )
            console.log(this.$parent.selectedCoins)       
            }
            else{
                this.$parent.selectedCoins = this.$parent.selectedCoins.filter(coin => {
                    return coin.symbol !== smbl
                })
                console.log(this.$parent.selectedCoins)         
            }
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
    
    align-items: center
    &__symbol
        font-weight: 700
    &__price
        margin-left: 10px
    &__amount
        margin-left: 10px
        width: 60px
td, tr
    padding-top: 0
    margin-top: 0
</style>