<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <div class="dashboard-section">
      <create-account></create-account>
      <create-post></create-post>
    </div>
    <div class="dashboard-section">
      <post-table :posts="posts"></post-table>
      <subscribers></subscribers>
    </div>
  </div>
</template>

<script>
import CreateAccount from "@/components/CreateAccount.vue";
import CreatePost from "@/components/CreatePost.vue";
import PostTable from "@/components/PostTable.vue";
import Subscribers from "@/components/Subscribers.vue";

export default {
  components: {
    CreateAccount,
    CreatePost,
    PostTable,
    Subscribers,
  },
  data() {
    return {
      posts: [], // Add posts data here
    };
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  text-align: center;
  padding: 20px;

  .dashboard-section {
    margin-top: 40px;
    display: flex;
    justify-content: center;

    & > * {
      margin: 0 20px;
    }
  }
}
</style>
