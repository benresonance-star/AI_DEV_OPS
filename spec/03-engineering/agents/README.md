# Agent & Skills Registry

**Document ID:** PLASMA-AGENTS-001  
**Status:** Canonical registry scaffold

This registry will define stable engineering roles independently of whichever model or coding provider implements them.

## Rule

**Roles are stable. Models are replaceable.**

Do not define an agent as “the Grok agent” or “the Cursor agent” when the actual responsibility is Builder, Verifier, Geometry Specialist, or another durable role.

## Required agent definition

Every persistent agent entry must contain:

- stable agent ID;
- role name;
- mission;
- operating behaviour / functional personality;
- non-goals;
- canonical sources it may treat as authority;
- skills;
- tools;
- read permissions;
- write permissions;
- input contract;
- output contract;
- escalation triggers;
- verification relationship;
- preferred implementation providers, if any, marked replaceable.

## Initial registry to define

- Orchestrator
- Selector
- Builder
- Verifier
- Geometry Specialist
- Constraints Specialist
- Rendering / Interaction Specialist
- Analysis Specialist
- Testing / Test-World Specialist
- Performance Specialist
- Documentation / Traceability Specialist

Only create a specialist role when repeated capability work justifies a stable boundary. Avoid an agent-per-domain explosion.

## Implementation shim

The orchestrator delegates to roles through the provider-neutral capability interface defined in `PLASMA-ENG-CONSTITUTION-001`.

A provider may supply one or several roles. A role may switch providers without changing its canonical definition.