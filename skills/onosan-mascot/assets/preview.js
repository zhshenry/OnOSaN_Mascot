const preview = document.querySelector('[data-preview]');
const stage = preview.querySelector('[data-stage]');
const avatarState = stage.querySelector('[data-avatar-state]') ?? stage;
const stateLabel = stage.querySelector('[data-status]');
const stateButtons = Array.from(preview.querySelectorAll('[data-next-state]'));
const clock = stage.querySelector('[data-clock]');
let clockInterval;

for (const button of stateButtons) {
  button.addEventListener('click', () => {
    const nextState = button.dataset.nextState;
    if (avatarState.dataset.state === nextState) return;

    avatarState.dataset.state = nextState;
    stateLabel.textContent = button.dataset.status;
    for (const choice of stateButtons) {
      choice.setAttribute('aria-pressed', String(choice === button));
    }

    if (clock) {
      clearInterval(clockInterval);
      clock.hidden = nextState !== 'recording';
      if (!clock.hidden) {
        clock.textContent = '00:00';
        const started = performance.now();
        clockInterval = setInterval(() => {
          const elapsed = Math.floor((performance.now() - started) / 1000);
          const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
          const seconds = String(elapsed % 60).padStart(2, '0');
          clock.textContent = `${minutes}:${seconds}`;
        }, 250);
      }
    }
  });
}

preview.querySelector('[data-size]').addEventListener('change', (event) => {
  stage.style.setProperty('--mascot-size', `${event.target.value}px`);
});

preview.querySelector('[data-theme-option]').addEventListener('change', (event) => {
  stage.dataset.theme = event.target.value;
});

preview.querySelector('[data-reduce-motion]').addEventListener('change', (event) => {
  stage.dataset.motion = event.target.checked ? 'reduced' : 'full';
});
