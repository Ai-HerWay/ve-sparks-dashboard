# Promo & Campaign Register (template)

The single source of truth for affiliate/promo codes so the Chief of Staff can
answer "what's our code for X?" instantly. Keep this current, mirror it in Notion,
and pin it in `#thrivecart`. Replace the example row with real campaigns.

| Campaign            | Code       | Discount | Link                        | Runs (DD/MM)   | For (channel/push)        | ThriveCart product | Status  |
| ------------------- | ---------- | -------- | --------------------------- | -------------- | ------------------------- | ------------------ | ------- |
| _July IG Reels push_| _HERWAY25_ | _25%_    | _https://…/checkout?coupon=…_ | _01/07–14/07_ | _Instagram reels + story_ | _AI-First Academy_ | _active_|
|                     |            |          |                             |                |                           |                    |         |

## Fields
- **Code** — the coupon/affiliate code the audience enters.
- **Link** — the full checkout/affiliate URL (pre-fills the code where possible).
- **Runs** — start and end dates; expired codes stay in the table marked `ended`.
- **For** — which social push or partner this belongs to, so the agent can match
  "the July social thing" to the right code.
- **Status** — `active` · `scheduled` · `ended`.

> When a teammate asks in Slack "what's the affiliate code for the [X] promo?",
> the Chief of Staff reads this register (or `#thrivecart`) and replies with the
> code, link, discount, and dates — and flags if it's expired.
