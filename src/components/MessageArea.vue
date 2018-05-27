<template>
  <div class="mdui-container">
    <div class="mdui-row">
      <Message v-for="i in messages"
        :key="i.id"
        :username='i.username'
        :content='i.content'
        :email="i.email"
        :timestamp="i.timestamp">
      </Message>
    </div>
    <div class="mdui-row" id="inputArea">
      <div class="mdui-m-t-2">
        <div v-if="!newlyAdded">
          <div class="mdui-col-xs-6">
            <div class="mdui-textfield mdui-textfield-floating-label">
              <label class="mdui-textfield-label">Username</label>
              <input class="mdui-textfield-input" type="text" v-model="username" required/>
              <div class="mdui-textfield-error">用户名不能为空</div>
            </div>
          </div>
          <div class="mdui-col-xs-6">
            <div class="mdui-textfield mdui-textfield-floating-label">
              <label class="mdui-textfield-label">Email</label>
              <input class="mdui-textfield-input" type="email" v-model="email" required/>
              <div class="mdui-textfield-error">邮箱格式错误</div>
            </div>
          </div>
        </div>
        <div class="mdui-col-xs-12">
          <div class="mdui-textfield mdui-textfield-floating-label">
            <label class="mdui-textfield-label">Message</label>
            <div class="mdui-textfield-helper mdui-typo">
              <a href="https://segmentfault.com/markdown" target="_blank">MarkDown</a> is Supported
            </div>
          <textarea class="mdui-textfield-input" @keyup.ctrl.enter="sendMessage" v-model="inputMessage"></textarea>
          </div>
        </div>
      </div>
    </div>
    <button @click="sendMessage" class="mdui-fab mdui-fab-fixed mdui-color-theme-accent mdui-ripple">
      <i class="mdui-icon material-icons">send</i>
    </button>
  </div>
</template>

<script>
import Message from './SingleMessage.vue'
import mdui from 'mdui'
import format from 'string-format'
import delay from 'lodash/delay'
export default {
  name: 'MessageArea',
  components: {Message},
  sockets: {
    connect: function () {
      mdui.snackbar('连接到服务器')
      console.log('socket connected')
    },
    disconnect: function () {
      mdui.snackbar('看起来您掉线了..')
      this.newlyAdded = false
      console.log('socket disconnected')
    },
    newMessage: function (val) {
      console.log(val)
      var data = {
        username: val.username,
        content: val.content,
        email: val.email,
        timestamp: (new Date()).valueOf()
      }
      this.addMessage(data)
    },
    login: function (data) {
      mdui.snackbar('成功连接服务器，现有{numUsers}人在线'.format(data))
    }
  },
  mounted () {
    format.extend(String.prototype, {})
    mdui.mutation()
    if (localStorage.getItem('username') !== null) {
      this.username = localStorage.getItem('username')
    }
    if (localStorage.getItem('email') !== null) {
      this.email = localStorage.getItem('email')
    }
  },
  methods: {
    addMessage: function (data) {
      this.messages.push(data)
      delay(function () {
        document.getElementById('end').scrollIntoView()
      }, 100)
    },
    sendMessage: function () {
      if (this.inputMessage === '') return
      var data = {
        username: this.username,
        content: this.inputMessage,
        email: this.email,
        timestamp: (new Date()).valueOf()
      }
      if (!this.newlyAdded) {
        this.$socket.emit('addUser', this.username, this.email)
        this.newlyAdded = true
        localStorage.setItem('email', this.email)
        localStorage.setItem('username', this.username)
      }
      console.log(this.inputMessage)
      this.addMessage(data)
      this.inputMessage = ''
      this.$socket.emit('newMessage', data)
    }
  },
  data () {
    return {
      username: '',
      email: '',
      messages: [],
      inputMessage: '',
      newlyAdded: false
    }
  }
}
// this.$options.sockets.login = (data) => {
//   console.log('login')
//   console.log(data)
// }
</script>

<style scoped>
textarea {
  font-family: 'Fira Code', Consolas, 'Sarasa Gothic SC',
    PingFang SC ,
    Microsoft YaHei,
    Source Han Sans SC,
    Noto Sans CJK SC,
    WenQuanYi Micro Hei,
    monospace;
}
#inputArea {
  position: sticky;
  bottom: 0px;
  background-color: white;
}
</style>
