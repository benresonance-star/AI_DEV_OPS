# 02 · Architecture

**Document ID:** PLASMA-ARCH-001  
**Status:** Canonical architecture specification scaffold

This section will convert Plasma's patterns into precise buildable contracts. It should define the system once at the level required for independent humans and agents to implement compatible parts.

## Required architecture contracts

The architecture specification should eventually define, by stable ID:

- canonical world primitives and schemas;
- world-state ownership and lifecycle;
- graphlet identity, composition and boundaries;
- operation contract and patch semantics;
- dependency graph and invalidation semantics;
- representation contract and authority metadata;
- spatial indexing/query pipeline;
- revision and branching semantics;
- constraint interface;
- projection/import boundaries;
- persistence interfaces;
- cross-language boundaries and IPC;
- error/failure states;
- performance and consistency guarantees.

## Required query lifecycle

A build-ready architecture should make one canonical path explicit:

`QUESTION → RESOLVE WORLD/GRAPHLETS → RESOLVE REPRESENTATIONS → SELECT AUTHORITY/RESOLUTION → EXECUTE OPERATION/SOLVER → VALIDATE → COMMIT OR RETURN EVIDENCE`

## Contract format

Each architecture entry should identify:

- stable contract ID;
- responsibility;
- canonical data types;
- inputs and outputs;
- invariants;
- lifecycle/state transitions;
- dependencies;
- failure semantics;
- performance expectations where material;
- patterns it implements;
- tests that prove it.

## Boundary rule

Architecture defines stable contracts and ownership. It must not prescribe replaceable implementation details unless the implementation itself is intentionally authoritative, such as OpenCascade owning exact BRep geometry in the current architecture.

Any material architectural amendment must follow `PLASMA-ADR-001` and the escalation gate in `PLASMA-ENG-CONSTITUTION-001`.