# 前言

由于vue3支持创建组件的方式多样化，实际使用的时候容易混淆。这里梳理了常用的4个创建组件方式。包括
option API，composition API，defineComponent， app.component()

# 1.option API

## option API(template)

面向option api配置，使用配置+template方式，跟vue2类似

```js
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
  <h1>option + template</h1>
  <div>传入参数： {{ msg }}   <button @click="increment">+</button>Count: {{ count }}
  </div>
</template>
```

### 效果图

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/bd930a1e3aa3419488ba2b7aa05a99e9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjk3MjcwNDc5NTgwMjY1MyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1757587317&x-orig-sign=DPsi1c6tewsPtZgD%2BY2PUYR9z80%3D)

## option API(render+h)

最终上面的template会被转化成render方法，所以我们可以不写template，直接执行渲染函数render，通过h函数创建不同的节点

```js
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
        h('h1', null, `option API + render + h`),
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
```

## option API(render+jsx)

jsx最终也是生成vnode ，跟上面的h方法类似

```js
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
      <h1>option API  + return + jsx</h1>
      传入参数： { this.msg }  
      <button onClick={this.increment}>+1</button> Count:  {this.count}
  </div >)
   
  }
}
</script>
```

> 注意：jsx需要另外加入插件支持 @vitejs/plugin-vue-jsx

vite配置

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' 
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
  plugins: [vue(),vueJsx()],
})

```

# 2. composition API

vue3 composition API 是推荐使用的api

## composition API  (script + template)

script + template 是常用写法

缺点，template 要用的变量都要通过setup的return返回包裹的响应式变量与方法。

```js
<template>
  <div>
    <h1>composition API （template）</h1>
    <span>传入参数：{{ msg }}</span>
    <button @click="increment">+1</button><span>Count: {{ count }}</span>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
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
}
</script>
```

### 效果图

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/251640ac59b143b3adbdf7134965bd34~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjk3MjcwNDc5NTgwMjY1MyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1757587317&x-orig-sign=RqOIX%2BMrcFnysdF4aExoBakgr%2Bs%3D)

## composition API（script setup + template）

vue3 Composition API 语法糖，省去了上面的导出

```js
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
```

## composition API（return h ）

同理，如果composition API希望不使用template，可以在setup方法里面返回一个vnode节点。下面使用h函数返回vnode， 等价于上面option API的render方法

```js
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
```

## composition API（return jsx ）

同理，我们也可以使用jsx 生成vnode节点

```js
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
```

# 3. defineComponent

上面我们可以看到使用的都是弱类型，无法对ts类型做支持，于是vue3新增了defineComponent对象用于支持option API和composition API的声明。

下面是option API的使用defineComponent进行声明，其实就是在`export default {}` 多包装了 一层
`export default defineComponent({....})`

## defineComponent + option API （template）

```js
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MyComponent',
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
  }
})
</script>

<template>
  <div>
    <h1>defineComponent + option API （template）</h1>
    传入参数： {{ msg }}
    <button @click="increment">+1</button>Count:  {{ count }}
  </div>
</template>
```

### 效果图

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b8e494aa3e484041aaa2f89a61b1fcb4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjk3MjcwNDc5NTgwMjY1MyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1757587317&x-orig-sign=M%2BC6IshNdxE4cczGXJw%2FCvAC1YQ%3D)

## defineComponent + option API （render + h）

```js
<script lang="ts">
import { h,defineComponent } from 'vue'

export default defineComponent({
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
        h('h1', null, `defineComponent + option API （render + h）`),
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
})
</script>
```

## defineComponent + option API （render + jsx）

```js
<script lang="jsx">
import { h,defineComponent } from 'vue'

export default defineComponent({
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
      <h1>defineComponent + option API （render + jsx）</h1>
      传入参数： { this.msg }  
      <button onClick={this.increment}>+1</button> Count:  {this.count}
  </div >)
   
  }
})
</script>
```

## defineComponent + composition API （template）

```js
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
```

## defineComponent + composition API （ return + h）

```js
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
```

## defineComponent + composition API （ return + h）

```js
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
```

## 3种总效果图

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/2a102dc6b53b4a40867655ea12c359a9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjk3MjcwNDc5NTgwMjY1MyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1757587317&x-orig-sign=1BaN9yF72QVDDZ%2BxpPRkhBv2Gdk%3D)

# 4. app.component()

在非sfc单页面.vue 项目中，通过app.component 定义注册全局的组件

## template 字符串

由于是运行时解析，所以我们可以把template定义成字符串，
main.js

```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue' 

import appComponent_template from './components/appComponent_template.js'  

const app = createApp(App)

app.component('appComponent_template', appComponent_template);  //这里使用的是一个json对象，而不是.vue文件，其实最终也是解析成这个json对象
 
app.mount('#app')
```

/appComponent\_template.js

```js
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
```

App.vue
无需导入，直接使用

```js
<template>
  <appComponent_template msg="xx"/>  
</template>

```

> 注意这种方式工程化项目需要开启运行时解析template

vite配置

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' 
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
export default defineConfig({
  plugins: [vue(),vueJsx()],
  resolve: {
    alias: {
      // 关键：让 vue 指向支持模板编译的版本
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  }
})

```

效果

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/042e2a9dec5745228cbf9bcccd62094c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjk3MjcwNDc5NTgwMjY1MyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1757587317&x-orig-sign=sgqhtXsVRzg3%2FGgK0M25oIrq1zg%3D)

## 其他 template API/composition API/ defineComponent

```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue' 

import appComponent_template from './components/appComponent_template.js' 
import option_template from './components/option_template.vue' 
import defineComponent_option_template from './components/defineComponent_option_template.vue' 
import composition_template from './components/composition_template.vue' 

const app = createApp(App)

app.component('appComponent_template', appComponent_template); 
app.component('option_template', option_template); 
app.component('defineComponent_option_template', defineComponent_option_template); 
app.component('composition_template', composition_template); 
 
app.mount('#app')
```

App.vue
无需导入，直接使用

```js
<template> 
  <appComponent_template msg="xx"/>
  <option_template msg="xx"/>
  <defineComponent_option_template msg="xx"/>
  <composition_template msg="xx"/>  

</template>


```

### 效果图

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/052144a7913748598ca1d8a5f6457983~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjk3MjcwNDc5NTgwMjY1MyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1757587317&x-orig-sign=cSsk1tmfJkk0UHDc2WTL9FUAvkk%3D)

# 5.总结

在实际开发中，包括维护别人的代码会看到很多不同的定义方式，但是百变不离其中，最终还是得吧template的内容转化成vnode虚拟dom，上面的所有代码也是基于这个核心出发。
掌握渲染实现，有利我们定义高阶组件的时候可以借助如jsx或h函数等，更灵活动态化配置我们的组件。

# 6.参考地址

<https://github.com/mjsong07/vue3_component_create>
