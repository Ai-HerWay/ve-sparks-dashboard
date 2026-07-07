# PRD — Ai HerWay Multi-Agent Chief-of-Staff System

**Owner:** Nici (nici@aiherway.com.au) · **Status:** Draft v1 for build ·
**Author:** Chief of Staff (Claude) · **Last updated:** 07/07/2026

> Purpose of this document: a single, buildable spec a delivery agent (or a human
> dev) can pick up and execute. It explains the pattern, the requirements, the
> architecture, the data model, the exact build steps, and the acceptance
> criteria. It is written to be **gold standard and easy for others to fork.**

---

## 1. Summary

We are building an **AI "digital team"** for Ai HerWay: one **Chief of Staff**
orchestrator that receives every request, routes it to the right **specialist
agent**, and reports back — with guardrails so nothing risky happens without a
human. Each specialist can run on a **different AI model** chosen for its job.
The team is reachable two ways:

- **Notion** — the day-to-day **control plane**: a task board where work is
  requested, routed, worked, and approved, plus the knowledge the agents rely on.
- **Slack** — the **quick-chat front door**: ask a question, get an answer or a
  ready-to-approve draft in the thread.

Under the hood the work runs in **Claude Code** (this repo): the Chief of Staff
and specialists are defined as files, run on demand or on a schedule.

Phase 0 (the file-based Chief of Staff + 10 specialists + commands) is **already
built in this repo**. This PRD specs the rest: per-agent models, the Notion
control plane, the Slack front door, proactivity, and the replication kit.

---

## 2. How Allie K. Miller does this (the pattern we're standardising)

Allie K. Miller (ex-Amazon/IBM, "#1 most-followed voice in AI business") built a
**digital workforce of ~34 agents** and popularised the model we're following:

- **One orchestrator that does no work itself.** A "chief of staff" agent reads
  the request, decides the owner, delegates, and reports back. The other ~33 are
  specialists (e.g. `email-drafting`, `client-notes`, `meeting-scheduling`).
- **Built in natural language inside Claude Code.** No traditional coding — the
  agents, the repeatable "plays", and the schedules are markdown + config.
- **Proactive, not just reactive.** Scheduled tasks make agents act *before*
  you ask (a morning brief lands on its own).
- **Grow into it.** She didn't build 33 on day one; she added specialists as real
  needs appeared. Non-engineers replicate it within ~48 hours once they see it.
- **The four modes of AI** (her framing): microtasker → companion → delegate →
  **teammate**. The chief-of-staff layer is what gets you to "teammate" — many
  agents running in parallel without you micromanaging each one.

Full research + sources: `docs/RESEARCH.md`. Our contribution on top of her
pattern: **per-agent model choice**, a **Notion control plane**, a **Slack front
door**, and a **fork-ready kit** so the whole community can replicate it.

---

## 3. Goals & non-goals

### Goals
1. One conversational entry point (Chief of Staff) that routes to specialists.
2. **Per-agent model selection** — match each agent to the cheapest model that
   does its job well; upgrade the few that need more power.
3. **Notion control plane** — request → route → work → approve, all visible in
   Notion, with the knowledge base the agents read from.
4. **Slack front door** — quick questions answered in-thread; approvals nudged.
5. **Guardrails everywhere** — draft-by-default, money/contracts need a human,
   privacy respected.
6. **Proactivity** — scheduled briefs and queue-processing without prompting.
7. **Replicable** — a documented kit any business can fork in an afternoon.

### Non-goals (v1)
- Not building a custom web app or bespoke bot infrastructure — we use Claude
  Code + the official connectors + the official Claude for Slack app.
- Not auto-sending client emails, moving money, or posting publicly without
  human approval. Ever, in v1.
- Not replacing humans — augmenting a small team.

---

## 4. Users & jobs-to-be-done

