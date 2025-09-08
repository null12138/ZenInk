// ZenInk 智能阅卷系统 - Service Worker
// 提供离线支持和缓存功能

const CACHE_NAME = 'zenink-v2.0.0';
const STATIC_CACHE = 'zenink-static-v2.0.0';
const DYNAMIC_CACHE = 'zenink-dynamic-v2.0.0';

// 需要缓存的静态资源
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/database.js',
    '/demo.js',
    '/manifest.json',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

// 安装事件 - 缓存静态资源
self.addEventListener('install', event => {
    console.log('SW: Service Worker Installing...');

    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('SW: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('SW: Static assets cached successfully');
                // 强制激活新的 Service Worker
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('SW: Failed to cache static assets:', error);
            })
    );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', event => {
    console.log('SW: Service Worker Activating...');

    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        // 删除不是当前版本的缓存
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('SW: Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('SW: Service Worker activated');
                // 立即控制所有页面
                return self.clients.claim();
            })
    );
});

// 获取事件 - 缓存策略
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // 跳过非 HTTP(S) 请求
    if (!request.url.startsWith('http')) {
        return;
    }

    // 跳过 Chrome Extension 请求
    if (url.protocol === 'chrome-extension:') {
        return;
    }

    event.respondWith(
        handleFetch(request)
    );
});

// 处理网络请求的主要函数
async function handleFetch(request) {
    const url = new URL(request.url);

    try {
        // 对于同源请求，使用 Cache First 策略
        if (url.origin === location.origin) {
            return await cacheFirst(request);
        }

        // 对于 CDN 资源，使用 Stale While Revalidate 策略
        if (isCDNResource(url)) {
            return await staleWhileRevalidate(request);
        }

        // 对于 API 请求，使用 Network First 策略
        if (isAPIRequest(url)) {
            return await networkFirst(request);
        }

        // 默认使用网络优先策略
        return await networkFirst(request);

    } catch (error) {
        console.error('SW: Fetch failed:', error);

        // 如果网络失败，尝试从缓存获取
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        // 如果缓存也没有，返回离线页面或默认响应
        return getOfflineResponse(request);
    }
}

// Cache First 策略 - 优先从缓存获取
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
        console.log('SW: Serving from cache:', request.url);
        return cachedResponse;
    }

    console.log('SW: Fetching from network:', request.url);
    const networkResponse = await fetch(request);

    // 缓存成功的响应
    if (networkResponse.ok) {
        const cache = await caches.open(DYNAMIC_CACHE);
        cache.put(request, networkResponse.clone());
    }

    return networkResponse;
}

// Network First 策略 - 优先从网络获取
async function networkFirst(request) {
    try {
        console.log('SW: Fetching from network:', request.url);
        const networkResponse = await fetch(request);

        // 缓存成功的响应
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;

    } catch (error) {
        console.log('SW: Network failed, trying cache:', request.url);
        const cachedResponse = await caches.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        throw error;
    }
}

// Stale While Revalidate 策略 - 立即返回缓存，后台更新
async function staleWhileRevalidate(request) {
    const cachedResponse = await caches.match(request);

    // 后台更新缓存
    const fetchPromise = fetch(request).then(response => {
        if (response.ok) {
            const cache = caches.open(DYNAMIC_CACHE);
            cache.then(c => c.put(request, response.clone()));
        }
        return response;
    });

    // 如果有缓存，立即返回缓存，否则等待网络请求
    if (cachedResponse) {
        console.log('SW: Serving stale from cache:', request.url);
        return cachedResponse;
    }

    console.log('SW: No cache, waiting for network:', request.url);
    return fetchPromise;
}

// 判断是否为 CDN 资源
function isCDNResource(url) {
    const cdnDomains = [
        'cdn.jsdelivr.net',
        'cdnjs.cloudflare.com',
        'fonts.googleapis.com',
        'fonts.gstatic.com'
    ];

    return cdnDomains.some(domain => url.hostname.includes(domain));
}

