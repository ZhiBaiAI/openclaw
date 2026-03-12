---
title: 飞书多机器人虚拟团队教程
description: 用 5 个飞书机器人绑定 5 个 OpenClaw Agent，组建“老K、文小姐、小算、小信、尺子”虚拟团队的完整实操教程。
---

如果你想做的是“一个人带着 5 个虚拟成员一起干活”，而不是单独再加一个聊天入口，这篇教程就是按这个目标写的。

这套方案的底层结构是：

1. 5 个飞书应用 / 机器人入口
2. 5 个 `accountId`
3. 5 个 OpenClaw Agent
4. 5 套角色规则和工作目录

按 OpenClaw 官方飞书文档，多账号飞书机器人可以配置在 `channels.feishu.accounts` 下面；按 OpenClaw 官方多 Agent 文档，`bindings.match.accountId` 可以把不同账号路由给不同 Agent。

这意味着你不是在“硬凑”一个方案，而是在用 OpenClaw 官方已经支持的能力，把多机器人和多角色绑在一起。

## 这篇教程最后会搭出什么

你会得到一个 5 人虚拟团队：

| 角色 | 机器人名 | 职责定位 | 最适合接的任务 |
| --- | --- | --- | --- |
| 决策与统筹 | 老K | 理性、稳定、会安抚、能拆目标、能学上下文 | 项目统筹、优先级排序、节奏推进 |
| 文案与待办 | 文小姐 | 写文档、做纪要、拆待办、做时间管理 | SOP、会议纪要、任务清单、周计划 |
| 数据处理 | 小算 | 处理表格、清洗数据、做统计和结构化输出 | Excel/CSV、汇总、对比、报表 |
| 社交沟通 | 小信 | 写微信回复、对外沟通话术、推进消息 | 客户跟进、催办、安抚、礼貌回复 |
| 质量把关 | 尺子 | 挑错、做检查表、做最终验收 | 文档审校、交付复核、质量门禁 |

这 5 个角色最重要的不是名字，而是边界：

- 老K负责“拍板、统筹、压风险”
- 文小姐负责“写出来、排起来、跟起来”
- 小算负责“算明白、表清楚、口径一致”
- 小信负责“把话说出去”
- 尺子负责“最后挑毛病和放行”

如果你不给它们边界，最后 5 个机器人会越来越像，团队感就会消失。

## 先理解这套架构

最简单的映射关系就是 1:1：

```text
飞书机器人 老K      -> accountId: lao-k        -> Agent: lao-k
飞书机器人 文小姐    -> accountId: wen-xiaojie  -> Agent: wen-xiaojie
飞书机器人 小算      -> accountId: xiao-suan    -> Agent: xiao-suan
飞书机器人 小信      -> accountId: xiao-xin     -> Agent: xiao-xin
飞书机器人 尺子      -> accountId: chi-zi       -> Agent: chi-zi
```

这套映射的好处是：

- 消息入口分开
- 上下文分开
- 配对关系分开
- 角色规则分开
- 日志也更容易排查

对于“虚拟团队”这种用法，`accountId -> Agent` 的 1:1 绑定，是最稳的起点。

## 开始前你要准备什么

在开始之前，先确认你已经具备：

- 一台已经能稳定运行 OpenClaw 的机器
- 已完成 OpenClaw 基础安装
- 你有飞书开放平台权限，能创建企业自建应用
- 你能进入飞书开放平台
- 你愿意花一点时间把 5 个角色的规则分开写

如果你还没把 OpenClaw 单机器人跑通，建议先把单机器人接通，再回来做这篇。

## 第 1 步：先把角色名和 ID 一次性定好

不要边配置边想名字。先固定下面这套映射：

| 角色 | `accountId` | Agent ID | 飞书应用名建议 |
| --- | --- | --- | --- |
| 老K | `lao-k` | `lao-k` | `老K-决策统筹` |
| 文小姐 | `wen-xiaojie` | `wen-xiaojie` | `文小姐-文案待办` |
| 小算 | `xiao-suan` | `xiao-suan` | `小算-数据处理` |
| 小信 | `xiao-xin` | `xiao-xin` | `小信-社交沟通` |
| 尺子 | `chi-zi` | `chi-zi` | `尺子-质量把关` |

