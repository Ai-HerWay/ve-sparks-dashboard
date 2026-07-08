# PRD — AI Her Way Digital Team (Chief of Staff + Departments)

**Owner:** Nici (nici@aiherway.com.au) · **Status:** v2.1 — built, in team testing ·
**Author:** Chief of Staff (Claude) · **Last updated:** 09/07/2026

> **v2.1 addendum (09/07/2026):** Notion **Enterprise confirmed**, which unlocks
> Claude agents inside Notion. New §8.4 adds a Notion-native **Chief of Staff
> (Notion desk)** as the team's front door — @mention/assign inside Notion,
> heavy work still executed by Claude Code at $0 marginal. Slack demoted from
> "required front door" to "later nice-to-have". Competitive check against
> Demarly.ai (hosted CEO-agent platform, $49.99/mo): same pattern, ours wins on
> ownership, real connectors, Notion visibility, cost, and productisable IP —
> their only edge (always-on) closes when our schedules turn on.

> v2 supersedes the v1 draft. What changed: the flat 10-specialist roster is now
> organised into **departments matching the AI OS we teach in the Hub**
> (Foundation + department heads + specialists), the Notion strategy is pinned
> down as **board-not-brain** with real cost numbers, and the replication kit is
> reframed as a **Hub product** (the missing CEO OS department). The v1
> functional requirements, data model, and guardrails carry over.

---

## 1. Summary

An **AI digital team** for AI Her Way: one **Chief of Staff** that receives
every request, routes it to the right **department** and specialist, and
reports back — with guardrails so nothing risky happens without a human.

- **Nici stays the CEO.** The orchestrator is a chief of *staff*, not a chief
  executive: it routes, drafts, and surfaces. Humans decide. This keeps the
  system consistent with the AI OS philosophy we teach ("You: the CEO. The AI
  works for you.") — the CoS layer is the **CEO OS** department the student
  library has reserved but never shipped.
- **Notion is the board, Claude is the brain.** The team requests, watches,
  and approves in Notion (six databases). All reasoning runs in Claude Code
  under the existing Claude plan — marginal cost ≈ $0. Notion AI credits are
  never spent on work Claude already does.
- **Slack is the front door** for quick questions, via the official Claude for
  Slack app.
- **Each specialist declares its own model** — the cheapest that does the job
  well.

### Status at v2

| Piece | Status |
| --- | --- |
| Chief of Staff brain (`CLAUDE.md`) + routing | ✅ Built |
| 10 specialists with per-agent models | ✅ Built |
| Foundation (shared memory, voice, governance) | ✅ Built (v2) |
| 5 department head cards (`departments/*/AGENT.md`) | ✅ Built (v2) |
| Plays incl. `/process-queue` | ✅ Built (v2) |
| Notion control plane (6 databases) | ✅ Created — IDs in `docs/BUSINESS-OS.md` |
| Team manual (use + test) | ✅ `docs/MANUAL.md` |
| Chief of Staff (Notion desk) — Claude agent in Notion | ⬜ Admin enable + paste `docs/NOTION-AGENT.md` (§8.4) |
| Slack front door | ⬜ Optional, after Notion desk proves out (§10.1 A1) |
| Schedules (daily brief, queue sweep) | ⬜ Turn on after first manual test week |
| Fork kit → Hub CEO OS product | ⬜ After a month of internal dogfooding |

---

## 2. Architecture — how it matches the AI OS we teach

The Hub's AI OS structure is: **Foundation** (shared memory, voice,
governance) with self-contained **departments** on top, each run by a manager
brain that routes to skills. This repo is that exact structure, plus two
things a *team* (rather than a solo founder) needs:

1. **A Chief of Staff layer** — because three humans share one digital team,
   requests need one router and one audit trail.
2. **Team surfaces** — Notion (persistent, visible workflow) and Slack
   (quick chat), so nobody needs a terminal to use or supervise the system.

```
Nici (CEO) — Eva (Ops) — Bianca (Client Support)      HUMANS DECIDE
   │            surfaces: NOTION board · SLACK front door
   ▼
CHIEF OF STAFF (CLAUDE.md) — routes, never does the work        [Sonnet]
   │        reads: foundation/ (memory · voice · governance)
   ▼
DEPARTMENTS (departments/*/AGENT.md — authority, escalation, lanes)
   ├─ Admin & Ops ──── inbox-manager [Sonnet] · calendar-coordinator [Haiku]
   │                   meeting-scribe [Sonnet] · ops-coordinator [Sonnet]
   ├─ Marketing ────── content-marketer [Sonnet → Fable for flagship]
   ├─ Sales & Clients─ crm-manager [Sonnet] · client-success [Sonnet]
   ├─ Finance ──────── bookkeeper [Opus]
   └─ Strategy ─────── research-analyst [Sonnet→Opus] · data-reporter [Sonnet→Opus]
   │
CONNECTORS: Gmail · Calendar · Drive · Notion · HubSpot · Xero · Fathom ·
Flodesk · Canva · Gamma · ThriveCart(#thrivecart) · analytics
   │
EXECUTION: Claude Code (this repo) — on demand + scheduled plays
```

