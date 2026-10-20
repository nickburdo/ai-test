# Project rules

## Planning: state coverage

Before a plan is approved, every user-facing flow (UI widget, input field, API endpoint, CLI command) has an explicit state table in the plan: each relevant state (for UI: loading, empty, error, invalid input; for other kinds of work — the equivalent set) and the exact signal that tells the code it is in that state (which response field, contract value or condition). A state without a signal is an open question for the user, resolved before approval — never filled in by me during implementation.

## Subagents

- **Prompts carry no decisions.** An agent prompt contains only references to plan sections and contracts, file ownership, and the standard working rules. It never describes behaviour in my own words. If writing a prompt makes me want to "clarify" behaviour, the plan has a gap: stop, ask the user, update the plan, then launch.
- **Contracts are frozen before launch.** All shared types and signatures are committed before agent worktrees are created. If a contract must change after launch: additive and optional changes only, sent to agents as a message (no cherry-picks into agent worktrees — auto mode may block them), wired in by me after merge. Any change that is not additive means stopping the agents and going back to the plan.

## Commits

Every commit on a branch must typecheck, lint and pass the tests that exist at that commit — including commits made by agents. Never commit code or tests that are known to fail (e.g. tests written against stubs, code that compiles only after a later merge). If parallel work makes this impossible, change the split of work instead of committing red.
