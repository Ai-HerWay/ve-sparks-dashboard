# Ai HerWay Business OS — where every answer lives

This is the backbone that turns the Chief of Staff from "a Claude that chats"
into **your business operating system**. The agent can only answer what it can
reach, so this file maps every common question to the system that holds the
truth. Keep it current — when a source moves, update the row.

## Answer-source map

| When someone asks about…            | The answer lives in…                | Owner agent          |
| ----------------------------------- | ----------------------------------- | -------------------- |
| Is Nici / someone free? bookings    | **Google Calendar**                 | `calendar-coordinator` |
| Affiliate & promo codes, checkout   | **ThriveCart** → `#thrivecart` channel | `crm-manager` / `data-reporter` |
| Social posts, what's scheduled      | `#social_media`, `#content-drafting`, content calendar | `content-marketer` |
| A client's status / project         | **HubSpot** + `#client-project`     | `crm-manager` / `client-success` |
| New leads, where they came from     | **HubSpot** + `#lead-logs`          | `crm-manager`        |
| Email / who replied                 | **Gmail**                           | `inbox-manager`      |
| A past meeting: what was decided    | **Fathom** → notes in Notion        | `meeting-scribe`     |
| SOPs, how-do-we-do-X, processes     | **Notion**                          | `ops-coordinator`    |
| Invoices, expenses, cash position   | **Xero**                            | `bookkeeper`         |
| Course / community questions        | `#student-chat`                     | `client-success`    |
| Numbers: sales, traffic, email KPIs | Analytics (Windsor.ai), HubSpot, Flodesk | `data-reporter` |

## The two worked examples

**1. "Ops manager wants to know if Nici's got something booked."**
- Route: `calendar-coordinator` → Google Calendar → reply in Slack.
- Prereq: the teammate can see Nici's calendar. Either (a) Nici shares her Google
  Calendar with the team (free/busy is enough), or (b) the Slack app uses a shared
  Ai HerWay calendar connector. Without one of these, Claude can only read the
  calendar of whoever is asking. **Decide this once** (see Permissions below).

**2. "What's our affiliate promo code for a social media thing?"**
- Route: `crm-manager` → search `#thrivecart` (and ThriveCart if connected) → reply.
- This already works with what you have: promo/affiliate details live in
  `#thrivecart`, and Claude can read Slack channels. To make it bulletproof, keep
  a **Promo & Campaign Register** (below) as the single source of truth.

## Single sources of truth to maintain

Create these once and the agent's answers get sharp. Keep them in Notion (live,
the agent reads them directly) and/or pinned in the relevant Slack channel:

- **Promo & Campaign Register** — for each active campaign: code, affiliate link,
  discount, start/end date, which social push it's for, ThriveCart product. Pin in
  `#thrivecart` and mirror in Notion.
- **Team & Roles** — who does what, so "who owns X?" resolves.
- **Client Directory** — one line per active client: owner, status, next step.
- **Brand & Voice** — tone, spelling (Australian English), do/don't list.

A template for the Promo & Campaign Register is in
`docs/templates/promo-register.md`.

## Permissions & privacy (decide once)

- **Whose data can teammates query?** Sharing Nici's calendar free/busy with the
  team is usually fine; sharing her inbox is not. Default: teammates can query
  **shared** calendars and **shared** channels/Notion, not personal inboxes.
- **Guardrails still apply in Slack.** The agent answers and drafts, but never
  sends client emails, moves money, or posts publicly without human approval —
  same rules as `CLAUDE.md`.
- **Confidential data stays put.** Financials and client PII are surfaced to the
  people who should see them, in the channels where they belong.

## The Notion control plane (live — created 07/07/2026)

Home page: **🤖 Digital Team HQ — AI Her Way** —
https://app.notion.com/p/39636d60c9a7810dbfe6d7c6f9479528
(page ID `39636d60-c9a7-810d-bfe6-d7c6f9479528`). Drag it into the
**🎉 Ai Her Way HQ** teamspace so the whole team can see it.

| Database | Database page | Data source ID (for queries/writes) |
| --- | --- | --- |
| Requests | `259d2bd7-b146-4827-9d2a-8e79e719d4ad` | `f7dde64d-39cb-4fb0-bbde-41e33d49501d` |
| Agent Registry | `db4589f9-5d47-402b-b995-06367b2b63d5` | `f70e5e93-eedc-4585-8b56-118523f05a0e` |
| Knowledge Base / SOPs | `61abe9e8-bcd3-4cb0-8e60-8d34f3cb2c64` | `adffefe6-2c3f-42e9-ad8a-bd7142dd992c` |
| Promo & Campaign Register | `88ba313e-d6b1-4ede-a356-195729d53283` | `bc74bf19-a3ee-4f37-8831-db5d49df2af1` |
| Client Directory | `000a7cbc-19d5-4c87-9db5-1359fe6f9d43` | `6db0a500-b1e0-448d-9960-b074184a87c2` |
| Activity Log | `70672c3b-6964-46b1-8b2a-c70557642f1f` | `ed9df664-f5be-4b6f-9a64-f44e3ad9d803` |

Child pages of the HQ page: 📖 Manual (`39636d60-c9a7-8146-b465-e0b8936788dc`)
and 📋 PRD v2 summary (`39636d60-c9a7-813d-baa1-f4b287714b84`) — mirrors of
`docs/MANUAL.md` and `docs/PRD.md`; change one, update the other.

## How the pieces connect

```
Team member in Slack
      │  @Claude / DM   (front door = official Claude for Slack app)
      ▼
Chief of Staff persona  (.claude/slack-chief-of-staff.md)
      │  routes using this map
      ▼
Reads the right system → Calendar · ThriveCart · HubSpot · Notion · Gmail · Xero
      │
      ▼
Answers in the thread · drafts anything outward-facing for approval
```
