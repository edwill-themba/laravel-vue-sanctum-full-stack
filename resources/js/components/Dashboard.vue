<template>
    <div class="container home">
        <div class="row">
           <div class="col-sm-12">
               <h1>User Messages</h1>
               <hr/>
                <teleport to='#update-modal'>
                    <div v-if="modal" class="show-modal">
                       <h3>Update User Message</h3>
                         <form @submit.prevent="onUpdateMessage(message)">
                           <div class="form-group">
                               <input type="text" v-model="message.title" class="form-control">
                               <p class="text-danger" v-text="errors.title"></p>
                           </div>
                            <div class="form-group">
                               <textarea type="text" v-model="message.body" class="form-control">
                               </textarea>
                                <p class="text-danger" v-text="errors.body"></p>
                           </div>
                            <div class="form-group">
                               <input type="text" v-model="message.period_start" class="form-control">
                               <p class="text-danger" v-text="errors.period_start"></p>
                           </div>
                            <div class="form-group">
                               <input type="text" v-model="message.period_end" class="form-control">
                                <p class="text-danger" v-text="errors.period_end"></p>
                           </div>
                           <div class="form-group">
                               <input type="submit" value="update" class="btn btn-primary">
                               <input type="button"  value="close" @click="closeModal()" class="btn btn-danger">
                           </div>
                        </form>
                    </div>
                </teleport>
               <div v-if="messages.length">
                  <div v-for="(message,index) in messages" :key="index">
                     <div class="cart card-header">
                          {{ message.title }}
                     </div>
                     <div class="cart cart-body">
                          {{ message.body }}
                     </div>
                     <div class="cart cart-footer">
                        <button type="button" class="btn btn-warning btn-block" 
                        @click="showEditModal(message)">update</button>
                        <button type="button" class="btn btn-danger"
                        @click="deleteMessage(message)">danger</button>
                     </div>
                  </div>
              </div>
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
    name:'Dashboard',
    data() {
        return {
            messages:[],
            errors:{},
            error:'',
            modal:false,
            message:{
                id:'',
             title:'',
             period_start:'',
             period_end:'',
             body:'',
            },
        }
    },
    created() {
      this.getMessages();  
    },
    methods: {
        // get all the messages 
        getMessages(){
            this.$store.dispatch('getAllMessages')
            .then((response) => {
              this.messages = response.data.messages;
              console.log('messages'+this.messages);
            })
            .catch((error) =>{
               this.errors = error.response.data.errors;
            })
        },
        // show the edit modal
        showEditModal(message){
            this.modal = !this.modal;
            this.message = message;
        },
        // update use message
       onUpdateMessage(message){
          this.$store.dispatch('updateUserMessage',message)
          .then((response) => {
             console.log(response);
             this.modal = false;
          })
          .catch((error) =>{
              this.error = error+'  '+'unAuthorized';
              this.errors = error.response.data.errors; 
          })
       },
       // hide modal if close button is clicked
       closeModal(){
           this.modal = false;
       },
       // delete messages
       deleteMessage(message){
         var confirmed = confirm('Are you sure you want to delete this message');
         if(confirmed){
             this.$store.dispatch('deleteMessage',message)
             .then(() => {
                // delete user message from ui
                this.messages = this.messages.filter(msg => msg.id !== message.id);
                console.log('message was deleted successfully');
             })
             .catch((error) =>{
                this.error = error+'  '+'unAuthorized';
                this.errors = error.response.data.errors;
             })
         }
       },
    },
}
</script>

<style scoped>
.home{
    font-family:"Raleway";
    font-weight: 500;
    text-align: center;
}
.block{
    width:100%;
}
.show-modal{
    position: absolute;
    top:0;
    left: 0;
    background: #ccc;
    height: 400px;
    width: 300px;
    margin-top: 0px;
    margin-left:0px;
    border: 1px solid #111;
    padding: 5px;
}
</style>
