import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import questionnaire from '../content/questionnaire_ar.json';
import {
  calculateScores,
  getTopDimensions,
  getRiasecCode,
  getCodeDescription,
  DIMENSION_LABELS,
} from '../lib/scoring';
import { rankPathways } from '../lib/matching';
import { getAllPathways } from '../lib/pathways';

export default function Results() {
  const navigate = useNavigate();

  const { scores, topDims, code, rankedPathways } = useMemo(() => {
    const stored = sessionStorage.getItem('quizAnswers');
    if (!stored) return { scores: null, topDims: [], code: '', rankedPathways: [] };

    const answers = JSON.parse(stored);
    const scores = calculateScores(answers, questionnaire.items);
    const topDims = getTopDimensions(scores, 3);
    const code = getRiasecCode(scores, 3);
    const pathways = getAllPathways();
    const rankedPathways = rankPathways(pathways, topDims);

    return { scores, topDims, code, rankedPathways };
  }, []);

  if (!scores) {
    return (
      <div className="results-empty">
        <h2>لم تقم بإكمال الاختبار بعد</h2>
        <p>أجب على الأسئلة أولاً للحصول على نتائجك</p>
        <Link to="/quiz" className="btn btn-primary">
          ابدأ الاختبار
        </Link>
      </div>
    );
  }

  const maxScore = 30;

  return (
    <div className="results">
      <section className="code-section">
        <h1>نتائجك</h1>
        <div className="code-display">
          <span className="code-label">رمزك الشخصي</span>
          <span className="code-value">{code}</span>
        </div>
        <p className="code-description">{getCodeDescription(code)}</p>
      </section>

      <section className="scores-section">
        <h2>تفصيل النقاط</h2>
        <div className="scores-grid">
          {topDims.map(({ dim, score }) => (
            <div key={dim} className="score-card">
              <div className="score-header">
                <span className="score-dim">{dim}</span>
                <span className="score-label">{DIMENSION_LABELS[dim]}</span>
              </div>
              <div className="score-bar">
                <div
                  className="score-fill"
                  style={{ width: `${(score / maxScore) * 100}%` }}
                />
              </div>
              <span className="score-value">
                {score} / {maxScore}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="pathways-section">
        <h2>المسارات المناسبة لك</h2>
        <p className="section-subtitle">
          مرتبة حسب توافقها مع ميولك الشخصية
        </p>
        <div className="pathways-list">
          {rankedPathways.slice(0, 5).map((pathway, index) => (
            <Link
              key={pathway.id}
              to={`/pathway/${pathway.id}`}
              className="pathway-card"
            >
              <div className="pathway-rank">#{index + 1}</div>
              <div className="pathway-info">
                <h3>{pathway.name_ar}</h3>
                <p className="pathway-duration">{pathway.duration}</p>
                <div className="pathway-tags">
                  {pathway.riasec_tags.map((tag) => (
                    <span key={tag} className="tag">
                      {DIMENSION_LABELS[tag]}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pathway-arrow">←</div>
            </Link>
          ))}
        </div>
        <Link to="/pathways" className="btn btn-secondary">
          عرض جميع المسارات
        </Link>
      </section>

      <div className="results-actions">
        <button
          className="btn btn-secondary"
          onClick={() => {
            sessionStorage.removeItem('quizAnswers');
            navigate('/quiz');
          }}
        >
          إعادة الاختبار
        </button>
      </div>
    </div>
  );
}
