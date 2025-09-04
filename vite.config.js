import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' 
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx()],
  resolve: {
    alias: {
      // 关键：让 vue 指向支持模板编译的版本
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  }
})
