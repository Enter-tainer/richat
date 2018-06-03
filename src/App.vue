<template>
  <div id="app">
    <div class="mdui-drawer" id="left-drawer" mdui-collapse="{accordion: true}">
      <ul class="mdui-list">
        <a href="/">
          <li class="mdui-list-item mdui-ripple">
            <i class="mdui-list-item-icon mdui-icon material-icons">home</i>
            <div class="mdui-list-item-content">Home</div>
          </li>
        </a>
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
          </ul>
        </li>
      </ul>
    </div>
    <MessageArea/>
  </div>
</template>

<script>
import MessageArea from './components/MessageArea.vue'
import mdui from 'mdui'
export default {
  name: 'App',
  components: {MessageArea},
  data: function () {
    return {
      nightMode: false
    }
  },
  watch: {
    nightMode () {
      var $$ = mdui.JQ
      $$('body').toggleClass('mdui-theme-layout-dark')
    }
  }
}
</script>

<style>
@import "mdui";
@import "katex/dist/katex";
</style>
