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

export { navbar, isSidebarCollapsed };
