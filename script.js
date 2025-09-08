// 全局变量
let currentExam = null;
let studentsData = [];
let questionCount = 0;

// 页面初始化
document.addEventListener('DOMContentLoaded', function () {
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
});

// UI增强效果初始化
function initializeUIEnhancements() {
    // 添加页面加载动画
    document.body.classList.add('fade-in');
    
    // 为所有按钮添加点击效果
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn')) {
            addClickEffect(e.target);
        }
    });
    
    // 为表单输入添加焦点效果
    const inputs = document.querySelectorAll('.form-control, .form-select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focused');
        });
    });
    
    // 初始化进度条
    updateConfigProgress();
}

// 按钮点击效果
function addClickEffect(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
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
    questionCard.className = 'question-card fade-in';
    questionCard.innerHTML = `
        <div class="question-header">
            <div class="d-flex align-items-center">
                <span class="question-number">${questionCount}</span>
                <span class="ms-2 fw-bold">第${questionCount}题</span>
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="removeQuestion(this)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        
        <div class="row">
            <div class="col-md-4">
                <label class="form-label">题目类型</label>
                <select class="form-control question-type" onchange="updatePreview()">
                    <option value="choice">选择题</option>
                    <option value="blank">填空题</option>
                    <option value="short">简答题</option>
                    <option value="essay">大题/作文</option>
                </select>
            </div>
            <div class="col-md-4">
                <label class="form-label">题目数量</label>
                <input type="number" class="form-control question-count" value="1" min="1" max="50" onchange="updatePreview()">
            </div>
            <div class="col-md-4">
                <label class="form-label">每题分数</label>
                <input type="number" class="form-control question-score" value="5" min="0.5" step="0.5" onchange="updatePreview()">
            </div>
        </div>
        
        <div class="row mt-2">
            <div class="col-md-6">
                <label class="form-label">题目描述（可选）</label>
                <input type="text" class="form-control question-desc" placeholder="例：单选题、多选题等">
            </div>
            <div class="col-md-6">
                <div class="mt-4 pt-2">
                    <span class="badge bg-info question-total">小计：5分</span>
                </div>
            </div>
        </div>
    `;

    container.appendChild(questionCard);
    updatePreview();
}

// 删除题目
function removeQuestion(button) {
    if (confirm('确定删除这个题目吗？')) {
        button.closest('.question-card').remove();
        renumberQuestions();
        updatePreview();
    }
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
                            <div class="progress" role="progressbar" style="width: ${(segments.excellent/data.length*100)}%" aria-valuenow="${segments.excellent}" aria-valuemin="0" aria-valuemax="${data.length}">
                                <div class="progress-bar bg-success">优秀(${segments.excellent}人)</div>
                            </div>
                            <div class="progress" role="progressbar" style="width: ${(segments.good/data.length*100)}%" aria-valuenow="${segments.good}" aria-valuemin="0" aria-valuemax="${data.length}">
                                <div class="progress-bar bg-info">良好(${segments.good}人)</div>
                            </div>
                            <div class="progress" role="progressbar" style="width: ${(segments.average/data.length*100)}%" aria-valuenow="${segments.average}" aria-valuemin="0" aria-valuemax="${data.length}">
                                <div class="progress-bar bg-warning">中等(${segments.average}人)</div>
                            </div>
                            <div class="progress" role="progressbar" style="width: ${(segments.poor/data.length*100)}%" aria-valuenow="${segments.poor}" aria-valuemin="0" aria-valuemax="${data.length}">
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
            headers.push(`${question.description || '第'+(index+1)+'题'}(${question.score}分)`);
        } else {
            for (let i = 0; i < question.count; i++) {
                headers.push(`${question.description || '第'+(index+1)+'题'}-${i+1}(${question.score}分)`);
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
