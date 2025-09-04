<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MyComponent',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
})
</script>

<template>
  <div>
    <h1>defineComponent + option API （template）</h1>
    传入参数： {{ msg }}
    <button @click="increment">+1</button>Count:  {{ count }}
  </div>
</template>