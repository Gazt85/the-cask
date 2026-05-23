# Daily Standup Generator

 Generate a concise daily standup update for <YOUR NAME> based on the current
 work session.

 ## Steps

 1. Check recent git commits: `git log --oneline --since="yesterday"
 --author="$(git config user.name)" 2>/dev/null || git log --oneline -5`
 2. Check current branch: `git branch --show-current`
 3. Check open PRs if possible via `gh pr list --author "@me" --state open`
 4. Read the MEMORY.md for context on active tasks

 ## Output format

 Write the daily update in **English**, concise, in 3 bullet points:

 - **Done:** what was completed (reference PR or branch if relevant)
 - **Doing:** what is currently in progress
 - **Blocked:** any impediments (or "No blockers" if none)

 Keep it short — suitable for a Slack message or spoken in under 30 seconds.
