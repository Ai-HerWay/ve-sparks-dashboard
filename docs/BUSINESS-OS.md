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
