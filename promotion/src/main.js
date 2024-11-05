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
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);
Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.use(Flicking)

Vue.filter('imgUrl', imgUrl)
Vue.config.productionTip = false
Vue.use(Buefy, {
    defaultIconComponent: "vue-fontawesome",
    defaultIconPack: "fas",
    customIconPacks: {
        fas: {
        sizes: {
            default: "lg",
            "is-small": "1x",
            "is-medium": "2x",
            "is-large": "3x"
        },
        iconPrefix: ""
        }
    }
});
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
