export type Soul = {
  id: string;
  name: string;
  species: string;
  deathTime: string;
  complexity: number;
  status: "Pending" | "In Review" | "Judged" | "Deferred";
  priority: "Low" | "Standard" | "High" | "Cosmic";
  realm?: string;
  portrait?: string;
  epoch: string;
  lifespan: string;
};

export const souls: Soul[] = [
  { id: "sol-001", name: "Aetherion of the Ninth Spiral", species: "Human", deathTime: "3 hrs ago", complexity: 87, status: "Pending", priority: "High", epoch: "Third Age", lifespan: "72 years" },
  { id: "sol-002", name: "Vaerissa Thorn", species: "Elarin", deathTime: "6 hrs ago", complexity: 94, status: "In Review", priority: "Cosmic", epoch: "Late Fourth Age", lifespan: "412 years" },
  { id: "sol-003", name: "Old Man Corvin", species: "Human", deathTime: "12 hrs ago", complexity: 34, status: "Pending", priority: "Low", epoch: "Third Age", lifespan: "88 years" },
  { id: "sol-004", name: "The Silent Weaver", species: "Umbral", deathTime: "1 day ago", complexity: 71, status: "In Review", priority: "Standard", epoch: "Undated", lifespan: "unknown" },
  { id: "sol-005", name: "Kaelen Marr", species: "Human", deathTime: "2 days ago", complexity: 58, status: "Judged", priority: "Standard", realm: "Realm of Restoration", epoch: "Third Age", lifespan: "41 years" },
  { id: "sol-006", name: "Ysolde of Ember Hollow", species: "Faelin", deathTime: "2 days ago", complexity: 82, status: "Pending", priority: "High", epoch: "Fourth Age", lifespan: "204 years" },
  { id: "sol-007", name: "Brother Ambrose", species: "Human", deathTime: "4 days ago", complexity: 45, status: "Judged", priority: "Low", realm: "Ascendant Gardens", epoch: "Third Age", lifespan: "63 years" },
  { id: "sol-008", name: "The Nameless Warden", species: "Golem", deathTime: "5 days ago", complexity: 22, status: "Deferred", priority: "Standard", epoch: "First Age", lifespan: "9,201 years" },
  { id: "sol-009", name: "Serah of the Bleeding Star", species: "Human", deathTime: "1 wk ago", complexity: 97, status: "Judged", priority: "Cosmic", realm: "The Long Silence", epoch: "Third Age", lifespan: "29 years" },
];

export type LifeMoment = { id: string; year: number; label: string; kind: "birth" | "childhood" | "youth" | "turning" | "death"; memory: string };

export const lifeMoments: LifeMoment[] = [
  { id: "m1", year: 0, label: "First Breath", kind: "birth", memory: "Born beneath a copper sun in the salt-marsh village of Iren. Mother weeping with relief." },
  { id: "m2", year: 7, label: "The Broken Loom", kind: "childhood", memory: "Shatters the family loom in a tantrum. Sees his mother work three nights to repair it in silence." },
  { id: "m3", year: 19, label: "The Oath Beneath the Oak", kind: "youth", memory: "Swears loyalty to Vaerissa. He believes he means it. He is uncertain." },
  { id: "m4", year: 34, label: "The Ledger of Iron", kind: "turning", memory: "Signs the forged deed. Tells himself it is for his children. It is not." },
  { id: "m5", year: 47, label: "The Fire at Ashbourne", kind: "turning", memory: "The mill burns. Twelve die. He is three streets away, drinking. He does not return." },
  { id: "m6", year: 68, label: "Confession Unheard", kind: "turning", memory: "Whispers the truth to a dying priest, who cannot hear him. Feels absolved anyway. Isn't." },
  { id: "m7", year: 72, label: "Final Breath", kind: "death", memory: "Alone in a rented room. Reaches for a hand that is not there." },
];

export const intents = [
  { trait: "Love", value: 62 },
  { trait: "Greed", value: 78 },
  { trait: "Fear", value: 71 },
  { trait: "Compassion", value: 44 },
  { trait: "Hatred", value: 29 },
  { trait: "Hope", value: 51 },
  { trait: "Regret", value: 84 },
];

export type RippleNode = { id: string; label: string; depth: number; x: number; y: number; kind: "origin" | "1" | "2" | "3" | "4"; note?: string };
export type RippleEdge = { from: string; to: string };
export const rippleNodes: RippleNode[] = [
  { id: "r0", label: "Forged deed at age 34", depth: 0, x: 50, y: 50, kind: "origin" },
  { id: "r1", label: "Weaver's Guild collapses", depth: 1, x: 25, y: 22, kind: "1" },
  { id: "r2", label: "Ashbourne mill burns", depth: 1, x: 78, y: 25, kind: "1" },
  { id: "r3", label: "84 families displaced", depth: 2, x: 12, y: 55, kind: "2" },
  { id: "r4", label: "12 lives lost", depth: 2, x: 88, y: 55, kind: "2" },
  { id: "r5", label: "Child laborers indentured", depth: 3, x: 30, y: 80, kind: "3" },
  { id: "r6", label: "Widow's revolt (12 yrs later)", depth: 3, x: 70, y: 80, kind: "3" },
  { id: "r7", label: "Third-generation famine", depth: 4, x: 50, y: 92, kind: "4" },
];
export const rippleEdges: RippleEdge[] = [
  { from: "r0", to: "r1" }, { from: "r0", to: "r2" },
  { from: "r1", to: "r3" }, { from: "r2", to: "r4" },
  { from: "r3", to: "r5" }, { from: "r4", to: "r6" },
  { from: "r5", to: "r7" }, { from: "r6", to: "r7" },
];

export const alternateTimeline = [
  { year: 34, actual: "Signs the forged deed.", alt: "Refuses. Loses the estate but keeps his name." },
  { year: 39, actual: "Wealth multiplies. Children fed on borrowed grain.", alt: "Works the docks. Children learn hunger, then trade." },
  { year: 47, actual: "Ashbourne mill burns. He is absent.", alt: "Never at Ashbourne. Runs a small chandlery in Iren." },
  { year: 61, actual: "Buys silence with gold.", alt: "Speaks at the widows' tribunal. Testifies against the guild." },
  { year: 72, actual: "Dies alone in a rented room.", alt: "Dies in his daughter's arms. She forgives him." },
];

export const oracle = {
  justice: 61,
  restoration: 74,
  confidence: 88,
  affected: 3821,
  suggestedRealm: "Realm of Restoration",
  summary: "Motive dominated by fear and greed, softened late by unspoken regret. Intent was rarely cruel; consequence often was. Repair remains possible.",
};

export const recentVerdicts = [
  { name: "Kaelen Marr", realm: "Realm of Restoration", when: "2h ago", tone: "gold" as const },
  { name: "Brother Ambrose", realm: "Ascendant Gardens", when: "5h ago", tone: "celestial" as const },
  { name: "Serah of the Bleeding Star", realm: "The Long Silence", when: "1d ago", tone: "ember" as const },
  { name: "Halric the Kind", realm: "Ascendant Gardens", when: "1d ago", tone: "gold" as const },
];

export const activity = [
  { t: "just now", text: "Oracle completed ripple analysis for Vaerissa Thorn — 4 generations." },
  { t: "4m ago", text: "New soul inscribed: The Silent Weaver (Umbral)." },
  { t: "12m ago", text: "Timeline integrity anomaly resolved in Sector 9." },
  { t: "31m ago", text: "Judge Cassian assigned Realm of Restoration to Kaelen Marr." },
  { t: "1h ago", text: "Archive index rebalanced. 1,204,881 records verified." },
];
