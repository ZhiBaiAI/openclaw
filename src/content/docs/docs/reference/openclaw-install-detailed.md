---
title: OpenClaw 安装详细教程
description: 结合 OpenClaw 官方安装文档整理的详细安装教程，包含安装器、手动安装、macOS 国内网络兜底、node、vips、npm 源、sharp 与 PATH 排错。
---

这篇教程适合下面几类人：

- 想按一篇文档从头把 OpenClaw 装好
- 不想只看“复制一条命令”就碰运气
- macOS 上经常卡在 Homebrew、npm、`sharp` 或 PATH
- 想知道官方推荐装法和手动装法分别适合什么场景

这篇内容按 2026 年 3 月 12 日的 OpenClaw 官方安装页整理，并把前面已经补过的 macOS 国内网络兜底技巧并在一起。

## 先说结论：大多数人应该怎么装

如果你没有特殊需求，优先使用 OpenClaw 官方安装器：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

这是官方推荐路径。原因很简单：

- 会自动安装 CLI
- 会进入新手引导
- 少走很多手动补依赖的弯路

如果你是 Windows，官方安装命令是：

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

如果你跳过了新手引导，后面可以手动执行：

```bash
openclaw onboard --install-daemon
```

## 系统要求

按官方安装页，当前基本要求是：

- `Node >= 22`
- `macOS`、`Linux`，或通过 `WSL2` 的 Windows
- 如果你要从源代码构建，才需要 `pnpm`

如果你的 Node 太旧，很多后面的报错其实都只是连锁反应。

## 安装前先选路径

OpenClaw 官方安装页给了 4 类常见方式：

1. 安装器脚本，官方推荐
2. 全局安装，适合已经有 Node 的用户
3. 从源代码安装，适合贡献者或开发者
4. 其他方式，如 Docker / Nix / Ansible / Bun

如果你的目标只是尽快用起来，优先选前两种。

## 方案一：官方安装器，最省事

### 标准安装

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

这条命令的作用是：

- 通过 npm 全局安装 `openclaw`
- 自动进入新手引导

### 查看安装器参数

如果你想先看看安装器支持什么参数：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --help
```

### 跳过新手引导

如果你只是想先装 CLI，不想当场跑 onboarding：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --no-onboard
```

后面再手动执行：

```bash
openclaw onboard --install-daemon
```

### 安装器适合谁

适合：

- 第一次安装 OpenClaw
- 不想自己逐个补依赖
- 希望官方推荐路径尽可能少踩坑

不太适合：

- 你要完全控制安装过程
- 你正在排查 npm / PATH / sharp 细节
- 你需要从源码开发

## 方案二：手动全局安装

如果你已经有符合要求的 Node.js，可以直接：

```bash
npm install -g openclaw@latest
```

装完后继续：

```bash
openclaw onboard --install-daemon
```

这是官方明确支持的手动安装方式。

## macOS 用户：先把 Homebrew 和基础依赖装稳

如果你是在 macOS 上安装，最常见的卡点不是 OpenClaw 本身，而是：

- Homebrew 装不上
- Node 不对
- `vips` / `libvips` 环境混乱
- npm 下载慢或证书报错
- `sharp` 安装失败

所以更稳的顺序通常是：

1. 先把 Homebrew 装通
2. 再补 Node 和可选的 `vips`
3. 再安装 OpenClaw

### 1. 先安装 Xcode Command Line Tools

```bash
xcode-select --install
```

如果系统提示已经安装过，就继续。

### 2. 如果 Homebrew 在国内网络里总失败，先用国内镜像变量

先在当前终端里执行：

```bash
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"
```

再执行官方安装脚本：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

如果你卡在 `raw.githubusercontent.com`，再考虑用 USTC 的安装脚本镜像兜底：

```bash
/bin/bash -c "$(curl -fsSL https://mirrors.ustc.edu.cn/misc/brew-install.sh)"
```

更详细的 Homebrew 单独教程可以看：
[macOS 国内手动安装 Homebrew](../reference/homebrew-manual-install-macos-cn/)

### 3. 给 macOS 补 Node 和可选的 vips

如果你本机还没有可用的 Node 22+，可以直接：

```bash
brew install node
```

如果你希望先把 `vips` 也补上，可以再执行：

```bash
brew install vips
```

这一步不是所有人都必须做，但在 macOS 上经常有用，尤其是后面遇到 `sharp` 相关问题时。

执行完后建议确认：

```bash
node -v
npm -v
brew list vips
```

### 4. 如果 npm 下载慢，临时切国内源

如果你卡在 `npm install -g openclaw@latest`，常见兜底是先切国内 npm 镜像：

```bash
npm config set registry https://registry.npmmirror.com
```

安装完成后，如果你想切回官方源：

```bash
npm config set registry https://registry.npmjs.org
```

这一步是按情况执行，不是必须长期保留。

### 5. 如果是证书报错，再临时处理 `strict-ssl`

这一步风险更高，不建议默认使用。只有在你明确遇到 npm 证书校验问题时，才临时处理。

如果报错是这类：

- `SSL certificate problem`
- `self signed certificate`
- `unable to verify the first certificate`

可以短时间：

```bash
npm config set strict-ssl false
```

装完后立刻恢复：

```bash
npm config set strict-ssl true
```

更稳的顺序是：

1. 先换国内源
2. 再检查证书问题
3. 实在卡住再临时关闭 `strict-ssl`

### 6. 如果 `sharp` 和全局 `libvips` 冲突

这是 OpenClaw 官方安装页明确提到的一个 macOS 常见问题。

如果你已经全局安装了 `libvips`，而 `sharp` 安装失败，可以强制忽略全局 `libvips`，直接使用预构建二进制：

