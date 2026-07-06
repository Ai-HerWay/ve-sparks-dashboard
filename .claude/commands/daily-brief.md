---
description: Morning brief — calendar, urgent email, and today's top priorities, ready to post to Slack.
argument-hint: "[optional: date or focus area]"
---

Produce Nici's morning brief for **$ARGUMENTS** (default: today). As Chief of
Staff, coordinate the specialists rather than doing it all yourself:

1. Ask `calendar-coordinator` for today's schedule, with any conflicts or gaps.
2. Ask `inbox-manager` for the overnight inbox: what needs Nici, what's drafted.
3. Ask `ops-coordinator` for the top open priorities/deadlines.

Then synthesise a single brief, kept short:

```
☀️ Daily Brief — <day, DD/MM/YYYY>
📅 Schedule: <count> meetings — <the notable ones + any prep needed>
📥 Inbox: <n> need you · <n> drafted for approval · <n> FYI
🎯 Today's top 3: 1) … 2) … 3 …
⚠️ Needs a decision: …
```

If a Slack channel is configured (see `docs/SLACK.md`), offer to post it there.
Do not send any emails or post anything without explicit confirmation.
