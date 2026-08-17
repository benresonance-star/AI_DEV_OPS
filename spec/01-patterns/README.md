# 01 · Patterns

**Document ID:** PLASMA-PATTERNS-001  
**Status:** Canonical pattern registry and traceability section

Patterns describe recurring rules for how Plasma should behave. They are not implementation tasks and should not be duplicated as alternative architecture specifications.

## Pattern families

- **1 · World** — identity, truth, graphlets, representations, spatial state.
- **2 · Change** — proposals, validation, dependencies, operations, failure containment.
- **3 · Scale** — progressive resolution, cheap-before-expensive evaluation, coarse reject/fine confirm.
- **4 · Intelligence** — question-driven refinement, branching, capability frontier, human escalation.
- **5 · Development / RAD** — capability contracts, vertical slices, verification, bounded repair, frontier and architecture gates.

## Current presentation

The hosted Pattern Book at repository root is the current human-readable projection of these patterns. Pattern numbers are stable references such as `1.5`, `1.6`, `3.1`, or `5.3`.

Until the pattern content is moved into a dedicated machine-readable registry, each pattern must remain defined only once in the Pattern Book source. Do not create a second prose definition here.

## Traceability rule

Architecture contracts, capabilities, agent roles, tests, and ADRs should reference the relevant pattern IDs rather than restating the pattern.

Example:

`CAP-P012 → PATTERN-2.2, PATTERN-3.1 → ARCH-DEPENDENCY-001 → TEST-TW-004`

## Planned normalization

A future pass may move pattern records into a canonical structured source such as `patterns.yaml` or `patterns.json`, with the web Pattern Book rendering directly from that registry. When that occurs, this document remains the registry entry point rather than a competing copy.