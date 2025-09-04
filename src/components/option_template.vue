<script>
export default {
  name: 'MyComponent',
  props: ['msg'],
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
}
</script>

<template> 
  <h1>option API （template）</h1>
  <div>传入参数： {{ msg }}   <button @click="increment">+</button>Count: {{ count }}
  </div>
</template>