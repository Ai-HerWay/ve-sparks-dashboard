# Slack: interacting with the Chief of Staff as a team

The whole team can work with the Chief of Staff through Slack, in two ways.

## Way 1 — Briefs and updates get posted to Slack (available now)

The Chief of Staff has a Slack connector. Any play can post its output to a
channel. To turn this on:

1. Create/choose a channel, e.g. `#chief-of-staff` or `#daily-brief`.
2. Add the channel name (or ID) here so the agents know where to post:

   > **Team channel:** `#___________`  ← fill this in
   > **Who the brief is for:** Nici (and the wider team for weekly reviews)

3. Then, at the end of `/daily-brief`, `/weekly-review`, etc., say
   "post it to `#chief-of-staff`" and it will. Once you've confirmed the format
   is right, combine this with `docs/SCHEDULING.md` so it posts automatically.

The Chief of Staff will always **draft** the Slack message and confirm before the
first post; once you're happy, you can let scheduled briefs post directly.

## Way 2 — The team messages the Chief of Staff from Slack (setup required)

Two options, depending on how hands-on you want to be:

- **Claude in Slack (Anthropic's official app).** With our Claude Teams plan, a
  workspace admin can add the Claude app to Slack so anyone can `@Claude` in a
  channel or DM. This gives a great conversational front door. Note: the Slack
  app is a single assistant — to give it this exact chief-of-staff behaviour,
  paste the routing/guardrail summary from `CLAUDE.md` into its custom
  instructions, or point it at this repo. It won't have the full subagent
  machinery that Claude Code has, but it's the fastest way to make the team
  interaction live.

- **Claude Code on the web + Slack trigger (full power).** Keep the real
  multi-agent system in Claude Code, and use Slack as the notification + trigger
  surface: the team drops requests in a channel, and a scheduled Claude Code task
  (see `SCHEDULING.md`) reads the channel, delegates, and posts results back.
  This keeps all 10 specialists in play.

### Recommended path
Start with **Way 1** today (zero setup — just name a channel), add **Claude in
Slack** for casual team questions, and graduate to the Claude Code + Slack
trigger loop once the daily brief is proven.

> Admin note: adding the Claude Slack app and authorising connectors is done by a
> workspace admin in Slack / claude.ai settings. This can't be done from inside a
> non-interactive agent session.
