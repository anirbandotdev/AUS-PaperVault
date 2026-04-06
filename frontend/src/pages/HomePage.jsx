import Hero from '../components/Hero/Hero';
import DepartmentGrid from '../components/DepartmentGrid/DepartmentGrid';

export default function HomePage() {
  return (
    <div className="page-enter">
      <Hero />
      <DepartmentGrid />
    </div>
  );
}