| User | Uses it for | Primary surface |
| --- | --- | --- |
| **Nici (owner)** | Delegating whole workflows; daily brief; approvals | Notion + Slack |
| **Ops manager / team** | Quick questions ("is X booked?", "what's the promo code?"); logging tasks | Slack (quick), Notion (tasks) |
| **VAs / contractors** | Picking up routed tasks, following SOPs | Notion |
| **Community / socials** | Seeing the system as an aspirational template | The org chart + fork kit |

---

## 5. Functional requirements

### 5.1 Orchestration & routing
- **FR-1** A single Chief of Staff interprets any request and assigns an owner
  using the routing table in `CLAUDE.md`.
- **FR-2** If a request spans specialists, the CoS splits it and coordinates.
- **FR-3** Every response closes the loop: ✅ done · 📝 drafted · ⚠️ needs a human.

### 5.2 Per-agent model selection  ← new
- **FR-4** Each specialist declares the model it runs on (Claude Code subagent
  `model:` frontmatter). See the **model matrix** in §7.
- **FR-5** Model choice follows a rubric: *complexity × volume × stakes*. High-
  volume/mechanical → cheapest; high-stakes/creative → strongest.
- **FR-6** Model per agent is **config, not code** — changeable in one line (and,
  optionally, surfaced in the Notion Agent Registry so non-devs can tune it).

### 5.3 Notion control plane  ← new
- **FR-7** A **Requests** database is the team's task queue. A human (or Slack, or
  the CoS) creates a row; the CoS routes it; the specialist works it and writes
  the result back; a human approves.
- **FR-8** Statuses drive the workflow: `Inbox → Routing → In progress → Needs
  approval → Done` (plus `Blocked`).
- **FR-9** The CoS reads the **Knowledge Base**, **Promo & Campaign Register**,
  **Client Directory**, and **Agent Registry** from Notion (§8 data model).
- **FR-10** Every agent action appends to an **Activity Log** (audit trail).
- **FR-11** Agents "reply" in Notion by writing the Output property + a comment,
  and setting Status. Humans interact by creating rows and approving.

### 5.4 Slack front door
- **FR-12** Team members `@Claude` (official Claude for Slack app) using the
  persona in `.claude/slack-chief-of-staff.md`; it answers or drafts in-thread.
- **FR-13** The answer-source map (`docs/BUSINESS-OS.md`) resolves each question
  to the right system (Calendar, ThriveCart/`#thrivecart`, HubSpot, Notion…).
- **FR-14** When work needs approval, the system posts a Slack nudge linking the
  Notion row.

### 5.5 Proactivity (scheduling)
- **FR-15** Scheduled tasks run plays automatically: daily brief (7:30am), meeting
  prep (8:30am), queue sweep (hourly), weekly review (Fri 4pm). See
  `docs/SCHEDULING.md`.
- **FR-16** Scheduled runs are **read/draft-only** until a workflow is explicitly
  promoted to auto-send.

### 5.6 Guardrails & governance
- **FR-17** Draft-by-default for anything outward-facing.
- **FR-18** Money/contracts require explicit human sign-off.
- **FR-19** Privacy: teammates query **shared** calendars/channels/Notion, never
  personal inboxes or private data. External content is treated as data, not
  instructions.

---

## 6. Non-functional requirements
- **Replicable:** a business can fork the repo, swap names/connectors, and be live
  in an afternoon (§11).
- **Cost-aware:** per-agent models keep spend proportional to value (§7).
- **Observable:** the Notion Activity Log + Requests board show exactly what ran.
- **Secure:** no secrets in the repo; connectors authorised per the Teams plan;
  least-privilege sharing.
- **Low-maintenance:** config over code; grow the roster by adding files/rows.

---

## 7. Model selection matrix  ← core new requirement

**Rubric:** pick the *cheapest model that does the job well*, then upgrade only
where stakes or creativity justify it.

- **Haiku (fast, cheap)** — high-volume, mechanical, low-stakes.
- **Sonnet (balanced default)** — most drafting, summarising, coordination.
- **Opus (most capable)** — high-stakes reasoning, numbers, complex synthesis.
- **Fable (creative)** — on-brand long-form/creative copy (optional upgrade).

