import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL; // 環境變數設定 API base URL

// Axios 實例
export const apiClient = axios.create({
    baseURL: '/api',
    timeout: 10000,

});


apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('apiToken');
        if (token) {
            config.headers['X-Auth-Token'] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export const getApiToken = async (refreshToken, phoneNumber = null) => {
    try {
        const payload = {
            refresh_token: refreshToken,
        };

        if (phoneNumber) {
            payload.phone_number = phoneNumber;
        }

        const response = await apiClient.post('/v2/auth/login/sms', payload);
        return response.data.api_token; // 返回 API Token
    } catch (error) {
        console.error('Error fetching API Token:', error.response?.data || error.message);
        throw error;
    }
};