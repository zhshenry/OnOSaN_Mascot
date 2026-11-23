---
name: onosan-mascot
description: Design, adapt, or integrate product mascots and their state-driven UI interactions. Use for mascot artwork, voice recording and transcription feedback, or Bot activity indicators.
---

# OnOSaN Mascot

Use the [mascot catalogue](assets/catalog/README.md) to choose static artwork, motion by gesture, or interactive feedback. Use the relevant integration example when connecting the result to a product.

| What the mascot does | Case |
| --- | --- |
| Signals idle, recording, and transcription in a voice tool | [Voice feedback](assets/voice-status/README.md) |
| Distinguishes quiet, queued, working, and collaborating Bots | [Bot activity](assets/bot-activity/README.md) |

1. Inspect the target product's visible surface and the events that already drive it. Use the expected size, background, and role to choose a case. Read that case's README and open only the assets or implementation needed for the request.
2. Use the user's artwork or adapt the selected case within its stated use. Keep the mascot legible at its actual UI size. Each case includes editable SVGs, a stylesheet, and a `preview.html` that shows the event-to-state mapping. For layer-specific expressions, preserve the named layers or adjust their transform origins to the new art.
3. Apply the visuals in the target project's existing architecture. Drive the mascot from real application events and keep the case's status text, timer, or activity indicator legible when motion is reduced. Use the idle, queued, and waiting behaviors from the chosen case. Give clickable mascots a named, keyboard-accessible control.
4. Verify a full state sequence at the actual entry point, including the idle state and reduced motion. Test a click or keyboard activation when the mascot acts as an entry. Report the artwork used, the events connected, and any checks that still need the target product or platform.

For design-only work, provide the editable artwork, a state description, and a runnable preview of the requested states.
