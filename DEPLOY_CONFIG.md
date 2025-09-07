# ZenInk 部署配置说明

## Cloudflare Pages 部署问题解决方案

### 当前状态
- ✅ 项目已上传到 GitHub: https://github.com/null12138/ZenInk
- ✅ 创建了 `wrangler.jsonc` 配置文件
- ⚠️  正在解决 Cloudflare 构建系统的部署问题

### 配置文件说明

#### `wrangler.jsonc`
```json
{
  "name": "zenink",
  "compatibility_date": "2025-09-07", 
  "assets": {
    "directory": "."
  }
}
```

这个文件告诉 Cloudflare Pages：
- 项目名称为 "zenink"
- 使用最新的兼容性日期
- 静态资源位于当前目录（"."）

### 部署建议

#### 方案一：通过 Cloudflare Dashboard（推荐）
1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 转到 Pages 部分
3. 创建项目 → 连接到 Git → 选择 GitHub 仓库
4. 构建设置：
   - 框架预设：`None` 或 `Static HTML`
   - 构建命令：留空
   - 构建输出目录：`/`

#### 方案二：修复 Wrangler CLI
如果你想使用命令行部署，需要：
1. 安装 Node.js (版本 16 或更高)
2. 安装 Wrangler: `npm install -g wrangler`
3. 登录: `wrangler login`
4. 部署: `wrangler deploy --assets=.`

### 文件结构验证
确保这些文件存在于根目录：
- ✅ `index.html` - 主页面
- ✅ `script.js` - 核心逻辑  
- ✅ `styles.css` - 样式文件
- ✅ `demo.js` - 模板数据
- ✅ `wrangler.jsonc` - 部署配置
- ✅ `_headers` - 安全头配置
- ✅ `_redirects` - 重定向规则

### 预期结果
部署成功后，你的 ZenInk 系统将可通过以下方式访问：
- 默认域名：`https://zenink.pages.dev`
- 或自定义域名

### 故障排除
- 如果构建失败，请检查所有文件是否已推送到 GitHub
- 确保 `index.html` 在项目根目录
- 检查 Cloudflare Pages 的构建日志获取详细错误信息
