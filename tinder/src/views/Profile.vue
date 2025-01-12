<template>
    <div class="text-center">
        <h1>使用 Refresh Token 獲取 API Token</h1>
        <button @click="fetchApiToken"
            class="mt-3 w-1/3 bg-primary text-white px-4 py-2 rounded-lg w-full hover:bg-primary-hover transition duration-300">取得
            API Token</button>
        <p v-if="loading">請求中...</p>
        <p v-if="apiToken">API Token: {{ apiToken }}</p>
        <p v-if="error" style="color: red">發生錯誤: {{ error }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import { apiClient, getApiToken } from '../api/apiClient';

const apiToken = ref(null);
const error = ref(null);
const loading = ref(false);

const fetchApiToken = async () => {
    loading.value = true;
    error.value = null;
    apiClient.post('/v2/auth/sms/send', { phone_number: '886923258468' })
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
            error.value = error.response.data.message;
        }).finally(() => {
            loading.value = false;
        });
};
</script>