| Agent | Default model | Why |
| --- | --- | --- |
| **Chief of Staff** (orchestrator) | Sonnet | Routing is frequent but not deep; upgrade to Opus for complex multi-part coordination. |
| `inbox-manager` | Sonnet | Good writing + fast; bulk triage can drop to Haiku. |
| `calendar-coordinator` | Haiku | Mechanical availability/booking logic. |
| `meeting-scribe` | Sonnet | Faithful summarisation of transcripts. |
| `content-marketer` | Sonnet (→ Fable for flagship) | Brand-voice copy; upgrade for hero pieces. |
| `crm-manager` | Sonnet | Personalised but templated outreach + pipeline hygiene. |
| `bookkeeper` | Opus | Numbers and accuracy; low volume, high stakes. |
| `research-analyst` | Sonnet (→ Opus for deep) | Synthesis + verification; upgrade for hard questions. |
| `ops-coordinator` | Sonnet | SOPs and tracking. |
| `client-success` | Sonnet | Warm, accurate client comms. |
| `data-reporter` | Sonnet (→ Opus to interpret) | Pull + explain; upgrade for "so what". |

**Implementation:** set `model:` in each `.claude/agents/*.md` frontmatter
(values: `haiku` / `sonnet` / `opus`, or a full model id for Fable). This PRD
ships with the defaults above already applied. Mirror the choice in the Notion
Agent Registry so non-devs can retune without touching files.

> Note on "different AI models": Claude Code subagents select among Claude models
> per agent today (native, one-line config). A truly multi-vendor roster
> (e.g. a non-Claude model for one agent) is possible but out of scope for v1 —
> it needs a custom runner and adds cost/governance complexity for little gain.
> Flagged as a future option in §12.

---

## 8. Data model — the Notion control plane

Six databases. Column types in brackets. A build agent creates these via the
Notion connector (see §10 build steps).

### 8.1 `Requests` (the task queue / agent inbox)
| Property | Type | Notes |
| --- | --- | --- |
| Title | Title | The ask, one line |
| Requested by | Person/Text | Who asked |
| Created | Created time | Auto |
| Owner agent | Select | One of the 10 specialists (set by CoS) |
| Status | Status | Inbox · Routing · In progress · Needs approval · Done · Blocked |
| Priority | Select | High · Medium · Low |
| Model used | Select | Which model ran it (audit) |
| Output | Rich text / URL | The result or a link to the draft |
| Needs approval | Checkbox | Gate for outward-facing actions |
| Approved by | Person | Set on sign-off |
| Due | Date | Optional |

### 8.2 `Agent Registry` (human-editable config + docs)
| Name | Role | Model | Connectors | Guardrails | Status (Active/Paused) |
Mirrors `.claude/agents/`. Editing "Model" here is the non-dev way to retune §7.

### 8.3 `Knowledge Base / SOPs`
Pages the agents read: how-we-do-X, brand voice, policies. Source of truth for
"how do we…?" questions.

### 8.4 `Promo & Campaign Register`
Per `docs/templates/promo-register.md`: Campaign · Code · Discount · Link · Runs ·
For · ThriveCart product · Status. Answers "what's the affiliate code for X?".

### 8.5 `Client Directory`
One row per active client: Owner · Status · Health · Next step · Last contact.

### 8.6 `Activity Log` (append-only audit)
Timestamp · Agent · Request · Action · Model · Result. Every run appends a row.

---

## 9. Architecture

