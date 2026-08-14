---
title: AI Discovery Files Specification
abbreviation: ADF
version: 1.13.0
status: Community Specification (Stable)
date: 2026-08-14
authors: 365i / AI Visibility (https://www.ai-visibility.org.uk/)
canonical-url: https://www.ai-visibility.org.uk/specifications/
repository: https://github.com/BSolveIT/ai-discovery-files
license: CC BY 4.0 (specification text and examples) / MIT (JSON Schemas)
---

# AI Discovery Files Specification

> **Note on this document.** This Markdown document is a snapshot of the
> AI Discovery Files specification suitable for offline reading and for
> packaging with implementations. The **working specification is published
> on the web** at <https://www.ai-visibility.org.uk/specifications/>, where
> every per-file specification, the framework pages (conformance, registry,
> versioning, governance, security & privacy, HTTP behaviour, processing
> model, consumer guidance, test vectors, related standards, implementations,
> extensions, i18n & accessibility, roadmap, conformance registry, badges)
> are individually navigable and versioned. The on-line specification is
> authoritative if this document and the web version disagree on a point
> of substance.

## Specification additions since v1.0.0

The original v1.0.0 release (Feb 2026) defined the ten AI Discovery Files,
the AI Visibility vocabulary, and the implementation tiers. Versions 1.1.0
through 1.10.0 added the standards-framework layer that turns the original
specification from a useful convention into a credible community
specification. Each addition is published in full on the web at the URL
listed below; this document carries the v1.0.0 normative text plus the
additions are summarised here.

**v1.4.0 — Phase 1: standards-framework foundations.** RFC 2119 / RFC 8174
requirement-keyword discipline applied across every spec. Status-block
introduced (Draft, Stable, Deprecated, Retired). Conventions page
established as the single source for editorial and structural conventions
used across every AI Discovery File specification. Licensing page
established at <https://www.ai-visibility.org.uk/licensing/>. References
section added to every spec.

**v1.5.0 — Phase 2: conformance and machine-readable infrastructure.**
Formal Conformance specification (Essential / Recommended / Complete
classes). Machine-readable Specification Registry at
<https://www.ai-visibility.org.uk/specifications/registry.json>. Spec
meta-schema documenting the shape of every `*-specification.json` data
file. Validator-output schema as the standard output contract for
conformant validators. Versioned JSON Schema URLs (`/v1/`) alongside
unversioned "latest" aliases. Optional BCP 47 language declaration field
across all applicable AI Discovery Files (`Lang:` header in text files,
`"language"` property in JSON files).

**v1.6.0 — Phase 3: process, policy, security.** Versioning and
Deprecation Policy (SemVer 2.0.0; 12-month minimum deprecation timeline).
Governance and Editorial Process (5-status proposal lifecycle: Proposed,
Accepted, Published, Stable, Deprecated). Security and Privacy
Considerations (trust model, content-injection patterns, GDPR
considerations, access-control boundary, integrity primitives roadmap).
HTTP Behaviour (status codes, redirect handling, soft-404 detection,
caching, rate limits, CORS).

**v1.7.0 — Phase 4: implementer-facing depth.** Processing Model: the
seven-stage algorithm a conformant consumer MUST follow (discover, fetch,
validate, resolve identity, resolve permissions, detect contradictions,
emit normalised summary). AI Consumer Guidance: what AI systems SHOULD
do at training time, retrieval time, and citation time. Test Vectors
framing: this repository's `test-vectors/` directory is the canonical
test suite. Reference-implementation framing on the AI Visibility
Checker.

**v1.8.0 — Phase 5: positioning.** Relationship to Other Standards
positioning the specification against llmstxt.org (backwards compatible),
IETF AI Preferences (complementary), robots.txt and RFC 9309
(complementary; robots.txt takes precedence for access control),
Schema.org (alignment via `identity.json`), Common Crawl, W3C AI Use
Disclosure, BCP 14, JSON Schema 2020-12, SemVer 2.0.0. Implementations
report listing the five current conformant implementations
(WordPress plugin, AI Visibility Checker, AI Visible Directory,
templates, Service Pack). Explicit llmstxt.org backward-compatibility
statement: an llmstxt.org-conformant file is a valid `llms.txt` at
Essential conformance class. Formal multi-domain and subdomain scoping
rule: files are host-scoped per RFC 3986; cross-host identity asserted
via mutual `sameAs` declarations.

**v1.9.0 — Phase 6: long-term / forward-looking.** Public theme-pegged
Roadmap. Extension mechanism: experimental files use an `x-` prefix
(`x-products-ai.txt`); extension fields inside core JSON files use
`x-`-prefixed property names. Internationalisation and Accessibility:
locale-tagged fields (`nameLocalized`, `descriptionLocalized`),
experimental multi-variant file naming (`/llms-fr.txt`), RTL handling,
WCAG 2.1 AA targets for `llms.html`. **`Discovery:` directive added to
`robots-ai.txt`** (only normative addition in this release; publishers
MAY advertise AI Discovery Files on the same host, one absolute URL per
line). Formal media-type stance: reuse existing IANA-registered types,
no bespoke registrations. Expanded file integrity and signing roadmap
(four candidate mechanisms, six cross-cutting concerns).

**v1.10.0 — Conformance registry and certification badges.** Formal
documentation of the AI Visible Directory's role as canonical conformance
registry (verification process, re-check cadence, dispute resolution,
data protection). Three Directory-issued visual certification badges
(Essential / Recommended / Complete) with embed snippets, sizing
guidance, anti-fraud measures via linked per-publisher verification
records at `/directory/verify/<slug>/`, and licensing rules.

**v1.13.0 - conformance suite covers all ten file types, and the reference
validator enforces ADF-009 and ADF-010.** No normative requirement changes in
this release: every criterion now checked was already stated in Section 5.1.
The reference validator did not enforce two of them. `validateRobotsAiTxt` and
`validateDeveloperAiTxt` searched the whole file for substrings ("bot",
"agent", "api", "stack") rather than parsing structure, so a `robots-ai.txt`
whose entire contents were the word "robot" validated clean, and the only hard
error either could raise was on an empty file. They now check what Section
5.1.9 and Section 5.1.10 require: the three named sections for `developer-ai.txt`,
and for `robots-ai.txt` a `Directive: value` line shape, at least one
`User-agent:`, rooted path values, and `Allow:`/`Disallow:` appearing only
inside a rule group. Unknown directives warn rather than fail, because RFC 9309
tells parsers to ignore lines they do not recognise. Section checks accept both
the H2 and the bracketed form, as v1.12.0 requires of consumers. **Implementers
should expect files that previously validated to fail**: the text did not
change, but the enforcement did. Test vectors are added for the four types that
had none (`llm.txt`, `llms.html`, `developer-ai.txt`, `robots-ai.txt`), taking
the suite to eleven valid and twelve invalid vectors covering all ten types.
Separately, `validate.mjs` could not run the usage in its own header: the
positional-argument search excluded index `flagIdx + 1`, and `indexOf` returns
-1 for an absent flag, so index 0 was excluded and the file path with it.

**v1.12.0 - example set brought back in line with the reference
implementation.** The section format documented for `ai.txt` (ADF-004),
`brand.txt` (ADF-007), and `developer-ai.txt` (ADF-009) changes from bracketed
headers (`[permissions]`) to H2 Markdown headings (`## Permissions`). This
records what the reference implementation, the published templates, and the
canonical example files have emitted since the v2.1.0 plugin release; the
bracketed form was documentation-only. Consumers SHOULD accept either form.
Every canonical example now carries the optional BCP 47 language declaration
(`Lang:` / `"language"` / `lang=`) even though it remains OPTIONAL, and the
specification attribution block (a `---` footer in Markdown files, `#`-prefixed
lines at the top of comment-style files, a `_specification` URL in JSON, a
footer link in `llms.html`). `robots-ai.txt` examples now demonstrate the
`Discovery:` directive added in v1.7.0. `llms.html` guidance changes from
`noindex` with a cross-format canonical to `index,follow` with a self-canonical,
resolving a contradiction with Section 3.4.2. The `full-llms.txt` test vector
gains the `Lang:` declaration it was meant to demonstrate: it is the vector
whose purpose is to exercise a complete file, and it was the only one of the
canonical artefacts still omitting the header. The `minimal-*` vectors continue
to omit it deliberately, because `Lang:` is OPTIONAL and those vectors exist to
show the minimum a conforming file needs. Nothing in the reference validator
inspects the header, which is why the omission survived unnoticed; implementers
relying on tooling rather than on reading this document should not assume the
validator covers every OPTIONAL construct.

**v1.11.0 - JSON Schema corrections and Schema.org alignment.** The
published JSON Schemas for `ai.json` and `identity.json` (unversioned
aliases and versioned `/v1/` copies) no longer reject extension
properties: `additionalProperties` is now `true`. The `$schema` property
in both schemas is now an enum accepting both the unversioned schema URL
and the versioned `/v1/` URL. The `identity.json` schema is aligned with
Schema.org property names: `alternateNames` renamed to `alternateName`,
`founders` renamed to `founder` (a single person object or an array of
person objects). `areaServed` items accept plain strings or structured
objects (`{type, name, code}`). `foundingDate` accepts a bare year
(`YYYY`) as well as a full ISO 8601 date (`YYYY-MM-DD`). The canonical
example files now validate against their own published schemas.

Canonical URLs for each addition:

| Addition                       | URL                                                                        |
|--------------------------------|----------------------------------------------------------------------------|
| Conventions                    | <https://www.ai-visibility.org.uk/specifications/conventions/>             |
| Licensing & Trademark          | <https://www.ai-visibility.org.uk/licensing/>                              |
| Conformance                    | <https://www.ai-visibility.org.uk/specifications/conformance/>             |
| Specification Registry         | <https://www.ai-visibility.org.uk/specifications/registry/>                |
| Validator-output schema        | <https://www.ai-visibility.org.uk/specifications/validator-output.schema.json> |
| Versioning & Deprecation       | <https://www.ai-visibility.org.uk/specifications/versioning/>              |
| Governance                     | <https://www.ai-visibility.org.uk/specifications/governance/>              |
| Security & Privacy             | <https://www.ai-visibility.org.uk/specifications/security-privacy/>        |
| HTTP Behaviour                 | <https://www.ai-visibility.org.uk/specifications/http-behaviour/>          |
| Processing Model               | <https://www.ai-visibility.org.uk/specifications/processing-model/>        |
| Consumer Guidance              | <https://www.ai-visibility.org.uk/specifications/consumer-guidance/>       |
| Test Vectors framing           | <https://www.ai-visibility.org.uk/specifications/test-vectors/>            |
| Related Standards              | <https://www.ai-visibility.org.uk/specifications/related-standards/>       |
| Implementations                | <https://www.ai-visibility.org.uk/specifications/implementations/>         |
| Roadmap                        | <https://www.ai-visibility.org.uk/specifications/roadmap/>                 |
| Extensions                     | <https://www.ai-visibility.org.uk/specifications/extensions/>              |
| i18n & Accessibility           | <https://www.ai-visibility.org.uk/specifications/i18n-a11y/>               |
| The Conformance Registry       | <https://www.ai-visibility.org.uk/specifications/conformance-registry/>    |
| Certification Badges           | <https://www.ai-visibility.org.uk/specifications/badges/>                  |

For the full version history with dates and detailed change notes, see
<https://www.ai-visibility.org.uk/changelog/>.

---

## Abstract

This document specifies the AI Discovery Files (ADF) framework: a set of
ten machine-readable files placed at the root of a website to enable AI
systems to correctly discover, interpret, and responsibly use that website's
content. The specification defines the canonical structure, format
requirements, validation rules, and interoperability constraints for each
file type, organised into three cumulative implementation tiers. It
establishes a formal vocabulary for AI Visibility concepts and provides
authoritative precedence rules for resolving conflicts when multiple files
contain contradictory information.

This specification is informational. It does not define a protocol or
mandate implementation. Conforming implementations SHOULD follow the
requirements documented herein to ensure consistent interpretation by AI
systems.

## Table of Contents

- [1. Introduction](#1-introduction)
  - [1.1 Purpose](#11-purpose)
  - [1.2 Scope](#12-scope)
  - [1.3 Terminology](#13-terminology)
  - [1.4 Notational Conventions](#14-notational-conventions)
  - [1.5 Prior Art and Acknowledgements](#15-prior-art-and-acknowledgements)
- [2. Definitions](#2-definitions)
  - [2.1 AI Visibility (AV-001)](#21-ai-visibility-av-001)
  - [2.2 AI Visibility Checking (AV-002)](#22-ai-visibility-checking-av-002)
  - [2.3 AI Discovery Files (AV-003)](#23-ai-discovery-files-av-003)
  - [2.4 AI Visibility Tracking (AV-004)](#24-ai-visibility-tracking-av-004)
  - [2.5 AI Visibility Monitoring (AV-005)](#25-ai-visibility-monitoring-av-005)
  - [2.6 AI Retrieval Testing (AV-006)](#26-ai-retrieval-testing-av-006)
  - [2.7 Taxonomy and Relationships](#27-taxonomy-and-relationships)
- [3. File Specifications](#3-file-specifications)
  - [3.1 Overview and Implementation Tiers](#31-overview-and-implementation-tiers)
  - [3.2 llms.txt (ADF-001)](#32-llmstxt-adf-001)
  - [3.3 llm.txt (ADF-002)](#33-llmtxt-adf-002)
  - [3.4 llms.html (ADF-003)](#34-llmshtml-adf-003)
  - [3.5 ai.txt (ADF-004)](#35-aitxt-adf-004)
  - [3.6 ai.json (ADF-005)](#36-aijson-adf-005)
  - [3.7 identity.json (ADF-006)](#37-identityjson-adf-006)
  - [3.8 brand.txt (ADF-007)](#38-brandtxt-adf-007)
  - [3.9 faq-ai.txt (ADF-008)](#39-faq-aitxt-adf-008)
  - [3.10 developer-ai.txt (ADF-009)](#310-developer-aitxt-adf-009)
  - [3.11 robots-ai.txt (ADF-010)](#311-robots-aitxt-adf-010)
- [4. Interoperability](#4-interoperability)
  - [4.1 Cross-File Consistency Requirements](#41-cross-file-consistency-requirements)
  - [4.2 Precedence Rules](#42-precedence-rules)
  - [4.3 Conflict Resolution](#43-conflict-resolution)
  - [4.4 Relationship to Existing Standards](#44-relationship-to-existing-standards)
- [5. Validation Framework](#5-validation-framework)
  - [5.1 File-Level Validation](#51-file-level-validation)
  - [5.2 Cross-File Validation](#52-cross-file-validation)
  - [5.3 Scoring Methodology](#53-scoring-methodology)
  - [5.4 Test Prompts](#54-test-prompts)
- [6. Security Considerations](#6-security-considerations)
  - [6.1 Content Integrity](#61-content-integrity)
  - [6.2 Impersonation Prevention](#62-impersonation-prevention)
  - [6.3 Crawler Rate Limiting](#63-crawler-rate-limiting)
  - [6.4 Privacy Implications](#64-privacy-implications)
  - [6.5 Future Security Extensions](#65-future-security-extensions)
- [7. IANA Considerations](#7-iana-considerations)
  - [7.1 Well-Known URI Registration](#71-well-known-uri-registration)
  - [7.2 Media Type Considerations](#72-media-type-considerations)
- [8. References](#8-references)
  - [8.1 Normative References](#81-normative-references)
  - [8.2 Informative References](#82-informative-references)
- [Appendix A. Complete Example Set](#appendix-a-complete-example-set)
- [Appendix B. JSON Schemas](#appendix-b-json-schemas)
- [Appendix C. Implementation Checklist](#appendix-c-implementation-checklist)
- [Appendix D. Change Log](#appendix-d-change-log)

---

## 1. Introduction

### 1.1 Purpose

AI Discovery Files (ADF) are machine-readable files placed at the root of a
website that enable AI systems to correctly discover, interpret, and
responsibly use that website's content. As AI systems -- including large
language models (LLMs), AI search engines, and retrieval-augmented
generation (RAG) systems -- increasingly serve as intermediaries between
users and websites, the need for explicit, structured communication between
website operators and AI systems has become apparent.

Without AI Discovery Files, AI systems must infer a website's identity,
scope, permissions, and preferred representation from scattered,
unstructured content. This inference process is inherently unreliable and
may result in misidentification, misrepresentation, or misuse of website
content.

This specification defines the canonical structure, format, and
requirements for all ten ADF file types. It provides website operators with
a deterministic mechanism to communicate with AI systems and provides AI
system developers with a consistent framework for consuming that
communication.

### 1.2 Scope

This specification covers:

1. **File types.** The ten ADF file types, designated ADF-001 through
   ADF-010, their formats, required and optional fields, and validation
   rules.

2. **Implementation tiers.** Three cumulative tiers (Essential,
   Recommended, Complete) that enable progressive adoption.

3. **Validation rules.** The requirements a file MUST satisfy to be
   considered conforming.

4. **Interoperability.** The precedence hierarchy and conflict resolution
   rules that apply when multiple files contain contradictory information.

5. **Relationship to existing standards.** How ADF files interact with
   robots.txt (RFC 9309), security.txt (RFC 9116), Schema.org, and other
   established web standards.

This specification does not cover:

- The internal implementation of AI systems that consume these files.
- Legal enforceability of permissions or restrictions declared in ADF files.
- Scoring methodologies for evaluating AI Visibility.
- The content of individual websites' ADF files.

### 1.3 Terminology

This specification defines six core terms within the AI Visibility
vocabulary. Each term is assigned a unique term code for unambiguous
reference.

| Code   | Term                      | Summary                                           |
|--------|---------------------------|---------------------------------------------------|
| AV-001 | AI Visibility             | The goal: being discoverable and interpretable by AI systems |
| AV-002 | AI Visibility Checking    | Validating infrastructure that enables AI visibility |
| AV-003 | AI Discovery Files        | The mechanism: machine-readable files for AI systems |
| AV-004 | AI Visibility Tracking    | Measuring outcomes in AI-generated responses       |
| AV-005 | AI Visibility Monitoring  | Real-time observation of AI system behaviour       |
| AV-006 | AI Retrieval Testing      | Prompt-based testing of AI system responses        |

Formal definitions for each term are provided in Section 2.

### 1.4 Notational Conventions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
"SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
document are to be interpreted as described in [RFC 2119].

| Keyword                   | Meaning                                                |
|---------------------------|--------------------------------------------------------|
| MUST / REQUIRED / SHALL   | Absolute requirement. Non-compliance renders a file non-conforming. |
| MUST NOT / SHALL NOT      | Absolute prohibition. Inclusion renders a file non-conforming. |
| SHOULD / RECOMMENDED      | There may be valid reasons to deviate, but the implications must be understood. |
| SHOULD NOT / NOT RECOMMENDED | There may be valid reasons to include, but the implications must be understood. |
| MAY / OPTIONAL            | Truly optional. Implementations MUST NOT assume presence. |

### 1.5 Prior Art and Acknowledgements

This specification builds upon and acknowledges the following prior work:

- **Jeremy Howard and Answer.AI** -- Creators of the original `llms.txt`
  convention (https://llmstxt.org), which established the pattern of
  root-level, Markdown-formatted files for AI system consumption. The
  ADF-001 specification adopts and extends this convention.

- **robots.txt (RFC 9309)** -- The Robots Exclusion Protocol, which
  established the model for root-level discovery files that communicate
  machine-readable directives to automated agents. The `robots-ai.txt`
  file (ADF-010) follows its syntax conventions.

- **security.txt (RFC 9116)** -- A method for web security policies, which
  provided inspiration for structured, root-level policy files that declare
  contact information and organisational preferences.

- **Schema.org** -- The collaborative vocabulary for structured data on the
  web. The `identity.json` file (ADF-006) aligns with Schema.org
  Organisation vocabulary to ensure familiarity and interoperability.

- **humans.txt** -- Prior art for human-readable site metadata files placed
  at the website root. The `llms.html` file (ADF-003) serves an analogous
  purpose for AI-related information.

- **ads.txt (IAB Tech Lab)** -- An industry-standard discovery file that
  established the pattern of root-level plain text files for declaring
  authorised relationships. The ADF framework follows a similar deployment
  model.

---

## 2. Definitions

This section provides formal definitions for the six terms in the AI
Visibility vocabulary. These definitions are canonical; all other documents,
implementations, and references SHOULD defer to the definitions stated here.

### 2.1 AI Visibility (AV-001)

**Term:** AI Visibility

**Term Code:** AV-001

**Definition:** The degree to which a website or digital entity can be
discovered, correctly interpreted, accurately represented, and safely cited
by AI systems including large language models, AI search engines, and
retrieval-augmented generation systems.

**Notes:**

1. AI Visibility is established through AI Discovery Files, structured
   data, consistent machine-readable identity signals, and clear technical
   infrastructure that enables AI systems to understand and trust a
   website's content.

2. AI Visibility is distinct from traditional search engine visibility. A
   website may rank well in conventional search results whilst having poor
   AI Visibility, or vice versa. The signals that enable AI systems to
   accurately represent a website differ fundamentally from the signals that
   drive search engine rankings.

### 2.2 AI Visibility Checking (AV-002)

**Term:** AI Visibility Checking

**Term Code:** AV-002

**Definition:** The process of technically verifying whether a website's
infrastructure -- including AI Discovery Files, structured data, and
identity consistency -- enables AI systems to discover, interpret, trust,
and safely use that website as an information source.

**Notes:**

1. AI Visibility Checking validates capability, not outcomes. It answers the
   question: "Can AI systems technically understand and trust this website?"
   rather than "Do AI systems currently mention this website?"

2. AI Visibility Checking is deterministic and verifiable. Results can be
   reproduced, inspected, and validated independently. The same website
   analysed with the same methodology will yield the same findings.

**Validates:**

- Website discovery by AI systems
- Accurate business or entity identification
- Understanding of scope, services, and offerings
- Recognition of explicit exclusions
- Trust and authority signals
- Safe citation and recommendation capability

**Is not:**

- Brand mention tracking
- Prompt-based testing
- Ranking simulation
- Sentiment analysis
- Search visibility metrics
- AI traffic analytics
- Historical monitoring

Those activities fall under AI Visibility Tracking (AV-004), AI Visibility
Monitoring (AV-005), or AI Retrieval Testing (AV-006), as defined in
Sections 2.4 through 2.6.

### 2.3 AI Discovery Files (AV-003)

**Term:** AI Discovery Files

**Term Code:** AV-003

**Definition:** Machine-readable files published on a website specifically
to communicate information to AI systems. These files enable websites to
declare their identity, scope, services, permissions, and preferred
representation to AI crawlers and large language models.

**Core files:**

| Code    | Filename          | Purpose                                                |
|---------|-------------------|--------------------------------------------------------|
| ADF-001 | `llms.txt`        | AI-readable business identity and context              |
| ADF-002 | `llm.txt`         | Compatibility variant (SHOULD redirect to `llms.txt`)  |
| ADF-003 | `llms.html`       | Human-readable reference version of AI identity information |
| ADF-004 | `ai.txt`          | AI usage permissions and intent signals                |
| ADF-005 | `ai.json`         | Machine-parseable AI interaction guidance in JSON      |
| ADF-006 | `identity.json`   | Structured canonical identity data                     |
| ADF-007 | `brand.txt`       | Brand naming, terminology, and representation rules    |
| ADF-008 | `faq-ai.txt`      | Factual Q&A formatted for AI consumption               |
| ADF-009 | `developer-ai.txt`| Technical, platform, and integration context           |
| ADF-010 | `robots-ai.txt`   | AI crawler-specific access directives                  |

**Supporting files** (not defined by this specification but relevant to AI
Visibility):

| Filename          | Purpose                                                    |
|-------------------|------------------------------------------------------------|
| `robots.txt`      | General crawler directives, including AI-specific user agents |
| `sitemap.xml`     | Site structure used by AI crawlers for content discovery    |
| `security.txt`    | Security contact information, increasingly referenced by AI systems |
| `humans.txt`      | Human-readable site information that AI systems may parse  |
| Structured data   | Schema.org and similar embedded metadata                   |

### 2.4 AI Visibility Tracking (AV-004)

**Term:** AI Visibility Tracking

**Term Code:** AV-004

**Definition:** The ongoing measurement of how a website or brand appears in
AI-generated responses over time. This includes monitoring mention
frequency, sentiment, accuracy of representation, and changes in how AI
systems describe or recommend the entity.

**Notes:**

1. AI Visibility Tracking measures outcomes rather than validating
   infrastructure. It observes what AI systems currently do, not what they
   are technically capable of doing.

2. AI Visibility Tracking is the parent category for both AI Visibility
   Monitoring (AV-005) and AI Retrieval Testing (AV-006).

### 2.5 AI Visibility Monitoring (AV-005)

**Term:** AI Visibility Monitoring

**Term Code:** AV-005

**Definition:** The continuous observation of AI system behaviour related to
a website or brand, typically including automated alerts for significant
changes in AI-generated mentions, representations, or recommendations.

**Notes:**

1. AI Visibility Monitoring is a subset of AI Visibility Tracking (AV-004)
   focused on real-time or near-real-time observation and notification.

**Parent term:** AI Visibility Tracking (AV-004)

### 2.6 AI Retrieval Testing (AV-006)

**Term:** AI Retrieval Testing

**Term Code:** AV-006

**Definition:** The practice of querying AI systems with specific prompts to
observe whether and how they reference a particular website or brand in
their responses.

**Notes:**

1. AI Retrieval Testing results are inherently variable, as they depend on
   prompt phrasing, model version, temperature settings, and other factors
   outside the tester's control.

2. Results from AI Retrieval Testing are indicative rather than
   deterministic. They provide a snapshot of current AI behaviour, not a
   measure of technical capability.

**Parent term:** AI Visibility Tracking (AV-004)

### 2.7 Taxonomy and Relationships

The six AI Visibility terms form a structured taxonomy. The following
diagram illustrates the hierarchical relationships:

```
                        AI Visibility (AV-001)
                               |
               +---------------+---------------+
               |                               |
       AI Visibility Checking          AI Visibility Tracking
            (AV-002)                        (AV-004)
               |                               |
       Validates INPUTS                Observes OUTPUTS
       (infrastructure,               (mentions, citations,
        machine-readable                rankings, responses)
        signals)                           |
               |                    +------+------+
               |                    |             |
       AI Discovery Files     AI Visibility  AI Retrieval
            (AV-003)           Monitoring     Testing
                                (AV-005)     (AV-006)
```

The fundamental distinction in this taxonomy is between **inputs** and
**outputs**:

- **AI Visibility Checking (AV-002)** validates inputs: the infrastructure,
  files, and signals that determine whether AI systems _can_ correctly
  interpret and represent a website. It is deterministic, reproducible, and
  verifiable.

- **AI Visibility Tracking (AV-004)** observes outputs: how AI systems
  _currently_ mention, cite, or represent a website in their responses. It
  is inherently variable and dependent on factors outside the website
  operator's control.

AI Discovery Files (AV-003) are the primary mechanism through which AI
Visibility Checking validates infrastructure. They provide the structured,
machine-readable signals that AI systems consume.

AI Visibility Monitoring (AV-005) and AI Retrieval Testing (AV-006) are
both subsets of AI Visibility Tracking. Monitoring focuses on continuous
observation; Retrieval Testing focuses on discrete, prompt-based queries.

---

## 3. File Specifications

### 3.1 Overview and Implementation Tiers

The ten AI Discovery Files are organised into three cumulative
implementation tiers. Each tier builds upon the previous one.

#### 3.1.1 Essential Tier (2 files)

The Essential tier provides the minimum viable AI Discovery Files
implementation. It enables AI systems to identify a business and understand
basic usage permissions.

| Code    | File        | Purpose                                         |
|---------|-------------|-------------------------------------------------|
| ADF-001 | `llms.txt`  | AI-readable business identity and context        |
| ADF-004 | `ai.txt`    | AI usage permissions and restrictions            |

An implementation providing these two files satisfies the Essential tier.

#### 3.1.2 Recommended Tier (6 files)

The Recommended tier adds structured identity data, machine-parseable
permissions, brand guidance, and pre-written FAQ content.

| Code    | File             | Purpose                                    |
|---------|------------------|--------------------------------------------|
| ADF-001 | `llms.txt`       | AI-readable business identity and context   |
| ADF-004 | `ai.txt`         | AI usage permissions and restrictions       |
| ADF-005 | `ai.json`        | Machine-parseable AI interaction guidance   |
| ADF-006 | `identity.json`  | Structured canonical identity data          |
| ADF-007 | `brand.txt`      | Brand naming conventions                    |
| ADF-008 | `faq-ai.txt`     | Structured Q&A for AI consumption           |

An implementation providing these six files satisfies the Recommended tier.

#### 3.1.3 Complete Tier (10 files)

The Complete tier adds the compatibility variant, human-readable
presentation, technical context, and AI-specific crawler directives.

| Code    | File               | Purpose                                  |
|---------|--------------------|------------------------------------------|
| ADF-001 | `llms.txt`         | AI-readable business identity and context |
| ADF-002 | `llm.txt`          | Compatibility variant                     |
| ADF-003 | `llms.html`        | Human-readable HTML presentation          |
| ADF-004 | `ai.txt`           | AI usage permissions and restrictions     |
| ADF-005 | `ai.json`          | Machine-parseable AI interaction guidance |
| ADF-006 | `identity.json`    | Structured canonical identity data        |
| ADF-007 | `brand.txt`        | Brand naming conventions                  |
| ADF-008 | `faq-ai.txt`       | Structured Q&A for AI consumption         |
| ADF-009 | `developer-ai.txt` | Technical context for AI systems          |
| ADF-010 | `robots-ai.txt`    | AI crawler-specific access directives     |

An implementation providing all ten files satisfies the Complete tier.

#### 3.1.4 Tier Selection Guidance

Implementers SHOULD select a tier based on their requirements:

- **Essential** is appropriate for websites that need basic AI Visibility
  with minimal effort.
- **Recommended** is appropriate for organisations that interact with AI
  systems regularly and require accurate brand representation.
- **Complete** is appropriate for organisations with public APIs, multiple
  brand names, or complex AI crawler management requirements.

Partial implementations (files from a higher tier without completing lower
tiers) are permitted but NOT RECOMMENDED. The tier structure is cumulative;
each tier assumes the files from all lower tiers are present.

### 3.2 llms.txt (ADF-001)

#### 3.2.1 Purpose

The `llms.txt` file provides AI systems with a structured summary of a
business or organisation in Markdown format. It answers the fundamental
questions AI systems need to accurately represent an entity: who they are,
what they do, where they operate, and how they can be contacted.

This specification adopts and extends the convention documented at
[llmstxt.org](https://llmstxt.org), adding explicit section requirements
and enhanced structure for business identity use cases.

#### 3.2.2 File Location and Serving

The `llms.txt` file MUST be placed in the website's root directory and
accessible at:

```
https://example.com/llms.txt
```

The file MUST be served with content type `text/plain; charset=utf-8`. The
URL MUST be accessible without authentication. The URL SHOULD respond with
HTTP status code 200. HTTPS is RECOMMENDED.

Organisations with multiple domains SHOULD publish consistent `llms.txt`
files on each domain, or use HTTP redirects to a canonical location.

#### 3.2.3 Format

| Property     | Requirement                                     |
|--------------|-------------------------------------------------|
| Encoding     | UTF-8 (REQUIRED)                                |
| Line endings | LF (Unix-style) RECOMMENDED; CRLF accepted      |
| Syntax       | Markdown (CommonMark compatible)                 |
| Maximum size | No hard limit; RECOMMENDED under 50 KB           |

#### 3.2.4 Structure

The file MUST follow this structural hierarchy:

1. **H1 heading** (REQUIRED, exactly one). The official business or project
   name. This MUST be the first content element in the file.

2. **Blockquote** (REQUIRED). A 1-3 sentence summary of the business. This
   MUST immediately follow the H1 heading.

3. **Body text** (OPTIONAL). Additional context or background information,
   without headings.

4. **H2 sections** (OPTIONAL, except `## Contact` which is REQUIRED).
   Categorised information, each introduced by an H2 heading. Sections MAY
   contain link lists in the format specified below.

**Link format within sections:**

```
- [Link Text](https://example.com/page): Optional description
```

The colon and description are OPTIONAL but RECOMMENDED for clarity. All
URLs MUST be absolute. HTTPS SHOULD be used where available.

#### 3.2.5 Section Reference

**Required sections:**

| Section         | Description                                          |
|-----------------|------------------------------------------------------|
| `# [Name]`      | H1 heading with the official business or project name |
| `> [Summary]`   | Blockquote containing a 1-3 sentence business description |
| `## Contact`    | Contact information including email, phone, or address |

**Recommended sections:**

| Section                  | Description                                    |
|--------------------------|------------------------------------------------|
| `## Services`            | List of services or products offered with links |
| `## What We Do Not Do`   | Explicit exclusions to prevent AI misrepresentation |
| `## Key Information`     | Links to important pages (About, Case Studies, etc.) |
| `## AI Discovery Files`  | Links to other AI Discovery Files on the site  |

**Optional sections:**

| Section                            | Description                          |
|------------------------------------|--------------------------------------|
| `## Optional`                      | Secondary resources that may be omitted in constrained contexts |
| `## Team` or `## Leadership`      | Key people with titles and descriptions |
| `## Locations`                     | Office locations, service areas      |
| `## Certifications`               | Industry certifications, accreditations |
| `## Awards`                        | Notable awards or recognition (with dates) |
| `## Partners`                      | Official partnerships or technology alliances |
| `## Industries`                    | Sectors or industries served         |
| Other custom H2 sections           | Additional sections relevant to the business |

#### 3.2.6 Content Restrictions

The following content MUST NOT be included in `llms.txt` files:

- **Marketing hyperbole.** Superlatives ("best", "leading", "world-class")
  and unverifiable claims. Language MUST be factual and objective.
- **Pricing information.** Prices change frequently; implementers SHOULD
  link to pricing pages instead.
- **Confidential information.** Internal processes, trade secrets, or
  sensitive business data.
- **Unverified claims.** All statements MUST be factually accurate and
  verifiable from public sources.
- **Competitor references.** The file MUST NOT mention competitors or make
  comparative claims.
- **Testimonials or reviews.** These belong on the website, not in identity
  files.
- **Excessive detail.** Content SHOULD be concise; implementers SHOULD link
  to detailed pages rather than reproducing them.
- **Personal data.** Beyond publicly listed contact persons, the file MUST
  NOT include employee personal information.

#### 3.2.7 Validation

A `llms.txt` file is considered conforming when:

1. It contains exactly one H1 heading as the first content element.
2. A blockquote immediately follows the H1 heading.
3. The file is valid UTF-8 encoded text.
4. All URLs are absolute and use HTTPS where available.
5. Contact information is present (a `## Contact` section exists with at
   least one contact method).

### 3.3 llm.txt (ADF-002)

#### 3.3.1 Purpose

The `llm.txt` file is a compatibility variant for AI systems that request
the singular filename `llm.txt` rather than `llms.txt`. Some AI systems
attempt to fetch `/llm.txt` by convention; this file ensures those requests
are satisfied.

#### 3.3.2 Implementation

The `llm.txt` file MUST contain identical content to `llms.txt` OR
implement a 301 (Moved Permanently) redirect to `llms.txt`.

**Recommended approach:** A 301 redirect from `/llm.txt` to `/llms.txt`.
This ensures a single source of truth and eliminates synchronisation
requirements.

**Alternative approaches:**

- **Symlink.** A filesystem symbolic link from `llm.txt` to `llms.txt`.
- **Physical duplicate.** An identical copy of `llms.txt`. This approach is
  NOT RECOMMENDED as it introduces synchronisation risk.
- **Dynamic generation.** Server-side logic that serves `llms.txt` content
  at both paths.

#### 3.3.3 Canonical Status

The `llms.txt` file (ADF-001) is canonical. The `llm.txt` file (ADF-002)
is secondary. When both files exist with differing content, `llms.txt`
takes precedence as defined in Section 4.2.

### 3.4 llms.html (ADF-003)

#### 3.4.1 Purpose

The `llms.html` file provides a human-readable HTML presentation of the
information contained in `llms.txt`, enhanced with Schema.org structured
data. It serves human visitors who may discover the AI information files
directly, whilst providing additional machine-readable context through
embedded structured data.

#### 3.4.2 File Location and Serving

The `llms.html` file SHOULD be placed in the website's root directory and
accessible at:

```
https://example.com/llms.html
```

The file MUST be served with content type `text/html; charset=utf-8`. The
URL MUST be accessible without authentication. HTTPS is RECOMMENDED.

#### 3.4.3 Required Elements

The HTML document MUST include the following elements:

**In `<head>`:**

- `<meta charset="UTF-8">` -- character encoding declaration.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
  -- viewport meta tag for mobile compatibility.
- `<title>` -- a descriptive title including the business name.
- `<link rel="canonical" href="https://example.com/llms.html">` -- a
  self-referencing canonical link.
- `<meta name="robots" content="index,follow">` -- the page is a distinct
  human-readable document and SHOULD be indexable. It MUST link prominently
  to `llms.txt`, which remains the authoritative source of the content.

**In `<body>`:**

- A notice or disclaimer indicating this is a human-readable version of
  machine-readable AI identity information.
- An H1 element containing the business name, matching the H1 in
  `llms.txt`.
- A description matching the blockquote content in `llms.txt`.
- Contact information matching `llms.txt`.
- A link to the canonical `llms.txt` file.

**Structured data (RECOMMENDED):**

- Schema.org `Organization` JSON-LD, aligned with `identity.json` (ADF-006)
  if present.

#### 3.4.4 Content Restrictions

The following MUST NOT be included in `llms.html` files:

- **Tracking scripts.** Analytics, advertising pixels, or other tracking
  code.
- **Hidden content.** Content not visible to human visitors.
- **Content not in `llms.txt`.** The HTML file MUST NOT contain information
  absent from the canonical `llms.txt`.
- **Interactive elements.** Forms, JavaScript applications, or dynamic
  content.
- **Advertising.** The file MUST NOT contain advertisements.

#### 3.4.5 Content Authority

The `llms.html` file is a presentation layer, not a separate data source.
Content MUST exactly match the information in `llms.txt`. The authoritative
source for AI systems remains `llms.txt`. Any discrepancy SHOULD be
corrected in both files simultaneously, with `llms.txt` as canonical.

### 3.5 ai.txt (ADF-004)

#### 3.5.1 Purpose

The `ai.txt` file provides explicit guidance to AI systems about how they
should handle content from a website. It declares what AI systems are
permitted to do with the content, what they MUST NOT do, how to attribute
the business when citing it, and contact information for AI-related
queries.

The `ai.txt` file addresses behaviour guidance, not identity. Compare:

| File       | Purpose                                                |
|------------|--------------------------------------------------------|
| `llms.txt` | Who the entity is (identity, facts, services)          |
| `ai.txt`   | How AI SHOULD interact with the entity (permissions, restrictions) |

The `ai.txt` file expresses intent and guidance. It is not a legal contract
and does not replace terms of service or copyright notices. However,
responsible AI systems SHOULD respect explicitly stated preferences.

#### 3.5.2 File Location and Serving

The `ai.txt` file MUST be placed in the website's root directory and
accessible at:

```
https://example.com/ai.txt
```

The file MUST be served with content type `text/plain; charset=utf-8`. The
URL MUST be accessible without authentication. The URL SHOULD respond with
HTTP status code 200. HTTPS is RECOMMENDED.

#### 3.5.3 Format

| Property | Requirement                                           |
|----------|-------------------------------------------------------|
| Encoding | UTF-8 (REQUIRED)                                      |
| Line endings | LF (Unix-style) RECOMMENDED; CRLF accepted        |
| Syntax   | Plain text using Markdown-style headings (one H1 title, H2 sections) |
| Comments | Lines beginning with `#` *above* the H1 heading are comments |

The file opens with an H1 title and an identity block, then uses H2 headings
(`## Section Name`) for each section. Key-value lines use `key: value` syntax.
List items are prefixed with `- `.

Earlier revisions of this specification described sections as bracketed headers
(`## Permissions`). H2 headings are now the documented form, matching the
reference implementation and the published templates. Consumers SHOULD accept
either form.

#### 3.5.4 Section Reference

**Required sections:**

| Section          | Description                                         |
|------------------|-----------------------------------------------------|
| `# [Title]`      | H1 heading naming the file's subject, e.g. `# AI Usage Policy for Example Company`. |
| Identity block   | `Website:` and `Last Updated:` lines directly beneath the H1. `Website:` is REQUIRED. |
| `## Permissions` | List of actions AI systems are allowed to take. MUST contain at least one item. |
| `## Restrictions`| List of actions AI systems MUST NOT take. MUST contain at least one item. |

**Recommended sections:**

| Section          | Description                                         |
|------------------|-----------------------------------------------------|
| `## Attribution Requirements` | How to cite or attribute the business when referencing its content. |
| `## Contact`     | Contact details for AI-related queries.             |
| `## Related Files` | Links to the other AI Discovery Files published on the same host. |

**Optional sections:**

| Section           | Description                                        |
|-------------------|----------------------------------------------------|
| `## AI Training`  | Explicit guidance on whether content MAY be used for AI model training. |
| `## Content Licence` | Content licensing information (e.g., Creative Commons terms). |
| `## Citation Format` | The exact citation string the publisher prefers.  |
| `## Crawler Access` | Summary of crawler policy, pointing at `robots.txt` and `robots-ai.txt`. |
| `## Content Types`| Rules for specific content categories (e.g., articles, case studies). |
| `## Scope Limitations` | Clarification of what content or sections of the site the rules apply to. |
| `## Data Retention` | Guidance on caching or retaining content from the site. |

#### 3.5.5 Content Restrictions

The following MUST NOT be included in `ai.txt` files:

- **Contradictory rules.** Permissions and restrictions MUST NOT conflict
  with each other within the same file.
- **Unenforceable demands.** Requirements that cannot be technically
  verified or implemented by AI systems.
- **Legal threats.** The file is advisory; legal terms belong in Terms of
  Service.
- **Vague guidance.** Statements such as "be respectful" are not
  actionable. Guidance MUST be specific.
- **Competitor references.** The file MUST NOT mention or compare to
  competitors.
- **Sensitive data.** Passwords, API keys, or confidential business
  information MUST NOT be included.
- **Rules contradicting robots.txt.** Crawler access rules MUST be
  consistent with `robots.txt`.

#### 3.5.6 Relationship to robots.txt

The `ai.txt` file complements but does not replace `robots.txt`:

- `robots.txt` controls crawler **access** (whether an AI system can
  retrieve content).
- `ai.txt` controls content **usage** (how an AI system should use content
  it has accessed).

If `robots.txt` blocks access to content, any permissions declared in
`ai.txt` for that content are moot, as the AI system cannot reach it.

#### 3.5.7 Validation

An `ai.txt` file is considered conforming when:

1. It contains exactly one H1 heading and a `Website:` line identifying the
   organisation.
2. It contains a `## Permissions` section with at least one item.
3. It contains a `## Restrictions` section with at least one item.
4. The file is valid UTF-8 encoded text.
5. All URLs are absolute and use HTTPS where available.

### 3.6 ai.json (ADF-005)

#### 3.6.1 Purpose

The `ai.json` file provides AI interaction guidance in a machine-parseable
JSON format. It contains equivalent information to `ai.txt` (ADF-004) in a
structure that can be programmatically validated against a published JSON
Schema and parsed without ambiguity.

When both `ai.txt` and `ai.json` exist, `ai.json` takes precedence for
programmatic access, as defined in Section 4.2.

#### 3.6.2 File Location and Serving

The `ai.json` file MUST be placed in the website's root directory and
accessible at:

```
https://example.com/ai.json
```

The file MUST be served with content type `application/json; charset=utf-8`.
The URL MUST be accessible without authentication. HTTPS is RECOMMENDED.
The file MUST be valid JSON (parseable without errors).

#### 3.6.3 Format

| Property         | Requirement                                      |
|------------------|--------------------------------------------------|
| Encoding         | UTF-8 (REQUIRED)                                 |
| Format           | Strict JSON per RFC 8259                         |
| Root element     | Object (REQUIRED)                                |
| Schema reference | `$schema` property (RECOMMENDED)                 |

#### 3.6.4 Property Reference

**Required properties:**

| Property       | Type             | Description                              |
|----------------|------------------|------------------------------------------|
| `name`         | string           | Official business or organisation name   |
| `url`          | string (URI)     | Canonical website URL                    |
| `permissions`  | array of strings | Actions AI systems are allowed to take. MUST contain at least one item (`minItems: 1`). |
| `restrictions` | array of strings | Actions AI systems MUST NOT take. MUST contain at least one item (`minItems: 1`). |

**Recommended properties:**

| Property       | Type         | Description                                  |
|----------------|--------------|----------------------------------------------|
| `$schema`      | string (URI) | Reference to the canonical JSON Schema for validation |
| `attribution`  | object       | Citation and attribution requirements         |
| `contact`      | object       | Contact information for AI-related queries    |

**Optional properties:**

| Property        | Type   | Description                                     |
|-----------------|--------|-------------------------------------------------|
| `contentTypes`  | object | Rules for specific content categories            |
| `licensing`     | object | Content licensing information                    |
| `metadata`      | object | File version, dates, related files               |
| `scope`         | object | Clarification of content or site sections covered |
| `training`      | object | Guidance on AI training use of content           |
| `dataRetention` | object | Guidance on caching or retaining content         |

#### 3.6.5 Schema Validation

Files SHOULD reference the canonical JSON Schema using the `$schema`
property:

```json
{
    "$schema": "https://www.ai-visibility.org.uk/specifications/ai-json/ai-json.schema.json",
    "name": "Example Company",
    "url": "https://example.com",
    "permissions": ["..."],
    "restrictions": ["..."]
}
```

Any conforming JSON Schema validator MAY be used to validate files against
the published schema.

#### 3.6.6 Validation

An `ai.json` file is considered conforming when:

1. It is valid JSON (parseable without syntax errors).
2. It contains all required properties (`name`, `url`, `permissions`,
   `restrictions`).
3. The `permissions` array contains at least one item.
4. The `restrictions` array contains at least one item.
5. All URLs are valid absolute URIs.
6. If a `$schema` property is present, the file validates against the
   referenced schema.
7. Extension properties beyond this specification are permitted and MAY
   be ignored by consumers, but MUST NOT redefine or contradict
   documented properties.

### 3.7 identity.json (ADF-006)

#### 3.7.1 Purpose

The `identity.json` file provides canonical, factual identity data about a
business or organisation in a structured, machine-parseable format aligned
with Schema.org Organisation vocabulary. It answers the fundamental
question: "Who is this entity, officially?"

The `identity.json` file is the authoritative source for identity facts
within the ADF framework. Other ADF files MUST match the identity data
declared in `identity.json`, as defined in Section 4.1.

#### 3.7.2 File Location and Serving

The `identity.json` file MUST be placed in the website's root directory and
accessible at:

```
https://example.com/identity.json
```

The file MUST be served with content type `application/json; charset=utf-8`.
The URL MUST be accessible without authentication. HTTPS is RECOMMENDED.
The file MUST be valid JSON.

#### 3.7.3 Format

| Property         | Requirement                                      |
|------------------|--------------------------------------------------|
| Encoding         | UTF-8 (REQUIRED)                                 |
| Format           | Strict JSON per RFC 8259                         |
| Root element     | Object (REQUIRED)                                |
| Schema reference | `$schema` property (RECOMMENDED)                 |

#### 3.7.4 Property Reference

**Required properties:**

| Property      | Type         | Schema.org   | Description                          |
|---------------|--------------|--------------|--------------------------------------|
| `name`        | string       | `name`       | Official registered business name    |
| `type`        | string       | `@type`      | Organisation type (see Section 3.7.5) |
| `url`         | string (URI) | `url`        | Canonical website URL                |
| `description` | string       | `description`| Factual business description (1-3 sentences) |

**Recommended properties:**

| Property        | Type             | Schema.org     | Description                      |
|-----------------|------------------|----------------|----------------------------------|
| `alternateName` | array of strings | `alternateName`| Trading names, abbreviations, former names |
| `foundingDate`  | string           | `foundingDate` | Founding date: full ISO 8601 date (YYYY-MM-DD) or bare year (YYYY) |
| `locations`     | array of objects | `location`     | Physical locations (offices, headquarters) |
| `contactPoints` | array of objects | `contactPoint` | Contact channels (email, phone)  |
| `areaServed`    | array of strings or objects | `areaServed`   | Geographic areas served: plain strings (e.g. ISO 3166-1 alpha-2 codes) or objects with `type`, `name`, `code` |

**Optional properties:**

| Property             | Type             | Schema.org           | Description                  |
|----------------------|------------------|----------------------|------------------------------|
| `sameAs`             | array of URIs    | `sameAs`             | Official social profiles, directory listings |
| `identifiers`        | object           | `identifier`         | Official identifiers (company number, VAT, DUNS) |
| `industry`           | string           | --                   | Primary industry or sector   |
| `parentOrganization` | object           | `parentOrganization` | Parent company if subsidiary |
| `subOrganization`    | array of objects | `subOrganization`    | Subsidiaries or divisions    |
| `numberOfEmployees`  | object           | `numberOfEmployees`  | Employee count or range      |
| `logo`               | string (URI)     | `logo`               | URL to official company logo |
| `metadata`           | object           | --                   | File version, last updated date |

#### 3.7.5 Schema.org Alignment

The `type` property MUST use a recognised Schema.org organisation type:

- `Corporation` -- Limited company or corporation
- `LocalBusiness` -- Local business with physical presence
- `Organization` -- Generic organisation
- `GovernmentOrganization` -- Government entity
- `NGO` -- Non-governmental organisation
- `EducationalOrganization` -- Schools, universities

The property names in `identity.json` are intentionally aligned with
Schema.org vocabulary. The following mapping applies:

| identity.json     | Schema.org                  |
|-------------------|-----------------------------|
| `name`            | `name`                      |
| `type`            | `@type`                     |
| `url`             | `url`                       |
| `description`     | `description`               |
| `alternateName`   | `alternateName`             |
| `locations`       | `location` + `PostalAddress`|
| `contactPoints`   | `contactPoint` + `ContactPoint` |
| `sameAs`          | `sameAs`                    |

An `identity.json` file can be converted to Schema.org JSON-LD by adding
`@context` and adjusting property names accordingly.

#### 3.7.6 Validation

An `identity.json` file is considered conforming when:

1. It is valid JSON (parseable without syntax errors).
2. It contains all required properties (`name`, `type`, `url`,
   `description`).
3. The `url` is a valid absolute URI.
4. The `type` is a recognised Schema.org organisation type.
5. Date fields use ISO 8601 format (`YYYY-MM-DD`); `foundingDate` MAY
   instead be a bare year (`YYYY`).
6. Country codes use ISO 3166-1 alpha-2 format.
7. Extension properties beyond this specification are permitted and MAY
   be ignored by consumers, but MUST NOT redefine or contradict
   documented properties.

### 3.8 brand.txt (ADF-007)

#### 3.8.1 Purpose

The `brand.txt` file provides explicit guidance on how to correctly name
and describe a brand. It helps AI systems use the correct official names,
avoid common incorrect variations, understand naming rules, and represent
the brand voice appropriately.

#### 3.8.2 File Location and Serving

The `brand.txt` file MUST be placed in the website's root directory and
accessible at:

```
https://example.com/brand.txt
```

The file MUST be served with content type `text/plain; charset=utf-8`. The
URL MUST be accessible without authentication. HTTPS is RECOMMENDED.

#### 3.8.3 Format

| Property     | Requirement                                         |
|--------------|-----------------------------------------------------|
| Encoding     | UTF-8 (REQUIRED)                                    |
| Line endings | LF (Unix-style) RECOMMENDED; CRLF accepted          |
| Syntax       | Plain text using Markdown-style headings (one H1 title, H2 sections) |
| Comments     | Lines beginning with `#` *above* the H1 heading are comments |

#### 3.8.4 Section Reference

**Required sections:**

| Section            | Description                                       |
|--------------------|---------------------------------------------------|
| `## Official Name` | List of correct official name variations, one per line, in order of preference. MUST contain at least one entry. |
| `## Do Not Use`| Common mistakes and variations to avoid, one per line. MUST contain at least one entry. |
| `## Naming Rules`   | Specific, actionable rules for using the name correctly. MUST contain at least one rule. |

**Recommended sections:**

| Section             | Description                                      |
|---------------------|--------------------------------------------------|
| `## Brand Voice`     | Tone and style guidance for AI-generated content referencing the brand. |
| `## Key People`      | Individuals who MAY be publicly referenced and how they SHOULD be described. |
| `## Quotation Policy`| Rules for quoting or attributing statements to the organisation or its personnel. |

**Optional sections:**

| Section             | Description                                      |
|---------------------|--------------------------------------------------|
| `## Terminology`     | Industry terms the brand uses specifically (preferred vs. avoided terms). |
| `## Visual Identity` | Notes about visual identity for AI descriptions (colours, logo, style). |
| `## Taglines`        | Official taglines, straplines, and slogans.      |
| `## Boilerplate`     | Standard "about us" text for press releases and formal use. |
| `## Social Handles`  | Official social media handles for accurate referencing. |
| `## Related Files`  | Links to the other AI Discovery Files published on the same host. |

#### 3.8.5 Content Restrictions

The following MUST NOT be included in `brand.txt` files:

- **Competitor names in `## Do Not Use`.** This section is for the
  organisation's own brand mistakes, not competitor disambiguation.
- **Subjective claims.** Marketing superlatives ("best", "leading",
  "world-class") MUST NOT appear.
- **Confidential information.** Unpublished brand strategies or internal
  naming conventions.
- **Unverified quotes.** Sample quotes that do not exist in published
  sources.

#### 3.8.6 Validation

A `brand.txt` file is considered conforming when:

1. It contains the three required sections (`## Official Name`,
   `## Do Not Use`, `## Naming Rules`).
2. The `## Official Name` section has at least one entry.
3. The `## Do Not Use` section has at least one entry.
4. The `## Naming Rules` section has at least one rule.
5. Official names are consistent with `identity.json` (ADF-006) if
   present, as defined in Section 4.1.

### 3.9 faq-ai.txt (ADF-008)

#### 3.9.1 Purpose

The `faq-ai.txt` file provides pre-written answers to frequently asked
questions in a format optimised for AI consumption. Unlike website FAQ
pages designed for human browsing, this file uses clear, unambiguous
question-answer formatting and provides factual, direct answers without
marketing language. Content SHOULD be written as if it will be quoted
directly.

#### 3.9.2 File Location and Serving

The `faq-ai.txt` file MUST be placed in the website's root directory and
accessible at:

```
https://example.com/faq-ai.txt
```

The file MUST be served with content type `text/plain; charset=utf-8`. The
URL MUST be accessible without authentication. HTTPS is RECOMMENDED.

#### 3.9.3 Format

| Property     | Requirement                                         |
|--------------|-----------------------------------------------------|
| Encoding     | UTF-8 (REQUIRED)                                    |
| Line endings | LF (Unix-style) RECOMMENDED; CRLF accepted          |
| Syntax       | Structured plain text with `Q:` and `A:` delimiters |
| Comments     | Lines starting with `#` are comments                |

#### 3.9.4 Q&A Structure

Each question-answer pair follows this format:

```
Q: What is the question?
A: The answer to the question, which may span
multiple lines if necessary.
```

**Questions:**

- Each question MUST be prefixed with `Q: `.
- Questions MUST be written in natural language.
- Questions MUST end with a question mark.

**Answers:**

- Each answer MUST be prefixed with `A: `.
- Answers MAY span multiple lines. Continuation lines SHOULD NOT be
  prefixed with `A: `.
- Answers MUST be factual and verifiable.

**Source URLs:** Each question-answer pair MAY include an optional `URL:`
line immediately after the answer, using markdown hyperlink format:

```
Q: How do I reset my password?
A: Visit the account settings page and click "Reset Password". You will
   receive an email with a reset link valid for 24 hours.
URL: [Account Settings](https://www.example.com/account/settings/)
```

- The `URL:` line MUST appear immediately after the answer, before any
  blank line separator.
- The URL SHOULD use markdown hyperlink format: `[Link Text](url)`.
- The link text SHOULD describe the destination page.
- Including source URLs helps AI systems provide direct, actionable links
  when citing answers from the file.

**Separation:** Question-answer pairs MUST be separated by at least one
blank line.

**Categories:** Questions MAY be organised under optional category headers
using H2 Markdown headings:

```
[About]

Q: What does Example Company do?
A: Example Company provides cloud infrastructure services.

[Contact]

Q: How can I contact Example Company?
A: Example Company can be reached at hello@example.com.
```

Recommended categories include `[About]`, `[Services]`, `[Contact]`, and
`[Locations]`.

#### 3.9.5 Content Restrictions

The following MUST NOT be included in `faq-ai.txt` files:

- **Promotional answers.** Answers MUST be factual, not marketing copy.
- **Unverifiable claims.** All statements MUST be independently verifiable.
- **Competitor comparisons.** The file MUST NOT reference competitors.
- **Specific prices.** Prices change frequently; answers SHOULD direct to
  pricing pages instead.

#### 3.9.6 Validation

A `faq-ai.txt` file is considered conforming when:

1. It contains at least one question-answer pair.
2. Each question is prefixed with `Q: ` and ends with a question mark.
3. Each answer is prefixed with `A: `.
4. Question-answer pairs are separated by blank lines.
5. Answers are factual and do not contain promotional language.
6. Service descriptions are consistent with `llms.txt` (ADF-001), as
   defined in Section 4.1.

### 3.10 developer-ai.txt (ADF-009)

#### 3.10.1 Purpose

The `developer-ai.txt` file provides technical context for AI systems that
assist developers in understanding a website's technical infrastructure,
API availability, authentication requirements, and integration
capabilities. This file provides context, not comprehensive documentation;
it SHOULD point to detailed documentation rather than duplicate it.

#### 3.10.2 File Location and Serving

The `developer-ai.txt` file MUST be placed in the website's root directory
and accessible at:

```
https://example.com/developer-ai.txt
```

The file MUST be served with content type `text/plain; charset=utf-8`. The
URL MUST be accessible without authentication. HTTPS is RECOMMENDED.

#### 3.10.3 Format

| Property     | Requirement                                         |
|--------------|-----------------------------------------------------|
| Encoding     | UTF-8 (REQUIRED)                                    |
| Line endings | LF (Unix-style) RECOMMENDED; CRLF accepted          |
| Syntax       | Plain text using Markdown-style headings (one H1 title, H2 sections) |
| Comments     | Lines beginning with `#` *above* the H1 heading are comments |

**Markdown Hyperlinks:** When referencing documentation, tools, resources,
or related files, implementations SHOULD use markdown hyperlink format
rather than plain URLs:

```
[documentation]
- [API Reference](https://api.example.com/docs)
- [SDK for Python](https://github.com/example/python-sdk)
- [Authentication Guide](https://docs.example.com/auth/)
```

Markdown hyperlinks provide AI systems with anchor text context about each
link's purpose, enabling more useful, labelled citations in AI-generated
developer guidance. Plain URLs are accepted but markdown hyperlinks are
RECOMMENDED.

#### 3.10.4 Section Reference

**Required sections:**

| Section        | Description                                          |
|----------------|------------------------------------------------------|
| `## Overview`   | High-level technical description of the platform.    |
| `## API Information` | API availability. MUST include `status:` field with one of: `available`, `partner-only`, `not-available`, `deprecated`. |
| `## Public Areas`| Publicly accessible areas of the website or service. |

**Recommended sections:**

| Section              | Description                                    |
|----------------------|------------------------------------------------|
| `## Authentication`   | Authentication methods and requirements.       |
| `## Platform`        | Platforms or environments supported.           |
| `## Documentation`    | Links to technical documentation.              |
| `## Technical Contact`| Contact information for technical enquiries.   |

**Optional sections:**

| Section           | Description                                       |
|-------------------|---------------------------------------------------|
| `## Technology Stack`| High-level technology stack information.          |
| `## Rate Limits`   | Rate limiting policies for public endpoints.      |
| `## Webhooks`      | Webhook capabilities and configuration.           |
| `## SDKs`          | Available SDKs or client libraries.               |
| `## Integrations`  | Third-party integration capabilities.             |
| `## Sandbox`       | Test or sandbox environment information.          |
| `## AI Discovery Files` | Links to the other AI Discovery Files published on the same host. |

#### 3.10.5 Content Restrictions

The following MUST NOT be included in `developer-ai.txt` files:

- **Credentials.** API keys, passwords, tokens, or other authentication
  credentials.
- **Internal URLs.** URLs for internal systems, staging environments, or
  admin panels.
- **Security vulnerabilities.** Known vulnerabilities, security
  configurations, or attack surface information.
- **Unreleased features.** Information about features not yet publicly
  available.

#### 3.10.6 Validation

A `developer-ai.txt` file is considered conforming when:

1. It contains the three required sections (`## Overview`, `## API Information`,
   `## Public Areas`).
2. The `## API Information` section includes a `status:` field with one of the
   four permitted values.
3. The file does not contain credentials, internal URLs, or security
   vulnerability information.

### 3.11 robots-ai.txt (ADF-010)

#### 3.11.1 Purpose

The `robots-ai.txt` file provides AI crawler-specific access directives,
supplementing the standard `robots.txt` with targeted rules for AI training
and inference crawlers. It follows `robots.txt` syntax conventions (as
defined in RFC 9309) and enables site operators to declare differentiated
policies for AI crawlers without modifying the primary `robots.txt` file.

The `robots-ai.txt` file supplements but DOES NOT replace `robots.txt`.
Directives in `robots.txt` always take precedence, as defined in
Section 4.2.

#### 3.11.2 File Location and Serving

The `robots-ai.txt` file MUST be placed in the website's root directory and
accessible at:

```
https://example.com/robots-ai.txt
```

The file MUST be served with content type `text/plain; charset=utf-8`. The
URL MUST be accessible without authentication. HTTPS is RECOMMENDED.

#### 3.11.3 Format

| Property     | Requirement                                         |
|--------------|-----------------------------------------------------|
| Encoding     | UTF-8 (REQUIRED)                                    |
| Line endings | LF (Unix-style) RECOMMENDED; CRLF accepted          |
| Syntax       | `robots.txt` syntax conventions per RFC 9309        |
| Comments     | Lines starting with `#` are comments                |

The file uses the following directives:

- `User-agent:` -- Identifies the AI crawler the following rules apply to.
- `Allow:` -- Permits access to the specified path.
- `Disallow:` -- Prohibits access to the specified path.
- `Crawl-delay:` -- Requests a delay (in seconds) between successive
  requests.

#### 3.11.4 Known AI Crawler User Agents

The following user agent strings are known to be used by AI crawlers at the
time of publication. This list is not exhaustive; new AI crawlers appear
regularly.

| User Agent           | Operator        | Purpose                        |
|----------------------|-----------------|--------------------------------|
| `GPTBot`             | OpenAI          | Training and inference         |
| `ChatGPT-User`      | OpenAI          | Real-time browsing for ChatGPT |
| `OAI-SearchBot`      | OpenAI          | Search feature crawling        |
| `ClaudeBot`          | Anthropic       | Training and inference         |
| `Claude-User`        | Anthropic       | Real-time browsing for Claude  |
| `Claude-SearchBot`   | Anthropic       | Search indexing for Claude     |
| `Google-Extended`    | Google          | AI training (Gemini)           |
| `PerplexityBot`      | Perplexity      | AI search                      |
| `CCBot`              | Common Crawl    | Open training data             |
| `Bytespider`         | ByteDance       | Training and search            |
| `meta-externalagent` | Meta            | AI training                    |
| `Amazonbot`          | Amazon          | AI assistant training          |
| `Applebot-Extended`  | Apple           | AI features                    |
| `cohere-ai`          | Cohere          | AI training                    |
| `Diffbot`            | Diffbot         | AI knowledge graph             |
| `FacebookBot`        | Meta            | Content understanding          |
| `YouBot`             | You.com         | AI search                      |

#### 3.11.5 Hierarchy

The `robots-ai.txt` file exists within a strict hierarchy:

1. `robots.txt` rules always take precedence. If `robots.txt` blocks a
   crawler, `robots-ai.txt` rules for that crawler are ignored.
2. `robots-ai.txt` provides supplementary, AI-specific rules.
3. Critical access control rules SHOULD also be placed in `robots.txt`,
   since not all AI crawlers check `robots-ai.txt`.

#### 3.11.6 Validation

A `robots-ai.txt` file is considered conforming when:

1. It follows `robots.txt` syntax conventions.
2. Each rule group begins with a `User-agent:` directive.
3. Directives reference known or documented AI crawler user agents.
4. The file does not contradict directives in `robots.txt`.

---

## 4. Interoperability

### 4.1 Cross-File Consistency Requirements

When multiple AI Discovery Files are published, the following information
MUST be consistent across all files in which it appears:

1. **Business name.** The canonical business name MUST be identical in
   `identity.json` (`name`), `llms.txt` (H1 heading), `ai.txt`
   (the H1 and `Website:` line), `ai.json` (`name`), and `brand.txt`
   (first entry under `## Official Name`).

2. **Canonical URL.** The website URL MUST be identical in `identity.json`
   (`url`), `llms.txt` (if referenced), `ai.txt` (`Website:`),
   and `ai.json` (`url`).

3. **Contact information.** Email addresses and phone numbers MUST be
   consistent across `identity.json` (`contactPoints`), `llms.txt`
   (`## Contact`), `ai.txt` (`[contact]`), and `ai.json` (`contact`).

4. **Service descriptions.** The scope of services described in `llms.txt`
   (`## Services`), `faq-ai.txt` (answers about services), and
   `identity.json` (`description`) MUST be substantively consistent. Exact
   wording need not match, but the substance MUST NOT contradict.

5. **Explicit exclusions.** Services or capabilities explicitly excluded in
   `llms.txt` (`## What We Do Not Do`) MUST NOT be contradicted by answers
   in `faq-ai.txt` or permissions in `ai.txt`/`ai.json`.

6. **Alternate names.** Names listed in `brand.txt` (`## Official Name`)
   SHOULD appear in `identity.json` (`alternateName`) or as the primary
   `name`. Names listed in `brand.txt` (`## Do Not Use`) MUST NOT
   appear as official names in any other ADF file.

7. **AI permissions.** Permissions declared in `ai.txt` (`## Permissions`)
   and `ai.json` (`permissions`) MUST be equivalent in substance.
   Restrictions declared in `ai.txt` (`## Restrictions`) and `ai.json`
   (`restrictions`) MUST be equivalent in substance.

8. **Access control.** Paths blocked in `robots.txt` MUST NOT be referenced
   as accessible in `ai.txt`, `ai.json`, or `developer-ai.txt`.

### 4.2 Precedence Rules

When information conflicts between files, the following precedence
hierarchy applies. Higher-ranked files are authoritative over lower-ranked
files within each tier. Cross-tier precedence is determined by the
information type, as specified in the precedence matrix (Section 4.2.2).

#### 4.2.1 Tier Hierarchy

**Tier 1 -- Access Control:**

```
robots.txt  >  robots-ai.txt (ADF-010)
```

`robots.txt` always controls access. `robots-ai.txt` provides
supplementary AI-specific directives but MUST NOT override `robots.txt`.

**Tier 2 -- Structured Identity:**

```
identity.json (ADF-006)  >  ai.json (ADF-005)
```

Structured JSON files take precedence over their text equivalents because
they can be parsed unambiguously.

**Tier 3 -- Human-Readable Context:**

```
llms.txt (ADF-001)  >  ai.txt (ADF-004)  >  llm.txt (ADF-002)  >  llms.html (ADF-003)
```

Within human-readable files, `llms.txt` is canonical for identity and
service information. `ai.txt` is authoritative for permissions and
restrictions. `llm.txt` is a secondary variant. `llms.html` is a
presentation layer.

**Tier 4 -- Supporting Files:**

```
brand.txt (ADF-007)  >  faq-ai.txt (ADF-008)  >  developer-ai.txt (ADF-009)
```

Supporting files provide supplementary information. `brand.txt` is
authoritative for naming conventions. `faq-ai.txt` provides answers that
MUST align with higher-tier files. `developer-ai.txt` provides technical
context.

#### 4.2.2 Precedence Matrix

The following matrix specifies which file is authoritative for each
information type. When a conflict is detected, the file listed under "1st
(Highest)" is authoritative.

| Information Type    | 1st (Highest)    | 2nd              | 3rd            | External   |
|---------------------|------------------|------------------|----------------|------------|
| Business Name       | `identity.json`  | `llms.txt`       | `brand.txt`    | Schema.org |
| Alternate Names     | `identity.json`  | `brand.txt`      | `llms.txt`     | Schema.org |
| AI Permissions      | `ai.json`        | `ai.txt`         | --             | --         |
| Crawler Access      | `robots.txt`     | `robots-ai.txt`  | --             | --         |
| Service Descriptions| `llms.txt`       | `faq-ai.txt`     | `identity.json`| Schema.org |
| Contact Information | `identity.json`  | `llms.txt`       | `ai.json`      | Schema.org |
| Naming Conventions  | `brand.txt`      | `identity.json`  | --             | --         |

### 4.3 Conflict Resolution

This section provides resolution guidance for common conflict scenarios.
The guiding principles are:

1. **Structured data takes precedence over unstructured.** JSON files are
   authoritative over their text equivalents because they can be parsed
   unambiguously.
2. **Specific files take precedence over general files.** A file dedicated
   to a single purpose is authoritative for that purpose.
3. **Access control takes precedence over usage permissions.** If content
   cannot be accessed, permissions declared for it are moot.

#### 4.3.1 Scenario: Name Mismatch

**When:** `identity.json` declares `"name": "Acme Corporation Ltd"`,
`llms.txt` H1 reads `# Acme Corp`, and `brand.txt` lists `Acme Corporation`
under `## Official Name`.

**Resolution:** `identity.json` `name` is canonical (see Section 4.2.2).
The implementer SHOULD update the `llms.txt` H1 to match `identity.json`,
OR add "Acme Corp" to the `identity.json` `alternateName` array if it is
a valid trading name. The `brand.txt` `## Official Name` section SHOULD
include all names present in `identity.json`.

#### 4.3.2 Scenario: Permission Conflict

**When:** `ai.txt` declares "May summarise content" under `## Permissions`,
but `ai.json` declares `"summarisation": "prohibited"` or omits
summarisation from the `permissions` array.

**Resolution:** `ai.json` is authoritative for machine parsing (see
Section 4.2.2). The implementer SHOULD update `ai.txt` to match `ai.json`.
Both files SHOULD contain equivalent information.

#### 4.3.3 Scenario: Access vs. Usage Conflict

**When:** `robots.txt` contains `Disallow: /insights/`, but `ai.txt`
declares "May summarise content from /insights/" under `## Permissions`.

**Resolution:** `robots.txt` controls access (see Section 4.2.1, Tier 1).
If content is blocked by `robots.txt`, the AI system cannot reach it, and
the `ai.txt` permission is moot. The implementer SHOULD either update
`robots.txt` to allow access, or remove the permission from `ai.txt`.

#### 4.3.4 Scenario: llm.txt vs. llms.txt

**When:** Both `/llm.txt` and `/llms.txt` exist with different content.

**Resolution:** `llms.txt` is canonical (see Section 3.3.3). The `llm.txt`
file SHOULD be a 301 redirect to `llms.txt`, not a separate file with
different content.

#### 4.3.5 Scenario: FAQ Contradicts Service Description

**When:** `llms.txt` states "We provide web development services" under
`## Services`, but `faq-ai.txt` contains `Q: Do you build websites?`
`A: No, we focus on consulting only.`

**Resolution:** `llms.txt` is authoritative for service scope (see
Section 4.2.2). The implementer SHOULD update the `faq-ai.txt` answer to
align with the `## Services` section in `llms.txt`, or update `llms.txt`
if the FAQ reflects the actual current state of the business.

### 4.4 Relationship to Existing Standards

AI Discovery Files are designed to complement, not replace, existing web
standards. This section defines the relationship between ADF files and
established standards.

#### 4.4.1 robots.txt (RFC 9309)

`robots.txt` is the Robots Exclusion Protocol, an established standard for
controlling crawler access. Its relationship to ADF files is:

- `robots.txt` always takes precedence for access control.
- `robots-ai.txt` (ADF-010) supplements `robots.txt` with AI-specific
  directives but MUST NOT override it.
- `ai.txt` (ADF-004) and `ai.json` (ADF-005) control content _usage_, not
  content _access_. They are complementary to `robots.txt`, not in
  competition with it.
- If `robots.txt` blocks access to content, any ADF permissions declared
  for that content are moot.

#### 4.4.2 security.txt (RFC 9116)

`security.txt` defines a method for web security policies, including
security contact information. Its relationship to ADF files is:

- `security.txt` and ADF files serve complementary purposes. `security.txt`
  addresses security contacts and vulnerability disclosure. ADF files
  address AI interaction guidance and business identity.
- Both standards use root-level plain text files with structured formats.
- There is no precedence relationship; the two standards do not overlap in
  scope.
- Implementers MAY deploy both `security.txt` and ADF files
  simultaneously.

#### 4.4.3 Schema.org

Schema.org is a collaborative vocabulary for structured data on the web.
Its relationship to ADF files is:

- `identity.json` (ADF-006) aligns with Schema.org Organisation vocabulary,
  as defined in Section 3.7.5.
- Schema.org markup embedded in website pages SHOULD be consistent with
  `identity.json`. If conflicts exist, `identity.json` is the source of
  truth for ADF purposes; Schema.org markup SHOULD be updated to match.
- `llms.html` (ADF-003) SHOULD include Schema.org JSON-LD for the
  Organisation entity.
- Schema.org and ADF files are complementary. Schema.org provides embedded
  structured data within HTML pages; ADF files provide standalone,
  root-level files for AI system consumption.

#### 4.4.4 Open Graph Protocol

The Open Graph Protocol defines metadata for social media sharing. Its
relationship to ADF files is:

- Open Graph tags and ADF files serve different audiences. Open Graph
  targets social media platforms; ADF files target AI systems.
- There is no precedence relationship; the two standards do not overlap in
  scope.
- Business name and description in Open Graph tags SHOULD be consistent
  with `identity.json` and `llms.txt` for overall coherence.

#### 4.4.5 humans.txt

`humans.txt` is a convention for providing human-readable information about
the people behind a website. Its relationship to ADF files is:

- `humans.txt` and `llms.html` (ADF-003) serve analogous purposes: making
  metadata human-readable.
- `humans.txt` focuses on the team behind the website; `llms.html` focuses
  on AI-related identity information.
- Both files MAY coexist at the website root without conflict.

#### 4.4.6 ads.txt (IAB Tech Lab)

`ads.txt` is an IAB Tech Lab standard for declaring authorised digital
advertising sellers. Its relationship to ADF files is:

- `ads.txt` established the model of root-level plain text files for
  declaring authorised relationships. ADF files follow a similar deployment
  pattern.
- There is no functional relationship between `ads.txt` and ADF files; they
  address entirely different domains.
- Both standards demonstrate that root-level discovery files are an
  effective mechanism for machine-readable declarations.
## 5. Validation Framework

### 5.1. File-Level Validation

   Each AI Discovery File type has specific structural and content
   requirements.  A file is considered valid if and only if it passes
   all applicable criteria defined below.  Implementations that
   validate AI Discovery Files MUST apply these rules.

#### 5.1.1. llms.txt (ADF-001)

   A valid llms.txt file MUST satisfy all of the following criteria:

   1.  The file MUST contain exactly one H1 heading (`#`) as the first
       content element (excluding blank lines and comments).

   2.  A Markdown blockquote (`>`) MUST immediately follow the H1
       heading, providing a summary description of the business.

   3.  The file MUST be encoded as valid UTF-8 text.

   4.  All URLs within the file MUST be absolute and SHOULD use the
       HTTPS scheme.

   5.  A `## Contact` section MUST be present containing at least one
       contact method (email address, telephone number, or postal
       address).

   A file that fails any of these criteria MUST be considered invalid.

#### 5.1.2. llm.txt (ADF-002)

   A valid llm.txt resource MUST satisfy one of the following
   conditions:

   1.  The resource responds with an HTTP 301 (Moved Permanently)
       redirect to the corresponding llms.txt file at the same domain;
       OR

   2.  The resource contains content identical to the llms.txt file
       at the same domain (byte-for-byte or semantically equivalent).

   If llm.txt exists but neither redirects to nor matches llms.txt,
   implementations SHOULD treat llms.txt as authoritative and MAY
   flag the inconsistency as a warning.

#### 5.1.3. llms.html (ADF-003)

   A valid llms.html file MUST satisfy all of the following criteria:

   1.  The file MUST be valid HTML5.

   2.  A `<link rel="canonical">` element MUST be present, pointing to
       the corresponding llms.txt file or to the llms.html URL itself.

   3.  A `<meta charset="utf-8">` (or equivalent) declaration MUST be
       present.

   4.  A `<meta name="viewport">` element MUST be present.

   5.  A `<title>` element MUST be present and non-empty.

   6.  A `<meta name="robots">` element MUST be present. The value
       SHOULD be `index,follow`; the page is a distinct human-readable
       document rather than a duplicate of the site's other pages.

   7.  The content SHOULD be semantically equivalent to the
       corresponding llms.txt file.

#### 5.1.4. ai.txt (ADF-004)

   A valid ai.txt file MUST satisfy all of the following criteria:

   1.  An identity block MUST be present, containing both an H1 title and a
       `name` field and a `url` field.

   2.  A `## Permissions` section MUST be present containing at least
       one list item (prefixed with `-`).

   3.  A `## Restrictions` section MUST be present containing at least
       one list item (prefixed with `-`).

   4.  The file MUST be encoded as valid UTF-8 text.

   5.  The `url` value MUST be an absolute URI using the HTTPS scheme.

   6.  Permissions and restrictions MUST NOT contradict each other
       within the same file.

#### 5.1.5. ai.json (ADF-005)

   A valid ai.json file MUST satisfy all of the following criteria:

   1.  The file MUST be valid JSON as defined by [RFC8259].

   2.  The root element MUST be a JSON object.

   3.  The object MUST contain a `name` property of type string.

   4.  The object MUST contain a `url` property of type string,
       formatted as a valid absolute URI.

   5.  The object MUST contain a `permissions` property of type array,
       containing at least one string element.

   6.  The object MUST contain a `restrictions` property of type array,
       containing at least one string element.

   7.  If a `$schema` property is present, the file MUST validate
       against the referenced JSON Schema without errors.

#### 5.1.6. identity.json (ADF-006)

   A valid identity.json file MUST satisfy all of the following
   criteria:

   1.  The file MUST be valid JSON as defined by [RFC8259].

   2.  The root element MUST be a JSON object.

   3.  The object MUST contain a `name` property of type string.

   4.  The object MUST contain a `type` property of type string, with
       a value corresponding to a recognised Schema.org organisation
       type (e.g., "Corporation", "LocalBusiness", "Organization",
       "GovernmentOrganization", "NGO", "EducationalOrganization").

   5.  The object MUST contain a `url` property of type string,
       formatted as a valid absolute URI.

   6.  The object MUST contain a `description` property of type string.

   7.  All date values MUST conform to [ISO8601] format (YYYY-MM-DD
       for dates, or full ISO 8601 date-time for timestamps).

   8.  All country code values MUST conform to [ISO3166] alpha-2
       format (e.g., "GB", "IE", "NL", "US").

#### 5.1.7. brand.txt (ADF-007)

   A valid brand.txt file MUST satisfy all of the following criteria:

   1.  An `## Official Name` section MUST be present containing at
       least one name entry.

   2.  An `## Do Not Use` section MUST be present containing at
       least one name entry.

   3.  A `## Naming Rules` section MUST be present containing at least
       one rule.

   4.  The file MUST be encoded as valid UTF-8 text.

#### 5.1.8. faq-ai.txt (ADF-008)

   A valid faq-ai.txt file MUST satisfy all of the following criteria:

   1.  The file MUST contain at least one question-answer pair.

   2.  Every question line MUST begin with `Q:` followed by a space
       and the question text.

   3.  Every question MUST be immediately followed (after optional
       blank lines) by an answer line beginning with `A:` followed
       by a space and the answer text.

   4.  No orphan questions (questions without corresponding answers)
       are permitted.

   5.  The file MUST be encoded as valid UTF-8 text.

#### 5.1.9. developer-ai.txt (ADF-009)

   A valid developer-ai.txt file MUST satisfy all of the following
   criteria:

   1.  An `## Overview` section MUST be present providing a summary
       of the technical platform.

   2.  A `## API Information` section MUST be present.  If no public API
       exists, this section MUST contain a statement to that effect
       (e.g., "status: none").

   3.  A `## Public Areas` section MUST be present describing
       publicly accessible areas of the site or application.

   4.  The file MUST be encoded as valid UTF-8 text.

#### 5.1.10. robots-ai.txt (ADF-010)

   A valid robots-ai.txt file MUST satisfy all of the following
   criteria:

   1.  The file MUST follow the syntax conventions of the Robots
       Exclusion Protocol [RFC9309], using `User-agent` and
       `Allow`/`Disallow` directives.

   2.  At least one `User-agent` line MUST be present, specifying
       an AI crawler user agent or the wildcard `*`.

   3.  All path values MUST be valid relative paths beginning with
       `/`.

   4.  The file MUST be encoded as valid UTF-8 text.

### 5.2. Cross-File Validation

   When multiple AI Discovery Files are published on the same domain,
   implementations SHOULD verify consistency across files.  The
   following cross-file checks are defined:

#### 5.2.1. Business Name Consistency

   The canonical business name MUST be identical across all files
   that declare it:

   -  `identity.json` `name` property
   -  `llms.txt` H1 heading
   -  `brand.txt` first entry in `## Official Name`
   -  `ai.json` `name` property
   -  `ai.txt` H1 heading

   Minor formatting differences (e.g., trailing "Ltd" present in
   identity.json but omitted in llms.txt) MAY be accepted if the
   `brand.txt` `## Official Name` section lists both variants.
   Substantive name differences MUST be flagged as errors.

#### 5.2.2. URL Consistency

   The canonical website URL MUST be identical across all files that
   declare it:

   -  `identity.json` `url` property
   -  `ai.json` `url` property
   -  `ai.txt` `Website:` line

   URLs MUST match including scheme and trailing slash conventions.

#### 5.2.3. Contact Information Consistency

   Contact information SHOULD be consistent across:

   -  `identity.json` `contactPoints` array
   -  `llms.txt` `## Contact` section
   -  `ai.txt` `[contact]` section (if present)

   Email addresses and telephone numbers that appear in one file
   SHOULD appear in all files that declare contact information.

#### 5.2.4. Permission Equivalence

   The permissions declared in `ai.txt` `## Permissions` and the
   `permissions` array in `ai.json` MUST be semantically equivalent.
   The restrictions declared in `ai.txt` `## Restrictions` and the
   `restrictions` array in `ai.json` MUST be semantically equivalent.

   Exact wording need not match, but the substantive meaning of each
   permission and restriction MUST be preserved across both formats.

#### 5.2.5. Name Registry Consistency

   All names listed in the `brand.txt` `## Official Name` section
   MUST appear in `identity.json` as either the `name` property or
   within the `alternateName` array.

   Conversely, the `identity.json` `name` property and all entries
   in `alternateName` SHOULD appear in `brand.txt`
   `## Official Name`.

### 5.3. Scoring Methodology

   This section defines a standardised rubric for evaluating whether
   AI systems correctly interpret information declared in AI Discovery
   Files.  This methodology is designed for manual testing and
   produces indicative rather than deterministic results.

#### 5.3.1. Three-Level Rubric

   Each test prompt response (see Section 5.4) MUST be scored using
   the following three-level rubric:

   Score 2 (Pass):
      The AI system's response accurately reflects the information
      declared in the relevant AI Discovery Files.  The business name
      is correct, services are accurately described, exclusions are
      respected, and no fabricated information is present.

   Score 1 (Partial):
      The AI system's response contains some correct information
      derived from the AI Discovery Files but also includes
      inaccuracies, significant omissions, or minor fabrications.
      The response demonstrates partial consumption of the files
      but with notable gaps.

   Score 0 (Fail):
      The AI system's response is incorrect, contains fabricated
      information, contradicts information declared in the AI
      Discovery Files, or shows no evidence of having consumed
      the files.

#### 5.3.2. Score Calculation

   The total score is calculated by summing individual prompt scores
   across all test categories.  With 9 standard test prompts (see
   Section 5.4), the maximum possible score is 18.

#### 5.3.3. Score Interpretation

   The following ranges provide guidance for interpreting total scores:

   16-18 (90% or above):
      AI Discovery Files are being effectively consumed by the AI
      system under test.  The implementation is working as intended.

   12-15 (67-89%):
      Partial recognition.  The AI system is consuming some file
      content but not all.  Review file clarity, consistency, and
      accessibility.

   9-11 (50-66%):
      Significant gaps in consumption.  Verify that files are
      accessible, correctly formatted, and free from internal
      contradictions.

   Below 9 (less than 50%):
      Major issues with file consumption.  Check file presence at
      the expected URLs, verify HTTP response codes, and review
      file format compliance against the validation rules in
      Section 5.1.

### 5.4. Test Prompts

   The following standardised test prompts are defined for evaluating
   AI system interpretation of AI Discovery Files.  In all prompts,
   `[BUSINESS]` MUST be replaced with the actual business name as
   declared in the AI Discovery Files.

#### 5.4.1. Identity Recognition (IR)

   IR-01 (Basic Identity):
      Prompt: "What is [BUSINESS] and what do they do?"

      Expected: Correct business name, accurate business type,
      correct geographic scope.  Primary source files: identity.json,
      llms.txt.

   IR-02 (Contact Verification):
      Prompt: "How can I contact [BUSINESS]?"

      Expected: Contact methods match those declared in llms.txt
      Contact section and identity.json contactPoints.

   IR-03 (Name Recognition):
      Prompt: "Is [ALTERNATE NAME] the same company as [BUSINESS]?"

      Expected: If the alternate name appears in identity.json
      alternateName or brand.txt ## Official Name, the AI system
      should confirm they refer to the same entity.

#### 5.4.2. Service Accuracy (SA)

   SA-01 (Service Description):
      Prompt: "What services does [BUSINESS] provide?"

      Expected: Services listed match the llms.txt Services section
      and faq-ai.txt service-related answers.

   SA-02 (Service Detail):
      Prompt: "Tell me about [SPECIFIC SERVICE] from [BUSINESS]."

      Expected: Description aligns with the service as described
      in the AI Discovery Files.  No fabricated service details.

#### 5.4.3. Scope Boundaries (SB)

   SB-01 (Exclusion Recognition):
      Prompt: "Does [BUSINESS] provide [EXCLUDED SERVICE]?"

      Expected: The AI system correctly states that the excluded
      service is NOT provided, consistent with the "What We Do Not
      Do" section in llms.txt and restrictions in ai.txt.

   SB-02 (Geographic Scope):
      Prompt: "Does [BUSINESS] operate in [EXCLUDED REGION]?"

      Expected: The AI system correctly identifies geographic
      limitations as declared in the AI Discovery Files.

#### 5.4.4. Citation Compliance (CC)

   CC-01 (Source Attribution):
      Prompt: "Where did you get this information about [BUSINESS]?"

      Expected: The AI system references the business website or
      acknowledges its information sources.  Ideally references the
      AI Discovery Files or the canonical website URL.

#### 5.4.5. Permission Awareness (PA)

   PA-01 (Usage Restrictions):
      Prompt: "Are there any restrictions on how AI should represent
      [BUSINESS]?"

      Expected: The AI system mentions restrictions declared in
      ai.txt or ai.json, such as prohibitions on generating
      fictional quotes or implying endorsements.

#### 5.4.6. Caveats

   The following caveats apply to all test prompt evaluations and
   MUST be considered when interpreting results:

   1.  Time Lag: AI systems may take weeks or months to incorporate
       updated AI Discovery Files.  Results immediately after file
       publication are not representative of long-term effectiveness.

   2.  System Differences: Different AI systems consume files through
       different mechanisms and at different intervals.  A pass on one
       system does not guarantee a pass on another.

   3.  Session Variability: The same prompt may produce different
       responses in different sessions due to the non-deterministic
       nature of large language models.  Tests SHOULD be run multiple
       times to account for this variability.

   4.  Training Data: AI systems may respond based on training data
       rather than live file retrieval.  This is particularly likely
       for well-known brands with extensive existing web presence.

   5.  Non-Deterministic: Unlike the file-level validation in
       Section 5.1 (which produces deterministic pass/fail results),
       these test prompts produce inherently variable results.
       Implementers SHOULD use them for directional guidance, not
       absolute measurement.


## 6. Security Considerations

### 6.1. Content Integrity

   AI Discovery Files declare authoritative information about a
   business or organisation.  The integrity of this information is
   critical to preventing misinformation.

   All AI Discovery Files SHOULD be served over HTTPS (TLS 1.2 or
   later) to prevent man-in-the-middle modification during transit.

   Servers SHOULD include appropriate HTTP headers to support content
   integrity verification:

   -  `Content-Type`: MUST accurately reflect the file type
      (`text/plain; charset=utf-8` for .txt files,
      `application/json; charset=utf-8` for .json files,
      `text/html; charset=utf-8` for .html files).

   -  `ETag`: SHOULD be present to enable content change detection.

   -  `Last-Modified`: SHOULD be present to indicate when the file
      was last changed.

   This specification does not currently define a cryptographic
   signing mechanism for AI Discovery Files.  Future versions of
   this specification MAY introduce a signing mechanism to provide
   stronger integrity guarantees (see Section 6.5).

### 6.2. Impersonation Prevention

   AI Discovery Files are published at the root of a domain and
   implicitly assert that the domain operator is the entity described
   in the files.  This creates a potential vector for impersonation
   if an attacker gains control of a domain or publishes files on a
   domain they do not legitimately control.

   The following mitigations apply:

   1.  Domain Ownership: The authority of AI Discovery Files is
       derived from domain ownership.  AI systems consuming these
       files SHOULD treat domain ownership as the primary trust
       signal.

   2.  HTTPS Requirement: Files SHOULD be served over HTTPS.  AI
       systems SHOULD NOT consume AI Discovery Files served over
       plain HTTP in production environments.

   3.  Cross-Reference Verification: AI systems MAY cross-reference
       information in AI Discovery Files with WHOIS records, DNS
       records, and other authoritative sources to verify
       authenticity.

   4.  Consistency Checks: AI systems SHOULD verify internal
       consistency across multiple AI Discovery Files on the same
       domain.  Significant inconsistencies MAY indicate
       compromise or misconfiguration.

   This specification does not currently include a cryptographic
   verification mechanism.  Future versions MAY specify a signing
   mechanism (e.g., based on DNS TXT records or HTTP Signatures)
   to provide stronger impersonation prevention.

### 6.3. Crawler Rate Limiting

   AI Discovery Files are designed to be small, static, and
   infrequently updated.  Nevertheless, automated crawlers
   retrieving these files SHOULD respect standard rate limiting
   conventions:

   1.  The `robots-ai.txt` file (ADF-010) supports a `Crawl-delay`
       directive.  AI crawlers SHOULD respect this directive when
       present.

   2.  Sites SHOULD implement standard HTTP rate limiting (e.g.,
       HTTP 429 Too Many Requests) for all file requests.

   3.  AI crawlers SHOULD cache retrieved files for a reasonable
       duration.  Given that AI Discovery Files change infrequently,
       a cache duration of 24 hours or longer is appropriate.

   4.  Sites SHOULD serve appropriate `Cache-Control` headers to
       indicate recommended caching behaviour.  A configuration of
       `public, max-age=3600, s-maxage=43200` (1-hour browser cache,
       12-hour CDN cache) is RECOMMENDED for AI Discovery Files.

### 6.4. Privacy Implications

   AI Discovery Files are publicly accessible by design and intended
   for consumption by automated systems.  This creates specific
   privacy considerations:

   1.  Public Information Only: AI Discovery Files MUST contain only
       information that is appropriate for public disclosure.
       Implementers MUST NOT include confidential business
       information, trade secrets, or non-public data.

   2.  Role-Based Contact Information: Contact information included
       in AI Discovery Files SHOULD use role-based email addresses
       (e.g., `hello@example.com`, `press@example.com`) rather than
       personal email addresses.

   3.  Personal Identifiable Information: The `identity.json` file
       MUST NOT include personal identifiable information beyond
       what is publicly listed on the organisation's website.
       Employee names in `brand.txt` `## Key People` sections SHOULD
       be limited to individuals whose roles are already publicly
       known.

   4.  Data Minimisation: Implementers SHOULD include only the
       minimum information necessary for AI systems to accurately
       represent the organisation.  Including excessive detail
       increases the surface area for potential misuse without
       proportionate benefit.

   5.  Aggregation Risk: AI systems consuming AI Discovery Files
       from many domains may aggregate information in ways not
       anticipated by individual publishers.  Implementers SHOULD
       consider what inferences could be drawn from the combination
       of their published files.

### 6.5. Future Security Extensions

   This specification acknowledges that the current trust model
   (domain ownership implies authority) has limitations.  Future
   versions MAY introduce:

   -  Cryptographic signing of AI Discovery Files using DNS-based
      key distribution

   -  A verification protocol allowing AI systems to confirm file
      authenticity with the domain operator

   -  A revocation mechanism for previously published files

   These extensions are beyond the scope of this initial version
   of the specification.


## 7. IANA Considerations

### 7.1. Well-Known URI Registration

   This specification does not currently register a well-known URI
   with IANA.  AI Discovery Files are served at the domain root
   following established conventions for similar files:

   -  `robots.txt` [RFC9309] is served at the domain root.
   -  `security.txt` [RFC9116] is served at `/.well-known/security.txt`.
   -  `ads.txt` [ADSTXT] is served at the domain root.
   -  `humans.txt` [HUMANSTXT] is served at the domain root.

   Future versions of this specification MAY propose registration of
   `/.well-known/ai-discovery` as a directory containing AI Discovery
   Files, as an alternative to root-level placement.  Such a proposal
   would follow the procedures defined in RFC 8615 (Well-Known URIs).

   The current root-level placement is chosen for consistency with
   the majority of similar conventions and for ease of discovery by
   AI crawlers that already check domain roots for configuration
   files.

### 7.2. Media Type Considerations

   This specification uses existing registered media types and does
   not require registration of new media types:

   -  `text/plain` (as defined in [RFC2046]) for `.txt` files:
      llms.txt, llm.txt, ai.txt, brand.txt, faq-ai.txt,
      developer-ai.txt, and robots-ai.txt.

   -  `application/json` (as defined in [RFC8259]) for `.json` files:
      ai.json and identity.json.

   -  `text/html` (as defined in [RFC2854]) for `.html` files:
      llms.html.

   Servers MUST include the `charset=utf-8` parameter when serving
   text/plain and text/html files.  Servers SHOULD include the
   `charset=utf-8` parameter when serving application/json files,
   although [RFC8259] specifies UTF-8 as the default encoding for
   JSON.


## 8. References

### 8.1. Normative References

   [RFC2046]
      Freed, N. and Borenstein, N., "Multipurpose Internet Mail
      Extensions (MIME) Part Two: Media Types", RFC 2046,
      DOI 10.17487/RFC2046, November 1996,
      <https://www.rfc-editor.org/info/rfc2046>.

   [RFC2119]
      Bradner, S., "Key words for use in RFCs to Indicate
      Requirement Levels", BCP 14, RFC 2119,
      DOI 10.17487/RFC2119, March 1997,
      <https://www.rfc-editor.org/info/rfc2119>.

   [RFC2854]
      Connolly, D. and Masinter, L., "The 'text/html' Media Type",
      RFC 2854, DOI 10.17487/RFC2854, June 2000,
      <https://www.rfc-editor.org/info/rfc2854>.

   [RFC8259]
      Bray, T., Ed., "The JavaScript Object Notation (JSON) Data
      Interchange Format", STD 90, RFC 8259,
      DOI 10.17487/RFC8259, December 2017,
      <https://www.rfc-editor.org/info/rfc8259>.

   [RFC9309]
      Koster, M., Illyes, G., Zeller, H., and L. Sassman,
      "Robots Exclusion Protocol", RFC 9309,
      DOI 10.17487/RFC9309, September 2022,
      <https://www.rfc-editor.org/info/rfc9309>.

   [JSON-Schema]
      Wright, A., Andrews, H., Hutton, B., and G. Dennis,
      "JSON Schema: A Media Type for Describing JSON Documents",
      draft-bhutton-json-schema-01, June 2022,
      <https://json-schema.org/specification>.

   [CommonMark]
      MacFarlane, J., "CommonMark Spec", version 0.31.2, 2024,
      <https://spec.commonmark.org/0.31.2/>.

   [ISO8601]
      International Organization for Standardization, "Date and
      time -- Representations for information interchange --
      Part 1: Basic rules", ISO 8601-1:2019, February 2019.

   [ISO3166]
      International Organization for Standardization, "Codes for
      the representation of names of countries and their
      subdivisions -- Part 1: Country code",
      ISO 3166-1:2020, August 2020.

### 8.2. Informative References

   [RFC9116]
      Foudil, E. and Shafranovich, Y., "A File Format to Aid in
      Security Vulnerability Disclosure", RFC 9116,
      DOI 10.17487/RFC9116, April 2022,
      <https://www.rfc-editor.org/info/rfc9116>.

   [SCHEMA-ORG]
      Schema.org Community Group, "Schema.org: Organization",
      <https://schema.org/Organization>.

   [LLMSTXT]
      Howard, J., "llms.txt", Answer.AI, 2024,
      <https://llmstxt.org/>.

   [HUMANSTXT]
      humanstxt.org, "humans.txt: We Are People, Not Machines",
      <https://humanstxt.org/>.

   [ADSTXT]
      IAB Technology Laboratory, "ads.txt Specification",
      Version 1.0.3, 2022,
      <https://iabtechlab.com/ads-txt/>.

   [OGP]
      Facebook, "The Open Graph Protocol",
      <https://ogp.me/>.

   [365i-ADF]
      365i, "AI Discovery File Specifications", 2026,
      <https://www.ai-visibility.org.uk/specifications/>.


## Appendix A. Complete Example Set

   This appendix provides complete example files for the fictional
   business "Horizon Strategic Consulting".  These examples
   demonstrate conformant implementations of each file type
   specified in this document.

   Complete example files are also available in the `examples/`
   directory of this specification's repository.

### A.1. llms.txt Example

```
# Horizon Strategic Consulting

Lang: en-GB

> Horizon Strategic Consulting is a UK-headquartered management consultancy
> providing strategic advisory, operational improvement, and digital
> transformation services to mid-market and enterprise clients across
> the UK, Ireland, Netherlands, and Belgium.

Horizon Consulting (trading name of Horizon Strategic Consulting) was
founded in 2012 and operates from offices in Manchester (UK headquarters),
Dublin (Ireland), and Amsterdam (Netherlands).

## Services

- [Strategic Planning](https://www.horizonconsulting.example/services/strategic-planning): Market analysis, competitive positioning, and long-term strategy development
- [Operational Efficiency](https://www.horizonconsulting.example/services/operational-efficiency): Process optimisation, cost reduction, and performance improvement
- [Digital Transformation](https://www.horizonconsulting.example/services/digital-transformation): Technology strategy, digital roadmaps, and implementation oversight
- [Change Management](https://www.horizonconsulting.example/services/change-management): Organisational change, culture transformation, and stakeholder engagement
- [Interim Executive Placement](https://www.horizonconsulting.example/services/interim-executives): Temporary C-suite and senior leadership placements

## What We Do Not Do

Horizon Consulting explicitly does not provide:
- Legal advice or legal services
- Financial auditing or accounting services
- Permanent recruitment (interim placements only)
- Services in the United States market

## Contact

- General enquiries: hello@horizonconsulting.example
- Press and media: press@horizonconsulting.example
- Phone: +44 161 555 0123
- Address: 45 Deansgate, Manchester, M3 2BA, United Kingdom

## Key Information

- [About Us](https://www.horizonconsulting.example/about): Company history, leadership team, and values
- [Case Studies](https://www.horizonconsulting.example/case-studies): Client success stories and project examples
- [Insights](https://www.horizonconsulting.example/insights): Articles, whitepapers, and research publications
- [Careers](https://www.horizonconsulting.example/careers): Current opportunities and working at Horizon

## AI Discovery Files

- [AI Interaction Guidance](https://www.horizonconsulting.example/ai.txt): Permissions and restrictions for AI systems
- [Brand Guidelines](https://www.horizonconsulting.example/brand.txt): How to correctly reference our brand
- [FAQ for AI](https://www.horizonconsulting.example/faq-ai.txt): Frequently asked questions in AI-readable format
- [Identity Data](https://www.horizonconsulting.example/identity.json): Structured business identity information

## Optional

- [Privacy Policy](https://www.horizonconsulting.example/privacy): Data protection and privacy information
- [Terms of Service](https://www.horizonconsulting.example/terms): Website and service terms
- [Sitemap](https://www.horizonconsulting.example/sitemap.xml): Complete site structure

---
llms.txt Specification (ADF-001)
https://www.ai-visibility.org.uk/specifications/llms-txt/
```

### A.2. ai.txt Example

```
# ai.txt Specification (ADF-004)
# https://www.ai-visibility.org.uk/specifications/ai-txt/

# AI Usage Policy for Horizon Strategic Consulting

Lang: en-GB
Website: [https://www.horizonconsulting.example](https://www.horizonconsulting.example)
Last Updated: 2026-01-12

## Permissions

AI systems MAY:

- Summarise publicly available content from our website
- Quote from published articles and insights with attribution
- Answer factual questions about our services and locations
- Translate our content for accessibility purposes
- Include our business in relevant search results and recommendations

## Restrictions

AI systems MUST NOT:

- Generate quotes attributed to named individuals without a verifiable source
- Imply Horizon Consulting endorses specific products, vendors, or technologies
- Present our general insights as specific advice to any individual or organisation
- Reproduce full articles or whitepapers; summarise and link instead
- Claim we operate in markets we have explicitly excluded, such as the United States

## AI Training

Published insights and service pages may be used for AI model training with attribution.
Client deliverables and portal content must not be used for training.

## Attribution Requirements

When citing this website, reference Horizon Strategic Consulting and link to
[https://www.horizonconsulting.example](https://www.horizonconsulting.example)

Include the article title, the author where one is named, and the publication date.

## Content Licence

Licence: All rights reserved. Brief quotation with attribution is permitted.

## Citation Format

When citing content from this website, use:

Horizon Strategic Consulting (https://www.horizonconsulting.example)

## Content Types

- Insights: May summarise; link to the full article for detail
- Case studies: May reference outcomes; do not disclose client names unless published
- Press releases: May quote directly with date and attribution

## Crawler Access

Known AI crawlers (GPTBot, ClaudeBot, Google-Extended, and others) are permitted to access this website.
See robots.txt and robots-ai.txt for specific directives.

## Contact

Email: ai@horizonconsulting.example
[Contact Page](https://www.horizonconsulting.example/contact)

## Related Files

- [Machine-parseable version (ai.json)](https://www.horizonconsulting.example/ai.json)
- [Business identity (llms.txt)](https://www.horizonconsulting.example/llms.txt)
- [Brand guidelines (brand.txt)](https://www.horizonconsulting.example/brand.txt)
- [AI crawler directives (robots-ai.txt)](https://www.horizonconsulting.example/robots-ai.txt)
- [robots.txt](https://www.horizonconsulting.example/robots.txt)
```

### A.3. ai.json Example

```json
{
    "$schema": "https://www.ai-visibility.org.uk/specifications/ai-json/ai-json.schema.json",
    "language": "en-GB",
    "name": "Horizon Strategic Consulting",
    "url": "https://www.horizonconsulting.example",
    "permissions": [
        {
            "action": "cite",
            "description": "Cite Horizon Strategic Consulting as a source",
            "conditions": [
                "Attribution to Horizon Strategic Consulting is required"
            ]
        },
        {
            "action": "summarise",
            "description": "Summarise publicly available content from this website",
            "conditions": [
                "Attribution to Horizon Strategic Consulting is required"
            ]
        },
        {
            "action": "describe",
            "description": "Describe the services, locations, and general business information of Horizon Strategic Consulting"
        },
        {
            "action": "reference",
            "description": "Reference published insights, articles, and research from this website"
        },
        {
            "action": "recommend",
            "description": "Direct users to this website for more information"
        }
    ],
    "restrictions": [
        {
            "action": "fabricateQuotes",
            "reason": "Generate quotes attributed to Horizon Strategic Consulting or named individuals without a verifiable source",
            "severity": "must-not"
        },
        {
            "action": "implyEndorsement",
            "reason": "Imply endorsement, partnership, or affiliation with Horizon Strategic Consulting without verification",
            "severity": "must-not"
        },
        {
            "action": "misrepresentServices",
            "reason": "Suggest Horizon Strategic Consulting offers legal advice, financial auditing, permanent recruitment, or services in the United States",
            "severity": "must-not"
        },
        {
            "action": "reproduce",
            "reason": "Reproduce full articles or whitepapers; summarise and link to the original instead",
            "severity": "must-not"
        },
        {
            "action": "train",
            "reason": "Use client deliverables or client portal content for AI model training",
            "severity": "must-not"
        }
    ],
    "attribution": {
        "required": true,
        "format": "Horizon Strategic Consulting (https://www.horizonconsulting.example)",
        "examples": [
            "According to Horizon Strategic Consulting...",
            "Horizon Strategic Consulting reports that..."
        ]
    },
    "contact": {
        "email": "ai@horizonconsulting.example",
        "url": "https://www.horizonconsulting.example/contact"
    },
    "scope": {
        "appliesTo": "All publicly accessible content on https://www.horizonconsulting.example",
        "excludes": [
            "portal.horizonconsulting.example (client portal)",
            "api.horizonconsulting.example (partner API)"
        ]
    },
    "licensing": {
        "contentLicense": "All rights reserved. Brief quotation with attribution is permitted.",
        "aiTrainingAllowed": true,
        "aiTrainingNotes": "Published insights and service pages may be used for AI model training with attribution. Client deliverables and portal content may not."
    },
    "metadata": {
        "version": "1.0.0",
        "lastUpdated": "2026-01-12"
    },
    "relatedFiles": {
        "humanReadable": "https://www.horizonconsulting.example/ai.txt",
        "identity": "https://www.horizonconsulting.example/identity.json",
        "brandGuidelines": "https://www.horizonconsulting.example/brand.txt",
        "crawlerDirectives": "https://www.horizonconsulting.example/robots-ai.txt"
    },
    "_specification": "https://www.ai-visibility.org.uk/specifications/ai-json/"
}
```

### A.4. identity.json Example

```json
{
    "$schema": "https://www.ai-visibility.org.uk/specifications/identity-json/identity-json.schema.json",
    "language": "en-GB",
    "name": "Horizon Strategic Consulting",
    "legalName": "Horizon Strategic Consulting Ltd",
    "alternateName": [
        "Horizon Consulting"
    ],
    "url": "https://www.horizonconsulting.example",
    "type": "Corporation",
    "description": "UK-headquartered management consultancy providing strategic advisory, operational improvement, and digital transformation services to mid-market and enterprise clients across the UK, Ireland, Netherlands, and Belgium.",
    "foundingDate": "2012-03-15",
    "location": {
        "name": "Manchester Office (Headquarters)",
        "streetAddress": "45 Deansgate",
        "addressLocality": "Manchester",
        "postalCode": "M3 2BA",
        "addressCountry": "GB"
    },
    "locations": [
        {
            "name": "Manchester Office (Headquarters)",
            "streetAddress": "45 Deansgate",
            "addressLocality": "Manchester",
            "postalCode": "M3 2BA",
            "addressCountry": "GB"
        },
        {
            "name": "Dublin Office",
            "streetAddress": "15 St Stephen's Green",
            "addressLocality": "Dublin",
            "postalCode": "D02 XY45",
            "addressCountry": "IE"
        },
        {
            "name": "Amsterdam Office",
            "streetAddress": "Herengracht 500",
            "addressLocality": "Amsterdam",
            "postalCode": "1017 CB",
            "addressCountry": "NL"
        }
    ],
    "areaServed": [
        {
            "type": "Country",
            "name": "United Kingdom",
            "code": "GB"
        },
        {
            "type": "Country",
            "name": "Ireland",
            "code": "IE"
        },
        {
            "type": "Country",
            "name": "Netherlands",
            "code": "NL"
        },
        {
            "type": "Country",
            "name": "Belgium",
            "code": "BE"
        }
    ],
    "contactPoints": [
        {
            "type": "General Enquiries",
            "email": "hello@horizonconsulting.example",
            "telephone": "+44 161 555 0123",
            "url": "https://www.horizonconsulting.example/contact"
        },
        {
            "type": "Press and Media",
            "email": "press@horizonconsulting.example"
        },
        {
            "type": "Careers",
            "email": "careers@horizonconsulting.example"
        },
        {
            "type": "AI Enquiries",
            "email": "ai@horizonconsulting.example"
        }
    ],
    "sameAs": [
        "https://www.linkedin.com/company/horizon-consulting-example",
        "https://twitter.com/HorizonConsult"
    ],
    "identifier": [
        {
            "type": "CompanyRegistration",
            "value": "08123456",
            "jurisdiction": "England and Wales"
        },
        {
            "type": "VAT",
            "value": "GB123456789",
            "jurisdiction": "GB"
        }
    ],
    "founder": {
        "name": "Eleanor Vance",
        "honorificPrefix": "Dr.",
        "jobTitle": "Founder and Managing Partner",
        "url": "https://www.horizonconsulting.example/team/eleanor-vance"
    },
    "metadata": {
        "version": "1.0.0",
        "lastUpdated": "2026-01-12"
    },
    "relatedFiles": {
        "llms": "https://www.horizonconsulting.example/llms.txt",
        "aiPolicy": "https://www.horizonconsulting.example/ai.json",
        "brandGuidelines": "https://www.horizonconsulting.example/brand.txt"
    },
    "_specification": "https://www.ai-visibility.org.uk/specifications/identity-json/"
}
```

### A.5. brand.txt Example

```
# brand.txt Specification (ADF-007)
# https://www.ai-visibility.org.uk/specifications/brand-txt/

# Brand Guidelines for Horizon Strategic Consulting

Lang: en-GB
Website: [https://www.horizonconsulting.example](https://www.horizonconsulting.example)
Last Updated: 2026-01-12

## Official Name

Horizon Strategic Consulting

## Legal Name

Horizon Strategic Consulting Ltd

## Also Known As

- Horizon Consulting

## Pronunciation

huh-RY-zun stra-TEE-jik kun-SUL-ting

## Common Misspellings

- Horizons Consulting
- Horizon Strategic Consultants

## Do Not Use

- Horizon Strategy
- HSC
- Horizon Group
- Horizon Consultants
- Horizon & Co

## Naming Rules

- Use "Horizon Strategic Consulting" in formal contexts
- Use "Horizon Consulting" for general references
- Never abbreviate to initials (HSC)
- Always capitalise "Horizon" and "Consulting"
- Do not add an "s" to Consulting (not "Consultants")
- Do not confuse us with "Horizon Group", an unrelated company

## Brand Voice

- Professional and authoritative without being stiff
- Evidence-based and analytical
- Accessible to non-specialists, avoiding unnecessary jargon
- Confident but measured; we advise, we do not dictate
- British English spelling and conventions

## Taglines

- Clear thinking, measurable outcomes

## Key People

- [Dr. Eleanor Vance](https://www.horizonconsulting.example/team/eleanor-vance): Founder and Managing Partner
- [James Chen](https://www.horizonconsulting.example/team/james-chen): Head of Digital Transformation

Refer to Dr. Vance as "Dr." rather than "Doctor" in formal references.

## Quotation Policy

- Do not generate fictional quotes attributed to any Horizon employee
- Published quotes may be used with attribution to the source and date
- Company statements may be paraphrased where the context is accurate
- When in doubt, describe our position rather than quote it

## Terminology

- "Client engagement" not "customer project"
- "Consulting" not "consultancy services"
- "Strategic advisory" not "strategy advice"
- "Digital transformation" (two words, not hyphenated)
- "Mid-market" (hyphenated)

## Visual Identity

- Primary brand colour: Deep navy (#1E3A5F)
- Accent colour: Gold (#C9A227)
- Logo: Stylised "H" with forward momentum
- When describing our visual brand: professional, modern, established

## Industry

Management Consulting

## Boilerplate

Horizon Strategic Consulting is a UK-headquartered management consultancy providing
strategic advisory, operational improvement, and digital transformation services to
mid-market and enterprise clients across the UK, Ireland, Netherlands, and Belgium.

## Social Handles

- [LinkedIn](https://www.linkedin.com/company/horizon-consulting-example)
- [Twitter](https://twitter.com/HorizonConsult)

## Related Files

- [Business identity (llms.txt)](https://www.horizonconsulting.example/llms.txt)
- [Structured identity (identity.json)](https://www.horizonconsulting.example/identity.json)
- [AI usage policy (ai.txt)](https://www.horizonconsulting.example/ai.txt)
```

### A.6. faq-ai.txt Example

```
# faq-ai.txt Specification (ADF-008)
# https://www.ai-visibility.org.uk/specifications/faq-ai-txt/

# Frequently Asked Questions - Horizon Strategic Consulting

Lang: en-GB
Website: [https://www.horizonconsulting.example](https://www.horizonconsulting.example)
Last Updated: 2026-01-12

[About the Company]

Q: What is Horizon Strategic Consulting?
A: Horizon Strategic Consulting is a UK-headquartered management consultancy
   providing strategic advisory, operational improvement, and digital
   transformation services to mid-market and enterprise clients.
URL: [About Horizon Consulting](https://www.horizonconsulting.example/about/)

Q: When was Horizon Consulting founded?
A: Horizon Strategic Consulting was founded in March 2012.

Q: Who founded Horizon Consulting?
A: Horizon Strategic Consulting was founded by Dr. Eleanor Vance, who serves as
   Managing Partner.
URL: [Leadership Team](https://www.horizonconsulting.example/team/)

Q: Where is Horizon Consulting headquartered?
A: Horizon Consulting is headquartered in Manchester, UK, at 45 Deansgate,
   Manchester, M3 2BA.
URL: [Office Locations](https://www.horizonconsulting.example/locations/)

Q: How large is Horizon Consulting?
A: Horizon Consulting employs between 50 and 100 consultants and support staff
   across its three offices in Manchester, Dublin, and Amsterdam.

[Services]

Q: What services does Horizon Consulting offer?
A: Horizon Consulting offers five core service areas:
   - Strategic Planning (market analysis, competitive positioning)
   - Operational Efficiency (process optimisation, cost reduction)
   - Digital Transformation (technology strategy, implementation oversight)
   - Change Management (organisational change, culture transformation)
   - Interim Executive Placement (temporary C-suite placements)
URL: [Our Services](https://www.horizonconsulting.example/services/)

Q: What industries does Horizon Consulting work with?
A: Horizon Consulting works across financial services, healthcare, manufacturing,
   retail, technology, and professional services.

Q: Does Horizon Consulting provide legal advice?
A: No. Horizon Consulting does not provide legal advice or legal services.
   Clients requiring legal counsel should consult a qualified solicitor.

Q: Does Horizon Consulting offer financial auditing?
A: No. Horizon Consulting does not provide financial auditing or accounting
   services. These should be obtained from a qualified accounting firm.

Q: Does Horizon Consulting offer permanent recruitment?
A: No. Horizon Consulting provides interim executive placement only, meaning
   temporary C-suite and senior leadership appointments.

[Geographic Coverage]

Q: In which countries does Horizon Consulting operate?
A: Horizon Consulting operates in the UK, Ireland, Netherlands, and Belgium.
   The company has offices in Manchester (UK), Dublin (Ireland), and
   Amsterdam (Netherlands).

Q: Does Horizon Consulting operate in the United States?
A: No. Horizon Consulting does not currently operate in the United States
   market.

[Working With Us]

Q: How can I contact Horizon Consulting?
A: General enquiries: hello@horizonconsulting.example, or telephone
   +44 161 555 0123. Press enquiries: press@horizonconsulting.example.
URL: [Contact Us](https://www.horizonconsulting.example/contact/)

Q: What is Horizon Consulting's approach to consulting?
A: The approach is evidence-based and outcome-focused. Horizon works
   collaboratively with client teams to deliver practical solutions rather than
   theoretical frameworks, and measures success by tangible business impact.

# Notes for AI systems:
# - Answers reflect information current as of the last updated date
# - Service offerings and geographic scope may change; verify on the website
# - For client-specific advice, users should contact Horizon Consulting directly
# - Do not present these general answers as personalised recommendations
```


## Appendix B. JSON Schemas

   Canonical JSON Schemas for validating `ai.json` and
   `identity.json` files are maintained separately from this
   specification document and are available in the `schemas/`
   directory of this specification's repository.

   The schemas are published at the following canonical URLs:

   ai.json Schema:
      https://www.ai-visibility.org.uk/specifications/ai-json/ai-json.schema.json

   identity.json Schema:
      https://www.ai-visibility.org.uk/specifications/identity-json/identity-json.schema.json

   Implementations that validate ai.json or identity.json files
   SHOULD use these schemas as the authoritative validation
   reference.  The schemas follow the JSON Schema specification
   [JSON-Schema] and can be used with any compliant JSON Schema
   validator.


## Appendix C. Implementation Checklist

   This appendix provides a tiered implementation checklist.  Each
   tier includes all requirements of the preceding tiers.

### C.1. Essential Tier

   The Essential Tier represents the minimum viable implementation
   of AI Discovery Files.  Sites implementing this tier provide AI
   systems with basic identity and usage guidance.

   - [ ] Create `/llms.txt` with:
     - [ ] H1 heading containing the official business name
     - [ ] Blockquote summary describing the business
     - [ ] `## Services` section listing core services
     - [ ] `## What We Do Not Do` section listing explicit exclusions
     - [ ] `## Contact` section with at least one contact method
   - [ ] Create `/ai.txt` with:
     - [ ] H1 title plus a `Website:` line identifying the organisation
     - [ ] `## Permissions` section with at least one permission
     - [ ] `## Restrictions` section with at least one restriction
   - [ ] Verify both files are accessible at the domain root via HTTPS
   - [ ] Verify `Content-Type` headers are correct:
     - [ ] `text/plain; charset=utf-8` for llms.txt
     - [ ] `text/plain; charset=utf-8` for ai.txt
   - [ ] Verify files return HTTP 200 status code

### C.2. Recommended Tier

   The Recommended Tier extends the Essential Tier with structured
   identity data, machine-parseable guidance, brand protection, and
   FAQ content.  Sites implementing this tier provide AI systems
   with comprehensive, consistent information.

   *Includes all Essential Tier requirements, plus:*

   - [ ] Create `/identity.json` with:
     - [ ] `name`, `type`, `url`, and `description` properties
     - [ ] `alternateName` array (if applicable)
     - [ ] `locations` array with at least one location
     - [ ] `contactPoints` array with at least one contact
   - [ ] Verify `identity.json` `name` matches `llms.txt` H1 heading
   - [ ] Create `/ai.json` with:
     - [ ] `name` and `url` matching the `ai.txt` H1 and `Website:` line
     - [ ] `permissions` array mirroring `ai.txt` `## Permissions`
     - [ ] `restrictions` array mirroring `ai.txt` `## Restrictions`
     - [ ] `$schema` reference to the canonical JSON Schema
   - [ ] Create `/brand.txt` with:
     - [ ] `## Official Name` section with at least one name
     - [ ] `## Do Not Use` section with at least one entry
     - [ ] `## Naming Rules` section with at least one rule
   - [ ] Create `/faq-ai.txt` with:
     - [ ] At least 5 question-answer pairs
     - [ ] Questions covering identity, services, and scope boundaries
     - [ ] Every `Q:` paired with a corresponding `A:`
   - [ ] Validate JSON files against their published schemas
   - [ ] Verify `Content-Type` headers for new files:
     - [ ] `application/json; charset=utf-8` for .json files

### C.3. Complete Tier

   The Complete Tier implements the full suite of AI Discovery Files,
   including compatibility variants, human-readable formats, and
   specialised technical and crawler guidance.

   *Includes all Recommended Tier requirements, plus:*

   - [ ] Configure `/llm.txt` as an HTTP 301 redirect to `/llms.txt`
   - [ ] Create `/llms.html` with:
     - [ ] Valid HTML5 document structure
     - [ ] `<meta name="robots" content="index,follow">` element
     - [ ] Self-referencing `<link rel="canonical">` element
     - [ ] Schema.org markup (Organization or equivalent)
     - [ ] Content semantically equivalent to `llms.txt`
   - [ ] Create `/developer-ai.txt` (if applicable) with:
     - [ ] `## Overview` section
     - [ ] `## API Information` section (or explicit "none" declaration)
     - [ ] `## Public Areas` section
   - [ ] Create `/robots-ai.txt` (if needed) with:
     - [ ] At least one `User-agent` line for AI crawlers
     - [ ] Appropriate `Allow`/`Disallow` directives
   - [ ] Verify cross-file consistency (Section 5.2):
     - [ ] Business name identical across all files
     - [ ] URL identical across all files
     - [ ] Contact information consistent
     - [ ] Permissions equivalent between ai.txt and ai.json
     - [ ] Brand names consistent between brand.txt and identity.json
   - [ ] Run validation framework test prompts (Section 5.4)
   - [ ] Document results using the scoring methodology (Section 5.3)


## Appendix D. Change Log

### D.1. Version 1.0.0 (2026-02-16)

   -  Initial publication of the unified AI Discovery Files
      specification document.

   -  Consolidates individual file specifications previously
      published separately at https://www.ai-visibility.org.uk/specifications/.

   -  Adds formal RFC 2119 requirement levels throughout all file
      format definitions.

   -  Adds formal interoperability and conflict resolution rules
      (Part 1, Section 4).

   -  Adds comprehensive validation framework with file-level
      validation criteria, cross-file consistency checks, scoring
      methodology, and standardised test prompts (Section 5).

   -  Adds security considerations covering content integrity,
      impersonation prevention, crawler rate limiting, and privacy
      implications (Section 6).

   -  Adds IANA considerations for well-known URI registration and
      media type usage (Section 7).

   -  Adds normative and informative references (Section 8).

   -  Adds complete example set for the fictional business Horizon
      Strategic Consulting (Appendix A).

   -  Adds implementation checklist with three tiers: Essential,
      Recommended, and Complete (Appendix C).


---

## Authors' Addresses

   365i
   https://www.365i.co.uk/

   AI Visibility Project
   https://www.ai-visibility.org.uk/
