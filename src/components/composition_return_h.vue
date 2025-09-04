

<script>
import { ref, h } from 'vue'

export default {
  name: 'App',
  props: {
    // 标题
    msg: {
      type: String,
    },
  },
  setup(props) {
    const count = ref(0)
    const increment = () => count.value++

    return () =>
      h('div', [
        h('h1', `composition API （return h ）`), 
         h('span', `传入参数: ${props.msg}`),
        h('button', { onClick: increment }, '+1'),
        h('span', `Count: ${count.value}`)
      ])
  }
}
</script>