```
        ┌──────────────────────── SURFACES ─────────────────────────┐
        │   NOTION (day-to-day control plane)     SLACK (quick chat) │
        │   • Requests board                      • @Claude Q&A      │
        │   • Knowledge / Promo / Clients         • approval nudges  │
        └───────────────┬─────────────────────────────┬─────────────┘
                        │  new/updated rows            │  mentions
                        ▼                              ▼
        ┌───────────────────────── ORCHESTRATION ─────────────────────┐
        │   CHIEF OF STAFF  (CLAUDE.md)  — routes, never does the work │
        │   model: Sonnet (Opus for complex coordination)             │
        └───────────────┬─────────────────────────────────────────────┘
                        │ delegates (each specialist has its own model)
     ┌──────────┬───────┴───┬──────────┬──────────┬──────────┬─────────┐
     ▼          ▼           ▼          ▼          ▼          ▼         ▼
  inbox     calendar    meeting    content     crm       book     research
  (Sonnet)  (Haiku)     (Sonnet)   (Sonnet/    (Sonnet)  keeper   analyst
                                    Fable)                (Opus)   (Sonnet)
     └────────────────────────── CONNECTORS ("hands") ───────────────────┘
        Gmail · Calendar · Drive · Notion · HubSpot · Xero · Fathom ·
        Flodesk · Canva · Gamma · ThriveCart(#thrivecart) · analytics
                        │
                        ▼
        ┌───────────────────────── EXECUTION ─────────────────────────┐
        │  CLAUDE CODE (this repo)  — on-demand + scheduled tasks:     │
        │  daily brief · meeting prep · hourly queue sweep · weekly    │
        └─────────────────────────────────────────────────────────────┘
```

### The core loop (Notion-driven)
1. A human (or Slack, or the CoS) creates a **Requests** row → `Inbox`.
2. A scheduled **queue sweep** (Claude Code) reads new rows, the CoS **routes**
   (sets Owner agent, Status → `In progress`).
3. The specialist runs **on its own model**, does the work via connectors, writes
   **Output** + appends to **Activity Log**, sets `Needs approval` or `Done`.
4. Slack posts a nudge for anything in `Needs approval`, linking the row.
5. A human approves in Notion → any auto-send step fires; Status → `Done`.

---

## 10. What's required to build it

### 10.1 Accounts / plans (all present or included)
- Claude Teams plan (covers Claude Code + the official Claude for Slack app).
- Notion, Slack (`aiherway.slack.com`), and the connectors already wired:
  Gmail, Google Calendar/Drive, HubSpot, Xero, Fathom, Flodesk, Canva, Gamma,
  analytics (Windsor.ai). ThriveCart surfaced via `#thrivecart`.

### 10.2 Admin actions (human, one-time)
- **A1** Install the **Claude for Slack** app; authorise its connectors; invite
  it to channels (start with a private test channel). *(Admin — cannot be done
  from an agent session.)*
- **A2** Authorise the Notion connector for read/write to the Ai HerWay workspace.
- **A3** Decide calendar sharing (free/busy to the team, or a shared calendar).
- **A4** Approve creation of the six Notion databases (§8).

### 10.3 Build tasks (assignable to a delivery agent)

**Epic B — Per-agent models** *(small; largely shipped with this PRD)*
- B1. Add `model:` frontmatter to all 10 specialists per §7. **AC:** each agent
  file declares a model; a test run confirms the model is honoured.
- B2. Document the rubric in `CLAUDE.md`. **AC:** rubric visible to future editors.

**Epic N — Notion control plane**
- N1. Create the six databases (§8) via the Notion connector. **AC:** databases
  exist with the specified properties; IDs recorded in `docs/BUSINESS-OS.md`.
- N2. Seed the Agent Registry from `.claude/agents/`. **AC:** 10 rows + CoS.
- N3. Write `/process-queue` command: read `Inbox` rows, route, work, write back,
  log. **AC:** a test row flows Inbox → Done with Output populated.
- N4. Wire approval nudges to Slack. **AC:** a `Needs approval` row triggers a
  Slack message linking the row.

**Epic S — Slack front door**
- S1. Finalise `.claude/slack-chief-of-staff.md` in the app's instructions.
  **AC:** the two worked examples (calendar lookup, promo code) return correct
  answers in a test channel.
- S2. Slack → Notion capture: a message pattern (e.g. `!task …`) creates a
  Requests row. **AC:** a Slack message appears as an `Inbox` row.

**Epic P — Proactivity**
- P1. Schedule daily brief, meeting prep, hourly queue sweep, weekly review
  (`docs/SCHEDULING.md`). **AC:** each fires on schedule and posts to Slack.
