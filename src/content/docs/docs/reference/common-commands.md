---
title: 常用命令速查
description: 按安装后最常见的使用场景整理 OpenClaw 常用命令，并把每条命令什么时候用讲清楚。
---

这页不追求把命令列全，只保留安装完成后最常用、最容易马上用上的那几类。

如果你用的是 Windows，建议尽量在 WSL 里执行这些命令，环境会更稳一些。

## 刚装完先用哪几条

安装完成后，最常见的需求不是“继续折腾高级功能”，而是先确认：

- OpenClaw 到底有没有真正跑起来
- 后台 daemon 有没有装好
- 聊天入口和基础状态是不是正常

这一阶段最常用的是下面 5 条：

```bash
openclaw onboard --install-daemon
openclaw doctor
openclaw status
openclaw health
openclaw dashboard
```

### `openclaw onboard --install-daemon`

什么时候用：

- 安装脚本跑完了，但你不确定后台服务有没有装好
- 之前跳过了 onboarding，现在想补跑完整初始化
- 换了一台机器，想重新把 daemon 安装起来

它会做什么：

- 重新进入初始化流程
- 同时把后台 daemon 一并安装或补齐

怎么理解：

- 这条更像“重新把基础环境补完整”
- 不是日常高频命令，但在刚装完或重装时很常见

### `openclaw doctor`

什么时候用：

- 刚装完，想先做一轮快速自检
- 你觉得哪里不对，但还没判断出是配置问题、服务问题还是环境问题

它会做什么：

- 帮你做一轮快速诊断
- 适合当成排查入口

怎么理解：

- 如果你不知道先敲哪条，通常先敲 `openclaw doctor`
- 它的价值是“先帮你缩小问题范围”

### `openclaw status`

什么时候用：

- 想确认 OpenClaw 当前是不是在运行
- 想快速看整体状态，而不是深入看日志

它会做什么：

- 展示当前整体运行状态

怎么理解：

- 这是最适合日常先手检查的一条
- 如果你只是想知道“它现在活不活着”，先看 `openclaw status`

### `openclaw health`

什么时候用：

- `status` 看起来不够细，你想再确认健康状态
- 安装后准备做一次更可靠的健康检查

它会做什么：

- 给你一轮健康检查结果

怎么理解：

- `status` 更像看“现在是什么状态”
- `health` 更像看“现在健不健康”

### `openclaw dashboard`

什么时候用：

- 你不想只看命令行，想进可视化界面继续确认
- 需要从面板里看状态、配置或后续操作入口

它会做什么：

- 打开 OpenClaw 的可视化面板

怎么理解：

- 适合命令行自检之后，再进入图形界面继续看
- 如果命令行已经显示异常，先排障，再看 dashboard

## 聊天工具不回复时先怎么查

如果机器人之前能回复，后来突然不回复了，不要一上来就重装。先查日志、看状态，再决定要不要重启。

这一阶段最常用的是下面 4 条：

```bash
openclaw daemon logs
openclaw daemon restart
openclaw gateway status
openclaw gateway restart
```

建议顺序：

1. 先看 `openclaw daemon logs`
2. 再看 `openclaw gateway status`
3. 确认有异常后，再执行重启命令

### `openclaw daemon logs`

什么时候用：

- 聊天工具不回复
- 刚改完配置后怀疑启动报错
- 想知道后台到底报了什么错

它会做什么：

- 输出后台 daemon 的日志
- 帮你直接看到报错、告警或启动失败信息

怎么理解：

- 这是排障时最应该先看的命令之一
- 比起盲目重启，它更能告诉你问题到底在哪里

### `openclaw daemon restart`

什么时候用：

- 你刚改完配置，想让改动重新生效
- 后台进程疑似卡住了
- 看完日志后，判断确实需要重启后台服务

它会做什么：

- 重启 OpenClaw 的后台 daemon

怎么理解：

- 适合处理“后台服务这一层”的问题
- 如果你只是怀疑聊天入口异常，不一定第一步就用它

