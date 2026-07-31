/**
 * Pathway matching engine.
 * Ranks pathways by overlap between student's top RIASEC letters
 * and each pathway's tags/weights.
 */

/**
 * Score a single pathway against a student's RIASEC profile.
 * @param {Object} pathway - pathway JSON object
 * @param {Array} topDims - [{ dim: 'I', score: 25 }, ...] from scoring.js
 * @returns {number} match score (higher = better)
 */
export function scorePathway(pathway, topDims) {
  let score = 0;
  const topLetters = topDims.map((d) => d.dim);

  for (let i = 0; i < topLetters.length; i++) {
    const letter = topLetters[i];
    const weight = pathway.riasec_weight?.[letter] ?? 0;
    // Position bonus: #1 letter gets 3x, #2 gets 2x, #3 gets 1x
    const positionBonus = 3 - i;
    score += weight * positionBonus;
  }

  // Bonus for exact tag match
  for (const tag of pathway.riasec_tags ?? []) {
    if (topLetters.includes(tag)) {
      score += 0.5;
    }
  }

  return score;
}

/**
 * Rank all pathways by match score.
 * @param {Array} pathways - array of pathway objects
 * @param {Array} topDims - student's top dimensions
 * @returns {Array} pathways sorted by score descending, with score attached
 */
export function rankPathways(pathways, topDims) {
  return pathways
    .map((p) => ({ ...p, matchScore: scorePathway(p, topDims) }))
    .sort((a, b) => b.matchScore - a.matchScore);
}
