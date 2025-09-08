# 🎯 ZenInk - 超现代化智能阅卷系统

<div align="center">

![ZenInk Logo](https://img.shields.io/badge/ZenInk-智能阅卷系统-blue?style=for-the-badge&logo=education)

[![GitHub Stars](https://img.shields.io/github/stars/null12138/ZenInk?style=flat-square)](https://github.com/null12138/ZenInk/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/null12138/ZenInk?style=flat-square)](https://github.com/null12138/ZenInk/network)
[![GitHub Issues](https://img.shields.io/github/issues/null12138/ZenInk?style=flat-square)](https://github.com/null12138/ZenInk/issues)
[![License](https://img.shields.io/github/license/null12138/ZenInk?style=flat-square)](https://github.com/null12138/ZenInk/blob/main/LICENSE)

*一个基于现代Web技术的智能阅卷系统，专为教师设计，支持快速录入成绩、智能分析和数据管理*

[🚀 在线体验](https://zenink.pages.dev) | [📖 使用文档](#使用指南) | [🐛 问题反馈](https://github.com/null12138/ZenInk/issues)

</div>

## ✨ 功能亮点

### 🎨 超现代化界面设计
- **毛玻璃效果** - 采用最新的Glassmorphism设计风格
- **流畅动画** - 丰富的微交互和过渡动画
- **响应式布局** - 完美适配桌面、平板、手机等各种设备
- **暗色主题** - 支持深色模式，保护视力
- **PWA支持** - 可安装为本地应用，离线使用

### 📋 智能试卷配置
- **🎯 可折叠题目卡片** - 新增折叠功能，界面更加简洁
- **📝 多题型支持** - 选择题、多选题、填空题、简答题、解答题
- **⚙️ 选择题特殊配置** - 选项数量设置（A-B到A-F）、评分方式选择
- **🔄 批量答案设置** - 全选A/B/C/D、随机生成、详细设置
- **📊 实时统计** - 题目数量、总分、平均分实时更新
- **💾 模板管理** - 保存/加载考试模板

### 🖨️ 专业打印报表系统
- **📄 答题卡样式** - 标准答题卡布局，包含学生信息栏、条形码区域
- **📊 成绩统计表** - 完整的成绩录入和统计表格
- **📈 题目分析报表** - 各题目的统计分析和选项分析
- **📋 班级汇总报表** - 班级整体成绩分布和排名
- **⚙️ 灵活配置** - 页面设置（A4/A3/Letter）、打印方向、布局参数
- **🔍 实时预览** - 缩放预览功能，所见即所得

### 🗄️ 在线数据库切换
- **☁️ 多模式支持** - 本地存储、云端数据库、混合模式
- **🔄 实时同步** - 自动数据同步和状态监控
- **💾 数据管理** - 完整的数据备份、恢复、导入导出功能
- **🔒 数据安全** - 本地加密存储，云端安全传输

### ⚡ 智能阅卷功能
- **🚀 快捷操作** - 一键满分、半分、零分、缺考
- **🧮 自动计算** - 实时计算总分，支持小数分数
- **📥 批量导入** - Excel导入学生名单和成绩
- **📤 多格式导出** - Excel、PDF、JSON等多种格式

### 📊 数据分析可视化
- **📈 Chart.js集成** - 美观的图表展示
- **📉 分数分布图** - 直观的分数段分布
- **🎯 各题分析** - 每题的平均分和得分率
- **📋 统计报告** - 完整的班级统计报告

## 🛠️ 技术栈

### 前端技术
- **HTML5** - 语义化标记
- **CSS3** - 现代CSS特性，CSS变量，Grid/Flexbox布局
- **JavaScript ES6+** - 模块化编程，异步处理
- **Bootstrap 5.3.2** - 响应式框架
- **Font Awesome 6.5.1** - 图标库
- **Chart.js 4.4.0** - 图表库

### 现代Web特性
- **Progressive Web App (PWA)** - 可安装的Web应用
- **Service Worker** - 离线缓存和后台同步
- **Web Storage API** - 本地数据持久化
- **CSS Grid & Flexbox** - 现代布局技术
- **CSS Custom Properties** - 动态主题切换

### 设计系统
- **Glassmorphism** - 毛玻璃效果设计风格
- **Material Design** - 符合Material设计规范
- **Responsive Design** - 移动优先的响应式设计
- **Accessibility** - 无障碍访问支持

## 🚀 快速开始

### 📦 安装运行

#### 方法一：直接下载
```bash
# 克隆仓库
git clone https://github.com/null12138/ZenInk.git

# 进入项目目录
cd ZenInk

# 启动本地服务器
python -m http.server 8080

# 或使用Node.js
npx serve .

# 或使用PHP
php -S localhost:8080
```

#### 方法二：在线部署
- **GitHub Pages** - 推送到`gh-pages`分支自动部署
- **Cloudflare Pages** - 连接GitHub仓库自动部署
- **Vercel** - 一键部署
- **Netlify** - 拖拽部署

### 🎯 使用指南

#### 1. 快速体验
- 访问网站后点击"快速演示"按钮
- 系统会自动加载示例配置
- 包含选择题、填空题、解答题等多种题型

#### 2. 创建考试
1. **基本信息** - 填写科目名称、考试名称、班级等
2. **题目配置** - 添加各种题型，设置分值
3. **选择题设置** - 配置选项数量、评分方式、答案
4. **保存模板** - 导出配置文件供下次使用

#### 3. 成绩录入
1. **导入学生** - 批量导入或手动添加学生
2. **录入成绩** - 逐项录入或批量导入
3. **快捷操作** - 使用快捷按钮提高效率
4. **实时统计** - 查看各项统计数据

#### 4. 打印报表
1. **选择类型** - 四种报表类型可选
2. **配置参数** - 页面设置、布局参数
3. **预览调整** - 实时预览，缩放查看
4. **打印导出** - 直接打印或导出PDF

## 🤝 贡献指南

我们欢迎任何形式的贡献！

### 🐛 报告问题
- 使用[GitHub Issues](https://github.com/null12138/ZenInk/issues)报告bug
- 请提供详细的重现步骤和环境信息

### 💡 功能建议
- 在Issues中提出新功能建议
- 详细描述功能需求和使用场景

### 🔧 代码贡献
```bash
# Fork项目
# 创建功能分支
git checkout -b feature/new-feature

# 提交更改
git commit -m "feat: 添加新功能"

# 推送分支
git push origin feature/new-feature

# 创建Pull Request
```

## 📄 许可证

本项目采用 [MIT 许可证](https://github.com/null12138/ZenInk/blob/main/LICENSE)

## 👨‍💻 作者

**null12138**
- GitHub: [@null12138](https://github.com/null12138)

## 🙏 致谢

感谢以下开源项目的支持：
- [Bootstrap](https://getbootstrap.com/) - 响应式CSS框架
- [Font Awesome](https://fontawesome.com/) - 图标库
- [Chart.js](https://www.chartjs.org/) - 图表库
- [SheetJS](https://sheetjs.com/) - Excel处理库

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给个Star支持一下！⭐**

Made with ❤️ by [null12138](https://github.com/null12138)

</div>
   - 构建命令：留空或 `echo "No build required"`
   - 构建输出目录：留空（使用根目录）
6. 点击"保存并部署"

#### 方法二：直接上传部署
1. 将所有文件打包为ZIP文件
2. 在Cloudflare Pages中选择"直接上传"
3. 上传ZIP文件并部署

## 💡 使用指南

### 1. 配置试卷结构
- 填写科目名称、考试名称、班级等基本信息
- 点击"添加题目"按钮添加题目
- 设置题目类型、数量、分值等参数
- 使用快速模板可以快速创建常见学科的试卷结构
- 点击"保存配置"完成设置

### 2. 录入学生成绩
- 在"登分"页面输入学生姓名、学号等信息
- 按照试卷结构逐题录入得分
- 使用快捷按钮可以快速填入特殊分数
- 点击"保存成绩"完成录入
- 支持修改已录入的学生成绩

### 3. 查看统计分析
- 在"统计"页面查看各项统计数据
- 查看分数分布图表和各题得分率
- 导出Excel格式的成绩单
- 打印纸质报表

## 🛠️ 技术栈

- **前端框架**：原生JavaScript + Bootstrap 5
- **图表库**：Chart.js
- **Excel处理**：SheetJS
- **UI组件**：Font Awesome图标
- **部署平台**：Cloudflare Pages
- **数据存储**：浏览器本地存储（LocalStorage）

## 📝 功能特色

### 🎯 快捷操作
- 一键满分、半分、零分填充
- 支持缺考标记
- 实时总分计算
- 快捷键支持

### 📋 数据管理
- 本地数据持久化存储
- 支持数据导入导出
- 批量学生名单导入
- Excel格式兼容

### 📈 统计功能
- 多维度成绩统计
- 可视化图表展示
- 各题得分率分析
- 分数段分布统计

### 🔧 实用工具
- 试卷模板系统
- 成绩单打印优化
- 数据备份恢复
- 操作历史记录

## 🌍 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📞 支持

如果你在使用过程中遇到问题，可以：
1. 查看本README文档
2. 提交Issue描述问题
3. 联系开发者获取帮助

---

**注意**：本系统使用浏览器本地存储保存数据，建议定期导出重要数据进行备份。
