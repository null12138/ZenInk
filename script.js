// 现代化 ZenInk 智能登分系统 - 2024版本
// 全局变量
let currentExam = null;
let studentsData = [];
let questionCount = 0;
let isLoading = false;
let autosaveTimer = null;

// 现代化页面初始化
document.addEventListener('DOMContentLoaded', function () {
    console.log('🎓 ZenInk 智能登分系统启动中...');

    // 显示启动动画
    showLoadingOverlay();

    // 模拟系统初始化
    setTimeout(() => {
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

        // 隐藏加载动画
        hideLoadingOverlay();

        console.log('✅ 系统初始化完成');
    }, 1200);
});

// 现代化 UI 增强功能
function initializeUIEnhancements() {
    // 添加页面加载动画
    document.body.classList.add('fade-in');

    // 为所有按钮添加现代化点击效果
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn')) {
            addModernClickEffect(e.target);
        }
    });

    // 为表单输入添加现代化焦点效果
    const inputs = document.querySelectorAll('.form-control, .form-select');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('input-focused');
            addInputFocusEffect(this);
        });

        input.addEventListener('blur', function () {
            this.parentElement.classList.remove('input-focused');
        });

        // 添加输入验证视觉反馈
        input.addEventListener('input', function () {
            validateInput(this);
        });
    });

    // 初始化进度条动画
    updateConfigProgress();

    // 初始化导航栏滚动效果
    initializeNavbarEffects();

    // 初始化卡片悬浮效果
    initializeCardEffects();
}

// 现代化功能初始化
function initializeModernFeatures() {
    // 初始化自动保存
    initializeAutoSave();

    // 初始化快捷键
    initializeKeyboardShortcuts();

    // 初始化通知系统
    initializeNotificationSystem();

    // 初始化主题检测
    initializeThemeDetection();

    // 初始化性能监控
    initializePerformanceMonitoring();
}

// 现代化按钮点击效果
function addModernClickEffect(button) {
    button.style.transform = 'scale(0.95)';
    button.classList.add('loading');

    setTimeout(() => {
        button.style.transform = '';
        button.classList.remove('loading');
    }, 200);

    // 添加涟漪效果
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.height, rect.width);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.height / 2 - size / 2) + 'px';

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 输入焦点增强效果
function addInputFocusEffect(input) {
    input.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    input.style.transform = 'translateY(-2px) scale(1.01)';

    setTimeout(() => {
        input.style.transform = '';
    }, 300);
}

// 输入验证视觉反馈
function validateInput(input) {
    const value = input.value.trim();

    if (input.required && !value) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    } else if (value) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
    } else {
        input.classList.remove('is-invalid', 'is-valid');
    }

    // 触发进度更新
    updateConfigProgress();
}

// 导航栏滚动效果
function initializeNavbarEffects() {
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 添加滚动方向检测
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
}

// 卡片悬浮效果初始化
function initializeCardEffects() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.willChange = 'transform';
        });

        card.addEventListener('mouseleave', () => {
            card.style.willChange = 'auto';
        });
    });
}

// 加载覆盖层显示/隐藏
function showLoadingOverlay(message = '加载中...') {
    let overlay = document.getElementById('loading-overlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p class="loading-message mt-3">${message}</p>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hideLoadingOverlay() {
    // 隐藏页面加载器
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        pageLoader.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // 兼容旧的加载遮罩
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// 自动保存功能
function initializeAutoSave() {
    const form = document.getElementById('exam-form');
    if (form) {
        form.addEventListener('input', () => {
            clearTimeout(autosaveTimer);
            autosaveTimer = setTimeout(() => {
                autoSaveConfig();
            }, 2000);
        });
    }
}

function autoSaveConfig() {
    try {
        const formData = collectFormData();
        localStorage.setItem('autosave_config', JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString()
        }));

        showNotification('配置已自动保存', 'success', 2000);
    } catch (error) {
        console.warn('自动保存失败:', error);
    }
}

// 快捷键系统
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + S: 保存配置
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveExamConfig();
        }

        // Ctrl/Cmd + N: 添加题目
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            addQuestion();
        }

        // Ctrl/Cmd + E: 导出Excel
        if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
            e.preventDefault();
            exportToExcel();
        }

        // ESC: 关闭模态框
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                const bsModal = bootstrap.Modal.getInstance(modal);
                if (bsModal) bsModal.hide();
            });
        }
    });
}

// 通知系统
function initializeNotificationSystem() {
    // 创建通知容器
    if (!document.getElementById('notification-container')) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 400px;
        `;
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'info', duration = 4000) {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show notification-item`;
    notification.style.cssText = `
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border: none;
        border-radius: 8px;
        animation: slideInRight 0.3s ease-out;
    `;

    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${getNotificationIcon(type)} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;

    container.appendChild(notification);

    if (duration > 0) {
        setTimeout(() => {
            notification.classList.add('fade');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    }
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        danger: 'exclamation-triangle',
        warning: 'exclamation-circle',
        info: 'info-circle',
        primary: 'bell'
    };
    return icons[type] || 'info-circle';
}

// 主题检测
function initializeThemeDetection() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function handleThemeChange(e) {
        document.body.classList.toggle('dark-theme', e.matches);
        showNotification(`已切换到${e.matches ? '深色' : '浅色'}主题`, 'info', 2000);
    }

    prefersDark.addEventListener('change', handleThemeChange);
    handleThemeChange(prefersDark);
}

// 性能监控
function initializePerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`📊 页面加载时间: ${loadTime}ms`);

            if (loadTime > 3000) {
                console.warn('⚠️ 页面加载较慢，建议优化');
            }
        });
    }
}

// 表单数据收集
function collectFormData() {
    return {
        subject: document.getElementById('subject')?.value || '',
        examName: document.getElementById('exam-name')?.value || '',
        totalScore: document.getElementById('total-score')?.value || '',
        className: document.getElementById('class-name')?.value || '',
        questions: collectQuestionData()
    };
}

function collectQuestionData() {
    const questionCards = document.querySelectorAll('.question-card');
    return Array.from(questionCards).map(card => {
        return {
            type: card.querySelector('.question-type')?.value || '',
            count: parseInt(card.querySelector('.question-count')?.value) || 1,
            score: parseFloat(card.querySelector('.question-score')?.value) || 0,
            desc: card.querySelector('.question-desc')?.value || ''
        };
    });
}

// 更新配置进度
function updateConfigProgress() {
    const form = document.getElementById('exam-form');
    const totalFields = form.querySelectorAll('input, select').length;
    const filledFields = Array.from(form.querySelectorAll('input, select'))
        .filter(field => field.value.trim() !== '').length;

    const progress = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;

    const progressBar = document.getElementById('config-progress-bar');
    const progressBadge = document.getElementById('config-progress');

    if (progressBar && progressBadge) {
        progressBar.style.width = `${progress}%`;
        progressBadge.textContent = `${progress}%`;

        // 根据进度改变颜色
        if (progress < 30) {
            progressBadge.className = 'badge bg-danger';
        } else if (progress < 70) {
            progressBadge.className = 'badge bg-warning';
        } else {
            progressBadge.className = 'badge bg-success';
        }
    }
}

// 显示指定区域
function showSection(sectionName) {
    // 隐藏所有区域
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
    });

    // 显示指定区域（带动画效果）
    setTimeout(() => {
        const targetSection = document.getElementById(sectionName);
        targetSection.classList.add('active');
        targetSection.style.opacity = '1';
        targetSection.style.transform = 'translateY(0)';
    }, 150);

    // 更新导航栏
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    // 找到对应的导航链接
    const activeLink = Array.from(navLinks).find(link =>
        link.getAttribute('onclick')?.includes(sectionName)
    );
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // 根据区域执行相应初始化
    setTimeout(() => {
        switch (sectionName) {
            case 'exam-config':
                // 确保模板已加载到编辑表单
                if (currentExam && currentExam.questions) {
                    loadExamToEditForm();
                }
                updateConfigProgress();
                break;
            case 'scoring':
                initScoringSection();
                break;
            case 'statistics':
                updateStatistics();
                break;
        }
    }, 200);
}

