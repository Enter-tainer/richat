<template>
  <div class="mdui-spinner"></div>
</template>

<script>
import mdui from 'mdui'
export default {
  name: 'LoadingSpinner',
  mounted () {
    mdui.mutation()
  }
}
</script>
