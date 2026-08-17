# 03 · Engineering

**Document ID:** PLASMA-ENG-001  
**Status:** Canonical engineering operating-model section

This section defines how Plasma is built and evolved. It is separate from product architecture: architecture defines the system; engineering defines the process and agents that safely change it.

## Canonical documents

- `PLASMA-ENG-CONSTITUTION-001` — Orchestrator Constitution.
- `PLASMA-AGENTS-001` — Agent & Skills Registry.
- `PLASMA-CAPABILITIES-001` — capability contracts and verified frontier.
- `PLASMA-VERIFY-001` — verification and evidence rules.

## Engineering topology

The intended execution topology is:

`ORCHESTRATOR → CAPABILITY CONTRACT + CONTEXT MANIFEST → IMPLEMENTATION SHIM → BUILDER / SPECIALIST AGENTS → EVIDENCE BUNDLE → INDEPENDENT VERIFIER → COMMIT / REPAIR / ESCALATE`

Implementation providers such as Cursor, Grok, Codex, Claude, local CLI agents, or future systems are replaceable workers behind the shim. The engineering model must not be defined around a vendor or model name.

## Separation of responsibilities

- Orchestrator owns intent, sequencing, context and governance.
- Selector chooses the next smallest valuable reachable capability.
- Builder implements one bounded capability.
- Specialist agents supply narrow domain work.
- Verifier independently determines whether the capability became true.
- Humans approve architectural changes and other explicit gates.

## Rule

The engineering system must itself obey Plasma's core discipline:

**Propose → Execute → Verify → Commit.**

Do not place product architecture definitions here. Reference `PLASMA-ARCH-001` by stable ID.