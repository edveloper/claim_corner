<template>
    <div class="post-table">
      <h2>Blog Posts</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Author</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <td>{{ post.title }}</td>
            <td>{{ post.date }}</td>
            <td>{{ post.author }}</td>
            <td>{{ post.category }}</td>
            <td>
              <button @click="editPost(post.id)">Edit</button>
              <button @click="deletePost(post.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      posts: {
        type: Array,
        required: true
      }
    },
    methods: {
      editPost(id) {
        // Make an API call to the backend to edit the post with the given id
        axios.put(`/posts/${id}`, {
          // Provide the necessary data to update the post
        })
        .then(response => {
          // Handle the response accordingly
        })
        .catch(error => {
          console.error(error);
        });
      },
      deletePost(id) {
        // Make an API call to the backend to delete the post with the given id
        axios.delete(`/posts/${id}`)
        .then(response => {
          // Handle the response accordingly
        })
        .catch(error => {
          console.error(error);
        });
      }
    }
  };
  </script>
  
  
  <style lang="scss" scoped>
  .post-table {
    text-align: center;
    padding: 20px;
  
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
  
      th, td {
        border: 1px solid #ccc;
        padding: 10px;
      }
  
      th {
        background-color: #f2f2f2;
      }
  
      td {
        text-align: center;
      }
  
      button {
        background-color: #007BFF;
        color: #fff;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
        margin-right: 5px;
      }
    }
  }
  </style>
  