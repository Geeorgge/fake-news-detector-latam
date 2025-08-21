// src/layout/MainLayout.jsx
import Navbar from '../components/Navbar';

function MainLayout({ children }) {
  return (
    //  <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 border border-white/10">
    <div className="w-full min-h-screen text-white">
      <Navbar />
      <main className="pt-15 px-4 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
