#!/usr/bin/env node

/**
 * AI Discovery Files Validator
 *
 * Validates AI Discovery Files against the ADF specification.
 * Supports structural validation for all 10 file types and
 * JSON Schema validation for ai.json (ADF-005) and identity.json (ADF-006).
 *
 * Usage:
 *   node validate.mjs <file> [--type <type>] [--schema-dir <path>] [--quiet]
 *   node validate.mjs --dir <directory> [--schema-dir <path>] [--quiet]
 *
 * Examples:
 *   node validate.mjs llms.txt
 *   node validate.mjs ai.json --type ai-json
 *   node validate.mjs --dir ./my-site
 *
 * @license CC BY 4.0
 * @see https://www.ai-visibility.org.uk/specifications/
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ---------------------------------------------------------------------------
// File type registry
// ---------------------------------------------------------------------------

const FILE_TYPES = {
  'llms.txt':        { code: 'ADF-001', type: 'llms-txt',        tier: 'essential' },
  'llm.txt':         { code: 'ADF-002', type: 'llm-txt',         tier: 'complete' },
  'llms.html':       { code: 'ADF-003', type: 'llms-html',       tier: 'complete' },
  'ai.txt':          { code: 'ADF-004', type: 'ai-txt',          tier: 'essential' },
  'ai.json':         { code: 'ADF-005', type: 'ai-json',         tier: 'recommended' },
  'identity.json':   { code: 'ADF-006', type: 'identity-json',   tier: 'recommended' },
  'brand.txt':       { code: 'ADF-007', type: 'brand-txt',       tier: 'recommended' },
  'faq-ai.txt':      { code: 'ADF-008', type: 'faq-ai-txt',      tier: 'recommended' },
  'developer-ai.txt':{ code: 'ADF-009', type: 'developer-ai-txt', tier: 'complete' },
  'robots-ai.txt':   { code: 'ADF-010', type: 'robots-ai-txt',   tier: 'complete' },
};

// ---------------------------------------------------------------------------
// Result helpers
// ---------------------------------------------------------------------------

class ValidationResult {
  constructor(file, type) {
    this.file = file;
    this.type = type;
    this.errors = [];
    this.warnings = [];
  }

  error(message, line) {
    this.errors.push({ message, line });
  }

  warn(message, line) {
    this.warnings.push({ message, line });
  }

  get valid() {
    return this.errors.length === 0;
  }

  toString() {
    const status = this.valid ? 'PASS' : 'FAIL';
    const parts = [`[${status}] ${this.file} (${this.type})`];

    for (const e of this.errors) {
      const loc = e.line ? ` (line ${e.line})` : '';
      parts.push(`  ERROR: ${e.message}${loc}`);
    }
    for (const w of this.warnings) {
      const loc = w.line ? ` (line ${w.line})` : '';
      parts.push(`  WARN:  ${w.message}${loc}`);
    }
    return parts.join('\n');
  }
}

// ---------------------------------------------------------------------------
// Validators — plain text files
// ---------------------------------------------------------------------------

function validateLlmsTxt(content, result) {
  const lines = content.split('\n');

  // MUST begin with an H1 heading (# Title)
  const firstNonEmpty = lines.findIndex(l => l.trim().length > 0);
  if (firstNonEmpty === -1) {
    result.error('File is empty');
    return;
  }

  const firstLine = lines[firstNonEmpty].trim();
  if (!firstLine.startsWith('# ')) {
    result.error('File MUST begin with a Markdown H1 heading (# Title)', firstNonEmpty + 1);
  } else if (firstLine === '#' || firstLine === '# ') {
    result.error('H1 heading MUST contain text after the "# " prefix', firstNonEmpty + 1);
  }

  // MUST contain a blockquote description (> ...)
  const hasBlockquote = lines.some(l => l.trim().startsWith('> '));
  if (!hasBlockquote) {
    result.error('File MUST contain a blockquote description (> ...) immediately after the H1');
  }

  // SHOULD contain at least one H2 section (## Section)
  const h2Lines = lines
    .map((l, i) => ({ line: l, num: i + 1 }))
    .filter(({ line }) => line.trim().startsWith('## '));

  if (h2Lines.length === 0) {
    result.warn('File SHOULD contain at least one H2 section (## Section Name)');
  }

  // Check for common recommended sections
  const sectionNames = h2Lines.map(({ line }) => line.trim().replace(/^## /, '').toLowerCase());
  const recommended = ['about', 'services', 'contact'];
  for (const name of recommended) {
    if (!sectionNames.some(s => s.includes(name))) {
      result.warn(`Recommended section "## ${name.charAt(0).toUpperCase() + name.slice(1)}" not found`);
    }
  }
}

function validateLlmTxt(content, result) {
  const lines = content.split('\n');

  // MUST begin with an H1 heading
  const firstNonEmpty = lines.findIndex(l => l.trim().length > 0);
  if (firstNonEmpty === -1) {
    result.error('File is empty');
    return;
  }

  const firstLine = lines[firstNonEmpty].trim();
  if (!firstLine.startsWith('# ')) {
    result.error('File MUST begin with a Markdown H1 heading (# Page Title)', firstNonEmpty + 1);
  }

  // SHOULD contain a blockquote
  const hasBlockquote = lines.some(l => l.trim().startsWith('> '));
  if (!hasBlockquote) {
    result.warn('File SHOULD contain a blockquote description');
  }
}

function validateLlmsHtml(content, result) {
  // MUST be valid HTML with DOCTYPE
  if (!content.trim().toLowerCase().startsWith('<!doctype html')) {
    result.error('File MUST begin with <!DOCTYPE html>');
  }

  // MUST contain <html> with lang attribute
  const htmlTag = content.match(/<html[^>]*>/i);
  if (!htmlTag) {
    result.error('File MUST contain an <html> element');
  } else if (!htmlTag[0].includes('lang=')) {
    result.warn('The <html> element SHOULD include a lang attribute');
  }

  // MUST contain <title>
  if (!/<title>[^<]+<\/title>/i.test(content)) {
    result.error('File MUST contain a non-empty <title> element');
  }

  // MUST contain <h1>
  if (!/<h1[^>]*>[^<]+/i.test(content)) {
    result.error('File MUST contain an <h1> element with the organisation name');
  }

  // SHOULD contain meta description
  if (!/<meta[^>]*name=["']description["'][^>]*>/i.test(content)) {
    result.warn('File SHOULD contain a <meta name="description"> element');
  }
}

function validateAiTxt(content, result) {
  const lines = content.split('\n');

  // Check for empty file
  if (content.trim().length === 0) {
    result.error('File is empty');
    return;
  }

  // MUST contain an [identity] section
  const hasIdentitySection = lines.some(l => {
    const trimmed = l.trim().toLowerCase();
    return trimmed === '[identity]';
  });

  if (!hasIdentitySection) {
    result.error('File MUST contain an [identity] section with name and url fields');
  } else {
    // Check for name and url within [identity]
    let inIdentity = false;
    let hasName = false;
    let hasUrl = false;
    for (const line of lines) {
      const trimmed = line.trim().toLowerCase();
      if (trimmed === '[identity]') { inIdentity = true; continue; }
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) { inIdentity = false; continue; }
      if (inIdentity) {
        if (trimmed.startsWith('name:')) hasName = true;
        if (trimmed.startsWith('url:')) hasUrl = true;
      }
    }
    if (!hasName) result.error('[identity] section MUST contain a "name:" field');
    if (!hasUrl) result.error('[identity] section MUST contain a "url:" field');
  }

  // MUST contain a [permissions] section with at least one item
  const hasPermissions = lines.some(l => l.trim().toLowerCase() === '[permissions]');
  if (!hasPermissions) {
    result.error('File MUST contain a [permissions] section');
  } else {
    let inPermissions = false;
    let permCount = 0;
    for (const line of lines) {
      const trimmed = line.trim().toLowerCase();
      if (trimmed === '[permissions]') { inPermissions = true; continue; }
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) { inPermissions = false; continue; }
      if (inPermissions && line.trim().startsWith('- ')) permCount++;
    }
    if (permCount === 0) result.error('[permissions] section MUST contain at least one item');
  }

  // MUST contain a [restrictions] section with at least one item
  const hasRestrictions = lines.some(l => l.trim().toLowerCase() === '[restrictions]');
  if (!hasRestrictions) {
    result.error('File MUST contain a [restrictions] section');
  } else {
    let inRestrictions = false;
    let restCount = 0;
    for (const line of lines) {
      const trimmed = line.trim().toLowerCase();
      if (trimmed === '[restrictions]') { inRestrictions = true; continue; }
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) { inRestrictions = false; continue; }
      if (inRestrictions && line.trim().startsWith('- ')) restCount++;
    }
    if (restCount === 0) result.error('[restrictions] section MUST contain at least one item');
  }
}

function validateBrandTxt(content, result) {
  const lines = content.split('\n');

  if (content.trim().length === 0) {
    result.error('File is empty');
    return;
  }

  // Helper: count non-empty, non-comment lines within a [section]
  function sectionContentCount(sectionName) {
    let inSection = false;
    let count = 0;
    for (const line of lines) {
      const trimmed = line.trim().toLowerCase();
      if (trimmed === `[${sectionName}]`) { inSection = true; continue; }
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) { inSection = false; continue; }
      if (inSection && line.trim().length > 0 && !line.trim().startsWith('#')) {
        count++;
      }
    }
    return count;
  }

  // MUST contain [official-names] with at least one entry
  const hasOfficialNames = lines.some(l => l.trim().toLowerCase() === '[official-names]');
  if (!hasOfficialNames) {
    result.error('File MUST contain an [official-names] section');
  } else if (sectionContentCount('official-names') === 0) {
    result.error('[official-names] section MUST contain at least one name');
  }

  // MUST contain [incorrect-names] with at least one entry
  const hasIncorrectNames = lines.some(l => l.trim().toLowerCase() === '[incorrect-names]');
  if (!hasIncorrectNames) {
    result.error('File MUST contain an [incorrect-names] section');
  } else if (sectionContentCount('incorrect-names') === 0) {
    result.error('[incorrect-names] section MUST contain at least one entry');
  }

  // MUST contain [naming-rules] with at least one rule
  const hasNamingRules = lines.some(l => l.trim().toLowerCase() === '[naming-rules]');
  if (!hasNamingRules) {
    result.error('File MUST contain a [naming-rules] section');
  } else if (sectionContentCount('naming-rules') === 0) {
    result.error('[naming-rules] section MUST contain at least one rule');
  }
}

function validateFaqAiTxt(content, result) {
  const lines = content.split('\n');

  if (content.trim().length === 0) {
    result.error('File is empty');
    return;
  }

  // Find all Q: and A: lines with their line numbers
  const questions = [];
  const answers = [];

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith('Q:') || trimmed.startsWith('**Q:')) {
      questions.push(i + 1);
    }
    if (trimmed.startsWith('A:') || trimmed.startsWith('**A:')) {
      answers.push(i + 1);
    }
  }

  if (questions.length === 0) {
    result.error('File MUST contain at least one question (Q: prefix)');
    return;
  }

  // Check each Q: has a following A: before the next Q:
  for (let q = 0; q < questions.length; q++) {
    const qLine = questions[q];
    const nextQLine = questions[q + 1] || Infinity;
    const hasMatchingAnswer = answers.some(aLine => aLine > qLine && aLine < nextQLine);
    if (!hasMatchingAnswer) {
      result.error(`Question at line ${qLine} has no corresponding answer (A:)`, qLine);
    }
  }

  // SHOULD have sections
  const hasSections = lines.some(l => {
    const t = l.trim();
    return (t.startsWith('[') && t.endsWith(']') && !t.startsWith('[//')) ||
           t.startsWith('## ') || t.startsWith('# ');
  });

  if (!hasSections) {
    result.warn('File SHOULD organise FAQs into sections using headings');
  }
}

function validateDeveloperAiTxt(content, result) {
  if (content.trim().length === 0) {
    result.error('File is empty');
    return;
  }

  const lower = content.toLowerCase();

  // SHOULD contain technical information
  const hasTechnical = lower.includes('api') ||
                       lower.includes('stack') ||
                       lower.includes('framework') ||
                       lower.includes('language') ||
                       lower.includes('architecture') ||
                       lower.includes('endpoint') ||
                       lower.includes('technical') ||
                       lower.includes('developer');

  if (!hasTechnical) {
    result.warn('File SHOULD contain technical context (APIs, stack, architecture)');
  }
}

function validateRobotsAiTxt(content, result) {
  if (content.trim().length === 0) {
    result.error('File is empty');
    return;
  }

  const lines = content.split('\n');
  const lower = content.toLowerCase();

  // SHOULD reference specific AI crawlers or general policy
  const hasCrawlerRef = lower.includes('crawler') ||
                        lower.includes('bot') ||
                        lower.includes('agent') ||
                        lower.includes('gptbot') ||
                        lower.includes('claudebot') ||
                        lower.includes('googlebot') ||
                        lower.includes('allow') ||
                        lower.includes('disallow') ||
                        lower.includes('block');

  if (!hasCrawlerRef) {
    result.warn('File SHOULD reference AI crawlers or define access policies');
  }
}

// ---------------------------------------------------------------------------
// Validators — JSON files
// ---------------------------------------------------------------------------

/**
 * Lightweight JSON Schema validator (subset of JSON Schema 2020-12).
 * Supports: type, required, properties, items, enum, const, format,
 * minLength, minItems, pattern, $ref, $defs, additionalProperties.
 */
