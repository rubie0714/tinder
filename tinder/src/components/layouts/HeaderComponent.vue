<template>
    <nav class="navbar">
        <div class="navbar-brand" @click="goHome">
            Rubie's Tinder
        </div>
        <ul class="navbar-links">
            <li><router-link to="/home">首頁</router-link></li>
            <li><router-link to="/like">我的喜歡</router-link></li>
            <li><button @click="logout">登出</button></li>

        </ul>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
    router.push('/home');
};

const logout = () => {
    localStorage.removeItem('access_token');
    router.push('/login');
};
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
}

.navbar-brand {
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
}

.navbar-links {
    list-style: none;
    display: flex;
    gap: 20px;
}

.navbar-links a {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
}

.navbar-links a:hover {
    text-decoration: underline;
}
</style>