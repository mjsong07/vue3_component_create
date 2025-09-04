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