**Load-bearing rule:** specialists live in `.claude/agents/` (that's what
Claude Code runs); departments carry the *authority model* (what may act,
draft, never), so agent files stay lean and cheap to run. Skill-DNA
principles (governing principle, autonomy tiers, escalation, self-improvement
with human approval) are carried by the department cards + governance file
rather than repeated in all 10 agents.

### The core loop

1. A human (or Slack, or the CoS) creates a **Requests** row → `Inbox`.
2. `/process-queue` (manual now, scheduled later) routes it: Owner agent set,
   Status → `In progress`.
3. The specialist runs **on its own model**, works via connectors, writes
   **Output** + appends to the **Activity Log**, sets `Needs approval` or `Done`.
4. Slack nudge for anything in `Needs approval`, linking the row.
5. A human approves in Notion → a human performs the send · Status → `Done`.

---

## 3. Goals & non-goals

### Goals
1. One entry point (CoS) routing to departments and specialists.
2. Per-agent model selection — spend proportional to stakes.
3. Notion control plane — request → route → work → approve, all visible.
4. Slack front door for quick answers and approval nudges.
5. Guardrails everywhere — draft-by-default; money/contracts need a human.
6. Proactivity — scheduled briefs and queue sweeps.
7. **Dogfood → productise**: after a month of team use, genericise into the
   Hub's CEO OS department + fork kit (§11).

### Non-goals (v1)
- No custom web app or bespoke bot infra — Claude Code + official connectors
  + the official Claude for Slack app.
- No auto-sending client emails, moving money, or posting publicly. Ever, in v1.
- No Notion AI credits spent on reasoning (see §8 cost model).
- Not replacing humans — augmenting a team of three.

---

## 4. Users & jobs-to-be-done

| User | Uses it for | Primary surface |
| --- | --- | --- |
| **Nici (CEO)** | Delegating whole workflows; daily brief; approvals | Notion + Slack |
| **Eva (Ops)** | Quick questions; logging tasks; approving within her lane | Slack (quick), Notion (tasks) |
| **Bianca (Client Support)** | Client comms drafts; Hub member questions | Notion + Slack |
| **Hub members (later)** | The genericised CEO OS product | Fork kit |

---

## 5. Functional requirements

Carried over from v1 (FR-1 → FR-19) with these amendments:

- **FR-1a** Routing is two-level: request → department → specialist. The
  department card's authority tiers bind every delegation.
- **FR-4a** Model choice is mirrored in the Notion **Agent Registry**; editing
  the Model column there is the sanctioned non-dev way to retune (a human then
  updates the frontmatter to match, or asks the CoS to).
- **FR-9a** Foundation files (`foundation/memory/*`, `governance/*`) are the
  runtime copy; the Notion Knowledge Base is the team-facing copy. When either
  changes, the other is updated in the same session. Conflicts resolve to the
  more recently updated, and get flagged.
- **FR-20 (new)** Every agent run that came from a Requests row writes back to
  that row — no orphaned work.
- **FR-21 (new)** The system never spends Notion AI/agent credits: Notion is
  accessed via the connector as databases only.

---

## 6. Non-functional requirements

Unchanged from v1: replicable, cost-aware, observable, secure, low-maintenance.
Plus: **teachable** — every structural choice must be explainable to Hub
members, because this system becomes course material.

---

## 7. Model selection matrix

**Rubric:** cheapest model that does the job well; upgrade only where stakes
or creativity justify it. Complexity × volume × stakes.

