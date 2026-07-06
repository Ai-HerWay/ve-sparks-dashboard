---
description: Sort the inbox into buckets, draft replies you can handle, and flag what needs a human.
argument-hint: "[optional: label, sender, or timeframe]"
---

Delegate to `inbox-manager` to triage the inbox for **$ARGUMENTS** (default:
unread from the last 24h).

Return:
- Bucket counts: 🔴 needs Nici · 🟡 drafted for approval · 🔵 FYI · ⚪ noise.
- For 🔴: a one-line summary each and the decision needed.
- For 🟡: replies saved as **drafts** (never sent) — list them so Nici can approve.
- Anything time-sensitive called out at the top.

Draft only. Nothing is sent without explicit approval.
