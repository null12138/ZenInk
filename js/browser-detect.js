/**
 * 浏览器功能检测
 */
(function() {
    // 检查现代化浏览器特性
    window.isModernBrowser = (
        'Promise' in window &&
        'fetch' in window &&
        'Symbol' in window &&
        'IntersectionObserver' in window &&
        'localStorage' in window
    );
    
    // 设置额外浏览器信息
    window.browserInfo = {
        isModern: window.isModernBrowser,
        supportsModules: 'noModule' in HTMLScriptElement.prototype,
        supportsPWA: 'serviceWorker' in navigator
    };
    
    // 如果是旧浏览器，显示警告
    if (!window.isModernBrowser) {
        console.warn('检测到旧版浏览器，某些功能可能不可用');
        
        // 加载旧浏览器兼容脚本
        if (!('IntersectionObserver' in window)) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/intersection-observer@0.12.2/intersection-observer.js';
            document.head.appendChild(script);
        }
    }
})();
