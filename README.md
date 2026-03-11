# OpenClaw 教程站

这是一个基于 Astro Starlight 搭建的教程网站骨架，适合维护：

- 安装教程
- 使用教程
- 常见问题
- 功能页面
- 案例页面
- 本地服务页面

## 本地启动

先拉取仓库：

```bash
git clone https://github.com/ZhiBaiAI/openclaw.git
cd openclaw
```

再安装依赖并启动：

```bash
npm install
npm run dev
```

## 目录结构

```text
src/
  content/docs/docs/   # Starlight 文档内容，访问路径为 /docs/
  pages/               # 自定义页面：首页、功能页、案例页、服务页
```

## GitHub 自动部署

项目已包含 `.github/workflows/deploy.yml`。

使用 GitHub Pages 时：

1. 把项目推到 GitHub 仓库。
2. 在仓库 `Settings -> Pages` 中把 Source 设为 `GitHub Actions`。
3. 可选：在仓库 `Settings -> Secrets and variables -> Actions -> Variables` 中添加 `SITE_URL`。

## 发布前建议修改

- 补充 `src/content/docs/docs/` 下的实际教程内容。
- 补充 `src/pages/service.astro` 里的真实服务信息和联系方式。