// 添加题目
function addQuestion() {
    questionCount++;
    const container = document.getElementById('questions-container');

    const questionCard = document.createElement('div');
    questionCard.className = 'question-card modern-card fade-in';
    questionCard.setAttribute('data-question-id', questionCount);
    questionCard.innerHTML = `
        <div class="question-header" onclick="toggleQuestionCard(this)">
            <div class="d-flex align-items-center">
                <div class="question-number" aria-label="题号">${questionCount}</div>
                <div class="question-title">
                    <span class="fw-bold">第${questionCount}题</span>
                    <small class="question-summary text-muted"></small>
                </div>
                <div class="question-toggle-icon ms-auto">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            <div class="question-actions">
                <button class="btn btn-sm btn-outline-secondary" onclick="duplicateQuestion(this, event)" title="复制题目">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="removeQuestion(this, event)" title="删除题目">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        
        <div class="question-content">
            <div class="row">
                <div class="col-lg-6">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">题目类型</label>
                            <select class="form-control question-type" onchange="updateQuestionType(this)">
                                <option value="choice">选择题</option>
                                <option value="multiple">多选题</option>
                                <option value="blank">填空题</option>
                                <option value="short">简答题</option>
                                <option value="essay">大题/作文</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">题目数量</label>
                            <input type="number" class="form-control question-count" value="1" min="1" max="50" onchange="updateQuestionPreview(this)">
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">每题分数</label>
                            <input type="number" class="form-control question-score" value="5" min="0.5" step="0.5" onchange="updateQuestionPreview(this)">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">题目起始序号</label>
                            <input type="number" class="form-control question-start" value="1" min="1" onchange="updateQuestionPreview(this)">
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">题目描述（可选）</label>
                        <input type="text" class="form-control question-desc" placeholder="例：单选题、多选题等" onchange="updateQuestionPreview(this)">
                    </div>
                </div>
                
                <div class="col-lg-6">
                    <!-- 选择题特殊配置 -->
                    <div class="choice-config" style="display: block;">
                        <div class="mb-3">
                            <label class="form-label">选项设置</label>
                            <div class="choice-options">
                                <div class="row mb-2">
                                    <div class="col-md-6">
                                        <label class="form-label small">选项数量</label>
                                        <select class="form-control form-control-sm choice-count" onchange="updateChoiceOptions(this)">
                                            <option value="2">A-B (2个选项)</option>
                                            <option value="3">A-C (3个选项)</option>
                                            <option value="4" selected>A-D (4个选项)</option>
                                            <option value="5">A-E (5个选项)</option>
                                            <option value="6">A-F (6个选项)</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label small">评分方式</label>
                                        <select class="form-control form-control-sm choice-scoring">
                                            <option value="all">全对才得分</option>
                                            <option value="partial">部分分数</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="choice-answers">
                                    <label class="form-label small">答案设置 (选择题批量设置)</label>
                                    <div class="answer-pattern-buttons mb-2">
                                        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="setAnswerPattern(this, 'A')">全选A</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="setAnswerPattern(this, 'B')">全选B</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="setAnswerPattern(this, 'C')">全选C</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="setAnswerPattern(this, 'D')">全选D</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="setAnswerPattern(this, 'random')">随机</button>
                                        <button type="button" class="btn btn-sm btn-outline-primary" onclick="showAnswerDetail(this)">详细设置</button>
                                    </div>
                                    <div class="answer-preview">
                                        <small class="text-muted">答案预览：A A A A A...</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 题目统计信息 -->
                    <div class="question-stats">
                        <div class="stats-card">
                            <div class="stats-item">
                                <span class="stats-label">总题数</span>
                                <span class="stats-value question-total-count">1</span>
                            </div>
                            <div class="stats-item">
                                <span class="stats-label">小计分数</span>
                                <span class="stats-value question-total-score">5分</span>
                            </div>
                            <div class="stats-item">
                                <span class="stats-label">平均分</span>
                                <span class="stats-value question-avg-score">5分</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 添加折叠动画
    questionCard.style.opacity = '0';
    questionCard.style.transform = 'translateY(-20px)';
    container.appendChild(questionCard);

    // 触发动画
    setTimeout(() => {
        questionCard.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        questionCard.style.opacity = '1';
        questionCard.style.transform = 'translateY(0)';
    }, 10);

    updateQuestionPreview(questionCard);
    updatePreview();
}

// 删除题目
function removeQuestion(button, event) {
    if (event) event.stopPropagation();

    if (confirm('确定删除这个题目吗？')) {
        const questionCard = button.closest('.question-card');

        // 添加删除动画
        questionCard.style.transition = 'all 0.3s ease';
        questionCard.style.opacity = '0';
        questionCard.style.transform = 'translateX(-100%)';

        setTimeout(() => {
            questionCard.remove();
            renumberQuestions();
            updatePreview();
        }, 300);
    }
}

// 复制题目
function duplicateQuestion(button, event) {
    if (event) event.stopPropagation();

    const questionCard = button.closest('.question-card');
    const newQuestionCard = questionCard.cloneNode(true);

    // 更新新题目的编号
    questionCount++;
    newQuestionCard.setAttribute('data-question-id', questionCount);

    // 更新题目编号显示
    const questionNumber = newQuestionCard.querySelector('.question-number');
    const questionTitle = newQuestionCard.querySelector('.question-title span');
    questionNumber.textContent = questionCount;
    questionTitle.textContent = `第${questionCount}题`;

    // 插入到当前题目后面
    questionCard.insertAdjacentElement('afterend', newQuestionCard);

    // 添加出现动画
    newQuestionCard.style.opacity = '0';
    newQuestionCard.style.transform = 'scale(0.8)';
    setTimeout(() => {
        newQuestionCard.style.transition = 'all 0.3s ease';
        newQuestionCard.style.opacity = '1';
        newQuestionCard.style.transform = 'scale(1)';
    }, 10);

    renumberQuestions();
    updatePreview();
    showNotification('题目已复制', 'success');
}

// 折叠/展开题目卡片
function toggleQuestionCard(header) {
    const questionCard = header.closest('.question-card');
    const content = questionCard.querySelector('.question-content');
    const icon = header.querySelector('.question-toggle-icon i');

    if (questionCard.classList.contains('collapsed')) {
        // 展开
        questionCard.classList.remove('collapsed');
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.style.transform = 'rotate(0deg)';
        content.style.opacity = '1';
    } else {
        // 折叠
        questionCard.classList.add('collapsed');
        content.style.maxHeight = '0';
        icon.style.transform = 'rotate(-90deg)';
        content.style.opacity = '0';
    }
}

// 更新题目类型配置
function updateQuestionType(select) {
    const questionCard = select.closest('.question-card');
    const choiceConfig = questionCard.querySelector('.choice-config');
    const type = select.value;

    // 显示/隐藏选择题特殊配置
    if (type === 'choice' || type === 'multiple') {
        choiceConfig.style.display = 'block';

        // 更新评分方式
        const scoringSelect = questionCard.querySelector('.choice-scoring');
        if (type === 'multiple') {
            scoringSelect.innerHTML = `
                <option value="all">全对才得分</option>
                <option value="partial">部分分数</option>
                <option value="each">每选对一项得分</option>
            `;
        } else {
            scoringSelect.innerHTML = `
                <option value="all">全对才得分</option>
                <option value="partial">部分分数</option>
            `;
        }
    } else {
        choiceConfig.style.display = 'none';
    }

    updateQuestionPreview(questionCard);
}

// 更新选择题选项
function updateChoiceOptions(select) {
    const questionCard = select.closest('.question-card');
    const count = parseInt(select.value);
    const answerPreview = questionCard.querySelector('.answer-preview small');

    // 更新答案预览
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const availableOptions = letters.slice(0, count).join('、');
    answerPreview.textContent = `可用选项：${availableOptions}`;

    updateQuestionPreview(questionCard);
}

// 设置答案模式
function setAnswerPattern(button, pattern) {
    const questionCard = button.closest('.question-card');
    const countInput = questionCard.querySelector('.question-count');
    const answerPreview = questionCard.querySelector('.answer-preview small');
    const questionCount = parseInt(countInput.value);

    let answers = [];

    if (pattern === 'random') {
        const options = ['A', 'B', 'C', 'D'];
        for (let i = 0; i < questionCount; i++) {
            answers.push(options[Math.floor(Math.random() * options.length)]);
        }
    } else {
        answers = new Array(questionCount).fill(pattern);
    }

    // 存储答案数据
    questionCard.setAttribute('data-answers', JSON.stringify(answers));

    // 更新预览
    const preview = answers.slice(0, 10).join(' ') + (answers.length > 10 ? '...' : '');
    answerPreview.textContent = `答案预览：${preview}`;

    showNotification(`已设置${questionCount}题答案为：${pattern === 'random' ? '随机' : '全' + pattern}`, 'success');
}

// 显示详细答案设置
function showAnswerDetail(button) {
    const questionCard = button.closest('.question-card');
    const questionCount = parseInt(questionCard.querySelector('.question-count').value);

    // 创建详细设置模态框
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content modern-modal">
                <div class="modal-header gradient-header">
                    <h5 class="modal-title">
                        <i class="fas fa-list me-2"></i>详细答案设置
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="answer-grid">
                        ${generateAnswerGrid(questionCount)}
                    </div>
                    <div class="mt-3">
                        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="fillAllAnswers('A')">全填A</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="fillAllAnswers('B')">全填B</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="fillAllAnswers('C')">全填C</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="fillAllAnswers('D')">全填D</button>
                        <button type="button" class="btn btn-sm btn-outline-primary" onclick="randomizeAllAnswers()">随机填充</button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" onclick="saveDetailedAnswers()">保存答案</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // 模态框关闭时删除元素
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });

    // 存储当前题目卡片引用
    modal.setAttribute('data-question-card', questionCard.getAttribute('data-question-id'));
}

// 生成答案网格
function generateAnswerGrid(count) {
    let html = '<div class="row">';
    for (let i = 1; i <= count; i++) {
        html += `
            <div class="col-md-2 col-sm-3 col-4 mb-2">
                <label class="form-label small">${i}题</label>
                <select class="form-control form-control-sm answer-select" data-question="${i}">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>
            </div>
        `;

        if (i % 6 === 0 && i < count) {
            html += '</div><div class="row">';
        }
    }
    html += '</div>';
    return html;
}

// 更新题目预览
function updateQuestionPreview(element) {
    const questionCard = typeof element === 'string' ?
        document.querySelector(`[data-question-id="${element}"]`) :
        (element.closest ? element.closest('.question-card') : element);

    if (!questionCard) return;

    const type = questionCard.querySelector('.question-type').value;
    const count = parseInt(questionCard.querySelector('.question-count').value) || 1;
    const score = parseFloat(questionCard.querySelector('.question-score').value) || 0;
    const desc = questionCard.querySelector('.question-desc').value.trim();
    const start = parseInt(questionCard.querySelector('.question-start').value) || 1;

    // 更新统计信息
    const totalScore = count * score;
    questionCard.querySelector('.question-total-count').textContent = count;
    questionCard.querySelector('.question-total-score').textContent = totalScore + '分';
    questionCard.querySelector('.question-avg-score').textContent = score + '分';

    // 更新题目摘要
    const typeNames = {
        'choice': '选择题',
        'multiple': '多选题',
        'blank': '填空题',
        'short': '简答题',
        'essay': '大题/作文'
    };

    const summary = questionCard.querySelector('.question-summary');
    const summaryText = `${typeNames[type]} ${count}题 × ${score}分 = ${totalScore}分${desc ? ' (' + desc + ')' : ''}`;
    summary.textContent = summaryText;

    updatePreview();
}

// 重新编号题目
function renumberQuestions() {
    const questions = document.querySelectorAll('.question-card');
    questionCount = 0;

    questions.forEach((question, index) => {
        questionCount = index + 1;
        const numberSpan = question.querySelector('.question-number');
        const titleSpan = question.querySelector('.fw-bold');

        numberSpan.textContent = questionCount;
        titleSpan.textContent = `第${questionCount}题`;
    });
}

// 更新预览
function updatePreview() {
    const preview = document.getElementById('exam-preview');
    const questions = document.querySelectorAll('.question-card');

    if (questions.length === 0) {
        preview.innerHTML = '<p class="text-muted">请添加题目</p>';
        return;
    }

    let totalScore = 0;
    let previewHTML = '<div class="exam-structure">';

    questions.forEach((question, index) => {
        const type = question.querySelector('.question-type').value;
        const count = parseInt(question.querySelector('.question-count').value) || 1;
        const score = parseFloat(question.querySelector('.question-score').value) || 0;
        const desc = question.querySelector('.question-desc').value;

        const subtotal = count * score;
        totalScore += subtotal;

        // 更新小计显示
        const totalBadge = question.querySelector('.question-total');
        totalBadge.textContent = `小计：${subtotal}分`;

        const typeNames = {
            'choice': '选择题',
            'blank': '填空题',
            'short': '简答题',
            'essay': '大题/作文'
        };

        previewHTML += `
            <div class="mb-2 p-2 bg-light rounded">
                <strong>第${index + 1}题</strong>
                <span class="badge bg-primary ms-2">${typeNames[type]}</span>
                ${desc ? `<span class="text-muted ms-1">(${desc})</span>` : ''}
                <div class="small text-muted">
                    ${count}题 × ${score}分 = ${subtotal}分
                </div>
            </div>
        `;
    });

    previewHTML += `
        </div>
        <hr>
        <div class="text-end">
            <strong class="text-primary fs-5">总分：${totalScore}分</strong>
        </div>
    `;

    preview.innerHTML = previewHTML;

    // 更新总分输入框
    document.getElementById('total-score').value = totalScore;
}

// 保存试卷配置
function saveExamConfig() {
    const subject = document.getElementById('subject').value.trim();
    const examName = document.getElementById('exam-name').value.trim();
    const totalScore = parseFloat(document.getElementById('total-score').value) || 0;
    const className = document.getElementById('class-name').value.trim();

    if (!subject || !examName || !className) {
        alert('请填写完整的考试信息！');
        return;
    }

    const questions = [];
    const questionCards = document.querySelectorAll('.question-card');

    if (questionCards.length === 0) {
        alert('请至少添加一个题目！');
        return;
    }

    let calculatedTotal = 0;
    questionCards.forEach((card, index) => {
        const type = card.querySelector('.question-type').value;
        const count = parseInt(card.querySelector('.question-count').value) || 1;
        const score = parseFloat(card.querySelector('.question-score').value) || 0;
        const desc = card.querySelector('.question-desc').value;

        calculatedTotal += count * score;

        questions.push({
            id: index + 1,
            type: type,
            count: count,
            score: score,
            description: desc,
            total: count * score
        });
    });

    currentExam = {
        subject: subject,
        examName: examName,
        className: className,
        totalScore: totalScore,
        calculatedTotal: calculatedTotal,
        questions: questions,
        createdAt: new Date().toISOString()
    };

    // 保存到本地存储
    localStorage.setItem('currentExam', JSON.stringify(currentExam));

    // 显示成功提示
    showAlert('试卷配置保存成功！', 'success');

    // 询问是否跳转到登分界面
    setTimeout(() => {
        if (confirm('试卷配置已保存！\n是否立即跳转到登分界面开始阅卷？')) {
            showSection('scoring');
        }
    }, 1000);

    // 初始化登分区域
    initScoringSection();
}

// 加载快速模板
function loadQuickTemplate(templateType) {
    // 添加加载动画
    const container = document.getElementById('questions-container');
    container.innerHTML = '<div class="text-center p-4"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">加载中...</span></div><p class="mt-2">正在加载' + getTemplateName(templateType) + '模板...</p></div>';

    const templates = {
        'math': [
            { type: 'choice', count: 12, score: 5, desc: '单选题' },
            { type: 'blank', count: 4, score: 5, desc: '填空题' },
            { type: 'short', count: 6, score: 10, desc: '解答题' }
        ],
        'chinese': [
            { type: 'choice', count: 15, score: 3, desc: '基础知识' },
            { type: 'short', count: 4, score: 8, desc: '阅读理解' },
            { type: 'essay', count: 1, score: 37, desc: '作文' }
        ],
        'english': [
            { type: 'choice', count: 15, score: 2, desc: '听力选择' },
            { type: 'choice', count: 20, score: 2.5, desc: '语言知识运用' },
            { type: 'essay', count: 1, score: 20, desc: '书面表达' }
        ],
        'science': [
            { type: 'choice', count: 14, score: 4, desc: '选择题' },
            { type: 'short', count: 2, score: 9, desc: '实验题' },
            { type: 'short', count: 4, score: 11, desc: '计算题' }
        ]
    };

    const template = templates[templateType];
    if (template) {
        setTimeout(() => {
            // 清空现有题目
            container.innerHTML = '';
            questionCount = 0;

            template.forEach(item => {
                addQuestion();
                const lastCard = document.querySelector('.question-card:last-child');
                lastCard.querySelector('.question-type').value = item.type;
                lastCard.querySelector('.question-count').value = item.count;
                lastCard.querySelector('.question-score').value = item.score;
                lastCard.querySelector('.question-desc').value = item.desc;
            });

            // 自动填充学科信息
            document.getElementById('subject').value = getTemplateName(templateType);

            updatePreview();
            updateConfigProgress();

            // 自动保存配置
            saveExamConfig();

            showAlert(getTemplateName(templateType) + '模板加载成功！配置已自动保存', 'success');
        }, 600);
    }
}

// 获取模板名称
function getTemplateName(templateType) {
    const names = {
        'math': '数学',
        'chinese': '语文',
        'english': '英语',
        'science': '理综'
    };
    return names[templateType] || templateType;
}

// 初始化登分区域
function initScoringSection() {
    if (!currentExam) {
        document.getElementById('current-exam-info').innerHTML =
            '<div class="alert alert-warning">请先配置试卷结构</div>';
        document.getElementById('scoring-form').innerHTML = '';
        return;
    }

    // 显示考试信息
    document.getElementById('current-exam-info').innerHTML = `
        <div class="exam-info">
            <h6><i class="fas fa-book"></i> ${currentExam.subject || '未设置科目'}</h6>
            <p class="mb-1">${currentExam.examName || '未设置考试名称'}</p>
            <p class="mb-1">${currentExam.className || '未设置班级'}</p>
            <p class="mb-1">总分：${currentExam.totalScore || 0}分</p>
            <small class="text-muted">共${currentExam.questions?.length || 0}大题</small>
        </div>
    `;

    // 生成登分表单
    generateScoringForm();

    // 更新学生列表
    updateStudentsList();
}

// 生成登分表单
function generateScoringForm() {
    const container = document.getElementById('scoring-form');
    let formHTML = '<div class="scoring-questions">';

    currentExam.questions.forEach((question, qIndex) => {
        const typeNames = {
            'choice': '选择题',
            'blank': '填空题',
            'short': '简答题',
            'essay': '大题/作文'
        };

        formHTML += `
            <div class="score-group" data-question-type="${question.type}">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h6 class="mb-0">
                        <span class="badge bg-secondary me-2">${question.id}</span>
                        ${typeNames[question.type]}
                        ${question.description ? `(${question.description})` : ''}
                    </h6>
                    <div class="d-flex align-items-center">
                        <span class="text-muted small me-2">满分 ${question.total}分</span>
                        ${generateQuickButtons(question, qIndex)}
                    </div>
                </div>
        `;

        // 根据题目类型生成不同的评分界面
        if (question.type === 'choice') {
            // 选择题：提供满分/0分按钮
            formHTML += generateChoiceScoring(question, qIndex);
        } else if (question.type === 'short' || question.type === 'essay') {
            // 简答题/大题：支持细化赋分
            formHTML += generateDetailedScoring(question, qIndex);
        } else {
            // 填空题：普通输入框
            formHTML += generateNormalScoring(question, qIndex);
        }

        formHTML += `</div>`;
    });

    formHTML += '</div>';
    container.innerHTML = formHTML;
}

// 生成快捷按钮
function generateQuickButtons(question, qIndex) {
    if (question.type === 'choice') {
        return `
            <div class="btn-group btn-group-sm" role="group">
                <button type="button" class="btn btn-outline-success" onclick="setChoiceScore(${qIndex}, 'full')">
                    <i class="fas fa-check"></i> 全对
                </button>
                <button type="button" class="btn btn-outline-danger" onclick="setChoiceScore(${qIndex}, 'zero')">
                    <i class="fas fa-times"></i> 全错
                </button>
            </div>
        `;
    } else if (question.type === 'short' || question.type === 'essay') {
        return `
            <div class="btn-group btn-group-sm" role="group">
                <button type="button" class="btn btn-outline-success" onclick="setDetailedScore(${qIndex}, 'full')">
                    <i class="fas fa-star"></i> 满分
                </button>
                <button type="button" class="btn btn-outline-warning" onclick="setDetailedScore(${qIndex}, 'good')">
                    <i class="fas fa-star-half-alt"></i> 良好
                </button>
                <button type="button" class="btn btn-outline-danger" onclick="setDetailedScore(${qIndex}, 'zero')">
                    <i class="fas fa-times"></i> 零分
                </button>
            </div>
        `;
    } else {
        return `
            <div class="btn-group btn-group-sm" role="group">
                <button type="button" class="btn btn-outline-success" onclick="setNormalScore(${qIndex}, 'full')">
                    <i class="fas fa-check"></i> 满分
                </button>
                <button type="button" class="btn btn-outline-danger" onclick="setNormalScore(${qIndex}, 'zero')">
                    <i class="fas fa-times"></i> 零分
                </button>
            </div>
        `;
    }
}

// 选择题评分界面
function generateChoiceScoring(question, qIndex) {
    const collapseId = `choice-collapse-${qIndex}`;
    let html = `<div class="choice-scoring">`;

    // 如果选择题数量大于5，添加折叠功能
    if (question.count > 5) {
        html += `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="text-muted small">${question.count}道选择题</span>
                <button class="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#${collapseId}" aria-expanded="false">
                    <i class="fas fa-eye"></i> 展开详情
                </button>
            </div>
            <div class="collapse" id="${collapseId}">
        `;
    }

    // 按钮式选择题评分
    for (let i = 0; i < question.count; i++) {
        const subQuestionId = `q${qIndex}_${i}`;
        html += `
            <div class="choice-item mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <label class="form-label mb-0 fw-medium">${question.count > 1 ? `第${i + 1}题` : '得分'}:</label>
                    <div class="btn-group" role="group">
                        <input type="radio" class="btn-check" name="${subQuestionId}" id="${subQuestionId}_correct" 
                               value="${question.score}" onchange="calculateTotal(); updateChoiceProgress(${qIndex})">
                        <label class="btn btn-outline-success btn-sm" for="${subQuestionId}_correct">
                            <i class="fas fa-check me-1"></i>对(${question.score}分)
                        </label>
                        
                        <input type="radio" class="btn-check" name="${subQuestionId}" id="${subQuestionId}_wrong" 
                               value="0" onchange="calculateTotal(); updateChoiceProgress(${qIndex})">
                        <label class="btn btn-outline-danger btn-sm" for="${subQuestionId}_wrong">
                            <i class="fas fa-times me-1"></i>错(0分)
                        </label>
                    </div>
                </div>
                <input type="hidden" class="score-input" id="${subQuestionId}" value="0">
            </div>
        `;
    }

    // 关闭折叠容器
    if (question.count > 5) {
        html += `</div>`;

        // 添加进度指示器
        html += `
            <div class="choice-progress mt-2">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <small class="text-muted">答题进度</small>
                    <small class="text-muted" id="choice-progress-text-${qIndex}">0/${question.count}</small>
                </div>
                <div class="progress" style="height: 4px;">
                    <div class="progress-bar" id="choice-progress-bar-${qIndex}" style="width: 0%"></div>
                </div>
            </div>
        `;
    }

    html += '</div>';
    return html;
}

// 更新选择题答题进度
function updateChoiceProgress(qIndex) {
    const question = currentExam.questions[qIndex];
    if (!question || question.type !== 'choice') return;

    let answeredCount = 0;
    for (let i = 0; i < question.count; i++) {
        const subQuestionId = `q${qIndex}_${i}`;
        const correctRadio = document.getElementById(`${subQuestionId}_correct`);
        const wrongRadio = document.getElementById(`${subQuestionId}_wrong`);

        if (correctRadio?.checked || wrongRadio?.checked) {
            answeredCount++;
        }
    }

    const progressText = document.getElementById(`choice-progress-text-${qIndex}`);
    const progressBar = document.getElementById(`choice-progress-bar-${qIndex}`);

    if (progressText && progressBar) {
        const percentage = (answeredCount / question.count * 100);
        progressText.textContent = `${answeredCount}/${question.count}`;
        progressBar.style.width = `${percentage}%`;

        // 根据完成度更改进度条颜色
        if (percentage === 100) {
            progressBar.className = 'progress-bar bg-success';
        } else if (percentage > 50) {
            progressBar.className = 'progress-bar bg-info';
        } else {
            progressBar.className = 'progress-bar bg-warning';
        }
    }
}

// 简答题详细评分界面  
function generateDetailedScoring(question, qIndex) {
    let html = '<div class="detailed-scoring">';

    if (question.count === 1) {
        // 单个大题，支持分步骤赋分
        html += `
            <div class="detailed-item">
                <div class="row">
                    <div class="col-md-8">
                        <div class="score-breakdown">
                            <div class="mb-2">
                                <label class="form-label small">分步评分：</label>
                                <div class="row g-2" id="breakdown_q${qIndex}_0">
                                    <div class="col">
                                        <input type="number" class="form-control form-control-sm breakdown-input" 
                                               placeholder="步骤1" min="0" max="${question.score}" step="0.5"
                                               onchange="updateDetailedTotal(${qIndex}, 0)">
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control form-control-sm breakdown-input" 
                                               placeholder="步骤2" min="0" max="${question.score}" step="0.5"
                                               onchange="updateDetailedTotal(${qIndex}, 0)">
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control form-control-sm breakdown-input" 
                                               placeholder="步骤3" min="0" max="${question.score}" step="0.5"
                                               onchange="updateDetailedTotal(${qIndex}, 0)">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label small">总分：</label>
                        <input type="number" class="form-control score-input" 
                               id="q${qIndex}_0" 
                               max="${question.score}" 
                               min="0" 
                               step="0.5"
                               placeholder="${question.score}"
                               onchange="calculateTotal()"
                               onkeyup="calculateTotal()">
                    </div>
                </div>
            </div>
        `;
    } else {
        // 多个小题
        for (let i = 0; i < question.count; i++) {
            const subQuestionId = `q${qIndex}_${i}`;
            html += `
                <div class="detailed-item mb-3">
                    <div class="row">
                        <div class="col-md-2">
                            <label class="form-label small">第${i + 1}题：</label>
                        </div>
                        <div class="col-md-6">
                            <div class="score-breakdown">
                                <div class="row g-1" id="breakdown_${subQuestionId}">
                                    <div class="col">
                                        <input type="number" class="form-control form-control-sm breakdown-input" 
                                               placeholder="要点1" min="0" max="${question.score}" step="0.5"
                                               onchange="updateDetailedTotal(${qIndex}, ${i})">
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control form-control-sm breakdown-input" 
                                               placeholder="要点2" min="0" max="${question.score}" step="0.5"
                                               onchange="updateDetailedTotal(${qIndex}, ${i})">
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control form-control-sm breakdown-input" 
                                               placeholder="要点3" min="0" max="${question.score}" step="0.5"
                                               onchange="updateDetailedTotal(${qIndex}, ${i})">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <input type="number" class="form-control score-input" 
                                   id="${subQuestionId}" 
                                   max="${question.score}" 
                                   min="0" 
                                   step="0.5"
                                   placeholder="${question.score}"
                                   onchange="calculateTotal()"
                                   onkeyup="calculateTotal()">
                        </div>
                    </div>
                </div>
            `;
        }
    }

    html += '</div>';
    return html;
}

// 普通评分界面（填空题等）
function generateNormalScoring(question, qIndex) {
    let html = '<div class="normal-scoring"><div class="row">';

    for (let i = 0; i < question.count; i++) {
        const subQuestionId = `q${qIndex}_${i}`;
        html += `
            <div class="col-md-2 col-sm-3 col-4 mb-2">
                <label class="form-label small">${question.count > 1 ? `(${i + 1})` : '得分'}</label>
                <input type="number" class="form-control score-input" 
                       id="${subQuestionId}" 
                       max="${question.score}" 
                       min="0" 
                       step="0.5"
                       placeholder="${question.score}"
                       onchange="calculateTotal()"
                       onkeyup="calculateTotal()">
            </div>
        `;
    }

    html += '</div></div>';
    return html;
}

// 计算总分
function calculateTotal() {
    if (!currentExam) return;

    let total = 0;
    const inputs = document.querySelectorAll('.score-input');

    inputs.forEach(input => {
        const value = parseFloat(input.value) || 0;
        total += value;
    });

    document.getElementById('current-total').textContent = total.toFixed(1);
}

// 保存成绩
function saveScore() {
    const studentName = document.getElementById('student-name').value.trim();
    const studentId = document.getElementById('student-id').value.trim();
    const seatNumber = document.getElementById('seat-number').value.trim();

    if (!studentName) {
        alert('请输入学生姓名！');
        return;
    }

    if (!currentExam) {
        alert('请先配置试卷结构！');
        return;
    }

    // 收集各题得分
    const scores = collectScoreData();
    let totalScore = 0;

    // 计算总分
    Object.keys(scores).forEach(questionKey => {
        scores[questionKey].forEach(score => {
            totalScore += score;
        });
    });

    // 检查是否已存在该学生
    const existingIndex = studentsData.findIndex(s =>
        s.name === studentName && s.studentId === studentId
    );

    const studentData = {
        name: studentName,
        studentId: studentId,
        seatNumber: seatNumber,
        scores: scores,
        totalScore: totalScore,
        timestamp: new Date().toISOString()
    };

    if (existingIndex >= 0) {
        if (confirm('该学生成绩已存在，是否覆盖？')) {
            studentsData[existingIndex] = studentData;
        } else {
            return;
        }
    } else {
        studentsData.push(studentData);
    }

    // 保存到本地存储
    localStorage.setItem('studentsData', JSON.stringify(studentsData));

    showAlert('成绩保存成功！', 'success');
    clearForm();
    updateStudentsList();
    updateStatistics();
}

// 清空表单
function clearForm() {
    document.getElementById('student-name').value = '';
    document.getElementById('student-id').value = '';
    document.getElementById('seat-number').value = '';

    // 清空普通输入框
    const inputs = document.querySelectorAll('.score-input');
    inputs.forEach(input => {
        if (input.type !== 'hidden') {
            input.value = '';
        }
    });

    // 清空选择题单选按钮
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => radio.checked = false);

    // 清空分步评分输入框
    const breakdownInputs = document.querySelectorAll('.breakdown-input');
    breakdownInputs.forEach(input => input.value = '');

    document.getElementById('current-total').textContent = '0';
}

// 快捷填分
function quickFill(type) {
    if (!currentExam) return;

    const inputs = document.querySelectorAll('.score-input');

    inputs.forEach(input => {
        const maxScore = parseFloat(input.getAttribute('max')) || 0;

        switch (type) {
            case 'full':
                input.value = maxScore;
                break;
            case 'half':
                input.value = (maxScore / 2).toFixed(1);
                break;
            case 'zero':
            case 'absent':
                input.value = '0';
                break;
        }
    });

    calculateTotal();
}

// 更新学生列表
function updateStudentsList() {
    const container = document.getElementById('students-list');

    if (studentsData.length === 0) {
        container.innerHTML = '<p class="text-muted">暂无学生成绩</p>';
        return;
    }

    let listHTML = '';
    studentsData.forEach((student, index) => {
        listHTML += `
            <div class="student-item" onclick="loadStudent(${index})">
                <div class="d-flex justify-content-between">
                    <div>
                        <strong>${student.name}</strong>
                        ${student.studentId ? `<small class="text-muted ms-1">${student.studentId}</small>` : ''}
                        ${student.className ? `<span class="badge bg-secondary ms-1">${student.className}</span>` : ''}
                    </div>
                    <div>
                        <span class="badge bg-primary">${student.totalScore}分</span>
                        <button class="btn btn-sm btn-outline-danger ms-1" onclick="deleteStudent(${index}, event)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    ${student.seatNumber ? `<small class="text-muted">座位号：${student.seatNumber}</small>` : '<span></span>'}
                </div>
            </div>
        `;
    });

    container.innerHTML = listHTML;
}

// 加载学生成绩到表单
function loadStudent(index) {
    const student = studentsData[index];
    if (!student) return;

    document.getElementById('student-name').value = student.name || '';
    document.getElementById('student-id').value = student.studentId || '';
    document.getElementById('seat-number').value = student.seatNumber || '';

    // 填充各题得分
    if (currentExam && currentExam.questions) {
        currentExam.questions.forEach((question, questionIndex) => {
            const questionKey = `q${questionIndex + 1}`;
            const questionScores = student.scores[questionKey] || [];

            if (question.type === 'choice') {
                // 选择题：设置单选按钮
                const totalScore = questionScores.reduce((sum, score) => sum + score, 0);
                const correctRadio = document.querySelector(`input[name="${questionKey}"][value="correct"]`);
                const wrongRadio = document.querySelector(`input[name="${questionKey}"][value="wrong"]`);

                if (totalScore === question.score) {
                    if (correctRadio) correctRadio.checked = true;
                } else {
                    if (wrongRadio) wrongRadio.checked = true;
                }
            } else if (question.type === 'detailed') {
                // 分步评分题：设置每一步的分数
                questionScores.forEach((score, subIndex) => {
                    const input = document.getElementById(`${questionKey}_${subIndex}`);
                    if (input && input.classList.contains('breakdown-input')) {
                        input.value = score;
                    }
                });
            } else {
                // 普通题：直接设置分数
                questionScores.forEach((score, subIndex) => {
                    const inputId = `${questionKey}_${subIndex}`;
                    const input = document.getElementById(inputId);
                    if (input) {
                        input.value = score;
                    }
                });
            }
        });
    } else {
        // 兼容旧版本数据格式
        Object.keys(student.scores).forEach(questionKey => {
            student.scores[questionKey].forEach((score, subIndex) => {
                const inputId = `${questionKey}_${subIndex}`;
                const input = document.getElementById(inputId);
                if (input) {
                    input.value = score;
                }
            });
        });
    }

    calculateTotal();
}

// 删除学生
function deleteStudent(index, event) {
    event.stopPropagation();

    if (confirm('确定删除该学生的成绩吗？')) {
        studentsData.splice(index, 1);
        localStorage.setItem('studentsData', JSON.stringify(studentsData));
        updateStudentsList();
        updateStatistics();
        showAlert('成绩删除成功！', 'success');
    }
}

// 更新统计信息 - 智能分析版
function updateStatistics() {
    // 更新班级筛选选项
    updateClassFilter();

    // 获取筛选后的学生数据
    const filteredData = getFilteredStudents();

    if (filteredData.length === 0) {
        document.getElementById('total-students').textContent = '0';
        document.getElementById('average-score').textContent = '0';
        document.getElementById('max-score').textContent = '0';
        document.getElementById('min-score').textContent = '0';
        document.getElementById('scores-tbody').innerHTML = '<tr><td colspan="100%" class="text-center text-muted">暂无数据</td></tr>';

        // 清空智能分析
        updateIntelligentAnalysis([]);
        return;
    }

    const scores = filteredData.map(s => s.totalScore);
    const total = filteredData.length;
    const average = (scores.reduce((a, b) => a + b, 0) / total).toFixed(1);
    const maxScore = Math.max(...scores);
    const minScore = Math.min(...scores);

    document.getElementById('total-students').textContent = total;
    document.getElementById('average-score').textContent = average;
    document.getElementById('max-score').textContent = maxScore;
    document.getElementById('min-score').textContent = minScore;

    // 生成成绩表格
    generateScoresTable();

    // 更新图表
    updateScoreChart();

    // 新增：智能分析
    updateIntelligentAnalysis(filteredData);

    // 新增：题目得分分析
    updateQuestionAnalysis(filteredData);

    // 新增：班级对比分析
    updateClassComparison(filteredData);
}

// 智能分析功能
function updateIntelligentAnalysis(data) {
    if (!data || data.length === 0) return;

    const scores = data.map(s => s.totalScore);
    const totalScore = currentExam ? currentExam.totalScore : 100;

    // 计算统计指标
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((acc, score) => acc + Math.pow(score - average, 2), 0) / scores.length;
    const stdDev = Math.sqrt(variance);

    // 分数段分析
    const segments = {
        excellent: scores.filter(s => s >= totalScore * 0.9).length,
        good: scores.filter(s => s >= totalScore * 0.8 && s < totalScore * 0.9).length,
        average: scores.filter(s => s >= totalScore * 0.6 && s < totalScore * 0.8).length,
        poor: scores.filter(s => s < totalScore * 0.6).length
    };

    // 生成智能分析报告
    const analysisHtml = `
        <div class="card mb-3">
            <div class="card-header">
                <h5><i class="fas fa-brain text-info me-2"></i>智能分析报告</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <h6>成绩分布</h6>
                        <div class="progress-stacked mb-3" style="height: 25px;">
                            <div class="progress" role="progressbar" style="width: ${(segments.excellent / data.length * 100)}%" aria-valuenow="${segments.excellent}" aria-valuemin="0" aria-valuemax="${data.length}">
                                <div class="progress-bar bg-success">优秀(${segments.excellent}人)</div>
                            </div>
                            <div class="progress" role="progressbar" style="width: ${(segments.good / data.length * 100)}%" aria-valuenow="${segments.good}" aria-valuemin="0" aria-valuemax="${data.length}">
                                <div class="progress-bar bg-info">良好(${segments.good}人)</div>
                            </div>
                            <div class="progress" role="progressbar" style="width: ${(segments.average / data.length * 100)}%" aria-valuenow="${segments.average}" aria-valuemin="0" aria-valuemax="${data.length}">
                                <div class="progress-bar bg-warning">中等(${segments.average}人)</div>
                            </div>
                            <div class="progress" role="progressbar" style="width: ${(segments.poor / data.length * 100)}%" aria-valuenow="${segments.poor}" aria-valuemin="0" aria-valuemax="${data.length}">
                                <div class="progress-bar bg-danger">待提高(${segments.poor}人)</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h6>统计指标</h6>
                        <ul class="list-unstyled">
                            <li><strong>标准差:</strong> ${stdDev.toFixed(2)} (${stdDev < 10 ? '成绩集中' : stdDev < 20 ? '分布适中' : '差距较大'})</li>
                            <li><strong>及格率:</strong> ${((scores.filter(s => s >= totalScore * 0.6).length / data.length) * 100).toFixed(1)}%</li>
                            <li><strong>优秀率:</strong> ${((segments.excellent / data.length) * 100).toFixed(1)}%</li>
                        </ul>
                    </div>
                </div>
                <div class="mt-3">
                    <h6>教学建议</h6>
                    <div class="alert alert-light">
                        ${generateTeachingAdvice(segments, data.length, average, totalScore)}
                    </div>
                </div>
            </div>
        </div>
    `;

    // 插入或更新智能分析区域
    let analysisContainer = document.getElementById('intelligent-analysis');
    if (!analysisContainer) {
        analysisContainer = document.createElement('div');
        analysisContainer.id = 'intelligent-analysis';
        document.querySelector('#statistics .container').appendChild(analysisContainer);
    }
    analysisContainer.innerHTML = analysisHtml;
}

// 生成教学建议
function generateTeachingAdvice(segments, total, average, totalScore) {
    const excellentRate = segments.excellent / total;
    const poorRate = segments.poor / total;

    let advice = [];

    if (excellentRate > 0.3) {
        advice.push("📈 优秀学生比例较高，可适当增加挑战性题目");
    }

    if (poorRate > 0.3) {
        advice.push("📚 需要加强基础知识教学，关注学习困难学生");
    }

    if (average < totalScore * 0.6) {
        advice.push("⚠️ 整体成绩偏低，建议回顾教学重点");
    } else if (average > totalScore * 0.8) {
        advice.push("✨ 整体成绩优秀，可考虑提升难度");
    }

    if (segments.average > total * 0.5) {
        advice.push("📊 成绩分布较为集中，教学效果良好");
    }

    return advice.length > 0 ? advice.join('<br>') : "📋 成绩分布合理，继续保持当前教学策略";
}

// 题目得分分析
function updateQuestionAnalysis(data) {
    if (!currentExam || !data.length) return;

    const questionStats = {};

    // 分析每题得分情况
    currentExam.questions.forEach((question, qIndex) => {
        const questionKey = `q${qIndex + 1}`;
        const questionScores = [];

        data.forEach(student => {
            if (student.scores && student.scores[questionKey]) {
                const scores = Array.isArray(student.scores[questionKey]) ?
                    student.scores[questionKey] : [student.scores[questionKey]];
                questionScores.push(...scores);
            }
        });

        if (questionScores.length > 0) {
            const avg = questionScores.reduce((a, b) => a + b, 0) / questionScores.length;
            const fullScore = question.score * question.count;
            questionStats[questionKey] = {
                title: question.description || `第${qIndex + 1}题`,
                average: avg.toFixed(1),
                fullScore: fullScore,
                accuracy: ((avg / fullScore) * 100).toFixed(1)
            };
        }
    });

    // 生成题目分析表格
    const analysisHtml = `
        <div class="card mb-3">
            <div class="card-header">
                <h5><i class="fas fa-chart-line text-primary me-2"></i>题目得分分析</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>题目</th>
                                <th>平均分</th>
                                <th>满分</th>
                                <th>正确率</th>
                                <th>难度评估</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${Object.entries(questionStats).map(([key, stat]) => `
                                <tr>
                                    <td>${stat.title}</td>
                                    <td>${stat.average}</td>
                                    <td>${stat.fullScore}</td>
                                    <td>
                                        <div class="progress" style="height: 20px;">
                                            <div class="progress-bar ${stat.accuracy > 80 ? 'bg-success' : stat.accuracy > 60 ? 'bg-warning' : 'bg-danger'}" 
                                                 style="width: ${stat.accuracy}%">${stat.accuracy}%</div>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="badge ${stat.accuracy > 80 ? 'bg-success' : stat.accuracy > 60 ? 'bg-warning' : 'bg-danger'}">
                                            ${stat.accuracy > 80 ? '简单' : stat.accuracy > 60 ? '适中' : '困难'}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    // 插入题目分析
    let questionContainer = document.getElementById('question-analysis');
    if (!questionContainer) {
        questionContainer = document.createElement('div');
        questionContainer.id = 'question-analysis';
        document.querySelector('#statistics .container').appendChild(questionContainer);
    }
    questionContainer.innerHTML = analysisHtml;
}

// 班级对比分析
function updateClassComparison(data) {
    const classesByName = {};

    // 按班级分组
    data.forEach(student => {
        const className = student.className || '未分班';
        if (!classesByName[className]) {
            classesByName[className] = [];
        }
        classesByName[className].push(student.totalScore);
    });

    if (Object.keys(classesByName).length <= 1) return;

    // 计算各班级统计
    const classStats = Object.entries(classesByName).map(([className, scores]) => ({
        name: className,
        count: scores.length,
        average: (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1),
        max: Math.max(...scores),
        min: Math.min(...scores)
    }));

    // 生成班级对比
    const comparisonHtml = `
        <div class="card">
            <div class="card-header">
                <h5><i class="fas fa-users text-success me-2"></i>班级对比分析</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>班级</th>
                                <th>人数</th>
                                <th>平均分</th>
                                <th>最高分</th>
                                <th>最低分</th>
                                <th>班级排名</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${classStats
            .sort((a, b) => parseFloat(b.average) - parseFloat(a.average))
            .map((cls, index) => `
                                <tr>
                                    <td><strong>${cls.name}</strong></td>
                                    <td>${cls.count}</td>
                                    <td>${cls.average}</td>
                                    <td class="text-success">${cls.max}</td>
                                    <td class="text-danger">${cls.min}</td>
                                    <td>
                                        <span class="badge ${index === 0 ? 'bg-warning' : index === 1 ? 'bg-info' : 'bg-secondary'}">
                                            第${index + 1}名
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    // 插入班级对比
    let classContainer = document.getElementById('class-comparison');
    if (!classContainer) {
        classContainer = document.createElement('div');
        classContainer.id = 'class-comparison';
        classContainer.className = 'mt-3';
        document.querySelector('#statistics .container').appendChild(classContainer);
    }
    classContainer.innerHTML = comparisonHtml;
}

// 更新班级筛选器
function updateClassFilter() {
    const classFilter = document.getElementById('class-filter');
    if (!classFilter) return;

    // 获取所有班级
    const classes = new Set();
    studentsData.forEach(student => {
        const className = student.className || '未分班';
        classes.add(className);
    });

    // 保存当前选中的班级
    const currentValue = classFilter.value;

    // 重新生成选项
    classFilter.innerHTML = '<option value="">全部班级</option>';
    Array.from(classes).sort().forEach(className => {
        const option = document.createElement('option');
        option.value = className;
        option.textContent = className;
        classFilter.appendChild(option);
    });

    // 恢复之前的选择
    if (Array.from(classes).includes(currentValue)) {
        classFilter.value = currentValue;
    }
}

// 获取筛选后的学生数据
function getFilteredStudents() {
    const classFilter = document.getElementById('class-filter');
    const selectedClass = classFilter?.value || '';

    if (!selectedClass) {
        return studentsData;
    }

    return studentsData.filter(student => {
        const studentClass = student.className || '未分班';
        return studentClass === selectedClass;
    });
}

// 按班级筛选
function filterByClass() {
    updateStatistics();
}

// 生成成绩表格
function generateScoresTable() {
    if (!currentExam) return;

    const headerRow = document.getElementById('table-header');
    const tbody = document.getElementById('scores-tbody');
    const filteredData = getFilteredStudents();

    // 生成表头
    let headerHTML = '<th>姓名</th><th>学号</th><th>班级</th><th>座位号</th>';

    currentExam.questions.forEach((question, index) => {
        if (question.count === 1) {
            headerHTML += `<th>第${index + 1}题</th>`;
        } else {
            for (let i = 0; i < question.count; i++) {
                headerHTML += `<th>第${index + 1}题(${i + 1})</th>`;
            }
        }
    });

    headerHTML += '<th class="table-warning">总分</th>';
    headerRow.innerHTML = headerHTML;

    // 生成数据行
    let tbodyHTML = '';
    filteredData.forEach(student => {
        tbodyHTML += '<tr>';
        tbodyHTML += `<td>${student.name}</td>`;
        tbodyHTML += `<td>${student.studentId || '-'}</td>`;
        tbodyHTML += `<td>${student.className || '未分班'}</td>`;
        tbodyHTML += `<td>${student.seatNumber || '-'}</td>`;

        Object.keys(student.scores).forEach(questionKey => {
            student.scores[questionKey].forEach(score => {
                tbodyHTML += `<td>${score}</td>`;
            });
        });

        tbodyHTML += `<td class="table-warning fw-bold">${student.totalScore}</td>`;
        tbodyHTML += '</tr>';
    });

    tbody.innerHTML = tbodyHTML;
}

// 更新分数分布图表
function updateScoreChart() {
    const ctx = document.getElementById('scoreChart').getContext('2d');
    const filteredData = getFilteredStudents();

    if (filteredData.length === 0) return;

    // 计算分数段分布
    const ranges = ['0-60', '60-70', '70-80', '80-90', '90-100'];
    const counts = [0, 0, 0, 0, 0];

    filteredData.forEach(student => {
        const score = student.totalScore;
        if (score < 60) counts[0]++;
        else if (score < 70) counts[1]++;
        else if (score < 80) counts[2]++;
        else if (score < 90) counts[3]++;
        else counts[4]++;
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ranges,
            datasets: [{
                label: '人数',
                data: counts,
                backgroundColor: [
                    '#dc3545',
                    '#fd7e14',
                    '#ffc107',
                    '#28a745',
                    '#007bff'
                ]
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// 更新各题统计
function updateQuestionStats() {
    const filteredData = getFilteredStudents();

    if (!currentExam || filteredData.length === 0) {
        document.getElementById('question-stats').innerHTML = '<p class="text-muted">暂无数据</p>';
        return;
    }

    let statsHTML = '';

    currentExam.questions.forEach((question, qIndex) => {
        const questionKey = `q${qIndex}`;
        let questionTotal = 0;
        let questionMax = question.total;
        let correctCount = 0;

        filteredData.forEach(student => {
            const questionScores = student.scores[questionKey] || [];
            const questionSum = questionScores.reduce((a, b) => a + b, 0);
            questionTotal += questionSum;

            if (questionSum >= questionMax * 0.8) {
                correctCount++;
            }
        });

        const avgScore = (questionTotal / filteredData.length).toFixed(1);
        const correctRate = ((correctCount / filteredData.length) * 100).toFixed(1);

        statsHTML += `
            <div class="mb-3 p-2 bg-light rounded">
                <div class="d-flex justify-content-between">
                    <strong>第${qIndex + 1}题</strong>
                    <span class="text-muted">满分${questionMax}分</span>
                </div>
                <div class="mt-1">
                    <small class="text-muted">平均分：${avgScore}分</small><br>
                    <small class="text-muted">得分率：${correctRate}%</small>
                </div>
            </div>
        `;
    });

    document.getElementById('question-stats').innerHTML = statsHTML;
}

// 导出Excel
// 导出Excel - 增强版
function exportToExcel() {
    if (!currentExam || studentsData.length === 0) {
        showAlert('暂无数据可导出！', 'warning');
        return;
    }

    try {
        // 创建工作簿
        const wb = XLSX.utils.book_new();

        // 1. 成绩单工作表
        const scoreSheet = createScoreSheet();
        XLSX.utils.book_append_sheet(wb, scoreSheet, '成绩明细');

        // 2. 统计分析工作表
        const statsSheet = createStatsSheet();
        XLSX.utils.book_append_sheet(wb, statsSheet, '统计分析');

        // 3. 班级汇总工作表
        const classSheet = createClassSummarySheet();
        XLSX.utils.book_append_sheet(wb, classSheet, '班级汇总');

        // 导出文件
        const filename = `${currentExam.subject || '考试'}_${currentExam.examName || '成绩报告'}_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, filename);

        showAlert('📊 智能报表导出成功！包含成绩明细、统计分析和班级汇总', 'success');
    } catch (error) {
        showAlert('导出失败：' + error.message, 'danger');
    }
}

// 创建成绩明细表
function createScoreSheet() {
    const data = [];

    // 表头
    const headers = ['序号', '姓名', '学号', '班级', '座位号'];

    // 添加题目列
    currentExam.questions.forEach((question, index) => {
        if (question.count === 1) {
            headers.push(`${question.description || '第' + (index + 1) + '题'}(${question.score}分)`);
        } else {
            for (let i = 0; i < question.count; i++) {
                headers.push(`${question.description || '第' + (index + 1) + '题'}-${i + 1}(${question.score}分)`);
            }
        }
    });

    headers.push('总分', '排名', '等级');
    data.push(headers);

    // 计算排名
    const sortedStudents = [...studentsData].sort((a, b) => b.totalScore - a.totalScore);

    // 数据行
    sortedStudents.forEach((student, index) => {
        const row = [
            index + 1,
            student.name,
            student.studentId || '',
            student.className || '未分班',
            student.seatNumber || ''
        ];

        // 添加各题得分
        if (student.scores) {
            Object.keys(student.scores).sort().forEach(questionKey => {
                const questionScores = student.scores[questionKey];
                if (Array.isArray(questionScores)) {
                    questionScores.forEach(score => row.push(score));
                } else {
                    row.push(questionScores);
                }
            });
        }

        row.push(
            student.totalScore,
            index + 1,
            getGradeLevel(student.totalScore, currentExam.totalScore)
        );
        data.push(row);
    });

    return XLSX.utils.aoa_to_sheet(data);
}

// 创建统计分析表
function createStatsSheet() {
    const data = [];
    const scores = studentsData.map(s => s.totalScore);
    const totalScore = currentExam.totalScore || 100;

    // 基础统计
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    const maxScore = Math.max(...scores);
    const minScore = Math.min(...scores);
    const variance = scores.reduce((acc, score) => acc + Math.pow(score - average, 2), 0) / scores.length;
    const stdDev = Math.sqrt(variance);

    // 分数段统计
    const segments = {
        excellent: scores.filter(s => s >= totalScore * 0.9).length,
        good: scores.filter(s => s >= totalScore * 0.8 && s < totalScore * 0.9).length,
        average: scores.filter(s => s >= totalScore * 0.6 && s < totalScore * 0.8).length,
        poor: scores.filter(s => s < totalScore * 0.6).length
    };

    // 统计数据
    data.push(['考试统计分析报告']);
    data.push(['生成时间', new Date().toLocaleString()]);
    data.push(['考试科目', currentExam.subject || '']);
    data.push(['考试名称', currentExam.examName || '']);
    data.push([]);

    data.push(['基础统计']);
    data.push(['参考人数', scores.length]);
    data.push(['满分', totalScore]);
    data.push(['平均分', average.toFixed(2)]);
    data.push(['最高分', maxScore]);
    data.push(['最低分', minScore]);
    data.push(['标准差', stdDev.toFixed(2)]);
    data.push(['及格率', ((scores.filter(s => s >= totalScore * 0.6).length / scores.length) * 100).toFixed(1) + '%']);
    data.push(['优秀率', ((segments.excellent / scores.length) * 100).toFixed(1) + '%']);
    data.push([]);

    data.push(['分数段分布']);
    data.push(['优秀(90%以上)', segments.excellent, ((segments.excellent / scores.length) * 100).toFixed(1) + '%']);
    data.push(['良好(80%-89%)', segments.good, ((segments.good / scores.length) * 100).toFixed(1) + '%']);
    data.push(['中等(60%-79%)', segments.average, ((segments.average / scores.length) * 100).toFixed(1) + '%']);
    data.push(['待提高(60%以下)', segments.poor, ((segments.poor / scores.length) * 100).toFixed(1) + '%']);

    return XLSX.utils.aoa_to_sheet(data);
}

// 创建班级汇总表
function createClassSummarySheet() {
    const classesByName = {};

    // 按班级分组
    studentsData.forEach(student => {
        const className = student.className || '未分班';
        if (!classesByName[className]) {
            classesByName[className] = [];
        }
        classesByName[className].push(student);
    });

    const data = [];
    data.push(['班级汇总统计']);
    data.push(['班级名称', '人数', '平均分', '最高分', '最低分', '及格人数', '及格率', '优秀人数', '优秀率']);

    Object.entries(classesByName).forEach(([className, students]) => {
        const scores = students.map(s => s.totalScore);
        const average = scores.reduce((a, b) => a + b, 0) / scores.length;
        const maxScore = Math.max(...scores);
        const minScore = Math.min(...scores);
        const passCount = scores.filter(s => s >= (currentExam.totalScore || 100) * 0.6).length;
        const excellentCount = scores.filter(s => s >= (currentExam.totalScore || 100) * 0.9).length;

        data.push([
            className,
            students.length,
            average.toFixed(1),
            maxScore,
            minScore,
            passCount,
            ((passCount / students.length) * 100).toFixed(1) + '%',
            excellentCount,
            ((excellentCount / students.length) * 100).toFixed(1) + '%'
        ]);
    });

    return XLSX.utils.aoa_to_sheet(data);
}

// 获取等级
function getGradeLevel(score, totalScore) {
    const percentage = score / totalScore;
    if (percentage >= 0.9) return 'A';
    if (percentage >= 0.8) return 'B';
    if (percentage >= 0.6) return 'C';
    return 'D';
}

// 打印报表 - 增强版
function printReport() {
    // 创建打印内容
    const printContent = generatePrintContent();

    // 创建新窗口进行打印
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>成绩报表 - ${currentExam?.subject || ''} ${currentExam?.examName || ''}</title>
            <style>
                body { font-family: 'Microsoft YaHei', sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px; }
                .stats { display: flex; justify-content: space-between; margin: 20px 0; }
                .stat-item { text-align: center; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid #333; padding: 8px; text-align: center; }
                th { background-color: #f5f5f5; font-weight: bold; }
                .summary { margin: 20px 0; padding: 15px; background-color: #f9f9f9; }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none !important; }
                }
            </style>
        </head>
        <body>
            ${printContent}
            <script>
                window.onload = function() {
                    window.print();
                    window.onafterprint = function() {
                        window.close();
                    };
                };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// 生成打印内容
function generatePrintContent() {
    if (!currentExam || studentsData.length === 0) {
        return '<div>暂无数据可打印</div>';
    }

    const scores = studentsData.map(s => s.totalScore);
    const average = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
    const maxScore = Math.max(...scores);
    const minScore = Math.min(...scores);

    // 排序学生数据
    const sortedStudents = [...studentsData].sort((a, b) => b.totalScore - a.totalScore);

    let content = `
        <div class="header">
            <h1>${currentExam.subject || ''} ${currentExam.examName || ''} 成绩报表</h1>
            <p>生成时间：${new Date().toLocaleString()}</p>
        </div>
        
        <div class="stats">
            <div class="stat-item">
                <h3>${studentsData.length}</h3>
                <p>参考人数</p>
            </div>
            <div class="stat-item">
                <h3>${average}</h3>
                <p>平均分</p>
            </div>
            <div class="stat-item">
                <h3>${maxScore}</h3>
                <p>最高分</p>
            </div>
            <div class="stat-item">
                <h3>${minScore}</h3>
                <p>最低分</p>
            </div>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th>排名</th>
                    <th>姓名</th>
                    <th>学号</th>
                    <th>班级</th>
                    <th>总分</th>
                    <th>等级</th>
                </tr>
            </thead>
            <tbody>
    `;

    sortedStudents.forEach((student, index) => {
        content += `
            <tr>
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.studentId || ''}</td>
                <td>${student.className || '未分班'}</td>
                <td><strong>${student.totalScore}</strong></td>
                <td>${getGradeLevel(student.totalScore, currentExam.totalScore || 100)}</td>
            </tr>
        `;
    });

    content += `
            </tbody>
        </table>
        
        <div class="summary">
            <h3>统计分析</h3>
            <p><strong>及格率：</strong>${((scores.filter(s => s >= (currentExam.totalScore || 100) * 0.6).length / scores.length) * 100).toFixed(1)}%</p>
            <p><strong>优秀率：</strong>${((scores.filter(s => s >= (currentExam.totalScore || 100) * 0.9).length / scores.length) * 100).toFixed(1)}%</p>
        </div>
    `;

    return content;
}

// 批量录入学生名单
function showBatchInput() {
    const modal = new bootstrap.Modal(document.getElementById('batchInputModal'));
    modal.show();
}

// 处理批量录入
function processBatchInput() {
    const textarea = document.getElementById('batch-students');
    const lines = textarea.value.trim().split('\n');

    let count = 0;
    lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 1 && parts[0]) {
            const name = parts[0];
            const studentId = parts[1] || '';
            const seatNumber = parts[2] || '';

            // 检查是否已存在
            const exists = studentsData.some(s =>
                s.name === name && s.studentId === studentId
            );

            if (!exists) {
                studentsData.push({
                    name: name,
                    studentId: studentId,
                    seatNumber: seatNumber,
                    scores: {},
                    totalScore: 0,
                    timestamp: new Date().toISOString()
                });
                count++;
            }
        }
    });

    if (count > 0) {
        localStorage.setItem('studentsData', JSON.stringify(studentsData));
        updateStudentsList();
        showAlert(`成功导入${count}个学生！`, 'success');
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById('batchInputModal'));
    modal.hide();
    textarea.value = '';
}

// 从Excel导入
function importFromExcel() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls';

    input.onchange = function (e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // 处理导入数据
            let count = 0;
            jsonData.forEach((row, index) => {
                if (index === 0 || !row[0]) return; // 跳过表头和空行

                const name = row[0];
                const studentId = row[1] || '';
                const seatNumber = row[2] || '';

                const exists = studentsData.some(s =>
                    s.name === name && s.studentId === studentId
                );

                if (!exists) {
                    studentsData.push({
                        name: name,
                        studentId: studentId,
                        seatNumber: seatNumber,
                        scores: {},
                        totalScore: 0,
                        timestamp: new Date().toISOString()
                    });
                    count++;
                }
            });

            if (count > 0) {
                localStorage.setItem('studentsData', JSON.stringify(studentsData));
                updateStudentsList();
                showAlert(`从Excel成功导入${count}个学生！`, 'success');
            }
        };

        reader.readAsArrayBuffer(file);
    };

    input.click();
}