function validateJsonSchema(data, schema, rootSchema, path = '') {
  const errors = [];

  if (!schema || typeof schema !== 'object') return errors;

  // oneOf: at least one subschema must validate
  if (schema.oneOf) {
    const valid = schema.oneOf.some(sub => {
      const subErrors = validateJsonSchema(data, sub, rootSchema, path);
      return subErrors.length === 0;
    });
    if (!valid) {
      errors.push({ path: path || '(root)', message: `Value does not match any oneOf schema` });
    }
    return errors;
  }

  // Resolve $ref
  if (schema.$ref) {
    const refPath = schema.$ref.replace('#/$defs/', '');
    const resolved = rootSchema.$defs?.[refPath];
    if (resolved) {
      return validateJsonSchema(data, resolved, rootSchema, path);
    }
    errors.push({ path, message: `Unresolved $ref: ${schema.$ref}` });
    return errors;
  }

  // type check
  if (schema.type) {
    const actualType = Array.isArray(data) ? 'array' : typeof data;
    if (schema.type === 'integer') {
      if (typeof data !== 'number' || !Number.isInteger(data)) {
        errors.push({ path: path || '(root)', message: `Expected integer, got ${actualType}` });
        return errors;
      }
    } else if (actualType !== schema.type) {
      errors.push({ path: path || '(root)', message: `Expected ${schema.type}, got ${actualType}` });
      return errors;
    }
  }

  // const
  if (schema.const !== undefined && data !== schema.const) {
    errors.push({ path: path || '(root)', message: `Expected constant "${schema.const}", got "${data}"` });
  }

  // enum
  if (schema.enum && !schema.enum.includes(data)) {
    errors.push({ path: path || '(root)', message: `Value "${data}" not in enum [${schema.enum.join(', ')}]` });
  }

  // minLength (strings)
  if (typeof data === 'string' && schema.minLength !== undefined && data.length < schema.minLength) {
    errors.push({ path: path || '(root)', message: `String length ${data.length} < minLength ${schema.minLength}` });
  }

  // pattern (strings)
  if (typeof data === 'string' && schema.pattern) {
    if (!new RegExp(schema.pattern).test(data)) {
      errors.push({ path: path || '(root)', message: `String does not match pattern "${schema.pattern}"` });
    }
  }

  // Object validation
  if (schema.type === 'object' && typeof data === 'object' && !Array.isArray(data)) {
    // required
    if (schema.required) {
      for (const key of schema.required) {
        if (data[key] === undefined) {
          errors.push({ path: path ? `${path}.${key}` : key, message: `Required property "${key}" is missing` });
        }
      }
    }

    // properties
    if (schema.properties) {
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        if (data[key] !== undefined) {
          errors.push(...validateJsonSchema(data[key], propSchema, rootSchema, path ? `${path}.${key}` : key));
        }
      }
    }

    // additionalProperties
    if (schema.additionalProperties === false && schema.properties) {
      const allowed = new Set(Object.keys(schema.properties));
      for (const key of Object.keys(data)) {
        if (!allowed.has(key)) {
          errors.push({ path: path ? `${path}.${key}` : key, message: `Additional property "${key}" is not allowed` });
        }
      }
    }
  }

  // Array validation
  if (schema.type === 'array' && Array.isArray(data)) {
    if (schema.minItems !== undefined && data.length < schema.minItems) {
      errors.push({ path: path || '(root)', message: `Array length ${data.length} < minItems ${schema.minItems}` });
    }

    if (schema.items) {
      for (let i = 0; i < data.length; i++) {
        errors.push(...validateJsonSchema(data[i], schema.items, rootSchema, `${path}[${i}]`));
      }
    }
  }

  return errors;
}

