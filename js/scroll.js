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

export { scrollToSection };
