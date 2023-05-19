import Vue from 'vue'
import App from './App.vue'
import imgUrl from './helper/imgurl'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.filter('imgUrl', imgUrl)
Vue.config.productionTip = false
Vue.use(Buefy)
new Vue({
  render: h => h(App),
}).$mount('#app')
