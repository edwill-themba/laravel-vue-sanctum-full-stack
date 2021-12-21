import { createStore } from 'vuex'
import  axios from 'axios'

export default createStore({
  state: {
      messages:[],
      token:localStorage.getItem('accessToken') || null,
      username:localStorage.getItem('username') || null,
  },
  getters: {
     isLoggedIn(state){
         return state.token;
     },
     getMessages(state){
         return state.messages;
     },
  },
  mutations: {
      login(state,token){
          state.token = token;
      },
      logout(state){
          state.token = null;
      },
      currentUserLogin(state,username){
          state.username = username;
      },
      getAllMessages(state,messages){
          state.messages = messages;
      },
      addUserMessage(state,message){
          state.messages.shift(message);
      },
      updateUserMessage(state,message){
          state.messages = message;
      },
      deleteMessage(state,id){
         state.messages = state.messages.filter(msg => msg.id !== id);
      },
  },
  actions: {
      // register and create new user
      registerUser({ commit }, credentials ){
         return new Promise((reslove,reject) =>{
            axios.post('api/register',{ name:credentials.name,email:credentials.email,password:credentials.password })
            .then((response) =>{
               console.log(response);
               reslove(response);
            })
            .catch((error) => {
               console.log(error);
               reject(error);
            })
         })
      },
      // user log in
      login({commit},credentials){
         return new Promise((resolve,reject)=>{
            axios.get('/sanctum/csrf-cookie').then(response => {
             axios.post('api/login',{email:credentials.email,password:credentials.password,
             device_name:credentials.device_name})
                .then((response) => {
                   let accessToken = response.data;
                   localStorage.setItem('accessToken',accessToken);
                   resolve(response);
                   commit('login',response.data);
                })
                .catch((error) =>{
                    console.log(error);
                    reject(error);
                })
            })
        })
      },
      // user logout
      logout({commit}){
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.token}`;
        if(this.state.token !== null){
        return new Promise((resolve,reject) =>{
            axios.post('api/logout',{})
            .then((response)=>{
               localStorage.removeItem('accessToken');
               localStorage.removeItem('username');
               resolve(response);
               commit('logout',null);
            })
            .catch((error) =>{
                localStorage.removeItem('accessToken');
                localStorage.removeItem('username');
                reject(error)
            })
        })
        }
      },
      // get the current user name login
      currentUserLogin({commit}){
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.token}`;
         return new Promise((resolve,reject)=>{
            axios.get('api/user')
            .then((response) => {
                let username = response.data.name;
                localStorage.setItem('username',username);
                console.log('user name is' + username);
                resolve(response);
                commit('currentUserLogin',response.data);
            })
            .catch((error) =>{
                reject(error);
            })
         })
      },
      // get all the messages
      getAllMessages({commit}){
        return new Promise((resolve,reject) => {
            axios.get('api/messages')
            .then((response) => {
                resolve(response);
                console.log(response.data);
                commit('getAllMessages',response.data);
            })
            .catch((error) => {
                reject(error);
            })
        })
      },
      // add message
      addUserMessage({commit}, formData){
       axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.token}`;
       return new Promise((resolve,reject)=>{
        axios.post('api/message',{title:formData.title,body:formData.body,
           period_start:formData.period_start,period_end:formData.period_end })
           .then((response) => {
               resolve(response);
               commit('addUserMessage',response.data);
           })
           .catch((error) => {
               reject(error);
           })
       })
      },
      // update user message
      updateUserMessage({commit},message){
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.token}`;
        return new Promise((resolve,reject) => {
           axios.put(`api/message/${message.id}`,{title:message.title,body:message.body,
           period_start:message.period_start,period_end:message.period_end})
           .then((response) => {
               resolve(response);
               commit('updateUserMessage',response.data);
           })
           .catch((error) =>{
               reject(error);
           })
        })
      },
      // delete user message
      deleteMessage({commit},message){
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.token}`; 
        return new Promise((resolve,reject) => {
            axios.delete(`api/message/${message.id}`)
            .then((response) => {
              resolve(response);
              commit('deleteMessage',message.id);
            })
            .catch((error) =>{
              reject(error);
            })
         })
      }
  },
  modules: {
  }
})
