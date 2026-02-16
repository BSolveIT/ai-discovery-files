# Contributing to the AI Discovery Files Specification

Thank you for your interest in contributing to the AI Discovery Files specification. This document defines the process for reporting issues, proposing changes, and submitting new file type proposals.

All contributions are governed by the [CC BY 4.0 license](LICENSE).

---

## How to Contribute

### 1. Report Issues

If you find an error, ambiguity, or inconsistency in the specification, open a GitHub issue using the appropriate template:

- **[Bug or Ambiguity](https://github.com/BSolveIT/ai-discovery-files/issues/new?template=bug-ambiguity.yml)** -- for errors, contradictions, or unclear language in the spec
- **[Implementation Question](https://github.com/BSolveIT/ai-discovery-files/issues/new?template=implementation-question.yml)** -- for questions about how to implement ADF files correctly

### 2. Propose Changes

For specification changes:

1. Fork the repository
2. Create a branch from `main`
3. Edit the relevant file(s) in `spec/`
4. Submit a pull request using the [PR template](https://github.com/BSolveIT/ai-discovery-files/blob/main/.github/PULL_REQUEST_TEMPLATE.md)

For all pull requests, clearly describe the motivation and list the sections affected.

### 3. Discuss

Use [GitHub Issues](https://github.com/BSolveIT/ai-discovery-files/issues) for focused discussion on specific topics. Reference section numbers when discussing specification language.

---

## What Contributions Are Accepted

The following types of contributions are welcome:

| Type | Description | Process |
|------|-------------|---------|
| **Clarifications** | Rewording ambiguous language without changing meaning | Pull request |
| **Error corrections** | Fixing typos, broken references, or factual mistakes | Pull request or issue |
| **Examples** | New or improved example files in `examples/` | Pull request |
| **Test vectors** | Valid or invalid files for `test-vectors/` | Pull request |
| **Schema improvements** | Enhancements to JSON Schemas in `schemas/` | Pull request |
| **New file types** | Proposing ADF-011 and beyond | Issue first (see below) |
| **Tools and libraries** | Announcing validators, generators, or parsers | Issue (Tool/Library template) |

### What Will Not Be Accepted

- Changes that introduce promotional or marketing language
- Modifications that blur the distinction between AI Visibility Checking and AI Visibility Tracking
- Content that contradicts the normative definitions in Section 2 of the specification
- Pull requests without a clear motivation or rationale

---

## Proposing a New File Type (ADF-011+)

New AI Discovery File types follow a structured proposal process to ensure quality and community input.

### Step 1: Open an Issue

Use the **[New File Type Proposal](https://github.com/BSolveIT/ai-discovery-files/issues/new?template=new-file-type.yml)** issue template. You must provide:

- **Purpose** -- what problem does this file solve that existing ADF files do not?
- **Proposed filename** -- following the established naming conventions
- **Format** -- plain text, JSON, or another structured format with justification
- **Required sections or fields** -- the minimum content the file MUST contain
- **Complete example** -- at least one fully worked example
- **Relationship to existing files** -- how it complements or extends the current set

### Step 2: Community Discussion

The proposal enters a **minimum 30-day discussion period**. During this time:

- Community members review and comment on the proposal
- The proposer responds to feedback and refines the design
- Maintainers may request changes or additional justification
- Similar or overlapping proposals are identified and reconciled

### Step 3: Specification Pull Request

After the discussion period, if the proposal has support:

1. The proposer (or a maintainer) writes the specification section following the format of existing file type sections (see Section 3 of the spec)
2. A pull request is submitted with:
   - The new section in `spec/adf-spec.md`
   - At least one example file in `examples/`
   - Valid and invalid test vectors in `test-vectors/`
   - A JSON Schema if the file uses a structured format
3. The pull request references the original proposal issue

### Step 4: Maintainer Review and Merge

Maintainers review the pull request for:

- Consistency with existing specification language and conventions
- Correct use of RFC 2119 conformance keywords
- Completeness of examples and test vectors
- No conflicts with existing file types

Once approved, the new file type is merged and the specification version is incremented.

---

## Versioning

The specification uses [Semantic Versioning](https://semver.org/) (MAJOR.MINOR.PATCH):

| Level | When Used | Examples |
|-------|-----------|---------|
| **PATCH** | Editorial fixes, clarifications, typos | Rewording a confusing paragraph; fixing a broken cross-reference |
| **MINOR** | New optional features, new file types, expanded guidance | Adding ADF-011; adding a new optional section to an existing file type |
| **MAJOR** | Breaking changes to existing file formats | Changing required fields; renaming a file; altering the semantics of existing keywords |

Version numbers are tracked in the specification document metadata and in tagged GitHub releases.

---

## Style and Tone

All specification text must be:

- Written in the third person
- Precise and implementation-focused
- Free of promotional language, exclamation marks, and informal phrasing
- Consistent with [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) keyword usage (MUST, SHOULD, MAY)

When editing specification language, preserve the existing voice and level of formality. If in doubt, refer to [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309) (robots.txt) or [RFC 9116](https://www.rfc-editor.org/rfc/rfc9116) (security.txt) for tone guidance.

---

## Review Process

1. All contributions are reviewed by 365i maintainers
2. Editorial changes (PATCH) may be merged directly
3. Normative changes (MINOR or MAJOR) require review and discussion
4. New file type proposals require the full proposal process described above
5. Maintainers may request revisions before merging

Typical review turnaround is 7-14 days. Complex proposals may take longer.

---

## Code of Conduct

Contributors are expected to:

- Be respectful and constructive in all interactions
- Focus discussion on improving the specification
- Assume good faith from other participants
- Provide evidence and rationale for proposed changes
- Accept maintainer decisions gracefully, even when disagreeing

Disruptive, abusive, or bad-faith participation will result in removal from the project.

---

## Licensing

By submitting a contribution to this repository, you agree that your contribution is licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

You retain copyright to your contributions. The CC BY 4.0 license grants others the right to share and adapt your work, provided they give appropriate credit.

---

## Questions

For questions about contributing, open a [GitHub issue](https://github.com/BSolveIT/ai-discovery-files/issues) or contact 365i at [https://www.365i.co.uk/contact/](https://www.365i.co.uk/contact/).
