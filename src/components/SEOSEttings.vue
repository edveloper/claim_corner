<template>
  <div class="seo-settings">
    <h2>SEO Settings</h2>
    <div class="seo-container">
      <p>Meta title: {{ meta.title }}</p>
      <p>Meta description: {{ meta.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      meta: {
        title: 'Claim Corner - Your Go-To Insurance Blog',
        description: 'Read our informative blog posts on various insurance policies and tips for choosing the best option.'
      }
    };
  }
};
</script>

<style scoped>
.seo-settings {
  text-align: center;
  padding: 20px;
}

.seo-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 20px;
}
</style>
