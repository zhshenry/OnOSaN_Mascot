const gallery = document.querySelector("[data-catalog]");
const assets = gallery.dataset.assets;
const skillLink = gallery.dataset.skill;
const archive = gallery.dataset.download;
const namedColors = mascotCatalog.colors;
const defaults = {
  ring: "blue", orb: "cyan", square: "violet", drop: "coral", sail: "orange", hex: "pink",
  cloud: "cyan", flower: "mint", ghost: "green", pill: "yellow", star: "yellow", bear: "graphite",
};
let svgInstance = 0;

const motionExamples = [
  { id: "hop", label: "轻跳", state: "working", timing: "向上跳起，落下时稍微侧转 · 1.25 秒循环" },
  { id: "tilt-and-squint", label: "倾身眯眼", state: "thinking", timing: "身体倾斜，双眼收窄 · 1.9 秒循环",
    bodyOnly: { label: "倾身", timing: "身体左右倾斜 · 1.9 秒循环" } },
  { id: "scan", label: "摆头扫视", state: "searching", timing: "身体轻摆，双眼左右扫动 · 1.3 / 1.5 秒循环",
    bodyOnly: { label: "轻摆", timing: "身体左右轻摆 · 1.3 秒循环" } },
  { id: "wiggle", label: "左右摇摆", state: "working", timing: "左右交替倾斜，摆动时轻抬 · 1.25 秒循环" },
  { id: "squash-and-stretch", label: "压缩伸展", state: "working", timing: "先压扁，后拉长上跳 · 1.25 秒循环" },
  { id: "side-shift", label: "横移回正", state: "sending", timing: "向一侧移出，反向轻摆后归位 · 1.1 秒循环" },
  { id: "nod", label: "点头", state: "replying", timing: "轻抬后倾一下，再回正 · 1.5 秒循环" },
  { id: "sway", label: "小幅慢摆", state: "waiting_bot", timing: "以小角度左右摇摆，双眼微移 · 3.2 秒循环",
    bodyOnly: { label: "小幅慢摆", timing: "以小角度左右摇摆 · 3.2 秒循环" } },
  { id: "single-jump", label: "单次上跳", state: "waiting_user", timing: "短促上跳，落下时稍微压缩 · 1.1 秒一次", once: 1100 },
  { id: "bounce", label: "压扁回弹", state: "done", timing: "先压扁再弹起，落下后轻弹 · 1.1 秒一次", once: 1100 },
  { id: "blink", label: "眨眼", state: "idle", timing: "双眼快速闭合再睁开 · 4.7 秒循环" },
];

function svgUrl(figure, hue) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(renderMascot(figure, hue));
}

function avatar(figure, hue) {
  const art = renderMascot(figure, hue, "preview-" + ++svgInstance);
  return `<span class="catalog-avatar" data-figure="${figure}" data-state="idle" aria-hidden="true">${art}</span>`;
}

function selectOptions(items, selectedId) {
  return items.map(item =>
    `<option value="${item.id}"${item.id === selectedId ? " selected" : ""}>${item.name}</option>`).join("");
}

function shapeCard(figure, index) {
  const base = namedColors.find(color => color.id === defaults[figure.id]) ?? namedColors[index % namedColors.length];
  const title = figure.name;
  const swatches = namedColors.map(color => `
    <button class="color-choice" type="button" data-color="${color.id}" data-label="${color.name}"
      aria-label="${title} · ${color.name}" title="${color.name}" aria-pressed="${color.id === base.id}">
      <img src="${svgUrl(figure.id, color.id)}" alt="" width="28" height="28" loading="lazy">
      <span>${color.name}</span>
    </button>`).join("");
  return `<article class="shape-card" data-shape="${figure.id}">
    <div class="shape-top">
      <div class="shape-art"><img src="${svgUrl(figure.id, base.id)}" alt="" width="75" height="75" loading="lazy"></div>
      <div class="shape-info">
        <h4>${title}</h4>
        <p class="color-label">${base.name}</p>
        <a class="svg-download" href="${svgUrl(figure.id, base.id)}" download="${figure.id}-${base.id}.svg"
           aria-label="下载 ${title} · ${base.name} SVG">下载 SVG</a>
      </div>
    </div>
    <div class="palette" role="group" aria-label="${title}的 ${namedColors.length} 种配色">${swatches}</div>
  </article>`;
}

function shapeGroup(label, figures) {
  return `<section class="shape-group" aria-label="${label}">
    <h3>${label}<span class="group-count">${figures.length} 种</span></h3>
    <div class="shape-grid">${figures.map(shapeCard).join("")}</div>
  </section>`;
}

function motionCard(example, figure, hue) {
  const { label, timing } = !figure.eye && example.bodyOnly ? example.bodyOnly : example;
  const disabled = !figure.eye && example.id === "blink";
  return `<article class="sample-card" data-motion-example="${example.id}">
    <div class="sample-stage">${avatar(figure.id, hue)}</div>
    <div class="sample-copy">
      <h3>${label}</h3>
      <p>${disabled ? "眨眼适用于有眼睛的角色。" : timing}</p>
      <button type="button" class="sample-control" data-play-motion="${example.id}" aria-label="播放 ${label}"${disabled ? " disabled" : ""}>播放</button>
    </div>
  </article>`;
}

