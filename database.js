// === ZenInk 智能阅卷系统 - 数据库管理模块 ===
// 超现代化数据库管理功能，支持本地存储和云端数据库

class DatabaseManager {
    constructor() {
        this.currentMode = 'local'; // local, hybrid, cloud
        this.isOnline = navigator.onLine;
        this.cloudConfig = this.loadCloudConfig();
        this.syncQueue = [];
        this.retryCount = 3;
        this.connectionTimeout = 30000;

        this.init();
    }

    async init() {
        try {
            // 初始化事件监听器
            this.setupEventListeners();

            // 检查网络状态
            this.checkNetworkStatus();

            // 更新UI状态
            this.updateConnectionStatus();

            // 加载保存的设置
            this.loadSettings();

            // 自动连接（如果启用）
            const autoConnect = localStorage.getItem('auto-connect') !== 'false';
            if (autoConnect && this.cloudConfig.url) {
                await this.testConnection();
            }

            // 启动同步检查
            this.startSyncMonitor();

            console.log('数据库管理器初始化完成');
            this.addSyncLog('系统初始化完成', 'success');

        } catch (error) {
            console.error('数据库管理器初始化失败:', error);
            this.addSyncLog('初始化失败: ' + error.message, 'error');
        }
    }

    setupEventListeners() {
        // 监听网络状态变化
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.updateConnectionStatus();
            this.addSyncLog('网络连接已恢复', 'success');
            this.processSyncQueue();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.updateConnectionStatus();
            this.addSyncLog('网络连接已断开', 'error');
        });

        // 数据库模式切换
        document.querySelectorAll('input[name="db-mode"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.switchDatabaseMode(e.target.value);
            });
        });

        // 云端配置显示/隐藏
        this.toggleCloudConfig();
    }

    checkNetworkStatus() {
        this.isOnline = navigator.onLine;

        // 使用Image对象检测真实网络连通性
        const img = new Image();
        img.onload = () => {
            this.isOnline = true;
            this.updateConnectionStatus();
        };
        img.onerror = () => {
            this.isOnline = false;
            this.updateConnectionStatus();
        };
        img.src = 'https://httpbin.org/status/200?' + new Date().getTime();
    }

    updateConnectionStatus() {
        const localStatus = document.getElementById('local-status');
        const onlineStatus = document.getElementById('online-status');
        const statusIndicator = document.getElementById('status-indicator');
        const statusText = document.getElementById('status-text');
        const cloudStatusText = document.getElementById('cloud-status-text');
        const cloudIndicator = document.getElementById('cloud-indicator');

        // 更新本地存储状态
        if (localStatus) {
            const localCount = this.getLocalDataCount();
            document.getElementById('local-count').textContent = `${localCount} 条记录`;
        }

        // 更新云端状态
        if (this.isOnline && this.cloudConfig.url) {
            cloudStatusText.textContent = '已连接';
            cloudIndicator.className = 'status-indicator active';
            statusText.textContent = this.currentMode === 'cloud' ? '云端存储' : '本地存储';
            statusIndicator.className = 'status-indicator';
            if (!statusIndicator.classList.contains('offline')) {
                statusIndicator.classList.add('active');
            }
        } else {
            cloudStatusText.textContent = this.isOnline ? '未配置' : '离线';
            cloudIndicator.className = 'status-indicator offline';
            statusText.textContent = '本地存储';
            statusIndicator.className = 'status-indicator offline';
        }

        this.updateDataStatistics();
    }

    switchDatabaseMode(mode) {
        this.currentMode = mode;
        localStorage.setItem('database-mode', mode);

        // 更新模式描述
        const descriptions = {
            local: '本地存储：数据保存在浏览器本地，无需网络连接',
            hybrid: '混合模式：优先使用本地存储，定期同步到云端',
            cloud: '云端存储：数据实时保存到云端数据库，需要网络连接'
        };

        document.getElementById('mode-description').innerHTML =
            `<small class="text-muted">${descriptions[mode]}</small>`;

        // 显示/隐藏云端配置
        this.toggleCloudConfig();

        this.addSyncLog(`切换到${mode === 'local' ? '本地' : mode === 'hybrid' ? '混合' : '云端'}模式`, 'success');
    }

    toggleCloudConfig() {
        const cloudConfig = document.getElementById('cloud-config');
        const currentMode = document.querySelector('input[name="db-mode"]:checked')?.value || 'local';

        if (cloudConfig) {
            cloudConfig.style.display = (currentMode === 'hybrid' || currentMode === 'cloud') ? 'block' : 'none';
        }
    }

    loadCloudConfig() {
        const saved = localStorage.getItem('cloud-config');
        return saved ? JSON.parse(saved) : {
            type: 'firebase',
            url: '',
            apiKey: '',
            dbName: 'zenink_grading'
        };
    }

    saveCloudConfig() {
        const config = {
            type: document.getElementById('db-type').value,
            url: document.getElementById('db-url').value,
            apiKey: document.getElementById('api-key').value,
            dbName: document.getElementById('db-name').value
        };

        if (!config.url || !config.apiKey) {
            this.showNotification('请填写完整的连接信息', 'warning');
            return;
        }

        this.cloudConfig = config;
        localStorage.setItem('cloud-config', JSON.stringify(config));

        this.showNotification('云端配置已保存', 'success');
        this.addSyncLog('云端配置已更新', 'success');
    }

    async testConnection() {
        const btn = event?.target;
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>测试中...';
        }

        try {
            if (!this.cloudConfig.url || !this.cloudConfig.apiKey) {
                throw new Error('请先配置云端数据库连接信息');
            }

            // 模拟连接测试（实际项目中应该调用真实API）
            await this.simulateCloudRequest('test', null);

            this.showNotification('连接测试成功！', 'success');
            this.addSyncLog('云端连接测试成功', 'success');
            this.updateConnectionStatus();

        } catch (error) {
            this.showNotification('连接测试失败: ' + error.message, 'error');
            this.addSyncLog('连接测试失败: ' + error.message, 'error');
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-plug me-1"></i>测试连接';
            }
        }
    }

    async simulateCloudRequest(action, data) {
        // 模拟云端API请求（实际项目中替换为真实API调用）
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.isOnline && this.cloudConfig.url) {
                    resolve({ success: true, data: data });
                } else {
                    reject(new Error('网络连接失败或配置无效'));
                }
            }, 1000 + Math.random() * 2000);
        });
    }

    async saveData(key, data) {
        const timestamp = new Date().toISOString();
        const record = { ...data, _timestamp: timestamp, _id: generateId() };

        try {
            // 始终保存到本地存储
            this.saveToLocal(key, record);

            // 根据模式决定是否同步到云端
            if (this.currentMode === 'cloud' || this.currentMode === 'hybrid') {
                if (this.isOnline) {
                    await this.saveToCloud(key, record);
                } else {
                    this.addToSyncQueue('save', key, record);
                    this.addSyncLog('数据已加入同步队列', 'warning');
                }
            }

            this.updateDataStatistics();
            return record;

        } catch (error) {
            console.error('数据保存失败:', error);

            // 如果云端保存失败，至少保证本地有数据
            this.saveToLocal(key, record);
            this.addSyncLog('数据保存失败，已保存到本地', 'error');

            if (this.currentMode === 'cloud') {
                this.addToSyncQueue('save', key, record);
            }

            throw error;
        }
    }

    saveToLocal(key, data) {
        try {
            const existing = JSON.parse(localStorage.getItem(key) || '[]');
            const index = existing.findIndex(item => item._id === data._id);

            if (index >= 0) {
                existing[index] = data;
            } else {
                existing.push(data);
            }

            localStorage.setItem(key, JSON.stringify(existing));
            return true;
        } catch (error) {
            console.error('本地保存失败:', error);
            throw new Error('本地存储空间不足或数据格式错误');
        }
    }

    async saveToCloud(key, data) {
        try {
            await this.simulateCloudRequest('save', { key, data });
            this.addSyncLog('数据已同步到云端', 'success');
            return true;
        } catch (error) {
            console.error('云端保存失败:', error);
            throw error;
        }
    }

    loadData(key) {
        try {
            if (this.currentMode === 'cloud' && this.isOnline) {
                // 云端模式下从云端加载（实际项目中实现）
                return this.loadFromLocal(key);
            } else {
                return this.loadFromLocal(key);
            }
        } catch (error) {
            console.error('数据加载失败:', error);
            return [];
        }
    }

    loadFromLocal(key) {
        try {
            return JSON.parse(localStorage.getItem(key) || '[]');
        } catch (error) {
            console.error('本地数据加载失败:', error);
            return [];
        }
    }

    addToSyncQueue(action, key, data) {
        this.syncQueue.push({
            action,
            key,
            data,
            timestamp: new Date().toISOString(),
            retries: 0
        });

        // 限制队列大小
        if (this.syncQueue.length > 100) {
            this.syncQueue = this.syncQueue.slice(-50);
        }
    }

    async processSyncQueue() {
        if (!this.isOnline || this.syncQueue.length === 0) return;

        const itemsToProcess = [...this.syncQueue];
        this.syncQueue = [];

        for (const item of itemsToProcess) {
            try {
                await this.simulateCloudRequest(item.action, item);
                this.addSyncLog(`同步成功: ${item.key}`, 'success');
            } catch (error) {
                item.retries++;

                if (item.retries < this.retryCount) {
                    this.syncQueue.push(item);
                    this.addSyncLog(`同步重试: ${item.key} (${item.retries}/${this.retryCount})`, 'warning');
                } else {
                    this.addSyncLog(`同步失败: ${item.key}`, 'error');
                }
            }
        }
    }

    startSyncMonitor() {
        const autoSync = localStorage.getItem('auto-sync') === 'true';
        if (!autoSync) return;

        const interval = parseInt(localStorage.getItem('sync-interval') || '3600') * 1000;

        setInterval(() => {
            if (this.isOnline && this.syncQueue.length > 0) {
                this.processSyncQueue();
            }
        }, interval);
    }

    exportData() {
        try {
            const allData = {
                examConfigs: this.loadData('examConfigs'),
                scores: this.loadData('scores'),
                students: this.loadData('students'),
                settings: this.getSettings(),
                exportTime: new Date().toISOString(),
                version: '2.0'
            };

            const dataStr = JSON.stringify(allData, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `zenink-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.showNotification('数据导出成功', 'success');
            this.addSyncLog('数据已导出到文件', 'success');

        } catch (error) {
            console.error('数据导出失败:', error);
            this.showNotification('数据导出失败: ' + error.message, 'error');
        }
    }

    importData() {
        const modal = new bootstrap.Modal(document.getElementById('dataImportModal'));
        modal.show();

        this.setupImportHandlers();
    }

    setupImportHandlers() {
        const fileInput = document.getElementById('import-file');
        const uploadArea = document.getElementById('file-upload-area');
        const uploadLink = uploadArea.querySelector('.upload-link');

        // 文件选择
        uploadLink.addEventListener('click', () => fileInput.click());

        // 拖拽上传
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileUpload(files[0]);
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleFileUpload(e.target.files[0]);
            }
        });
    }

    async handleFileUpload(file) {
        try {
            const text = await file.text();
            const data = JSON.parse(text);

            // 验证数据格式
            if (!data.examConfigs && !data.scores && !data.students) {
                throw new Error('无效的数据格式');
            }

            // 显示预览
            this.showImportPreview(data);

        } catch (error) {
            this.showNotification('文件读取失败: ' + error.message, 'error');
        }
    }

    showImportPreview(data) {
        const preview = document.getElementById('import-preview');
        const table = document.getElementById('preview-table');

        let html = '<thead><tr><th>数据类型</th><th>记录数</th><th>最后更新</th></tr></thead><tbody>';

        Object.keys(data).forEach(key => {
            if (Array.isArray(data[key])) {
                html += `<tr>
                    <td>${key}</td>
                    <td>${data[key].length}</td>
                    <td>${data[key][0]?._timestamp || '未知'}</td>
                </tr>`;
            }
        });

        html += '</tbody>';
        table.innerHTML = html;
        preview.style.display = 'block';

        document.getElementById('confirm-import').disabled = false;
        document.getElementById('confirm-import').dataset.importData = JSON.stringify(data);
    }

    async confirmImport() {
        try {
            const btn = document.getElementById('confirm-import');
            const data = JSON.parse(btn.dataset.importData);

            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>导入中...';

            // 导入数据
            for (const [key, value] of Object.entries(data)) {
                if (Array.isArray(value) && value.length > 0) {
                    localStorage.setItem(key, JSON.stringify(value));
                }
            }

            this.showNotification('数据导入成功', 'success');
            this.addSyncLog('数据已从文件导入', 'success');
            this.updateDataStatistics();

            // 关闭模态框
            bootstrap.Modal.getInstance(document.getElementById('dataImportModal')).hide();

        } catch (error) {
            this.showNotification('数据导入失败: ' + error.message, 'error');
        } finally {
            const btn = document.getElementById('confirm-import');
            btn.disabled = false;
            btn.innerHTML = '导入数据';
        }
    }

    backupData() {
        const confirm = window.confirm('确定要创建数据备份吗？这将导出所有数据到文件。');
        if (confirm) {
            this.exportData();
        }
    }

    clearAllData() {
        const confirm = window.confirm('警告：此操作将清除所有数据，包括考试配置、成绩记录等。此操作不可撤销，确定继续吗？');
        if (!confirm) return;

        const doubleConfirm = window.confirm('最后确认：真的要删除所有数据吗？');
        if (!doubleConfirm) return;

        try {
            // 清除所有相关数据
            const keys = ['examConfigs', 'scores', 'students', 'recentSearches'];
            keys.forEach(key => localStorage.removeItem(key));

            this.showNotification('所有数据已清除', 'success');
            this.addSyncLog('所有数据已清除', 'success');
            this.updateDataStatistics();

            // 刷新页面状态
            setTimeout(() => location.reload(), 1000);

        } catch (error) {
            this.showNotification('数据清除失败: ' + error.message, 'error');
        }
    }

    getLocalDataCount() {
        try {
            const configs = JSON.parse(localStorage.getItem('examConfigs') || '[]');
            const scores = JSON.parse(localStorage.getItem('scores') || '[]');
            const students = JSON.parse(localStorage.getItem('students') || '[]');

            return configs.length + scores.length + students.length;
        } catch {
            return 0;
        }
    }

    getDataSize() {
        try {
            let total = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    total += localStorage[key].length;
                }
            }

            if (total < 1024) return total + 'B';
            if (total < 1024 * 1024) return Math.round(total / 1024) + 'KB';
            return Math.round(total / (1024 * 1024)) + 'MB';
        } catch {
            return '0KB';
        }
    }

    updateDataStatistics() {
        const totalStudents = document.getElementById('total-students');
        const totalExams = document.getElementById('total-exams');
        const dataSize = document.getElementById('data-size');

        if (totalStudents) {
            const students = JSON.parse(localStorage.getItem('students') || '[]');
            totalStudents.textContent = students.length;
        }

        if (totalExams) {
            const configs = JSON.parse(localStorage.getItem('examConfigs') || '[]');
            totalExams.textContent = configs.length;
        }

        if (dataSize) {
            dataSize.textContent = this.getDataSize();
        }
    }

    addSyncLog(message, type = 'info') {
        const logContainer = document.getElementById('sync-log');
        if (!logContainer) return;

        const logItem = document.createElement('div');
        logItem.className = 'log-item';

        const now = new Date();
        const timeStr = now.toLocaleTimeString();

        logItem.innerHTML = `
            <div class="log-time">${timeStr}</div>
            <div class="log-message">${message}</div>
            <div class="log-status ${type}">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i>
            </div>
        `;

        logContainer.insertBefore(logItem, logContainer.firstChild);

        // 限制日志数量
        const logs = logContainer.children;
        while (logs.length > 10) {
            logContainer.removeChild(logs[logs.length - 1]);
        }
    }

    showNotification(message, type = 'info') {
        const toast = document.getElementById('notification-toast');
        const title = document.getElementById('toast-title');
        const body = document.getElementById('toast-message');
        const icon = toast.querySelector('.toast-icon i');

        const types = {
            success: { icon: 'check-circle', class: 'text-success', title: '成功' },
            error: { icon: 'exclamation-circle', class: 'text-danger', title: '错误' },
            warning: { icon: 'exclamation-triangle', class: 'text-warning', title: '警告' },
            info: { icon: 'info-circle', class: 'text-info', title: '信息' }
        };

        const config = types[type] || types.info;

        icon.className = `fas fa-${config.icon} ${config.class}`;
        title.textContent = config.title;
        body.textContent = message;

        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    }

    loadSettings() {
        // 加载数据库模式
        const savedMode = localStorage.getItem('database-mode') || 'local';
        document.querySelector(`input[value="${savedMode}"]`).checked = true;
        this.currentMode = savedMode;

        // 加载云端配置
        if (this.cloudConfig.type) {
            document.getElementById('db-type').value = this.cloudConfig.type;
        }
        if (this.cloudConfig.url) {
            document.getElementById('db-url').value = this.cloudConfig.url;
        }
        if (this.cloudConfig.dbName) {
            document.getElementById('db-name').value = this.cloudConfig.dbName;
        }

        this.switchDatabaseMode(savedMode);
    }

    getSettings() {
        return {
            databaseMode: this.currentMode,
            cloudConfig: this.cloudConfig,
            autoConnect: localStorage.getItem('auto-connect'),
            autoSync: localStorage.getItem('auto-sync'),
            syncInterval: localStorage.getItem('sync-interval'),
            autoBackup: localStorage.getItem('auto-backup'),
            backupFrequency: localStorage.getItem('backup-frequency')
        };
    }

    async syncDatabase() {
        const btn = document.getElementById('sync-btn');
        if (btn.disabled) return;

        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>同步中...';

        try {
            if (!this.isOnline) {
                throw new Error('网络连接不可用');
            }

            if (this.currentMode === 'local') {
                throw new Error('本地模式不支持同步');
            }

            await this.processSyncQueue();

            this.showNotification('数据同步完成', 'success');
            this.addSyncLog('手动同步完成', 'success');

        } catch (error) {
            this.showNotification('同步失败: ' + error.message, 'error');
            this.addSyncLog('手动同步失败: ' + error.message, 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-sync-alt me-1"></i>同步数据';
        }
    }
}

// 全局函数，供HTML调用
function showDatabaseSettings() {
    const modal = new bootstrap.Modal(document.getElementById('databaseSettingsModal'));
    modal.show();
}

function saveDatabaseSettings() {
    try {
        // 保存连接设置
        const autoConnect = document.getElementById('auto-connect').checked;
        const connectionTimeout = document.getElementById('connection-timeout').value;
        const retryCount = document.getElementById('retry-count').value;

        localStorage.setItem('auto-connect', autoConnect);
        localStorage.setItem('connection-timeout', connectionTimeout);
        localStorage.setItem('retry-count', retryCount);

        // 保存同步设置
        const autoSync = document.getElementById('auto-sync').checked;
        const syncInterval = document.getElementById('sync-interval').value;
        const conflictResolution = document.getElementById('conflict-resolution').value;

        localStorage.setItem('auto-sync', autoSync);
        localStorage.setItem('sync-interval', syncInterval);
        localStorage.setItem('conflict-resolution', conflictResolution);

        // 保存备份设置
        const autoBackup = document.getElementById('auto-backup').checked;
        const backupFrequency = document.getElementById('backup-frequency').value;
        const backupCount = document.getElementById('backup-count').value;

        localStorage.setItem('auto-backup', autoBackup);
        localStorage.setItem('backup-frequency', backupFrequency);
        localStorage.setItem('backup-count', backupCount);

        // 更新数据库管理器配置
        if (window.dbManager) {
            window.dbManager.retryCount = parseInt(retryCount);
            window.dbManager.connectionTimeout = parseInt(connectionTimeout) * 1000;
        }

        // 关闭模态框
        bootstrap.Modal.getInstance(document.getElementById('databaseSettingsModal')).hide();

        // 显示成功消息
        if (window.dbManager) {
            window.dbManager.showNotification('设置已保存', 'success');
            window.dbManager.addSyncLog('系统设置已更新', 'success');
        }

    } catch (error) {
        console.error('保存设置失败:', error);
        if (window.dbManager) {
            window.dbManager.showNotification('设置保存失败: ' + error.message, 'error');
        }
    }
}

function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

function testConnection() {
    if (window.dbManager) {
        window.dbManager.testConnection();
    }
}

function saveCloudConfig() {
    if (window.dbManager) {
        window.dbManager.saveCloudConfig();
    }
}

function syncDatabase() {
    if (window.dbManager) {
        window.dbManager.syncDatabase();
    }
}

function exportData() {
    if (window.dbManager) {
        window.dbManager.exportData();
    }
}

function importData() {
    if (window.dbManager) {
        window.dbManager.importData();
    }
}

function backupData() {
    if (window.dbManager) {
        window.dbManager.backupData();
    }
}

function clearAllData() {
    if (window.dbManager) {
        window.dbManager.clearAllData();
    }
}

function confirmImport() {
    if (window.dbManager) {
        window.dbManager.confirmImport();
    }
}

// 生成唯一ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 页面加载完成后初始化数据库管理器
document.addEventListener('DOMContentLoaded', () => {
    // 隐藏页面加载器
    setTimeout(() => {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }, 1500);

    // 初始化数据库管理器
    window.dbManager = new DatabaseManager();
});