function validateAiJson(content, result, schemaDir) {
  let data;
  try {
    data = JSON.parse(content);
  } catch (e) {
    result.error(`Invalid JSON: ${e.message}`);
    return;
  }

  if (typeof data !== 'object' || Array.isArray(data)) {
    result.error('Root value MUST be a JSON object');
    return;
  }

  // Try JSON Schema validation
  const schemaPath = join(schemaDir, 'ai-json.schema.json');
  if (existsSync(schemaPath)) {
    try {
      const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));
      const schemaErrors = validateJsonSchema(data, schema, schema);
      for (const err of schemaErrors) {
        result.error(`Schema: ${err.path} — ${err.message}`);
      }
    } catch (e) {
      result.warn(`Could not load JSON Schema: ${e.message}`);
    }
  }

  // Structural checks (regardless of schema)
  if (!data.permissions) {
    result.error('Property "permissions" is REQUIRED');
  } else if (Array.isArray(data.permissions) && data.permissions.length === 0) {
    result.error('Property "permissions" MUST NOT be empty');
  }

  if (!data.restrictions) {
    result.error('Property "restrictions" is REQUIRED');
  }

  if (!data.name) {
    result.error('Property "name" is REQUIRED');
  }

  if (!data.url) {
    result.error('Property "url" is REQUIRED');
  }
}

