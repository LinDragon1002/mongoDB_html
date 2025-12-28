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
    img.addEventListener('error', function () {
        console.warn('手把圖片載入失敗，使用替代圖片');
        this.src = 'https://via.placeholder.com/150/66c0f4/ffffff?text=Gamepad';
    });
});

export { createParticles };
