# Invalid Test Vectors

Each file in this directory contains a specific validation error. Text-based files include comments at the top explaining the error. JSON files cannot contain comments, so their invalidity reasons are documented below.

## Text Files (comment in file)

| File | Error |
|------|-------|
| `missing-h1-llms.txt` | Missing required H1 heading (`# Title`) at start of file |
| `missing-blockquote-llms.txt` | Missing required blockquote (`> ...`) after H1 heading |
| `missing-identity-ai.txt` | Missing required `[identity]` section in ai.txt |
| `empty-sections-brand.txt` | Required sections are present but contain no content |
| `orphan-question-faq.txt` | Q:/A: pairs appear outside of any `[Category]` section |

## JSON Files (no inline comments possible)

| File | Error |
|------|-------|
| `malformed-ai.json` | Invalid JSON syntax: missing comma between properties (line 7/8) |
| `empty-permissions-ai.json` | Schema violation: `permissions` array is empty (`minItems: 1` required) |
| `missing-type-identity.json` | Schema violation: missing required `type` property |
