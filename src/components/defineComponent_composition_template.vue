<template>
  <div>
    <h1>defineComponent + composition API （template）</h1>
    <span>传入参数：{{ msg }}</span>
    <button @click="increment">+1</button><span>Count: {{ count }}</span>
  </div>
</template>

<script>
import { ref ,defineComponent} from 'vue'

export default defineComponent({
  name: 'App',
  props: {
    // 标题
    msg: {
      type: String,
    },
  },
  setup() {
    const count = ref(0)

    const increment = () => {
      count.value++
    }

    // 返回模板中需要使用的数据和方法
    return {
      increment, count
    }
  }
})
</script>