<template>
  <div class="mdui-col-xs-12">
      <div class="mdui-card mdui-m-t-1 mdui-m-b-1">
        <div class="mdui-card-header">
          <gravatar :email="email"/>
          <div class="mdui-card-header-title">{{ username }}</div>
          <div class="mdui-card-header-subtitle">{{ time }}</div>
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
import marked from 'marked'
import renderMathInElement from 'katex/dist/contrib/auto-render'
import mdui from 'mdui'
import hljs from 'highlight.js'
import gravatar from './Gravatar.vue'
import delay from 'lodash/delay'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'highlight.js/lib/languages/haskell.js'
import 'dayjs/locale/zh-cn'
export default {
  components: {gravatar},
  name: 'Message',
  props: ['username', 'content', 'email', 'timestamp'],
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
    compileMarkdown: function (text) {
      return marked(text, {
        highlight: function (code) {
          return hljs.highlightAuto(code).value
        },
        gfm: true,
        tables: true
      })
    },
    renderMath: function () {
      var $$ = mdui.JQ
      var all = $$('.tgt')
      renderMathInElement(all[all.length - 1], {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false}
        ]
      })
    },
    renderEverything: function () {
      this.renderedMarkdown = this.compileMarkdown(this.content)
      delay(this.renderMath, 100)
    }
  }

}
</script>

<style>
@import 'highlight.js/styles/ocean.css';
@import 'katex/contrib/copy-tex/copy-tex.css';
</style>
