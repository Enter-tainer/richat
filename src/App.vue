<template>
  <div id="app">
    <div class="mdui-drawer" id="left-drawer">
      <ul class="mdui-list">
        <a href="/">
          <li class="mdui-list-item mdui-ripple">
            <i class="mdui-list-item-icon mdui-icon material-icons">home</i>
            <div class="mdui-list-item-content">Home</div>
          </li>
        </a>
      </ul>
    </div>
    <MessageArea/>
  </div>
</template>

<script>
import MessageArea from './components/MessageArea.vue'
export default {
  name: 'App',
  components: {MessageArea}
}
</script>

<style>
@import "mdui";
@import "katex/dist/katex";
</style>
