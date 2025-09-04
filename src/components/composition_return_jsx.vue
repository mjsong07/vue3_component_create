
<script lang="jsx">
import { ref } from 'vue'

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
      (<div>
      <h1>composition API （return jsx ）</h1>
      传入参数： { props.msg }  
      <button onClick={increment}>+1</button> Count:  {count.value}
  </div >)
  }
}
</script>