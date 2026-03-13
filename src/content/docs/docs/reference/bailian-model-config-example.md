---
title: 百炼平台模型配置示例
description: 百炼平台模型配置代码示例，包含按量付费和订阅付费两种写法，按原格式保留为代码块，便于直接对照填写。
---

下面这份文档整理两份百炼平台模型配置示例：

- 第 1 份：按量付费模式
- 第 2 份：订阅付费模式

出于安全原因，`apiKey` 已改成占位符或空值；本地工作目录也改成了通用示例路径。

## 按量付费示例

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

## 订阅付费示例

```ts
{
  models: {
    mode: 'merge',
    providers: {
      bailian: {
        baseUrl: 'https://coding.dashscope.aliyuncs.com/v1',
        apiKey: '',
        api: 'openai-completions',
        models: [
          {
            id: 'qwen3.5-plus',
            name: 'qwen3.5-plus',
            reasoning: false,
            input: ['text', 'image'],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 1000000,
            maxTokens: 65536,
            compat: {
              thinkingFormat: 'qwen'
            }
          },
          {
            id: 'qwen3-max-2026-01-23',
            name: 'qwen3-max-2026-01-23',
            reasoning: false,
            input: ['text'],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 262144,
            maxTokens: 65536,
            compat: {
              thinkingFormat: 'qwen'
            }
          },
          {
            id: 'qwen3-coder-next',
            name: 'qwen3-coder-next',
            reasoning: false,
            input: ['text'],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 262144,
            maxTokens: 65536
          },
          {
            id: 'qwen3-coder-plus',
            name: 'qwen3-coder-plus',
            reasoning: false,
            input: ['text'],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 1000000,
            maxTokens: 65536
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
            maxTokens: 16384,
            compat: {
              thinkingFormat: 'qwen'
            }
          },
          {
            id: 'glm-4.7',
            name: 'glm-4.7',
            reasoning: false,
            input: ['text'],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 202752,
            maxTokens: 16384,
            compat: {
              thinkingFormat: 'qwen'
            }
          },
          {
            id: 'kimi-k2.5',
            name: 'kimi-k2.5',
            reasoning: false,
            input: ['text', 'image'],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 262144,
            maxTokens: 32768,
            compat: {
              thinkingFormat: 'qwen'
            }
          }
        ]
      }
    }
  },
  agents: {
    defaults: {
      workspace: '/Users/yourname/.openclaw/workspace',
      model: {
        primary: 'bailian/kimi-k2.5'
      },
      models: {
        'bailian/qwen3.5-plus': {},
        'bailian/qwen3-max-2026-01-23': {},
        'bailian/qwen3-coder-next': {},
        'bailian/qwen3-coder-plus': {},
        'bailian/MiniMax-M2.5': {},
        'bailian/glm-5': {},
        'bailian/glm-4.7': {},
        'bailian/kimi-k2.5': {}
      }
    }
  },
  gateway: {
    mode: 'local'
  }
}
```
