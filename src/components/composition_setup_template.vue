<template>
  <div>
    <h1>composition API （script setup + template）</h1>
    <span>传入参数：{{ msg }}</span> 
    <button @click="increment">+1</button><span>Count: {{ count }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue' 
const props = defineProps(['msg'])
const count = ref(0)

const increment = () => {
  count.value++
}
</script>