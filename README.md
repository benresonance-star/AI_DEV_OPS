# Plasma

This branch hosts the Plasma Pattern Book and the canonical Plasma specification tree.

## Canonical source

Start at [`spec/README.md`](spec/README.md).

The governing rule is:

> **Define once. Reference everywhere.**

`spec/manifest.yaml` is the machine-readable authority map for canonical documents and projections.

## Repository structure

```text
/
├── index.html                 # GitHub Pages Pattern Book projection
├── patternbook.css            # presentation runtime
├── pattern-app.js             # presentation runtime
├── pattern-data.js            # current Pattern Book data/runtime source
└── spec/
    ├── README.md               # PLASMA-MASTER-001
    ├── manifest.yaml           # authority map
    ├── 00-foundations/
    ├── 01-patterns/
    ├── 02-architecture/
    ├── 03-engineering/
    │   ├── orchestrator-constitution.md
    │   └── agents/
    ├── 04-capabilities/
    ├── 05-verification/
    └── 06-decisions/
```

The website is a human-readable projection. Canonical engineering documents, contracts, registries and traceability belong under `/spec`.

## Current build-preparation priority

1. complete the Agent & Skills Registry;
2. turn the architecture scaffold into explicit subsystem and query contracts;
3. formalise the first capability catalogue and test worlds;
4. wire the orchestrator to the implementation shim and independent verifier.

Do not create competing copies of existing concepts in new documents. Reference their stable IDs.