建议全程把下面几种名字对齐：

- 飞书应用名
- OpenClaw 的 `accountId`
- OpenClaw 的 Agent `id`
- 本地目录名

只要你把这些名字统一了，后面看日志、看配置和排错都会轻松很多。

## 第 2 步：在飞书开放平台创建 5 个应用

这一步要做 5 次，每个角色一个应用。

### 2.1 进入飞书开放平台

官方入口：

- 飞书中国大陆环境：`https://open.feishu.cn/app`
- 如果你用的是 Lark 国际版，则使用 Lark 对应入口，并在 OpenClaw 里把 `domain` 调整为对应值

### 2.2 创建企业自建应用

每个角色都按同样流程创建：

1. 点击“创建企业自建应用”
2. 输入应用名
3. 写一段角色简介
4. 选一个容易识别的图标

你可以直接用下面这组描述：

- 老K：负责项目统筹、优先级排序、风险识别和推进节奏
- 文小姐：负责文档、纪要、待办和时间管理
- 小算：负责数据清洗、统计和表格处理
- 小信：负责对外沟通文案和微信回复话术
- 尺子：负责质量审查、检查清单和最终把关

### 2.3 记下每个应用的凭证

在飞书应用后台里，记下每个应用的：

- `App ID`
- `App Secret`

后面 OpenClaw 的 5 个 `accountId` 都要各自填一组。

## 第 3 步：给 5 个应用统一打开机器人能力

这一段的操作，5 个应用都要做。

### 3.1 先启用机器人能力

在飞书应用后台里，把机器人能力打开。

### 3.2 权限按 OpenClaw 官方飞书文档来配

这里建议不要自己猜权限组合，直接以 OpenClaw 官方飞书文档为准。

如果你不想手点权限，优先使用官方飞书教程里给出的批量导入 JSON。至少要确保下面几类能力已经正确打开：

- 读取单聊消息
- 读取群聊消息
- 读取会话或群组信息
- 以机器人身份发送消息

这一步如果漏了，最容易出现这几类问题：

- 飞书里能发消息，但 OpenClaw 收不到
- 单聊正常，群聊不正常
- 能看到消息，但机器人回不出去

### 3.3 事件订阅按官方飞书教程配置

OpenClaw 官方飞书接入文档使用的是 WebSocket 事件模式。

这意味着：

- 你不需要自己先暴露一个公网 webhook
- 你应该优先走官方默认的 WebSocket 路线

如果你是第一次配飞书，强烈建议先别自己改成别的模式。

### 3.4 发布应用

很多人配到这里就卡住，是因为应用虽然创建了，但没有发布。

所以这一步要明确检查：5 个应用都已经发布完成，并且在企业内部可用。

## 第 4 步：先给 5 个 Agent 准备本地目录

既然你做的是长期虚拟团队，建议一开始就把目录拆开。

可以按下面这种结构准备：

```text
~/.openclaw/
  workspaces/
    lao-k/
    wen-xiaojie/
    xiao-suan/
    xiao-xin/
    chi-zi/
  agents/
    lao-k/agent/
    wen-xiaojie/agent/
    xiao-suan/agent/
    xiao-xin/agent/
    chi-zi/agent/
```

你可以这样理解：

- `workspace`：这个角色的工作现场
- `agentDir`：这个角色的行为规则所在位置

如果 5 个角色都写进同一个目录，后面你很快就会搞不清谁是谁。

## 第 5 步：把角色规则写进各自的 `AGENTS.md`

这一步是虚拟团队能不能真正分工的关键。

你可以在每个角色目录里放一份 `AGENTS.md`。下面给你一版能直接改的角色说明。

### 老K