function validateIdentityJson(content, result, schemaDir) {
  let data;
  try {
    data = JSON.parse(content);
  } catch (e) {
    result.error(`Invalid JSON: ${e.message}`);
    return;
  }

  if (typeof data !== 'object' || Array.isArray(data)) {
    result.error('Root value MUST be a JSON object');
    return;
  }

  // Try JSON Schema validation
  const schemaPath = join(schemaDir, 'identity-json.schema.json');
  if (existsSync(schemaPath)) {
    try {
      const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));
      const schemaErrors = validateJsonSchema(data, schema, schema);
      for (const err of schemaErrors) {
        result.error(`Schema: ${err.path} — ${err.message}`);
      }
    } catch (e) {
      result.warn(`Could not load JSON Schema: ${e.message}`);
    }
  }

  // Structural checks
  if (!data.name) {
    result.error('Property "name" is REQUIRED');
  }

  if (!data.url) {
    result.error('Property "url" is REQUIRED');
  }

  if (!data.type) {
    result.error('Property "type" is REQUIRED');
  }

  if (!data.description) {
    result.error('Property "description" is REQUIRED');
  }
}

// ---------------------------------------------------------------------------
// Dispatcher
// ---------------------------------------------------------------------------

function detectType(filename) {
  const base = basename(filename);

  // Direct match (e.g., "llms.txt")
  const entry = FILE_TYPES[base];
  if (entry) return entry.type;

  // Test vector naming: "minimal-llms.txt", "full-llms.txt", "missing-h1-llms.txt"
  // Sort by name length descending to match longer names first (faq-ai.txt before ai.txt)
  const sortedEntries = Object.entries(FILE_TYPES).sort((a, b) => b[0].length - a[0].length);

  for (const [knownName, meta] of sortedEntries) {
    // Match patterns like: *-llms.txt, *-ai.txt, *-faq-ai.txt, etc.
    if (base.endsWith(`-${knownName}`) || base.includes(knownName)) {
      return meta.type;
    }
  }

  return null;
}

