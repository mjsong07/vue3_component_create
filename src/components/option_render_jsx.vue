<script lang="jsx">

export default {
  name: 'HelloRender',
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
  },
  render() {
   return  (<div>
      <h1>option API （render + jsx）</h1>
      传入参数： { this.msg }  
      <button onClick={this.increment}>+1</button> Count:  {this.count}
  </div >)
   
  }
}
</script>