import { useParams, Link } from 'react-router-dom';
import { getPathwayById } from '../lib/pathways';
import { DIMENSION_LABELS } from '../lib/scoring';

export default function PathwayDetail() {
  const { id } = useParams();
  const pathway = getPathwayById(id);

  if (!pathway) {
    return (
      <div className="not-found">
        <h2>المسار غير موجود</h2>
        <p>عذرًا، لم نتمكن من العثور على هذا المسار</p>
        <Link to="/pathways" className="btn btn-primary">
          العودة إلى المسارات
        </Link>
      </div>
    );
  }

  return (
    <div className="pathway-detail">
      <nav className="breadcrumb">
        <Link to="/pathways">المسارات</Link>
        <span>/</span>
        <span>{pathway.name_ar}</span>
      </nav>

      <header className="pathway-header">
        <h1>{pathway.name_ar}</h1>
        <div className="pathway-meta">
          <span className="meta-item">
            <strong>المدة:</strong> {pathway.duration}
          </span>
          <span className="meta-item">
            <strong>الولوج:</strong> {pathway.admission}
          </span>
        </div>
        <div className="pathway-tags">
          {pathway.riasec_tags.map((tag) => (
            <span key={tag} className="tag">
              {DIMENSION_LABELS[tag]}
            </span>
          ))}
        </div>
      </header>

      <section className="detail-section">
        <h2>شروط الأهلية</h2>
        <div className="info-card">
          <p>
            <strong>الشعبة المطلوبة:</strong>{' '}
            {pathway.bac_required.join(' أو ')}
          </p>
          <p>
            <strong>الميزة المطلوبة:</strong> {pathway.mention_required}
          </p>
        </div>
      </section>

      <section className="detail-section">
        <h2>خارطة الطريق</h2>
        <div className="roadmap">
          {pathway.roadmap.map((step, index) => (
            <div key={index} className="roadmap-step">
              <div className="step-number">{index + 1}</div>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="detail-section">
        <h2>ظروف العمل</h2>
        <div className="info-card">
          {pathway.work_conditions.sector.length > 0 && (
            <p>
              <strong>القطاع:</strong>{' '}
              {pathway.work_conditions.sector.join('، ')}
            </p>
          )}
          <p>{pathway.work_conditions.notes}</p>
        </div>
      </section>

      <div className="pros-cons">
        <section className="detail-section pros">
          <h2>المميزات</h2>
          <ul>
            {pathway.pros.map((pro, index) => (
              <li key={index}>{pro}</li>
            ))}
          </ul>
        </section>

        <section className="detail-section cons">
          <h2>التحديات</h2>
          <ul>
            {pathway.cons.map((con, index) => (
              <li key={index}>{con}</li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="pathway-footer">
        <p className="last-verified">
          آخر تحديث: {pathway.last_verified}
        </p>
        <Link to="/pathways" className="btn btn-secondary">
          العودة إلى المسارات
        </Link>
      </footer>
    </div>
  );
}
