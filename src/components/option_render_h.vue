<script lang="ts">
import { h } from 'vue'

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
    return h('div', null, [
        h('h1', null, `option API （render + h）`),
      h('span', null, `传入参数: ${this.msg}`),
      h(
        'button',
        {
          onClick: this.increment
        },
        '+1'
      ),
      h('span', null, `count ${this.count} `),
    ])
  }
}
</script>