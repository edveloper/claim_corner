<template>
    <div class="create-post">
      <h2>Create New Post</h2>
      <form @submit.prevent="createPost" class="post-form">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" required class="input-field" />
        <br /><br />
        <label for="content">Content:</label>
        <textarea id="content" v-model="content" required class="input-field"></textarea>
        <br /><br />
        <label for="image">Image:</label>
        <input type="file" id="image" @change="onFileChange" class="input-field" />
        <br /><br />
        <label for="author">Author:</label>
        <select id="author" v-model="author" required class="input-field">
          <option v-for="author in authors" :key="author.id">{{ author.name }}</option>
        </select>
        <br /><br />
        <label for="category">Category:</label>
        <select id="category" v-model="category" required class="input-field">
          <option v-for="category in categories" :key="category.id">{{ category.name }}</option>
        </select>
        <br /><br />
        <button type="submit" class="create-button">Create Post</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        title: '',
        content: '',
        image: null,
        author: '',
        category: '',
        authors: [],
        categories: []
      };
    },
    methods: {
      createPost() {
        // Assuming your backend route for creating a post is '/posts'
        let formData = new FormData();
        formData.append('title', this.title);
        formData.append('content', this.content);
        formData.append('image', this.image);
        formData.append('author', this.author);
        formData.append('category', this.category);
  
        axios.post('/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log(response.data); // Handle the response data accordingly
        })
        .catch(error => {
          console.error(error); // Handle any errors
        });
      },
      onFileChange(e) {
        this.image = e.target.files[0];
      }
    }
  };
  </script>
  
  
  <style lang="scss" scoped>
  .create-post {
    text-align: center;
    padding: 20px;
  
    .post-form {
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
  