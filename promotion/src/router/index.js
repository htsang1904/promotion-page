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
                    name: 'Campaign',
                    component: () => import('../pages/Campaign.vue'),
                },
                {
                    path: '/nhan-uu-dai',
                    name: 'PromoDetail',
                    component: () => import(/* webpackChunkName: "promo-detail" */ '../pages/PromoDetail.vue'),
                },
                {
                    path: '/history',
                    name: 'History',
                    component: () => import('../pages/History.vue'),
                },
                {
                    path: '/user',
                    name: 'FormUserPopup',
                    component: () => import('../pages/FormUserPopup.vue'),
                },
            ]

        },
        
    ]
})