function interactiveCard(heading, description, stage) {
  return `<article class="sample-card interactive-card">
    <div class="sample-stage">${stage}</div>
    <div class="sample-copy"><h3>${heading}</h3><p>${description}</p></div>
  </article>`;
}

function catalogMarkup() {
  const primary = archive
    ? `<a class="download" href="${archive}" download>下载 Skill 包</a>`
    : `<a class="download" href="${skillLink}">阅读 Skill 指引</a>`;
  return `
    <header class="topbar catalog-topbar">
      <div class="page-width topbar-inner">
        <span class="wordmark"><img src="${assets}/voice-status/mascot.svg" alt="">OnOSaN Mascot</span>
        <nav aria-label="图鉴分类">
          <a href="#cases">静态形象</a>
          <a href="#motions">动效</a>
          <a href="#interactions">可交互</a>
        </nav>
      </div>
    </header>
    <main class="page-width catalog-main">
      <div class="catalog-intro">
        <div><h1>吉祥物图鉴</h1><p>挑选形象和配色，逐项试动效与交互。</p></div>
        ${primary}
      </div>
      <section class="catalog-section" id="cases" aria-labelledby="shapes-title">
        <div class="section-heading">
          <h2 id="shapes-title">静态形象</h2>
          <p>${mascotFigures.length} 种形状 × ${namedColors.length} 种配色。点击任一配色可放大并下载 SVG。</p>
        </div>
        ${shapeGroup("角色", mascotCatalog.characters)}
        ${shapeGroup("图形", mascotCatalog.graphics)}
      </section>
      <section class="catalog-section" id="motions" aria-labelledby="motions-title">
        <div class="section-heading with-control">
          <div><h2 id="motions-title">动效</h2><p>选择形状和配色，用同一个形象预览所有动作。</p></div>
          <div class="motion-controls">
            <label>形状<select data-motion-figure>
              <optgroup label="角色">${selectOptions(mascotCatalog.characters, "drop")}</optgroup>
              <optgroup label="图形">${selectOptions(mascotCatalog.graphics)}</optgroup>
            </select></label>
            <label>配色<select data-motion-color>${selectOptions(namedColors, "coral")}</select></label>
            <label class="motion-switch"><input type="checkbox" data-motion-toggle> 减少动态效果</label>
          </div>
        </div>
        <div class="sample-grid" data-motion-grid></div>
      </section>
      <section class="catalog-section" id="interactions" aria-labelledby="interaction-title">
        <div class="section-heading"><h2 id="interaction-title">可交互</h2><p>在样例上直接试触发动作。</p></div>
        <div class="sample-grid interactive-grid">
          ${interactiveCard("悬停反馈", "把鼠标移到角色上，会播放一次 600 毫秒的表情反馈。",
            `<button type="button" class="avatar-trigger" data-hover-demo aria-label="试悬停反馈">${avatar("ring", "blue")}</button>`)}
          ${interactiveCard("点按反馈", "点击角色，或用键盘激活，会播放一次 480 毫秒的回应。",
            `<button type="button" class="avatar-trigger" data-press-demo aria-label="试点按反馈">${avatar("square", "violet")}</button>`)}
          ${interactiveCard("视线跟随", "在方格内移动鼠标。移开后，视线归中。",
            `<div class="gaze-surface" data-gaze-demo>${avatar("drop", "coral")}</div>`)}
          ${interactiveCard("贴边收展", "点水滴展开示意浮窗。移出后再次移入，再移出会延迟收起。",
            `<div class="dock-surface"><div class="dock-demo" data-dock-demo data-expanded="false">
              <button type="button" class="avatar-trigger dock-trigger" aria-label="展开浮窗" aria-controls="dock-caption" aria-expanded="false">${avatar("drop", "coral")}</button>
              <span class="dock-caption" id="dock-caption" aria-hidden="true">完整浮窗</span>
            </div></div>`)}
          ${interactiveCard("换形状与颜色", "选一个角色或图形，再试同一份配色。",
            `<div class="picker-demo" data-picker-demo>
              <div class="picker-image">${avatar("drop", "coral")}</div>
              <div class="picker-controls">
                <label>形状<select data-picker-figure>${selectOptions(mascotFigures, "drop")}</select></label>
                <label>配色<select data-picker-color>${selectOptions(namedColors, "coral")}</select></label>
              </div>
            </div>`)}
        </div>
      </section>
      <footer class="catalog-footer">
        <p>将完整目录交给 AI，从 <a href="${skillLink}">SKILL.md</a> 开始。</p>
        <p><a href="${assets}/voice-status/preview.html">录音接入示例</a> <a href="${assets}/bot-activity/preview.html">Bot 接入示例</a></p>
      </footer>
    </main>`;
}

gallery.innerHTML = catalogMarkup();