```bash
SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install -g openclaw@latest
```

这一条很适合下面这种情况：

- 你在 macOS 上已经通过 Homebrew 装过 `vips`
- `npm install -g openclaw@latest` 卡在 `sharp`
- 你怀疑是系统 `libvips` 和 `sharp` 的构建链路冲突

如果你没有遇到 `sharp` 报错，就不需要先执行这条。

## 如果 `sharp` 提示缺少构建工具

官方安装页还提到了一个典型报错：

`sharp: Please add node-gyp to your dependencies`

这类问题的常见处理思路是：

1. 先确保 macOS 的 Xcode CLT 已安装
2. 再补：

```bash
npm install -g node-gyp
```

如果你不想走原生构建，也可以优先尝试：

```bash
SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install -g openclaw@latest
```

## 方案三：用 pnpm 全局安装

如果你习惯用 `pnpm`，官方也支持：

```bash
pnpm add -g openclaw@latest
pnpm approve-builds -g
pnpm add -g openclaw@latest
```

这里官方特别提醒了一点：`pnpm` 对带构建脚本的包需要手动批准。

第一次安装后如果你看到 “Ignored build scripts” 之类的提示，就执行：

```bash
pnpm approve-builds -g
```

批准后，再重新执行安装，让 postinstall 脚本真正跑起来。

然后继续：

```bash
openclaw onboard --install-daemon
```

## 方案四：从源代码安装

这条路更适合：

- 你要参与开发
- 你要看源码
- 你想自己构建

按官方安装页：

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
pnpm install
pnpm ui:build
pnpm build
openclaw onboard --install-daemon
```

如果你还没有全局安装 `openclaw`，可以用仓库命令方式：

```bash
pnpm openclaw ...
```

## 安装后第一时间做什么

按官方安装页，装完后建议先做这几件事：

```bash
openclaw onboard --install-daemon
openclaw doctor
openclaw status
openclaw health
openclaw dashboard
```

这几条的意义分别是：

- `openclaw onboard --install-daemon`：跑新手引导并安装 daemon
- `openclaw doctor`：做快速健康检查
- `openclaw status`：看当前状态
- `openclaw health`：看网关健康情况
- `openclaw dashboard`：打开仪表板

## 安装器还有哪些常用参数

如果你想更细粒度控制安装器，官方安装页给出的常用参数包括：

```bash
# 显式使用 npm
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --install-method npm

# 改成从 GitHub 源代码安装
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --install-method git
```

其他常用参数：

- `--install-method npm|git`
- `--git-dir <path>`
- `--no-git-update`
- `--no-prompt`
- `--dry-run`
- `--no-onboard`

对应的环境变量还有：

- `OPENCLAW_INSTALL_METHOD=git|npm`
- `OPENCLAW_GIT_DIR=...`
- `OPENCLAW_GIT_UPDATE=0|1`
- `OPENCLAW_NO_PROMPT=1`
- `OPENCLAW_DRY_RUN=1`
- `OPENCLAW_NO_ONBOARD=1`
- `SHARP_IGNORE_GLOBAL_LIBVIPS=0|1`

如果你在自动化、批量部署或 CI 里安装，这些参数就会很有用。

## 如果装完后提示找不到 `openclaw`

这是一个非常常见的问题，本质通常不是 OpenClaw 没装上，而是 shell 找不到全局 npm 的二进制路径。

按官方安装页，可以先检查：

```bash
node -v
npm -v
npm prefix -g
echo "$PATH"
```

如果 `$(npm prefix -g)/bin` 不在 `PATH` 里，就把它加进去。

### macOS / Linux

```bash
export PATH="$(npm prefix -g)/bin:$PATH"
```

建议再写入你的 shell 启动文件，例如：

- zsh：`~/.zshrc`
- bash：`~/.bashrc`

例如：

```bash
echo 'export PATH="$(npm prefix -g)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

然后重新开终端，或者执行 shell 刷新命令。

## 一套更稳的实际安装顺序

如果你现在就是想把 OpenClaw 稳稳装起来，而不是研究所有细节，我建议你按这个顺序走：

### Linux / WSL2

1. 确认 `Node >= 22`
2. 直接跑官方安装器
3. 执行 `openclaw doctor`
4. 再跑 `openclaw onboard --install-daemon`

### macOS

1. 先装 Xcode CLT
2. 先把 Homebrew 装通
3. 按情况 `brew install node`
4. 按情况 `brew install vips`
5. 如果 npm 下载慢，临时切国内源
6. 如果 `sharp` 报错，再尝试 `SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install -g openclaw@latest`
7. 装完后做 `openclaw doctor`

### Windows

1. 优先安装 WSL2
2. 尽量在 WSL 里按 Linux 路径安装
3. 如果你坚持原生 PowerShell，再走官方 PowerShell 安装脚本

## 什么时候该看哪篇文档

如果你遇到的是：

- macOS 下 Homebrew 卡住  
  看：[macOS 国内手动安装 Homebrew](../reference/homebrew-manual-install-macos-cn/)

- 只是想先装起来  
  先按这篇走官方安装器

- 多账号飞书、SOUL / USER / AGENTS、模型配置  
  那是安装之后的事，先不要和安装问题混在一起

## 参考来源

- OpenClaw 官方安装页  
  https://docs.openclaw.ai/zh-CN/install
- OpenClaw 官方安装器内部机制  
  https://docs.openclaw.ai/zh-CN/install/how-installer-works
- OpenClaw 官方更新页  
  https://docs.openclaw.ai/zh-CN/install/update
- OpenClaw 官方卸载页  
  https://docs.openclaw.ai/zh-CN/install/uninstall
