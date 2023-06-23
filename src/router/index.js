import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL || '/',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/',
            redirect: '/',
            name: 'App',
            component: () => import('../App.vue'),
            children: [
                {
                    path: '',
                    name: 'Home',
                    component: () => import('../pages/Home.vue'),
                },
                {
                    path: '/nhan-uu-dai',
                    name: 'PromoDetail',
                    component: () => import(/* webpackChunkName: "promo-detail" */ '../pages/PromoDetail.vue'),
                }
            ]

        },
        
    ]
})
