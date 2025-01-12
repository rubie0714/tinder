<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import anime from 'animejs/lib/anime.es.js';
import router from "../router";

// 主卡片陣列（用來重置）
const originalUsers = [
    {
        user_id: "user_1",
        images: "https://images.pexels.com/photos/3970083/pexels-photo-3970083.jpeg",
        name: "Alice1",
        gender: "female",
        interests: ["music", "reading", "traveling"],
    },
    {
        user_id: "user_2",
        images: "https://images.pexels.com/photos/2706265/pexels-photo-2706265.jpeg",
        name: "Bob2",
        gender: "male",
        interests: ["sports", "gaming", "art"],
    },
    {
        user_id: "user_3",
        images: "https://images.pexels.com/photos/2728649/pexels-photo-2728649.jpeg",
        name: "Alice3",
        gender: "female",
        interests: ["music", "reading", "traveling"],
    },
];

// 可互動的卡片陣列
const users = ref([...originalUsers]);
const liked = ref([]);
const disliked = ref([]);
const startX = ref(0);
const currentX = ref(0);
const dragging = ref(false);
const containerBgColor = ref("#ffffff");
const cardsRef = ref([]);

const startDrag = (event) => {
    dragging.value = true;
    startX.value = event.type === "mousedown" ? event.clientX : event.touches[0].clientX;

    if (event.type === "mousedown") {
        window.addEventListener("mousemove", onDrag);
        window.addEventListener("mouseup", endDrag);
    } else {
        window.addEventListener("touchmove", onDrag);
        window.addEventListener("touchend", endDrag);
    }
};

const onDrag = (event) => {
    if (!dragging.value || users.value.length === 0) return;

    const current = event.type === "mousemove" ? event.clientX : event.touches[0].clientX;
    const diffX = current - startX.value;
    currentX.value = diffX;

    const card = cardsRef.value[0];
    if (card) {
        card.style.transform = `translateX(${diffX}px) rotate(${diffX / 20}deg)`;
    }

    containerBgColor.value = diffX > 0
        ? `rgba(255, 105, 180, ${Math.min(diffX / 300, 0.8)})`
        : `rgba(169, 169, 169, ${Math.min(-diffX / 300, 0.8)})`;
};

const endDrag = () => {
    if (!dragging.value || users.value.length === 0) return;

    const card = cardsRef.value[0];
    if (currentX.value > 150) {
        card.style.transform = "translateX(1000px)";
        addToArray("liked");
    } else if (currentX.value < -150) {
        card.style.transform = "translateX(-1000px)";
        addToArray("disliked");
    } else {
        card.style.transform = "translateX(0) rotate(0deg)";
    }

    containerBgColor.value = "#ffffff";
    dragging.value = false;
    currentX.value = 0;

    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", endDrag);
    window.removeEventListener("touchmove", onDrag);
    window.removeEventListener("touchend", endDrag);
};

const addToArray = (type) => {
    setTimeout(() => {
        const user = users.value.shift();
        if (type === "liked") {
            liked.value.push(user);
        } else {
            disliked.value.push(user);
        }

        // 檢查是否已選擇完畢
        if (users.value.length === 0) {
            showCompletionAlert();
        }
    }, 300);
};

// 顯示 SweetAlert 提示
const showCompletionAlert = () => {
    Swal.fire({
        title: "🎉 選擇完成！",
        text: "你想重新選擇還是查看喜歡的卡片？",
        background: "#f9f9f9", // 淺灰背景
        confirmButtonText: "查看喜歡",
        cancelButtonText: "重新選擇",
        showCancelButton: true,
        confirmButtonColor: "#ff6b81", // 粉紅色按鈕
        cancelButtonColor: "#6c757d",  // 灰色按鈕
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            showLikedCards();
        } else {
            resetCards();
        }
    });
};

// 顯示喜歡的卡片
const showLikedCards = () => {
    router.push('/like')
};

