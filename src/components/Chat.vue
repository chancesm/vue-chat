<template>
  <div class="card mt-3">
      <div class="card-body">
          <div class="card-title">
              <h3>{{user}}'s Chat</h3>
              <hr>
          </div>
          <div class="card-body">
              <div class="messages" v-for="(msg, index) in messages" :key="index">
                  <p><span class="font-weight-bold">{{ msg.user }}: </span><span v-html="msg.message"></span></p>
              </div>
          </div>
      </div>
      <div class="card-footer">
          <form @submit.prevent="sendMessage">
              
              <div class="gorm-group pb-3">
                  <label for="message">Message:</label>
                  <input type="text" v-model="message" class="form-control">
              </div>
              <button type="submit" class="btn btn-success">Send</button>
          </form>
      </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
    data() {
        return {
            message: '',
            messages: [],
            socket : {}
        }
    },
    computed: {
        user() {
            return this.$store.state.userName
        },
        room() {
            return this.$store.state.chatRoom
        }
    },
    methods: {
        sendMessage(e) {
            e.preventDefault();
            
            this.socket.emit('SEND_MESSAGE', {
                user: this.user,
                room: this.room,
                message: this.message
            });
            this.message = ''
        }
    },
    mounted() {
        this.socket = io(`http://localhost:3001?name=${this.user}`)
        this.socket.on('connect', () => {
        // emiting to everybody
            this.socket.emit('join', { room: this.room });
        })
        this.socket.on('MESSAGE', (data) => {
            this.messages = [...this.messages, data];
            // you can also do this.messages.push(data)
        });
    }
}
</script>

<style>

</style>