| Agent | Model | Why |
| --- | --- | --- |
| Chief of Staff | Sonnet (Opus for complex multi-part coordination) | Frequent, not deep |
| `inbox-manager` | Sonnet | Good writing, fast; bulk triage can drop to Haiku |
| `calendar-coordinator` | **Haiku** | Mechanical availability logic |
| `meeting-scribe` | Sonnet | Faithful summarisation |
| `content-marketer` | Sonnet → **Fable** for flagship | Brand voice; hero pieces justify the upgrade |
| `crm-manager` | Sonnet | Templated-but-personal outreach |
| `client-success` | Sonnet | Warm, accurate client comms |
| `bookkeeper` | **Opus** | Numbers; low volume, high stakes |
| `research-analyst` | Sonnet → Opus for deep questions | Synthesis + verification |
| `data-reporter` | Sonnet → Opus to interpret | Pull + explain the "so what" |
| `ops-coordinator` | Sonnet | SOPs and tracking |

Set via `model:` frontmatter in `.claude/agents/*.md` (✅ applied), mirrored
in the Notion Agent Registry (✅ seeded). Multi-vendor models remain a §12
future option.

---

## 8. Notion — the control plane and the cost model

### 8.1 The six databases (✅ created; IDs in `docs/BUSINESS-OS.md`)

Schemas as per v1 §8: **Requests** (queue: Title, Requested by, Owner agent,
Status, Priority, Model used, Output, Needs approval, Approved by, Due),
**Agent Registry**, **Knowledge Base / SOPs**, **Promo & Campaign Register**,
**Client Directory**, **Activity Log** (append-only audit).

### 8.2 Board, not brain — the cost decision

Notion's own AI stack (as at 07/2026):

- **Workers** (background code: syncs, webhooks, agent tool calls) cost
  **$0.0023/run** — free in beta until 10/08/2026, then a credits add-on on
  Business/Enterprise plans. A daily sync ≈ $0.07/mo; hourly ≈ $1.66/mo.
- **Custom Agent actions consume Notion credits** even during the beta.
- **External Agents** (beta): @mention/assign external AI agents — Claude is
  a named partner — inside Notion, with visible reasoning.

Decision: **databases only.** All reasoning runs in Claude Code under the
existing Claude seats (marginal cost ≈ $0). Notion Workers are optional
post-beta glue (a new-row webhook instead of hourly polling: cents per month).
Join the External Agents waitlist — "@mention Claude on a task" eventually
replaces the queue sweep, but is not v1.

**Total incremental running cost of v1: $0** (existing Claude + Notion +
Slack plans). Post-08/2026 with optional webhook glue: ~$2–10/month. The
Notion-desk agent (§8.4) adds per-run Notion credits for *light* interactions
only — heavy work stays on the Claude seats.

### 8.4 The Notion-native front door — Chief of Staff (Notion desk)  ← new in v2.1

We are on **Notion Enterprise**, so Claude agents run natively in Notion
(Agents → New Agent → Claude; no Anthropic account needed; admin enables
under Settings → Notion AI → Agents → Manage external agents; billed per run
in Notion credits).

The **Notion desk** is a Claude agent created in the Notion sidebar carrying
a condensed CoS persona (`docs/NOTION-AGENT.md` is the paste-ready config).
Division of labour:

| | Notion desk (Claude agent in Notion) | Engine (Claude Code, this repo) |
| --- | --- | --- |
| Team @mentions/chats/assigns in Notion | ✅ Answers, triages, routes | — |
| Read KB / Promo Register / Client Directory | ✅ | ✅ |
| Update Requests rows, statuses, comments | ✅ | ✅ |
| Draft emails via Gmail, Xero, HubSpot, Fathom, web research | ❌ (no connectors, no web) | ✅ |
| Cost per interaction | Notion credits (per run) | $0 (Claude seats) |

Rules baked into the desk persona: it never attempts heavy work (routes it by
setting the Requests row for the next queue run), never approves anything,
and observes the same governance tiers. Notion agents cannot browse the web
or call other agents — that's fine; that's the engine's job.

This gives the team the "everything visible and actionable in Notion"
experience without renting a platform (cf. Demarly) and without burning
credits on work our Claude seats already cover.

### 8.3 One system, not three

The mature personal skills in Nici's AI-HQ (`inbox-manager`, `daily-brief`,
`client-project-manager`, `client-support-drafter`) are the reference
implementations for the team specialists here. When a team specialist and an
AI-HQ skill overlap, port the AI-HQ logic in — don't maintain two versions.
Long-term, team-relevant AI-HQ skills migrate here.

---

## 9. Slack front door

As v1: official Claude for Slack app + `.claude/slack-chief-of-staff.md`
persona; the answer-source map in `docs/BUSINESS-OS.md`; `!task …` messages
become Requests rows; approval nudges link Notion rows. Workspace:
`aiherway.slack.com`.

---

## 10. Remaining build steps

### 10.1 Admin actions (human, one-time)
- **A1** Install Claude for Slack; authorise connectors; invite to a private
  test channel first.
