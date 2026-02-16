# Valid Test Vectors

Each file in this directory represents the smallest valid instance of its file type, passing all required validation rules.

## Minimal Files

| File | Description |
|------|-------------|
| `minimal-llms.txt` | H1 + blockquote + one section (Contact) |
| `minimal-ai.txt` | `[identity]` + `[permissions]` + `[restrictions]` with one entry each |
| `minimal-ai.json` | Required fields only: `$schema`, `name`, `url`, `permissions` (1 item), `restrictions` (1 item) |
| `minimal-identity.json` | Required fields only: `$schema`, `name`, `type`, `url`, `description` |
| `minimal-brand.txt` | `[official-names]` + `[incorrect-names]` + `[naming-rules]` with minimal entries |
| `minimal-faq-ai.txt` | One `[Category]` section with one Q:/A: pair |

## Full Files

| File | Description |
|------|-------------|
| `full-llms.txt` | Every specified section populated: Services, What We Do Not Do, Key Information, Contact, Leadership, Locations, Certifications, Industries, AI Discovery Files, Optional |
