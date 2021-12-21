<template>
    <div class="container register">
        <div class="row mt-4">
            <div class="col-6 offset-3">
                  <h1>Register</h1>
                  <form @submit.prevent="onRegisterUser()">
                       <div class="form-row">
                          <input type="text" name="name" v-model="credentials.name" placeholder="Enter username" class="form-control">
                          <p class="text-danger" v-text="errors.name"></p>
                       </div>
                       <div class="form-row">
                          <input type="email" name="email" v-model="credentials.email" placeholder="Enter email" class="form-control">
                          <p class="text-danger" v-text="errors.email"></p>                        
                       </div>
                       <div class="form-row">
                          <input type="password" name="password" v-model="credentials.password" placeholder="Enter password" class="form-control">
                          <p class="text-danger" v-text="errors.password"></p>
                       </div>
                       <div class="form-row">
                          <button type="submit" class="btn btn-info btn-block">register</button>
                       </div>
                  </form>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name:"Register",
    data() {
        return {
            credentials:{
                name:'',
                email:'',
                password:'',
            },
            errors:{},
        }
    },
    methods: {
        onRegisterUser(){
            this.$store.dispatch('registerUser',this.credentials)
            .then((response) => {
                console.log(response);
                this.$router.push('/login');
            })
            .catch((error) =>{
                console.log('error is'+error.response.data.errors);
                this.errors = error.response.data.errors;
            })
        }
    },
}
</script>

<style scoped>
.form-row{
    margin-bottom: 10px;
}
.register{
    font-family:"Raleway";
}
.register h1{
    text-align: center;
}
</style>

