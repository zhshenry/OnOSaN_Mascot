# OnoSan Workbench 桌面圆环伙伴

用在桌面灵动岛、顶栏或助手入口。圆环提供安静的陪伴，未读角标提示有事可看，点击进入待办助手。

- [交互预览](preview.html)可以切换是否允许眨眼，并用鼠标或键盘打开和关闭带未读角标的助手示例。
- [圆环 SVG](mascot.svg)和[透明 PNG](mascot.png)保留深色圆心、浅蓝外环、蓝紫底弧和两只白眼。[原入口设计](reference.png)展示未读数与消息入口在桌面上的位置。
- 外环采用 `#76aeff` 和 `#b79aff`，圆心采用 `#090a0c`，眼睛采用 `#f5f6f8`。预览可对照 20 和 46 px 的实际使用尺寸。

## 接入

把 SVG 内联到名称明确的按钮或其他等效的键盘控件内，引入 [motion.css](motion.css)。使用 `island-companion` 和 `data-state` 控制姿态，保留 SVG 中的 `.mascot-eyes` 让两眼可以单独眨动。PNG 适合静态入口。

| 事件 | 角色与界面反馈 |
| --- | --- |
| 安静时段或关闭陪伴动效 | `data-state="quiet"`，角色静止。 |
| 用户允许眨眼 | `data-state="companion"`，约每 6 秒眨眼一次。 |
| 有未读或待确认内容 | 保留数量角标或状态点，并在入口的可访问名称中说明。 |
| 点击、回车或空格激活 | 打开助手入口。将焦点和关闭行为交给宿主控件。 |

关闭动效或开启减少动态效果后，角标和点击入口仍可用。预览使用原生 `<details>` 展示示意内容，实际应用可换成自己的待办助手窗口。

素材可用于新项目的设计与适配。圆环源自 OnoSan Workbench 的 `src/ui/IslandMascot.tsx` 和 `src/ui/island-mascot.css`。入口取自 `src/views/IslandAgentMessages.tsx`，原图来自桌面灵动岛需求中的 `agent-mascot-entry-approved-2026-11-08.png`。