// 显示提示消息
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// 加载保存的数据
function loadSavedData() {
    // 加载试卷配置
    const savedExam = localStorage.getItem('currentExam');
    if (savedExam) {
        currentExam = JSON.parse(savedExam);
        // 如果有保存的配置，将其加载到编辑界面
        loadExamToEditForm();
    }

    // 加载学生数据
    const savedStudents = localStorage.getItem('studentsData');
    if (savedStudents) {
        studentsData = JSON.parse(savedStudents);
    }
}

// 将试卷配置加载到编辑表单
function loadExamToEditForm() {
    if (!currentExam) return;

    // 填充基本信息
    document.getElementById('subject').value = currentExam.subject || '';
    document.getElementById('exam-name').value = currentExam.examName || '';
    document.getElementById('class-name').value = currentExam.className || '';
    document.getElementById('total-score').value = currentExam.totalScore || '';

    // 清空现有题目
    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    questionCount = 0;

    // 重建题目
    if (currentExam.questions && currentExam.questions.length > 0) {
        currentExam.questions.forEach((question, index) => {
            addQuestion();
            const questionCard = container.children[index];

            // 设置题目类型
            const typeSelect = questionCard.querySelector('.question-type');
            typeSelect.value = question.type || 'normal';

            // 设置题目描述
            const descInput = questionCard.querySelector('.question-description');
            if (descInput) {
                descInput.value = question.description || '';
            }

            // 设置题目数量
            const countInput = questionCard.querySelector('.question-count');
            countInput.value = question.count || 1;

            // 设置题目分数
            const scoreInput = questionCard.querySelector('.question-score');
            scoreInput.value = question.score || 0;

            // 如果是分步评分题，设置步骤信息
            if (question.type === 'detailed' && question.steps) {
                // 这里可以添加更复杂的步骤设置逻辑
                // 目前先简化处理
            }
        });
    }

    // 更新预览
    setTimeout(() => {
        updatePreview();
    }, 100);
}

