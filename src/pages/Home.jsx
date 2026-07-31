import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>اكتشف مسارك المهني</h1>
        <p className="hero-subtitle">
          اختبار بسيط يساعدك على فهم ميولك المهنية واكتشاف المسارات الدراسية
          والمهنية المناسبة لك بعد الباكالوريا
        </p>
        <div className="hero-actions">
          <Link to="/quiz" className="btn btn-primary">
            ابدأ الاختبار
          </Link>
          <Link to="/pathways" className="btn btn-secondary">
            استكشف المسارات
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <span className="feature-icon">📋</span>
          <h3>اختبار الميول</h3>
          <p>36 سؤالًا بسيطًا لتحديد ميولك المهنية وفق نموذج RIASEC العالمي</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🎯</span>
          <h3>نتائج مخصصة</h3>
          <p>احصل على رمزك الشخصي واكتشف المسارات الأنسب لشخصيتك</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🗺️</span>
          <h3>خارطة طريق</h3>
          <p>خطوات واضحة ومفصلة لكل مسار من الباكالوريا إلى العمل</p>
        </div>
      </section>

      <section className="how-it-works">
        <h2>كيف يعمل؟</h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <p>أجب على 36 سؤالًا عن اهتماماتك وأنشطتك المفضلة</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <p>احصل على رمزك الشخصي (مثل I-S-C) ووصف ميولك</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <p>اكتشف المسارات الدراسية والمهنية المناسبة لك</p>
          </div>
        </div>
      </section>
    </div>
  );
}
