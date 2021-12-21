<template>
    <div class="container">
        <div class="row mt-4">
            <div class="col-6 offset-3">
                 <h1>You have successfully logged out</h1>
            </div>
            <div v-if="error">
                 <div class="alert alert-danger">
                      {{ error }}
                 </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Logout",
    data() {
        return {
            error:'',
        }
    },
    mounted() {
        this.onLogout();
    },
    methods: {
        onLogout(){
         this.$store.dispatch('logout')
         .then(()=>{
             this.$router.push('/login');
         })
         .catch((error) => {
             this.error = error;
         })
        },
    },
}
</script>