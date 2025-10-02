// src/components/HeroSection.jsx
import { FiZap, FiCode } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* BG: dotted grid + gradient (avvalgidek) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1e33] via-[#0b2342] to-[#0a1a2e] opacity-95" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-20 text-center">
        {/* CLI chip */}
     
        {/* Heading */}
        <h1 className="mt-0 font-sami text-1xl sm:text- md:text-4xl leading-tight text-white">
        Tayyor bo‘lsang – boshlash vaqti keldi
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto">
          Professional sertifikat oling va texnologiya sohasida <br />o‘zingizga munosib o‘rinni toping.
        </p>

        {/* Actions */}
        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <Link to="/kurslar"  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 font-medium animate-pulseGlow"
          >
            <FiZap className="text-yellow-300" />
            Kursni tanlash
          </Link>

          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-violet-500/40 bg-violet-500/10 text-violet-200 hover:bg-violet-500/20 transition">
            <FiCode />
            Bepul sinab ko‘ring
          </button>
        </div>

        {/* Dekorativ burchaklar */}
      </div>
    </section>
  );
}

