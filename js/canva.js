// ========================================
// Canva Presentation Modal
// ========================================
import { cursor, cursorDot } from './cursor.js';

const canvaBtn = document.getElementById('canvaBtn');
const canvaModal = document.getElementById('canvaModal');
const closeCanvaBtn = document.getElementById('closeCanvaBtn');

// 開啟模態視窗
if (canvaBtn) {
    canvaBtn.addEventListener('click', () => {
        if (canvaModal) {
            canvaModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // 防止背景滾動
        }
    });
}

// 關閉模態視窗
function closeCanvaModal() {
    if (canvaModal) {
        canvaModal.classList.remove('active');
        document.body.style.overflow = ''; // 恢復滾動
    }
}

// 點擊關閉按鈕
if (closeCanvaBtn) {
    closeCanvaBtn.addEventListener('click', closeCanvaModal);
}

// 點擊模態視窗背景關閉
if (canvaModal) {
    canvaModal.addEventListener('click', (e) => {
        if (e.target === canvaModal) {
            closeCanvaModal();
        }
    });
}

// 按 ESC 鍵關閉
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && canvaModal && canvaModal.classList.contains('active')) {
        closeCanvaModal();
    }
});

// 為 Canva 按鈕添加游標效果
if (canvaBtn) {
    canvaBtn.addEventListener('mouseenter', () => {
        if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        if (cursor) cursor.style.borderColor = '#4a9fd4';
        if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });

    canvaBtn.addEventListener('mouseleave', () => {
        if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        if (cursor) cursor.style.borderColor = '#66c0f4';
        if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// 為關閉按鈕添加游標效果
if (closeCanvaBtn) {
    closeCanvaBtn.addEventListener('mouseenter', () => {
        if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        if (cursor) cursor.style.borderColor = '#ff3b3b';
        if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });

    closeCanvaBtn.addEventListener('mouseleave', () => {
        if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        if (cursor) cursor.style.borderColor = '#66c0f4';
        if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

export { closeCanvaModal };
