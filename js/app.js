/**
 * ZenInk 智能阅卷系统 - 入口文件
 * 
 * 此文件负责加载所有必要的模块和初始化应用程序
 * @version 2.0.0
 * @author ZenInk Team
 */

// 应用程序初始化
document.addEventListener('DOMContentLoaded', function() {
    // 显示启动动画
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        pageLoader.style.display = 'flex';
    }
    
    // 动态加载CSS
    loadStylesheet('css/question-card.css');
    
    console.log('🎓 ZenInk 智能阅卷系统 v2.0.0 启动中...');
    
    // 初始化应用程序
    setTimeout(() => {
        try {
            initializeApp();
        } catch (error) {
            console.error('应用程序初始化失败:', error);
            showErrorScreen('应用程序初始化失败', error.message);
        }
    }, 1000);
});

/**
 * 加载CSS样式表
 */
function loadStylesheet(href) {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`无法加载样式表: ${href}`));
        
        document.head.appendChild(link);
    });
}

/**
 * 初始化应用程序
 */
function initializeApp() {
    // 加载保存的配置
    loadSavedData();

    // 默认显示试卷配置页面
    showSection('exam-config');

    // 添加默认题目
    if (questionCount === 0) {
        addQuestion();
    }

    // 初始化UI增强效果
    initializeUIEnhancements();

    // 初始化现代化功能
    initializeModernFeatures();
    
    // 设置事件监听器
    setupEventListeners();

    // 隐藏加载动画
    hidePageLoader();
    
    console.log('✅ 系统初始化完成');
}

/**
 * 隐藏页面加载器
 */
function hidePageLoader() {
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        pageLoader.classList.add('hidden');
        setTimeout(() => {
            pageLoader.style.display = 'none';
        }, 500);
    }
}

/**
 * 显示错误屏幕
 */
function showErrorScreen(title, message) {
    const errorScreen = document.createElement('div');
    errorScreen.className = 'error-screen';
    errorScreen.innerHTML = `
        <div class="error-content">
            <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h2 class="error-title">${title}</h2>
            <p class="error-message">${message}</p>
            <button class="btn btn-primary" onclick="location.reload()">
                <i class="fas fa-redo"></i> 重新加载
            </button>
        </div>
    `;
    
    document.body.appendChild(errorScreen);
    
    // 隐藏加载器
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        pageLoader.style.display = 'none';
    }
}

/**
 * 设置事件监听器
 */
function setupEventListeners() {
    // 全局错误处理
    window.addEventListener('error', (event) => {
        console.error('全局错误:', event.error);
    });
    
    // 在线/离线状态
    window.addEventListener('online', () => {
        showNotification('网络连接已恢复', 'success');
    });
    
    window.addEventListener('offline', () => {
        showNotification('网络连接已断开', 'warning');
    });
}

/**
 * 显示通知
 */
function showNotification(message, type = 'info') {
    const notificationContainer = document.querySelector('.notification-container') || 
                                  createNotificationContainer();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} fade-in`;
    
    const icon = type === 'success' ? 'check-circle' : 
                type === 'warning' ? 'exclamation-triangle' : 
                type === 'error' ? 'exclamation-circle' : 'info-circle';
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas fa-${icon}"></i>
        </div>
        <div class="notification-content">
            <p>${message}</p>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notificationContainer.appendChild(notification);
    
    // 自动移除
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

/**
 * 创建通知容器
 */
function createNotificationContainer() {
    const container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
    return container;
}
