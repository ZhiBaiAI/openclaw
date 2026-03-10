---
title: Kimi / Moonshot 模型配置
description: 给 OpenClaw 接入 Moonshot API 时，推荐填写的 Key、接口地址和模型名。
---

如果你想在 OpenClaw 里接入 Kimi，先记住一件事：

Moonshot 开放平台里常用的 API 模型名，并不是直接填写 `kimi-2.5`。

对大多数用户来说，最省事的做法是直接使用 `kimi-latest`。

## 先准备 API Key

API Key 创建地址：

`https://platform.moonshot.cn/console/api-keys`

创建后记得当场复制保存，后面页面通常不会再完整展示一次。

## OpenClaw 里推荐这样填

如果你看到的是一组“兼容 OpenAI”的配置项，可以按下面填写：

- `API Key`：填你刚创建的 Moonshot Key
- `Base URL`：`https://api.moonshot.cn/v1`
- `Model`：`kimi-latest`

## 为什么推荐 `kimi-latest`

如果你想要更接近 Kimi 网页版当前体验，`kimi-latest` 是最适合先用的配置。

Moonshot 官方在 2025 年 2 月 17 日说明，`kimi-latest` 对标的是 Kimi 智能助手产品当前使用的最新版模型，模型名称保持不变，但能力会随着产品更新迭代。这个模型同时支持 128k 上下文、图片理解，以及和 `moonshot-v1` 系列一致的 ToolCalls、JSON Mode、Partial Mode、联网搜索等能力。  
来源：Moonshot 官方博客《为什么要推出 Kimi Latest 模型？》  
https://platform.moonshot.cn/blog/posts/kimi-latest

## 如果你更看重稳定性

如果你已经把提示词和流程调得比较稳定，不想因为模型能力更新而影响效果，可以改用 `moonshot-v1` 系列：

- `moonshot-v1-8k`
- `moonshot-v1-32k`
- `moonshot-v1-128k`

简单理解：

- 想接近 Kimi 当前网页版体验：优先用 `kimi-latest`
- 想让配置更稳定、提示词更少波动：优先用 `moonshot-v1-*`

## 不建议主模型直接用 `kimi-thinking-preview`

Moonshot 官方在 2025 年 5 月 6 日说明，`kimi-thinking-preview` 目前不支持 ToolCalls、JSON Mode、Partial 模式和 Context Caching。  
来源：Moonshot 官方博客《Kimi 长思考模型 API 正式发布》  
https://platform.moonshot.cn/blog/posts/kimi-thinking

对 OpenClaw 这类需要调用工具、执行流程的助手来说，这类限制会比较明显。

所以：

- 主模型不建议先用 `kimi-thinking-preview`
- 先把主模型跑通，再考虑后续单独测试推理模型

## 直接可抄的配置示例

```text
Provider: OpenAI Compatible
API Key: sk-xxxxxxxxxxxxxxxx
Base URL: https://api.moonshot.cn/v1
Model: kimi-latest
```

## 配好后怎么判断成功

满足下面三条，就说明模型接入基本没问题：

- `openclaw status` 和 `openclaw health` 没有明显异常
- 聊天工具里发一条简单消息，助手能正常回复
- 日志里没有连续出现鉴权失败或模型调用失败

## 常见问题

### 1. 为什么填了 `kimi-2.5` 还是不行

因为公开资料里常说的“Kimi 2.5”更像产品侧叫法，不是开放平台里常用的固定模型名。

先改成 `kimi-latest` 再试。

### 2. Key 填对了还是报错

优先检查这三项：

- Key 是否复制完整
- `Base URL` 是否写成了 `https://api.moonshot.cn/v1`
- 模型名是否写成了不存在的名称

### 3. 我该先选 `kimi-latest` 还是 `moonshot-v1-128k`

如果你刚开始用，先选 `kimi-latest`。

如果你后面发现提示词已经调顺，而且更在意稳定性，再换成 `moonshot-v1-*` 系列。
