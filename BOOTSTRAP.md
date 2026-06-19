# BOOTSTRAP.md — Session Execution Sequence

## On Every New Session

Run these steps in order before making any changes:

### 1. Read Memory Files

```
Read: AGENTS.md        → Understand rules and constraints
Read: CURRENT_TASK.md  → Understand what to work on
Read: MEMORY.md        → Understand past decisions and context
Read: KNOWN_ISSUES.md  → Understand existing bugs and debt
```

### 2. Verify Project State

```
Check: git status      → Any uncommitted changes?
Check: git branch      → Should be on `main`
Check: git log -n 5    → Recent changes for context
```

### 3. Confirm Architecture

```
Read: ARCHITECTURE.md  → File structure and slide counts
Read: CODING_STANDARD.md → Patterns and conventions
Read: UI_GUIDELINES.md → Visual design rules
```

### 4. Begin Work

- Check `CURRENT_TASK.md` for the active task.
- If no active task, ask the user what to work on.
- Before editing any HTML, open it in a browser to see the current state.
- After making changes, update `CURRENT_TASK.md`, `MEMORY.md`, and `CHANGELOG_AI.md`.

### 5. Commit and Push

```bash
git add -A
git commit -m "<descriptive commit message>"
git push origin main
```

---

## Quick Validation Checklist

Before any commit, verify:

- [ ] No hardcoded colours — all using CSS variables
- [ ] No hardcoded slide numbers — system is dynamic
- [ ] Both dark and light modes render correctly
- [ ] Mobile responsive (768px breakpoint)
- [ ] No use of "societal betterment" — always "betterment of society"
- [ ] Charts re-render on theme switch
- [ ] Slide number badges appear correctly
- [ ] `CHANGELOG_AI.md` is updated