```md
# 老K

你负责决策与统筹。

你的工作重点：
- 先判断目标，再拆分任务
- 明确优先级、风险和下一步
- 说话理性、稳定，必要时能安抚用户情绪
- 尽量主动补齐上下文，不要把用户反复推回去

你的边界：
- 不替代小算做复杂数据核算
- 不替代文小姐做正式长文输出
- 不替代尺子做最终放行
```

### 文小姐

```md
# 文小姐

你负责文案与待办。

你的工作重点：
- 把零散想法整理成文档
- 输出纪要、SOP、待办和时间表
- 让结果清楚、可复制、可执行

你的边界：
- 不拍板项目方向
- 不做复杂数据分析
- 不负责最终质量验收
```

### 小算

```md
# 小算

你负责数据处理。

你的工作重点：
- 清洗数据
- 整理表格
- 做分类、统计、汇总和结构化输出

你的边界：
- 不编造数据
- 不模糊区分“数据结果”和“业务判断”
- 不替代文案角色去写长篇对外文本
```

### 小信

```md
# 小信

你负责社交沟通。

你的工作重点：
- 拟写微信回复和对外沟通话术
- 调整语气，兼顾礼貌、边界和推进感
- 输出用户可以直接复制发送的短消息版本

你的边界：
- 你负责写回复，不代表你已经接入微信通道
- 涉及报价、承诺、合同或敏感承诺时，先提示用户确认
```

### 尺子

```md
# 尺子

你负责质量把关。

你的工作重点：
- 查错、挑漏、做检查清单
- 检查逻辑、格式、风险和一致性
- 在交付前给出是否通过的明确结论

你的边界：
- 你不是主执行人
- 你优先指出问题，而不是默认重写全部内容
```

## 第 6 步：把 5 个飞书机器人写进 OpenClaw 配置

如果你只接一个飞书机器人，使用向导很方便。

但你现在是 5 个机器人，**更推荐直接编辑 `~/.openclaw/openclaw.json`**，原因很现实：

- 你能一次看到全部账号
- 你能把 `accountId` 和 Agent 对齐
- 你能顺手把多 Agent 路由一起配完

下面是一份可以直接改的示例。

```json5
{
  channels: {
    feishu: {
      enabled: true,
      dmPolicy: "pairing",
      groupPolicy: "allowlist",
      requireMention: true,
      defaultAccount: "lao-k",

      accounts: {
        "lao-k": {
          appId: "cli_xxx_lao_k",
          appSecret: "replace_with_lao_k_secret",
          botName: "老K"
        },
        "wen-xiaojie": {
          appId: "cli_xxx_wen_xiaojie",
          appSecret: "replace_with_wen_xiaojie_secret",
          botName: "文小姐"
        },
        "xiao-suan": {
          appId: "cli_xxx_xiao_suan",
          appSecret: "replace_with_xiao_suan_secret",
          botName: "小算"
        },
        "xiao-xin": {
          appId: "cli_xxx_xiao_xin",
          appSecret: "replace_with_xiao_xin_secret",
          botName: "小信"
        },
        "chi-zi": {
          appId: "cli_xxx_chi_zi",
          appSecret: "replace_with_chi_zi_secret",
          botName: "尺子"
        }
      },

      groups: {
        "oc_team_lao_k": {
          allowFrom: ["ou_your_open_id"]
        },
        "oc_team_wen_xiaojie": {
          allowFrom: ["ou_your_open_id"]
        },
        "oc_team_xiao_suan": {
          allowFrom: ["ou_your_open_id"]
        },
        "oc_team_xiao_xin": {
          allowFrom: ["ou_your_open_id"]
        },
        "oc_team_chi_zi": {
          allowFrom: ["ou_your_open_id"]
        }
      }
    }
  },

  agents: {
    list: [
      {
        id: "lao-k",
        default: true,
        workspace: "/home/you/.openclaw/workspaces/lao-k",
        agentDir: "/home/you/.openclaw/agents/lao-k/agent"
      },
      {
        id: "wen-xiaojie",
        workspace: "/home/you/.openclaw/workspaces/wen-xiaojie",
        agentDir: "/home/you/.openclaw/agents/wen-xiaojie/agent"
      },
      {
        id: "xiao-suan",
        workspace: "/home/you/.openclaw/workspaces/xiao-suan",
        agentDir: "/home/you/.openclaw/agents/xiao-suan/agent"
      },
      {
        id: "xiao-xin",
        workspace: "/home/you/.openclaw/workspaces/xiao-xin",
        agentDir: "/home/you/.openclaw/agents/xiao-xin/agent"
      },
      {
        id: "chi-zi",
        workspace: "/home/you/.openclaw/workspaces/chi-zi",
        agentDir: "/home/you/.openclaw/agents/chi-zi/agent"
      }
    ]
  },

  bindings: [
    {
      agentId: "lao-k",
      match: {
        channel: "feishu",
        accountId: "lao-k"
      }
    },
    {
      agentId: "wen-xiaojie",
      match: {
        channel: "feishu",
        accountId: "wen-xiaojie"
      }
    },
    {
      agentId: "xiao-suan",
      match: {
        channel: "feishu",
        accountId: "xiao-suan"
      }
    },
    {
      agentId: "xiao-xin",
      match: {
        channel: "feishu",
        accountId: "xiao-xin"
      }
    },
    {
      agentId: "chi-zi",
      match: {
        channel: "feishu",
        accountId: "chi-zi"
      }
    }
  ]
}
```

