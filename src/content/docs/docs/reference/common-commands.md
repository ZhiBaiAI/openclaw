---
title: 常用命令速查
description: 只保留安装后最常用的 OpenClaw 命令，并用一句话说明每条命令是做什么的。
---

这页只讲常用命令，不展开排障流程。

如果你用的是 Windows，建议尽量在 WSL 里执行这些命令，环境会更稳一些。

## 电脑重启后先执行

```bash
openclaw gateway restart
```

重启 OpenClaw 的 gateway。电脑关机或重启后，如果聊天工具不回复，通常先执行这条。

## 常用命令

```bash
openclaw status
```

查看 OpenClaw 当前整体运行状态。

```bash
openclaw health
```

查看 OpenClaw 当前健康检查结果。

```bash
openclaw doctor
```

做一轮快速诊断，适合不知道先查什么时先执行。

```bash
openclaw dashboard
```

打开 OpenClaw 的可视化面板。

```bash
openclaw daemon logs
```

查看后台 daemon 日志。

```bash
openclaw daemon restart
```

重启后台 daemon。

```bash
openclaw gateway status
```

查看 gateway 当前状态。

```bash
openclaw gateway restart
```

重启 gateway，常用于电脑重启后或聊天接入异常时。

```bash
openclaw configure
```

修改当前已有配置，适合局部改模型、渠道或其他参数。

```bash
openclaw onboard
```

重新进入完整初始化向导，适合从头再配一遍。

```bash
openclaw onboard --install-daemon
```

重新跑初始化，并安装或补齐后台 daemon。

```bash
openclaw nodes approve <device-name>
```

批准新的设备或 pairing 请求接入。

```bash
openclaw cron add --name "晨间简报" --cron "0 8 * * *" --system-event "生成晨间简报并发给我"
```

新增一条定时任务，让 OpenClaw 按固定时间主动执行事情。

## 入门阶段先记这几条

```bash
openclaw gateway restart
openclaw status
openclaw doctor
openclaw daemon logs
openclaw configure
openclaw daemon restart
```

大多数安装后问题，先从这几条开始看，通常已经够用。
