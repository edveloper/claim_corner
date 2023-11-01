<template>
  <div class="customization">
    <h2>Customization</h2>
    <div :style="customizationStyle" class="customization-container">
      <p>Background color: {{ theme.background }}</p>
      <p>Font style: {{ theme.font }}</p>
      <button @click="toggleTheme" class="toggle-button">
        Toggle Theme
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      themes: [
        { background: 'white', font: 'Roboto' },
        { background: 'black', font: 'Arial' }
      ],
      currentThemeIndex: 0
    };
  },
  computed: {
    theme() {
      return this.themes[this.currentThemeIndex];
    },
    customizationStyle() {
      return {
        backgroundColor: this.theme.background,
        color: this.theme.font
      };
    }
  },
  methods: {
    toggleTheme() {
      this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
    }
  }
};
</script>

<style scoped>
.customization {
  text-align: center;
  padding: 20px;
}

.customization-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 20px;
}

.toggle-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 20px;
}
</style>
