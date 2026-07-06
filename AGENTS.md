# Ai HerWay Agent Team — How to use it

This repo contains a **chief-of-staff multi-agent system**: one orchestrator you
talk to in plain English, which delegates to a team of specialist agents. It's
modelled on Allie K. Miller's pattern (see `docs/RESEARCH.md`) and built on
Claude Code's native features. Our Claude Teams plan covers the whole team.

## The 60-second version

1. Open this project in **Claude Code** (CLI or claude.ai/code).
2. Just talk to it. It reads `CLAUDE.md` and acts as your **Chief of Staff** —
   it figures out which specialist should do the work and delegates.
3. Or run a **play**: type `/daily-brief`, `/triage-inbox`, `/prep-meetings`,
   `/weekly-review`, `/delegate <thing>`, or `/eod`.

You never need to remember the 10 specialists. Describe the outcome; the Chief of
Staff routes it.

## The team

| Specialist            | Owns                                             |
| --------------------- | ------------------------------------------------ |
| `inbox-manager`       | Email triage, summaries, draft replies           |
| `calendar-coordinator`| Scheduling, calendar prep                        |
| `meeting-scribe`      | Meeting notes & action items (Fathom → Notion)   |
| `content-marketer`    | Social, blogs, newsletters, ads, content calendar|
| `crm-manager`         | Pipeline, follow-ups, onboarding (HubSpot)       |
| `bookkeeper`          | Invoices, expenses, reconciliation (Xero)        |
| `research-analyst`    | Market/competitor/prospect research              |
| `ops-coordinator`     | Tasks, SOPs, process docs (Notion)               |
| `client-success`      | Client check-ins, onboarding, retention          |
| `data-reporter`       | KPIs & performance reporting (analytics)         |

## The rules everyone can rely on

- **Draft, don't send.** Anything outward-facing (email, social, client message)
  is prepared for a human to approve. Nothing goes out on its own unless you've
  explicitly turned on "auto-send" for a specific workflow.
- **Money and contracts need a human.** Always.
- **It closes the loop.** Every request comes back with: what's done, what's
  drafted, and what needs your decision.

## Growing the team

Don't build all 33 agents up front — grow into them like Allie did. To add a
specialist, drop a new markdown file in `.claude/agents/` (copy an existing one)
and add a row to the routing table in `CLAUDE.md`. To add a repeatable play, add
a file to `.claude/commands/`.

## Where things live

- `CLAUDE.md` — the Chief of Staff's brain (context + routing + guardrails).
- `.claude/agents/` — the specialists.
- `.claude/commands/` — the plays.
- `docs/PLAN.md` — the full design and rollout plan.
- `docs/RESEARCH.md` — the research this is based on.
- `docs/SLACK.md` — how the team interacts via Slack.
- `docs/SCHEDULING.md` — how to make plays run automatically.
