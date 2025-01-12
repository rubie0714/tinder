<template>
    <div>
        <HeaderComponent />
        <main>
            <router-view />
        </main>
    </div>
</template>

<script setup>
import HeaderComponent from '@/components/layouts/HeaderComponent.vue';
</script>

<style scoped>
main {
    padding: 20px;
}
</style>