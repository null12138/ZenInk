// 演示数据和快速体验功能

// 数学模板 (选择+填空+解答) - 北京高考标准
const mathExamConfig = {
    subject: "高中数学",
    examName: "期末考试",
    className: "高三(1)班",
    totalScore: 150,
    calculatedTotal: 150,
    questions: [
        {
            id: 1,
            type: "choice",
            count: 10,
            score: 4,
            description: "单选题",
            total: 40
        },
        {
            id: 2,
            type: "normal",
            count: 5,
            score: 5,
            description: "填空题",
            total: 25
        },
        {
            id: 3,
            type: "detailed",
            count: 1,
            score: 15,
            description: "第16题 三角函数",
            steps: ["基本计算", "性质应用", "综合分析"],
            stepScores: [5, 5, 5],
            total: 15
        },
        {
            id: 4,
            type: "detailed",
            count: 1,
            score: 15,
            description: "第17题 立体几何",
            steps: ["空间位置关系", "建系计算", "综合应用"],
            stepScores: [5, 5, 5],
            total: 15
        },
        {
            id: 5,
            type: "detailed",
            count: 1,
            score: 15,
            description: "第18题 统计概率",
            steps: ["数据处理", "概率计算", "统计推断"],
            stepScores: [5, 5, 5],
            total: 15
        },
        {
            id: 6,
            type: "detailed",
            count: 1,
            score: 17,
            description: "第19题 数列",
            steps: ["通项公式", "数列求和", "数列应用", "综合分析"],
            stepScores: [4, 4, 4, 5],
            total: 17
        },
        {
            id: 7,
            type: "detailed",
            count: 1,
            score: 17,
            description: "第20题 解析几何",
            steps: ["基本性质", "轨迹方程", "最值问题", "综合应用"],
            stepScores: [4, 4, 4, 5],
            total: 17
        },
        {
            id: 8,
            type: "detailed",
            count: 1,
            score: 16,
            description: "第21题 函数导数",
            steps: ["函数性质", "导数应用", "参数讨论", "综合分析"],
            stepScores: [4, 4, 4, 4],
            total: 16
        }
    ],
    createdAt: new Date().toISOString()
};

// 语文模板 (基础+阅读+作文) - 北京高考标准
const chineseExamConfig = {
    subject: "高中语文",
    examName: "期末考试",
    className: "高三(2)班",
    totalScore: 150,
    calculatedTotal: 150,
    questions: [
        {
            id: 1,
            type: "detailed",
            count: 1,
            score: 18,
            description: "现代文阅读I",
            steps: ["信息筛选", "内容理解", "语言赏析", "主旨概括"],
            stepScores: [4, 5, 4, 5],
            total: 18
        },
        {
            id: 2,
            type: "detailed",
            count: 1,
            score: 12,
            description: "现代文阅读II",
            steps: ["文本理解", "手法分析", "情感把握"],
            stepScores: [4, 4, 4],
            total: 12
        },
        {
            id: 3,
            type: "detailed",
            count: 1,
            score: 20,
            description: "文言文阅读",
            steps: ["实词虚词", "句式翻译", "内容理解", "文化常识"],
            stepScores: [5, 5, 5, 5],
            total: 20
        },
        {
            id: 4,
            type: "detailed",
            count: 1,
            score: 8,
            description: "古诗词鉴赏",
            steps: ["内容理解", "手法赏析"],
            stepScores: [4, 4],
            total: 8
        },
        {
            id: 5,
            type: "detailed",
            count: 1,
            score: 6,
            description: "名句名篇默写",
            steps: ["课内默写", "课外延伸"],
            stepScores: [4, 2],
            total: 6
        },
        {
            id: 6,
            type: "detailed",
            count: 1,
            score: 16,
            description: "语言文字运用",
            steps: ["语言基础", "表达应用", "逻辑推理"],
            stepScores: [5, 6, 5],
            total: 16
        },
        {
            id: 7,
            type: "detailed",
            count: 1,
            score: 50,
            description: "写作",
            steps: ["立意准确", "结构完整", "语言表达", "创新亮点"],
            stepScores: [15, 15, 15, 5],
            total: 50
        },
        {
            id: 8,
            type: "detailed",
            count: 1,
            score: 20,
            description: "微写作",
            steps: ["内容要求", "表达方式", "语言运用"],
            stepScores: [8, 6, 6],
            total: 20
        }
    ],
    createdAt: new Date().toISOString()
};

