<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";

const users = ref([
    {
        user_id: "user_1",
        images: "https://images.pexels.com/photos/3970083/pexels-photo-3970083.jpeg",
        name: "Alice",
        gender: "female",
        interests: ["music", "reading", "traveling"],
    },
    {
        user_id: "user_2",
        images: "https://images.pexels.com/photos/2706265/pexels-photo-2706265.jpeg",
        name: "Bob",
        gender: "male",
        interests: ["sports", "gaming", "art"],
    },
    {
        user_id: "user_3",
        images: "https://images.pexels.com/photos/2728649/pexels-photo-2728649.jpeg",
        name: "Carol",
        gender: "female",
        interests: ["music", "reading", "traveling"],
    },
]);

const likedUsers = ref([...users.value]);  // 喜歡列表
const chatHistories = ref({});            // 聊天紀錄

// 移除喜歡（加入動畫效果與確認視窗）
const dislikeUser = (user) => {
    Swal.fire({
        title: "確定要移除嗎？",
        text: `${user.name} 將會從列表中移除`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        confirmButtonColor: "#ff6b81", // 粉紅色按鈕
        cancelButtonColor: "#6c757d",  // 灰色按鈕
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            // 找到對應card
            const card = document.getElementById(`user-${user.user_id}`);

            // 加入動畫
            if (card) {
                card.style.transform = "translateX(-1000px) rotate(-20deg)";
                card.style.opacity = "0";

                setTimeout(() => {
                    likedUsers.value = likedUsers.value.filter(u => u.user_id !== user.user_id);
                    Swal.fire("已移除", `${user.name} 已從列表中移除`, "success");
                }, 500);  // 等待動畫結束後再移除
            }
        }
    });
};

// 開啟聊天（含聊天紀錄）
const openChat = (user) => {
    if (!chatHistories.value[user.user_id]) {
        chatHistories.value[user.user_id] = [
            { sender: user.name, message: "嗨，你好！" }
        ];
    }

    const chatContent = chatHistories.value[user.user_id]
        .map(chat => `<p><b>${chat.sender}：</b>${chat.message}</p>`)
        .join("");

    Swal.fire({
        title: `與 ${user.name} 聊天中`,
        html: `
            <div style="text-align: left;">
                <div id="chat-box" style="height: 200px; overflow-y: auto; background-color: #f1f1f1; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                    ${chatContent}
                </div>
                <input id="chat-input" type="text" placeholder="輸入訊息..." style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc;">
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: "發送",
        cancelButtonText: "關閉",
        confirmButtonColor: "#ff6b81", // 粉紅色按鈕
        cancelButtonColor: "#6c757d",  // 灰色按鈕
        reverseButtons: true,
        preConfirm: () => {
            const message = document.getElementById("chat-input").value;
            if (message.trim() === "") {
                Swal.showValidationMessage("請輸入訊息");
                return false;
            }

            chatHistories.value[user.user_id].push({
                sender: "你",
                message: message,
            });

            const chatBox = document.getElementById("chat-box");
            chatBox.innerHTML += `<p><b>你：</b>${message}</p>`;
            document.getElementById("chat-input").value = "";

            setTimeout(() => {
                const reply = "這聽起來很棒！";
                chatHistories.value[user.user_id].push({
                    sender: user.name,
                    message: reply,
                });

                chatBox.innerHTML += `<p><b>${user.name}：</b>${reply}</p>`;
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 1000);

            return false;
        },
    });
};

onMounted(() => {
    console.log("用戶列表載入完成");
});
</script>

<template>
    <div class="flex flex-col items-center p-5">
        <h1 class="text-3xl font-bold text-center mb-6">我的喜歡</h1>

        <div class="flex flex-wrap justify-center gap-5 w-full max-w-6xl">
            <div v-for="user in likedUsers" :key="user.user_id" :id="`user-${user.user_id}`"
                class="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-lg shadow-md p-4 w-full max-w-2xl hover:scale-105 transform transition duration-300">
                <!-- 用戶圖片 -->
                <img :src="user.images" alt="user image"
                    class="w-36 h-36 object-cover rounded-md md:mr-4 mb-4 md:mb-0" />

                <!-- 用戶資訊與按鈕 -->
                <div class="text-center md:text-left">
                    <h3 class="text-xl font-semibold">{{ user.name }}</h3>
                    <p class="text-gray-600">性別: {{ user.gender }}</p>
                    <p class="text-gray-600">興趣: {{ user.interests.join(', ') }}</p>

                    <div class="flex gap-3 justify-center md:justify-start mt-4">
                        <button @click="dislikeUser(user)"
                            class="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-hover transition duration-300">
                            移除喜歡
                        </button>
                        <button @click="openChat(user)"
                            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition duration-300">
                            開啟聊天
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>