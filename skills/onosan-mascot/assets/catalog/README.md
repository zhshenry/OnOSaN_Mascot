# 形象、动效与交互图鉴

[打开图鉴](preview.html)可离线浏览同一份素材。它收录 EchoBuddy 与 OnoSan Workbench Bot 共用的 12 个角色、12 个无眼睛的图形和 10 种配色，共 240 个组合。每个组合都有实际 SVG 缩略图，选中颜色后可下载该组合。

## 取用形象

[avatar-data.js](avatar-data.js)保存形状、名称、色板和原始 100 × 100 几何。[avatar.js](avatar.js)用这份数据生成 SVG。依次载入两个脚本后，用 `renderMascot("drop", "coral")` 取得珊瑚水滴。把多个 SVG 内联到同一页面时，给每个调用传入不同的第三个参数作为渐变和裁切 ID 的前缀。

## 取用动作

在动效区选择一次形状和配色，所有动作卡片会一起切换。切换形象后可以逐个播放动作。无眼图形可以预览 10 种动作的身体部分，眨眼适用于有眼睛的角色。

[avatar-motion.css](avatar-motion.css)保留 OnoSan Bot 侧栏的身体和眼睛关键帧。用 `catalog-avatar` 包住 SVG，设置 `data-figure` 为形状 ID，并由业务事件设置 `data-state`。活动或协作等待时可设置 `data-loop="true"` 启用周期眨眼。静态图形没有眼睛图层，身体动画沿用同一套关键帧。

## 实际应用中的状态映射

图鉴按身体和眼睛的动作展示。接入产品时，可根据界面用途映射同一个动作。

| 图鉴里的动作 | 对应状态和应用 |
| --- | --- |
| 轻跳、左右摇摆、压缩伸展 | EchoBuddy 录音和 Bot 执行使用 `working`，具体动作随形状选择。 |
| 倾身眯眼 | EchoBuddy 准备、转写、保存与 Bot 思考均可用 `thinking`。 |
| 摆头扫视 | Bot 搜索或读取使用 `searching`。 |
| 横移回正、点头 | Bot 交接用 `sending`，回复用 `replying`。 |
| 小幅慢摆 | Bot 协作等待用 `waiting_bot`，保持空心状态点和文字。 |
| 单次上跳 | `waiting_user`、`waiting_resource`、`interrupted` 共用动作，结束后保留问号和文字。 |
| 压扁回弹 | 任务成功用 `done`。 |
| 眨眼 | 持续执行或协作等待时可叠加 `data-loop="true"`。 |

空闲 `idle` 和排队 `queued` 默认静止。状态点、问号和文字属于产品界面反馈，由接入时的业务状态决定。

## 取用交互

[catalog.js](catalog.js)中的交互样例展示悬停一次反馈、点按或键盘激活一次反馈、视线跟随、贴边收展以及换形与换色。悬停使用 `data-hover`，点按使用 `data-poked`。视线跟随使用 `--gaze-x`、`--gaze-y`，移出后清除偏移。浮窗样例模拟边缘展开和再次进出后的延迟收起，实际窗口位置和点击区由宿主控制。

案例接入和状态说明可查看 [录音反馈](../voice-status/README.md) 与 [Bot 工作状态](../bot-activity/README.md)。在这些接入示例里，减少动态效果时角色静止，状态文字和状态标记仍然可见。