// 加载模板配置
function loadTemplate() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = function (e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const template = JSON.parse(e.target.result);

                // 验证模板格式
                if (!template.questions || !Array.isArray(template.questions)) {
                    throw new Error('模板格式不正确');
                }

                // 添加加载动画
                const container = document.getElementById('questions-container');
                container.innerHTML = '<div class="text-center p-4"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">加载中...</span></div><p class="mt-2">正在加载模板...</p></div>';

                setTimeout(() => {
                    // 填充表单
                    document.getElementById('subject').value = template.subject || '';
                    document.getElementById('exam-name').value = template.examName || '';
                    document.getElementById('class-name').value = template.className || '';
                    document.getElementById('total-score').value = template.totalScore || '';

                    // 清空并重建题目
                    container.innerHTML = '';
                    questionCount = 0;

                    template.questions.forEach(q => {
                        addQuestion();
                        const lastCard = document.querySelector('.question-card:last-child');
                        lastCard.querySelector('.question-type').value = q.type;
                        lastCard.querySelector('.question-count').value = q.count;
                        lastCard.querySelector('.question-score').value = q.score;
                        lastCard.querySelector('.question-desc').value = q.description || '';
                    });

                    updatePreview();
                    updateConfigProgress();

                    // 显示成功消息并自动保存
                    saveExamConfig();
                    showAlert('模板加载成功！配置已自动保存', 'success');

                }, 800); // 给用户足够的视觉反馈时间

            } catch (error) {
                showAlert('模板文件格式错误：' + error.message, 'danger');
            }
        };

        reader.readAsText(file);
    };

    input.click();
}

