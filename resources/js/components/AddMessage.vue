<template>
    <div class="container add-message">
        <div class="row mt-4">
            <div class="col-6 offset-3">
                <em><strong>You are logged on as</strong>{{ user_name }}<strong> with </strong>{{ user_email }}</em>
                  <form @submit.prevent="addUserMessage()">
                      <div class="form-row">
                          <label for="title">Title</label>
                          <input type="text"   v-model="formData.title"   class="form-control">
                          <p class="text-danger" v-text="errors.title"></p>
                      </div>
                      <div class="form-row">
                          <label for="period_start">Period Start</label>
                          <input type="date"  v-model="formData.period_start"   class="form-control">
                          <p class="text-danger" v-text="errors.period_start"></p>
                      </div>
                       <div class="form-row">
                          <label for="period_end">Period End</label>
                          <input type="date"  v-model="formData.period_end"   class="form-control">
                          <p class="text-danger" v-text="errors.period_end"></p>
                      </div>
                       <div class="form-row">
                          <label for="body">Body</label>
                          <textarea name="body"  cols="30" rows="5" v-model="formData.body" class="form-control">
                           
                          </textarea>
                          <p class="text-danger" v-text="errors.body"></p>
                      </div>
                      <div class="form-row">
                          <button type="submit" class="btn btn-info">submit</button>
                      </div>
                  </form>
                <div v-if="error">
                   <div class="alert alert-danger">
                       {{ error }}
                   </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"AddMessage",
    data() {
        return {
          error:'',  
          formData:{
            title:'',
            period_start:'',
            period_end:'',
            body:'',
          },
          user_name:'',
          user_email:'',
          errors:{},
        }
    },
    mounted() {
        this.getUserName();
    },
    methods: {
        //get current User name
        getUserName(){
        this.$store.dispatch('currentUserLogin')
        .then((response) => {
            this.user_name = response.data.name;
            this.user_email = response.data.email;
            console.log('user'+ response);
        })
        .catch((error) => {
            this.error = error;
        })
        },
        // add user message
        addUserMessage(){
          this.$store.dispatch('addUserMessage',this.formData)
          .then((response) => {
              console.log(response);
              this.$router.push('/');
          })
          .catch((error)=>{
             this.errors = error.response.data.errors;
          })
        },
    },
}
</script>

<style scoped>
.form-row{
    margin-bottom: 10px;
}
.add_message{
    font-family:"Raleway";
    font-weight:500;
    text-align: center;
}
strong{
    color:#111;
    margin: auto 5px;
}
</style>
