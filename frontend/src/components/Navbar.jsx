// src/components/Navbar.jsx
function Navbar() {
  return (
     <nav className="backdrop-blur-md bg-black/30 border-b border-white/10 fixed top-0 left-0 w-full z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white text-center w-full">
          Fake News Detector
        </h1>
        {/* Opcional: Botones a la derecha */}
        <div className="absolute right-4 flex gap-4 text-sm">
          <button className="hover:underline">About</button>
          <button className="hover:underline">Contact Me</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