// 清除所有学生数据
function clearAllStudents() {
    if (studentsData.length === 0) {
        alert('当前没有学生数据可清除！');
        return;
    }

    const confirmMessage = `确定要清除所有 ${studentsData.length} 名学生的数据吗？\n此操作不可恢复！`;

    if (confirm(confirmMessage)) {
        studentsData = [];
        localStorage.removeItem('studentsData');

        updateStudentsList();
        updateStatistics();
        clearForm();

        showAlert('所有学生数据已清除！', 'warning');
    }
}

// 显示学生分班模态框
function showClassifyModal() {
    if (studentsData.length === 0) {
        alert('当前没有学生数据，请先录入学生信息！');
        return;
    }

    initClassifyModal();
    const modal = new bootstrap.Modal(document.getElementById('classifyModal'));
    modal.show();
}

// 初始化分班模态框
function initClassifyModal() {
    // 获取现有的班级信息
    const classes = getExistingClasses();

    // 生成班级列
    generateClassColumns(classes);
}

// 获取现有班级信息
function getExistingClasses() {
    const classMap = new Map();

    studentsData.forEach(student => {
        const className = student.className || '未分班';
        if (!classMap.has(className)) {
            classMap.set(className, []);
        }
        classMap.get(className).push(student);
    });

    return classMap;
}