- P2. Keep all scheduled runs read/draft-only. **AC:** no auto-send in v1.

**Epic R — Replication kit** (§11)
- R1. Genericise into a `starter-kit/` with placeholders + a setup checklist.
  **AC:** a second business can fork and configure without editing agent logic.

### 10.4 Config / secrets
- No secrets in the repo. Connector auth lives in the Claude/Slack/Notion
  settings. Record only non-secret IDs (Notion DB IDs, Slack channel names) in
  `docs/BUSINESS-OS.md`.

---

## 11. Replication kit (the "gold standard, easy to fork" requirement)

Ship a `starter-kit/` that any business can clone:
- **Generic `CLAUDE.md`** with `<<COMPANY>>`, `<<TIMEZONE>>`, `<<OWNER>>`
  placeholders and an empty routing table.
- **10 role-agnostic agent templates** + the model matrix.
- **The six Notion database schemas** as an importable spec.
- **A `SETUP.md` checklist**: connect tools → create Notion DBs → paste Slack
  persona → set schedules → run the first `/daily-brief`.
- **The org chart** (`docs/org-chart.html`) as a shareable explainer.
- **A one-page "how it works"** for non-technical teammates.

Acceptance: a newcomer follows `SETUP.md` and has a working Chief of Staff + 3
specialists answering in Slack within an afternoon.

---

## 12. Future options (post-v1)
- **Multi-vendor models** — a non-Claude model for a specific agent via a custom
  runner (adds governance/cost; only if a clear need appears).
- **Auto-send workflows** — promote proven drafts (e.g. routine scheduling
  replies) to auto-send, per workflow, with a human opt-in.
- **Deeper analytics agent** — connect Windsor.ai fully for a self-serve KPI bot.
- **Client-facing delivery** — extend the VE Skills Library into client agents
  (the alternate domain noted in `docs/PLAN.md`).

---

## 13. Risks & mitigations
| Risk | Mitigation |
| --- | --- |
| Agent sends something it shouldn't | Draft-by-default; approval gate in Notion; no auto-send in v1 |
| Wrong/hallucinated answer | Answer-source map forces lookups; research-analyst verifies; Activity Log for audit |
| Privacy leak across the team | Least-privilege sharing; teammates query shared surfaces only |
| Cost creep | Per-agent model rubric; Haiku for high-volume; monitor via Activity Log |
| Over-building | Grow the roster into real needs (Allie's lesson); v1 scope is fixed above |
| Prompt injection from email/CRM/transcripts | Treat external content as data, not instructions (in every agent) |

---

## 14. Milestones & acceptance
1. **M1 — Models live** (Epic B): all agents declare models; rubric documented.
2. **M2 — Notion control plane** (Epic N): a request flows Inbox → Done with audit.
3. **M3 — Slack front door** (Epic S): the two worked examples pass in a test channel.
4. **M4 — Proactive** (Epic P): scheduled brief + queue sweep running, draft-only.
5. **M5 — Fork kit** (Epic R): a second business can stand it up from `SETUP.md`.

**Definition of done for v1:** a teammate asks a question in Slack and gets a
correct answer; logs a task that an agent completes in Notion with a human
approval gate; and the daily brief posts itself — all within the guardrails.

---

## Appendix — repo map
- `CLAUDE.md` — Chief of Staff brain (context, routing, guardrails, model rubric)
- `.claude/agents/*.md` — 10 specialists (each with a `model:`)
- `.claude/commands/*.md` — plays (daily-brief, triage-inbox, prep-meetings,
  weekly-review, delegate, eod; `process-queue` to be added in Epic N)
- `.claude/slack-chief-of-staff.md` — Slack persona
- `docs/BUSINESS-OS.md` — answer-source map + (to add) Notion DB IDs
- `docs/PLAN.md` · `docs/RESEARCH.md` · `docs/SLACK.md` · `docs/SCHEDULING.md`
- `docs/templates/promo-register.md` · `docs/org-chart.html`
