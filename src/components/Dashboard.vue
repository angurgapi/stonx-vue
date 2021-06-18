<template>
  <div class="board">
    <div class="board__currencies card">
      <div class='search'>
        <div class="search__box">              
        <input class="search__input" v-model="query" type="search" placeholder="Искать...">
        <div class="search__icon">
          <i class="fas fa-search" style="color: rgba(255,255,255,.7);"></i>
        </div>
        </div>
      </div>
      
      <table class="coins">
        
        <thead>
          <tr>
          <td></td>
          <td><p>coin</p></td>
          <td><p>price</p></td>
          <td><p>amount</p></td>
          </tr>
        </thead>
        <tbody>
        <Coin v-for="coin, index in filteredList.slice(0, coinsToShow)" :key="index" :symbol="`${coin.symbol}`" :price="`${coin.price}`"/>
        </tbody>
      </table>
      <div class="navigation">
        <button class="navigation__btn" @click="coinsToShow += 10">show more</button>
        <button class="navigation__btn" @click="scrollToTop()">go up</button>
      </div>

    </div>

    <div class="wallets">
      <Wallet v-for="coin, index in selectedCoins" :key="index" :symbol="`${coin.symbol}`" :price="`${coin.price}`" :amount="`${coin.amount}`"/>
    </div>
   
    
  </div>
</template>

<script>
import Coin from './Coin.vue'
import Wallet from './Wallet.vue'
export default {
  name: 'Dashboard',  
  data(){
    return {
      coins: [],
      coinsToShow: 10,
      query: '',
      selectedCoins: []
    }
  },
  computed: {
    filteredList() {
      return this.coins.filter(coin => {
        return coin.symbol.toLowerCase().includes(this.query.toLowerCase())
      })
    }
  },
  async mounted(){
    try {
      const response = await fetch("https://api.binance.com/api/v3/ticker/price")
      const result = await response.json()  
      this.coins = result
      
    } catch(err){
        console.log(err)
    }
  },

  methods: {
   scrollToTop() {
    window.scrollTo(0,0);
           }
  },
 
  
  components: {
   Coin,
   Wallet
  },
  props: {

  },


}
</script>

<style lang='sass' scoped>

.board
  width: 100%
  margin-top: 30px
  display: flex
  flex-direction: row 
  justify-content: space-around
  padding-bottom: 40px
  @media(max-width: 600px)
    flex-direction: column
    justify-content: center
  &__currencies  
    min-width: 300px

.card 
  max-width: 90%
  padding: 20px    
  box-shadow: 2px 2px 10px #fff
  border-radius: 5px
  margin-bottom: 10px
  
.coins
  margin: 30px auto

.search
  width: 250px
  margin: auto
  &__box
    width: 100%
    position: relative
    display: flex
  &__input
    width: 100%
    padding: 10px
    border: 2px solid #fff
    border-radius: 10px 0 0 10px
    border-right: none
    outline: none
    font-size: 20px
    color: #fff
    background: none
  &__icon
    display: flex
    align-items: center
    height: 51px
    width: 40px
    outline: none
    border: 2px solid #fff
    border-radius: 0 10px 10px 0
    border-left: none
    background: none
    font-size: 20px

.navigation
  display: flex
  flex-direction: row
  width: 100%
  align-items: center
  justify-content: center
  &__btn
    margin-right: 20px
    box-shadow: 4px 4px 5px rgba(0,0,0,.4)
    width: 100px
    height: 40px
    background: linear-gradient(315deg,#fbb034,#fd0 74%)
    &:hover
      transform: translateY(-2px)
.wallets
  min-width: 200px
</style>
