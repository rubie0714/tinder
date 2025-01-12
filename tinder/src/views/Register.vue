<template>
    <div class="mx-4 max-w-md md:mx-auto mt-24 p-6 border border-gray-300 rounded-lg bg-white shadow-md">
        <h1 class="text-3xl font-bold text-center mb-6">註冊</h1>
        <form @submit.prevent="handleRegister" class="space-y-4">
            <!-- 使用者名稱 -->
            <div>
                <label for="username" class="block text-left text-gray-700 mb-1">使用者名稱</label>
                <input type="text" id="username" v-model="username" placeholder="請輸入使用者名稱" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <!-- Email -->
            <div>
                <label for="email" class="block text-left text-gray-700 mb-1">Email</label>
                <input type="email" id="email" v-model="email" placeholder="請輸入 Email" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <!-- 密碼 -->
            <div>
                <label for="password" class="block text-left text-gray-700 mb-1">密碼</label>
                <input type="password" id="password" v-model="password" placeholder="請輸入密碼" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <!-- 確認密碼 -->
            <div>
                <label for="confirmPassword" class="block text-left text-gray-700 mb-1">確認密碼</label>
                <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="再次輸入密碼" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <!-- 註冊按鈕 -->
            <button type="submit"
                class="bg-primary text-white px-4 py-2 rounded-lg w-full hover:bg-primary-hover transition duration-300">
                註冊
            </button>
        </form>

        <p class="mt-4 text-sm text-center">
            已經有帳號了？
            <a href="/login" class="text-blue-500 hover:underline">登入</a>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

// 處理註冊功能
const handleRegister = () => {
    if (password.value !== confirmPassword.value) {
        alert('密碼與確認密碼不一致');
        return;
    }

    if (username.value && email.value && password.value) {
        // 模擬註冊成功，儲存資料 (實際應該發送到 API)
        localStorage.setItem('user', JSON.stringify({
            username: username.value,
            email: email.value,
        }));
        alert('註冊成功！請登入');
        router.push('/login');  // 註冊成功後導向登入頁面
    } else {
        alert('請填寫完整資訊');
    }
};
</script>