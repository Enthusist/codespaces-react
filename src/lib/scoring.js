/**
 * RIASEC scoring engine.
 * Each dimension has 6 items rated 1-5, max 30 per dimension.
 */

export const DIMENSIONS = ['R', 'I', 'A', 'S', 'E', 'C'];

export const DIMENSION_LABELS = {
  R: 'واقعي',
  I: 'استقصائي',
  A: 'فني',
  S: 'اجتماعي',
  E: 'مقاولاتي',
  C: 'تقليدي',
};

export const DIMENSION_DESCRIPTIONS = {
  R: 'تحب العمل اليدوي والتقني، وتفضل الأنشطة العملية الملموسة.',
  I: 'تحب التحليل والبحث العلمي، وتفضل حل المشكلات المعقدة.',
  A: 'تحب التعبير الإبداعي والفني، وتفضل الأنشطة غير التقليدية.',
  S: 'تحب مساعدة الآخرين والتواصل، وتفضل العمل في خدمة الناس.',
  E: 'تحب القيادة والإقناع، وتفضل المبادرة واتخاذ القرارات.',
  C: 'تحب التنظيم والدقة، وتفضل المهام الإدارية المنظمة.',
};

/**
 * Calculate raw scores per dimension from answers.
 * @param {Object} answers - { itemId: rating (1-5) }
 * @param {Array} items - questionnaire items with dimension field
 * @returns {Object} { R: 0-30, I: 0-30, ... }
 */
export function calculateScores(answers, items) {
  const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  for (const item of items) {
    const rating = answers[item.id];
    if (rating != null) {
      scores[item.dimension] += rating;
    }
  }
  return scores;
}

/**
 * Get the top N dimensions sorted by score descending.
 * @param {Object} scores - { R: 0-30, ... }
 * @param {number} n - number of top dimensions to return
 * @returns {Array} [{ dim: 'I', score: 25 }, ...]
 */
export function getTopDimensions(scores, n = 3) {
  return DIMENSIONS.map((dim) => ({ dim, score: scores[dim] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}

/**
 * Get the RIASEC code string (e.g. "I-S-C").
 * @param {Object} scores
 * @param {number} n
 * @returns {string}
 */
export function getRiasecCode(scores, n = 3) {
  return getTopDimensions(scores, n)
    .map((d) => d.dim)
    .join('-');
}

/**
 * Get a plain-language description for a given code.
 * @param {string} code - e.g. "I-S-C"
 * @returns {string}
 */
export function getCodeDescription(code) {
  const parts = code.split('-');
  const labels = parts.map((d) => DIMENSION_LABELS[d]).join('، ');
  const descriptions = parts.map((d) => DIMENSION_DESCRIPTIONS[d]).join(' ');
  return `ميولك الرئيسية: ${labels}. ${descriptions}`;
}