// 英语模板 (听力+选择+作文) - 北京高考标准
const englishExamConfig = {
    subject: "高中英语",
    examName: "期末考试",
    className: "高三(3)班",
    totalScore: 150,
    calculatedTotal: 150,
    questions: [
        {
            id: 1,
            type: "choice",
            count: 15,
            score: 2,
            description: "听力理解",
            total: 30
        },
        {
            id: 2,
            type: "choice",
            count: 15,
            score: 2,
            description: "语法词汇",
            total: 30
        },
        {
            id: 3,
            type: "choice",
            count: 15,
            score: 2,
            description: "阅读理解",
            total: 30
        },
        {
            id: 4,
            type: "detailed",
            count: 1,
            score: 20,
            description: "七选五",
            steps: ["语篇理解", "逻辑关系", "语言连贯", "答案准确性"],
            stepScores: [5, 5, 5, 5],
            total: 20
        },
        {
            id: 5,
            type: "detailed",
            count: 1,
            score: 20,
            description: "应用文写作",
            steps: ["格式正确", "内容要点", "语言表达", "书写规范"],
            stepScores: [5, 8, 5, 2],
            total: 20
        },
        {
            id: 6,
            type: "detailed",
            count: 1,
            score: 20,
            description: "读后续写",
            steps: ["情节合理", "语言连贯", "词汇语法", "创意表达"],
            stepScores: [8, 6, 4, 2],
            total: 20
        }
    ],
    createdAt: new Date().toISOString()
};

// 理科模板 (选择+实验+计算) - 物理为例
const scienceExamConfig = {
    subject: "高中物理",
    examName: "期末考试",
    className: "高三(4)班",
    totalScore: 100,
    calculatedTotal: 100,
    questions: [
        {
            id: 1,
            type: "choice",
            count: 14,
            score: 3,
            description: "单选题",
            total: 42
        },
        {
            id: 2,
            type: "detailed",
            count: 1,
            score: 8,
            description: "第15题 实验题1",
            steps: ["实验原理", "数据处理", "误差分析"],
            stepScores: [3, 3, 2],
            total: 8
        },
        {
            id: 3,
            type: "detailed",
            count: 1,
            score: 9,
            description: "第16题 实验题2",
            steps: ["实验设计", "数据分析", "结论总结"],
            stepScores: [3, 4, 2],
            total: 9
        },
        {
            id: 4,
            type: "detailed",
            count: 1,
            score: 16,
            description: "第17题 力学计算",
            steps: ["受力分析", "运动过程", "数学计算", "结果讨论"],
            stepScores: [4, 4, 6, 2],
            total: 16
        },
        {
            id: 5,
            type: "detailed",
            count: 1,
            score: 17,
            description: "第18题 电学计算",
            steps: ["电路分析", "物理过程", "数学计算", "综合应用"],
            stepScores: [4, 5, 6, 2],
            total: 17
        },
        {
            id: 6,
            type: "detailed",
            count: 1,
            score: 8,
            description: "第19题 选考内容",
            steps: ["概念理解", "计算应用"],
            stepScores: [3, 5],
            total: 8
        }
    ],
    createdAt: new Date().toISOString()
};

// 生物试卷模板 (保持之前的配置)
const biologyExamConfig = {
    subject: "高中生物",
    examName: "期中考试",
    className: "高一(2)班",
    totalScore: 100,
    calculatedTotal: 100,
    questions: [
        {
            id: 1,
            type: "choice",
            count: 15,
            score: 2,
            description: "单选题",
            total: 30
        },
        {
            id: 2,
            type: "detailed",
            count: 1,
            score: 8,
            description: "第16题 实验分析题",
            steps: ["实验原理", "实验步骤", "结果分析", "结论"],
            stepScores: [2, 2, 2, 2],
            total: 8
        },
        {
            id: 3,
            type: "detailed",
            count: 1,
            score: 12,
            description: "第17题 遗传题",
            steps: ["基因型判断", "遗传图解", "概率计算", "结果分析"],
            stepScores: [3, 3, 3, 3],
            total: 12
        },
        {
            id: 4,
            type: "detailed",
            count: 1,
            score: 12,
            description: "第18题 生态题",
            steps: ["生态系统组成", "能量流动", "物质循环", "信息传递"],
            stepScores: [3, 3, 3, 3],
            total: 12
        },
        {
            id: 5,
            type: "detailed",
            count: 1,
            score: 13,
            description: "第19题 细胞分裂题",
            steps: ["减数分裂过程", "图像分析", "基因分离", "配子形成", "结论"],
            stepScores: [3, 3, 3, 2, 2],
            total: 13
        },
        {
            id: 6,
            type: "detailed",
            count: 1,
            score: 13,
            description: "第20题 调节题",
            steps: ["神经调节", "体液调节", "免疫调节", "综合分析", "实验设计"],
            stepScores: [3, 3, 3, 2, 2],
            total: 13
        },
        {
            id: 7,
            type: "detailed",
            count: 1,
            score: 12,
            description: "第21题 综合分析题",
            steps: ["现象描述", "原理分析", "实验设计", "预期结果"],
            stepScores: [3, 3, 3, 3],
            total: 12
        }
    ],
    createdAt: new Date().toISOString()
};

