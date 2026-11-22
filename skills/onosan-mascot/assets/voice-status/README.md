# EchoBuddy 录音反馈

用在听写或会议录音浮窗。角色反馈当前阶段，录音计时和停止操作由宿主界面提供。

- [交互预览](preview.html)可以离线打开，模拟从待机到录音、转写和返回待机。
- [珊瑚水滴 SVG](mascot.svg)保留同高双竖眼和左上高光。[透明 PNG](mascot.png)可直接用于静态预览。[原浮窗设计图](reference.png)展示贴边后的待机和录音两态。
- 形象的 `viewBox` 为 `0 0 100 100`。可在预览里检查 24、42、96 px。珊瑚渐变从 `#FFBAB4` 过渡到 `#F7706B` 和 `#DA4946`，眼睛是 `#5F1716`。

## 接入

把 [motion.css](motion.css) 和角色图带进项目，给容器设置 `voice-status`，给角色显示层设置 `mascot-shape`。SVG 作为图片替换时，三态的基础动效仍由显示层承接。需要跟随视线时可内联 SVG，使用 `.mascot-eyes` 控制眼睛组。

```html
<div class="voice-status" data-state="idle">
  <img class="mascot-shape" width="42" src="mascot.svg" alt="">
  <span role="status">待机</span>
</div>
```

| 宿主事件 | `data-state` | 画面变化 |
| --- | --- | --- |
| 麦克风可用，等待开始 | `idle` | 角色静止，显示待机。 |
| 麦克风已经录到音 | `recording` | 每 1.25 秒轻跳一次，同时显示录音状态和计时。 |
| 录音结束，音频正在处理 | `transcribing` | 每 1.9 秒轻微倾身，文本显示正在转写。 |
| 处理完成或取消 | `idle` | 回到静止，并由宿主保留结果或提示。 |

用音频服务的状态更新数据属性和文本。转写中和减少动态效果时也应能读到当前状态。若角色还负责展开贴边窗口，用带可访问名称的按钮包住它，并在真实窗口里验证展开、计时和停录能在同一个会话工作。

素材可用于新项目的设计与适配。图形和动作取自 EchoBuddy 的 `src/avatars/` 与 `src/main.tsx`，原场景图取自 `design/edge-docking/compact-recording.png`。示例把业务状态映射和浮窗宿主逻辑留给接入方。
