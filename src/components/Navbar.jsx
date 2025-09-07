import { useState } from "react";
import { FaGraduationCap, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="px-3 py-2 rounded-lg text-sm md:text-[15px] text-slate-200/90 hover:text-white hover:bg-white/5 transition"
      onClick={() => setOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-[#212B3f] border-b border-white/10">

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="h-16 md:h-[50px] flex items-center justify-between">
        <div className="text-center mt-5 mb-5 flex items-center justify-center gap-3">
          {/* Gradient icon box */}
          <div className="relative w-9 h-9 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              className="transform -rotate-6"
            >
              <path
                d="M2 12L12 7L22 12L12 17L2 12Z"
                fill="white"
                fillOpacity="0.9"
              />
              <circle cx="12" cy="12" r="1" fill="white" />
              <path
                d="M18 12V16C18 17 16 18 12 18C8 18 6 17 6 16V12"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <line
                x1="22"
                y1="12"
                x2="22"
                y2="16"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="22" cy="17" r="1" fill="white" />
            </svg>

            {/* Dekor nuqtalar */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-300 rounded-full animate-floatY"></div>
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-sky-300 rounded-full animate-floatX"></div>
          </div>

          {/* Text */}
          <div className="flex flex-col items-start">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text text-transparent">
              EduWay
            </h1>
            <p className="text-xs tracking-widest text-slate-500">
              E D U C A T I O N
            </p>
          </div>
        </div>

          {/* Center: nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/">Bosh sahifa</NavLink>
            <NavLink to="/kurslar">Kurslar</NavLink>
            <NavLink to="/admin"> Admin panel</NavLink>
          </nav>

          {/* Right: profile pill */}
          <div className="relative hidden md:flex items-center gap-3">
      {/* Profil pill */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-2.5 py-1.5 hover:bg-white/10 transition"
      >
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-semibold">
          A
        </span>
        <span className="text-sm text-slate-200/90">Admin User</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-12 w-44 rounded-xl border border-white/10 bg-slate-800/95 backdrop-blur shadow-lg shadow-black/30 overflow-hidden">
          <button className="flex w-full items-center gap-2 px-4 py-2 text-slate-200 hover:bg-white/10 text-sm">
            <FaUser className="text-cyan-400" /> Profil
          </button>
          <button className="flex w-full items-center gap-2 px-4 py-2 text-slate-200 hover:bg-white/10 text-sm">
            <FaCog className="text-purple-400" /> Sozlamalar
          </button>
          <div className="border-t border-white/10" />
          <button className="flex w-full items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/20 text-sm">
            <FaSignOutAlt /> Chiqish
          </button>
        </div>
      )}
    </div>

          {/* Mobile burger */}
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 text-slate-200"
            onClick={() => setOpen((s) => !s)}
            aria-label="Open menu"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col rounded-xl border border-white/10 bg-slate-950/60 overflow-hidden">
              <NavLink to="/">Bosh sahifa</NavLink>
              <NavLink to="/kurslar">Kurslar</NavLink>
              <NavLink to="/admin">Admin panel</NavLink>

              <div className="border-t border-white/10 mx-3 my-2" />
              <div className="flex items-center gap-2 px-3 py-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-semibold">
                  A
                </span>
                <span className="text-sm text-slate-200">Admin User</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
