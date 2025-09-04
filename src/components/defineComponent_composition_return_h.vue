<script>
import { defineComponent, h, ref } from 'vue'

export default defineComponent({

   props: {
    msg: {
      type: String,
      required: true
    } 
  },
  setup(props) {
    const count = ref(0)
    const increment = () => count.value++

    return () =>
      h('div', [
        h('h1', `defineComponent + composition API （ return + h）`), 
         h('span', `传入参数: ${props.msg}`),
        h('button', { onClick: increment }, '+1'),
        h('span', `Count: ${count.value}`)
      ])
  }
})
</script>