<template>
  <img class="mdui-card-header-avatar" :src="url" :alt="alt" @load="onLoad" @error="onError" />
</template>

<script>
import gavatarLink from '../utilities/GravatarLink'
export default {
  name: 'gravatar',
  props: {
    email: {
      type: String,
      default: ''
    },
    hash: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 80
    },
    defaultImg: {
      type: String,
      default: 'retro'
    },
    rating: {
      type: String,
      default: 'g'
    },
    alt: {
      type: String,
      default: 'Avatar'
    }
  },
  computed: {
    url () {
      return gavatarLink(this.hash, this.email, this.size, this.defaultImg, this.rating)
    }
  },
  methods: {
    onLoad (...args) {
      this.$emit('load', ...args)
    },
    onError (...args) {
      this.$emit('error', ...args)
    }
  }
}
</script>
