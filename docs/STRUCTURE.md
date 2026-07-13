# The Internal OS — structure map for the curriculum builder

This folder is AI Her Way's own digital team: the system we run internally
and the system we will teach (it becomes the Hub's **CEO OS** department).
This file is the handover map — what each piece is, the order to read it in,
and how it connects to what we already teach students.

**Live copies of everything:**
- GitHub: `Ai-HerWay/ve-sparks-dashboard`, branch
  `claude/multi-agent-chief-of-staff-5zorcp` (this folder is a clone of it)
- Notion: **🤖 Digital Team HQ — AI Her Way** (the six live databases, plus
  the Manual, PRD summary, and Notion-desk setup as child pages)
- Animated explainer for teaching/presenting:
  https://claude.ai/code/artifact/b89b62ed-beff-42bc-9688-095c7b2889c6

---

## Read in this order

1. `docs/PRD.md` — *why* it's built this way (the spec, the cost model, the
   architecture decisions, the rollout). Start here.
2. `docs/MANUAL.md` — *how the team uses it* day to day, including the
   Week-1 five-test script. This is the closest thing to student-facing copy.
3. `CLAUDE.md` — the Chief of Staff brain itself. The routing table, loading
   order, guardrails, and model rubric, as the AI actually reads them.
4. One department end-to-end: `departments/sales-clients/AGENT.md` → then
   `.claude/agents/client-success.md` — to see how authority flows from a
   department card down into a specialist.
5. Everything else as reference.

---

## The directory, annotated

```
internal-os/
│
├── CLAUDE.md                     ← THE CHIEF OF STAFF. Single entry point:
│                                   org chart, routing table (request →
│                                   department → specialist), guardrails,
│                                   model rubric, Notion loop. Claude Code
│                                   reads this first, every session.
│
├── foundation/                   ← THE SHARED BRAIN (same concept as the
│   │                               Foundation students build in the AI OS)
│   ├── README.md                   · what Foundation is + loading order
│   ├── memory/
│   │   ├── business-context.md     · who we are, offers, team, tools
│   │   └── voice.md                · brand voice rules for every draft
│   ├── governance/
│   │   └── governance.md           · THE RULES: three autonomy tiers,
│   │                                 the never-list, the approval loop,
│   │                                 the promoted-workflows table (the
│   │                                 only way autonomy is ever raised)
│   └── logs/
│       ├── activity-log.md         · local fallback for the Notion log
│       └── decision-log.md         · judgement calls flagged for review
│
├── departments/                  ← THE MANAGEMENT LAYER. Five head cards.
│   │                               Each carries the authority model (may
│   │                               act / may draft / may never), reporting
│   │                               line, escalation, and lane boundaries.
│   ├── admin-ops/AGENT.md          · Eva's lane — 4 specialists
│   ├── marketing/AGENT.md          · Nici approves — 1 specialist
│   ├── sales-clients/AGENT.md      · Bianca's lane — 2 specialists
│   ├── finance/AGENT.md            · Nici only — 1 specialist (Opus)
│   └── strategy/AGENT.md           · Nici — 2 specialists
│
├── .claude/                      ← THE RUNNABLE LAYER (Claude Code reads this)
│   ├── agents/                     · the 10 specialists. Each file: role,
│   │   │                             remit, how it works, definition of
│   │   │                             done, + a footer wiring it to its
│   │   │                             department card and the Notion loop.
│   │   │                             `model:` frontmatter = per-agent model.
│   │   ├── inbox-manager.md            (sonnet · Admin & Ops)
│   │   ├── calendar-coordinator.md     (haiku  · Admin & Ops)
│   │   ├── meeting-scribe.md           (sonnet · Admin & Ops)
│   │   ├── ops-coordinator.md          (sonnet · Admin & Ops)
│   │   ├── content-marketer.md         (sonnet→fable · Marketing)
│   │   ├── crm-manager.md              (sonnet · Sales & Clients)
│   │   ├── client-success.md           (sonnet · Sales & Clients)
│   │   ├── bookkeeper.md               (opus   · Finance)
│   │   ├── research-analyst.md         (sonnet→opus · Strategy)
│   │   └── data-reporter.md            (sonnet→opus · Strategy)
│   ├── commands/                   · the "plays" (slash commands):
│   │   ├── process-queue.md            THE CORE LOOP — works the Notion
│   │   │                               Requests board Inbox → Done
│   │   ├── daily-brief.md · triage-inbox.md · prep-meetings.md
│   │   ├── weekly-review.md · delegate.md · eod.md
│   └── slack-chief-of-staff.md     · condensed persona for Slack (optional)
│
├── docs/                         ← THE PAPER TRAIL
│   ├── PRD.md                      · the build spec, v2.1 — architecture,
│   │                                 Notion cost model ("board not brain"),
│   │                                 model matrix, rollout, Hub product plan
│   ├── MANUAL.md                   · team manual: 3 ways to ask, how to
│   │                                 approve, the five-test script, FAQ
│   ├── NOTION-AGENT.md             · paste-ready config for the Chief of
│   │                                 Staff (Notion desk) — the Claude agent
│   │                                 that lives in the Notion sidebar
│   ├── BUSINESS-OS.md              · answer-source map + LIVE NOTION IDS
│   │                                 for the six databases
│   ├── SCHEDULING.md               · how the plays run on a schedule
│   ├── SLACK.md · PLAN.md · RESEARCH.md · org-chart.html
│   └── templates/promo-register.md
│
└── (src/, index.html, package.json…) ← the VE Skills Dashboard, a separate
                                        Vite app that shares this repo.
                                        IGNORE for curriculum purposes.
```

