// ========================================
// 輪播功能
// ========================================
import { navbar } from './navbar.js';

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

export { updateCarousel, currentSlide };
