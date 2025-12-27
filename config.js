// MongoDB Charts 配置
// 使用 Vite 的環境變量系統
// 配置存儲在 .env 文件中

export const CONFIG = {
    MONGODB_CHARTS_BASE_URL: import.meta.env.VITE_MONGODB_CHARTS_BASE_URL,
    CHART_IDS: {
        chart1: import.meta.env.VITE_CHART_ID_1,
        chart2: import.meta.env.VITE_CHART_ID_2,
        chart3: import.meta.env.VITE_CHART_ID_3,
        chart4: import.meta.env.VITE_CHART_ID_4,
        chart5: import.meta.env.VITE_CHART_ID_5,
        chart6: import.meta.env.VITE_CHART_ID_6,
        chart7: import.meta.env.VITE_CHART_ID_7,
        chart8: import.meta.env.VITE_CHART_ID_8,
        chart9: import.meta.env.VITE_CHART_ID_9,
        chart10: import.meta.env.VITE_CHART_ID_10,
        chart11: import.meta.env.VITE_CHART_ID_11
    }
};
