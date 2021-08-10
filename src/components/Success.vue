<template>
    <div class="success-wrapper">
        <div class="message-wrapper">
            <h1 class="success">Регистрация клиента завершена</h1>
            <button class="submit-button"><router-link to="/login">Вход</router-link></button>
            <button class="submit-button" @click="goBack">Назад</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Success',
    methods: {
        goBack() {
            this.$parent.validated = false
        }, 
    
    }
}
</script>

<style lang="sass">
.success-wrapper
    width: 100vw
    height: 100vh
    z-index: 1010
    overflow: hidden
    display: flex
    justify-content: center
    .message-wrapper 
        max-width: 80%
        height: 40vh
        position: fixed
        top: 30vh
        padding: 30px 
        border-radius: 10px
        background: linear-gradient(90deg, rgba(226,225,246,1) 0%, rgba(218,229,249,1) 54%, rgba(250,251,251,1) 100%)
        text-align: center
        box-shadow: 0 0 10px #333
        margin: auto   


    .success
        margin-bottom: 30px
        color: rgba(5,9,36,.8)



</style>