# 04 · Capabilities

**Document ID:** PLASMA-CAPABILITIES-001  
**Status:** Canonical capability catalogue scaffold

This section owns the living definition of what Plasma can demonstrably do and what sits immediately beyond the verified frontier.

## Unit of progress

A capability is an observable behaviour, not a component or implementation task.

Good:

> Moving a building gives immediate provisional feedback, then exact geometry verification and an updated setback result.

Weak:

> Build geometry pipeline.

## Capability states

- PROPOSED
- READY
- IN_PROGRESS
- BLOCKED
- VERIFYING
- VERIFIED
- DEPRECATED

Only `PLASMA-VERIFY-001` evidence can move a capability to VERIFIED.

## Minimum capability record

```yaml
capability_id: CAP-PXXX
name: Short observable capability
state: PROPOSED
value: Why this matters
pattern_refs: []
architecture_refs: []
inputs: []
outputs: []
preconditions: []
dependencies: []
invariants: []
acceptance_tests: []
test_worlds: []
allowed_scope: []
forbidden_scope: []
max_repair_attempts: 2
escalate_if: []
evidence_refs: []
```

## Frontier rule

The Selector chooses the **smallest valuable reachable gap** beyond VERIFIED capability state.

Capability definitions reference patterns and architecture contracts by ID. They must not redefine either.

## Initial capability sequence

The first catalogue should remain close to the smallest architectural feasibility loop:

1. site boundary becomes stable world state;
2. building envelope produces exact BRep and display mesh;
3. edit operation changes the envelope reproducibly;
4. setbacks and height are evaluated;
5. revision restores previous state;
6. dependencies invalidate only affected results;
7. a typed language instruction can propose one safe world operation.

These are candidate entries only until formal capability contracts and acceptance evidence are created.