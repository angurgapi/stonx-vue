<template>
<div class="wrapper">

  <form class="user-form" @submit.prevent="submitForm"> 
    <div class="user-form__header">
        <h2 class="user-form__title">Регистрация пользователя</h2>
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
                <label id='username' class="label-required" for='firstname'>Логин</label>
                <input type="text"
                name="username"
                @blur="$v.user.username.$touch()"
                v-model.trim="user.username"
                class="form-input">
            </div>
            <div class="warn">
                <p class="error-message" v-if="$v.user.username.$dirty && !$v.user.username.required">{{requiredMessage}}</p>
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
                <p class="error-message" v-if="!$v.user.password.minLength">{{passMessage}}</p>
            </div>
        </div>

    

        <div class='form-field age'>
            <label for="isAdult">Мне исполнилось 18 лет</label>
            <input type="checkbox" 
                    id="isAdult" 
                    name="isAdult"
                    @blur="$v.user.isAdult.$touch()"
                    v-model="user.isAdult">   
            <div class="warn">
                <p class="error-message" v-if="!$v.user.isAdult.required">{{ageMessage}}</p>     
            </div>
        </div>
    </div>
   
    <div class="user-form__footer">
        <button type="submit" class='submit-button'>Регистрация</button>      
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
            passMessage: "Пароль не может быть короче 8 символов",
            ageMessage: "Вы должны быть старше 18 лет для регистрации",
            passwordFieldType: "password",
            showPassword: false,
            user:{
                email: "",
                username: "",
                password: "",
                isAdult: false                   
            }               
        }
    },
    validations() {
		return {
            user:{
                email: { email, required },               
                username: { required },
                password: { required, minLength: minLength(8) },
                isAdult: { required }
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
            if (!this.$v.user.$invalid && this.user.isAdult) {                
                this.$parent.validated = true
                console.log(this.$parent.validated) 
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.user.email, this.user.password)
                    .then(data => {
                        data.user
                        .updateProfile({
                            displayName: this.user.username
                        })
                        .then(() => {})
                    })          
                    .catch(err =>{
                        this.$error = err.message
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

*, *::before, *::after
    box-sizing: border-box

body 
    font-family: 'Open Sans', sans-serif
    font-size: 18px
    font-weight: 400
    line-height: 1.4
    margin: 0
    
.user-form
    margin: 50px auto
    width: 550px
    max-width: 90vw    
    box-shadow: 0 0 20px #fff
    background: #fff
    &__header
        height: 80px
        background-color: rgba(27, 27, 50, 0.8)
        display: flex
        align-items: center
        justify-content: center
    &__title     
        color: #fff
    &__body
        padding: 15px

    &__footer
        height: 80px
        display: flex
        flex-direction: column
        align-items: center

.form-group
  margin-bottom: 10px
  width: 100%
  text-align: left

.form-field
    display: flex
    flex-direction: row
    justify-content: space-between    

.age
    justify-content: flex-end
label
    display: flex
    align-items: center
    color: rgba(5,9,36,.8)
    font-size: 1.125rem
    font-weight: 600

.label-required::after 
    position: relative
    content: '*'
    color: #611812
    left: 5px

input[type="checkbox"]
    width: 20px
    height: 20px
    margin-left: 10px 
    outline: none

.form-input-wrapper   
    width: 300px
    display: flex
    flex-direction: row
    align-items: center

.form-input
    width: 300px
    height: 40px
    padding: 0.375rem 0.75rem
    color: #495057    
    border-radius: 5px
    margin-top: 10px
    margin-bottom: 10px
    font-size: 18px
    background-color: #fff
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out
    border: 1px solid #ced4da
    &:hover, &:focus
        border: 2px solid rgba(0,0,0,.4)
        outline: none

.pass-input
    width: 260px
    border-radius: 5px 0 0 5px
    border-right: none
.visibility
    display: flex
    align-items: center
    justify-content: center
    height: 40px
    width: 40px
    background-color: rgba(27, 27, 50, 0.8)
    border-radius:  0 5px 5px 0
.fas
    color: #fff

.error-message
    color: #611812
    font-size: 14px
    text-align: right
    margin-top: 0

@media(max-width: 500px)
    .form-field
        &:not(:last-of-type) 
            flex-direction: column
    .form-input
        width: 100%
</style>