// ========================================
// 導入配置
// ========================================
import { CONFIG } from './config.js';

// ========================================
// 自定義滑鼠游標
// ========================================
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let dotX = 0;
let dotY = 0;

// 追蹤滑鼠位置
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 平滑跟隨動畫
function animateCursor() {
    // 主游標 (較慢的跟隨)
    const cursorSpeed = 0.15;
    cursorX += (mouseX - cursorX) * cursorSpeed;
    cursorY += (mouseY - cursorY) * cursorSpeed;
    
    // 小圓點 (較快的跟隨)
    const dotSpeed = 0.3;
    dotX += (mouseX - dotX) * dotSpeed;
    dotY += (mouseY - dotY) * dotSpeed;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// 游標懸停效果
document.querySelectorAll('button, a, .chart-card-full, .nav-item, .sidebar-toggle').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.borderColor = '#4a9fd4';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.borderColor = '#66c0f4';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ========================================
// 平滑滾動功能
// ========================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 將 scrollToSection 暴露到全局作用域，以便 HTML onclick 可以調用
window.scrollToSection = scrollToSection;

// ========================================
// 手把掉落動畫偵測與導航列控制
// ========================================
const sections = document.querySelectorAll('.section');
const navbar = document.querySelector('.chart-navbar');
const sidebarToggle = document.getElementById('sidebarToggle');
const carouselContainer = document.querySelector('.carousel-container');
let isSidebarCollapsed = false;

// 建立 Intersection Observer
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 當 section 進入視窗時，觸發該 section 內的手把掉落動畫
            const gamepad = entry.target.querySelector('.gamepad-dropped');
            if (gamepad && !gamepad.classList.contains('animated')) {
                gamepad.classList.add('animated');
                gamepad.style.animation = 'dropIn 1s ease-out forwards';
            }

            // 如果進入 charts section，顯示 navbar 和調整 carousel-container
            if (entry.target.id === 'charts' && navbar) {
                navbar.classList.add('visible');
                const carouselContainer = document.querySelector('.carousel-container');
                if (carouselContainer) {
                    carouselContainer.classList.add('with-sidebar');
                }
            }
        } else {
            // 如果離開 charts section，隱藏 navbar 和移除 carousel-container 調整
            if (entry.target.id === 'charts' && navbar) {
                navbar.classList.remove('visible');
                const carouselContainer = document.querySelector('.carousel-container');
                if (carouselContainer) {
                    carouselContainer.classList.remove('with-sidebar');
                }
            }
        }
    });
}, observerOptions);

// 觀察所有 section
sections.forEach(section => {
    sectionObserver.observe(section);
});

// ========================================
// 側邊欄切換功能
// ========================================
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        isSidebarCollapsed = !isSidebarCollapsed;

        if (navbar) {
            navbar.classList.toggle('collapsed');
        }

        if (carouselContainer) {
            if (isSidebarCollapsed) {
                carouselContainer.classList.remove('with-sidebar');
                carouselContainer.classList.add('with-sidebar-collapsed');
            } else {
                carouselContainer.classList.remove('with-sidebar-collapsed');
                carouselContainer.classList.add('with-sidebar');
            }
        }
    });
}