- **A2** ✅ Notion connector authorised (databases created 07/07/2026).
- **A3** Decide calendar sharing (free/busy to team, or shared calendar).

### 10.2 Rollout (see `docs/MANUAL.md` for the full test script)
1. **Week 1 — manual:** team logs real tasks in Requests; Nici runs
   `/process-queue` in Claude Code once or twice daily; tune routing +
   governance from what breaks. In parallel: admin enables Claude agents and
   sets up the **Notion desk** from `docs/NOTION-AGENT.md`.
2. **Week 2 — proactive:** turn on schedules (daily brief 7:30am, queue sweep
   hourly through business hours, weekly review Fri 4pm) — draft-only. Notion
   desk live to the whole team.
3. **Week 3 — Slack (optional):** add the Slack front door if the team still
   wants it after a week of the Notion desk.
4. **Month 2 — productise:** genericise into `starter-kit/` → the Hub's CEO
   OS department (§11).

---

## 11. The Hub product (was: replication kit)

The genericised version of this repo **is the CEO OS department** the student
library lists as coming-soon, plus the fork kit v1 specced:

- Generic `CLAUDE.md` with `<<COMPANY>>` placeholders + empty routing table
- Foundation templates (memory, voice, governance) — already generic in shape
- 5 department cards + 10 specialist templates + the model matrix
- The six Notion database schemas as an importable spec
- `SETUP.md`: connect tools → create databases → paste Slack persona → set
  schedules → run `/daily-brief`
- The org chart + a one-page explainer for non-technical teammates

Acceptance: a Hub member follows `SETUP.md` and has a working Chief of Staff
+ 3 specialists answering in Slack within an afternoon. Release cadence:
per the AI OS monthly department releases.

---

## 12. Future options (post-v1)

Unchanged from v1: multi-vendor models · promoted auto-send workflows (via the
governance table only) · deeper analytics agent (Windsor.ai) · client-facing
delivery agents. Added: **Notion Workers** (webhook on new Requests rows →
no polling; custom agent tools) as post-beta glue, and richer Notion-desk
duties as the Claude-in-Notion integration matures.

---

## 13. Risks & mitigations

| Risk | Mitigation |
| --- | --- |
| Agent sends something it shouldn't | Draft-by-default; approval gate; no auto-send; promotion only via governance table |
| Wrong/hallucinated answer | Answer-source map forces lookups; Strategy verifies; Activity Log audit |
| Privacy leak across the team | Least-privilege; teammates query shared surfaces only; department lanes |
| Cost creep | Per-agent models; Haiku for volume; $0-incremental architecture; Activity Log shows model per run |
| Notion/files drift apart | FR-9a same-session sync rule; weekly review checks |
| Prompt injection | External content is data, not instructions — in governance + every agent |
| Over-building | Grow the roster into real needs; departments make gaps visible without pre-building |

---

## 14. Milestones & acceptance

1. **M1 — Models live** ✅
2. **M2 — Notion control plane** ✅ created + seeded; acceptance: a test row
   flows Inbox → Done with Output + Activity Log entry (run in Week 1).
3. **M3 — Slack front door**: the two worked examples pass in a test channel.
4. **M4 — Proactive**: daily brief + queue sweep on schedule, draft-only.
5. **M5 — Hub kit**: a member stands it up from `SETUP.md` in an afternoon.

**Definition of done for v1:** a teammate asks a question in Slack and gets a
correct answer; logs a task that an agent completes in Notion with a human
approval gate; the daily brief posts itself — all within the guardrails.

---

## Appendix — repo map

- `CLAUDE.md` — Chief of Staff brain (routing, guardrails, model rubric)
- `foundation/` — shared memory (`business-context`, `voice`), governance,
  local logs
- `departments/*/AGENT.md` — 5 department head cards (authority + escalation)
- `.claude/agents/*.md` — 10 specialists, each with `model:` frontmatter
- `.claude/commands/*.md` — plays (`daily-brief`, `process-queue`,
  `triage-inbox`, `prep-meetings`, `weekly-review`, `delegate`, `eod`)
- `.claude/slack-chief-of-staff.md` — Slack persona
- `docs/MANUAL.md` — team manual: how to use it, how to test it
- `docs/BUSINESS-OS.md` — answer-source map + Notion database IDs
- `docs/PLAN.md` · `docs/RESEARCH.md` · `docs/SLACK.md` · `docs/SCHEDULING.md`
- `src/` — the VE Skills Dashboard (Vite app); unrelated, don't break it
