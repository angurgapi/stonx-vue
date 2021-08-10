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
          <tr class="coins__head">           
          <td><p class="coins__title">валюта</p></td>
          <td><p class="coins__title">цена</p></td>
          <td><p class="coins__title"></p></td>
          <!-- <td></td> -->
          </tr>
        </thead>
        <tbody>
        
        <Coin v-for="coin, index in filteredList.slice(0,coinsToShow)" :key="index" :symbol="`${coin.symbol}`" :price="`${coin.price}`"/>       
        
        </tbody>
      </table>

      
      <div class="navigation">
        <button class="navigation__btn" @click="coinsToShow += 10"><i class="fas fa-chevron-right"></i></button>
        <button class="navigation__btn" @click="scrollToTop()"><i class="fas fa-arrow-up"></i></button>
        <button class="navigation__btn" @click="coinsToShow -= 10"><i class="fas fa-chevron-left"></i></button>
      </div>

    </div>
   
    
  </div>
</template>

<script>
import Coin from './Coin.vue'

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
  mounted(){
    this.getCoins()
  },

  methods: {
  async getCoins(){
    try {
      const response = await fetch("https://api.binance.com/api/v3/ticker/price")
      const result = await response.json()  
      this.coins = result
      
    } catch(err){
        console.log(err)
      }
    },
  scrollToTop() {
    window.scrollTo(0,0);
    }
  },
 
  
  components: {
   Coin,

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
    align-items: center
  &__currencies  
    min-width: 300px
    padding: 20px

.card 
  max-width: 90%      
  box-shadow: 2px 2px 10px #fff
  border-radius: 5px
  margin-bottom: 10px
  
.coins
  margin: 30px auto
  &__title 
    font-weight: 700
    text-align: center
    color: #fbb034
    text-transform: uppercase
    

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
    width: 50px
    height: 40px
    background: linear-gradient(315deg,#fbb034,#fd0 74%)
    &:hover
      transform: translateY(-2px)

</style>
