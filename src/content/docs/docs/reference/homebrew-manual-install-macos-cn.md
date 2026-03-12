---
title: macOS 国内手动安装 Homebrew
description: 面向中国大陆网络环境整理的 Homebrew 手动安装办法，优先沿用官方安装逻辑，再配合国内镜像变量，降低 macOS 上安装失败的概率。
---

如果你在 macOS 上装 OpenClaw，最常见的前置卡点之一就是 Homebrew。

截至 2026 年 3 月 12 日，Homebrew 官方安装页给出的标准方式仍然是执行官方安装脚本；但在中国大陆网络环境里，卡在 GitHub、API 或 bottle 下载是很常见的。所以更稳的做法通常不是反复重试，而是：

1. 先装好 Xcode Command Line Tools
2. 给 Homebrew 配好国内镜像变量
3. 再执行安装

## 先准备命令行工具

先执行：

```bash
xcode-select --install
```

如果系统提示已经安装过，就可以继续下一步。

## 先给 Homebrew 配国内镜像变量

下面这组变量是国内常见可用的 USTC 镜像写法，作用分别是：

- `HOMEBREW_BREW_GIT_REMOTE`：Homebrew 主仓库镜像
- `HOMEBREW_CORE_GIT_REMOTE`：核心 formula 仓库镜像
- `HOMEBREW_BOTTLE_DOMAIN`：二进制 bottle 下载镜像
- `HOMEBREW_API_DOMAIN`：Homebrew API 镜像

先在当前终端里执行一次：

```bash
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"
```

如果你希望后续终端默认生效，再追加到 `~/.zprofile`：

```bash
echo 'export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"' >> ~/.zprofile
echo 'export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"' >> ~/.zprofile
echo 'export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"' >> ~/.zprofile
echo 'export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"' >> ~/.zprofile
source ~/.zprofile
```

## 再执行安装

优先还是走 Homebrew 官方安装脚本：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

这一步的核心思路是：**安装逻辑仍然来自官方脚本，但仓库、API 和 bottle 下载已经提前改成国内镜像**。

## 如果还是卡在官方脚本下载

有些机器不是卡在 Homebrew 仓库本身，而是卡在 `raw.githubusercontent.com`。

这种情况下，可以把 USTC 镜像页给出的安装脚本镜像当成备用入口：

```bash
/bin/bash -c "$(curl -fsSL https://mirrors.ustc.edu.cn/misc/brew-install.sh)"
```

这里只建议把它当成**下载入口兜底**，不是第一选择。能走官方脚本时，优先还是官方脚本。

## 安装后把 brew 加进 PATH

Homebrew 装完后，如果终端里还提示 `brew: command not found`，按你的机器架构补 PATH。

### Apple Silicon

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### Intel Mac

```bash
echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/usr/local/bin/brew shellenv)"
```

## 装完先做 3 个检查

```bash
brew --version
brew doctor
brew config
```

如果这三条都能正常返回，Homebrew 基本就已经可用了。

## 按情况执行：先补 Node.js 和 vips

这一步不是所有人都要做，但在 macOS 上装 OpenClaw 时，经常会遇到两类情况：

- 本机没有可用的 Node.js 22+
- 安装链路里涉及 `sharp`，而 `vips` / `libvips` 环境不完整

如果你想先把常见依赖补齐，可以直接执行：

```bash
brew install node
brew install vips
```

执行完后建议确认一下：

```bash
node -v
npm -v
brew list vips
```

如果 `node -v` 版本明显太旧，或者系统里根本没有 `node`，这一步通常值得先做。

## 按情况执行：把 npm 源临时切到国内

如果你卡在 `npm install -g openclaw@latest`，尤其是下载依赖特别慢、反复超时，常见做法是先临时切到国内 npm 镜像。

例如：

```bash
npm config set registry https://registry.npmmirror.com
```

装完后如果你想切回官方源，再执行：

```bash
npm config set registry https://registry.npmjs.org
```

这一步是**按情况执行**，不是必须长期保留。

## 按情况执行：临时关闭 npm strict-ssl

这一条风险比换镜像更高，所以只建议在你明确遇到证书校验异常时临时使用。

常见报错特征通常是：

- SSL certificate problem
- self signed certificate
- unable to verify the first certificate

如果你确认当前问题就是 npm 的证书校验卡住，而且只是想临时完成安装，可以先：

```bash
npm config set strict-ssl false
```

安装完成后，建议立刻恢复：

```bash
npm config set strict-ssl true
```

这一条不要默认长期关闭。更稳的顺序通常是：

1. 先换国内源
2. 还不行再排查证书问题
3. 实在卡住再短时间关闭 `strict-ssl`

## 按情况执行：全局安装 OpenClaw

如果前面的 Homebrew、Node.js 和 npm 环境都已经正常，可以直接安装：

```bash
npm install -g openclaw@latest
```

如果你正在国内网络环境里排错，这一步常见的组合是：

```bash
npm config set registry https://registry.npmmirror.com
npm install -g openclaw@latest
```

只有在你已经确认证书问题时，才考虑把 `strict-ssl` 临时调低后再装。

## 按情况执行：macOS 上 `sharp` 和全局 `libvips` 冲突

这一类问题在 macOS 上并不少见，尤其是你已经通过 Homebrew 全局装过 `vips` / `libvips`，而 `sharp` 在安装时又没有正确走它自己的预构建二进制。

如果你已经全局安装了 `libvips`，并且 `sharp` 安装失败，可以强制忽略全局 `libvips`，直接让它使用预构建二进制：

```bash
SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install -g openclaw@latest
```

这条命令的适用场景是：

- 你在 macOS 上已经用 Homebrew 安装过 `vips`
- `npm install -g openclaw@latest` 卡在 `sharp`
- 你怀疑是全局 `libvips` 和 `sharp` 的安装链路冲突

如果你没遇到 `sharp` 报错，就不需要先执行这条。

## 如果装完后又开始走 GitHub 慢地址

有时是安装时变量生效了，但仓库远程地址没有改好。可以手动检查并修正：

```bash
git -C "$(brew --repo)" remote -v
git -C "$(brew --repo homebrew/core)" remote -v
```

如果看到的不是国内镜像地址，可以改成：

```bash
git -C "$(brew --repo)" remote set-url origin https://mirrors.ustc.edu.cn/brew.git
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
```

然后再执行：

```bash
brew update
```

## 给 OpenClaw 用户的实际建议

如果你只是为了把 OpenClaw 先装起来，最省事的顺序通常是：

1. 先把 Homebrew 装通
2. 按情况补 `node` 和 `vips`
3. 如果 npm 下载慢，临时切国内源
4. 如果 `sharp` 和全局 `libvips` 冲突，再用 `SHARP_IGNORE_GLOBAL_LIBVIPS=1`
5. 再继续 OpenClaw 的安装脚本

不要在 Homebrew 还没装稳的时候，同时排查 Node.js、模型配置、聊天渠道和 OpenClaw 本体，否则很容易把问题混在一起。

## 来源

- Homebrew 官方安装页  
  https://docs.brew.sh/Installation
- Homebrew 官方仓库 Releases  
  https://github.com/Homebrew/brew/releases
- 中科大 USTC Homebrew 镜像帮助页  
  https://mirrors.ustc.edu.cn/help/brew.git.html
