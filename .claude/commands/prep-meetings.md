---
description: Build a short prep brief for each of today's (or a chosen day's) meetings.
argument-hint: "[optional: date]"
---

For **$ARGUMENTS** (default: today), as Chief of Staff:

1. Ask `calendar-coordinator` for the day's meetings (time, attendees, purpose).
2. For each meeting, pull context: `research-analyst` for external attendees/
   companies, `meeting-scribe` for notes/actions from the last meeting with them,
   `crm-manager` if it's a client/deal.

Return one compact card per meeting:

```
🕘 <time> — <title> (with <attendees>)
   Purpose: …
   Context / last time: …
   Bring / decide: …
   Open actions on us: …
```

Read-only. Don't message any attendees.
