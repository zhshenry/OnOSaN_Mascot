# OnoSan Workbench Bot 工作状态

用在同时展示多个 Bot 的列表或侧栏。头像标识身份，动作、状态点和文字反馈工作的阶段。

- [交互预览](preview.html)可以调整 Ono 的状态，旁边始终有一个排队头像供对照。
- [晴蓝圆环](mascot.svg)和[堇紫方糖](square.svg)是可编辑形象，另有[圆环 PNG](mascot.png)和[方糖 PNG](square.png)。[原头像参考](reference.png)保留同系列的配色和表情布局。
- 源图使用 100 × 100 `viewBox`，示例以 42 px 开始。晴蓝主色 `#5C8DF6`，堇紫主色 `#8E74F1`。

## 接入

让每个头像容器使用 `bot-activity`，角色层使用 `mascot-shape`，引入 [motion.css](motion.css)。用同一份任务状态同时更新 `data-state`、状态点样式和状态文本。导航高亮可以独立表示当前打开的 Bot。

| 任务状态 | `data-state` | 动效与静态提示 |
| --- | --- | --- |
| 空闲 | `idle` | 静止，显示职责或空闲。 |
| 任务排队 | `queued` | 静止，显示已排队。 |
| 实际执行 | `working` | 每 1.25 秒轻晃，显示实心状态点和执行文字。 |
| 等待协作 | `waiting` | 每 3.2 秒小幅慢摆，显示空心状态点和等待文字。 |

允许动效时，鼠标进入空闲或排队头像会触发一次 600ms 的反馈，随后停住。减少动态效果时继续显示文字和实心、空心状态点。验证两个 Bot 同时出现时，只要一个开始工作就能一眼辨认。

素材可用于新项目的设计与适配。形象来自 OnoSan Workbench 的 `src/views/bot-avatar-art.ts` 和 `shared/bot-avatar.ts`，状态参照 `docs/requirements/shared/ai-assistant/design/bot-avatar-system-2026-11-16.md` 的执行动效规范。
