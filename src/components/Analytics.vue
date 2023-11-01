<template>
  <div class="analytics">
    <h2>Analytics</h2>
    <p>Page Visits: {{ pageVisits }}</p>
    <p>Page Views: {{ pageViews }}</p>
    <p>Unique Visitors: {{ uniqueVisitors }}</p>
    <p>Average Length of Time per Visitor: {{ avgTimePerVisitor }} seconds</p>
    <p>Most Popular Blog Posts:</p>
    <ul>
      <li v-for="post in popularPosts" :key="post.id">{{ post.title }}</li>
    </ul>
    <p>Most Popular Categories:</p>
    <ul>
      <li v-for="category in popularCategories" :key="category.id">{{ category.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageVisits: 0,
      pageViews: 0,
      uniqueVisitors: 0,
      avgTimePerVisitor: 0,
      popularPosts: [],
      popularCategories: []
    };
  },
  created() {
    this.fetchAnalytics();
  },
  methods: {
    fetchAnalytics() {
      fetch('/analytics') // Update the URL with your actual backend route
        .then(response => response.json())
        .then(data => {
          this.pageVisits = data.pageVisits;
          this.pageViews = data.pageViews;
          this.uniqueVisitors = data.uniqueVisitors;
          this.avgTimePerVisitor = data.avgTimePerVisitor;
          this.popularPosts = data.popularPosts.slice(0, 3); // Get top 3 popular posts
          this.popularCategories = data.popularCategories.slice(0, 3); // Get top 3 popular categories
        })
        .catch(error => {
          console.error('Error fetching analytics:', error);
        });
    }
  }
};
</script>

<style scoped>
.analytics {
  text-align: center;
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>