### `openclaw gateway status`

什么时候用：

- 你怀疑问题出在聊天渠道、接入层或网关
- daemon 看起来还活着，但消息收发不正常

它会做什么：

- 查看 gateway 当前状态

怎么理解：

- 这条更偏向检查“聊天入口这一层”
- 当 `status` 正常但聊天消息不通时，它很有用

### `openclaw gateway restart`

什么时候用：

- 你怀疑异常主要出在 gateway
- 改了渠道接入相关配置，想重启网关让它重新连一次

它会做什么：

- 重启 gateway

怎么理解：

- 这条更偏向处理接入渠道异常
- 如果问题更像是整体后台服务挂了，优先看 `daemon logs` 和 `daemon restart`

## 想改配置时，怎么选

这两条很容易混：

```bash
openclaw configure
openclaw onboard
```

### `openclaw configure`

什么时候用：

- 你只是想改一部分现有配置
- 比如换模型、改聊天渠道参数、补一些局部设置

它会做什么：

- 在现有配置基础上做修改

怎么理解：

- 这是“局部改配置”
- 日常改参数，优先用它

### `openclaw onboard`

什么时候用：

- 你想重新走完整向导
- 当前配置已经比较乱，宁可从头再过一遍

它会做什么：

- 重新进入完整 onboarding 流程

怎么理解：

- 这是“从头重走一遍”
- 如果你只是改一点参数，用它会显得太重

## 有新设备或配对请求时

```bash
openclaw nodes approve <device-name>
```

什么时候用：

- 新接入了一台手机、电脑或其他设备
- 聊天渠道里出现待批准的 pairing / 配对请求

它会做什么：

- 批准指定设备或节点接入

参数怎么填：

- `<device-name>` 换成待批准设备的名字

怎么理解：

- 这条不是每个人一开始都会用到
- 但只要你开始接多设备，它就会变成高频命令

## 开始做自动化后，再记这条

```bash
openclaw cron add --name "晨间简报" --cron "0 8 * * *" --system-event "生成晨间简报并发给我"
```

什么时候用：

- 你已经不满足于“被动聊天”
- 你希望 OpenClaw 按固定时间主动做事

它会做什么：

- 新增一条定时任务
- 到设定时间后，触发一条系统事件去执行任务

参数怎么理解：

- `--name`：这条任务的名字，方便你后面识别和维护
- `--cron`：执行时间，例子里的 `0 8 * * *` 表示每天早上 8 点
- `--system-event`：到了时间以后，要让 OpenClaw 执行的事情

适合哪些场景：

- 每天固定时间发晨报
- 定时汇总待办
- 周期性提醒某件事

怎么理解：

- 这条是“开始做自动化”的入口命令
- 如果你现在还在解决安装和接入问题，可以先不急着用

## 最容易混淆的 3 组命令

### `doctor`、`status`、`health`

- `openclaw doctor`：你还不知道问题在哪时，先做快速诊断
- `openclaw status`：你只想看当前整体状态
- `openclaw health`：你想看健康检查结果

更实用的记法是：

- 不知道先敲什么，先敲 `doctor`
- 只是想看它还在不在，敲 `status`
- 想看健不健康，敲 `health`

### `configure`、`onboard`

- `openclaw configure`：局部修改现有配置
- `openclaw onboard`：重新走完整向导

更实用的记法是：

- 小改动用 `configure`
- 从头再配用 `onboard`

### `daemon restart`、`gateway restart`

- `openclaw daemon restart`：更偏后台服务本身
- `openclaw gateway restart`：更偏聊天入口和接入层

更实用的记法是：

- 整体后台异常，先看 `daemon`
- 渠道接入异常，先看 `gateway`

## 入门阶段最值得先记住的 6 条

```bash
openclaw doctor
openclaw status
openclaw health
openclaw configure
openclaw daemon logs
openclaw daemon restart
```

大多数安装后问题，先从这 6 条开始查，通常已经够用。
