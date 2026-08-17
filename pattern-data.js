export default [
  {
    "n": "1.1",
    "f": "World",
    "t": "Authoritative State / Derived Views",
    "p": "Representations drift when each behaves as an independent truth.",
    "r": "Every piece of information has an owner; everything else is a projection, cached derivation or proposal.",
    "d": "flowchart TD\n    E[\"World Entity\"] --> S[\"Semantic facts<br/>World graph\"]\n    E --> G[\"Exact shape<br/>OCC BRep\"]\n    E --> D[\"Display<br/>Derived mesh\"]\n    E --> A[\"Analysis<br/>Derived claim\"]\n    S -. owns meaning .-> E\n    G -. owns exact geometry .-> E\n    D -->|derived from| G\n    A -->|reads| S\n    A -->|reads| G"
  },
  {
    "n": "1.2",
    "f": "World",
    "t": "Evidence → Claim → Belief",
    "p": "Measured reality, simulations and AI interpretations have different certainty and provenance.",
    "r": "Observation is evidence, not state. Evidence creates claims with provenance and confidence before affecting world belief.",
    "d": "flowchart TD\n    E[\"Evidence<br/>scan · survey · sensor · simulation\"] --> I[\"Interpretation\"]\n    I --> C[\"Claim\"]\n    C --> P[\"Attach provenance<br/>method · source · time\"]\n    P --> Q{\"Confidence / conflict?\"}\n    Q -->|resolvable| B[\"Accepted world belief\"]\n    Q -->|conflict remains| U[\"Unresolved claim set\"]\n    U --> R[\"Refine / observe again\"]\n    R --> E"
  },
  {
    "n": "1.3",
    "f": "World",
    "t": "Projection, Not Duplication",
    "p": "BIM, USD, Three.js, drawings and analysis models become unmanageable when they evolve independently.",
    "r": "External representations are projections of Plasma or typed proposals back into Plasma—not silent parallel truths.",
    "d": "flowchart TD\n    W[\"Plasma World\"] --> T[\"Three.js<br/>view projection\"]\n    W --> U[\"USD<br/>scene projection\"]\n    W --> A[\"Analysis<br/>solver projection\"]\n    W --> B[\"BIM / drawing<br/>projection\"]\n    X[\"External edit\"] --> P[\"Typed import proposal\"]\n    P --> V[\"Validate\"]\n    V --> W"
  },
  {
    "n": "1.4",
    "f": "World",
    "t": "Stable Identity / Replaceable Representation",
    "p": "Objects lose continuity when identity is tied to whichever geometric or visual form currently represents them.",
    "r": "Entity identity persists independently of whichever representation is currently used.",
    "d": "flowchart TD\n    I[\"Stable Entity ID<br/>Tree_281\"] --> P[\"Point proxy\"]\n    I --> C[\"Canopy envelope\"]\n    I --> M[\"Mesh\"]\n    I --> S[\"Splats\"]\n    I --> R[\"Procedural model\"]\n    P -. replaceable .-> M\n    M -. replaceable .-> R\n    S -. observation .-> I"
  },
  {
    "n": "2.1",
    "f": "Change",
    "t": "Propose → Validate → Commit",
    "p": "Humans, agents, imports and solvers all need to change the world without corrupting canonical state.",
    "r": "Nothing writes directly to canonical state. Every change first exists as a candidate patch.",
    "d": "flowchart TD\n    H[\"Human / Agent / Solver / Import\"] --> P[\"Proposal\"]\n    P --> C[\"Candidate patch\"]\n    C --> V{\"Validate\"}\n    V -->|fail| X[\"Reject<br/>state unchanged\"]\n    V -->|pass| M[\"Commit\"]\n    M --> R[\"New immutable revision\"]\n    R --> D[\"Invalidate dependents\"]"
  },
  {
    "n": "2.2",
    "f": "Change",
    "t": "Dependency-Driven Invalidation",
    "p": "World changes make some results stale, but recomputing everything destroys interactivity.",
    "r": "Derived results declare what they read and write; only downstream dependencies become dirty.",
    "d": "flowchart TD\n    F[\"Fact changes\"] --> D[\"Dependency edges\"]\n    D --> A[\"Affected derived values\"]\n    A --> M[\"Mark DIRTY\"]\n    M --> Q{\"Requested / relevant?\"}\n    Q -->|yes| R[\"Recompute lazily\"]\n    Q -->|no| K[\"Remain dirty<br/>no work yet\"]\n    R --> C[\"Mark CLEAN\"]"
  },
  {
    "n": "2.3",
    "f": "Change",
    "t": "Typed Operation Contract",
    "p": "Plasma needs to grow rapidly across languages, solvers and experimental implementations.",
    "r": "Capabilities are stable contracts; implementations are replaceable.",
    "d": "flowchart TD\n    I[\"Typed inputs\"] --> C[\"Operation contract<br/>READS · WRITES · guarantees\"]\n    C --> X{\"Implementation\"}\n    X --> C1[\"C++ / OCC\"]\n    X --> P1[\"Python\"]\n    X --> T1[\"TypeScript\"]\n    X --> S1[\"Solver / GPU / LLM adapter\"]\n    C1 --> O[\"Typed outputs\"]\n    P1 --> O\n    T1 --> O\n    S1 --> O\n    O --> V[\"Validation\"]\n    V --> W[\"World patch\"]"
  },
  {
    "n": "2.4",
    "f": "Change",
    "t": "Local Failure Containment",
    "p": "Plasma will combine heterogeneous and occasionally unreliable tools.",
    "r": "An operator failure invalidates only itself and its dependents; unrelated world state remains usable.",
    "d": "flowchart TD\n    O[\"Operator runs\"] --> Q{\"Succeeded?\"}\n    Q -->|yes| V[\"Valid result\"]\n    Q -->|no| F[\"Result = FAILED\"]\n    F --> D[\"Direct dependents<br/>UNAVAILABLE / DIRTY\"]\n    F --> U[\"Unrelated state\"]\n    U --> K[\"Remains valid and usable\"]\n    D --> R[\"Retry / alternate operator / escalate\"]"
  },
  {
    "n": "3.1",
    "f": "Scale",
    "t": "Progressive World Resolution",
    "p": "Large worlds cannot become exact after every interaction without destroying responsiveness.",
    "r": "Resolve only what is needed, where it is needed, and as accurately as the current action or question requires.",
    "d": "flowchart TD\n    A[\"User action\"] --> P[\"Immediate proxy response\"]\n    P --> D[\"Mark affected state / tiles DIRTY\"]\n    D --> V[\"Visible + decision-relevant first\"]\n    V --> C[\"Coarse update\"]\n    C --> R[\"Refined representation\"]\n    R --> E[\"Exact verification where required\"]\n    E --> B[\"Background analyses\"]\n    B -. later results .-> R"
  },
  {
    "n": "3.2",
    "f": "Scale",
    "t": "Cheap Test Before Expensive Test",
    "p": "Specialist simulation is wasted on worlds that already fail simple rules.",
    "r": "Order evaluation from cheapest, highest-elimination tests to expensive, high-fidelity tests.",
    "d": "flowchart TD\n    C[\"Candidate world\"] --> S{\"Scalar / bounding checks\"}\n    S -->|fail| X[\"Reject early\"]\n    S -->|pass| G{\"Coarse geometry\"}\n    G -->|fail| X\n    G -->|pass| E{\"Exact geometry / rules\"}\n    E -->|fail| X\n    E -->|pass| P[\"Specialist simulation\"]\n    P --> R[\"High-confidence result\"]"
  },
  {
    "n": "3.3",
    "f": "Scale",
    "t": "Coarse Reject / Fine Confirm",
    "p": "Large design populations become computationally impossible if every candidate receives maximum fidelity.",
    "r": "Use cheap approximations to eliminate weak candidates; spend fidelity only on survivors.",
    "d": "flowchart TD\n    A[\"10,000 candidate worlds\"] --> B[\"Fast approximate tests<br/>10,000 → 1,800\"]\n    B --> C[\"Medium analysis<br/>1,800 → 300\"]\n    C --> D[\"Detailed analysis<br/>300 → 30\"]\n    D --> E[\"Exact / specialist simulation<br/>30 → 5\"]\n    E --> F[\"Preserve high-value survivors\"]"
  },
  {
    "n": "4.1",
    "f": "Intelligence",
    "t": "Question-Driven Refinement",
    "p": "A world model can become infinitely detailed without becoming more useful.",
    "r": "Refinement is driven by the decision or question being answered, not by a desire for total model completeness.",
    "d": "flowchart TD\n    Q[\"Decision / question\"] --> F[\"Required facts\"]\n    F --> U[\"Find unresolved dependencies\"]\n    U --> O[\"Candidate refinement operations\"]\n    O --> P[\"Prioritise by relevance + cost\"]\n    P --> R[\"Resolve only required state\"]\n    R --> A{\"Question answered?\"}\n    A -->|no| U\n    A -->|yes| D[\"Return decision evidence\"]"
  },
  {
    "n": "4.2",
    "f": "Intelligence",
    "t": "Fork → Evaluate → Select",
    "p": "Generative exploration should not repeatedly mutate and damage one canonical world.",
    "r": "Alternatives branch from a common world, are evaluated independently, and selected results advance a lineage.",
    "d": "flowchart TD\n    W[\"Common world A\"] --> A1[\"Fork A1\"]\n    W --> A2[\"Fork A2\"]\n    W --> A3[\"Fork A3\"]\n    A1 --> E1[\"Evaluate\"]\n    A2 --> E2[\"Evaluate\"]\n    A3 --> E3[\"Evaluate\"]\n    E1 --> S{\"Compare / select\"}\n    E2 --> S\n    E3 --> S\n    S --> P[\"Promote useful world(s)\"]\n    S --> R[\"Reject weak branches\"]"
  },
  {
    "n": "4.3",
    "f": "Intelligence",
    "t": "Capability Frontier",
    "p": "Agentic RAD can drift into speculative infrastructure instead of demonstrable product progress.",
    "r": "Develop the smallest valuable capability immediately beyond the verified frontier.",
    "d": "flowchart TD\n    V[\"Verified capability set\"] --> G[\"Identify smallest valuable gap\"]\n    G --> B[\"Build minimal vertical slice\"]\n    B --> T[\"Deterministic tests\"]\n    T --> Q{\"Verified?\"}\n    Q -->|no| R[\"Diagnose / retry / revert\"]\n    R --> B\n    Q -->|yes| C[\"Commit + capability ledger\"]\n    C --> V"
  },
  {
    "n": "4.4",
    "f": "Intelligence",
    "t": "Human Attention as a Scarce Resource",
    "p": "Autonomous systems can overwhelm the architect with decisions, warnings and raw failures.",
    "r": "Escalate only when human judgment changes the outcome; package the decision with evidence and consequences.",
    "d": "flowchart TD\n    I[\"Issue / ambiguity\"] --> S{\"Can Plasma resolve it?\"}\n    S -->|yes| A[\"Resolve autonomously\"]\n    S -->|no| M{\"Is human judgment material?\"}\n    M -->|no| D[\"Defer / record uncertainty\"]\n    M -->|yes| P[\"Package decision<br/>options · evidence · consequences\"]\n    P --> H[\"Human decision\"]\n    H --> C[\"Commit direction\"]\n    C --> A"
  }
];
