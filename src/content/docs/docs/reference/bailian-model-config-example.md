---
title: 百炼平台模型配置示例
description: 百炼平台模型配置代码示例，按原格式保留为代码块，便于直接对照填写。
---

下面这段是百炼平台模型配置示例。

出于安全原因，`apiKey` 已改成占位符；除此之外，代码块格式保持不变。

```ts
  models: {
    mode: 'merge',
    providers: {
      bailian: {
        baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
        apiKey: 'YOUR_BAILIAN_API_KEY',
        api: 'openai-completions',
        models: [
          {
            id: 'qwen3.5-plus',
            name: 'qwen3.5-plus',
            reasoning: false,
            input: ['text', 'image'],
            contextWindow: 1000000,
            maxTokens: 65536
          },
          {
            id: 'kimi-k2.5',
            name: 'kimi-k2.5',
            reasoning: false,
            input: ['text', 'image'],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 262144,
            maxTokens: 32768
          },
          {
            id: 'MiniMax-M2.5',
            name: 'MiniMax-M2.5',
            reasoning: false,
            input: ['text'],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 196608,
            maxTokens: 32768
          },
          {
            id: 'glm-5',
            name: 'glm-5',
            reasoning: false,
            input: ['text'],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 202752,
            maxTokens: 16384
          },
        ]
      }
    }
  },
  agents: {
    defaults: {
      model: {
        primary: 'bailian/kimi-k2.5'
      },
      models: {
        'bailian/kimi-k2.5': {},
        'bailian/MiniMax-M2.5': {},
        'bailian/glm-5': {},
        'bailian/qwen3.5-plus': {},
      },
      workspace: '/root/.openclaw/workspace',
      compation: {
        mode: 'safeguard'
      },
    }
  },
```
