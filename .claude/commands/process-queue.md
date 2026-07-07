# /process-queue — work the Notion Requests board

Run the core loop of the team system: pick up new requests, route them, do the
work, write everything back where the team can see it.

## Steps

1. **Load context.** Read `CLAUDE.md` loading order (Foundation memory, voice,
   governance). Get the Requests + Activity Log database IDs from
   `docs/BUSINESS-OS.md`.
2. **Sweep the queue.** Query the Requests database for rows with Status
   `Inbox` or `Routing`, oldest first, `High` priority first.
3. **Route each row.** Using the routing table in `CLAUDE.md`:
   - Set **Owner agent** and Status → `In progress`.
   - If the ask is ambiguous, set Status → `Blocked`, comment with the one
     question that unblocks it, and move on. Never guess on high-stakes items.
4. **Do the work.** Delegate to the owning specialist (Agent tool) with a
   clean brief. The specialist works within its department card
   (`departments/*/AGENT.md`) and governance tiers.
5. **Write back.** On the row: fill **Output** (the result, or a link to the
   draft), set **Model used**, add a short comment summarising what was done.
   Then:
   - Always-safe work → Status `Done`.
   - Anything outward-facing or committing → tick **Needs approval**, Status
     `Needs approval`.
6. **Log every run.** Append a row to the Activity Log: timestamp · agent ·
   request title · action · model · result. If Notion is unreachable, append
   to `foundation/logs/activity-log.md` instead and say so.
7. **Nudge.** If anything landed in `Needs approval`, post one Slack message
   to the team channel listing the rows with links (or, if Slack isn't
   available this session, include them prominently in your wrap-up).
8. **Wrap up.** Report: how many rows processed, ✅ done, 📝 needing approval,
   🚫 blocked and why. Never leave a row half-moved.

## Rules

- Draft-by-default applies to every row — this command never sends, posts,
  pays, or publishes.
- One pass per run; don't loop waiting for approvals. Approvals are human
  work in Notion.
- Scheduled runs of this command are read/draft-only, per `docs/SCHEDULING.md`.
