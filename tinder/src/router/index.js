import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Like from '@/views/Like.vue';
import Register from '@/views/Register.vue';
import Profile from '@/views/Profile.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '',
                name: 'Home',
                component: Home,
                meta: { requiresAuth: true },
            },
            {
                path: '/like',
                name: 'Like',
                component: Like,
                meta: { requiresAuth: true },
            },
            {
                path: '/profile',
                name: 'Profile',
                component: Profile,
                meta: { requiresAuth: true },
            },
            // 404 路由必須放在最後
            {
                path: '/:pathMatch(.*)*',
                name: 'NotFound',
                component: NotFound,
            },
        ],
    },
    {
        path: '/login',
        component: AuthLayout,
        children: [
            {
                path: '',
                name: 'Login',
                component: Login,
            },
        ],
    },
    {
        path: '/register',
        component: AuthLayout,
        children: [
            {
                path: '',
                name: 'Register',
                component: Register,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 路由守衛：檢查是否登入
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token'); // 假設用 localStorage 儲存 token

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'Login' });
    } else {
        next();
    }
});

export default router;