// ========================================
// MongoDB Charts SDK 初始化
// ========================================
import { CONFIG } from '../config.js';

// 從 config.js 載入配置
const CHARTS_CONFIG = {
    baseUrl: CONFIG.MONGODB_CHARTS_BASE_URL,
    chartIds: CONFIG.CHART_IDS
};

// 儲存圖表實例
let chartInstances = {};

// 定義哪些圖表有圖例（需要放大圖例）
const chartsWithLegend = ['chart2', 'chart3', 'chart4', 'chart5', 'chart6', 'chart7', 'chart8', 'chart11'];

// 初始化所有圖表
function initializeCharts() {
    const ChartsEmbedSDK = window.ChartsEmbedSDK;

    if (!ChartsEmbedSDK) {
        console.error('MongoDB Charts SDK 未載入');
        return;
    }

    Object.keys(CHARTS_CONFIG.chartIds).forEach(chartKey => {
        const chartId = CHARTS_CONFIG.chartIds[chartKey];
        const chartDiv = document.getElementById(chartKey);

        if (chartDiv && chartId && chartId !== `${CHARTS_CONFIG.chartIds}${chartKey.slice(-1)}`) {
            const sdk = new ChartsEmbedSDK({
                baseUrl: CHARTS_CONFIG.baseUrl
            });

            // 根據圖表是否有圖例使用不同的配置
            let chartConfig = {
                chartId: chartId,
                width: '100%',
                height: '100%',
                theme: 'dark',
                autoRefresh: true,
                maxDataAge: 60,
                background: 'transparent',
                showAttribution: false
            };

            // 如果圖表有圖例，添加 renderingSpec 來放大圖例
            if (chartsWithLegend.includes(chartKey)) {
                chartConfig.renderingSpec = {
                    version: 1,
                    title: '',
                    options: {
                        labelSize: 150
                    }
                };
            } else {
                // 沒有圖例的圖表使用簡單配置
                chartConfig.renderingSpec = {
                    version: 1,
                    title: ''
                };
            }

            const chart = sdk.createChart(chartConfig);

            // 儲存圖表實例以便後續使用 setFilter
            chartInstances[chartKey] = chart;

            chart.render(chartDiv).catch(err => {
                console.error(`載入圖表 ${chartKey} 時發生錯誤:`, err);
                chartDiv.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #66c0f4;">
                        <div style="text-align: center;">
                            <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 16px;"></i>
                            <p>圖表載入失敗</p>
                            <p style="font-size: 12px; opacity: 0.7;">請檢查圖表配置</p>
                        </div>
                    </div>
                `;
            });
        }
    });
}

// 當 DOM 和 SDK 載入完成後初始化圖表
window.addEventListener('load', () => {
    // 延遲初始化，確保 SDK 完全載入
    setTimeout(() => {
        initializeCharts();
    }, 200);
});

export { chartInstances, initializeCharts };
