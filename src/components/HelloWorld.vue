<template>
  <div class="hello">  
    <div class="w3-container w3-half w3-margin-top">
      <form @submit.prevent="login" class="w3-container w3-card-4">
        <p><input class="w3-input" type="text" style="width:90%" v-model="username" required>
        <label>Name</label></p>
<!-- <p>
<input class="w3-input" type="text" style="width:90%" v-model="chatroom" required>
<label>ChatRoom</label></p> -->
        <p><button class="w3-button w3-section w3-teal w3-ripple"> Enter Chat </button></p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      username: "",
      chatroom: "default"
    };
  },
  methods: {
    login() {
      console.log("logging in");
      this.$store.commit("setdata", {
        username: this.username,
        chatroom: this.chatroom
      });
      this.$router.push("/chat");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
