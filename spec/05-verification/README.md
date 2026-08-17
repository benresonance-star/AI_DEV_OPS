# 05 · Verification

**Document ID:** PLASMA-VERIFY-001  
**Status:** Canonical verification specification scaffold

This section defines what counts as proof that a capability became true without breaking verified behaviour.

## Verification principle

**Evidence outranks generator confidence.**

The builder may propose success. Only independent verification can establish it.

## Evidence hierarchy

Use the cheapest strong evidence appropriate to the capability:

1. compiler / type system;
2. deterministic unit and integration tests;
3. known test worlds;
4. exact geometry validity;
5. numerical tolerances and invariants;
6. constraint satisfaction;
7. regression tests;
8. visual regression;
9. performance benchmarks;
10. specialist simulation comparison;
11. human judgement where deterministic proof is unavailable.

## Evidence bundle

```yaml
capability_id: CAP-PXXX
candidate_ref: branch-or-worktree-or-commit
files_changed: []
commands_run: []
compile_result: pass|fail|not_applicable
tests: []
geometry_validation: []
constraint_validation: []
performance_evidence: []
visual_evidence: []
acceptance_criteria:
  - criterion: ...
    result: pass|fail
known_limitations: []
architecture_changes: []
unresolved_failures: []
verifier_result: pass|fail|escalate
```

## Test-world rule

Important world behaviour should be proven using tiny deterministic test worlds before large realistic projects are used as evidence.

Test worlds should eventually have stable IDs and known expected outputs, including tolerances where appropriate.

## Verifier rule

The Verifier does not repair the Builder's code. It returns evidence and one of:

- PASS
- FAIL
- ESCALATE

Changing acceptance tests to accommodate a failing implementation requires explicit evidence that the test or authoritative specification was wrong.