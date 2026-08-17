# 00 · Foundations

**Document ID:** PLASMA-FOUNDATIONS-001  
**Status:** Canonical foundation registry

This section owns the rules that everything else depends on: authority, stable identity, terminology, and system invariants.

It should stay small and slow-changing.

## Foundation rules

- One concept has one authoritative definition and one stable identifier.
- References do not create alternative versions of the concept they reference.
- Proposals are not canonical state until validated and committed.
- Exact geometry is authoritative only for questions of exact geometry; other truths keep their own authority.
- LLMs and agents may interpret and propose, but do not become the owner of technical truth.
- Representations are replaceable; stable identity persists.
- Complexity must be earned by a real capability, correctness requirement, or measured bottleneck.

## Current canonical foundation sources

- The Plasma Pattern Book defines the current product north star and foundational world patterns.
- `PLASMA-ENG-CONSTITUTION-001` defines the development-system constitutional rules.
- Architectural decisions that intentionally amend a foundation must be recorded in `PLASMA-ADR-001` and then reflected back into the authoritative foundation source.

## What belongs here next

As the master specification matures, this section should contain canonical registries for:

- terminology and stable concept IDs;
- product north-star invariants;
- authority ownership by information type;
- canonical primitive definitions;
- amendment/version policy.

Do not copy full pattern, architecture, or agent definitions into this section. Reference their stable IDs instead.