// 判断是否为 API 请求
function isAPIRequest(url) {
    return url.pathname.startsWith('/api/') ||
        url.hostname !== location.hostname;
}

// 获取离线响应
function getOfflineResponse(request) {
    // 如果是页面请求，返回离线页面
    if (request.mode === 'navigate') {
        return caches.match('/index.html');
    }

    // 如果是图片请求，返回默认图片
    if (request.destination === 'image') {
        return new Response(
            '<svg width="200" height="150" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f8f9fa"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6c757d">离线模式</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
        );
    }

    // 其他请求返回网络错误
    return new Response(
        JSON.stringify({
            error: '网络连接不可用',
            offline: true,
            timestamp: new Date().toISOString()
        }),
        {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'application/json' }
        }
    );
}

// 消息事件 - 处理来自主线程的消息
self.addEventListener('message', event => {
    const { type, payload } = event.data;

    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;

        case 'GET_VERSION':
            event.ports[0].postMessage({ version: CACHE_NAME });
            break;

        case 'CLEAN_CACHE':
            cleanCache().then(() => {
                event.ports[0].postMessage({ success: true });
            });
            break;

        case 'UPDATE_CACHE':
            updateCache(payload).then(() => {
                event.ports[0].postMessage({ success: true });
            });
            break;

        default:
            console.log('SW: Unknown message type:', type);
    }
});

// 清理缓存
async function cleanCache() {
    console.log('SW: Cleaning dynamic cache');
    const cache = await caches.open(DYNAMIC_CACHE);
    const keys = await cache.keys();

    // 删除过期的缓存项（7天前的）
    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);

    for (const request of keys) {
        const response = await cache.match(request);
        const dateHeader = response.headers.get('date');

        if (dateHeader) {
            const responseDate = new Date(dateHeader).getTime();
            if (responseDate < oneWeekAgo) {
                console.log('SW: Deleting expired cache:', request.url);
                await cache.delete(request);
            }
        }
    }
}

// 更新缓存
async function updateCache(urls = []) {
    console.log('SW: Updating cache with new URLs');
    const cache = await caches.open(STATIC_CACHE);

    for (const url of urls) {
        try {
            await cache.add(url);
            console.log('SW: Added to cache:', url);
        } catch (error) {
            console.error('SW: Failed to cache:', url, error);
        }
    }
}

// 推送通知事件
self.addEventListener('push', event => {
    console.log('SW: Push received');

    if (!event.data) {
        return;
    }

    const data = event.data.json();
    const options = {
        body: data.body || '您有新的消息',
        icon: '/manifest-icon-192.png',
        badge: '/manifest-icon-96.png',
        vibrate: [200, 100, 200],
        data: data.data || {},
        actions: [
            {
                action: 'open',
                title: '查看',
                icon: '/icons/view.png'
            },
            {
                action: 'close',
                title: '关闭',
                icon: '/icons/close.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(
            data.title || 'ZenInk 通知',
            options
        )
    );
});

// 通知点击事件
self.addEventListener('notificationclick', event => {
    console.log('SW: Notification click received');

    event.notification.close();

    if (event.action === 'open') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// 后台同步事件
self.addEventListener('sync', event => {
    console.log('SW: Background sync:', event.tag);

    if (event.tag === 'background-data-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

// 执行后台同步
async function doBackgroundSync() {
    try {
        console.log('SW: Performing background sync');

        // 这里可以添加后台同步逻辑
        // 例如：同步离线时保存的数据到服务器

        // 向所有客户端发送同步完成消息
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'SYNC_COMPLETE',
                timestamp: new Date().toISOString()
            });
        });

    } catch (error) {
        console.error('SW: Background sync failed:', error);
    }
}

// 错误处理
self.addEventListener('error', event => {
    console.error('SW: Global error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
    console.error('SW: Unhandled promise rejection:', event.reason);
});

console.log('SW: Service Worker script loaded successfully');
