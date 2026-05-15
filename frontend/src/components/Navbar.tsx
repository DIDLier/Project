import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          📋 Teacher Feedback System
        </Link>
        <div className="navbar-nav ms-auto">
          <Link
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            to="/"
          >
            Feedbacks
          </Link>
          <Link
            className={`nav-link ${pathname === '/create' ? 'active' : ''}`}
            to="/create"
          >
            + New Feedback
          </Link>
        </div>
      </div>
    </nav>
  );
}