// 生成班级列
function generateClassColumns(classMap) {
    const container = document.getElementById('class-columns');
    container.innerHTML = '';

    // 如果没有分班信息，创建默认的未分班列
    if (classMap.size === 0 || (classMap.size === 1 && classMap.has('未分班'))) {
        classMap.set('未分班', studentsData);
    }

    classMap.forEach((students, className) => {
        const columnDiv = document.createElement('div');
        columnDiv.className = 'col-md-4 mb-3';
        columnDiv.innerHTML = `
            <div class="card class-column" data-class="${className}">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h6 class="mb-0">${className}</h6>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary btn-sm" onclick="renameClass('${className}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${className !== '未分班' ? `
                        <button class="btn btn-outline-danger btn-sm" onclick="deleteClass('${className}')">
                            <i class="fas fa-trash"></i>
                        </button>
                        ` : ''}
                    </div>
                </div>
                <div class="card-body class-students" style="max-height: 200px; overflow-y: auto;" 
                     ondrop="dropStudent(event)" ondragover="allowDrop(event)">
                    ${generateStudentItems(students, className)}
                </div>
                <div class="card-footer text-muted small">
                    共 ${students.length} 人
                </div>
            </div>
        `;

        container.appendChild(columnDiv);
    });
}

// 生成学生项目
function generateStudentItems(students, className) {
    return students.map(student => {
        const studentId = `${student.name}_${student.studentId || ''}`;
        return `
            <div class="student-classify-item" draggable="true" 
                 data-student-id="${studentId}" 
                 data-current-class="${className}"
                 ondragstart="dragStudent(event)">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="check_${studentId}">
                    <label class="form-check-label" for="check_${studentId}">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>${student.name}</strong>
                                ${student.studentId ? `<small class="text-muted">${student.studentId}</small>` : ''}
                            </div>
                            <span class="badge bg-info">${student.totalScore || 0}分</span>
                        </div>
                    </label>
                </div>
            </div>
        `;
    }).join('');
}

// 创建新班级
function createNewClass() {
    const className = document.getElementById('new-class-name').value.trim();

    if (!className) {
        alert('请输入班级名称！');
        return;
    }

    // 检查班级是否已存在
    const existingClasses = getExistingClasses();
    if (existingClasses.has(className)) {
        alert('班级已存在！');
        return;
    }

    // 创建空班级
    existingClasses.set(className, []);
    generateClassColumns(existingClasses);

    // 清空输入框
    document.getElementById('new-class-name').value = '';

    showAlert(`班级"${className}"创建成功！`, 'success');
}

// 自动分班
function autoClassify(method) {
    if (studentsData.length === 0) {
        alert('没有学生数据！');
        return;
    }

    const classCount = parseInt(prompt('请输入要分成几个班级：', '2'));

    if (!classCount || classCount < 1 || classCount > studentsData.length) {
        alert('班级数量不正确！');
        return;
    }

    let sortedStudents = [...studentsData];

    // 根据方法排序
    switch (method) {
        case 'score':
            sortedStudents.sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));
            break;
        case 'name':
            sortedStudents.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
            break;
        case 'random':
            // Fisher-Yates 洗牌算法
            for (let i = sortedStudents.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [sortedStudents[i], sortedStudents[j]] = [sortedStudents[j], sortedStudents[i]];
            }
            break;
    }

    // 分配到班级
    const studentsPerClass = Math.ceil(sortedStudents.length / classCount);

    sortedStudents.forEach((student, index) => {
        const classIndex = Math.floor(index / studentsPerClass) + 1;
        student.className = `班级${classIndex}`;
    });

    // 重新生成分班界面
    const newClasses = getExistingClasses();
    generateClassColumns(newClasses);

    const methodNames = {
        'score': '成绩',
        'name': '姓名',
        'random': '随机'
    };

    showAlert(`按${methodNames[method]}自动分班完成！`, 'success');
}

// 拖拽相关函数
function dragStudent(event) {
    event.dataTransfer.setData("text/plain", event.target.dataset.studentId);
    event.dataTransfer.setData("source-class", event.target.dataset.currentClass);
}

function allowDrop(event) {
    event.preventDefault();
}

function dropStudent(event) {
    event.preventDefault();
    const studentId = event.dataTransfer.getData("text/plain");
    const sourceClass = event.dataTransfer.getData("source-class");
    const targetClass = event.currentTarget.closest('.class-column').dataset.class;

    if (sourceClass === targetClass) return;

    moveStudentToClass(studentId, sourceClass, targetClass);
}

// 移动学生到指定班级
function moveStudentToClass(studentId, sourceClass, targetClass) {
    const [name, id] = studentId.split('_');

    const student = studentsData.find(s => s.name === name && (s.studentId || '') === id);

    if (student) {
        student.className = targetClass;

        // 重新生成分班界面
        const newClasses = getExistingClasses();
        generateClassColumns(newClasses);

        showAlert(`学生"${name}"已移动到"${targetClass}"`, 'success');
    }
}

// 选择所有学生
function selectAllStudents() {
    const checkboxes = document.querySelectorAll('#classifyModal .form-check-input');
    checkboxes.forEach(checkbox => checkbox.checked = true);
}

// 清除选择
function clearSelection() {
    const checkboxes = document.querySelectorAll('#classifyModal .form-check-input');
    checkboxes.forEach(checkbox => checkbox.checked = false);
}

// 移动选中的学生
function moveSelected() {
    const selectedStudents = [];
    const checkboxes = document.querySelectorAll('#classifyModal .form-check-input:checked');

    if (checkboxes.length === 0) {
        alert('请先选择要移动的学生！');
        return;
    }

    checkboxes.forEach(checkbox => {
        const studentItem = checkbox.closest('.student-classify-item');
        selectedStudents.push({
            studentId: studentItem.dataset.studentId,
            currentClass: studentItem.dataset.currentClass
        });
    });

    // 获取可用的班级
    const classes = Array.from(getExistingClasses().keys());
    const targetClass = prompt('请输入目标班级名称：\n可用班级：' + classes.join(', '));

    if (!targetClass) return;

    if (!classes.includes(targetClass)) {
        // 如果班级不存在，询问是否创建
        if (confirm(`班级"${targetClass}"不存在，是否创建？`)) {
            // 创建新班级
        } else {
            return;
        }
    }

    // 移动选中的学生
    let movedCount = 0;
    selectedStudents.forEach(item => {
        moveStudentToClass(item.studentId, item.currentClass, targetClass);
        movedCount++;
    });

    showAlert(`成功移动 ${movedCount} 名学生到"${targetClass}"`, 'success');
}

// 重命名班级
function renameClass(oldName) {
    const newName = prompt('请输入新的班级名称：', oldName);

    if (!newName || newName === oldName) return;

    // 检查新名称是否已存在
    const existingClasses = getExistingClasses();
    if (existingClasses.has(newName)) {
        alert('班级名称已存在！');
        return;
    }

    // 更新所有学生的班级信息
    studentsData.forEach(student => {
        if (student.className === oldName) {
            student.className = newName;
        }
    });

    // 重新生成分班界面
    const newClasses = getExistingClasses();
    generateClassColumns(newClasses);

    showAlert(`班级"${oldName}"已重命名为"${newName}"`, 'success');
}

// 删除班级
function deleteClass(className) {
    if (className === '未分班') {
        alert('不能删除"未分班"！');
        return;
    }

    if (!confirm(`确定要删除班级"${className}"吗？\n班级中的学生将移到"未分班"。`)) {
        return;
    }

    // 将班级中的学生移到未分班
    studentsData.forEach(student => {
        if (student.className === className) {
            student.className = '未分班';
        }
    });

    // 重新生成分班界面
    const newClasses = getExistingClasses();
    generateClassColumns(newClasses);

    showAlert(`班级"${className}"已删除！`, 'warning');
}

// 保存分班信息
function saveClassification() {
    // 保存到本地存储
    localStorage.setItem('studentsData', JSON.stringify(studentsData));

    // 关闭模态框
    const modal = bootstrap.Modal.getInstance(document.getElementById('classifyModal'));
    modal.hide();

    // 更新学生列表显示
    updateStudentsList();

    showAlert('分班信息已保存！', 'success');
}

// 选择题快速赋分
function setChoiceScore(questionIndex, type) {
    const question = currentExam.questions[questionIndex];

    for (let i = 0; i < question.count; i++) {
        const subQuestionId = `q${questionIndex}_${i}`;
        const scoreValue = type === 'full' ? question.score : 0;

        // 设置单选按钮状态
        const correctRadio = document.getElementById(`${subQuestionId}_correct`);
        const wrongRadio = document.getElementById(`${subQuestionId}_wrong`);
        const hiddenInput = document.getElementById(subQuestionId);

        if (type === 'full') {
            correctRadio.checked = true;
            wrongRadio.checked = false;
        } else {
            correctRadio.checked = false;
            wrongRadio.checked = true;
        }

        hiddenInput.value = scoreValue;
    }

    calculateTotal();
    showAlert(`${type === 'full' ? '全对' : '全错'}设置完成！`, 'success');
}

// 详细题目快速赋分
function setDetailedScore(questionIndex, type) {
    const question = currentExam.questions[questionIndex];

    for (let i = 0; i < question.count; i++) {
        const subQuestionId = `q${questionIndex}_${i}`;
        const input = document.getElementById(subQuestionId);

        let scoreValue;
        switch (type) {
            case 'full':
                scoreValue = question.score;
                break;
            case 'good':
                scoreValue = Math.round(question.score * 0.8 * 2) / 2; // 80%分数，保留0.5的倍数
                break;
            case 'zero':
                scoreValue = 0;
                break;
        }

        input.value = scoreValue;

        // 清空分步评分
        const breakdownContainer = document.getElementById(`breakdown_q${questionIndex}_${i}`);
        if (breakdownContainer) {
            const breakdownInputs = breakdownContainer.querySelectorAll('.breakdown-input');
            breakdownInputs.forEach(input => input.value = '');
        }
    }

    calculateTotal();

    const typeNames = {
        'full': '满分',
        'good': '良好',
        'zero': '零分'
    };
    showAlert(`${typeNames[type]}设置完成！`, 'success');
}

// 普通题目快速赋分
function setNormalScore(questionIndex, type) {
    const question = currentExam.questions[questionIndex];

    for (let i = 0; i < question.count; i++) {
        const subQuestionId = `q${questionIndex}_${i}`;
        const input = document.getElementById(subQuestionId);
        const scoreValue = type === 'full' ? question.score : 0;

        input.value = scoreValue;
    }

    calculateTotal();
    showAlert(`${type === 'full' ? '满分' : '零分'}设置完成！`, 'success');
}

// 更新详细题目的总分
function updateDetailedTotal(questionIndex, subIndex) {
    const breakdownContainer = document.getElementById(`breakdown_q${questionIndex}_${subIndex}`);
    const mainInput = document.getElementById(`q${questionIndex}_${subIndex}`);

    if (!breakdownContainer || !mainInput) return;

    const breakdownInputs = breakdownContainer.querySelectorAll('.breakdown-input');
    let total = 0;

    breakdownInputs.forEach(input => {
        const value = parseFloat(input.value) || 0;
        total += value;
    });

    // 确保不超过最大分数
    const maxScore = parseFloat(mainInput.getAttribute('max')) || 0;
    total = Math.min(total, maxScore);

    mainInput.value = total.toFixed(1);
    calculateTotal();
}

// 重写计算总分函数以支持选择题
function calculateTotal() {
    if (!currentExam) return;

    let total = 0;

    // 处理选择题
    document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
        total += parseFloat(radio.value) || 0;
    });

    // 处理其他类型题目
    document.querySelectorAll('.score-input').forEach(input => {
        // 跳过选择题的隐藏输入框
        if (input.type === 'hidden') return;

        const value = parseFloat(input.value) || 0;
        total += value;
    });

    document.getElementById('current-total').textContent = total.toFixed(1);
}

// 重写收集成绩数据的函数
function collectScoreData() {
    const scores = {};

    currentExam.questions.forEach((question, qIndex) => {
        scores[`q${qIndex}`] = [];

        for (let i = 0; i < question.count; i++) {
            let score = 0;

            if (question.type === 'choice') {
                // 选择题：从单选按钮获取分数
                const checkedRadio = document.querySelector(`input[name="q${qIndex}_${i}"]:checked`);
                score = checkedRadio ? parseFloat(checkedRadio.value) || 0 : 0;
            } else {
                // 其他题型：从输入框获取分数
                const input = document.getElementById(`q${qIndex}_${i}`);
                score = input ? parseFloat(input.value) || 0 : 0;
            }

            scores[`q${qIndex}`].push(score);
        }
    });

    return scores;
}

// === 超现代化增强功能 ===

