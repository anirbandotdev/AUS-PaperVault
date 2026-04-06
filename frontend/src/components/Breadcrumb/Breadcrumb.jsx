import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import './Breadcrumb.css';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb navigation">
      <Link to="/" className="breadcrumb-item breadcrumb-home">
        <Home size={14} />
        <span>Home</span>
      </Link>
      {items.map((item, index) => (
        <span key={index} className="breadcrumb-segment">
          <ChevronRight size={14} className="breadcrumb-sep" />
          {item.to ? (
            <Link to={item.to} className="breadcrumb-item">
              {item.label}
            </Link>
          ) : (
            <span className="breadcrumb-item breadcrumb-current">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
