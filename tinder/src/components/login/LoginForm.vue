<template>
    <div class="max-w-md mx-auto mt-24 p-6 border border-gray-300 rounded-lg bg-white shadow-md">
        <h1 class="text-3xl font-bold text-center mb-6">登入</h1>
        <form @submit.prevent="handleLogin" class="space-y-4">
            <div>
                <label for="email" class="block text-left text-gray-700 mb-1">Email</label>
                <input type="email" id="email" v-model="email" placeholder="請輸入 Email" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div>
                <label for="password" class="block text-left text-gray-700 mb-1">密碼</label>
                <input type="password" id="password" v-model="password" placeholder="請輸入密碼" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <button type="submit"
                class="bg-primary text-white px-4 py-2 rounded-lg w-full hover:bg-primary-hover transition duration-300">
                登入
            </button>
        </form>

        <p class="mt-4 text-sm text-center">
            還沒有帳號嗎？
            <a href="/register" class="text-blue-500 hover:underline">註冊</a>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = () => {
    if (email.value && password.value) {
        localStorage.setItem('token', 'fake-jwt-token');
        alert('登入成功！');
        router.push({ name: 'Home' });
    } else {
        alert('請輸入帳號與密碼');
    }
};
</script>