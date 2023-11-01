<template>
  <div class="subscribers">
    <h2>Subscribers</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="subscriber in subscribers" :key="subscriber.id">
          <td>{{ subscriber.name }}</td>
          <td>{{ subscriber.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subscribers: [],
    };
  },
  created() {
    this.fetchSubscribers();
  },
  methods: {
    fetchSubscribers() {
      fetch('/subscribers') // Update the URL with your actual backend route
        .then(response => response.json())
        .then(data => {
          this.subscribers = data;
        })
        .catch(error => {
          console.error('Error fetching subscribers:', error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.subscribers {
  text-align: center;
  padding: 20px;

  table {
    width: 50%;
    border-collapse: collapse;
    margin-top: 20px;

    th, td {
      border: 1px solid #ccc;
      padding: 10px;
    }

    th {
      background-color: #f2f2f2;
    }
  }
}
</style>