// 演示用学生数据
const demoStudentsData = [
    {
        name: "张三",
        studentId: "2021001",
        seatNumber: "1",
        scores: {
            q0: [4, 4, 4, 4, 0, 4, 4, 4, 4, 4],
            q1: [4, 4, 0, 4, 4],
            q2: [8, 9, 10, 7]
        },
        totalScore: 89,
        timestamp: new Date().toISOString()
    },
    {
        name: "李四",
        studentId: "2021002",
        seatNumber: "2",
        scores: {
            q0: [4, 4, 4, 4, 4, 4, 4, 0, 4, 4],
            q1: [4, 4, 4, 0, 4],
            q2: [9, 8, 9, 8]
        },
        totalScore: 90,
        timestamp: new Date().toISOString()
    }
];

// 加载数学模板
function loadMathTemplate() {
    if (confirm('这将加载数学试卷模板（北京高考标准150分），包含选择题、填空题和解答题。\n加载后您可以根据需要调整分数分配。\n确定要继续吗？')) {
        currentExam = mathExamConfig;
        localStorage.setItem('currentExam', JSON.stringify(currentExam));
        showAlert('数学试卷模板加载成功！您可以根据需要调整各题分数。', 'success');
        setTimeout(() => {
            showSection('exam-config');
            setTimeout(() => location.reload(), 100);
        }, 800);
    }
}

// 加载语文模板
function loadChineseTemplate() {
    if (confirm('这将加载语文试卷模板（北京高考标准150分），包含现代文阅读、文言文、古诗词和写作。\n加载后您可以根据需要调整分数分配。\n确定要继续吗？')) {
        currentExam = chineseExamConfig;
        localStorage.setItem('currentExam', JSON.stringify(currentExam));
        showAlert('语文试卷模板加载成功！您可以根据需要调整各题分数。', 'success');
        setTimeout(() => {
            showSection('exam-config');
            setTimeout(() => location.reload(), 100);
        }, 800);
    }
}

// 加载英语模板
function loadEnglishTemplate() {
    if (confirm('这将加载英语试卷模板（北京高考标准150分），包含听力、语法、阅读和写作。\n加载后您可以根据需要调整分数分配。\n确定要继续吗？')) {
        currentExam = englishExamConfig;
        localStorage.setItem('currentExam', JSON.stringify(currentExam));
        showAlert('英语试卷模板加载成功！您可以根据需要调整各题分数。', 'success');
        setTimeout(() => {
            showSection('exam-config');
            setTimeout(() => location.reload(), 100);
        }, 800);
    }
}

// 加载理科模板
function loadScienceTemplate() {
    if (confirm('这将加载理科试卷模板（以物理为例，100分），包含选择题、实验题和计算题。\n加载后您可以根据需要调整分数分配。\n确定要继续吗？')) {
        currentExam = scienceExamConfig;
        localStorage.setItem('currentExam', JSON.stringify(currentExam));
        showAlert('理科试卷模板加载成功！您可以根据需要调整各题分数。', 'success');
        setTimeout(() => {
            showSection('exam-config');
            setTimeout(() => location.reload(), 100);
        }, 800);
    }
}

// 加载生物模板
function loadBiologyTemplate() {
    if (confirm('这将加载生物试卷模板，包含15道选择题（每题2分）和6道分步评分大题（共70分）。\n加载后您可以根据需要调整分数分配。\n确定要继续吗？')) {
        currentExam = biologyExamConfig;
        localStorage.setItem('currentExam', JSON.stringify(currentExam));
        showAlert('生物试卷模板加载成功！您可以根据需要调整各题分数。', 'success');
        setTimeout(() => {
            showSection('exam-config');
            setTimeout(() => location.reload(), 100);
        }, 800);
    }
}

// 加载演示数据
function loadDemoData() {
    if (confirm('这将加载数学演示数据，包含试卷配置和学生成绩。\n确定要继续吗？\n（这不会覆盖您现有的数据）')) {
        currentExam = mathExamConfig;
        localStorage.setItem('currentExam', JSON.stringify(currentExam));

        const existingNames = studentsData.map(s => s.name);
        const newDemoData = demoStudentsData.filter(demo => !existingNames.includes(demo.name));

        if (newDemoData.length > 0) {
            studentsData.push(...newDemoData);
            localStorage.setItem('studentsData', JSON.stringify(studentsData));
        }

        location.reload();
    }
}

