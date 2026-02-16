# AI Discovery Files -- Specification

**A framework of machine-readable files that help AI systems discover, interpret, trust, and safely use websites.**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-CC%20BY%204.0-green)
![Status](https://img.shields.io/badge/status-Informational-yellow)

---

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

Use the [365i AI Visibility Checker](https://www.365i.co.uk/ai-visibility-checker/) to validate your live site against the specification.

---

## Relationship to the Website

The canonical human-readable reference for AI Discovery Files is published at:

**https://www.ai-visibility.org.uk/specifications/**

The website provides guides, interactive examples, a quick-start tutorial, and a directory of sites implementing AI Discovery Files. It is designed for a broad audience including business owners, SEO practitioners, and marketers.

This RFC document is the **formal technical specification**. It is designed for engineers, standards bodies, researchers, and tool authors who need precise, implementation-focused language with RFC 2119 conformance keywords.

Both are authoritative. They should not contradict each other. When the website specification is updated, this document is updated to match, and a new version is tagged.

| Aspect | Website | This Specification |
|--------|---------|-------------------|
| Audience | Business owners, SEOs, marketers | Engineers, standards bodies, researchers |
| Tone | Accessible, guide-oriented | Formal, implementation-precise |
| Format | PHP-rendered pages with navigation | Markdown document with section numbers |
| Examples | Inline with explanations | Appendix and test vectors |
| Updates | Continuous deployment | Versioned releases (tagged) |

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

**365i** -- [https://www.365i.co.uk/](https://www.365i.co.uk/)

365i is a digital agency that builds tools for AI visibility verification. The [365i AI Visibility Checker](https://www.365i.co.uk/ai-visibility-checker/) is the reference implementation of this specification.

---

## Links

- Canonical website: https://www.ai-visibility.org.uk/
- Specification pages: https://www.ai-visibility.org.uk/specifications/
- AI Visibility Checker: https://www.365i.co.uk/ai-visibility-checker/
- Repository: https://github.com/BSolveIT/ai-discovery-files
