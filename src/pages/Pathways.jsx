import { Link } from 'react-router-dom';
import { getAllPathways } from '../lib/pathways';
import { DIMENSION_LABELS } from '../lib/scoring';

export default function Pathways() {
  const pathways = getAllPathways();

  return (
    <div className="pathways-page">
      <div className="page-header">
        <h1>استكشف المسارات</h1>
        <p>جميع المسارات الدراسية والمهنية المتاحة بعد الباكالوريا</p>
      </div>

      <div className="pathways-grid">
        {pathways.map((pathway) => (
          <Link
            key={pathway.id}
            to={`/pathway/${pathway.id}`}
            className="pathway-card"
          >
            <div className="pathway-info">
              <h3>{pathway.name_ar}</h3>
              <p className="pathway-duration">{pathway.duration}</p>
              <p className="pathway-admission">{pathway.admission}</p>
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
    </div>
  );
}