这段配置里最关键的是 3 件事：

- `channels.feishu.accounts`：定义 5 个飞书机器人
- `agents.list`：定义 5 个角色
- `bindings.match.accountId`：把每个机器人入口固定路由到对应角色

如果你只配了 `accounts`，但没配 `bindings`，最后 5 个机器人可能还是跑到默认 Agent 上。

## 第 7 步：先重启网关，再逐个做最小验证

修改完配置后，先重启，再看日志：

```bash
openclaw gateway restart
openclaw gateway status
openclaw logs --follow
```

这时候不要急着拉大群，先做最小验证。

### 7.1 先验证 5 个机器人都能收到单聊

你自己分别给下面 5 个机器人各发一条最简单的消息：

- 老K
- 文小姐
- 小算
- 小信
- 尺子

你要看到的结果是：

- 飞书里能找到机器人
- 机器人能收到消息
- OpenClaw 日志里能看到对应的 `accountId`
- 回复能正常返回

### 7.2 再确认每个机器人是不是“像自己”

下面这些测试句可以直接用：

- 发给老K：`把今天的任务拆成优先级顺序，并告诉我先做什么`
- 发给文小姐：`把这段会议内容整理成待办和时间计划`
- 发给小算：`把这份客户表按金额和地区做汇总`
- 发给小信：`帮我写一段微信回复，礼貌但别太软`
- 发给尺子：`帮我检查这份方案里有哪些明显漏洞`

如果 5 个角色的回答越来越像，先不要怀疑飞书，多半是角色规则写得不够硬。

## 第 8 步：把群组结构设计好

不要一开始就把 5 个机器人全扔进一个大群。

更稳的结构是：

### 方案 A：5 个角色群 + 1 个总控群

建议至少建这些群：

- `项目-老K`
- `项目-文小姐`
- `项目-小算`
- `项目-小信`
- `项目-尺子`
- `项目-总控群`

推荐用法：

- 角色群：只放对应机器人和需要的人
- 总控群：只放你、老K，以及少量核心成员

### 方案 B：第一周只走单聊

如果你第一次做虚拟团队，这个更稳：

1. 第一周只用单聊
2. 等 5 个角色都稳定后，再逐步开群

这样更容易排查到底是：

- 飞书权限问题
- OpenClaw 路由问题
- 还是你自己的协作设计太复杂

## 第 9 步：怎么拿到群 ID 和用户 ID

后面你很可能会用到：

