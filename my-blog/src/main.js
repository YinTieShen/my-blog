import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routers from './router'
// import Editor from 'wangeditor'
// import 'wangeditor/release/wangEditor.min.css'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueRouter)
// Vue.use(Editor)
//自定义指令
Vue.directive("rainbow",{
  bind(el,binding,vnode){
    el.style.color = "#"+Math.random().toString(16).slice(2,8);
  }
})

//自定义过滤器
// Vue.filter('to-uppercase',function(value){
//   return value.toUpperCase();
// })
Vue.filter('snippet',function(value){
  return value.slice(0,100)+"...";
})

//创建路由
const router = new VueRouter({
  routes:Routers,
  mode:"history"
})

new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
