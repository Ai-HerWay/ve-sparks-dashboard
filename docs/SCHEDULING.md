# Scheduling: making the Chief of Staff proactive

Allie K. Miller's key upgrade is that agents act **before you ask** — a morning
brief lands at 7:30am without anyone prompting it. In Claude Code that's done
with **scheduled tasks** on Claude Code for the web.

## How it works

A scheduled task is just a play (slash command) run on a cron schedule against
this repo. When it fires, a fresh Chief-of-Staff session runs the play and can
post the result to Slack.

## Recommended schedule

| Time (Australia)        | Play              | Posts to        |
| ----------------------- | ----------------- | --------------- |
| Weekdays 7:30am         | `/daily-brief`    | `#chief-of-staff` |
| Weekdays 8:30am         | `/prep-meetings`  | DM / channel    |
| Weekdays 5:30pm         | `/eod`            | DM              |
| Friday 4:00pm           | `/weekly-review`  | team channel    |

## Setting one up

From an **interactive** Claude Code session on this repo (web or CLI), ask:

> "Schedule `/daily-brief` to run every weekday at 7:30am Australia/Sydney and
> post the result to `#chief-of-staff`."

Claude Code will create the scheduled trigger. You can also manage triggers from
the Claude Code web UI.

## Guardrails for autonomous runs

- **Start read-only.** For the first week, scheduled runs should only *report*
  (brief, prep, review) — not send email or post to clients.
- **Draft-and-hold for anything outward-facing.** A scheduled inbox triage should
  save drafts and post a "N replies drafted, approve here" summary — not send.
- **One channel of record.** Point scheduled output at a single Slack channel so
  the team always knows where to look.
- **Turn on auto-send deliberately.** Only after you've watched a workflow behave
  for a while, and only per-workflow.

> Note: enabling scheduled tasks that touch email/Slack is an action with
> outward effects, so it's left for you to switch on from an interactive session
> rather than being auto-enabled by the scaffold.
