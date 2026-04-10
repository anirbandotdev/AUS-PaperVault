import Hero from '../components/Hero/Hero';
import DepartmentGrid from '../components/DepartmentGrid/DepartmentGrid';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 }
};

export default function HomePage() {
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  return (
    <motion.div 
      className="page-enter"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Hero />
      <DepartmentGrid />
    </motion.div>
  );
}
