<template>
  <div class="mdui-col-xs-8" :class="{ 'mdui-col-offset-xs-4': self}">
      <div class="mdui-card mdui-m-t-1 mdui-m-b-1 mdui-shadow-3">
        <div class="mdui-card-header">
          <gravatar :email="email" :class="{ 'mdui-float-right': self, 'mdui-m-l-1': self }"/>
          <div class="mdui-card-header-title" :class="{ 'mdui-text-right': self }">{{ username }}</div>
          <div class="mdui-card-header-subtitle" :class="{ 'mdui-text-right': self }">{{ time }}</div>
        </div>
        <div class="mdui-card-content tgt mdui-typo">
          <div v-html="renderedMarkdown"></div>
        </div>
        <!-- <div class="mdui-card-actions">
          <button class="mdui-btn mdui-ripple">action 1</button>
          <button class="mdui-btn mdui-ripple">action 2</button>
          <button class="mdui-btn mdui-btn-icon mdui-float-right"><i class="mdui-icon material-icons">expand_more</i></button>
        </div> -->
      </div>
    </div>
</template>

<script>
import gravatar from './Gravatar.vue'
import delay from 'lodash/delay'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import renderMarkdown from '../utilities/MarkdownRenderer.js'
import { renderMath } from '../utilities/MathRenderer.js'
import makeMediaZoomable from '../utilities/Fancybox.js'
export default {
  components: {gravatar},
  name: 'Message',
  props: ['username', 'content', 'email', 'timestamp', 'self'],
  data: function () {
    return {
      renderedMarkdown: '',
      time: ''
    }
  },
  created () {
    dayjs.extend(relativeTime)
    dayjs.locale('zh-cn')
    this.getTime()
    setInterval(this.getTime, 1000 * 60)
    this.renderEverything()
  },
  watch: {
    content: function () {
      this.renderEverything()
    }
  },
  methods: {
    getTime: function () {
      this.time = dayjs(this.timestamp).fromNow()
    },
    renderEverything: function () {
      this.renderedMarkdown = renderMarkdown(this.content)
      delay(renderMath, 100)
      delay(makeMediaZoomable, 100)
    }
  },
  updated () {
    delay(makeMediaZoomable, 100)
  }
}
</script>