// 现代化加载覆盖层
function showLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'modern-loading-overlay';
    overlay.className = 'modern-loading-overlay';
    overlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">
                <div class="logo-icon">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <h2>ZenInk</h2>
                <p>智能阅卷系统</p>
            </div>
            <div class="loading-progress">
                <div class="progress-bar" id="loading-progress-bar"></div>
            </div>
            <div class="loading-text" id="loading-text">正在初始化系统...</div>
        </div>
    `;

    document.body.appendChild(overlay);

    // 模拟加载进度
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;

        const progressBar = document.getElementById('loading-progress-bar');
        const loadingText = document.getElementById('loading-text');

        if (progressBar) progressBar.style.width = progress + '%';

        if (loadingText) {
            const messages = [
                '正在初始化系统...',
                '加载用户界面...',
                '连接数据存储...',
                '优化性能...',
                '准备就绪...'
            ];
            loadingText.textContent = messages[Math.floor(progress / 20)] || '准备就绪...';
        }

        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 100);
}

function hideLoadingOverlay() {
    // 隐藏页面加载器
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        pageLoader.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // 隐藏现代化加载遮罩
    const overlay = document.getElementById('modern-loading-overlay');
    if (overlay) {
        overlay.classList.add('fade-out');
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 500);
    }
}

// 超现代化按钮点击效果
function addModernClickEffect(button) {
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'modern-ripple';

    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';

    button.appendChild(ripple);

    // 添加按钮动画类
    button.classList.add('button-clicked');

    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
        button.classList.remove('button-clicked');
    }, 600);
}

// 现代化输入框焦点效果
function addInputFocusEffect(input) {
    // 创建焦点指示器
    const indicator = document.createElement('div');
    indicator.className = 'input-focus-indicator';

    // 如果不存在则添加
    if (!input.parentElement.querySelector('.input-focus-indicator')) {
        input.parentElement.appendChild(indicator);

        // 动画效果
        setTimeout(() => {
            indicator.classList.add('active');
        }, 10);

        // 失焦时移除
        input.addEventListener('blur', function () {
            indicator.classList.remove('active');
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                }
            }, 300);
        }, { once: true });
    }
}

// 输入验证视觉反馈
function validateInput(input) {
    const value = input.value.trim();
    const parent = input.parentElement;

    // 移除之前的验证类
    parent.classList.remove('input-valid', 'input-invalid');

    if (input.hasAttribute('required')) {
        if (value) {
            parent.classList.add('input-valid');
            addValidationIcon(parent, 'check', 'success');
        } else {
            parent.classList.add('input-invalid');
            addValidationIcon(parent, 'times', 'error');
        }
    } else if (value) {
        parent.classList.add('input-valid');
        addValidationIcon(parent, 'check', 'success');
    }
}

function addValidationIcon(parent, icon, type) {
    // 移除现有图标
    const existingIcon = parent.querySelector('.validation-icon');
    if (existingIcon) {
        existingIcon.remove();
    }

    // 添加新图标
    const iconElement = document.createElement('i');
    iconElement.className = `fas fa-${icon} validation-icon validation-${type}`;
    parent.appendChild(iconElement);

    // 动画效果
    setTimeout(() => iconElement.classList.add('show'), 10);
}

// 导航栏现代化效果
function initializeNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // 滚动方向检测
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.classList.add('navbar-hidden');
        } else {
            navbar.classList.remove('navbar-hidden');
        }

        lastScrollY = currentScrollY;
    });
}

// 卡片悬浮效果
function initializeCardEffects() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.classList.add('card-elevated');

            // 添加光晕效果
            const glow = document.createElement('div');
            glow.className = 'card-glow';
            this.appendChild(glow);
        });

        card.addEventListener('mouseleave', function () {
            this.classList.remove('card-elevated');

            // 移除光晕效果
            const glow = this.querySelector('.card-glow');
            if (glow) {
                glow.remove();
            }
        });

        // 鼠标移动视差效果
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
}

// 自动保存系统
function initializeAutoSave() {
    let saveTimeout;
    const saveDelay = 2000; // 2秒延迟保存

    // 监听表单变化
    document.addEventListener('input', function (e) {
        if (e.target.matches('.form-control, .form-select')) {
            clearTimeout(saveTimeout);

            // 显示保存指示器
            showSaveIndicator('saving');

            saveTimeout = setTimeout(() => {
                autoSaveData();
                showSaveIndicator('saved');
            }, saveDelay);
        }
    });
}

function autoSaveData() {
    try {
        // 保存当前表单数据
        const formData = {
            subject: document.getElementById('subject')?.value || '',
            examDate: document.getElementById('exam-date')?.value || '',
            totalScore: document.getElementById('total-score')?.value || '',
            passingScore: document.getElementById('passing-score')?.value || '',
            questions: getQuestionsConfig(),
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('zenink-autosave', JSON.stringify(formData));
        console.log('数据已自动保存');

    } catch (error) {
        console.error('自动保存失败:', error);
        showSaveIndicator('error');
    }
}

function showSaveIndicator(status) {
    let indicator = document.getElementById('save-indicator');

    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'save-indicator';
        indicator.className = 'save-indicator';
        document.body.appendChild(indicator);
    }

    const icons = {
        saving: 'fa-spinner fa-spin',
        saved: 'fa-check',
        error: 'fa-exclamation-triangle'
    };

    const messages = {
        saving: '正在保存...',
        saved: '已保存',
        error: '保存失败'
    };

    const colors = {
        saving: '#2563eb',
        saved: '#10b981',
        error: '#ef4444'
    };

    indicator.innerHTML = `
        <i class="fas ${icons[status]}"></i>
        <span>${messages[status]}</span>
    `;

    indicator.style.backgroundColor = colors[status];
    indicator.classList.add('show');

    if (status !== 'saving') {
        setTimeout(() => {
            indicator.classList.remove('show');
        }, 2000);
    }
}

// 快捷键系统
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function (e) {
        // Ctrl+S 保存
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveCurrentData();
            showNotification('数据已保存', 'success');
        }

        // Ctrl+N 新建
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            showSection('exam-config');
            clearExamForm();
        }

        // Ctrl+E 导出
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            exportScores();
        }

        // F1 帮助
        if (e.key === 'F1') {
            e.preventDefault();
            showHelp();
        }

        // Esc 关闭模态框
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                const bsModal = bootstrap.Modal.getInstance(modal);
                if (bsModal) bsModal.hide();
            });
        }
    });
}

// 通知系统
function initializeNotificationSystem() {
    // 创建通知容器
    if (!document.getElementById('notifications-container')) {
        const container = document.createElement('div');
        container.id = 'notifications-container';
        container.className = 'notifications-container';
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'info', duration = 3000) {
    const container = document.getElementById('notifications-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${icons[type] || icons.info}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    container.appendChild(notification);

    // 显示动画
    setTimeout(() => notification.classList.add('show'), 10);

    // 自动隐藏
    if (duration > 0) {
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.parentElement.removeChild(notification);
                }
            }, 300);
        }, duration);
    }
}

// 主题检测
function initializeThemeDetection() {
    // 检测系统主题偏好
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function updateTheme(e) {
        if (e.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }

        // 更新图表主题
        updateChartsTheme(e.matches ? 'dark' : 'light');
    }

    // 初始检测
    updateTheme(mediaQuery);

    // 监听变化
    mediaQuery.addListener(updateTheme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('zenink-theme', newTheme);

    // 添加切换动画
    document.body.classList.add('theme-transition');
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 300);

    showNotification(`已切换到${newTheme === 'dark' ? '深色' : '浅色'}主题`, 'success');

    // 更新图表主题
    updateChartsTheme(newTheme);
}

// 性能监控
function initializePerformanceMonitoring() {
    // 监控页面加载性能
    window.addEventListener('load', function () {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;

            console.log(`页面加载完成，耗时: ${loadTime.toFixed(2)}ms`);

            // 如果加载时间过长，显示提示
            if (loadTime > 3000) {
                showNotification('页面加载较慢，建议检查网络连接', 'warning');
            }
        }, 100);
    });

    // 监控内存使用
    if ('memory' in performance) {
        setInterval(() => {
            const memory = performance.memory;
            const usedPercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;

            if (usedPercent > 90) {
                console.warn('内存使用率过高:', usedPercent.toFixed(2) + '%');
                showNotification('系统内存使用率较高，建议刷新页面', 'warning');
            }
        }, 30000); // 每30秒检查一次
    }
}

// 图表主题更新
function updateChartsTheme(theme) {
    // 如果有图表实例，更新其主题
    if (window.examChart) {
        const isDark = theme === 'dark';
        const textColor = isDark ? '#f8fafc' : '#0f172a';
        const gridColor = isDark ? '#334155' : '#e2e8f0';

        window.examChart.options.scales.y.ticks.color = textColor;
        window.examChart.options.scales.x.ticks.color = textColor;
        window.examChart.options.scales.y.grid.color = gridColor;
        window.examChart.options.scales.x.grid.color = gridColor;
        window.examChart.options.plugins.legend.labels.color = textColor;

        window.examChart.update();
    }
}

// 清除表单
function clearExamForm() {
    const form = document.getElementById('exam-form');
    if (form) {
        form.reset();

        // 清除动态生成的题目
        const questionsContainer = document.getElementById('questions-container');
        if (questionsContainer) {
            questionsContainer.innerHTML = '';
            questionCount = 0;
        }

        // 重置进度
        updateConfigProgress();

        showNotification('表单已清空', 'info');
    }
}

// 保存当前数据
function saveCurrentData() {
    try {
        const currentSection = document.querySelector('.section.active')?.id;

        if (currentSection === 'exam-config') {
            generateExam();
        } else if (currentSection === 'scoring') {
            saveScore();
        }

    } catch (error) {
        console.error('保存失败:', error);
        showNotification('保存失败: ' + error.message, 'error');
    }
}

// 显示帮助
function showHelp() {
    window.open('help.html', '_blank');
}

// 现代化节流函数
function modernThrottle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 现代化防抖函数
function modernDebounce(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// 现代化数据验证
function validateFormData(data) {
    const errors = [];

    if (!data.subject || data.subject.trim().length < 2) {
        errors.push('科目名称至少需要2个字符');
    }

    if (!data.examDate) {
        errors.push('请选择考试日期');
    }

    if (!data.totalScore || data.totalScore <= 0) {
        errors.push('总分必须大于0');
    }

    if (!data.questions || data.questions.length === 0) {
        errors.push('至少需要添加一道题目');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// 现代化错误处理
function handleError(error, context = '操作') {
    console.error(`${context}失败:`, error);

    const userMessage = error.message || '发生未知错误';
    showNotification(`${context}失败: ${userMessage}`, 'error');

    // 发送错误报告（如果需要）
    if (window.errorReporting) {
        window.errorReporting.report(error, context);
    }
}

// 现代化成功处理
function handleSuccess(message, data = null) {
    showNotification(message, 'success');

    if (data) {
        console.log('操作成功:', data);
    }

    // 触发成功事件
    document.dispatchEvent(new CustomEvent('zenink:success', {
        detail: { message, data }
    }));
}

// 现代化数据格式化
function formatModernData(data) {
    return {
        ...data,
        _id: generateId(),
        _timestamp: new Date().toISOString(),
        _version: '2.0',
        _checksum: calculateChecksum(data)
    };
}

function calculateChecksum(data) {
    // 简单的校验和计算
    const str = JSON.stringify(data);
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // 转换为32位整数
    }

    return Math.abs(hash).toString(16);
}

console.log('🚀 ZenInk 超现代化功能模块加载完成');

// ==================== 打印报表功能 ====================

let currentZoom = 1;

// 显示打印报表模态框
function showPrintReport() {
    // 检查是否有题目配置
    const questionsContainer = document.getElementById('questions-container');
    if (!questionsContainer.children.length) {
        showNotification('请先添加题目配置', 'warning');
        return;
    }

    const modal = new bootstrap.Modal(document.getElementById('printReportModal'));
    modal.show();

    // 默认生成答题卡预览
    setTimeout(() => {
        generateReportPreview();
    }, 300);
}

// 更新报表类型
function updateReportType() {
    const reportType = document.getElementById('report-type').value;
    const answerSheetOptions = document.getElementById('answer-sheet-options');
    const layoutOptions = document.getElementById('layout-options');

    // 根据报表类型显示/隐藏相关选项
    if (reportType === 'answer-sheet') {
        answerSheetOptions.style.display = 'block';
        layoutOptions.style.display = 'block';
    } else {
        answerSheetOptions.style.display = 'none';
        layoutOptions.style.display = reportType === 'score-sheet' ? 'block' : 'none';
    }

    generateReportPreview();
}

// 生成报表预览
function generateReportPreview() {
    const reportType = document.getElementById('report-type').value;
    const previewContainer = document.getElementById('print-preview');

    let previewHTML = '';

    switch (reportType) {
        case 'answer-sheet':
            previewHTML = generateAnswerSheetPreview();
            break;
        case 'score-sheet':
            previewHTML = generateScoreSheetPreview();
            break;
        case 'question-analysis':
            previewHTML = generateQuestionAnalysisPreview();
            break;
        case 'class-summary':
            previewHTML = generateClassSummaryPreview();
            break;
    }

    previewContainer.innerHTML = previewHTML;

    // 应用缩放
    const pages = previewContainer.querySelectorAll('.print-page');
    pages.forEach(page => {
        page.style.transform = `scale(${currentZoom})`;
    });
}

// 生成答题卡预览
function generateAnswerSheetPreview() {
    const subject = document.getElementById('subject').value || '科目名称';
    const examName = document.getElementById('exam-name').value || '考试名称';
    const className = document.getElementById('class-name').value || '班级名称';
    const includeHeader = document.getElementById('include-header').checked;
    const includeStudentInfo = document.getElementById('include-student-info').checked;
    const includeBarcode = document.getElementById('include-barcode').checked;
    const questionsPerRow = parseInt(document.getElementById('questions-per-row').value) || 5;

    // 收集所有题目信息
    const questions = collectQuestionsData();

    let html = `
        <div class="print-page answer-sheet">
            ${includeHeader ? `
                <div class="sheet-header">
                    <h2 class="exam-title">${examName}</h2>
                    <div class="exam-info">
                        <span>科目：${subject}</span>
                        <span>班级：${className}</span>
                        <span>满分：${calculateTotalScore()}分</span>
                    </div>
                </div>
            ` : ''}
            
            ${includeStudentInfo ? `
                <div class="student-info-section">
                    <div class="info-row">
                        <span>姓名：___________________</span>
                        <span>学号：___________________</span>
                        <span>考号：___________________</span>
                    </div>
                    ${includeBarcode ? '<div class="barcode-area"><div class="barcode-placeholder">||||||||||||||||||||||||</div></div>' : ''}
                </div>
            ` : ''}
            
            <div class="answer-sections">
                ${generateAnswerSections(questions, questionsPerRow)}
            </div>
            
            <div class="sheet-footer">
                <div class="attention-note">
                    <strong>注意事项：</strong><br>
                    1. 答题前请仔细阅读各题要求，在规定的答题区域内作答。<br>
                    2. 选择题请用2B铅笔填涂，填空题和解答题请用黑色签字笔书写。<br>
                    3. 保持答题卡清洁，不要折叠、污损。
                </div>
            </div>
        </div>
    `;

    return html;
}

// 生成答题区域
function generateAnswerSections(questions, questionsPerRow) {
    let html = '';
    let questionNum = 1;

    questions.forEach(question => {
        const { type, count, description, startNum } = question;

        html += `<div class="question-section">`;
        html += `<div class="section-title">${getQuestionTypeTitle(type)}（${description || ''}）</div>`;

        if (type === 'choice' || type === 'multiple') {
            // 选择题答题区域
            html += `<div class="choice-answer-area">`;
            for (let i = 0; i < count; i++) {
                if (i % questionsPerRow === 0) {
                    html += `<div class="choice-row">`;
                }

                const currentNum = startNum + i;
                html += `
                    <div class="choice-item">
                        <span class="question-num">${currentNum}</span>
                        <div class="choice-options">
                            <div class="choice-option"><span>A</span></div>
                            <div class="choice-option"><span>B</span></div>
                            <div class="choice-option"><span>C</span></div>
                            <div class="choice-option"><span>D</span></div>
                        </div>
                    </div>
                `;

                if ((i + 1) % questionsPerRow === 0 || i === count - 1) {
                    html += `</div>`;
                }
            }
            html += `</div>`;
        } else if (type === 'blank') {
            // 填空题答题区域
            html += `<div class="blank-answer-area">`;
            for (let i = 0; i < count; i++) {
                const currentNum = startNum + i;
                html += `
                    <div class="blank-item">
                        <span class="question-num">${currentNum}.</span>
                        <div class="blank-lines">
                            <div class="blank-line"></div>
                        </div>
                    </div>
                `;
            }
            html += `</div>`;
        } else {
            // 解答题答题区域
            html += `<div class="essay-answer-area">`;
            for (let i = 0; i < count; i++) {
                const currentNum = startNum + i;
                html += `
                    <div class="essay-item">
                        <div class="essay-header">
                            <span class="question-num">${currentNum}.</span>
                            <span class="score-box">（${question.score}分）</span>
                        </div>
                        <div class="essay-lines">
                            ${generateEssayLines(8)}
                        </div>
                    </div>
                `;
            }
            html += `</div>`;
        }

        html += `</div>`;
        questionNum += count;
    });

    return html;
}

// 生成解答题线条
function generateEssayLines(lineCount) {
    let lines = '';
    for (let i = 0; i < lineCount; i++) {
        lines += '<div class="essay-line"></div>';
    }
    return lines;
}

// 生成成绩统计表预览
function generateScoreSheetPreview() {
    const subject = document.getElementById('subject').value || '科目名称';
    const examName = document.getElementById('exam-name').value || '考试名称';
    const className = document.getElementById('class-name').value || '班级名称';
    const questions = collectQuestionsData();

    return `
        <div class="print-page score-sheet">
            <div class="sheet-header">
                <h2>${examName} - ${subject}成绩统计表</h2>
                <div class="class-info">班级：${className}</div>
            </div>
            
            <table class="score-table">
                <thead>
                    <tr>
                        <th rowspan="2">序号</th>
                        <th rowspan="2">姓名</th>
                        <th rowspan="2">学号</th>
                        ${questions.map((q, index) => `<th colspan="${q.count}">${getQuestionTypeTitle(q.type)}</th>`).join('')}
                        <th rowspan="2">总分</th>
                        <th rowspan="2">排名</th>
                    </tr>
                    <tr>
                        ${questions.map(q => {
        let cells = '';
        for (let i = 0; i < q.count; i++) {
            cells += `<th>${q.startNum + i}</th>`;
        }
        return cells;
    }).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${generateScoreTableRows(30)}
                </tbody>
            </table>
            
            <div class="score-statistics">
                <h4>成绩统计</h4>
                <div class="stats-grid">
                    <div class="stat-item">
                        <label>最高分：</label>
                        <span>___分</span>
                    </div>
                    <div class="stat-item">
                        <label>最低分：</label>
                        <span>___分</span>
                    </div>
                    <div class="stat-item">
                        <label>平均分：</label>
                        <span>___分</span>
                    </div>
                    <div class="stat-item">
                        <label>及格率：</label>
                        <span>___%</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 生成成绩表行
function generateScoreTableRows(studentCount) {
    let rows = '';
    for (let i = 1; i <= studentCount; i++) {
        const questions = collectQuestionsData();
        const totalQuestions = questions.reduce((sum, q) => sum + q.count, 0);

        rows += `
            <tr>
                <td>${i}</td>
                <td>学生${i}</td>
                <td>2024${String(i).padStart(3, '0')}</td>
                ${Array(totalQuestions).fill('<td></td>').join('')}
                <td></td>
                <td></td>
            </tr>
        `;
    }
    return rows;
}

// 生成题目分析报表预览
function generateQuestionAnalysisPreview() {
    const questions = collectQuestionsData();

    return `
        <div class="print-page analysis-sheet">
            <div class="sheet-header">
                <h2>题目分析报表</h2>
            </div>
            
            <div class="analysis-content">
                ${questions.map((question, index) => `
                    <div class="question-analysis">
                        <h4>${getQuestionTypeTitle(question.type)} (${question.startNum}-${question.startNum + question.count - 1}题)</h4>
                        <div class="analysis-stats">
                            <div class="stat-grid">
                                <div class="stat-item">
                                    <label>题目数量：</label>
                                    <span>${question.count}题</span>
                                </div>
                                <div class="stat-item">
                                    <label>单题分值：</label>
                                    <span>${question.score}分</span>
                                </div>
                                <div class="stat-item">
                                    <label>总分值：</label>
                                    <span>${question.count * question.score}分</span>
                                </div>
                                <div class="stat-item">
                                    <label>正确率：</label>
                                    <span>__%</span>
                                </div>
                            </div>
                        </div>
                        ${question.type === 'choice' || question.type === 'multiple' ? `
                            <div class="choice-analysis">
                                <h5>选项分析</h5>
                                <table class="choice-table">
                                    <thead>
                                        <tr>
                                            <th>题号</th>
                                            <th>A选项</th>
                                            <th>B选项</th>
                                            <th>C选项</th>
                                            <th>D选项</th>
                                            <th>正确率</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${Array(Math.min(question.count, 10)).fill(0).map((_, i) => `
                                            <tr>
                                                <td>${question.startNum + i}</td>
                                                <td>__%</td>
                                                <td>__%</td>
                                                <td>__%</td>
                                                <td>__%</td>
                                                <td>__%</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// 生成班级汇总报表预览
function generateClassSummaryPreview() {
    const subject = document.getElementById('subject').value || '科目名称';
    const examName = document.getElementById('exam-name').value || '考试名称';
    const totalScore = calculateTotalScore();

    return `
        <div class="print-page summary-sheet">
            <div class="sheet-header">
                <h2>${examName} - ${subject}班级汇总报表</h2>
            </div>
            
            <div class="summary-overview">
                <div class="overview-stats">
                    <div class="stat-card">
                        <h4>总体情况</h4>
                        <div class="stat-list">
                            <div class="stat-row">
                                <span>考试科目：</span>
                                <span>${subject}</span>
                            </div>
                            <div class="stat-row">
                                <span>满分分值：</span>
                                <span>${totalScore}分</span>
                            </div>
                            <div class="stat-row">
                                <span>参考人数：</span>
                                <span>___人</span>
                            </div>
                            <div class="stat-row">
                                <span>实考人数：</span>
                                <span>___人</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <h4>成绩分布</h4>
                        <div class="score-distribution">
                            <div class="score-range">
                                <span>90-100分：</span>
                                <span>___人 (____%)</span>
                            </div>
                            <div class="score-range">
                                <span>80-89分：</span>
                                <span>___人 (____%)</span>
                            </div>
                            <div class="score-range">
                                <span>70-79分：</span>
                                <span>___人 (____%)</span>
                            </div>
                            <div class="score-range">
                                <span>60-69分：</span>
                                <span>___人 (____%)</span>
                            </div>
                            <div class="score-range">
                                <span>60分以下：</span>
                                <span>___人 (____%)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="top-students">
                <h4>优秀学生</h4>
                <table class="top-table">
                    <thead>
                        <tr>
                            <th>排名</th>
                            <th>姓名</th>
                            <th>学号</th>
                            <th>得分</th>
                            <th>得分率</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Array(10).fill(0).map((_, i) => `
                            <tr>
                                <td>${i + 1}</td>
                                <td>学生${i + 1}</td>
                                <td>2024${String(i + 1).padStart(3, '0')}</td>
                                <td>___分</td>
                                <td>____%</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// 收集题目数据
function collectQuestionsData() {
    const questions = [];
    const questionCards = document.querySelectorAll('.question-card');

    questionCards.forEach(card => {
        const type = card.querySelector('.question-type').value;
        const count = parseInt(card.querySelector('.question-count').value) || 1;
        const score = parseFloat(card.querySelector('.question-score').value) || 0;
        const description = card.querySelector('.question-desc').value.trim();
        const startNum = parseInt(card.querySelector('.question-start').value) || 1;

        questions.push({
            type,
            count,
            score,
            description,
            startNum
        });
    });

    return questions;
}

// 获取题目类型标题
function getQuestionTypeTitle(type) {
    const typeNames = {
        'choice': '选择题',
        'multiple': '多选题',
        'blank': '填空题',
        'short': '简答题',
        'essay': '解答题'
    };
    return typeNames[type] || '题目';
}

// 计算总分
function calculateTotalScore() {
    const questions = collectQuestionsData();
    return questions.reduce((total, q) => total + (q.count * q.score), 0);
}

// 缩放功能
function zoomReport(delta) {
    currentZoom = Math.max(0.3, Math.min(2, currentZoom + delta));
    document.getElementById('zoom-level').textContent = Math.round(currentZoom * 100) + '%';

    const pages = document.querySelectorAll('.print-page');
    pages.forEach(page => {
        page.style.transform = `scale(${currentZoom})`;
    });
}

function resetZoom() {
    currentZoom = 1;
    document.getElementById('zoom-level').textContent = '100%';

    const pages = document.querySelectorAll('.print-page');
    pages.forEach(page => {
        page.style.transform = 'scale(1)';
    });
}

// 打印报表
function printReport() {
    const printContent = document.getElementById('print-preview').innerHTML;
    const originalContent = document.body.innerHTML;

    // 创建打印样式
    const printStyles = `
        <style>
            @media print {
                body { margin: 0; padding: 0; }
                .print-page { page-break-after: always; margin: 0; transform: none !important; }
                .print-page:last-child { page-break-after: auto; }
            }
        </style>
    `;

    document.body.innerHTML = printStyles + printContent;
    window.print();
    document.body.innerHTML = originalContent;

    // 重新初始化
    location.reload();
}

// 导出PDF (需要jsPDF库)
function downloadPDF() {
    showNotification('PDF导出功能开发中...', 'info');
    // TODO: 实现PDF导出功能
}

// 导出配置
function exportConfig() {
    const config = {
        examInfo: {
            subject: document.getElementById('subject').value,
            examName: document.getElementById('exam-name').value,
            totalScore: document.getElementById('total-score').value,
            className: document.getElementById('class-name').value
        },
        questions: collectQuestionsData(),
        timestamp: new Date().toISOString()
    };

    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `exam_config_${config.examInfo.subject}_${new Date().getTime()}.json`;
    link.click();

    showNotification('配置已导出', 'success');
}

// 填充所有答案
function fillAllAnswers(answer) {
    const selects = document.querySelectorAll('.answer-select');
    selects.forEach(select => {
        select.value = answer;
    });
}

// 随机填充所有答案
function randomizeAllAnswers() {
    const options = ['A', 'B', 'C', 'D'];
    const selects = document.querySelectorAll('.answer-select');
    selects.forEach(select => {
        const randomIndex = Math.floor(Math.random() * options.length);
        select.value = options[randomIndex];
    });
}

// 保存详细答案
function saveDetailedAnswers() {
    const modal = document.querySelector('.modal.show');
    const questionCardId = modal.getAttribute('data-question-card');
    const questionCard = document.querySelector(`[data-question-id="${questionCardId}"]`);

    if (!questionCard) return;

    const selects = modal.querySelectorAll('.answer-select');
    const answers = Array.from(selects).map(select => select.value);

    // 存储答案数据
    questionCard.setAttribute('data-answers', JSON.stringify(answers));

    // 更新预览
    const answerPreview = questionCard.querySelector('.answer-preview small');
    const preview = answers.slice(0, 10).join(' ') + (answers.length > 10 ? '...' : '');
    answerPreview.textContent = `答案预览：${preview}`;

    // 关闭模态框
    const bsModal = bootstrap.Modal.getInstance(modal);
    bsModal.hide();

    showNotification(`已保存${answers.length}题详细答案`, 'success');
}

// 加载演示配置
function loadDemoConfig() {
    // 填写基本信息
    document.getElementById('subject').value = '数学';
    document.getElementById('exam-name').value = '期末考试';
    document.getElementById('total-score').value = '100';
    document.getElementById('class-name').value = '高一(1)班';

    // 清空现有题目
    document.getElementById('questions-container').innerHTML = '';
    questionCount = 0;

    // 添加演示题目
    setTimeout(() => {
        // 选择题
        addQuestion();
        const choiceCard = document.querySelector('.question-card:last-child');
        choiceCard.querySelector('.question-type').value = 'choice';
        choiceCard.querySelector('.question-count').value = '10';
        choiceCard.querySelector('.question-score').value = '3';
        choiceCard.querySelector('.question-desc').value = '单项选择题';
        choiceCard.querySelector('.question-start').value = '1';
        updateQuestionType(choiceCard.querySelector('.question-type'));
        updateQuestionPreview(choiceCard);

        // 填空题
        addQuestion();
        const blankCard = document.querySelector('.question-card:last-child');
        blankCard.querySelector('.question-type').value = 'blank';
        blankCard.querySelector('.question-count').value = '5';
        blankCard.querySelector('.question-score').value = '4';
        blankCard.querySelector('.question-desc').value = '填空题';
        blankCard.querySelector('.question-start').value = '11';
        updateQuestionType(blankCard.querySelector('.question-type'));
        updateQuestionPreview(blankCard);

        // 解答题
        addQuestion();
        const essayCard = document.querySelector('.question-card:last-child');
        essayCard.querySelector('.question-type').value = 'essay';
        essayCard.querySelector('.question-count').value = '3';
        essayCard.querySelector('.question-score').value = '20';
        essayCard.querySelector('.question-desc').value = '解答题';
        essayCard.querySelector('.question-start').value = '16';
        updateQuestionType(essayCard.querySelector('.question-type'));
        updateQuestionPreview(essayCard);

        updatePreview();
        showNotification('演示配置已加载！包含选择题、填空题和解答题，可以测试折叠功能和打印报表', 'success');
    }, 100);
}

console.log('📄 打印报表功能模块加载完成');
