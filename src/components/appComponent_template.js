export default  { 
  template: '<div><h1>app.component </h1>传入参数：{{msg}}  <button @click="increment()">+1</button>Count：{{count}}</div>',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  data() { return {count:0 } }
  , methods: {increment() { this.count += 1 } }
}