// 重置卡片
const resetCards = () => {
    users.value = [...originalUsers];
    liked.value = [];
    disliked.value = [];
};

const handleButtonClick = (type) => {
    const card = cardsRef.value[0];
    if (!card) return;

    if (type === "liked") {
        card.style.transform = "translateX(1000px) rotate(20deg)";
        addToArray("liked");
    } else {
        card.style.transform = "translateX(-1000px) rotate(-20deg)";
        addToArray("disliked");
    }
};

// 動畫：心電圖波形線條
const startHeartbeatAnimation = () => {
    anime({
        targets: ".heartbeat-path",    // 綁定到 SVG 的線條
        strokeDashoffset: [anime.setDashoffset, 0],  // 動畫效果：線條顯示
        easing: "linear",
        duration: 3000,                // 每次心跳動畫持續 3 秒
        loop: true                     // 無限循環
    });

    // 模擬上下波動（呼吸感）
    anime({
        targets: ".heartbeat-svg",
        translateY: [-5, 5],           // 上下浮動
        duration: 1000,
        direction: "alternate",
        easing: "easeInOutSine",
        loop: true
    });
};


onMounted(() => {
    cardsRef.value = Array.from(document.querySelectorAll(".card"));
    startHeartbeatAnimation();  // 啟動動畫
});
</script>

<template>

    <div class="heart-beat-bg mx-auto md:flex justify-center items-center w-full h-[100vh]">
        <div class="content">
            <div class="md:flex">
                <h1
                    class="flex text-center items-center text-xl font-bold py-4 mt-10 md:mt-0 md:mb-10 md:mr-4 text-white">
                    「愛的選擇：找到你的心動！」
                </h1>
                <div class="heartbeat-container">
                    <!-- SVG 心電圖線條 -->
                    <svg class="heartbeat-svg" width="100%" height="200" viewBox="0 0 1000 200">
                        <path class="heartbeat-path"
                            d="M0,100 L100,100 L150,20 L200,180 L250,100 L400,100 L450,40 L500,160 L550,100 L700,100"
                            stroke="#ff6b81" stroke-width="4" fill="none" stroke-linecap="round" />
                    </svg>
                </div>
                <div>
                    <div class="card-container border-dashed border-4 border-gray-400 rounded-xl"
                        :style="{ backgroundColor: containerBgColor }">
                        <template v-for="(user, index) in users" :key="user.user_id">
                            <div class="card hover:scale-105 hover:shadow-xl" :style="{ zIndex: users.length - index }"
                                @mousedown="index === 0 && startDrag($event)"
                                @touchstart="index === 0 && startDrag($event)" ref="cardsRef" c>
                                <img :src="user.images" alt="user image"
                                    class="rounded-t-lg w-full h-2/3 object-cover" />
                                <div class="card-content">
                                    <h2 class="text-lg font-semibold">{{ user.name }}</h2>
                                </div>
                            </div>
                        </template>

                    </div>
                    <div class="max-w-[360px] flex justify-between mt-5 hidden md:block space-x-2">
                        <button @click="handleButtonClick('disliked')"
                            class="bg-secondary text-white px-4 py-4 rounded-lg w-[48%] hover:bg-secondary-hover transition duration-300">
                            不喜歡
                        </button>
                        <button @click="handleButtonClick('liked')"
                            class="bg-primary text-white px-4 py-4 rounded-lg w-[48%] hover:bg-primary-hover transition duration-300">
                            喜歡
                        </button>
                    </div>

                </div>

            </div>



        </div>
    </div>

</template>

<style scoped>
.card-container {
    position: relative;
    width: 320px;
    height: 480px;
    margin: auto;
}

.card {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    cursor: grab;
}

.card-content {
    padding: 16px;
    text-align: center;
}



/* SVG 線條 */
.heartbeat-svg {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
}

/* 心跳線條樣式 */
.heartbeat-path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    filter: drop-shadow(0 0 10px #ff6b81);
}
</style>