# Slack: the whole team's front door to the Chief of Staff

Goal: anyone on the team can ask in Slack — "is Nici free Thursday?", "what's the
affiliate code for the July promo?", "draft a reply to this client" — and get an
answer or a ready-to-approve draft. This is the interface to the
**business OS** (`docs/BUSINESS-OS.md`).

## Your workspace (detected)

`aiherway.slack.com` — relevant channels the agent can already read:

| Channel            | Used for                          |
| ------------------ | --------------------------------- |
| `#general`         | Team-wide; a good home for briefs |
| `#thrivecart`      | Affiliate / promo codes, checkout |
| `#social_media`    | Social posts & scheduling         |
| `#content-drafting`| Content in progress               |
| `#client-project`  | Client work                       |
| `#lead-logs`       | Incoming leads                    |
| `#student-chat`    | Course / community                |

## Two capabilities, two setups

### A) It can already READ and POST (works now)
The Slack connector is live — the Chief of Staff can search channels, read
threads, and post messages. So today it can: post the daily brief to a channel,
look up "what's in `#thrivecart`", summarise `#lead-logs`, etc. This is driven
from Claude Code (chat or a scheduled task).

### B) The team @mentions it and gets a reply (needs the Slack app)
For teammates to talk to it *natively* in Slack — `@Claude` in a channel or a DM —
a workspace admin adds **Anthropic's official Claude app for Slack** (included in
your Claude Teams plan). Then:

1. Admin installs Claude for Slack and authorises the connectors it should use
   (Google Calendar, Gmail, HubSpot, Notion, etc.).
2. Paste `.claude/slack-chief-of-staff.md` into the app's **custom instructions**
   (or a Slack Project) so it behaves as *your* Chief of Staff, not a blank Claude.
3. Invite it to the channels the team will use (start with `#general`).
4. Test the two examples below.

> The install + connector authorisation is an admin action in Slack / claude.ai
> settings — it can't be done from inside an agent session. Everything else (the
> persona, the answer-source map, the registers) is built and waiting in this repo.

## The two examples, wired end-to-end

**"Has Nici got something booked Thursday 2pm?"**
`@Claude` → reads the shared Google Calendar → "She's in the Acme call 2–2:30pm,
free after." *Prereq:* Nici shares her calendar (free/busy) with the team, or the
app uses a shared Ai HerWay calendar. Decide this once — see Permissions in
`docs/BUSINESS-OS.md`.

**"What's our affiliate promo code for the July social?"**
`@Claude` → reads `#thrivecart` / the Promo & Campaign Register → "Code `HERWAY25`,
link <…>, 25% off, runs 01–14/07." Works with what you have today; the register
(`docs/templates/promo-register.md`) makes it exact.

## Rollout

1. **Today:** post `/daily-brief` output to `#general` from Claude Code.
2. **This week:** admin installs Claude for Slack + persona; test the two examples
   in a private channel.
3. **Next:** put the daily brief on a schedule (`docs/SCHEDULING.md`) so it posts
   itself; widen access channel by channel.

Guardrails from `CLAUDE.md` apply in Slack too: it answers and drafts, but never
sends client messages, moves money, or posts publicly without approval.
