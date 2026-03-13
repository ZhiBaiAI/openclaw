export const DOCS_SIDEBAR = [
  {
    label: '交付后开始',
    items: [
      { id: 'index', label: '交付后从这里开始' },
      { id: 'guide', label: '7 步总览' }
    ]
  },
  {
    label: '7 步上手',
    items: [
      { id: 'guide/step-1-what-openclaw-can-do', label: '第 1 步：先明白 OpenClaw 能帮你做什么' },
      { id: 'guide/step-2-install-and-connect', label: '第 2 步：把助手装起来并连上聊天工具' },
      { id: 'guide/step-3-make-it-yours', label: '第 3 步：让它更像“你的助手”' },
      { id: 'guide/step-4-connect-tools', label: '第 4 步：接入邮箱、日历、搜索和浏览器' },
      { id: 'guide/step-5-add-skills', label: '第 5 步：用技能包继续扩展能力' },
      { id: 'guide/step-6-make-it-proactive', label: '第 6 步：让它开始主动工作' },
      { id: 'guide/step-7-next-steps', label: '第 7 步：进阶、安全和后续路线' }
    ]
  },
  {
    label: '支持资料',
    items: [
      { id: 'reference/openclaw-install-detailed', label: 'OpenClaw 安装详细教程' },
      { id: 'reference/soul-user-agents-workshop', label: 'SOUL USER AGENTS 三件套实战教程' },
      { id: 'reference/feishu-multi-bot-virtual-team', label: '飞书多机器人虚拟团队教程' },
      { id: 'reference/homebrew-manual-install-macos-cn', label: 'macOS 国内手动安装 Homebrew' },
      { id: 'reference/bailian-model-config-example', label: '百炼平台模型配置示例' },
      { id: 'reference/wecom-support-setup', label: '企业微信支持配置' },
      { id: 'reference/common-commands', label: '常用命令速查' },
      { id: 'reference/safety-checklist', label: '安全清单' },
      { id: 'faq/common-issues', label: '常见问题' }
    ]
  }
];

export const DOCS_FLAT_ITEMS = DOCS_SIDEBAR.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.label }))
);

export function docHref(id, base = '') {
  const prefix = base.replace(/\/$/, '');

  if (id === 'index') {
    return `${prefix}/docs/`;
  }

  return `${prefix}/docs/${id}/`;
}