gallery.querySelector("#cases").addEventListener("click", event => {
  const choice = event.target.closest(".color-choice");
  if (!choice) return;
  const card = choice.closest(".shape-card");
  const source = choice.querySelector("img").src;
  const preview = card.querySelector(".shape-art img");
  const download = card.querySelector(".svg-download");
  const title = card.querySelector("h4").textContent;
  for (const color of card.querySelectorAll(".color-choice")) color.setAttribute("aria-pressed", String(color === choice));
  preview.src = source;
  card.querySelector(".color-label").textContent = choice.dataset.label;
  download.href = source;
  download.download = `${card.dataset.shape}-${choice.dataset.color}.svg`;
  download.setAttribute("aria-label", `下载 ${title} · ${choice.dataset.label} SVG`);
});

const motionSection = gallery.querySelector("#motions");
const motionGrid = motionSection.querySelector("[data-motion-grid]");
const motionFigure = motionSection.querySelector("[data-motion-figure]");
const motionColor = motionSection.querySelector("[data-motion-color]");
let playing;
let endTime;

function stopPlayback() {
  clearTimeout(endTime);
  if (!playing) return;
  const { button, model, label } = playing;
  model.dataset.state = "idle";
  delete model.dataset.loop;
  button.textContent = "播放";
  button.setAttribute("aria-label", "播放 " + label);
  playing = undefined;
}

function renderMotionCards() {
  stopPlayback();
  const figure = mascotFigures.find(item => item.id === motionFigure.value);
  motionGrid.innerHTML = motionExamples.map(example => motionCard(example, figure, motionColor.value)).join("");
}

renderMotionCards();
motionFigure.addEventListener("change", renderMotionCards);
motionColor.addEventListener("change", renderMotionCards);

motionGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-play-motion]");
  if (!button) return;
  const current = playing?.button === button;
  const example = motionExamples.find(item => item.id === button.dataset.playMotion);
  stopPlayback();
  if (current && !example.once) return;
  const card = button.closest(".sample-card");
  const model = card.querySelector(".catalog-avatar");
  const label = card.querySelector("h3").textContent;
  void model.offsetWidth;
  model.dataset.state = example.state;
  if (example.id === "blink") model.dataset.loop = "true";
  button.textContent = example.once ? "重播" : "停止";
  button.setAttribute("aria-label", button.textContent + " " + label);
  playing = { button, model, label };
  if (example.once) endTime = setTimeout(stopPlayback, example.once);
});

motionSection.querySelector("[data-motion-toggle]").addEventListener("change", event => {
  gallery.dataset.reducedMotion = String(event.target.checked);
});

function gestureFeedback(button, flag, milliseconds) {
  const model = button.querySelector(".catalog-avatar");
  let timer;
  const play = () => {
    clearTimeout(timer);
    delete model.dataset[flag];
    void model.offsetWidth;
    model.dataset[flag] = "true";
    timer = setTimeout(() => delete model.dataset[flag], milliseconds);
  };
  button.addEventListener("click", play);
  return play;
}

const hoverButton = gallery.querySelector("[data-hover-demo]");
const greet = gestureFeedback(hoverButton, "hover", 600);
hoverButton.addEventListener("pointerenter", event => {
  if (event.pointerType !== "touch") greet();
});
gestureFeedback(gallery.querySelector("[data-press-demo]"), "poked", 480);

const gaze = gallery.querySelector("[data-gaze-demo]");
gaze.addEventListener("pointermove", event => {
  const bounds = gaze.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
  const y = (event.clientY - bounds.top) / bounds.height * 2 - 1;
  gaze.style.setProperty("--gaze-x", x.toFixed(3));
  gaze.style.setProperty("--gaze-y", y.toFixed(3));
});
gaze.addEventListener("pointerleave", () => {
  gaze.style.removeProperty("--gaze-x");
  gaze.style.removeProperty("--gaze-y");
});

const dock = gallery.querySelector("[data-dock-demo]");
const dockTrigger = dock.querySelector("button");
const dockCaption = dock.querySelector(".dock-caption");
let collapseTimer;
let reentered = false;

function setDock(expanded) {
  clearTimeout(collapseTimer);
  reentered = false;
  dock.dataset.expanded = String(expanded);
  dockTrigger.setAttribute("aria-expanded", String(expanded));
  dockTrigger.setAttribute("aria-label", expanded ? "收起浮窗" : "展开浮窗");
  dockCaption.setAttribute("aria-hidden", String(!expanded));
}
dockTrigger.addEventListener("click", () => setDock(dock.dataset.expanded !== "true"));
dock.addEventListener("pointerenter", () => {
  clearTimeout(collapseTimer);
  reentered = dock.dataset.expanded === "true";
});
dock.addEventListener("pointerleave", () => {
  if (reentered) collapseTimer = setTimeout(() => setDock(false), 300);
});

const picker = gallery.querySelector("[data-picker-demo]");
const selectedFigure = picker.querySelector("[data-picker-figure]");
const selectedColor = picker.querySelector("[data-picker-color]");
picker.addEventListener("change", () => {
  picker.querySelector(".picker-image").innerHTML = avatar(selectedFigure.value, selectedColor.value);
});
