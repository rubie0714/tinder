/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主要顏色
        primary: {
          DEFAULT: '#ff6b81',
          hover: '#ff4757',
        },
        // 次要顏色
        secondary: {
          DEFAULT: '#6b7280',  // 黃色 (Secondary 次色)
          hover: '#4b5563',    // 黃色 Hover
        },
      },
    },
  },
  plugins: [],

}

