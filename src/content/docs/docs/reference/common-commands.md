---
title: 常用命令速查
description: 把最常见的安装后管理命令集中放在一起，方便随时查。
---

这页适合在你已经完成安装以后收藏起来。

## 查看当前状态

```bash
openclaw status
openclaw health
openclaw gateway status
```

适合用在：

- 想确认服务是不是还活着
- 怀疑某个组件没起来
- 先做基础健康检查

## 重新配置

```bash
openclaw onboard
openclaw configure
```

区别可以简单理解为：

- `openclaw onboard`：适合重新走一遍初始化向导
- `openclaw configure`：适合局部修改现有配置

## 重启和看日志

```bash
openclaw daemon restart
openclaw daemon logs
```

出现“没反应、回复异常、怀疑报错”时，优先先看日志。

## 定时任务相关

```bash
openclaw cron add --name "晨间简报" --cron "0 8 * * *" --system-event "生成晨间简报并发给我"
```

如果你已经开始做自动化，定时任务通常会越配越多。建议命名清楚，方便后续维护。

## 节点设备批准

```bash
openclaw nodes approve <device-name>
```

如果你后面把手机、电脑或其他设备接进来，会用到这条。

## 安全检查

```bash
openclaw security audit
openclaw security audit --deep
openclaw security audit --fix
```

`--fix` 这种自动修复类命令，建议确认清楚影响后再用。
