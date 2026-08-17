# Plasma Master Specification

**Document ID:** PLASMA-MASTER-001  
**Status:** Canonical navigation root  
**Rule:** Define once. Reference everywhere.

This directory is the canonical specification tree for Plasma. It exists to keep product intent, architecture, engineering, capabilities, verification, and decisions connected without creating duplicate versions of the same concept.

## Constitutional rule

Every important Plasma concept has one authoritative definition and one stable identifier. Other documents may reference that definition, but must not silently create a second authoritative description.

The website at the repository root is a **presentation projection** of the specification. It is useful for humans, but the `/spec` tree is the place where canonical engineering documents, registries, contracts, and traceability live.

## Specification structure

| Section | Purpose | Canonical location |
|---|---|---|
| 00 · Foundations | Authority, identity, terminology, invariants | `00-foundations/` |
| 01 · Patterns | Pattern registry and traceability to the Pattern Book | `01-patterns/` |
| 02 · Architecture | Subsystems, public contracts, data structures, lifecycle | `02-architecture/` |
| 03 · Engineering | Orchestrator, agents, RAD operating model, implementation shim | `03-engineering/` |
| 04 · Capabilities | Living capability catalogue and verified frontier | `04-capabilities/` |
| 05 · Verification | What counts as proof; test worlds and evidence contracts | `05-verification/` |
| 06 · Decisions | Architectural Decision Records and amendments | `06-decisions/` |

## Traceability chain

The intended traceability path is:

`FOUNDATION → PATTERN → ARCHITECTURE CONTRACT → AGENT/TOOL ROLE → CAPABILITY → TEST → EVIDENCE → DECISION`

A later item references earlier items by stable ID. It does not restate them as a competing source of truth.

## Editing rules

1. Find the authoritative definition before editing.
2. If one exists, modify it in place and update references.
3. If none exists, create one stable ID and register it in `manifest.yaml`.
4. Summaries and diagrams must be marked non-authoritative unless they are themselves the registered canonical source.
5. If two canonical sources appear to conflict, stop and resolve the conflict explicitly.
6. Architecture changes require the escalation rules in the Orchestrator Constitution.

## Runtime / presentation files

`index.html`, `patternbook.css`, `pattern-app.js`, and `pattern-data.js` remain at the repository root because GitHub Pages currently serves the Pattern Book from there. They should be treated as the current presentation layer, not as permission to create parallel specifications at the root.

See `manifest.yaml` for the machine-readable authority map.