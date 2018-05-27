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
</template>

<script>
import Message from './SingleMessage.vue'
import mdui from 'mdui'
export default {
  name: 'MessageArea',
  components: {Message},
  sockets: {
    connect: function () {
      console.log('socket connected')
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
    }
  },
  mounted () {
    mdui.mutation()
  },
  methods: {
    addMessage: function (data) {
      this.messages.push(data)
    },
    sendMessage: function () {
      var data = {
        username: this.username,
        content: this.inputMessage,
        email: this.email,
        timestamp: (new Date()).valueOf()
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
      inputMessage: ''
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