function validate(filePath, typeOverride, schemaDir) {
  const content = readFileSync(filePath, 'utf-8');
  const type = typeOverride || detectType(filePath);

  if (!type) {
    const result = new ValidationResult(filePath, 'unknown');
    result.error(`Cannot detect file type from filename "${basename(filePath)}". Use --type flag.`);
    return result;
  }

  const result = new ValidationResult(filePath, type);

  switch (type) {
    case 'llms-txt':        validateLlmsTxt(content, result); break;
    case 'llm-txt':         validateLlmTxt(content, result); break;
    case 'llms-html':       validateLlmsHtml(content, result); break;
    case 'ai-txt':          validateAiTxt(content, result); break;
    case 'ai-json':         validateAiJson(content, result, schemaDir); break;
    case 'identity-json':   validateIdentityJson(content, result, schemaDir); break;
    case 'brand-txt':       validateBrandTxt(content, result); break;
    case 'faq-ai-txt':      validateFaqAiTxt(content, result); break;
    case 'developer-ai-txt':validateDeveloperAiTxt(content, result); break;
    case 'robots-ai-txt':   validateRobotsAiTxt(content, result); break;
    default:
      result.error(`Unknown file type: ${type}`);
  }

  return result;
}

// ---------------------------------------------------------------------------
// Directory scanning
// ---------------------------------------------------------------------------