// 清除所有数据
function clearAllData() {
    if (confirm('确定要清除所有数据吗？\n这将删除试卷配置和所有学生成绩，且无法恢复！')) {
        localStorage.removeItem('currentExam');
        localStorage.removeItem('studentsData');
        showAlert('所有数据已清除！', 'warning');
        setTimeout(() => location.reload(), 1000);
    }
}

// 导出备份数据
function exportBackup() {
    const backupData = {
        exam: currentExam,
        students: studentsData,
        exportDate: new Date().toISOString(),
        version: "1.0"
    };

    const dataStr = JSON.stringify(backupData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `阅卷数据备份_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.json`;
    link.click();
}

// 导入备份数据
function importBackup() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = function (event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const backupData = JSON.parse(e.target.result);

                if (confirm('确定要导入备份数据吗？\n这将覆盖当前的试卷配置和学生成绩！')) {
                    if (backupData.exam) {
                        currentExam = backupData.exam;
                        localStorage.setItem('currentExam', JSON.stringify(currentExam));
                    }

                    if (backupData.students) {
                        studentsData = backupData.students;
                        localStorage.setItem('studentsData', JSON.stringify(studentsData));
                    }

                    showAlert('备份数据导入成功！', 'success');
                    setTimeout(() => location.reload(), 1000);
                }

            } catch (error) {
                alert('备份文件格式错误：' + error.message);
            }
        };

        reader.readAsText(file);
    };

    input.click();
}

// 在页面中插入模板按钮
function insertTemplateButtons() {
    // 查找试卷配置区域
    const examConfigSection = document.querySelector('#exam-config .card-body');
    if (!examConfigSection) return;

    // 创建模板按钮区域
    const templateContainer = document.createElement('div');
    templateContainer.className = 'mb-4';
    templateContainer.innerHTML = `
        <div class="alert alert-info">
            <h6><i class="fas fa-magic"></i> 快速模板</h6>
            <p class="mb-2 small">选择模板快速配置试卷结构（基于北京高考标准）</p>
            <div class="alert alert-light border p-2 mb-3">
                <small>
                    <i class="fas fa-lightbulb text-warning"></i> 
                    <strong>使用流程：</strong>
                    ① 点击模板按钮 → ② 根据需要调整分数 → ③ 保存配置 → ④ 开始登分
                </small>
            </div>
            <div class="template-buttons">
                <button class="btn btn-outline-primary btn-sm me-2 mb-2" onclick="loadMathTemplate()">
                    <i class="fas fa-calculator"></i> 数学模板 (选择+填空+解答)
                </button>
                <button class="btn btn-outline-success btn-sm me-2 mb-2" onclick="loadChineseTemplate()">
                    <i class="fas fa-book"></i> 语文模板 (基础+阅读+作文)
                </button>
                <button class="btn btn-outline-info btn-sm me-2 mb-2" onclick="loadEnglishTemplate()">
                    <i class="fas fa-globe"></i> 英语模板 (听力+选择+作文)
                </button>
                <button class="btn btn-outline-warning btn-sm me-2 mb-2" onclick="loadScienceTemplate()">
                    <i class="fas fa-atom"></i> 理科模板 (选择+实验+计算)
                </button>
                <button class="btn btn-outline-secondary btn-sm me-2 mb-2" onclick="loadBiologyTemplate()">
                    <i class="fas fa-leaf"></i> 生物模板 (选择+分步评分)
                </button>
            </div>
        </div>
    `;

    // 插入到试卷配置区域的开始
    examConfigSection.insertBefore(templateContainer, examConfigSection.firstChild);
}

// 添加演示按钮到导航栏
document.addEventListener('DOMContentLoaded', function () {
    // 插入模板按钮
    setTimeout(insertTemplateButtons, 500);

    // 在导航栏添加演示按钮
    const navbar = document.querySelector('.navbar-nav');
    if (navbar) {
        const demoDropdown = document.createElement('li');
        demoDropdown.className = 'nav-item dropdown';
        demoDropdown.innerHTML = `
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                演示数据
            </a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" onclick="loadDemoData()">
                    <i class="fas fa-play"></i> 加载数学演示数据
                </a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" onclick="exportBackup()">
                    <i class="fas fa-download"></i> 导出备份
                </a></li>
                <li><a class="dropdown-item" href="#" onclick="importBackup()">
                    <i class="fas fa-upload"></i> 导入备份
                </a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger" href="#" onclick="clearAllData()">
                    <i class="fas fa-trash"></i> 清除所有数据
                </a></li>
            </ul>
        `;

        const helpItem = navbar.querySelector('a[href="help.html"]')?.parentElement;
        if (helpItem) {
            navbar.insertBefore(demoDropdown, helpItem);
        } else {
            navbar.appendChild(demoDropdown);
        }
    }
});
