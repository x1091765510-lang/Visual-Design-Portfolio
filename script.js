// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initHamburgerMenu();
    initPortfolioFilter();
    initSmoothScroll();
    initNavbarScroll();
    initFormSubmission();
    initScrollAnimations();
});

// 汉堡菜单功能
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击导航链接后关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// 作品集筛选功能
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // 筛选函数
    function filterItems(filterValue) {
        portfolioItems.forEach(item => {
            if (item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                // 添加动画效果
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                // 使用setTimeout确保动画效果可见
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // 初始化：默认显示当前激活按钮对应的分类
    const activeBtn = document.querySelector('.filter-btn.active');
    if (activeBtn) {
        filterItems(activeBtn.getAttribute('data-filter'));
    }

    // 按钮点击事件
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新活动状态
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            filterItems(filterValue);
        });
    });
}

// 平滑滚动功能
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// 表单提交处理
function initFormSubmission() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单的表单验证
            const name = this.elements.name.value.trim();
            const email = this.elements.email.value.trim();
            const message = this.elements.message.value.trim();
            
            if (!name || !email || !message) {
                alert('请填写所有必填字段！');
                return;
            }
            
            // 简单的邮箱格式验证
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('请输入有效的邮箱地址！');
                return;
            }
            
            // 模拟表单提交
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;
            
            // 模拟异步请求
            setTimeout(() => {
                alert('消息发送成功！我们会尽快与您联系。');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// 滚动动画效果
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.about-text, .about-image, .skill-item, .contact-info, .contact-form');
    
    // 观察器配置
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // 观察器回调函数
    const observerCallback = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };
    
    // 创建观察器
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // 观察所有动画元素
    animatedElements.forEach(element => {
        // 初始状态
        element.style.opacity = '0';
        if (element.classList.contains('about-text') || element.classList.contains('contact-info')) {
            element.style.transform = 'translateX(-30px)';
        } else if (element.classList.contains('about-image') || element.classList.contains('contact-form')) {
            element.style.transform = 'translateX(30px)';
        } else {
            element.style.transform = 'translateY(30px)';
        }
        
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(element);
    });
}

// 作品集项目悬停效果增强
function initPortfolioHoverEffects() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 技能卡片悬停效果增强
function initSkillHoverEffects() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'scale(1.15) rotate(10deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// 滚动进度指示器
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 页面加载完成后初始化额外效果
window.addEventListener('load', function() {
    initPortfolioHoverEffects();
    initSkillHoverEffects();
    initScrollProgress();
    
    // 页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 阻止右键菜单（可选，保护作品）
/*
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
*/

// 键盘快捷键支持
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + ArrowDown: 向下滚动一页
        if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowDown') {
            e.preventDefault();
            window.scrollBy(0, window.innerHeight);
        }
        
        // Ctrl/Cmd + ArrowUp: 向上滚动一页
        if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowUp') {
            e.preventDefault();
            window.scrollBy(0, -window.innerHeight);
        }
        
        // Escape: 关闭菜单
        if (e.key === 'Escape') {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
}

// 初始化键盘快捷键
initKeyboardShortcuts();