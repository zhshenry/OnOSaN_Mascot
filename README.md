# OnOSaN_Mascot

OnOSaN_Mascot 是一套可以直接交给 AI 的吉祥物素材与交互 Skill。使用者描述新项目里的场景，AI 按案例选择或调整形象，把动效接到已有的业务状态，再验证实际入口。

[下载 v0.1.0 Skill 包](OnOSaN_Mascot-v0.1.0.zip) · [阅读 SKILL.md](skills/onosan-mascot/SKILL.md) · [查看案例索引](index.html)

## 别人怎么用

1. 解压 ZIP，得到完整的 `onosan-mascot` 目录。
2. 用 Codex 时，将该目录放入个人 Skill 目录 `~/.agents/skills/`，然后在新项目里调用 `$onosan-mascot`。用其他可以读取文件的 AI 工具时，把整个目录放到它能访问的工作区，请它先读取包里的 `SKILL.md`。
3. 告诉 AI 吉祥物放在哪、使用哪份形象，以及要表达哪些状态。AI 读取对应案例并接入项目。接收者可以打开包内的 `preview.html` 对照原始效果，再到新项目检查接入结果。

> 用 OnOSaN_Mascot 给我的听写浮窗加一个角色。参考 `voice-status`，使用我提供的角色图，把动效接到现有的待机、录音和转写状态。

本地打开仓库根目录的 `index.html` 可以浏览三个案例。也可以直接双击解压目录内每个案例的 `preview.html`，切换状态、底色、尺寸和减少动态效果。

## 我们这里存了什么

| 内容 | 保存的东西 |
| --- | --- |
| AI 指引 | `SKILL.md` 说明适用场景、案例入口、接入和验收方法。 |
| 形象 | 可编辑的 SVG、透明 PNG、配色、实际尺寸和原产品设计参考。 |
| 动效 | 可复用的 CSS、对应状态、节奏、循环和结束条件。 |
| 交互 | 可运行的预览，来源与使用说明，以及声音、Bot 任务或未读提醒怎样触发界面反馈。 |

| 案例 | 预览和接入 |
| --- | --- |
| EchoBuddy 录音反馈 | [预览](skills/onosan-mascot/assets/voice-status/preview.html) · [接入说明](skills/onosan-mascot/assets/voice-status/README.md) |
| OnoSan Workbench Bot 工作状态 | [预览](skills/onosan-mascot/assets/bot-activity/preview.html) · [接入说明](skills/onosan-mascot/assets/bot-activity/README.md) |
| OnoSan Workbench 桌面圆环伙伴 | [预览](skills/onosan-mascot/assets/island-companion/preview.html) · [接入说明](skills/onosan-mascot/assets/island-companion/README.md) |

案例提供给接收者用于新项目的设计、适配与实现。每个案例的说明记录原始项目和素材出处。

## 产品名称和交付

产品名为 **OnOSaN_Mascot**，Skill 名为 `onosan-mascot`。仓库的 `skills/onosan-mascot/` 是打包来源，索引页使用同一份素材。每个案例把源码、图稿和预览放在一起，Skill 使用相对路径查找。

```text
index.html
OnOSaN_Mascot-v0.1.0.zip
skills/onosan-mascot/
  SKILL.md
  assets/
    voice-status/
    bot-activity/
    island-companion/
```

更新素材后，从仓库根目录重新打包。

```powershell
Compress-Archive -LiteralPath 'skills/onosan-mascot' -DestinationPath 'OnOSaN_Mascot-v0.1.0.zip' -Force
```

## 验收方法

从 ZIP 解压到一个新目录，打开案例页，用鼠标和键盘切换状态。减少动态效果时，检查录音计时、Bot 状态文字和未读角标仍然能看懂。接入其他产品时，用另一份 SVG 替换角色，让新项目自己的事件驱动状态，然后从实际入口试一遍。桌面贴边、置顶和展开窗口的行为在宿主产品里验证。
