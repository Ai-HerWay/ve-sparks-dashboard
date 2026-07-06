# Execution Plan: Ai HerWay Chief-of-Staff Agent System

_Status: v1 scaffold built on branch `claude/multi-agent-chief-of-staff-5zorcp`._

## Goal

A single **Chief of Staff** you talk to in plain English. It decides which
specialist agent should own a piece of work, delegates it, and reports back —
interactive for the whole Ai HerWay team, reachable through **Claude Code /
claude.ai** (covered by our Teams plan) and surfaced in **Slack**.

## Architecture (Allie K. Miller's pattern, tuned for us)

```
                    ┌─────────────────────────┐
   You / the team ──▶   CHIEF OF STAFF         │  ← CLAUDE.md (the "brain")
   (chat or Slack)  │   routes • never does    │
                    │   the work itself        │
                    └────────────┬────────────┘
                                 │ delegates to a specialist
        ┌───────────┬───────────┼───────────┬───────────┬───────────┐
        ▼           ▼           ▼           ▼           ▼           ▼
   inbox-      calendar-   meeting-    content-    crm-        bookkeeper
   manager     coordinator scribe      marketer    manager     (Xero)
   (Gmail)     (Calendar)  (Fathom)    (Canva…)    (HubSpot)
        ▼           ▼           ▼           ▼           ▼           ▼
   research-   ops-        client-     data-       (add more as you grow)
   analyst     coordinator success     reporter
   (Web)       (Notion)    (comms)     (analytics)
```

- **Chief of Staff** = the operating instructions in `CLAUDE.md`. It holds the
  company context, the routing rules, and the guardrails.
- **Specialists** = `.claude/agents/*.md`. Each is a focused role with its own
  remit, tools, and "definition of done". They run in their own context so they
  don't distract each other.
- **Plays** = `.claude/commands/*.md`. Repeatable multi-step routines (daily
  brief, inbox triage, meeting prep, weekly review) the team can trigger by name.
- **Proactivity** = scheduled tasks on Claude Code for the web (documented in
  `docs/SCHEDULING.md`) so the system acts before you ask.

## What's in this repo now (v1)

| Layer          | Files                                             |
| -------------- | ------------------------------------------------- |
| Chief of Staff | `CLAUDE.md`                                        |
| Specialists    | `.claude/agents/` — 10 agents                     |
| Plays          | `.claude/commands/` — 6 commands                  |
| Onboarding     | `AGENTS.md`, `docs/RESEARCH.md`, this plan         |
| Scheduling     | `docs/SCHEDULING.md`                               |
| Slack wiring   | `docs/SLACK.md`                                    |

## Rollout phases

**Phase 0 — Foundations (this commit).** The scaffold above. Nothing runs
autonomously yet; every action is human-triggered and read-mostly.

**Phase 1 — Prove it on one workflow (week 1).**
1. Pick the highest-pain workflow — recommended: **daily brief + inbox triage**.
2. Run `/daily-brief` each morning by hand for a few days; refine the prompt and
   the `inbox-manager` agent until the output is genuinely useful.
3. Point the Chief of Staff at your real Slack channel for the brief.

**Phase 2 — Make it proactive (week 2).**
1. Turn the proven `/daily-brief` into a **scheduled task** (see `SCHEDULING.md`)
   that posts to Slack at 7:30am automatically.
2. Add `/prep-meetings` on a schedule ahead of your calendar.

**Phase 3 — Widen the team (week 3+).**
1. Add specialists as real needs appear (don't build all 33 up front — grow into
   them the way Allie did).
2. Give each team member the `/delegate` habit: describe the outcome, let the
   Chief of Staff route it.
3. Review weekly with `/weekly-review`; prune agents that aren't earning their keep.

## Guardrails (built into every agent)

- **Draft, don't send, by default.** Email/social/CRM specialists prepare drafts
  for human approval unless a workflow is explicitly marked "auto-send".
- **Money and external comms need a human.** Bookkeeper and client-facing agents
  never finalise payments or hit "send" to a client without sign-off.
- **Say what you did.** Every delegation reports back: what was done, what needs a
  human, and what it deliberately left alone.

## The one decision still open

This scaffold assumes **internal operations** as the first domain and **Claude
Code + Slack** as the surface (the two recommended defaults). If you'd rather
lead with **client-facing VA delivery** (turning the VE Skills Library into
working client agents) or go **Slack-first**, say so and I'll re-point the
roster — the pattern is identical, only the agent line-up changes.
