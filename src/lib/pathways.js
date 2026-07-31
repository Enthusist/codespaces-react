/**
 * Pathway loader — dynamically imports all JSON files from /content/pathways.
 * Adding a new pathway = adding a new JSON file. No code changes needed.
 */

const modules = import.meta.glob('../content/pathways/*.json', { eager: true });

export function getAllPathways() {
  return Object.values(modules).map((m) => m.default ?? m);
}

export function getPathwayById(id) {
  const all = getAllPathways();
  return all.find((p) => p.id === id) ?? null;
}
