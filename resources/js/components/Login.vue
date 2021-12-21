<template>
    <div class="container login">
       <div class="row mt-4">
           <div class="col-6 offset-3">
                   <h1>login</h1>
               <form @submit.prevent="onLogin()">
                   <div class="form-row">
                       <input type="email" name="email" placeholder="Enter your email address" class="form-control" v-model="credentials.email">
                       <p class="text-danger" v-text="errors.email"></p>
                   </div>
                    <div class="form-row">
                       <input type="password" name="password" placeholder="Enter your password" class="form-control" v-model="credentials.password">
                       <p class="text-danger" v-text="errors.password"></p>
                   </div>
                   <div class="form-row">
                       <button type="submit" :disabled="isDisabled" class="btn btn-info">login</button>
                   </div>
               </form>
           </div>
       </div>
    </div>
</template>


<script>
export default {
    name:"Login",
    data() {
        return {
            credentials:{
                email:'',
                password:'',
                device_name:'browser',
            },
            errors:{},
            isDisabled:false,
        }
    },
    mounted() {
        this.isDisabled = false;
    },
    methods: {
        onLogin(){
          this.$store.dispatch('login',this.credentials)
          .then((response) => {
              console.log('token is'+response.data);
              this.isDisabled=true;
              this.$router.push('/add_message');
          })
          .catch((error)=>{
              this.errors = error.response.data.errors;
              console.log(this.errors);
          })
        }
    },
}
</script>


<style scoped>
.form-row{
    margin-bottom: 10px;
}
.login{
    font-family: "Raleway";
    font-weight: 600;
}
.login h1{
    text-align: center;
}
</style>