## The Notion half (not in this folder — it's live)

The six databases are the team-facing half of the system. The repo is the
engine; Notion is the board:

| Database | Job |
| --- | --- |
| Requests | The task queue — ask, watch, approve |
| Agent Registry | One row per agent: role, model, status (pause switch) |
| Knowledge Base / SOPs | What agents read before answering "how do we…" |
| Promo & Campaign Register | The only promo facts agents may quote |
| Client Directory | One row per active client |
| Activity Log | Append-only audit — every run, every model |

Database IDs and links: `docs/BUSINESS-OS.md`.

---

## How this maps to what we already teach

- **Same skeleton as the student AI OS:** Foundation (shared memory + voice +
  governance) with departments on top. A student who has built any Hub
  department already understands `foundation/` and `departments/`.
- **What's new (the CEO OS material):** the Chief of Staff routing layer,
  the Notion control plane, per-agent model selection, and team approval
  lanes. That's the curriculum delta — roughly four lessons:
  1. One router, many specialists (CLAUDE.md + the routing table)
  2. The board in Notion (six databases + the request lifecycle)
  3. Right model, right job (the model rubric in PRD §7)
  4. Earning autonomy (governance tiers + the promoted-workflows table)
- **Skill DNA:** the department cards carry the DNA's governance sections
  (governing principle, authority tiers, escalation, self-improvement);
  specialists stay lean because Claude Code runs them every session. When we
  productise, each specialist gets the full 11-section treatment per
  `_SKILL-DNA.md` in the ai-os-builder.
- **The teaching claim that makes this credible:** *we run what we teach.*
  The Activity Log is real, the approvals are real, and every correction the
  team makes during dogfooding becomes a documented lesson.

## What's deliberately NOT built yet

- No auto-send anywhere (v1 rule; promotions only via the governance table)
- Slack front door (optional, Week 3)
- The genericised fork kit / `starter-kit/` (Month 2 — this is the student
  product; placeholders like `<<COMPANY>>` replace our specifics)

*Last updated: 13/07/2026 · questions → Nici (nici@aiherway.com.au)*
