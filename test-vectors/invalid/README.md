# Invalid Test Vectors

Each file in this directory contains a specific validation error. Text-based files include comments at the top explaining the error. JSON files cannot contain comments, so their invalidity reasons are documented below.

Every file here MUST be rejected by a conforming validator. Run the suite with:

```
node schemas/validate.mjs --test-vectors ./test-vectors
```

## Text Files (comment in file)

| File | Type | Error |
|------|------|-------|
| `missing-h1-llms.txt` | ADF-001 | Missing required H1 heading (`# Title`) at start of file |
| `missing-blockquote-llms.txt` | ADF-001 | Missing required blockquote (`> ...`) after H1 heading |
| `missing-h1-llm.txt` | ADF-002 | Opens with a plain paragraph instead of a Markdown H1 |
| `missing-doctype-llms.html` | ADF-003 | Three failures at once: no `<!DOCTYPE html>`, empty `<title>`, empty `<h1>` |
| `missing-identity-ai.txt` | ADF-004 | Missing the required identity block (H1 + `Website:`) in ai.txt |
| `empty-sections-brand.txt` | ADF-007 | Required sections are present but contain no content |
| `orphan-question-faq-ai.txt` | ADF-008 | Q:/A: pairs appear outside of any `[Category]` section |
| `missing-sections-developer-ai.txt` | ADF-009 | None of the three required sections (`## Overview`, `## API Information`, `## Public Areas`) is present, though the prose mentions APIs and a stack |
| `no-user-agent-robots-ai.txt` | ADF-010 | No `User-agent:` line, so no rule group is established, and an `Allow:` path lacks its leading `/` |

## JSON Files (no inline comments possible)

| File | Type | Error |
|------|------|-------|
| `malformed-ai.json` | ADF-005 | Invalid JSON syntax: missing comma between properties (line 7/8) |
| `empty-permissions-ai.json` | ADF-005 | Schema violation: `permissions` array is empty (`minItems: 1` required) |
| `missing-type-identity.json` | ADF-006 | Schema violation: missing required `type` property |

## Why the last two text vectors matter

`missing-sections-developer-ai.txt` and `no-user-agent-robots-ai.txt` both passed validation before v1.13.0. The ADF-009 and ADF-010 validators searched the whole file for substrings such as "api" or "bot" rather than checking the structures the specification requires, so any prose on the subject satisfied them. Both vectors are written to look plausible for that reason: they read like real files and are still invalid.
