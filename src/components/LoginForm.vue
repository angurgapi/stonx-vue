<template>
<div class="wrapper">

  <form class="user-form" @submit.prevent="submitForm"> 

    <div class="user-form__header">
        <h2 class="user-form__title">Авторизация</h2>
    </div>
      
    <div class="user-form__body">
        <div class='form-group'>
            <div class="form-field">
                <label id='email' class="label-required" for='email'>E-mail</label>
                <input type="email"
                name="email"
                @blur="$v.user.email.$touch()"
                v-model.trim="user.email"
                class="form-input">
            </div>
            <div class="warn">
                <p class="error-message" v-if="$v.user.email.$dirty && !$v.user.email.required">{{requiredMessage}}</p>
                <p class="error-message" v-if="!$v.user.email.email">{{ emailMessage }}</p>
            </div>
        </div>
        

        <div class='form-group'>
            <div class="form-field">
                <label id='password' class="label-required" for='password'>Пароль</label>                              
                <div class="form-input-wrapper">
                    <input :type="passwordFieldType"
                    name="password"
                    @blur="$v.user.password.$touch()"
                    v-model.trim="user.password"
                    class="form-input pass-input">
                    <div class="visibility" @click="switchVisibility">     
                        <i id="eye" class="fas fa-eye"></i>
                    </div> 
                </div> 
            </div>
            <div class="warn">
                <p class="error-message" v-if="$v.user.password.$dirty && !$v.user.password.required">{{requiredMessage}}</p>
            </div>
        </div>

    </div>
   
    <div class="user-form__footer">
        <button type="submit" class='submit-button'>Войти</button>      
    </div>

  </form>
  </div>
</template>


<script>
import { required, minLength, email } from "vuelidate/lib/validators"
import firebase from "firebase"

export default {
    name: 'Form',
    data(){
        return{
            emailMessage: "Пожалуйста, введите корректный e-mail",           
            requiredMessage: "Это обязательное поле",            
            passwordFieldType: "password",
            showPassword: false,
            user:{
                email: "",                
                password: "",
                           
            }               
        }
    },
    validations() {
		return {
            user:{
                email: { email, required },     
                password: { required, minLength: minLength(8) },             
            }            
        }
	},
    methods: {
        switchVisibility(){
            let eyeIcon = document.querySelector('#eye')
            eyeIcon.className = eyeIcon.className === "fas fa-eye" ? eyeIcon.className = "fas fa-eye-slash" : eyeIcon.className = "fas fa-eye"
            this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password"
            this.showPassword = this.showPassword === "true" ? "false" : "true"       
        },
        submitForm(){
           this.$v.user.$touch()           
            if (!this.$v.user.$invalid) {
                console.log('Успех')
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.user.email, this.user.password)
                    .then(data => {
                        console.log(data)
                        this.$router.push({path: "/"})
                    })    
                    .catch(err => {
                        this.error = err.message
                    })
            }
            else{       
                alert('Пожалуйста, заполните все поля')      
                console.log(this.$v.user.$error)                
            }
        }
    },

}
</script>

<style lang="sass">


@media(max-width: 500px)
    .form-field
        &:not(:last-of-type) 
            flex-direction: column
    .form-input
        width: 100%
</style>