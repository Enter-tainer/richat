<template>
  <div id="app">
    <div class="mdui-drawer" id="left-drawer">
      <ul class="mdui-list" mdui-collapse="{accordion: true}">
        <router-link to="/">
          <li class="mdui-list-item mdui-ripple">
            <i class="mdui-list-item-icon mdui-icon material-icons">home</i>
            <div class="mdui-list-item-content">主页</div>
          </li>
        </router-link>
          <li class="mdui-collapse-item mdui-collapse-item-open">
            <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
              <i class="mdui-list-item-icon mdui-icon material-icons">group</i>
              <div class="mdui-list-item-content">群组</div>
              <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
            </div>
            <ul class="mdui-collapse-item-body mdui-list mdui-list-dense">
              <router-link :to=randomLink()>
                <li class="mdui-list-item mdui-ripple mdui-text-truncate">随机房间</li>
              </router-link>
            </ul>
            <ul class="mdui-collapse-item-body mdui-list mdui-list-dense">
              <router-link v-for="i in groupAvailable" :key="i.link" :to="i.link">
                <li class="mdui-list-item mdui-ripple mdui-text-truncate">{{i.name}}</li>
              </router-link>
            </ul>
          </li>
        <li class="mdui-collapse-item mdui-collapse-item-open">
          <div class="mdui-collapse-item-header mdui-list-item mdui-ripple">
            <i class="mdui-list-item-icon mdui-icon material-icons">settings</i>
            <div class="mdui-list-item-content">设置</div>
            <i class="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
          </div>
          <ul class="mdui-collapse-item-body mdui-list mdui-list-dense">
              <li class="mdui-list-item mdui-ripple">
                <i class="mdui-list-item-icon mdui-icon material-icons">brightness_4</i>
                <div class="mdui-list-item-content">夜间模式</div>
                <label class="mdui-switch">
                  <input type="checkbox" v-model="nightMode"/>
                  <i class="mdui-switch-icon"></i>
                </label>
              </li>
              <li class="mdui-list-item mdui-ripple" @click="resetUsername = !resetUsername">
                <i class="mdui-list-item-icon mdui-icon material-icons">restore</i>
                <div class="mdui-list-item-content">重置用户名</div>
              </li>
          </ul>
        </li>
      </ul>
    </div>
    <router-view :nightMode="nightMode" :resetUsername="resetUsername"/>
  </div>
</template>

<script>
import MessageArea from './components/MessageArea.vue'
import katexReplaceWithTex from 'katex/contrib/copy-tex/katex2tex.js'
import mdui from 'mdui'
export default {
  name: 'App',
  components: {MessageArea},
  methods: {
    randomLink () {
      return btoa(this.shuffleString(btoa(new Date().valueOf())))
    },
    shuffleString (str) {
      return Array.from(str).sort(() => 0.5 - Math.random()).join()
    }
  },
  data: function () {
    return {
      nightMode: true,
      resetUsername: false,
      groupAvailable: [{
        name: 'data group = TH | CS | Gal',
        link: 'data group = TH | CS | Gal'
      }]
    }
  },
  watch: {
    nightMode () {
      var $$ = mdui.JQ
      $$('body').toggleClass('mdui-theme-layout-dark')
    }
  },
  created () {
    var $$ = mdui.JQ
    if (this.nightMode && !$$('body').hasClass('mdui-theme-layout-dark')) {
      $$('body').toggleClass('mdui-theme-layout-dark')
    }
    document.addEventListener('copy', function (event) {
      const selection = window.getSelection()
      if (selection.isCollapsed) {
        return
      }
      const fragment = selection.getRangeAt(0).cloneContents()
      if (!fragment.querySelector('.katex-mathml')) {
        return
      }
      const html = []
      for (let i = 0; i < fragment.childNodes.length; i++) {
        html.push(fragment.childNodes[i].outerHTML)
      }
      event.clipboardData.setData('text/html', html.join(''))
      event.clipboardData.setData('text/plain',
        katexReplaceWithTex(fragment).textContent)
      event.preventDefault()
    })
  }
}
</script>

<style>
@import "mdui";
@import "katex/dist/katex";
</style>
