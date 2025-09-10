/**
 * 考试管理器 - 负责试卷配置和题目管理
 */
class ExamManager {
    constructor(app) {
        this.app = app;
        this.currentExam = {
            title: '',
            questions: [],
            totalScore: 0,
            settings: {
                allowPartialScore: true,
                showStatistics: true
            }
        };
        this.questionTypes = [
            { value: 'choice', label: '选择题', icon: 'check-circle' },
            { value: 'multiple', label: '多选题', icon: 'check-square' },
            { value: 'fill', label: '填空题', icon: 'edit' },
            { value: 'short', label: '简答题', icon: 'align-left' },
            { value: 'essay', label: '解答题', icon: 'file-text' }
        ];
    }

    async init() {
        this.setupEventListeners();
        this.loadExamTemplate();
    }

    /**
     * 设置事件监听器
     */
    setupEventListeners() {
        // 添加题目按钮
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action="add-question"]')) {
                this.addQuestion();
            }
            if (e.target.matches('[data-action="remove-question"]')) {
                const questionId = e.target.getAttribute('data-question-id');
                this.removeQuestion(questionId);
            }
            if (e.target.matches('[data-action="toggle-question"]')) {
                const questionId = e.target.getAttribute('data-question-id');
                this.toggleQuestion(questionId);
            }
        });

        // 题目内容变更事件
        document.addEventListener('input', (e) => {
            if (e.target.matches('[data-question-field]')) {
                this.updateQuestionField(e.target);
            }
        });

        // 题目类型变更事件
        document.addEventListener('change', (e) => {
            if (e.target.matches('[data-question-type]')) {
                this.updateQuestionType(e.target);
            }
        });
    }

    /**
     * 添加新题目
     */
    addQuestion(type = 'choice') {
        const questionId = `q_${Date.now()}`;
        const question = {
            id: questionId,
            type: type,
            title: `第${this.currentExam.questions.length + 1}题`,
            score: 5,
            content: '',
            options: type === 'choice' || type === 'multiple' ? ['A', 'B', 'C', 'D'] : [],
            answer: '',
            analysis: '',
            settings: this.getDefaultQuestionSettings(type)
        };

        this.currentExam.questions.push(question);
        this.renderQuestion(question);
        this.updateExamStatistics();
        this.saveExam();

        // 滚动到新题目
        setTimeout(() => {
            const questionElement = document.getElementById(`question-${questionId}`);
            if (questionElement) {
                questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }

    /**
     * 移除题目
     */
    removeQuestion(questionId) {
        const ui = this.app.getModule('ui');

        if (confirm('确定要删除这道题目吗？')) {
            // 从数据中移除
            this.currentExam.questions = this.currentExam.questions.filter(q => q.id !== questionId);

            // 从DOM中移除
            const questionElement = document.getElementById(`question-${questionId}`);
            if (questionElement) {
                questionElement.classList.add('animate__animated', 'animate__fadeOutUp');
                setTimeout(() => {
                    questionElement.remove();
                    this.updateQuestionNumbers();
                    this.updateExamStatistics();
                }, 300);
            }

            this.saveExam();

            if (ui) {
                ui.showNotification('题目已删除', 'success');
            }
        }
    }

    /**
     * 切换题目展开/折叠状态
     */
    toggleQuestion(questionId) {
        const questionElement = document.getElementById(`question-${questionId}`);
        const contentElement = questionElement.querySelector('.question-content');
        const toggleIcon = questionElement.querySelector('.question-toggle-icon i');

        if (contentElement.style.display === 'none') {
            contentElement.style.display = 'block';
            contentElement.classList.add('animate__animated', 'animate__slideInDown');
            toggleIcon.classList.remove('fa-chevron-down');
            toggleIcon.classList.add('fa-chevron-up');
        } else {
            contentElement.style.display = 'none';
            toggleIcon.classList.remove('fa-chevron-up');
            toggleIcon.classList.add('fa-chevron-down');
        }
    }

    /**
     * 更新题目字段
     */
    updateQuestionField(element) {
        const questionId = element.getAttribute('data-question-id');
        const fieldName = element.getAttribute('data-question-field');
        const value = element.value;

        const question = this.currentExam.questions.find(q => q.id === questionId);
        if (question) {
            if (fieldName === 'score') {
                question[fieldName] = parseFloat(value) || 0;
                this.updateExamStatistics();
            } else {
                question[fieldName] = value;
            }
            this.saveExam();
        }
    }

    /**
     * 更新题目类型
     */
    updateQuestionType(element) {
        const questionId = element.getAttribute('data-question-id');
        const newType = element.value;

        const question = this.currentExam.questions.find(q => q.id === questionId);
        if (question) {
            question.type = newType;
            question.settings = this.getDefaultQuestionSettings(newType);

            // 重新渲染题目以适应新类型
            this.renderQuestion(question, true);
            this.saveExam();
        }
    }

    /**
     * 获取默认题目设置
     */
    getDefaultQuestionSettings(type) {
        const settings = {
            choice: {
                optionCount: 4,
                allowMultiple: false,
                randomOrder: false
            },
            multiple: {
                optionCount: 4,
                minSelect: 1,
                maxSelect: 4
            },
            fill: {
                blankCount: 1,
                caseSensitive: false,
                exactMatch: false
            },
            short: {
                maxLength: 200,
                keywordScoring: false
            },
            essay: {
                maxLength: 1000,
                rubricScoring: false
            }
        };

        return settings[type] || {};
    }

    /**
     * 渲染题目
     */
    renderQuestion(question, replace = false) {
        const container = document.getElementById('questions-container');
        if (!container) return;

        const questionHtml = this.generateQuestionHtml(question);

        if (replace) {
            const existingElement = document.getElementById(`question-${question.id}`);
            if (existingElement) {
                existingElement.outerHTML = questionHtml;
            }
        } else {
            container.insertAdjacentHTML('beforeend', questionHtml);
        }

        // 初始化新题目的事件监听器
        this.initializeQuestionEvents(question.id);
        // 初始化分数滑动条（如果函数存在于全局）
        if (typeof initializeScoreRanges === 'function') {
            try { initializeScoreRanges(); } catch (e) { console.warn('初始化分数滑动条失败', e); }
        }
    }

    /**
     * 生成题目HTML
     */
    generateQuestionHtml(question) {
        const questionType = this.questionTypes.find(t => t.value === question.type);
        const questionNumber = this.currentExam.questions.findIndex(q => q.id === question.id) + 1;

        return `
            <div id="question-${question.id}" class="question-card mb-4 animate__animated animate__fadeInUp">
                <div class="question-header" onclick="examManager.toggleQuestion('${question.id}')">
                    <div class="question-header-top">
                        <div class="question-title">
                            <div class="question-number">${questionNumber}</div>
                            <span>第${questionNumber}题</span>
                        </div>
                        <div class="question-controls">
                            <span class="question-type-badge">
                                <i class="fas fa-${questionType.icon}"></i>
                                ${questionType.label}
                            </span>
                            <button class="question-toggle-icon" data-action="toggle-question" data-question-id="${question.id}">
                                <i class="fas fa-chevron-up"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="question-content">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="form-group mb-3">
                                <label>题目类型</label>
                                <select class="form-select" data-question-type data-question-id="${question.id}">
                                    ${this.questionTypes.map(type =>
            `<option value="${type.value}" ${type.value === question.type ? 'selected' : ''}>
                                            ${type.label}
                                        </option>`
        ).join('')}
                                </select>
                            </div>

                            <div class="form-group mb-3">
                                <label>题目内容</label>
                                <textarea class="form-control" rows="3" 
                                    data-question-field="content" 
                                    data-question-id="${question.id}" 
                                    placeholder="请输入题目内容">${question.content}</textarea>
                            </div>

                            ${this.generateQuestionTypeSpecificHtml(question)}
                        </div>

                        <div class="col-md-4">
                            <div class="question-settings">
                                <div class="form-group mb-3">
                                    <label>分值</label>
                                    <input type="number" class="form-control" min="0" max="100" step="0.5"
                                        data-question-field="score" 
                                        data-question-id="${question.id}" 
                                        value="${question.score}">
                                </div>

                                <div class="form-group mb-3">
                                    <label>答案</label>
                                    <input type="text" class="form-control" 
                                        data-question-field="answer" 
                                        data-question-id="${question.id}" 
                                        value="${question.answer}" 
                                        placeholder="请输入正确答案">
                                </div>

                                <div class="form-group mb-3">
                                    <label>答案解析</label>
                                    <textarea class="form-control" rows="2" 
                                        data-question-field="analysis" 
                                        data-question-id="${question.id}" 
                                        placeholder="请输入答案解析">${question.analysis}</textarea>
                                </div>

                                <div class="question-actions">
                                    <button class="btn btn-outline-danger btn-sm" 
                                        data-action="remove-question" 
                                        data-question-id="${question.id}">
                                        <i class="fas fa-trash"></i> 删除题目
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 生成特定题目类型的HTML
     */
    generateQuestionTypeSpecificHtml(question) {
        switch (question.type) {
            case 'choice':
            case 'multiple':
                return this.generateChoiceOptionsHtml(question);
            case 'fill':
                return this.generateFillBlanksHtml(question);
            default:
                return '';
        }
    }

    /**
     * 生成选择题选项HTML
     */
    generateChoiceOptionsHtml(question) {
        const options = question.options || ['A', 'B', 'C', 'D'];
        return `
            <div class="form-group mb-3">
                <label>选项设置</label>
                <div class="choice-options">
                    ${options.map((option, index) => `
                        <div class="input-group mb-2">
                            <span class="input-group-text">${String.fromCharCode(65 + index)}</span>
                            <input type="text" class="form-control" 
                                data-question-field="option-${index}" 
                                data-question-id="${question.id}" 
                                value="${option}" 
                                placeholder="选项内容">
                        </div>
                    `).join('')}
                </div>
                <div class="mt-2">
                    <button class="btn btn-outline-primary btn-sm me-2" onclick="examManager.addOption('${question.id}')">
                        <i class="fas fa-plus"></i> 添加选项
                    </button>
                    <button class="btn btn-outline-danger btn-sm" onclick="examManager.removeOption('${question.id}')">
                        <i class="fas fa-minus"></i> 删除选项
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * 生成填空题HTML
     */
    generateFillBlanksHtml(question) {
        return `
            <div class="form-group mb-3">
                <label>填空设置</label>
                <div class="fill-settings">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" 
                            data-question-field="caseSensitive" 
                            data-question-id="${question.id}"
                            ${question.settings.caseSensitive ? 'checked' : ''}>
                        <label class="form-check-label">区分大小写</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" 
                            data-question-field="exactMatch" 
                            data-question-id="${question.id}"
                            ${question.settings.exactMatch ? 'checked' : ''}>
                        <label class="form-check-label">精确匹配</label>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 初始化题目事件监听器
     */
    initializeQuestionEvents(questionId) {
        // 这里可以添加特定题目的事件监听器
        // 比如选项的拖拽排序、实时预览等
    }

    /**
     * 更新题目序号
     */
    updateQuestionNumbers() {
        this.currentExam.questions.forEach((question, index) => {
            const questionElement = document.getElementById(`question-${question.id}`);
            if (questionElement) {
                const numberElement = questionElement.querySelector('.question-number');
                const titleElement = questionElement.querySelector('.question-title span');
                if (numberElement) numberElement.textContent = index + 1;
                if (titleElement) titleElement.textContent = `第${index + 1}题`;
            }
        });
    }

    /**
     * 更新考试统计信息
     */
    updateExamStatistics() {
        const totalQuestions = this.currentExam.questions.length;
        const totalScore = this.currentExam.questions.reduce((sum, q) => sum + (q.score || 0), 0);

        this.currentExam.totalScore = totalScore;

        // 更新UI显示
        const statsElement = document.getElementById('exam-statistics');
        if (statsElement) {
            statsElement.innerHTML = `
                <div class="stats-item">
                    <span class="stats-label">题目数量:</span>
                    <span class="stats-value">${totalQuestions}</span>
                </div>
                <div class="stats-item">
                    <span class="stats-label">总分:</span>
                    <span class="stats-value">${totalScore}</span>
                </div>
                <div class="stats-item">
                    <span class="stats-label">平均分:</span>
                    <span class="stats-value">${totalQuestions ? (totalScore / totalQuestions).toFixed(1) : 0}</span>
                </div>
            `;
        }
    }

    /**
     * 保存考试数据
     */
    saveExam() {
        this.app.updateState({ examData: this.currentExam });
    }

    /**
     * 加载考试模板
     */
    loadExamTemplate() {
        const savedExam = this.app.getState().examData;
        if (savedExam) {
            this.currentExam = savedExam;
            this.renderAllQuestions();
        } else {
            // 添加默认题目
            this.addQuestion();
        }
        this.updateExamStatistics();
    }

    /**
     * 渲染所有题目
     */
    renderAllQuestions() {
        const container = document.getElementById('questions-container');
        if (container) {
            container.innerHTML = '';
            this.currentExam.questions.forEach(question => {
                this.renderQuestion(question);
            });
        }
    }

    /**
     * 导出考试数据
     */
    exportExam() {
        const data = JSON.stringify(this.currentExam, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `exam_${new Date().getTime()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    }

    /**
     * 导入考试数据
     */
    importExam(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const examData = JSON.parse(e.target.result);
                this.currentExam = examData;
                this.renderAllQuestions();
                this.updateExamStatistics();
                this.saveExam();

                const ui = this.app.getModule('ui');
                if (ui) {
                    ui.showNotification('考试数据导入成功', 'success');
                }
            } catch (error) {
                const ui = this.app.getModule('ui');
                if (ui) {
                    ui.showNotification('考试数据格式错误', 'error');
                }
            }
        };
        reader.readAsText(file);
    }
}

// 导出
window.ExamManager = ExamManager;
