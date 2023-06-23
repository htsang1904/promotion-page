import Vue from 'vue'
import router from './router'
import App from './App.vue'
import imgUrl from './helper/imgurl'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import Flicking from "@egjs/vue-flicking";
import "@egjs/vue-flicking/dist/flicking.css";
import "@egjs/vue-flicking/dist/flicking-inline.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";

Vue.use(Flicking)

Vue.filter('imgUrl', imgUrl)
Vue.config.productionTip = false
Vue.use(Buefy)
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