// ========================================
// 輪播功能
// ========================================
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const track = document.querySelector('.carousel-track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.querySelectorAll('.indicator');
const navItems = document.querySelectorAll('.nav-item');

// 更新輪播位置
function updateCarousel(index) {
    // 確保索引在有效範圍內
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    
    currentSlide = index;
    
    // 移動軌道
    const offset = -currentSlide * 100;
    if (track) {
        track.style.transform = `translateX(${offset}%)`;
    }
    
    // 更新 slide active 狀態
    slides.forEach((slide, i) => {
        if (i === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // 更新指示器
    indicators.forEach((indicator, i) => {
        if (i === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
    
    // 更新導航項目
    navItems.forEach((item, i) => {
        if (i === currentSlide) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 前一張
function prevSlide() {
    if (currentSlide > 0) {
        updateCarousel(currentSlide - 1);
    }
}

// 下一張
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        updateCarousel(currentSlide + 1);
    }
}

// 按鈕事件
if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

// 指示器點擊事件
indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
        const slideIndex = parseInt(indicator.getAttribute('data-slide'));
        updateCarousel(slideIndex);
    });
});

// 導航項目點擊事件
navItems.forEach((item) => {
    item.addEventListener('click', () => {
        const slideIndex = parseInt(item.getAttribute('data-slide'));
        updateCarousel(slideIndex);
        
        // 滾動到 charts section (如果不在該 section)
        const chartsSection = document.getElementById('charts');
        if (chartsSection) {
            const rect = chartsSection.getBoundingClientRect();
            if (rect.top < -100 || rect.top > 100) {
                chartsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// 鍵盤控制輪播
document.addEventListener('keydown', (e) => {
    // 只在 charts section 可見時啟用左右鍵控制輪播
    if (navbar && navbar.classList.contains('visible')) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
        }
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
        }
    }
    
    // Page Up/Down 控制頁面滾動
    if (e.key === 'PageDown') {
        e.preventDefault();
        const chartsSection = document.getElementById('charts');
        if (chartsSection) {
            chartsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    if (e.key === 'PageUp') {
        e.preventDefault();
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// 滑鼠滾輪控制輪播 (在輪播區域內)
let isScrolling = false;
const carouselWrapper = document.querySelector('.carousel-wrapper');
if (carouselWrapper) {
    carouselWrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        if (!isScrolling) {
            isScrolling = true;
            
            if (e.deltaY > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            
            setTimeout(() => {
                isScrolling = false;
            }, 600);
        }
    });
}

// 觸控滑動支援
let touchStartX = 0;
let touchEndX = 0;

if (carouselWrapper) {
    carouselWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 向左滑動 - 下一張
            nextSlide();
        } else {
            // 向右滑動 - 上一張
            prevSlide();
        }
    }
}

// 初始化輪播
if (slides.length > 0) {
    updateCarousel(0);
}

// ========================================
// 滾動時的視差效果
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero section 視差效果
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
    
    // 浮動手把在滾動時的視差
    const floatingGamepad = document.querySelector('.floating');
    if (floatingGamepad) {
        floatingGamepad.style.transform = `translateY(${-20 + scrolled * 0.3}px) rotate(-45deg)`;
    }
});

// ========================================
// 粒子效果
// ========================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 隨機位置
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // 隨機大小
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // 隨機動畫延遲
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ========================================
// 載入動畫
// ========================================
window.addEventListener('load', () => {
    // 為所有卡片添加進入動畫
    const cards = document.querySelectorAll('.chart-card-full');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ========================================
// 圖片載入錯誤處理
// ========================================
document.querySelectorAll('.gamepad-image').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('手把圖片載入失敗，使用替代圖片');
        this.src = 'https://via.placeholder.com/150/66c0f4/ffffff?text=Gamepad';
    });
});

// ========================================
// MongoDB Charts SDK 初始化
// ========================================

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


// 監聽輪播切換到第一張時觸發動畫
const originalUpdateCarousel = updateCarousel;
updateCarousel = function(index) {
    originalUpdateCarousel(index);

    // 如果切換到第一張 slide，重置並觸發動畫
    if (index === 0) {
        const numberElement = document.querySelector('.carousel-slide:first-child .animated-number');
        if (numberElement) {
            numberElement.classList.remove('counted');
            numberElement.textContent = '0';
            triggerChart1Animation();
        }
    }
};

// ========================================
// 控制台訊息
// ========================================
// console.log('%c🎮 Steam Game Analytics Dashboard 🎮', 'font-size: 20px; font-weight: bold; color: #66c0f4; text-shadow: 0 0 10px #66c0f4;');
// console.log('%cPowered by MongoDB Charts', 'font-size: 14px; color: #c7d5e0;');
// console.log('%c使用左右方向鍵切換圖表 | 上下滾動切換頁面', 'font-size: 12px; color: #66c0f4; font-style: italic;');


