# Research: Allie K. Miller's "Chief of Staff" Multi-Agent System

_Compiled July 2026 for Ai HerWay._

## What she actually built

Allie K. Miller (former Amazon/IBM, "#1 most-followed voice in AI business")
publicly documented building a **digital workforce of ~34 AI agents**. The
headline insight is deliberately counter-intuitive:

> The single most important agent **does no work at all**. The other ~33 run
> **under a "chief of staff"** that decides who does what.

It is an **orchestrator pattern**. You talk to one agent — the chief of staff —
in plain English. It interprets the request, decides which specialist should
own it, hands the work off, and reports back. You never have to remember which
of 33 agents to summon; that routing is the chief of staff's whole job.

## How it's implemented

She built the entire thing **inside Claude Code using natural language** — no
traditional coding. The moving parts map exactly onto Claude Code's native
features:

| Concept (Allie's framing)        | Claude Code primitive            | Where it lives                |
| -------------------------------- | -------------------------------- | ----------------------------- |
| Chief of Staff (the orchestrator)| Main-session operating context   | `CLAUDE.md`                   |
| The ~33 specialist agents        | **Subagents**                    | `.claude/agents/*.md`         |
| Repeatable plays (email triage…) | **Slash commands**               | `.claude/commands/*.md`       |
| Proactive / autonomous behaviour | **Scheduled tasks (cron)**       | Claude Code on the web triggers |
| Company knowledge & preferences  | Context files                    | `CLAUDE.md` + `docs/`         |

Concrete examples she cites:
- **Agent files**: `email-drafting`, `client-notes`, `meeting-scheduling`.
- **Command files**: email triage, calendar prep, time blocking.
- **Scheduled tasks** so agents act *proactively* (e.g. a morning brief) rather
  than only when prompted.

She reports that non-engineers — consultants, entrepreneurs, Fortune 500 execs —
build their own "autonomous proactive agents" within ~48 hours once they see the
pattern. She published the prompts/commands so others can replicate it.

## The four modes of AI (her framework)

She frames AI use on a ladder of increasing trust/autonomy:

1. **Microtasker** — one-off small tasks.
2. **Companion** — an ongoing thought partner.
3. **Delegate** — you hand over whole projects/processes under human oversight.
4. **Teammate** — multiple agents working in parallel with their own goals and
   context (multi-threading, agent teams, looping, systems thinking).

The chief-of-staff system is how you get from "delegate" to "teammate": it's the
management layer that lets many agents run without you micromanaging each one.

## Why this maps perfectly to our situation

- We are already **inside Claude Code** (this very session), with a git repo and
  scheduled-task support on Claude Code for the web.
- Our **Claude Teams plan** gives the whole team access to Claude Code / claude.ai.
- We have a rich set of **connectors already wired** (Gmail, Google Calendar &
  Drive, Slack, Notion, HubSpot, Xero, Fathom, Flodesk, Canva, Gamma, analytics),
  which become the "hands" of each specialist agent.
- So we can build the *exact same architecture* she describes, tuned to Ai
  HerWay, and commit it to this repo where the team can use and evolve it.

## Sources

- [Allie K. Miller — official site](https://www.alliekmiller.com/)
- [Allie K. Miller — LinkedIn](https://www.linkedin.com/in/alliekmiller/)
- [Behind the Agentic AI Experiment — alliekmiller.com](https://www.alliekmiller.com/behind-the-agentic-ai-experiment)
- [AI-First Academy — alliekmiller.com](https://www.alliekmiller.com/ai-first-academy)
- [Claude Code in 5 Minutes — alliekmiller.com](https://www.alliekmiller.com/claude-code-in-5-minutes)
- [How to make Claude Code your Chief of Staff — the-ai-corner.com](https://www.the-ai-corner.com/p/claude-code-chief-of-staff-system)
- [How to Build an AI Agent Workforce with Allie K. Miller — YouTube](https://www.youtube.com/watch?v=Axnt-ug7jhc)
- [Calum Johnson Show w/ Allie K. Miller (transcript) — Singju Post](https://singjupost.com/calum-johnson-show-w-allie-k-miller-on-ai-agents-for-business-content-life-transcript/)
- [Fortune profile, Dec 2025](https://fortune.com/2025/12/16/ibm-aws-veteran-open-machine-ai-expert-allie-k-miller/)
