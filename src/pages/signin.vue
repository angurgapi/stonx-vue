<template>
    <main class="main">
        <SignInForm v-if="!this.validated" />
        <Success v-else />
      
    </main>
</template>

<script>
import SignInForm from '../components/SignInForm'
import Success from '../components/Success.vue'
export default {
    name: 'SignIn',
    components: {
        SignInForm,
        Success
    },
    data(){
        return{
            validated: false
        }
    }
}

</script>