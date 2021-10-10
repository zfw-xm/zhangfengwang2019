import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from "../components/home.vue"
import welcome from "../components/welcome"
import Users from "../components/user/Users"
import User from "../components/user/User"
import Users1 from '../components/user/Users1'
import Users2 from '../components/user/Users2'
import Users3 from '../components/user/Users3'

Vue.use(VueRouter)

const routes = [
    // 路由重定向
    { path: "/", redirect: '/login' },
    { path: '/login', component: Login },
    {
        path: '/home',
        component: Home,
        redirect: '/welcome',
        children: [
            { path: '/welcome', component: welcome },
            { path: '/users', component: Users },
            { path: '/users1', component: Users1 },
            { path: '/users2', name: "users2", component: Users2 },
            { path: '/users3', name: "users3", component: Users3 },
        ]
    },

]

const router = new VueRouter({
    routes
})

export default router