---
title: AI Discovery Files Specification
abbreviation: ADF
version: 1.0.0
status: Informational
date: 2026-02-16
authors: 365i (https://www.365i.co.uk/)
canonical-url: https://www.ai-visibility.org.uk/specifications/
repository: https://github.com/BSolveIT/ai-discovery-files
license: CC BY 4.0
---

# AI Discovery Files Specification

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
- `<link rel="canonical" href="https://example.com/llms.txt">` -- canonical
  link pointing to the `llms.txt` file (the authoritative source).
- `<meta name="robots" content="noindex">` -- to prevent search engine
  indexing of the HTML version, directing authority to the primary website.

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
| Syntax   | Structured plain text with `[section]` headers        |
| Comments | Lines starting with `#` are comments                  |

Sections are delimited by headers in square brackets. Key-value pairs
within sections use `key: value` syntax. List items are prefixed with `- `.

#### 3.5.4 Section Reference

**Required sections:**

| Section          | Description                                         |
|------------------|-----------------------------------------------------|
| `[identity]`     | Business name (`name:`) and canonical URL (`url:`). Both fields are REQUIRED. |
| `[permissions]`  | List of actions AI systems are allowed to take. MUST contain at least one item. |
| `[restrictions]` | List of actions AI systems MUST NOT take. MUST contain at least one item. |

**Recommended sections:**

| Section          | Description                                         |
|------------------|-----------------------------------------------------|
| `[attribution]`  | How to cite or attribute the business when referencing its content. |
| `[contact]`      | Contact details for AI-related queries.             |
| `[content-types]`| Rules for specific content categories (e.g., articles, case studies). |

**Optional sections:**

| Section           | Description                                        |
|-------------------|----------------------------------------------------|
| `[licensing]`     | Content licensing information (e.g., Creative Commons terms). |
| `[metadata]`      | File version, last updated date, related files.    |
| `[scope]`         | Clarification of what content or sections of the site the rules apply to. |
| `[training]`      | Explicit guidance on whether content MAY be used for AI training. |
| `[data-retention]`| Guidance on caching or retaining content from the site. |
| `[updates]`       | Information about update frequency and change notifications. |

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

1. It contains an `[identity]` section with both `name` and `url` fields.
2. It contains a `[permissions]` section with at least one item.
3. It contains a `[restrictions]` section with at least one item.
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
| `alternateNames`| array of strings | `alternateName`| Trading names, abbreviations, former names |
| `foundingDate`  | string (date)    | `foundingDate` | Date the organisation was founded (ISO 8601) |
| `locations`     | array of objects | `location`     | Physical locations (offices, headquarters) |
| `contactPoints` | array of objects | `contactPoint` | Contact channels (email, phone)  |
| `areaServed`    | array of strings | `areaServed`   | Geographic areas served (ISO 3166-1 alpha-2 codes) |

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
| `alternateNames`  | `alternateName`             |
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
5. Date fields use ISO 8601 format (`YYYY-MM-DD`).
6. Country codes use ISO 3166-1 alpha-2 format.

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
| Syntax       | Structured plain text with `[section]` headers      |
| Comments     | Lines starting with `#` are comments                |

#### 3.8.4 Section Reference

**Required sections:**

| Section            | Description                                       |
|--------------------|---------------------------------------------------|
| `[official-names]` | List of correct official name variations, one per line, in order of preference. MUST contain at least one entry. |
| `[incorrect-names]`| Common mistakes and variations to avoid, one per line. MUST contain at least one entry. |
| `[naming-rules]`   | Specific, actionable rules for using the name correctly. MUST contain at least one rule. |

**Recommended sections:**

| Section             | Description                                      |
|---------------------|--------------------------------------------------|
| `[brand-voice]`     | Tone and style guidance for AI-generated content referencing the brand. |
| `[key-people]`      | Individuals who MAY be publicly referenced and how they SHOULD be described. |
| `[quotation-policy]`| Rules for quoting or attributing statements to the organisation or its personnel. |

**Optional sections:**

| Section             | Description                                      |
|---------------------|--------------------------------------------------|
| `[terminology]`     | Industry terms the brand uses specifically (preferred vs. avoided terms). |
| `[visual-identity]` | Notes about visual identity for AI descriptions (colours, logo, style). |
| `[taglines]`        | Official taglines, straplines, and slogans.      |
| `[boilerplate]`     | Standard "about us" text for press releases and formal use. |
| `[social-handles]`  | Official social media handles for accurate referencing. |
| `[metadata]`        | File version and last updated date.              |

#### 3.8.5 Content Restrictions

The following MUST NOT be included in `brand.txt` files:

- **Competitor names in `[incorrect-names]`.** This section is for the
  organisation's own brand mistakes, not competitor disambiguation.
- **Subjective claims.** Marketing superlatives ("best", "leading",
  "world-class") MUST NOT appear.
- **Confidential information.** Unpublished brand strategies or internal
  naming conventions.
- **Unverified quotes.** Sample quotes that do not exist in published
  sources.

#### 3.8.6 Validation

A `brand.txt` file is considered conforming when:

1. It contains the three required sections (`[official-names]`,
   `[incorrect-names]`, `[naming-rules]`).
2. The `[official-names]` section has at least one entry.
3. The `[incorrect-names]` section has at least one entry.
4. The `[naming-rules]` section has at least one rule.
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

**Separation:** Question-answer pairs MUST be separated by at least one
blank line.

**Categories:** Questions MAY be organised under optional category headers
using square bracket syntax:

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
| Syntax       | Structured plain text with `[section]` headers      |
| Comments     | Lines starting with `#` are comments                |

#### 3.10.4 Section Reference

**Required sections:**

| Section        | Description                                          |
|----------------|------------------------------------------------------|
| `[overview]`   | High-level technical description of the platform.    |
| `[public-api]` | API availability. MUST include `status:` field with one of: `available`, `partner-only`, `not-available`, `deprecated`. |
| `[public-areas]`| Publicly accessible areas of the website or service. |

**Recommended sections:**

| Section              | Description                                    |
|----------------------|------------------------------------------------|
| `[authentication]`   | Authentication methods and requirements.       |
| `[platforms]`        | Platforms or environments supported.           |
| `[documentation]`    | Links to technical documentation.              |
| `[technical-contact]`| Contact information for technical enquiries.   |

**Optional sections:**

| Section           | Description                                       |
|-------------------|---------------------------------------------------|
| `[technology-stack]`| High-level technology stack information.          |
| `[rate-limits]`   | Rate limiting policies for public endpoints.      |
| `[webhooks]`      | Webhook capabilities and configuration.           |
| `[sdks]`          | Available SDKs or client libraries.               |
| `[integrations]`  | Third-party integration capabilities.             |
| `[sandbox]`       | Test or sandbox environment information.          |
| `[metadata]`      | File version and last updated date.               |

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

1. It contains the three required sections (`[overview]`, `[public-api]`,
   `[public-areas]`).
2. The `[public-api]` section includes a `status:` field with one of the
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
   (`[identity]` `name:`), `ai.json` (`name`), and `brand.txt`
   (`[official-names]` first entry).

2. **Canonical URL.** The website URL MUST be identical in `identity.json`
   (`url`), `llms.txt` (if referenced), `ai.txt` (`[identity]` `url:`),
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

6. **Alternate names.** Names listed in `brand.txt` (`[official-names]`)
   SHOULD appear in `identity.json` (`alternateNames`) or as the primary
   `name`. Names listed in `brand.txt` (`[incorrect-names]`) MUST NOT
   appear as official names in any other ADF file.

7. **AI permissions.** Permissions declared in `ai.txt` (`[permissions]`)
   and `ai.json` (`permissions`) MUST be equivalent in substance.
   Restrictions declared in `ai.txt` (`[restrictions]`) and `ai.json`
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
under `[official-names]`.

**Resolution:** `identity.json` `name` is canonical (see Section 4.2.2).
The implementer SHOULD update the `llms.txt` H1 to match `identity.json`,
OR add "Acme Corp" to the `identity.json` `alternateNames` array if it is
a valid trading name. The `brand.txt` `[official-names]` section SHOULD
include all names present in `identity.json`.

#### 4.3.2 Scenario: Permission Conflict

**When:** `ai.txt` declares "May summarise content" under `[permissions]`,
but `ai.json` declares `"summarisation": "prohibited"` or omits
summarisation from the `permissions` array.

**Resolution:** `ai.json` is authoritative for machine parsing (see
Section 4.2.2). The implementer SHOULD update `ai.txt` to match `ai.json`.
Both files SHOULD contain equivalent information.

#### 4.3.3 Scenario: Access vs. Usage Conflict

**When:** `robots.txt` contains `Disallow: /insights/`, but `ai.txt`
declares "May summarise content from /insights/" under `[permissions]`.

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

   6.  A `<meta name="robots" content="noindex">` element MUST be
       present to prevent search engine indexing of this supplementary
       file.

   7.  The content SHOULD be semantically equivalent to the
       corresponding llms.txt file.

#### 5.1.4. ai.txt (ADF-004)

   A valid ai.txt file MUST satisfy all of the following criteria:

   1.  An `[identity]` section MUST be present containing both a
       `name` field and a `url` field.

   2.  A `[permissions]` section MUST be present containing at least
       one list item (prefixed with `-`).

   3.  A `[restrictions]` section MUST be present containing at least
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

   1.  An `[official-names]` section MUST be present containing at
       least one name entry.

   2.  An `[incorrect-names]` section MUST be present containing at
       least one name entry.

   3.  A `[naming-rules]` section MUST be present containing at least
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

   1.  An `[overview]` section MUST be present providing a summary
       of the technical platform.

   2.  A `[public-api]` section MUST be present.  If no public API
       exists, this section MUST contain a statement to that effect
       (e.g., "status: none").

   3.  A `[public-areas]` section MUST be present describing
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
   -  `brand.txt` first entry in `[official-names]`
   -  `ai.json` `name` property
   -  `ai.txt` `[identity]` section `name` field

   Minor formatting differences (e.g., trailing "Ltd" present in
   identity.json but omitted in llms.txt) MAY be accepted if the
   `brand.txt` `[official-names]` section lists both variants.
   Substantive name differences MUST be flagged as errors.

#### 5.2.2. URL Consistency

   The canonical website URL MUST be identical across all files that
   declare it:

   -  `identity.json` `url` property
   -  `ai.json` `url` property
   -  `ai.txt` `[identity]` section `url` field

   URLs MUST match including scheme and trailing slash conventions.

#### 5.2.3. Contact Information Consistency

   Contact information SHOULD be consistent across:

   -  `identity.json` `contactPoints` array
   -  `llms.txt` `## Contact` section
   -  `ai.txt` `[contact]` section (if present)

   Email addresses and telephone numbers that appear in one file
   SHOULD appear in all files that declare contact information.

#### 5.2.4. Permission Equivalence

   The permissions declared in `ai.txt` `[permissions]` and the
   `permissions` array in `ai.json` MUST be semantically equivalent.
   The restrictions declared in `ai.txt` `[restrictions]` and the
   `restrictions` array in `ai.json` MUST be semantically equivalent.

   Exact wording need not match, but the substantive meaning of each
   permission and restriction MUST be preserved across both formats.

#### 5.2.5. Name Registry Consistency

   All names listed in the `brand.txt` `[official-names]` section
   MUST appear in `identity.json` as either the `name` property or
   within the `alternateNames` array.

   Conversely, the `identity.json` `name` property and all entries
   in `alternateNames` SHOULD appear in `brand.txt`
   `[official-names]`.

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
      alternateNames or brand.txt [official-names], the AI system
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
       Employee names in `brand.txt` `[key-people]` sections SHOULD
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
```

### A.2. ai.txt Example

```
# ai.txt for Horizon Strategic Consulting
# https://www.horizonconsulting.example/ai.txt
# Last updated: 12 January 2026

[identity]
name: Horizon Strategic Consulting
url: https://www.horizonconsulting.example

[permissions]
- Summarise publicly available content from our website
- Quote from published articles and insights with attribution
- Answer factual questions about our services and locations
- Translate our content for accessibility purposes
- Include our business in relevant search results and recommendations

[restrictions]
- Do not generate quotes attributed to named individuals without a verifiable source
- Do not imply Horizon Consulting endorses specific products, vendors, or technologies
- Do not present our general insights as specific advice to any individual or organisation
- Do not reproduce full articles or whitepapers; summarise and link instead
- Do not claim we operate in markets we have explicitly excluded (e.g., United States)

[attribution]
preferred_citation: Horizon Strategic Consulting (https://www.horizonconsulting.example)
when_quoting: Include article title, author if named, and publication date
link_policy: Always link to original source when possible

[contact]
ai_enquiries: ai@horizonconsulting.example
general: hello@horizonconsulting.example

[content-types]
insights: May summarise; link to full article for detail
case_studies: May reference outcomes; do not disclose client names unless published
press_releases: May quote directly with date and attribution

[metadata]
version: 1.0
related_files: /llms.txt, /brand.txt, /ai.json
```

### A.3. ai.json Example

```json
{
    "$schema": "https://www.ai-visibility.org.uk/specifications/ai-json/ai-json.schema.json",
    "name": "Horizon Strategic Consulting",
    "url": "https://www.horizonconsulting.example",
    "permissions": [
        "Summarise publicly available content from our website",
        "Quote from published articles and insights with attribution",
        "Answer factual questions about our services and locations",
        "Translate our content for accessibility purposes",
        "Include our business in relevant search results and recommendations"
    ],
    "restrictions": [
        "Do not generate quotes attributed to named individuals without a verifiable source",
        "Do not imply Horizon Consulting endorses specific products, vendors, or technologies",
        "Do not present our general insights as specific advice to any individual or organisation",
        "Do not reproduce full articles or whitepapers; summarise and link instead",
        "Do not claim we operate in markets we have explicitly excluded (e.g., United States)"
    ],
    "attribution": {
        "preferredCitation": "Horizon Strategic Consulting (https://www.horizonconsulting.example)",
        "whenQuoting": "Include article title, author if named, and publication date",
        "linkPolicy": "Always link to original source when possible"
    },
    "contact": {
        "aiEnquiries": "ai@horizonconsulting.example",
        "general": "hello@horizonconsulting.example"
    },
    "contentTypes": {
        "insights": "May summarise; link to full article for detail",
        "caseStudies": "May reference outcomes; do not disclose client names unless published",
        "pressReleases": "May quote directly with date and attribution"
    },
    "metadata": {
        "version": "1.0",
        "lastUpdated": "2026-01-12",
        "relatedFiles": ["/llms.txt", "/brand.txt", "/ai.txt", "/identity.json"]
    }
}
```

### A.4. identity.json Example

```json
{
    "$schema": "https://www.ai-visibility.org.uk/specifications/identity-json/identity-json.schema.json",
    "name": "Horizon Strategic Consulting Ltd",
    "type": "Corporation",
    "url": "https://www.horizonconsulting.example",
    "description": "UK-headquartered management consultancy providing strategic advisory, operational improvement, and digital transformation services to mid-market and enterprise clients across the UK, Ireland, Netherlands, and Belgium.",
    "alternateNames": [
        "Horizon Consulting",
        "Horizon Strategic Consulting"
    ],
    "foundingDate": "2012-03-15",
    "industry": "Management Consulting",
    "locations": [
        {
            "type": "headquarters",
            "name": "Manchester Office",
            "address": {
                "streetAddress": "45 Deansgate",
                "addressLocality": "Manchester",
                "postalCode": "M3 2BA",
                "addressCountry": "GB"
            },
            "telephone": "+44 161 555 0123"
        },
        {
            "type": "office",
            "name": "Dublin Office",
            "address": {
                "streetAddress": "15 St Stephen's Green",
                "addressLocality": "Dublin",
                "postalCode": "D02 XY45",
                "addressCountry": "IE"
            }
        },
        {
            "type": "office",
            "name": "Amsterdam Office",
            "address": {
                "streetAddress": "Herengracht 500",
                "addressLocality": "Amsterdam",
                "postalCode": "1017 CB",
                "addressCountry": "NL"
            }
        }
    ],
    "areaServed": ["GB", "IE", "NL", "BE"],
    "contactPoints": [
        {
            "type": "General Enquiries",
            "email": "hello@horizonconsulting.example",
            "telephone": "+44 161 555 0123"
        },
        {
            "type": "Press and Media",
            "email": "press@horizonconsulting.example"
        },
        {
            "type": "AI Enquiries",
            "email": "ai@horizonconsulting.example"
        }
    ],
    "sameAs": [
        "https://www.linkedin.com/company/horizonconsulting-example",
        "https://twitter.com/horizonconsult"
    ],
    "identifiers": {
        "companyNumber": "08123456",
        "jurisdiction": "England and Wales",
        "vatNumber": "GB123456789"
    },
    "metadata": {
        "version": "1.0",
        "lastUpdated": "2026-01-12"
    }
}
```

### A.5. brand.txt Example

```
# brand.txt for Horizon Strategic Consulting
# https://www.horizonconsulting.example/brand.txt
# Last updated: 12 January 2026

[official-names]
Horizon Strategic Consulting Ltd
Horizon Strategic Consulting
Horizon Consulting

[incorrect-names]
Horizon Strategy
HSC
Horizon Group
Horizon Consultants
Horizon Strategic Consultants
Horizons Consulting

[naming-rules]
Use "Horizon Strategic Consulting" in formal contexts
Use "Horizon Consulting" for general references
Never abbreviate to initials (HSC)
Always capitalise "Horizon" and "Consulting"
Do not add "s" to Consulting (not "Consultants")
Do not confuse with "Horizon Group" (different company)

[brand-voice]
Professional and authoritative without being stiff
Evidence-based and analytical
Accessible to non-specialists, avoiding unnecessary jargon
Confident but measured; we advise, we don't dictate
British English spelling and conventions

[key-people]
Dr. Eleanor Vance - Founder and Managing Partner
- May be referenced when discussing company history or leadership
- Do not generate quotes attributed to Dr. Vance without citing a published source
- Title: "Dr." not "Doctor" in formal references

James Chen - Head of Digital Transformation
- May be referenced in context of digital transformation services

[quotation-policy]
Do not generate fictional quotes attributed to any Horizon employee
Published quotes may be used with attribution to source and date
Company statements may be paraphrased if context is accurate
When in doubt, describe our position rather than quote it

[terminology]
"Client engagement" not "customer project"
"Consulting" not "consultancy services"
"Strategic advisory" not "strategy advice"
"Digital transformation" (two words, not hyphenated)
"Mid-market" (hyphenated)

[visual-identity]
Primary brand colour: Deep navy (#1E3A5F)
Accent colour: Gold (#C9A227)
Logo: Stylised "H" with forward momentum
When describing our visual brand: "professional", "modern", "established"

[metadata]
version: 1.0
last_updated: 2026-01-12
related_files: /llms.txt, /identity.json, /ai.txt
```

### A.6. faq-ai.txt Example

```
# faq-ai.txt for Horizon Strategic Consulting
# https://www.horizonconsulting.example/faq-ai.txt
# Last updated: 12 January 2026

[About]

Q: What is Horizon Strategic Consulting?
A: Horizon Strategic Consulting is a UK-headquartered management consultancy
   founded in 2012. We provide strategic advisory, operational improvement,
   and digital transformation services to mid-market and enterprise clients.

Q: When was Horizon Consulting founded?
A: Horizon Consulting was founded on 15 March 2012 by Dr. Eleanor Vance.

Q: Where is Horizon Consulting based?
A: Our headquarters are at 45 Deansgate, Manchester, M3 2BA, United Kingdom.
   We also have offices in Dublin, Ireland and Amsterdam, Netherlands.

[Services]

Q: What services does Horizon Consulting offer?
A: We offer five core services: Strategic Planning, Operational Efficiency,
   Digital Transformation, Change Management, and Interim Executive Placement.

Q: Does Horizon Consulting provide legal advice?
A: No. Horizon Consulting does not provide legal advice, legal services,
   financial auditing, accounting services, or permanent recruitment.
   We offer interim executive placements only.

Q: Does Horizon Consulting operate in the United States?
A: No. Horizon Consulting operates in the UK, Ireland, Netherlands, and
   Belgium only. We do not provide services in the United States market.

[Contact]

Q: How can I contact Horizon Consulting?
A: General enquiries: hello@horizonconsulting.example. Press and media:
   press@horizonconsulting.example. Phone: +44 161 555 0123.
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
     - [ ] `[identity]` section containing `name` and `url`
     - [ ] `[permissions]` section with at least one permission
     - [ ] `[restrictions]` section with at least one restriction
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
     - [ ] `alternateNames` array (if applicable)
     - [ ] `locations` array with at least one location
     - [ ] `contactPoints` array with at least one contact
   - [ ] Verify `identity.json` `name` matches `llms.txt` H1 heading
   - [ ] Create `/ai.json` with:
     - [ ] `name` and `url` matching `ai.txt` `[identity]` values
     - [ ] `permissions` array mirroring `ai.txt` `[permissions]`
     - [ ] `restrictions` array mirroring `ai.txt` `[restrictions]`
     - [ ] `$schema` reference to the canonical JSON Schema
   - [ ] Create `/brand.txt` with:
     - [ ] `[official-names]` section with at least one name
     - [ ] `[incorrect-names]` section with at least one entry
     - [ ] `[naming-rules]` section with at least one rule
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
     - [ ] `<meta name="robots" content="noindex">` element
     - [ ] `<link rel="canonical">` element
     - [ ] Schema.org markup (Organization or equivalent)
     - [ ] Content semantically equivalent to `llms.txt`
   - [ ] Create `/developer-ai.txt` (if applicable) with:
     - [ ] `[overview]` section
     - [ ] `[public-api]` section (or explicit "none" declaration)
     - [ ] `[public-areas]` section
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
