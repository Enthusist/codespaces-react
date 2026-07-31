import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <Link to="/" className="logo">
          <span className="logo-icon">🧭</span>
          <span className="logo-text">دليل التوجيه</span>
        </Link>
        <nav className="nav">
          <Link to="/quiz">الاختبار</Link>
          <Link to="/pathways">المسارات</Link>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <p>دليل التوجيه المدرسي — مساعدة الطلاب على اكتشاف مساراتهم المهنية</p>
      </footer>
    </div>
  );
}
