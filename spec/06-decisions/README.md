# 06 · Decisions

**Document ID:** PLASMA-ADR-001  
**Status:** Canonical Architectural Decision Record registry

This section owns explicit architectural decisions and amendments. It exists so foundational changes are deliberate, traceable, and do not emerge accidentally from implementation work.

## When an ADR is required

Create an ADR when a decision materially affects:

- north-star invariants;
- canonical world primitives;
- persistence or canonical storage;
- graphlet identity/composition;
- exact geometry authority;
- cross-language boundaries;
- public operation contracts;
- revision/branch semantics;
- security boundaries;
- major dependencies;
- distributed execution strategy;
- significant irreversible migration.

Local and reversible implementation details normally do not require ADRs.

## ADR format

```yaml
adr_id: ADR-XXXX
status: proposed|accepted|rejected|superseded
title: ...
date: YYYY-MM-DD
problem: ...
forcing_evidence: []
pattern_refs: []
architecture_refs: []
options_considered: []
decision: ...
complexity_added: ...
migration_impact: ...
rollback_strategy: ...
affected_canonical_ids: []
approved_by: ...
supersedes: []
```

## Rule

An ADR records **why** the architecture changed. After acceptance, the actual canonical definitions must be updated in their owning documents. The ADR does not become a second copy of those definitions.

Agents may propose ADRs. They may not unilaterally ratify constitutional or architectural changes that require a human gate.