# 形象、动效与交互图鉴

[打开图鉴](preview.html)可离线浏览同一份素材。它收录 EchoBuddy 与 OnoSan Workbench Bot 共用的 12 个角色、12 个无眼睛的图形和 10 种配色，共 240 个组合。每个组合都有实际 SVG 缩略图，选中颜色后可下载该组合。

## 取用形象

[avatar-data.js](avatar-data.js)保存形状、名称、色板和原始 100 × 100 几何。[avatar.js](avatar.js)用这份数据生成 SVG。依次载入两个脚本后，用 `renderMascot("drop", "coral")` 取得珊瑚水滴。把多个 SVG 内联到同一页面时，给每个调用传入不同的第三个参数作为渐变和裁切 ID 的前缀。

## 取用动效

[avatar-motion.css](avatar-motion.css)保留 OnoSan Bot 侧栏的身体和眼睛关键帧。用 `catalog-avatar` 包住 SVG，设置 `data-figure` 为形状 ID，并由业务事件设置 `data-state`。活动或协作等待时可设置 `data-loop="true"` 启用周期眨眼。静态图形没有眼睛图层，身体动画沿用同一套关键帧。

| 状态或场景 | 数据属性和动作 |
| --- | --- |
| 空闲、排队 | `idle`、`queued` 默认静止。 |
| 录音、准备或转写 | 录音用 `working`。准备、转写和保存中的示例用 `thinking` 的倾身与眯眼。 |
| 思考、搜索、交接、回复 | `thinking`、`searching`、`sending`、`replying` 分别表达对应动作。 |
| 执行 | `working` 依形状显示轻跳、摇摆或压缩回弹。 |
| 等待协作 | `waiting_bot` 小幅慢摆，保持空心状态点和文字。 |
| 等待用户、等待资源、中断 | `waiting_user`、`waiting_resource`、`interrupted` 共用一次提醒动作，随后保留问号和文字。 |
| 真实成功 | `done` 回弹一次。 |

## 取用交互

[catalog.js](catalog.js)中的交互样例展示悬停一次反馈、点按或键盘激活一次反馈、视线跟随、贴边收展以及换形与换色。悬停使用 `data-hover`，点按使用 `data-poked`。视线跟随使用 `--gaze-x`、`--gaze-y`，移出后清除偏移。浮窗样例模拟边缘展开和再次进出后的延迟收起，实际窗口位置和点击区由宿主控制。

案例接入和状态说明可查看 [录音反馈](../voice-status/README.md) 与 [Bot 工作状态](../bot-activity/README.md)。动态效果减少时，角色静止，状态文字和状态标记仍然可见。
