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

export { cursor, cursorDot };
