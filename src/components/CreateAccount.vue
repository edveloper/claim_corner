<template>
    <div class="create-account">
      <h2>Create New Account</h2>
      <form @submit.prevent="createAccount" class="account-form">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required class="input-field" />
        <br /><br />
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required class="input-field" />
        <br /><br />
        <button type="submit" class="create-button">Create Account</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'; // Import Axios
  
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      createAccount() {
        axios.post('/register', { // Assuming your backend route for account creation is '/register'
          username: this.username,
          password: this.password
        })
        .then(response => {
          console.log(response.data); // Handle the response data accordingly
        })
        .catch(error => {
          console.error(error); // Handle any errors
        });
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .create-account {
    text-align: center;
    padding: 20px;
  
    .account-form {
      display: inline-block;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f9f9f9;
  
      .input-field {
        width: 100%;
        padding: 10px;
        margin: 5px 0;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
  
      .create-button {
        background-color: #007BFF;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 3px;
        cursor: pointer;
      }
    }
  }
  </style>
  