# Foundation — the shared brain

Every department in this system reads the Foundation before it does anything.
This mirrors the AI Her Way OS structure we teach in the AI for Impact Hub:
**you are the CEO, the AI works for you** — one shared memory, one set of
rules, departments on top.

## Loading order (every session)

1. `CLAUDE.md` (repo root) — the Chief of Staff brain and routing table
2. `foundation/memory/business-context.md` — who we are, offers, team, tools
3. `foundation/memory/voice.md` — how we sound
4. `foundation/governance/governance.md` — autonomy tiers and the never-list
5. The owning department's `departments/<name>/AGENT.md`
6. The specialist agent in `.claude/agents/`

## Layout

```
foundation/
├── memory/
│   ├── business-context.md   # the facts every agent needs
│   └── voice.md              # brand voice rules
├── governance/
│   └── governance.md         # autonomy tiers, never-list, approval loop
└── logs/
    ├── activity-log.md       # local mirror of the Notion Activity Log
    └── decision-log.md       # judgement calls flagged for review
```

The **Notion control plane is the primary record** for the team (Requests,
Activity Log, Agent Registry — see `docs/BUSINESS-OS.md` for database links).
The files here are the runtime copy agents read without burning API calls.
When a fact changes, update it here **and** in the Notion Knowledge Base.