function validateDirectory(dirPath, schemaDir) {
  const results = [];
  const knownFiles = Object.keys(FILE_TYPES);

  for (const filename of knownFiles) {
    const filePath = join(dirPath, filename);
    if (existsSync(filePath)) {
      results.push(validate(filePath, null, schemaDir));
    }
  }

  if (results.length === 0) {
    console.log(`No AI Discovery Files found in ${dirPath}`);
    console.log(`Looked for: ${knownFiles.join(', ')}`);
  }

  return results;
}

// ---------------------------------------------------------------------------
// Cross-file validation
// ---------------------------------------------------------------------------

function crossValidate(results) {
  const crossResult = new ValidationResult('(cross-file)', 'cross-validation');
  const fileMap = new Map();

  for (const r of results) {
    fileMap.set(r.type, r);
  }

  // Essential tier: llms.txt + ai.txt
  if (!fileMap.has('llms-txt')) {
    crossResult.warn('Essential tier: llms.txt (ADF-001) is missing');
  }
  if (!fileMap.has('ai-txt')) {
    crossResult.warn('Essential tier: ai.txt (ADF-004) is missing');
  }

  // If ai.txt and ai.json both exist, they should not contradict
  if (fileMap.has('ai-txt') && fileMap.has('ai-json')) {
    crossResult.warn('Both ai.txt and ai.json present — ensure permissions are consistent (manual check required)');
  }

  // If llms.txt and identity.json both exist, names should match
  // (This is advisory — we cannot reliably extract the name from llms.txt programmatically)
  if (fileMap.has('llms-txt') && fileMap.has('identity-json')) {
    crossResult.warn('Both llms.txt and identity.json present — ensure organisation name is consistent (manual check required)');
  }

  return crossResult;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function printUsage() {
  console.log(`
AI Discovery Files Validator v1.0.0

Usage:
  node validate.mjs <file>                    Validate a single file
  node validate.mjs <file> --type <type>      Validate with explicit type
  node validate.mjs --dir <directory>          Validate all ADF files in a directory
  node validate.mjs --test-vectors <path>      Run against test vectors

Options:
  --type <type>        Override file type detection
  --schema-dir <path>  Path to JSON Schemas (default: ./schemas or script directory)
  --dir <directory>    Scan directory for ADF files
  --test-vectors <p>   Validate test vectors (expects valid/ and invalid/ subdirs)
  --quiet              Only show errors, not warnings
  --help               Show this help message

File Types:
  llms-txt, llm-txt, llms-html, ai-txt, ai-json,
  identity-json, brand-txt, faq-ai-txt, developer-ai-txt, robots-ai-txt

Examples:
  node validate.mjs /var/www/llms.txt
  node validate.mjs site/ai.json --type ai-json
  node validate.mjs --dir /var/www/html
  node validate.mjs --test-vectors ./test-vectors
`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.length === 0) {
    printUsage();
    process.exit(0);
  }

  const quiet = args.includes('--quiet');
  let schemaDir = __dirname;
  let typeOverride = null;

  // Parse --schema-dir
  const schemaDirIdx = args.indexOf('--schema-dir');
  if (schemaDirIdx !== -1 && args[schemaDirIdx + 1]) {
    schemaDir = resolve(args[schemaDirIdx + 1]);
  }

  // Parse --type
  const typeIdx = args.indexOf('--type');
  if (typeIdx !== -1 && args[typeIdx + 1]) {
    typeOverride = args[typeIdx + 1];
  }

  // Mode: directory scan
  const dirIdx = args.indexOf('--dir');
  if (dirIdx !== -1 && args[dirIdx + 1]) {
    const dirPath = resolve(args[dirIdx + 1]);
    const results = validateDirectory(dirPath, schemaDir);

    if (results.length > 0) {
      const crossResult = crossValidate(results);
      results.push(crossResult);
    }

    let hasError = false;
    for (const r of results) {
      if (!quiet || !r.valid) {
        console.log(r.toString());
        console.log();
      }
      if (!r.valid) hasError = true;
    }

    const fileResults = results.filter(r => r.type !== 'cross-validation');
    const passed = fileResults.filter(r => r.valid).length;
    console.log(`Results: ${passed}/${fileResults.length} files passed`);
    process.exit(hasError ? 1 : 0);
  }

  // Mode: test vectors
  const tvIdx = args.indexOf('--test-vectors');
  if (tvIdx !== -1 && args[tvIdx + 1]) {
    const tvPath = resolve(args[tvIdx + 1]);
    const validDir = join(tvPath, 'valid');
    const invalidDir = join(tvPath, 'invalid');
    let allPassed = true;

    console.log('=== Valid Test Vectors (should PASS) ===\n');
    if (existsSync(validDir)) {
      for (const file of readdirSync(validDir)) {
        if (file.startsWith('.') || file.toLowerCase() === 'readme.md') continue;
        const filePath = join(validDir, file);
        const r = validate(filePath, null, schemaDir);
        console.log(r.toString());
        if (!r.valid) {
          console.log('  ^ UNEXPECTED FAILURE');
          allPassed = false;
        }
        console.log();
      }
    }

    console.log('=== Invalid Test Vectors (should FAIL) ===\n');
    if (existsSync(invalidDir)) {
      for (const file of readdirSync(invalidDir)) {
        if (file.startsWith('.') || file.toLowerCase() === 'readme.md') continue;
        const filePath = join(invalidDir, file);
        const r = validate(filePath, null, schemaDir);
        console.log(r.toString());
        if (r.valid) {
          console.log('  ^ UNEXPECTED PASS — this file should have failed validation');
          allPassed = false;
        }
        console.log();
      }
    }

    process.exit(allPassed ? 0 : 1);
  }

  // Mode: single file
  const filePath = resolve(args.find(a => !a.startsWith('--') && args.indexOf(a) !== typeIdx + 1 && args.indexOf(a) !== schemaDirIdx + 1) || '');

  if (!filePath || !existsSync(filePath)) {
    console.error(`File not found: ${filePath || '(none specified)'}`);
    process.exit(1);
  }

  const result = validate(filePath, typeOverride, schemaDir);

  if (!quiet || !result.valid) {
    console.log(result.toString());
  }

  process.exit(result.valid ? 0 : 1);
}

main();
