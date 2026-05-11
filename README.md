# AI Discovery Files -- Specification

**A framework of machine-readable files that help AI systems discover, interpret, trust, and safely use websites.**

![Version](https://img.shields.io/badge/version-1.10.0-blue)
![License](https://img.shields.io/badge/license-CC%20BY%204.0-green)
![Status](https://img.shields.io/badge/status-Community%20Specification%20(Stable)-brightgreen)

---

> **Working specification:** the authoritative, navigable, continuously
> updated specification lives at
> **<https://www.ai-visibility.org.uk/specifications/>**.
> This repository is a snapshot suitable for offline reading, packaging
> with implementations, and `git clone` access to the test vectors and
> schemas. If the website and this repository disagree on substance, the
> website wins.

## Quick Overview

AI Discovery Files (ADF) are a set of root-level files that websites publish to communicate their identity, permissions, capabilities, and boundaries to AI systems. They provide deterministic, machine-readable signals that large language models, AI agents, and retrieval-augmented generation pipelines can consume without ambiguity.

Unlike prompt-based testing or mention tracking, AI Discovery Files address the **input layer**: the structured signals a website exposes so that AI systems can make correct decisions about discovery, interpretation, attribution, and access.

### The 10 File Types

| Code | File | Purpose | Tier |
|------|------|---------|------|
| ADF-001 | `llms.txt` | Project description and documentation map for LLMs | Essential |
| ADF-002 | `llm.txt` | Condensed single-page context for token-limited models | Complete |
| ADF-003 | `llms.html` | Human-readable HTML version of LLM-oriented content | Complete |
| ADF-004 | `ai.txt` | AI usage permissions in human-readable plain text | Essential |
| ADF-005 | `ai.json` | AI usage permissions in machine-parseable JSON | Recommended |
| ADF-006 | `identity.json` | Structured organisational identity and contact data | Recommended |
| ADF-007 | `brand.txt` | Canonical naming, terminology, and brand guidelines | Recommended |
| ADF-008 | `faq-ai.txt` | Frequently asked questions optimised for AI retrieval | Recommended |
| ADF-009 | `developer-ai.txt` | Technical context, APIs, and integration guidance | Complete |
| ADF-010 | `robots-ai.txt` | Granular AI crawler access controls | Complete |

### Implementation Tiers

| Tier | Files | When to Use |
|------|-------|-------------|
| **Essential** | ADF-001, ADF-004 | Minimum viable AI discoverability |
| **Recommended** | Essential + ADF-005, ADF-006, ADF-007, ADF-008 | Standard implementation for most websites |
| **Complete** | All 10 files | Full AI visibility coverage |

---

## Repository Structure

```
rfc/
  README.md                  This file
  CONTRIBUTING.md            Contribution guidelines
  LICENSE                    CC BY 4.0

  spec/
    adf-spec.md              Complete specification document (Sections 1-8, Appendices)

  schemas/
    ai-json.schema.json      JSON Schema for ai.json (ADF-005)
    identity-json.schema.json JSON Schema for identity.json (ADF-006)
    validate.mjs             Command-line validator for all 10 file types

  examples/
    llms.txt                 Complete example files for
    llm.txt                  Horizon Strategic Consulting
    llms.html                (a fictitious consultancy)
    ai.txt
    ai.json
    identity.json
    brand.txt
    faq-ai.txt
    developer-ai.txt
    robots-ai.txt

  test-vectors/
    valid/                   Known-good files for validator testing
    invalid/                 Known-bad files that should fail validation

  meetings/                  Reserved for future community group notes
```

---

## Getting Started

### Read the Specification

The full specification is a single document:

- **[AI Discovery Files Specification](spec/adf-spec.md)** -- Introduction, Definitions, File Specifications, Interoperability, Validation, Security, IANA Considerations, References, and Appendices

### Browse the Examples

The [examples/](examples/) directory contains a complete set of AI Discovery Files for a fictitious organisation. These demonstrate correct formatting, required sections, and recommended content.

### Validate Your Files

A command-line validator checks all 10 file types:

```bash
# Validate a single file
node schemas/validate.mjs llms.txt

# Scan a directory for all ADF files
node schemas/validate.mjs --dir /var/www/html

# Run test vectors
node schemas/validate.mjs --test-vectors test-vectors
```

JSON Schemas for the two structured formats are also available in [schemas/](schemas/):

- [`ai-json.schema.json`](schemas/ai-json.schema.json) -- validates `ai.json` files
- [`identity-json.schema.json`](schemas/identity-json.schema.json) -- validates `identity.json` files

### Test Your Live Implementation

Use the [AI Visibility Checker](https://www.ai-visibility.org.uk/ai-visibility-checker/) (the reference implementation) to validate your live site against the specification.

---

## Standards-framework pages

Beyond the per-file specifications, the working specification on the
website includes a standards-framework layer covering conformance,
governance, security & privacy, the processing model, and the rest.
The full list (with one-line summaries) lives on the
[specifications hub](https://www.ai-visibility.org.uk/specifications/#standards-framework).

Key pages:

- [Conformance](https://www.ai-visibility.org.uk/specifications/conformance/) — Essential / Recommended / Complete classes
- [Conformance Registry](https://www.ai-visibility.org.uk/specifications/conformance-registry/) — the AI Visible Directory as canonical registry
- [Certification Badges](https://www.ai-visibility.org.uk/specifications/badges/) — three Directory-issued visual badges
- [Specification Registry](https://www.ai-visibility.org.uk/specifications/registry/) — machine-readable list of all 10 files
- [Versioning & Deprecation](https://www.ai-visibility.org.uk/specifications/versioning/) — SemVer 2.0.0; 12-month deprecation timeline
- [Governance](https://www.ai-visibility.org.uk/specifications/governance/) — 5-status proposal lifecycle
- [Security & Privacy](https://www.ai-visibility.org.uk/specifications/security-privacy/) — trust model, integrity roadmap
- [HTTP Behaviour](https://www.ai-visibility.org.uk/specifications/http-behaviour/) — status codes, media-type stance
- [Processing Model](https://www.ai-visibility.org.uk/specifications/processing-model/) — 7-stage consumer algorithm
- [Consumer Guidance](https://www.ai-visibility.org.uk/specifications/consumer-guidance/) — what AI systems SHOULD do
- [Related Standards](https://www.ai-visibility.org.uk/specifications/related-standards/) — positioning vs llmstxt.org, IETF, robots.txt, Schema.org, BCP 14, JSON Schema, SemVer
- [Implementations](https://www.ai-visibility.org.uk/specifications/implementations/) — public record of conformant implementations
- [Extensions](https://www.ai-visibility.org.uk/specifications/extensions/) — `x-` prefix rule and promotion path
- [i18n & Accessibility](https://www.ai-visibility.org.uk/specifications/i18n-a11y/) — multi-language publication, WCAG 2.1 AA targets
- [Roadmap](https://www.ai-visibility.org.uk/specifications/roadmap/) — theme-pegged forward plan

The full specification version history is at <https://www.ai-visibility.org.uk/changelog/>.

---

## Relationship to the Website

The **working specification** is published at:

**<https://www.ai-visibility.org.uk/specifications/>**

The website is the authoritative, continuously updated, navigable form
of the specification. Every per-file spec, every framework page, and the
changelog are individually versioned and tied together by a coordinated
release cadence. This repository tracks the website releases as snapshots.

| Aspect | Website | This Repository |
|--------|---------|-----------------|
| Status | Authoritative working specification | Snapshot |
| Audience | Business owners, SEOs, marketers, engineers, researchers | Engineers, tool authors, archivists, offline readers |
| Format | PHP-rendered pages with navigation | Markdown, JSON Schemas, test vectors |
| Examples | Inline with each spec page | `examples/` directory mirrors the website |
| Updates | Continuous deployment with coordinated MINOR releases | Tagged releases when the website ships a coordinated MINOR |

---

## Prior Art

This specification builds on established conventions and prior work. The following are acknowledged explicitly:

- **Jeremy Howard and Answer.AI** -- creators of the original [`llms.txt` convention](https://llmstxt.org/), which proposed a standard location for LLM-oriented site documentation. ADF-001 and ADF-002 extend this foundation.
- **robots.txt** ([RFC 9309](https://www.rfc-editor.org/rfc/rfc9309)) -- the foundational model for root-level discovery files that communicate site policy to automated agents.
- **security.txt** ([RFC 9116](https://www.rfc-editor.org/rfc/rfc9116)) -- established the pattern of a well-known file for structured contact and policy information.
- **Schema.org** -- the complementary structured data vocabulary for embedding machine-readable metadata in HTML.
- **humans.txt** ([humanstxt.org](https://humanstxt.org/)) -- prior art for human-readable site metadata files placed at the web root.
- **ads.txt** ([IAB Tech Lab](https://iabtechlab.com/ads-txt/)) -- demonstrated how an industry-standard plain text discovery file can achieve wide adoption.

AI Discovery Files do not replace any of these standards. They complement them by addressing a gap: structured communication between websites and AI systems.

---

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Types of contributions accepted:

- Clarifications to ambiguous specification language
- Additional examples and test vectors
- New file type proposals (ADF-011+)
- Corrections to errors or inconsistencies
- Improvements to JSON Schemas
- Tools and libraries that implement the specification

---

## License

This specification is licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

You are free to share and adapt this material for any purpose, including commercially, provided you give appropriate credit.

See [LICENSE](LICENSE) for the full text.

---

## Authors

**AI Visibility / 365i** -- [https://www.ai-visibility.org.uk/](https://www.ai-visibility.org.uk/)

AI Visibility is a 365i product. The [AI Visibility Checker](https://www.ai-visibility.org.uk/ai-visibility-checker/) is the reference implementation of this specification. The [AI Visible Directory](https://www.ai-visibility.org.uk/) is the canonical conformance registry, documented at [The Conformance Registry](https://www.ai-visibility.org.uk/specifications/conformance-registry/).

---

## Links

- Canonical website: https://www.ai-visibility.org.uk/
- Specification pages: https://www.ai-visibility.org.uk/specifications/
- AI Visibility Checker: https://www.365i.co.uk/ai-visibility-checker/
- Repository: https://github.com/BSolveIT/ai-discovery-files
