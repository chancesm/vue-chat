<template>
  <div class="w3-container">
      <div class="w3-conatiner">
          <div class="w3-container w3-border-bottom">
              <h3>{{user}}'s Chat</h3>
          </div>
          <div class="w3-container">
              <div class="messages" v-for="(msg, index) in messages" :key="index">
                  <p><span class="font-weight-bold">{{ msg.user }}: </span><span v-html="msg.message"></span></p>
              </div>
          </div>
      </div>
      <div class="w3-container">
        <form class=w3-form @submit.prevent="sendMessage">              
            <label class="w3-text-blue">Message</label>
            <input class="w3-input w3-border" type="text" v-model="message">
            <button class="w3-button w3-section w3-teal w3-ripple" type="submit">Send</button>
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
        this.socket = io(`http://localhost:3001?name=${this.user}&room=${this.room}`)
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
