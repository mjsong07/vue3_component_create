<script lang="jsx">
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
    (<div>
      <h1>defineComponent + composition API （ return + jsx）</h1>
      传入参数： { props.msg }  
      <button onClick={increment}>+1</button> Count:  {count.value}
  </div >)
  }
})
</script>