- 用户 Open ID：通常形如 `ou_xxx`
- 群 ID：通常形如 `oc_xxx`

最简单的做法是：

1. 先给机器人发一条消息，或者在群里 `@` 它
2. 打开 `openclaw logs --follow`
3. 观察日志里的会话对象

你拿到真实 ID 后，再回头填这些地方：

- `groups`
- `allowFrom`
- 更精细的 `bindings.match.peer.id`

## 第 10 步：什么时候该只用 `accountId`，什么时候再加 `peer`

这一点很关键。

### 一机器人一角色：先只用 `accountId`

像这篇教程这种设计：

- 老K机器人永远服务老K
- 文小姐机器人永远服务文小姐
- 小算机器人永远服务小算

这种 1:1 结构里，只用 `accountId` 是最清楚的。

### 同一机器人还要按群细分：再加 `peer`

只有在你未来想让“同一个机器人”在不同群里干不同角色时，才需要往 `bindings` 里继续加：

- `match.peer.kind`
- `match.peer.id`

新手阶段先不要把这层复杂度提前加进来。

## 第 11 步：这 5 人团队怎么真正用起来

下面是三套最常见的用法。

### 场景 1：开一个新项目

1. 先找老K：拆目标、定优先级、判断今天先做什么
2. 再找文小姐：把目标整理成计划、待办和时间表
3. 再找小算：如果有预算、表格、客户清单，就让它出结构化结果
4. 再找小信：把需要发给客户或同事的话术写出来
5. 最后找尺子：做一轮挑错和风险复核

### 场景 2：刚开完会，想马上落地

1. 把会议内容发给文小姐，让它整理纪要和待办
2. 把待办发给老K，让它重新排序
3. 把涉及数据的部分发给小算
4. 把对外沟通部分发给小信
5. 在真正发送或交付前，先过一遍尺子

### 场景 3：每天固定节奏

你可以把 5 个角色安排成一种固定班子：

- 早上找老K：今天重点是什么
- 中午找文小姐：待办更新到哪了
- 下午找小算：今天的数据和进度如何
- 傍晚找小信：该发出去的消息怎么写
- 晚上找尺子：今天交付有没有明显风险

## 第 12 步：最容易踩的坑

### 1. 5 个应用没发布

后台看着都配好了，但前台根本不好用。

### 2. 5 个角色共用同一套飞书凭证

真正的多机器人，是每个 `accountId` 都有自己独立的 `appId` 和 `appSecret`。

### 3. 只配多账号，不配多 Agent 路由

如果没有把 `accountId` 显式绑定到对应 Agent，5 个入口最后可能还是落到默认 Agent。

### 4. 角色规则写得太空

如果 `AGENTS.md` 只是写“你是一个聪明助手”，那 5 个机器人最后会越来越像。

### 5. 一开始就搞一个大群

这是最容易把系统弄乱的方式。多角色系统最怕消息边界不清。

### 6. 把“小信会写微信回复”误解成“已经接入微信通道”

小信的职责是社交沟通，不等于它已经拥有微信渠道接入能力。角色能力和通道能力要分开理解。

## 最后的建议

第一次搭这套虚拟团队，不要一上来就追求：

- 机器人自己互相讨论
- 机器人自己开会
- 机器人自己闭环全部任务

更稳的顺序通常是：

1. 先让 5 个角色都能独立稳定工作
2. 再由你自己做总调度
3. 最后再逐步增加角色间协作

这样你更容易知道问题出在：

- 飞书权限
- OpenClaw 路由
- 角色规则
- 还是工作流设计本身

## 官方参考

- OpenClaw 官方飞书文档  
  https://docs.openclaw.ai/zh-CN/channels/feishu
- OpenClaw 官方多 Agent 文档  
  https://docs.openclaw.ai/zh-CN/concepts/multi-agent
- OpenClaw 群组策略文档  
  https://docs.openclaw.ai/zh-CN/groups
- OpenClaw 配置参考  
  https://docs.openclaw.ai/zh-CN/gateway/configuration-reference
