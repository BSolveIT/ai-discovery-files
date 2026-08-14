# Valid Test Vectors

Each file in this directory represents the smallest valid instance of its file type, passing all required validation rules.

All ten file types (ADF-001 to ADF-010) are covered.

## Minimal Files

| File | Type | Description |
|------|------|-------------|
| `minimal-llms.txt` | ADF-001 | H1 + blockquote + one section (Contact) |
| `minimal-llm.txt` | ADF-002 | H1 + blockquote + Services and Contact sections |
| `minimal-llms.html` | ADF-003 | DOCTYPE, `<html lang>`, non-empty `<title>` and `<h1>`, meta description, self-canonical, `index,follow` |
| `minimal-ai.txt` | ADF-004 | Identity block + `## Permissions` + `## Restrictions` with one entry each |
| `minimal-ai.json` | ADF-005 | Required fields only: `$schema`, `name`, `url`, `permissions` (1 item), `restrictions` (1 item) |
| `minimal-identity.json` | ADF-006 | Required fields only: `$schema`, `name`, `type`, `url`, `description` |
| `minimal-brand.txt` | ADF-007 | `## Official Name` + `## Do Not Use` + `## Naming Rules` with minimal entries |
| `minimal-faq-ai.txt` | ADF-008 | One `[Category]` section with one Q:/A: pair |
| `minimal-developer-ai.txt` | ADF-009 | The three required sections: `## Overview`, `## API Information` (using `status: none`), `## Public Areas` |
| `minimal-robots-ai.txt` | ADF-010 | Four `User-agent:` groups with rooted paths, plus `Discovery:` and `Sitemap:` |

## Full Files

| File | Type | Description |
|------|------|-------------|
| `full-llms.txt` | ADF-001 | Every specified section populated: Services, What We Do Not Do, Key Information, Contact, Leadership, Locations, Certifications, Industries, AI Discovery Files, Optional |

## A note on `Lang:`

`full-llms.txt` carries the optional BCP 47 `Lang:` declaration because its purpose is to exercise a complete file. The `minimal-*` vectors omit it deliberately: `Lang:` is OPTIONAL, and those vectors exist to show the minimum a conforming file needs. Nothing in `schemas/validate.mjs` inspects the header either way.
