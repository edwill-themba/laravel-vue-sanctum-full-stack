<template>
    <div>
       <nav class="navbar navbar-expand-sm navbar-dark bg-info mb-2">
           <div class="container">
              <router-link to="/" class="navbar-brand brand">User Message</router-link>
              <ul class="main-menu">
                 <li><router-link to="/">Home</router-link></li>
                 <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
                 <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
                 <li v-if="isLoggedIn"><router-link to="/add_message">Add Message</router-link></li>
                 <li v-if="isLoggedIn"><router-link to="/logout">Logout</router-link></li>
              </ul>
           </div>
        </nav> 
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name:'Navbar',
    computed:{
        isLoggedIn(){
          return this.$store.getters.isLoggedIn;
        },
    }
}
</script>

<style scoped>
.brand{
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight:400;
    padding-top:5px;
}
nav ul{
    margin-top:15px;
}
nav ul li{
    display: inline;
    list-style: none;
    margin-left: 10px;
}
nav ul li a{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    color: #fff;
    text-decoration: none;
}
nav ul li a:hover{
    color:#111;
    background-color: #ccc;
}
</style>
